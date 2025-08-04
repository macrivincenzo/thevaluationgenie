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
      
      // Import Puppeteer for server-side PDF generation
      const puppeteer = await import('puppeteer');
      
      // Generate comprehensive HTML content for professional PDF
      const htmlContent = generateProfessionalHtml(valuation);
      
      // Launch Puppeteer and generate PDF
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const page = await browser.newPage();
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
      
      // Generate PDF with professional formatting
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '0.5in',
          right: '0.5in',
          bottom: '0.5in',
          left: '0.5in'
        }
      });
      
      await browser.close();
      
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
