import { Request, Response } from "express";
import { resilientStorage as storage } from "../storage-resilient";
import { requireSimpleAuth } from "../simpleAuth";
import { Router } from "express";

const router = Router();

// Grant lifetime access (for AppSumo integration)
router.post('/grant-lifetime', requireSimpleAuth, async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    const { source = 'appsumo', verificationCode, tier = 'unlimited' } = req.body;

    // Define tier-specific verification codes
    const validCodes = {
      // Basic Tier - $69 - 5 reports/month
      'APPSUMO-BASIC-2025': 'basic',
      'APPSUMO-STARTER-2025': 'basic',
      
      // Pro Tier - $89 - 10 reports/month  
      'APPSUMO-PRO-2025': 'pro',
      'APPSUMO-BUSINESS-2025': 'pro',
      
      // Unlimited Tier - $149 - Unlimited reports
      'APPSUMO-UNLIMITED-2025': 'unlimited',
      'APPSUMO-PREMIUM-2025': 'unlimited',
      'APPSUMO-LIFETIME-2025': 'unlimited', // Legacy code
      
      // Admin codes
      'DIRECT-LIFETIME-SPECIAL': 'unlimited',
      'ADMIN-GRANT-ACCESS': 'unlimited'
    };

    if (!verificationCode || !(verificationCode in validCodes)) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Get tier from verification code
    const assignedTier = validCodes[verificationCode as keyof typeof validCodes];
    const user = await storage.grantLifetimeAccess(userId, source, assignedTier, verificationCode);
    
    res.json({ 
      success: true, 
      user: {
        id: user.id,
        email: user.email,
        membershipType: user.membershipType,
        lifetimeAccess: user.lifetimeAccess,
        lifetimeTier: user.lifetimeTier,
        monthlyReportLimit: user.monthlyReportLimit,
        lifetimeSource: user.lifetimeSource
      }
    });
  } catch (error: any) {
    console.error('Error granting lifetime access:', error);
    res.status(500).json({ error: 'Failed to grant lifetime access' });
  }
});

// Check user's lifetime status
router.get('/status', requireSimpleAuth, async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      membershipType: user.membershipType,
      lifetimeAccess: user.lifetimeAccess,
      lifetimeTier: user.lifetimeTier,
      monthlyReportLimit: user.monthlyReportLimit,
      reportsUsedThisMonth: user.reportsUsedThisMonth,
      currentMonthStart: user.currentMonthStart,
      lifetimeSource: user.lifetimeSource,
      lifetimePurchaseDate: user.lifetimePurchaseDate,
      lifetimeFeatures: user.lifetimeFeatures
    });
  } catch (error: any) {
    console.error('Error checking lifetime status:', error);
    res.status(500).json({ error: 'Failed to check lifetime status' });
  }
});

export default router;