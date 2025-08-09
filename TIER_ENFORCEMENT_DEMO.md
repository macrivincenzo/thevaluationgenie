# AppSumo Tier Enforcement - How It Works

## Overview
The three-tier system ensures Pro Tier customers (who paid $89) only get 10 reports per month, not unlimited access.

## Step-by-Step Process

### 1. **Customer Purchases on AppSumo**
- Basic Tier ($69): Gets code `APPSUMO-BASIC-2025`  
- Pro Tier ($89): Gets code `APPSUMO-PRO-2025` 
- Unlimited ($149): Gets code `APPSUMO-UNLIMITED-2025`

### 2. **Code Activation Sets Tier**
When Pro customer enters `APPSUMO-PRO-2025`, system automatically sets:
```javascript
{
  lifetimeTier: 'pro',
  monthlyReportLimit: 10,
  reportsUsedThisMonth: 0,
  currentMonthStart: new Date()
}
```

### 3. **Report Creation Enforcement**
**Before** creating any valuation report, the system checks:

```javascript
// In storage.ts - canUserCreateReport()
const user = await this.getUser(userId);

// Check if Pro user (10/month limit)
if (user.monthlyReportLimit === 10) {
  const reportsUsed = user.reportsUsedThisMonth || 0;
  
  // BLOCK if they've used 10 already
  if (reportsUsed >= 10) {
    throw new Error(`Monthly limit reached (${reportsUsed}/10). Resets next month.`);
  }
}
```

### 4. **Usage Counter Increment**
**After** successful report creation, system increments:
```javascript
// Increment counter for limited tiers only
if (isLifetimeFree && monthlyLimit) {
  await storage.incrementUserReportUsage(userId);
  // Now user has used: 1/10, 2/10, 3/10... up to 10/10
}
```

### 5. **Monthly Reset**
Each month, the counter automatically resets to 0, giving them fresh 10 reports.

## Real Example Scenario

**Month 1:**
- Pro customer creates reports: 1, 2, 3... 9, 10 ✅
- Try to create 11th report: ❌ "Monthly limit reached (10/10). Resets next month."

**Month 2:** 
- Counter resets to 0/10
- Customer can create 10 more reports ✅

## Database Protection
- **Tier stored in database**: Can't be changed without admin access
- **Backend validation**: Frontend can't bypass the limits
- **Usage tracking**: Every report creation increments counter
- **Monthly reset**: Automatic based on `currentMonthStart` date

## Frontend Display
Users see their usage clearly:
```
✓ Pro Plan - 10 reports per month
Used this month: 7 / 10
```

This system ensures Pro Tier customers get exactly what they paid for - 10 reports monthly - while Unlimited customers get unlimited access.