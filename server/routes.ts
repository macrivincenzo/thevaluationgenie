import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import multer from "multer";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import { setupSimpleAuth, requireSimpleAuth } from "./simpleAuth";
import { emailService } from "./emailService";
import cookieParser from "cookie-parser";
import { 
  insertEmailSubscriptionSchema, 
  insertValuationSchema,
  insertFileUploadSchema,

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
  // Ultra-fast cookie-based auth
  app.use(cookieParser());
  
  // Setup simple authentication
  setupSimpleAuth(app);

  // Auth route is now handled in simpleAuth.ts

  // Complete user profile endpoint  
  app.post('/api/auth/complete-profile', requireSimpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
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
  app.post('/api/valuations', requireSimpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
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

  app.get('/api/valuations', requireSimpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const valuations = await storage.getUserValuations(userId);
      res.json(valuations);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get('/api/valuations/:id', requireSimpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const valuation = await storage.getValuation(req.params.id);
      
      if (!valuation || valuation.userId !== userId) {
        return res.status(404).json({ message: 'Valuation not found' });
      }
      
      res.json(valuation);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete('/api/valuations/:id', requireSimpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
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
  app.post('/api/files/upload', requireSimpleAuth, upload.single('file'), async (req: any, res) => {
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
  app.post('/api/valuations/:id/files', requireSimpleAuth, upload.single('file'), async (req: any, res) => {
    try {
      const userId = req.user.id;
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
  app.post("/api/test-stripe", requireSimpleAuth, async (req: any, res) => {
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

  // Stripe payment - optimized for speed
  app.post("/api/create-payment-intent", requireSimpleAuth, async (req: any, res) => {
    try {
      const { valuationId } = req.body;
      const userId = req.user.id;
      
      // Check if Stripe is configured
      if (!stripe) {
        return res.status(500).json({ message: "Payment processing not configured. Please contact support." });
      }
      
      // Skip database validation for speed - create payment intent immediately
      // Payment will be validated during webhook processing
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

  // Mark valuation as paid (immediate confirmation)
  app.post('/api/valuations/:id/mark-paid', requireSimpleAuth, async (req: any, res) => {
    try {
      const valuationId = req.params.id;
      const userId = req.user.id;
      const { paymentIntentId } = req.body;

      // Verify valuation belongs to user
      const valuation = await storage.getValuation(valuationId);
      if (!valuation || valuation.userId !== userId) {
        return res.status(404).json({ message: 'Valuation not found' });
      }

      // Mark as paid
      await storage.updateValuationPayment(valuationId, paymentIntentId, `/pdfs/${valuationId}.pdf`);
      
      res.json({ success: true });
    } catch (error: any) {
      console.error('Error marking valuation as paid:', error);
      res.status(500).json({ message: 'Failed to update payment status' });
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
  app.get('/api/valuations/:id/pdf', requireSimpleAuth, async (req: any, res) => {
    try {
      console.log('=== PDF DOWNLOAD REQUEST ===');
      console.log('Valuation ID:', req.params.id);
      console.log('User ID:', req.user?.id);
      const userId = req.user.id;
      
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
      
      // Use jsPDF to generate beautiful PDF matching the provided design
      const jsPDF = await import('jspdf');
      const doc = new jsPDF.jsPDF();
      
      // Header with date and title
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`${new Date().toLocaleDateString()}`, 20, 15);
      doc.text(`Business Valuation Report - ${valuation.businessName}`, 100, 15);
      
      // Main title
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('BUSINESS VALUATION REPORT', 105, 35, { align: 'center' });
      
      doc.setFontSize(16);
      doc.text(`${valuation.businessName}`, 105, 50, { align: 'center' });
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Valuation Date: ${new Date().toLocaleDateString()}`, 105, 60, { align: 'center' });
      
      // Enterprise Valuation section
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('ENTERPRISE VALUATION', 105, 80, { align: 'center' });
      
      const avgVal = Math.round((parseInt(String(valuation.valuationLow)) + parseInt(String(valuation.valuationHigh))) / 2);
      doc.setFontSize(24);
      doc.text(`$${avgVal.toLocaleString()}`, 105, 95, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      const lowVal = parseInt(String(valuation.valuationLow) || '0').toLocaleString();
      const highVal = parseInt(String(valuation.valuationHigh) || '0').toLocaleString();
      doc.text(`Valuation Range: $${lowVal} - $${highVal}`, 105, 105, { align: 'center' });
      
      // Company Overview section
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Company Overview', 20, 125);
      
      // Create table-like layout for company info
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      // Left column
      doc.text('Company:', 20, 140);
      doc.text('Industry:', 20, 150);
      doc.text('Location:', 20, 160);
      
      // Left values
      doc.text(`${valuation.businessName}`, 50, 140);
      doc.text(`${valuation.industry}`, 50, 150);
      doc.text(`${valuation.location}`, 50, 160);
      
      // Right column
      doc.text('Founded:', 110, 140);
      doc.text('Annual Revenue:', 110, 150);
      doc.text('SDE:', 110, 160);
      
      // Right values
      doc.text(`${valuation.foundedYear}`, 140, 140);
      doc.text(`$${parseInt(String(valuation.annualRevenue)).toLocaleString()}`, 140, 150);
      doc.text(`$${parseInt(String(valuation.sde)).toLocaleString()}`, 140, 160);
      
      // Executive Summary
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Executive Summary', 20, 180);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const sdeMargin = ((parseFloat(String(valuation.sde)) / parseFloat(String(valuation.annualRevenue))) * 100).toFixed(1);
      const summaryText = [
        `${valuation.businessName} is an established ${valuation.industry} business. The company generates`,
        `annual revenue of $${parseInt(String(valuation.annualRevenue)).toLocaleString()} with Seller's Discretionary Earnings (SDE) of $${parseInt(String(valuation.sde)).toLocaleString()},`,
        `resulting in an SDE margin of ${sdeMargin}%. The business shows exceptional profitability`,
        `and operates efficiently with minimal owner involvement.`
      ];
      
      summaryText.forEach((line, index) => {
        doc.text(line, 20, 195 + (index * 8));
      });
      
      // Add new page for Financial Performance and rest
      doc.addPage();
      
      // Financial Performance section
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Financial Performance', 20, 30);
      
      // Create table header
      doc.setFillColor(240, 240, 240);
      doc.rect(20, 40, 170, 10, 'F');
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Metric', 25, 47);
      doc.text('Current Year', 90, 47);
      doc.text('Performance', 140, 47);
      
      // Table rows
      doc.setFont('helvetica', 'normal');
      doc.text('Annual Revenue', 25, 57);
      doc.text(`$${parseInt(String(valuation.annualRevenue)).toLocaleString()}`, 90, 57);
      doc.text('Stable', 140, 57);
      
      doc.text('SDE', 25, 67);
      doc.text(`$${parseInt(String(valuation.sde)).toLocaleString()}`, 90, 67);
      doc.text('Excellent', 140, 67);
      
      doc.text('SDE Margin', 25, 77);
      doc.text(`${sdeMargin}%`, 90, 77);
      doc.text('Outstanding', 140, 77);
      
      // Add table borders
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.rect(20, 40, 170, 37);
      doc.line(85, 40, 85, 77);
      doc.line(135, 40, 135, 77);
      doc.line(20, 50, 190, 50);
      doc.line(20, 60, 190, 60);
      doc.line(20, 70, 190, 70);
      
      // Valuation Methodology
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Valuation Methodology', 20, 100);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`SDE Multiple Approach: Using industry-standard SDE multiples for ${valuation.industry}`, 20, 115);
      doc.text('businesses.', 20, 125);
      doc.text(`Applied Multiple: ${valuation.industryMultiple}x (industry standard)`, 20, 140);
      doc.text(`Calculation: SDE ($${parseInt(String(valuation.sde)).toLocaleString()}) × Multiple (${valuation.industryMultiple}x) = $${avgVal.toLocaleString()}`, 20, 155);
      doc.text(`Final Valuation Range: $${lowVal} - $${highVal}`, 20, 170);
      
      // Two-column layout for positives and risks
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Positive Value Drivers', 20, 190);
      doc.text('Key Risk Factors', 110, 190);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      // Positive drivers (left column)
      doc.text(`✓ Strong SDE margins (${sdeMargin}%)`, 20, 205);
      doc.text('✓ Established market presence', 20, 215);
      doc.text('✓ Proven business model', 20, 225);
      
      // Risk factors (right column)
      doc.text('⚠ Market competition', 110, 205);
      doc.text('⚠ Economic sensitivity', 110, 215);
      doc.text('⚠ Regulatory compliance', 110, 225);
      doc.text('⚠ Technology changes', 110, 235);
      
      // Important Disclaimer
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Important Disclaimer', 20, 255);
      
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      const disclaimerText = [
        'This business valuation report is prepared for informational purposes only and should not be considered as',
        'formal investment advice or professional business appraisal. The valuation estimates are based on industry',
        'standards and comparable analysis but may vary significantly based on specific market conditions, transaction',
        'circumstances, detailed due diligence findings, and individual business factors. For official valuations intended for',
        'legal, tax, or transaction purposes, please consult with a certified business appraiser or qualified financial',
        'professional.'
      ];
      
      disclaimerText.forEach((line, index) => {
        doc.text(line, 20, 268 + (index * 6));
      });
      
      // Footer
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`${valuation.businessName} | Professional Business Valuation Report | ${new Date().toLocaleDateString()}`, 105, 290, { align: 'center' });
      doc.text('Generated by ValuationGenie | Confidential & Proprietary', 105, 298, { align: 'center' });
      
      const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
      
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
  app.delete('/api/user/delete-all-data', requireSimpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      await storage.deleteAllUserData(userId);
      res.json({ message: 'All user data deleted successfully' });
    } catch (error: any) {
      console.error('Error deleting user data:', error);
      res.status(500).json({ message: 'Failed to delete user data: ' + error.message });
    }
  });

  // Admin routes
  app.get('/api/admin/users', requireSimpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
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

  app.get('/api/admin/stats', requireSimpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
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
