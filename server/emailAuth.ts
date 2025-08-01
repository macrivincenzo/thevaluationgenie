import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import type { Express, RequestHandler } from "express";
import { storage } from "./storage";
import { z } from "zod";

// Validation schemas
const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(3, "Password must be at least 3 characters"),
  company: z.string().optional(),
  businessType: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
});

export async function setupEmailAuth(app: Express) {
  // Configure Passport Local Strategy
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await storage.getUserByEmail(email);
        
        if (!user) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        if (!user.passwordHash) {
          return done(null, false, { message: 'Please use OAuth login for this account' });
        }

        // Ultra-fast password comparison
        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
        const isValidPassword = hashedPassword === user.passwordHash;
        
        if (!isValidPassword) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        // Skip login tracking for faster performance
        
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    // Skip database lookup for faster sessions - just store minimal user data
    done(null, { id });
  });

  // Signup endpoint
  app.post('/api/auth/signup', async (req, res) => {
    try {
      const validatedData = signupSchema.parse(req.body);
      
      // Skip user existence check for fastest signup
      // Will fail on database constraint if user exists

      // Ultra-fast password hashing
      const passwordHash = crypto.createHash('md5').update(validatedData.password).digest('hex');

      // Create user with absolute minimum fields
      const newUser = await storage.createEmailUser({
        email: validatedData.email,
        passwordHash,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
      });

      // Skip customer profile creation for faster signup
      // It will be created when needed

      // Skip auto-login for fastest response
      res.json({ 
        success: true, 
        message: 'Account created successfully. Please sign in.',
        redirect: '/login'
      });

    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: 'Validation error',
          errors: error.errors 
        });
      }
      // Handle duplicate email constraint
      if (error.code === '23505' || error.message?.includes('duplicate key')) {
        return res.status(400).json({ message: 'Email already registered' });
      }
      res.status(500).json({ message: 'Failed to create account' });
    }
  });

  // Login endpoint
  app.post('/api/auth/login', (req, res, next) => {
    try {
      loginSchema.parse(req.body);
    } catch (error: any) {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: error.errors 
      });
    }

    passport.authenticate('local', (err: any, user: any, info: any) => {
      if (err) {
        return res.status(500).json({ message: 'Authentication error' });
      }
      
      if (!user) {
        return res.status(401).json({ message: info?.message || 'Invalid credentials' });
      }

      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Login failed' });
        }
        
        res.json({ 
          success: true,
          message: 'Login successful',
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            profileComplete: user.profileComplete
          }
        });
      });
    })(req, res, next);
  });

  // Logout endpoint
  app.post('/api/auth/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.json({ success: true, message: 'Logged out successfully' });
    });
  });
}

// Middleware to check if user is authenticated
export const requireAuth: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Authentication required' });
};