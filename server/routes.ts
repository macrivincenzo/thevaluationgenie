import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import multer from "multer";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { setupEmailAuth, requireAuth } from "./emailAuth";
import session from "express-session";
import passport from "passport";
import connectPg from "connect-pg-simple";
import { 
  insertEmailSubscriptionSchema, 
  insertValuationSchema,
  insertFileUploadSchema 
} from "@shared/schema";
import { z } from "zod";

// Stripe setup - only initialize if key is available
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  try {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    console.log('Stripe initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Stripe:', error);
  }
}

// File upload setup - Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({
  dest: uploadsDir,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    console.log("Multer file filter - file mimetype:", file.mimetype);
    const allowedTypes = [
      'application/pdf', 
      'text/csv',
      'application/csv', 
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    // Also check file extensions as fallback
    const fileName = file.originalname.toLowerCase();
    const allowedExtensions = ['.pdf', '.csv', '.xls', '.xlsx'];
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
    
    const isAllowed = allowedTypes.includes(file.mimetype) || hasValidExtension;
    console.log("File allowed:", isAllowed, "Type:", file.mimetype, "Name:", file.originalname);
    cb(null, isAllowed);
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Session setup for both OAuth and email auth
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });

  app.set("trust proxy", 1);
  app.use(session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: sessionTtl,
    },
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  // Setup both OAuth and email authentication
  await setupAuth(app);
  await setupEmailAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      // Update last login
      if (user) {
        await storage.updateUserProfile(userId, { lastLoginAt: new Date() });
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Complete user profile endpoint
  app.post('/api/auth/complete-profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profileData = req.body;
      
      // Update user profile
      const updatedUser = await storage.updateUserProfile(userId, {
        ...profileData,
        profileComplete: true,
        updatedAt: new Date()
      });
      
      // Create or update customer profile
      const existingProfile = await storage.getCustomerProfile(userId);
      if (existingProfile) {
        await storage.updateCustomerProfile(userId, {
          purposeForValuation: profileData.purposeForValuation,
          updatedAt: new Date()
        });
      } else {
        await storage.createCustomerProfile({
          userId,
          purposeForValuation: profileData.purposeForValuation,
          currentBusinessOwner: profileData.businessType === 'owner',
          preferredContactMethod: 'email',
        });
      }
      
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Email subscription
  app.post('/api/subscribe', async (req, res) => {
    try {
      const data = insertEmailSubscriptionSchema.parse(req.body);
      const subscription = await storage.createEmailSubscription(data);
      res.json(subscription);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Contact form
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ message: "Name, email, and message are required" });
      }

      // In a real app, you'd send an email or save to database
      console.log("Contact form submission:", { name, email, subject, message });
      
      res.json({ message: "Message sent successfully" });
    } catch (error: any) {
      console.error("Contact error:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Valuation routes
  app.post('/api/valuations', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const rawData = req.body;
      
      console.log('Received valuation data:', JSON.stringify(rawData, null, 2));
      
      // Extract core values from comprehensive data
      const annualRevenueValue = Array.isArray(rawData.annualRevenue) ? rawData.annualRevenue[0] || 0 : rawData.annualRevenue || 0;
      const sdeValue = rawData.sde || 0;
      const addBacksValue = rawData.addBacks || 0;
      const ownerSalary = rawData.ownerSalary || 0;
      
      console.log('SDE Calculation Debug:', {
        rawSDE: rawData.sde,
        sdeValue,
        annualRevenueValue,
        ownerSalary,
        addBacksValue
      });
      
      // Use SDE directly as entered by user (SDE already includes owner salary + add-backs)
      let calculatedSDE = sdeValue;
      
      // If SDE is 0 or not provided, try to calculate from net profit + owner salary + add backs
      if (!calculatedSDE || calculatedSDE === 0) {
        // Try to estimate SDE from available data
        const netProfit = rawData.netProfit || 0;
        calculatedSDE = netProfit + ownerSalary + addBacksValue;
        
        // If still 0, we can still proceed but warn about accuracy
        if (calculatedSDE === 0) {
          console.log('Warning: SDE is 0, valuation may not be accurate');
          // Set minimum SDE to 1 to avoid division by zero
          calculatedSDE = 1;
        }
      }
      
      console.log('Final calculated SDE:', calculatedSDE);
      
      // Map industry names to industry keys for valuation calculation
      const industryKeyMap: Record<string, string> = {
        'E-commerce & Online Retail': 'e-commerce-online-retail',
        'ecommerce': 'e-commerce-online-retail', // backwards compatibility
        'Software as a Service (SaaS)': 'software-as-a-service--saas-',
        'Technology & Software': 'technology-software',
        'Professional Services': 'professional-services',
        'Consulting Services': 'consulting-services',
        'Accounting & Bookkeeping': 'accounting-bookkeeping',
        'Healthcare Services': 'healthcare-services',
        'Medical Practice': 'medical-practice',
        'Dental Practice': 'dental-practice',
        'Legal Services': 'legal-services',
        'Real Estate Services': 'real-estate-services',
        'Financial Services': 'financial-services',
        'Insurance Services': 'insurance-services',
        'Computer & IT Services': 'computer-it-services',
        'Web Design & Development': 'web-design-development',
        'Graphic Design & Creative': 'graphic-design-creative',
        'Architecture & Engineering': 'architecture-engineering',
        'Advertising & Marketing': 'advertising-marketing'
      };
      
      const industryKey = industryKeyMap[rawData.industry] || rawData.industry || 'other';
      console.log('Industry mapping:', { original: rawData.industry, mapped: industryKey });
      
      // Calculate valuation using industry multiples
      const { calculateValuation } = await import('../client/src/lib/industry-multiples.ts');
      const { low, high, multiple } = calculateValuation(industryKey, calculatedSDE);
      
      // Create core data object matching the actual database structure
      const valuationData = {
        userId,
        businessName: rawData.businessName || 'Business Name Not Provided',
        industry: rawData.industry || 'other',
        location: rawData.location || 'Not Specified',
        foundedYear: rawData.foundedYear || null,
        yearsInBusiness: rawData.yearsInBusiness || 1,
        buyerOrSeller: rawData.buyerOrSeller || 'selling',
        annualRevenue: annualRevenueValue,
        sde: calculatedSDE,
        addBacks: addBacksValue,
        ownerInvolvement: rawData.ownerInvolvement || 'moderate',
        growthTrend: rawData.growthTrend || 'stable',
        majorRisks: Array.isArray(rawData.majorRiskFactors) ? rawData.majorRiskFactors.join(', ') : (rawData.majorRisks || 'None specified'),
        valuationLow: low,
        valuationHigh: high,
        industryMultiple: multiple,
        paid: false
      };
      
      console.log('Creating valuation with data:', JSON.stringify(valuationData, null, 2));
      
      const valuation = await storage.createValuation(valuationData);
      
      res.json(valuation);
    } catch (error: any) {
      console.error('Valuation creation error:', error);
      res.status(400).json({ 
        message: `Error creating valuation: ${error.message}`,
        details: error.issues || error.stack
      });
    }
  });

  app.get('/api/valuations', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const valuations = await storage.getUserValuations(userId);
      res.json(valuations);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get('/api/valuations/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const valuation = await storage.getValuation(req.params.id);
      
      if (!valuation || valuation.userId !== userId) {
        return res.status(404).json({ message: 'Valuation not found' });
      }
      
      res.json(valuation);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete('/api/valuations/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const valuation = await storage.getValuation(req.params.id);
      
      if (!valuation || valuation.userId !== userId) {
        return res.status(404).json({ message: 'Valuation not found' });
      }
      
      await storage.deleteValuation(req.params.id);
      res.json({ message: 'Valuation deleted' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Temporary file upload (before valuation creation)
  app.post('/api/files/upload', isAuthenticated, upload.single('file'), async (req: any, res) => {
    try {
      console.log("File upload request received");
      console.log("Request file:", req.file);
      console.log("Request body:", req.body);
      
      if (!req.file) {
        console.error("No file in request");
        return res.status(400).json({ message: 'No file uploaded' });
      }
      
      console.log("File details:", {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path
      });
      
      // Return file information for temporary storage
      const fileInfo = {
        id: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        filePath: req.file.path, // Store for later association with valuation
      };
      
      console.log("Returning file info:", fileInfo);
      res.json(fileInfo);
    } catch (error: any) {
      console.error("File upload error:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // File upload for existing valuations
  app.post('/api/valuations/:id/files', isAuthenticated, upload.single('file'), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const valuation = await storage.getValuation(req.params.id);
      
      if (!valuation || valuation.userId !== userId) {
        return res.status(404).json({ message: 'Valuation not found' });
      }
      
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      
      const fileUpload = await storage.createFileUpload({
        valuationId: req.params.id,
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileSize: req.file.size,
        mimeType: req.file.mimetype
      });
      
      res.json(fileUpload);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Test Stripe connection
  app.post("/api/test-stripe", isAuthenticated, async (req: any, res) => {
    try {
      if (!stripe) {
        return res.status(500).json({ message: "Stripe not initialized. Check your STRIPE_SECRET_KEY." });
      }
      
      // Simple test - just try to create a test payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 100, // $1.00 test amount
        currency: "usd",
        metadata: {
          test: "stripe-connection"
        }
      });
      
      res.json({ 
        success: true, 
        message: "Stripe connection successful!", 
        clientSecret: paymentIntent.client_secret 
      });
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        message: "Stripe error: " + error.message 
      });
    }
  });

  // Stripe payment
  app.post("/api/create-payment-intent", isAuthenticated, async (req: any, res) => {
    try {
      const { valuationId } = req.body;
      const userId = req.user.claims.sub;
      
      const valuation = await storage.getValuation(valuationId);
      if (!valuation || valuation.userId !== userId) {
        return res.status(404).json({ message: 'Valuation not found' });
      }
      
      // Check if Stripe is configured
      if (!stripe) {
        return res.status(500).json({ message: "Payment processing not configured. Please contact support." });
      }
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 3900, // $39.00 in cents
        currency: "usd",
        metadata: {
          valuationId,
          userId
        }
      });
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Webhook for Stripe payment confirmation
  app.post('/api/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe!.webhooks.constructEvent(req.body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err: any) {
      console.log(`Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const { valuationId } = paymentIntent.metadata;
      
      if (valuationId) {
        // Generate PDF and update valuation
        const pdfPath = `/pdfs/${valuationId}.pdf`;
        await storage.updateValuationPayment(valuationId, paymentIntent.id, pdfPath);
      }
    }

    res.json({ received: true });
  });

  // PDF download (requires payment)
  app.get('/api/valuations/:id/pdf', isAuthenticated, async (req: any, res) => {
    try {
      console.log('PDF download request for ID:', req.params.id);
      const userId = req.user.claims.sub;
      
      const valuation = await storage.getValuation(req.params.id);
      
      if (!valuation || valuation.userId !== userId) {
        console.error('Valuation not found or unauthorized:', req.params.id);
        return res.status(404).json({ message: 'Valuation not found' });
      }
      
      if (!valuation.paid) {
        return res.status(402).json({ message: 'Payment required. Please purchase the Professional Report for $39 to download the PDF.' });
      }
      
      console.log('Generating PDF for valuation:', valuation.id);
      console.log('Valuation data:', JSON.stringify(valuation, null, 2));
      
      // Generate HTML content for PDF conversion
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
            .title { font-size: 24px; font-weight: bold; margin-bottom: 20px; }
            .section { margin: 20px 0; }
            .value-range { background: #f0f9ff; padding: 15px; border-left: 4px solid #2563eb; }
            .footer { margin-top: 50px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">ValuationGenie Business Valuation Report</div>
          </div>
          
          <div class="section">
            <h3>Business Information</h3>
            <p><strong>Business Name:</strong> ${valuation.businessName}</p>
            <p><strong>Industry:</strong> ${valuation.industry}</p>
            <p><strong>Location:</strong> ${valuation.location}</p>
            <p><strong>Years in Business:</strong> ${valuation.yearsInBusiness}</p>
            <p><strong>Report Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="section value-range">
            <h3>Valuation Summary</h3>
            <p><strong>Estimated Value Range:</strong> $${parseInt(String(valuation.valuationLow) || '0').toLocaleString()} - $${parseInt(String(valuation.valuationHigh) || '0').toLocaleString()}</p>
            <p><strong>Industry Multiple:</strong> ${valuation.industryMultiple}x</p>
            <p><strong>Annual Revenue:</strong> $${parseInt(String(valuation.annualRevenue) || '0').toLocaleString()}</p>
            <p><strong>SDE:</strong> $${parseInt(String(valuation.sde) || '0').toLocaleString()}</p>
          </div>
          
          <div class="section">
            <h3>Disclaimer</h3>
            <p>This valuation is based on industry-standard methodologies and should be used for informational purposes only. It does not constitute professional financial advice.</p>
          </div>
          
          <div class="footer">
            <p>© ValuationGenie - Confidential Business Valuation Report</p>
          </div>
        </body>
        </html>
      `;
      
      // Use puppeteer to generate PDF from HTML
      const puppeteer = await import('puppeteer');
      const browser = await puppeteer.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();
      await page.setContent(htmlContent);
      const pdfBuffer = await page.pdf({ 
        format: 'A4',
        margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
      });
      await browser.close();
      
      console.log('PDF generated successfully, buffer size:', pdfBuffer.length);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${valuation.businessName.replace(/[^a-zA-Z0-9]/g, '_')}-valuation.pdf"`);
      res.setHeader('Content-Length', pdfBuffer.length.toString());
      res.send(pdfBuffer);
    } catch (error: any) {
      console.error('PDF generation error:', error);
      res.status(500).json({ message: 'Error generating PDF: ' + error.message });
    }
  });

  // User data management
  app.delete('/api/user/delete-all-data', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await storage.deleteAllUserData(userId);
      res.json({ message: 'All user data deleted successfully' });
    } catch (error: any) {
      console.error('Error deleting user data:', error);
      res.status(500).json({ message: 'Failed to delete user data: ' + error.message });
    }
  });

  // Admin routes
  app.get('/api/admin/users', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const isAdmin = await storage.isAdmin(userId);
      
      if (!isAdmin) {
        return res.status(403).json({ message: 'Admin access required' });
      }
      
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get('/api/admin/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const isAdmin = await storage.isAdmin(userId);
      
      if (!isAdmin) {
        return res.status(403).json({ message: 'Admin access required' });
      }
      
      const userCount = await storage.getUserCount();
      const valuationStats = await storage.getValuationStats();
      
      res.json({
        userCount,
        ...valuationStats
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
