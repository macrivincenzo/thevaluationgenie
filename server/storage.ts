import {
  users,
  emailSubscriptions,
  valuations,
  fileUploads,
  adminUsers,
  type User,
  type UpsertUser,
  type EmailSubscription,
  type InsertEmailSubscription,
  type Valuation,
  type InsertValuation,
  type FileUpload,
  type InsertFileUpload,
  type AdminUser,
  type InsertAdminUser,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateStripeCustomerId(userId: string, customerId: string): Promise<User>;
  
  // Email subscriptions
  createEmailSubscription(subscription: InsertEmailSubscription): Promise<EmailSubscription>;
  getEmailSubscription(email: string): Promise<EmailSubscription | undefined>;
  
  // Valuations
  createValuation(valuation: InsertValuation): Promise<Valuation>;
  getValuation(id: string): Promise<Valuation | undefined>;
  getUserValuations(userId: string): Promise<Valuation[]>;
  updateValuationPayment(id: string, paymentIntentId: string, pdfPath: string): Promise<Valuation>;
  deleteValuation(id: string): Promise<void>;
  getAllValuations(): Promise<Valuation[]>;
  
  // File uploads
  createFileUpload(upload: InsertFileUpload): Promise<FileUpload>;
  getValuationFiles(valuationId: string): Promise<FileUpload[]>;
  deleteFile(id: string): Promise<void>;
  
  // Admin operations
  createAdminUser(admin: InsertAdminUser): Promise<AdminUser>;
  isAdmin(userId: string): Promise<boolean>;
  getAllUsers(): Promise<User[]>;
  getUserCount(): Promise<number>;
  getValuationStats(): Promise<{ total: number; paid: number; totalRevenue: number }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateStripeCustomerId(userId: string, customerId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ stripeCustomerId: customerId, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Email subscriptions
  async createEmailSubscription(subscription: InsertEmailSubscription): Promise<EmailSubscription> {
    const [result] = await db
      .insert(emailSubscriptions)
      .values(subscription)
      .onConflictDoUpdate({
        target: emailSubscriptions.email,
        set: { subscribed: true },
      })
      .returning();
    return result;
  }

  async getEmailSubscription(email: string): Promise<EmailSubscription | undefined> {
    const [result] = await db
      .select()
      .from(emailSubscriptions)
      .where(eq(emailSubscriptions.email, email));
    return result;
  }

  // Valuations
  async createValuation(valuation: InsertValuation & { valuationLow: string; valuationHigh: string; industryMultiple: string }): Promise<Valuation> {
    try {
      // Extract the first value from arrays for numeric fields
      let annualRevenueValue = 0;
      let sdeValue = 0;

      if (Array.isArray(valuation.annualRevenue)) {
        annualRevenueValue = valuation.annualRevenue[0] || 0;
      } else {
        annualRevenueValue = parseFloat(valuation.annualRevenue?.toString() || '0') || 0;
      }

      if (Array.isArray(valuation.sde)) {
        sdeValue = valuation.sde[0] || 0;
      } else {
        sdeValue = parseFloat(valuation.sde?.toString() || '0') || 0;
      }

      // Use only the core fields that exist in the current database schema
      const coreData = {
        userId: valuation.userId,
        businessName: valuation.businessName,
        industry: valuation.industry,
        location: valuation.location,
        yearsInBusiness: valuation.yearsInBusiness,
        buyerOrSeller: valuation.buyerOrSeller,
        annualRevenue: annualRevenueValue.toString(),
        sde: sdeValue.toString(),
        addBacks: "0", // Default value
        ownerInvolvement: "", // Default value 
        growthTrend: "", // Default value
        majorRisks: "", // Default value
        valuationLow: valuation.valuationLow,
        valuationHigh: valuation.valuationHigh,
        industryMultiple: valuation.industryMultiple,
      };

      console.log('Creating valuation with core data only:', JSON.stringify(coreData, null, 2));

      const [result] = await db.insert(valuations).values(coreData as any).returning();
      return result;
    } catch (error: any) {
      console.error('Database insertion error:', error);
      throw new Error(`Failed to create valuation: ${error.message}`);
    }
  }

  async getValuation(id: string): Promise<Valuation | undefined> {
    try {
      const [result] = await db.select().from(valuations).where(eq(valuations.id, id));
      return result;
    } catch (error: any) {
      console.error('Error fetching valuation:', error);
      return undefined;
    }
  }

  async getUserValuations(userId: string): Promise<Valuation[]> {
    try {
      return await db
        .select()
        .from(valuations)
        .where(eq(valuations.userId, userId))
        .orderBy(desc(valuations.createdAt));
    } catch (error: any) {
      console.error('Error fetching user valuations:', error);
      return [];
    }
  }

  async updateValuationPayment(id: string, paymentIntentId: string, pdfPath: string): Promise<Valuation> {
    const [result] = await db
      .update(valuations)
      .set({ 
        stripePaymentIntentId: paymentIntentId, 
        pdfPath: pdfPath, 
        paid: true,
        updatedAt: new Date() 
      })
      .where(eq(valuations.id, id))
      .returning();
    return result;
  }

  async deleteValuation(id: string): Promise<void> {
    await db.delete(valuations).where(eq(valuations.id, id));
  }

  async getAllValuations(): Promise<Valuation[]> {
    return await db.select().from(valuations).orderBy(desc(valuations.createdAt));
  }

  // File uploads
  async createFileUpload(upload: InsertFileUpload): Promise<FileUpload> {
    const [result] = await db.insert(fileUploads).values(upload).returning();
    return result;
  }

  async getValuationFiles(valuationId: string): Promise<FileUpload[]> {
    return await db
      .select()
      .from(fileUploads)
      .where(eq(fileUploads.valuationId, valuationId));
  }

  async deleteFile(id: string): Promise<void> {
    await db.delete(fileUploads).where(eq(fileUploads.id, id));
  }

  // Admin operations
  async createAdminUser(admin: InsertAdminUser): Promise<AdminUser> {
    const [result] = await db.insert(adminUsers).values(admin).returning();
    return result;
  }

  async isAdmin(userId: string): Promise<boolean> {
    const [result] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.userId, userId));
    return !!result;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  }

  async getUserCount(): Promise<number> {
    const [result] = await db
      .select({ count: sql`count(*)`.as('count') })
      .from(users);
    return Number(result.count);
  }

  async getValuationStats(): Promise<{ total: number; paid: number; totalRevenue: number }> {
    const [totalResult] = await db
      .select({ count: sql`count(*)`.as('count') })
      .from(valuations);
    
    const [paidResult] = await db
      .select({ count: sql`count(*)`.as('count') })
      .from(valuations)
      .where(eq(valuations.paid, true));

    return {
      total: Number(totalResult.count),
      paid: Number(paidResult.count),
      totalRevenue: Number(paidResult.count) * 99, // $99 per report
    };
  }
}

export const storage = new DatabaseStorage();
