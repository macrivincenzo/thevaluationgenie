import { Request, Response } from "express";
import { storage } from "../storage";
import { requireSimpleAuth } from "../simpleAuth";
import { Router } from "express";

const router = Router();

// Grant lifetime access (for AppSumo integration)
router.post('/grant-lifetime', requireSimpleAuth, async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    const { source = 'appsumo', verificationCode } = req.body;

    // In production, you'd verify the AppSumo code here
    // For now, we'll use a simple verification code approach
    const validCodes = [
      'APPSUMO-LIFETIME-2025',
      'DIRECT-LIFETIME-SPECIAL',
      'ADMIN-GRANT-ACCESS'
    ];

    if (!verificationCode || !validCodes.includes(verificationCode)) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const user = await storage.grantLifetimeAccess(userId, source);
    
    res.json({ 
      success: true, 
      user: {
        id: user.id,
        email: user.email,
        membershipType: user.membershipType,
        lifetimeAccess: user.lifetimeAccess,
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