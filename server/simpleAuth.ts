import type { Express, RequestHandler } from "express";
import crypto from "crypto";
import { z } from "zod";
import { emailService } from "./emailService-resend";

// In-memory user storage for maximum speed
const users = new Map<string, {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
}>();

// Create default users for development
const testUserId = "test-user-id";
const testPasswordHash = crypto.createHash('md5').update("test").digest('hex');
users.set(testUserId, {
  id: testUserId,
  email: "test@test.com",
  passwordHash: testPasswordHash,
  firstName: "Test",
  lastName: "User",
});

// Create your user account
const yourUserId = "your-user-id";
const yourPasswordHash = crypto.createHash('md5').update("123").digest('hex');
users.set(yourUserId, {
  id: yourUserId,
  email: "macrivincenzo@hotmail.com",
  passwordHash: yourPasswordHash,
  firstName: "",
  lastName: "",
});

console.log('Users created:', Array.from(users.values()).map(u => u.email));

// In-memory session storage
const sessions = new Map<string, string>(); // sessionId -> userId

const signupSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(3),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export function setupSimpleAuth(app: Express) {
  // Ultra-fast signup
  app.post('/api/auth/signup', async (req, res) => {
    try {
      const data = signupSchema.parse(req.body);
      
      // Check if user already exists
      for (const user of Array.from(users.values())) {
        if (user.email === data.email) {
          return res.status(400).json({ message: 'Email already registered' });
        }
      }
      
      // Create user instantly
      const userId = crypto.randomUUID();
      const passwordHash = crypto.createHash('md5').update(data.password).digest('hex');
      
      users.set(userId, {
        id: userId,
        email: data.email,
        passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      
      // Check if password is an AppSumo activation code and auto-activate
      const isAppSumoCode = data.password.startsWith('APPSUMO-') && data.password.endsWith('-2025');
      if (isAppSumoCode) {
        console.log('Auto-activating AppSumo code for new user:', data.email, data.password);
        try {
          const { resilientStorage } = await import('./storage-resilient');
          
          // Define valid codes and their tiers
          const validCodes: Record<string, string> = {
            'APPSUMO-BASIC-2025': 'basic',
            'APPSUMO-STARTER-2025': 'basic',
            'APPSUMO-PRO-2025': 'pro', 
            'APPSUMO-BUSINESS-2025': 'pro',
            'APPSUMO-UNLIMITED-2025': 'unlimited',
            'APPSUMO-PREMIUM-2025': 'unlimited',
            'APPSUMO-LIFETIME-2025': 'unlimited',
          };
          
          const tier = validCodes[data.password];
          if (tier) {
            await resilientStorage.grantLifetimeAccess(userId, 'appsumo', tier, data.password);
            console.log('Successfully activated AppSumo lifetime access for:', data.email, 'tier:', tier);
          }
        } catch (error) {
          console.error('Failed to auto-activate AppSumo code:', error);
          // Don't fail signup if activation fails - user can activate manually later
        }
      }
      
      // Send welcome email (async, don't wait for it)
      emailService.sendWelcomeEmail(data.email, data.firstName).catch(err => {
        console.log('Welcome email failed (non-blocking):', err.message);
      });
      
      res.json({ success: true, message: 'Account created successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid data' });
    }
  });

  // Ultra-fast login
  app.post('/api/auth/login', (req, res) => {
    try {
      const data = loginSchema.parse(req.body);
      console.log('Login attempt for:', data.email);
      console.log('Available users:', Array.from(users.values()).map(u => u.email));
      
      // Find user
      let user = null;
      for (const u of Array.from(users.values())) {
        if (u.email === data.email) {
          user = u;
          break;
        }
      }
      
      if (!user) {
        console.log('User not found:', data.email);
        return res.status(401).json({ message: 'Welcome! It looks like you\'re new here. Please create an account to get started with your professional business valuation.' });
      }
      
      // Check password
      const passwordHash = crypto.createHash('md5').update(data.password).digest('hex');
      console.log('Password hash attempt:', passwordHash);
      console.log('Stored hash:', user.passwordHash);
      
      if (passwordHash !== user.passwordHash) {
        // Check if password is an AppSumo activation code
        const isAppSumoCode = data.password.startsWith('APPSUMO-') && data.password.endsWith('-2025');
        if (isAppSumoCode) {
          console.log('AppSumo code detected for existing user:', data.email);
          return res.status(401).json({ 
            message: 'It looks like you\'re trying to use an AppSumo code, but this email already has an account with a different password. Please use your original password to sign in, then activate your AppSumo code from the /lifetime page.' 
          });
        }
        
        console.log('Password mismatch for user:', data.email);
        return res.status(401).json({ message: 'Please double-check your password. If you forgot it, no worries - we\'re here to help you get back in.' });
      }
      
      // Create session
      const sessionId = crypto.randomUUID();
      sessions.set(sessionId, user.id);
      
      // Set cookie - temporarily disable secure for debugging
      res.cookie('session', sessionId, { 
        httpOnly: true, 
        secure: false, // Changed from true to false for local development
        maxAge: 24 * 60 * 60 * 1000 
      });
      
      res.json({ 
        success: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      });
    } catch (error) {
      res.status(400).json({ message: 'Invalid data' });
    }
  });

  // Ultra-fast user check
  app.get('/api/auth/user', (req, res) => {
    const sessionId = req.cookies.session;
    if (!sessionId || !sessions.has(sessionId)) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    const userId = sessions.get(sessionId)!;
    const user = users.get(userId);
    
    if (!user) {
      sessions.delete(sessionId);
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profileComplete: true,
    });
  });

  // Logout GET route - instant redirect
  app.get('/api/auth/logout', (req, res) => {
    const sessionId = req.cookies.session;
    console.log('Logout request, clearing session:', sessionId);
    if (sessionId) {
      sessions.delete(sessionId);
      console.log('Session deleted from memory');
    }
    res.clearCookie('session', { path: '/', httpOnly: true, secure: false });
    console.log('Cookie cleared, redirecting to homepage');
    res.redirect('/'); // Direct browser redirect
  });

  // Logout POST - instant redirect
  app.post('/api/auth/logout', (req, res) => {
    const sessionId = req.cookies.session;
    console.log('POST Logout request, clearing session:', sessionId);
    if (sessionId) {
      sessions.delete(sessionId);
      console.log('Session deleted from memory');
    }
    res.clearCookie('session', { path: '/', httpOnly: true, secure: false });
    console.log('Cookie cleared, redirecting to homepage');
    res.redirect('/'); // Instant redirect
  });
}

// Simple auth middleware
export const requireSimpleAuth: RequestHandler = (req, res, next) => {
  const sessionId = req.cookies.session;
  if (!sessionId || !sessions.has(sessionId)) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  const userId = sessions.get(sessionId)!;
  const user = users.get(userId);
  
  if (!user) {
    sessions.delete(sessionId);
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  (req as any).user = user;
  next();
};