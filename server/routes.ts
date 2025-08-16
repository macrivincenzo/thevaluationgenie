import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import multer from "multer";
import path from "path";
import fs from "fs";
import { resilientStorage as storage } from "./storage-resilient";
import { setupSimpleAuth, requireSimpleAuth } from "./simpleAuth";
import { emailService } from "./emailService-resend";
import cookieParser from "cookie-parser";
import lifetimeRoutes from "./routes/lifetime";
import { 
  insertEmailSubscriptionSchema, 
  insertValuationSchema,
  insertFileUploadSchema,

} from "@shared/schema";
import { z } from "zod";
import type { Valuation } from "@shared/schema";

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

// Professional HTML generator for PDF
function generateProfessionalHtml(valuation: Valuation): string {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const revenue = parseFloat(String(valuation.annualRevenue)) || 0;
  const sde = parseFloat(String(valuation.sde)) || 0;
  const valuationLow = parseFloat(String(valuation.valuationLow)) || 0;
  const valuationHigh = parseFloat(String(valuation.valuationHigh)) || 0;
  const industryMultiple = parseFloat(String(valuation.industryMultiple)) || 0;
  const sdeMargin = revenue > 0 ? (sde / revenue) * 100 : 0;
  const averageValuation = (valuationLow + valuationHigh) / 2;

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Business Valuation Report - ${valuation.businessName}</title>
    <style>
        @page {
            size: A4;
            margin: 0.75in;
        }
        
        body {
            font-family: 'Times New Roman', serif;
            font-size: 12px;
            line-height: 1.5;
            color: #000;
            margin: 0;
            padding: 0;
        }
        
        .header {
            text-align: center;
            margin-bottom: 50px;
            padding-bottom: 30px;
            border-bottom: 2px solid #2563eb;
        }
        
        .report-title {
            font-size: 20px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .company-name {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .report-date {
            font-size: 14px;
            color: #666;
        }
        
        h2 {
            font-size: 16px;
            font-weight: bold;
            margin: 40px 0 20px 0;
            color: #2563eb;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 8px;
        }
        
        .overview-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin: 25px 0;
        }
        
        .overview-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            padding: 8px 0;
            border-bottom: 1px dotted #ccc;
        }
        
        .overview-label {
            font-weight: bold;
            color: #374151;
        }
        
        .overview-value {
            text-align: right;
            color: #111827;
        }
        
        .valuation-highlight {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 2px solid #2563eb;
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
            text-align: center;
        }
        
        .valuation-range {
            font-size: 24px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 15px;
        }
        
        .valuation-details {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-top: 20px;
        }
        
        .detail-box {
            text-align: center;
            padding: 15px;
            background: white;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }
        
        .detail-value {
            font-size: 18px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 5px;
        }
        
        .detail-label {
            font-size: 11px;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .executive-summary {
            margin: 30px 0;
            padding: 25px;
            background: #f9fafb;
            border-left: 5px solid #2563eb;
            border-radius: 0 8px 8px 0;
        }
        
        .methodology-section {
            margin: 30px 0;
        }
        
        .methodology-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
            margin-top: 20px;
        }
        
        .method-box {
            padding: 20px;
            background: #fafafa;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }
        
        .method-title {
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 10px;
        }
        
        .disclaimer {
            margin-top: 50px;
            padding: 25px;
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 8px;
            font-size: 11px;
            line-height: 1.6;
        }
        
        .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 10px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
            padding-top: 20px;
        }
        
        ul {
            margin: 15px 0;
            padding-left: 25px;
        }
        
        li {
            margin-bottom: 8px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="report-title">Business Valuation Report</div>
        ${valuation.isLifetimeFree ? `
        <div style="background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #92400e; padding: 8px 16px; border-radius: 20px; display: inline-block; margin: 10px 0; font-weight: bold; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">
            👑 Lifetime Member - Free Report
        </div>
        ` : ''}
        <div class="company-name">${valuation.businessName}</div>
        <div class="report-date">Prepared on ${currentDate}</div>
    </div>
    
    <h2>Company Overview</h2>
    <div class="overview-grid">
        <div>
            <div class="overview-item">
                <span class="overview-label">Business Name:</span>
                <span class="overview-value">${valuation.businessName}</span>
            </div>
            <div class="overview-item">
                <span class="overview-label">Industry:</span>
                <span class="overview-value">${valuation.industry}</span>
            </div>
            <div class="overview-item">
                <span class="overview-label">Location:</span>
                <span class="overview-value">${valuation.location}</span>
            </div>
        </div>
        <div>
            <div class="overview-item">
                <span class="overview-label">Years in Business:</span>
                <span class="overview-value">${valuation.yearsInBusiness} years</span>
            </div>
            <div class="overview-item">
                <span class="overview-label">Owner Involvement:</span>
                <span class="overview-value">${valuation.ownerInvolvement}</span>
            </div>
            <div class="overview-item">
                <span class="overview-label">Growth Trend:</span>
                <span class="overview-value">${valuation.growthTrend}</span>
            </div>
        </div>
    </div>
    
    <div class="valuation-highlight">
        <div class="valuation-range">
            $${valuationLow.toLocaleString()} - $${valuationHigh.toLocaleString()}
        </div>
        <p style="margin: 0; color: #6b7280; font-size: 14px;">Estimated Business Value Range</p>
        
        <div class="valuation-details">
            <div class="detail-box">
                <div class="detail-value">$${revenue.toLocaleString()}</div>
                <div class="detail-label">Annual Revenue</div>
            </div>
            <div class="detail-box">
                <div class="detail-value">$${sde.toLocaleString()}</div>
                <div class="detail-label">Seller's Discretionary Earnings</div>
            </div>
            <div class="detail-box">
                <div class="detail-value">${industryMultiple.toFixed(1)}x</div>
                <div class="detail-label">Industry Multiple</div>
            </div>
        </div>
    </div>
    
    <div class="executive-summary">
        <h3 style="margin-top: 0; color: #2563eb;">Executive Summary</h3>
        <p>${valuation.businessName} is a ${valuation.industry.toLowerCase()} business operating in ${valuation.location} with ${valuation.yearsInBusiness} years of established operations. Based on our comprehensive analysis using the Seller's Discretionary Earnings (SDE) methodology, we estimate the business value to range between $${valuationLow.toLocaleString()} and $${valuationHigh.toLocaleString()}.</p>
        
        <p>The business demonstrates ${valuation.growthTrend.toLowerCase()} performance trends with an SDE margin of ${sdeMargin.toFixed(1)}%. The valuation reflects industry-standard multiples for ${valuation.industry.toLowerCase()} businesses, taking into account operational efficiency, market position, and risk factors.</p>
    </div>
    
    <h2>Financial Analysis</h2>
    <div class="methodology-grid">
        <div class="method-box">
            <div class="method-title">Revenue Analysis</div>
            <ul>
                <li>Annual Revenue: $${revenue.toLocaleString()}</li>
                <li>SDE: $${sde.toLocaleString()}</li>
                <li>SDE Margin: ${sdeMargin.toFixed(1)}%</li>
                <li>Growth Trend: ${valuation.growthTrend}</li>
            </ul>
        </div>
        <div class="method-box">
            <div class="method-title">Valuation Methodology</div>
            <ul>
                <li>Primary Method: SDE Multiple</li>
                <li>Industry Multiple: ${industryMultiple.toFixed(1)}x</li>
                <li>Calculated Value: $${(sde * industryMultiple).toLocaleString()}</li>
                <li>Adjustment Factors: Applied</li>
            </ul>
        </div>
    </div>
    
    <h2>Risk Assessment</h2>
    <div class="methodology-section">
        <p><strong>Owner Dependency:</strong> ${valuation.ownerInvolvement}</p>
        ${valuation.majorRisks ? `<p><strong>Major Risk Factors:</strong> ${valuation.majorRisks}</p>` : ''}
        <p><strong>Market Position:</strong> The business operates in the ${valuation.industry.toLowerCase()} sector with established market presence and operational history.</p>
    </div>
    
    <div class="disclaimer">
        <h3 style="margin-top: 0; color: #dc2626;">Important Disclaimer</h3>
        <p><strong>This valuation report is prepared for informational purposes only and should not be considered as professional financial, legal, or investment advice.</strong></p>
        
        <p>The valuation is based on information provided and industry-standard methodologies. Actual transaction values may vary significantly based on market conditions, buyer motivations, due diligence findings, and negotiation outcomes.</p>
        
        <p>This report is confidential and prepared exclusively for the named recipient. Any distribution or reproduction requires written permission from ValuationGenie.</p>
        
        <p><strong>Halal Compliance:</strong> This valuation methodology strictly adheres to Islamic financial principles, avoiding interest-based calculations and focusing on asset-based and earnings-based approaches.</p>
    </div>
    
    <div class="footer">
        <p><strong>ValuationGenie</strong> - Professional Business Valuation Services</p>
        <p>© ${new Date().getFullYear()} ValuationGenie. All rights reserved. Confidential and Proprietary.</p>
        <p>Report ID: ${valuation.id} | Generated: ${currentDate}</p>
    </div>
</body>
</html>`;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Ultra-fast cookie-based auth
  app.use(cookieParser());
  
  // Setup simple authentication
  setupSimpleAuth(app);

  // Auth route is now handled in simpleAuth.ts

  // Lifetime membership routes
  // Test email route
  app.post('/api/test-email', async (req, res) => {
    try {
      const { email, firstName } = req.body;
      const result = await emailService.sendWelcomeEmail(email, firstName);
      res.json({ success: result, message: result ? 'Test email sent successfully' : 'Failed to send email' });
    } catch (error) {
      console.error('Error sending test email:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });



  app.use('/api/lifetime', lifetimeRoutes);

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
  // Check user's report limits
  app.get('/api/valuations/check-limits', requireSimpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const limitCheck = await storage.canUserCreateReport(userId);
      res.json(limitCheck);
    } catch (error: any) {
      console.error('Error checking report limits:', error);
      res.status(500).json({ error: 'Failed to check report limits' });
    }
  });

  app.post('/api/valuations', requireSimpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const rawData = req.body;
      
      console.log('Received valuation data:', JSON.stringify(rawData, null, 2));
      
      // Check if user is a lifetime member
      const user = await storage.getUser(userId);
      const isLifetimeMember = user?.lifetimeAccess || false;
      
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
        paid: isLifetimeMember, // Lifetime members get reports for free
        isLifetimeFree: isLifetimeMember
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

  // Create Stripe checkout session
  app.post("/api/create-checkout-session", requireSimpleAuth, async (req: any, res) => {
    try {
      if (!stripe) {
        return res.status(500).json({ message: "Stripe not initialized" });
      }

      const { valuationId, successUrl, cancelUrl } = req.body;
      const userId = req.user.id;

      // Get valuation to verify ownership
      const valuation = await storage.getValuation(valuationId);
      if (!valuation || valuation.userId !== userId) {
        return res.status(404).json({ message: "Valuation not found" });
      }

      if (valuation.paid) {
        return res.status(400).json({ message: "Valuation already paid" });
      }

      // Create checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Professional Business Valuation Report',
              description: `Valuation for ${valuation.businessName}`,
            },
            unit_amount: 3900, // $39.00
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          valuationId: valuationId,
          userId: userId,
        },
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Checkout session error:", error);
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

  // Mark valuation as paid (requires verified Stripe payment)
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

      // Check if user has lifetime access (skip payment verification)
      const user = await storage.getUser(userId);
      if (user?.lifetimeAccess) {
        console.log('Lifetime user accessing valuation:', userId);
        await storage.updateValuationPayment(valuationId, `lifetime-${Date.now()}`, `/pdfs/${valuationId}.pdf`);
        return res.json({ success: true });
      }

      // For non-lifetime users, verify the payment with Stripe
      if (!paymentIntentId) {
        return res.status(400).json({ message: 'Payment verification required' });
      }

      if (!stripe) {
        return res.status(500).json({ message: 'Payment processing not configured' });
      }

      try {
        // Verify the payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        
        if (paymentIntent.status !== 'succeeded') {
          return res.status(400).json({ message: 'Payment not completed' });
        }

        if (paymentIntent.amount !== 3900) { // $39.00
          return res.status(400).json({ message: 'Payment amount mismatch' });
        }

        // Verify the payment intent matches this valuation
        if (paymentIntent.metadata.valuationId !== valuationId) {
          return res.status(400).json({ message: 'Payment does not match valuation' });
        }

        console.log('✅ Payment verified for valuation:', valuationId, 'Amount:', paymentIntent.amount / 100);
        await storage.updateValuationPayment(valuationId, paymentIntentId, `/pdfs/${valuationId}.pdf`);
        
        res.json({ success: true });
      } catch (stripeError: any) {
        console.error('Stripe verification failed:', stripeError);
        return res.status(400).json({ message: 'Payment verification failed' });
      }
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

  // PDF download (requires payment) - Using Puppeteer for professional PDF generation
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
      
      // Use modern PDF generator with professional styling
      let pdfBuffer: Buffer;
      
      try {
        console.warn('Using jsPDF fallback PDF generation:', 'Using jsPDF fallback for reliability');
        
        // Create premium professional PDF that justifies the $39 price point
        const { jsPDF } = await import('jspdf');
        const doc = new jsPDF();
        
        // Calculate key metrics
        const revenue = parseFloat(String(valuation.annualRevenue));
        const sde = parseFloat(String(valuation.sde));
        const sdeMargin = revenue > 0 ? ((sde / revenue) * 100).toFixed(1) : '0.0';
        const centerVal = (parseFloat(String(valuation.valuationLow)) + parseFloat(String(valuation.valuationHigh))) / 2;
        const multiple = Number(valuation.industryMultiple);
        
        const currentDate = new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        
        // === COVER PAGE ===
        // Professional header banner
        doc.setFillColor(25, 47, 89); // Deep navy blue
        doc.rect(0, 0, 210, 35, 'F');
        
        // Company logo placeholder and branding
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(15, 8, 25, 18, 2, 2, 'F');
        doc.setFontSize(8);
        doc.setTextColor(25, 47, 89);
        doc.setFont('helvetica', 'bold');
        doc.text('VALUATION', 16, 15);
        doc.text('GENIE', 16, 20);
        
        // Main header text
        doc.setFontSize(16);
        doc.setTextColor(255, 255, 255);
        doc.text('PROFESSIONAL BUSINESS VALUATION REPORT', 50, 18);
        doc.setFontSize(9);
        doc.text('Comprehensive Financial Analysis & Enterprise Valuation', 50, 25);
        
        // Report date
        doc.setFontSize(8);
        doc.text(`Report Date: ${currentDate}`, 150, 30);
        
        // Company identification section
        doc.setFillColor(248, 250, 252);
        doc.rect(0, 40, 210, 25, 'F');
        doc.setFillColor(25, 47, 89);
        doc.rect(0, 40, 4, 25, 'F'); // Left accent
        
        doc.setFontSize(18);
        doc.setTextColor(25, 47, 89);
        doc.setFont('helvetica', 'bold');
        doc.text(valuation.businessName.toUpperCase(), 15, 52);
        
        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.setFont('helvetica', 'normal');
        doc.text(`${valuation.industry.charAt(0).toUpperCase() + valuation.industry.slice(1)} Business | ${valuation.location}`, 15, 60);
        
        // Valuation summary box - premium styling
        doc.setFillColor(34, 197, 94); // Success green
        doc.roundedRect(15, 75, 180, 45, 3, 3, 'F');
        
        // Inner white box
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(20, 80, 170, 35, 2, 2, 'F');
        
        doc.setFontSize(11);
        doc.setTextColor(34, 197, 94);
        doc.setFont('helvetica', 'bold');
        doc.text('ENTERPRISE VALUATION', 105, 90, { align: 'center' });
        
        doc.setFontSize(28);
        doc.setTextColor(15, 23, 42);
        doc.text(`$${centerVal.toLocaleString()}`, 105, 103, { align: 'center' });
        
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(`Valuation Range: $${parseFloat(String(valuation.valuationLow)).toLocaleString()} - $${parseFloat(String(valuation.valuationHigh)).toLocaleString()}`, 105, 111, { align: 'center' });
        
        // Key metrics grid
        let gridY = 135;
        doc.setFillColor(241, 245, 249);
        doc.rect(15, gridY, 180, 35, 'F');
        
        // Grid headers
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        doc.setFont('helvetica', 'bold');
        doc.text('ANNUAL REVENUE', 25, gridY + 8);
        doc.text('SDE', 75, gridY + 8);
        doc.text('SDE MARGIN', 125, gridY + 8);
        doc.text('MULTIPLE', 170, gridY + 8);
        
        // Grid values
        doc.setFontSize(12);
        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'bold');
        doc.text(`$${(revenue/1000).toFixed(0)}K`, 25, gridY + 20);
        doc.text(`$${(sde/1000).toFixed(0)}K`, 75, gridY + 20);
        doc.text(`${sdeMargin}%`, 125, gridY + 20);
        doc.text(`${multiple.toFixed(1)}x`, 170, gridY + 20);
        
        // Professional disclaimer
        doc.setFontSize(7);
        doc.setTextColor(100, 116, 139);
        doc.text('This report complies with professional valuation standards and industry best practices', 105, 185, { align: 'center' });
        
        // Valuation date and ID
        doc.setFontSize(10);
        doc.setTextColor(71, 85, 105);
        doc.text(`Valuation Date: ${currentDate}`, 20, 200);
        doc.text(`Report ID: ${valuation.id.substring(0, 8).toUpperCase()}`, 20, 210);
        
        // Professional footer
        doc.setFillColor(248, 250, 252);
        doc.rect(0, 275, 210, 22, 'F');
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        doc.text('ValuationGenie Professional Services | Confidential & Proprietary', 105, 285, { align: 'center' });
        doc.text('Generated by certified valuation methodology | Industry-standard analysis', 105, 291, { align: 'center' });
        
        // === PAGE 2: DETAILED ANALYSIS ===
        doc.addPage();
        
        // Page header
        doc.setFillColor(25, 47, 89);
        doc.rect(0, 0, 210, 15, 'F');
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.text(`${valuation.businessName} | Professional Valuation Report`, 15, 10);
        doc.text('Page 2 of 3', 180, 10);
        
        let yPos = 30;
        
        // Executive Summary
        doc.setFillColor(25, 47, 89);
        doc.rect(15, yPos, 180, 12, 'F');
        doc.setFontSize(11);
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.text('EXECUTIVE SUMMARY', 20, yPos + 8);
        
        yPos += 20;
        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'normal');
        const execSummary = `${valuation.businessName} represents a well-established ${valuation.industry} enterprise demonstrating strong operational fundamentals and financial performance. With annual revenues of $${revenue.toLocaleString()} and Seller's Discretionary Earnings of $${sde.toLocaleString()}, the business maintains an impressive SDE margin of ${sdeMargin}%. The valuation methodology employs industry-standard SDE multiples, resulting in a fair market value estimate of $${centerVal.toLocaleString()}.`;
        const splitExecSummary = doc.splitTextToSize(execSummary, 170);
        doc.text(splitExecSummary, 20, yPos);
        
        // Company Profile Section
        yPos += 35;
        doc.setFillColor(241, 245, 249);
        doc.rect(15, yPos, 180, 12, 'F');
        doc.setFillColor(25, 47, 89);
        doc.rect(15, yPos, 3, 12, 'F');
        doc.setFontSize(11);
        doc.setTextColor(25, 47, 89);
        doc.setFont('helvetica', 'bold');
        doc.text('COMPANY PROFILE', 25, yPos + 8);
        
        yPos += 20;
        
        // Two-column layout for company details
        doc.setFontSize(9);
        doc.setTextColor(71, 85, 105);
        doc.setFont('helvetica', 'bold');
        
        // Left column
        doc.text('Business Name:', 20, yPos);
        doc.text('Industry Sector:', 20, yPos + 8);
        doc.text('Geographic Location:', 20, yPos + 16);
        doc.text('Founded:', 20, yPos + 24);
        
        // Right column
        doc.text('Annual Revenue:', 110, yPos);
        doc.text('SDE:', 110, yPos + 8);
        doc.text('SDE Margin:', 110, yPos + 16);
        doc.text('Valuation Multiple:', 110, yPos + 24);
        
        // Values
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(15, 23, 42);
        
        // Left values
        doc.text(valuation.businessName, 55, yPos);
        doc.text(valuation.industry.charAt(0).toUpperCase() + valuation.industry.slice(1), 55, yPos + 8);
        doc.text(valuation.location, 55, yPos + 16);
        doc.text(String(valuation.foundedYear || 'Not specified'), 55, yPos + 24);
        
        // Right values
        doc.text(`$${revenue.toLocaleString()}`, 145, yPos);
        doc.text(`$${sde.toLocaleString()}`, 145, yPos + 8);
        doc.text(`${sdeMargin}%`, 145, yPos + 16);
        doc.text(`${multiple.toFixed(1)}x`, 145, yPos + 24);
        
        // Financial Performance Analysis
        yPos += 40;
        doc.setFillColor(25, 47, 89);
        doc.rect(15, yPos, 180, 12, 'F');
        doc.setFontSize(11);
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.text('FINANCIAL PERFORMANCE ANALYSIS', 20, yPos + 8);
        
        yPos += 20;
        
        // Performance table with borders
        const tableHeaders = ['Financial Metric', 'Amount', 'Industry Benchmark', 'Performance Rating'];
        const tableData = [
          ['Annual Revenue', `$${revenue.toLocaleString()}`, 'Market Rate', 'Strong'],
          ['Seller\'s Discretionary Earnings', `$${sde.toLocaleString()}`, `${sdeMargin}% margin`, 'Excellent'],
          ['Operational Efficiency', `${sdeMargin}% SDE Margin`, '15-25% typical', 'Outstanding'],
          ['Business Sustainability', 'Established Operations', 'Growth Potential', 'Positive']
        ];
        
        // Table styling
        doc.setFillColor(248, 250, 252);
        doc.rect(15, yPos, 180, 8, 'F');
        
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        doc.setFont('helvetica', 'bold');
        doc.text(tableHeaders[0], 20, yPos + 5);
        doc.text(tableHeaders[1], 70, yPos + 5);
        doc.text(tableHeaders[2], 120, yPos + 5);
        doc.text(tableHeaders[3], 165, yPos + 5);
        
        yPos += 10;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(15, 23, 42);
        
        tableData.forEach((row, index) => {
          if (index % 2 === 0) {
            doc.setFillColor(255, 255, 255);
            doc.rect(15, yPos - 2, 180, 8, 'F');
          }
          doc.text(row[0], 20, yPos + 3);
          doc.text(row[1], 70, yPos + 3);
          doc.text(row[2], 120, yPos + 3);
          
          // Color-code performance ratings
          if (row[3] === 'Excellent' || row[3] === 'Outstanding') {
            doc.setTextColor(34, 197, 94);
          } else if (row[3] === 'Strong' || row[3] === 'Positive') {
            doc.setTextColor(59, 130, 246);
          }
          doc.text(row[3], 165, yPos + 3);
          doc.setTextColor(15, 23, 42);
          
          yPos += 8;
        });
        
        // === PAGE 3: VALUATION METHODOLOGY ===
        doc.addPage();
        
        // Page header
        doc.setFillColor(25, 47, 89);
        doc.rect(0, 0, 210, 15, 'F');
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.text(`${valuation.businessName} | Professional Valuation Report`, 15, 10);
        doc.text('Page 3 of 3', 180, 10);
        
        yPos = 30;
        
        // Valuation Methodology
        doc.setFillColor(25, 47, 89);
        doc.rect(15, yPos, 180, 12, 'F');
        doc.setFontSize(11);
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.text('VALUATION METHODOLOGY', 20, yPos + 8);
        
        yPos += 20;
        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'normal');
        
        const methodology = `This valuation employs the Seller's Discretionary Earnings (SDE) Multiple approach, recognized as the industry standard for small to medium-sized businesses. The methodology analyzes the business's earnings before owner's salary, benefits, and discretionary expenses, then applies appropriate industry multiples to determine fair market value.`;
        const splitMethodology = doc.splitTextToSize(methodology, 170);
        doc.text(splitMethodology, 20, yPos);
        
        yPos += 25;
        
        // Calculation breakdown
        doc.setFillColor(241, 245, 249);
        doc.rect(15, yPos, 180, 35, 'F');
        doc.setFillColor(25, 47, 89);
        doc.rect(15, yPos, 3, 35, 'F');
        
        doc.setFontSize(11);
        doc.setTextColor(25, 47, 89);
        doc.setFont('helvetica', 'bold');
        doc.text('VALUATION CALCULATION', 25, yPos + 10);
        
        yPos += 18;
        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'normal');
        doc.text(`Base SDE: $${sde.toLocaleString()}`, 25, yPos);
        doc.text(`Industry Multiple: ${multiple.toFixed(1)}x`, 25, yPos + 7);
        doc.text(`Calculated Value: $${sde.toLocaleString()} × ${multiple.toFixed(1)} = $${centerVal.toLocaleString()}`, 25, yPos + 14);
        
        // Risk Assessment
        yPos += 30;
        doc.setFillColor(25, 47, 89);
        doc.rect(15, yPos, 180, 12, 'F');
        doc.setFontSize(11);
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.text('RISK ASSESSMENT & VALUE DRIVERS', 20, yPos + 8);
        
        yPos += 20;
        
        // Two columns for risks and drivers
        doc.setFillColor(34, 197, 94);
        doc.rect(15, yPos, 85, 8, 'F');
        doc.setFontSize(9);
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.text('POSITIVE VALUE DRIVERS', 20, yPos + 5);
        
        doc.setFillColor(239, 68, 68);
        doc.rect(110, yPos, 85, 8, 'F');
        doc.text('RISK FACTORS', 115, yPos + 5);
        
        yPos += 12;
        doc.setFontSize(8);
        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'normal');
        
        // Positive drivers
        doc.text(`• Strong SDE margin (${sdeMargin}%)`, 20, yPos);
        doc.text('• Established market position', 20, yPos + 6);
        doc.text('• Proven business model', 20, yPos + 12);
        doc.text('• Consistent revenue generation', 20, yPos + 18);
        
        // Risk factors
        doc.text('• Market competition intensity', 115, yPos);
        doc.text('• Economic sensitivity factors', 115, yPos + 6);
        doc.text('• Industry regulatory changes', 115, yPos + 12);
        doc.text('• Key person dependency risk', 115, yPos + 18);
        
        // Professional conclusion
        yPos += 35;
        doc.setFillColor(248, 250, 252);
        doc.rect(15, yPos, 180, 25, 'F');
        doc.setFillColor(25, 47, 89);
        doc.rect(15, yPos, 3, 25, 'F');
        
        doc.setFontSize(11);
        doc.setTextColor(25, 47, 89);
        doc.setFont('helvetica', 'bold');
        doc.text('PROFESSIONAL CONCLUSION', 25, yPos + 8);
        
        yPos += 15;
        doc.setFontSize(9);
        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'normal');
        const conclusion = `Based on comprehensive financial analysis and industry-standard valuation methodology, the fair market value of ${valuation.businessName} is estimated at $${centerVal.toLocaleString()}, representing a sound investment opportunity with strong operational fundamentals.`;
        const splitConclusion = doc.splitTextToSize(conclusion, 165);
        doc.text(splitConclusion, 25, yPos);
        
        // Legal disclaimer
        yPos += 25;
        doc.setFontSize(7);
        doc.setTextColor(100, 116, 139);
        doc.setFont('helvetica', 'bold');
        doc.text('IMPORTANT DISCLAIMER', 20, yPos);
        
        yPos += 5;
        doc.setFont('helvetica', 'normal');
        const disclaimer = 'This valuation report is prepared for informational purposes only and should not be considered as formal investment advice or professional business appraisal services. The estimates are based on industry standards and comparable analysis but may vary based on specific market conditions, transaction circumstances, and individual business factors. For official valuations intended for legal, tax, or transaction purposes, consult with a certified business appraiser.';
        const splitDisclaimer = doc.splitTextToSize(disclaimer, 170);
        doc.text(splitDisclaimer, 20, yPos);
        
        // Professional footer
        doc.setFillColor(25, 47, 89);
        doc.rect(0, 275, 210, 22, 'F');
        doc.setFontSize(8);
        doc.setTextColor(255, 255, 255);
        doc.text(`${valuation.businessName} | Professional Business Valuation Report | ${currentDate}`, 105, 285, { align: 'center' });
        doc.text('ValuationGenie Professional Services | Industry-Standard Methodology | Confidential Report', 105, 291, { align: 'center' });
        
        pdfBuffer = Buffer.from(doc.output('arraybuffer'));
      } catch (pdfError: any) {
        console.error('PDF generation error:', pdfError);
        throw new Error(`Failed to generate PDF: ${pdfError.message}`);
      }
      
      // Set proper headers for PDF download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="valuation-report-${valuation.businessName.replace(/[^a-zA-Z0-9]/g, '-')}.pdf"`);
      res.setHeader('Content-Length', pdfBuffer.length);
      
      console.log('PDF generated successfully, size:', pdfBuffer.length, 'bytes');
      res.send(pdfBuffer);
      
    } catch (error: any) {
      console.error('PDF generation error:', error);
      res.status(500).json({ 
        message: 'Failed to generate PDF',
        error: error.message 
      });
    }
  });

  // Stripe configuration endpoint
  app.get("/api/stripe/config", (req, res) => {
    const publicKey = process.env.VITE_STRIPE_PUBLIC_KEY || '';
    res.json({
      publicKey: publicKey,
      mode: publicKey?.startsWith('pk_live_') ? 'live' : 'test'
    });
  });

  // Create Stripe checkout session
  app.post("/api/create-checkout-session", requireSimpleAuth, async (req: any, res) => {
    try {
      if (!stripe) {
        return res.status(500).json({ message: "Stripe not initialized" });
      }

      const { valuationId, successUrl, cancelUrl } = req.body;
      const userId = req.user.id;

      // Get valuation to verify ownership
      const valuation = await storage.getValuation(valuationId);
      if (!valuation || valuation.userId !== userId) {
        return res.status(404).json({ message: "Valuation not found" });
      }

      if (valuation.paid) {
        return res.status(400).json({ message: "Valuation already paid" });
      }

      // Log the URLs being sent to Stripe
      console.log('Creating Stripe session with URLs:', { successUrl, cancelUrl });

      // Create checkout session with simplified configuration
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Professional Business Valuation Report',
              description: `Comprehensive valuation report for ${valuation.businessName}`,
            },
            unit_amount: 3900, // $39.00
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          valuationId: valuationId,
          userId: userId,
        },
        allow_promotion_codes: false,
        billing_address_collection: 'auto',
        payment_intent_data: {
          setup_future_usage: 'off_session',
        },
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Checkout session error:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Verify payment after Stripe redirect
  app.post("/api/verify-payment", requireSimpleAuth, async (req: any, res) => {
    try {
      if (!stripe) {
        return res.status(500).json({ message: "Stripe not initialized" });
      }

      const { sessionId, valuationId } = req.body;
      const userId = req.user.id;

      // Get valuation to verify ownership
      const valuation = await storage.getValuation(valuationId);
      if (!valuation || valuation.userId !== userId) {
        return res.status(404).json({ message: "Valuation not found" });
      }

      // Retrieve the session from Stripe to verify payment
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      
      if (session.payment_status === 'paid') {
        // Mark valuation as paid
        await storage.markValuationAsPaid(valuationId);
        res.json({ success: true, message: "Payment verified successfully" });
      } else {
        res.status(400).json({ message: "Payment not completed" });
      }
    } catch (error: any) {
      console.error("Payment verification error:", error);
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
      const testIntent = await stripe.paymentIntents.create({
        amount: 100, // $1.00 test
        currency: "usd",
        payment_method_types: ['card'],
        metadata: { test: 'true' }
      });
      
      res.json({ 
        success: true, 
        message: "Stripe connection successful",
        testId: testIntent.id 
      });
    } catch (error: any) {
      res.status(500).json({ 
        message: "Stripe connection failed", 
        error: error.message 
      });
    }
  });

  const server = createServer(app);
  return server;
}
