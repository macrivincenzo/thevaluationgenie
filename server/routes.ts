import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import multer from "multer";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertEmailSubscriptionSchema, 
  insertValuationSchema,
  insertFileUploadSchema 
} from "@shared/schema";
import { z } from "zod";

// Stripe setup - only initialize if key is available
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-06-30.basil",
  });
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
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
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
      const data = insertValuationSchema.parse({
        ...req.body,
        userId
      });
      
      // Calculate valuation based on industry multiples
      const { calculateValuation } = await import('../client/src/lib/industry-multiples.ts');
      
      // Extract SDE from the new data structure (support both old and new formats)
      let sdeValue = 0;
      if (data.sdeData && Array.isArray(data.sdeData)) {
        // Use the most recent year's SDE data
        sdeValue = data.sdeData[0] || 0;
      } else if (data.sde) {
        sdeValue = parseFloat(data.sde.toString());
      }
      
      const { low, high, multiple } = calculateValuation(data.industry, sdeValue);
      
      const valuation = await storage.createValuation({
        ...data,
        valuationLow: low.toString(),
        valuationHigh: high.toString(),
        industryMultiple: multiple.toString()
      });
      
      res.json(valuation);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
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

  // Stripe payment
  app.post("/api/create-payment-intent", isAuthenticated, async (req: any, res) => {
    try {
      const { valuationId } = req.body;
      const userId = req.user.claims.sub;
      
      const valuation = await storage.getValuation(valuationId);
      if (!valuation || valuation.userId !== userId) {
        return res.status(404).json({ message: 'Valuation not found' });
      }
      
      const paymentIntent = await stripe!.paymentIntents.create({
        amount: 9900, // $99.00 in cents
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

  // PDF download
  app.get('/api/valuations/:id/pdf', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const valuation = await storage.getValuation(req.params.id);
      
      if (!valuation || valuation.userId !== userId || !valuation.paid) {
        return res.status(404).json({ message: 'PDF not found or not paid' });
      }
      
      // Generate PDF on demand
      const { generateValuationPDF } = await import('../client/src/lib/pdf-generator.ts');
      const { getIndustryMultiple } = await import('../client/src/lib/industry-multiples.ts');
      const industryData = getIndustryMultiple(valuation.industry);
      const pdf = generateValuationPDF({ valuation, industryData });
      const pdfBuffer = pdf.output('arraybuffer');
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${valuation.businessName}-valuation.pdf"`);
      res.send(pdfBuffer);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
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
