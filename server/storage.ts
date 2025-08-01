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
  async createValuation(valuationData: any): Promise<Valuation> {
    try {
      console.log('Storage: Creating valuation with data:', JSON.stringify(valuationData, null, 2));

      // Create a sanitized object with only the columns that exist in the database
      const sanitizedData = {
        userId: valuationData.userId,
        businessName: valuationData.businessName,
        industry: valuationData.industry,
        location: valuationData.location,
        foundedYear: valuationData.foundedYear,
        yearsInBusiness: valuationData.yearsInBusiness,
        annualRevenue: valuationData.annualRevenue,
        sde: valuationData.sde,
        addBacks: valuationData.addBacks,
        ownerInvolvement: valuationData.ownerInvolvement,
        growthTrend: valuationData.growthTrend,
        majorRisks: valuationData.majorRisks,
        buyerOrSeller: valuationData.buyerOrSeller,
        valuationLow: valuationData.valuationLow,
        valuationHigh: valuationData.valuationHigh,
        industryMultiple: valuationData.industryMultiple,
        paid: valuationData.paid || false
      };

      console.log('Sanitized data for insertion:', JSON.stringify(sanitizedData, null, 2));

      const [result] = await db.insert(valuations).values(sanitizedData).returning();
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
      totalRevenue: Number(paidResult.count) * 39, // $39 per report
    };
  }

  async deleteAllUserData(userId: string): Promise<void> {
    try {
      console.log(`Deleting all data for user: ${userId}`);
      
      // First, get all user's valuations to delete associated files
      const userValuations = await db.select({ id: valuations.id }).from(valuations).where(eq(valuations.userId, userId));
      
      // Delete user's file uploads for each valuation
      for (const valuation of userValuations) {
        await db.delete(fileUploads).where(eq(fileUploads.valuationId, valuation.id));
      }
      
      // Delete user's valuations
      await db.delete(valuations).where(eq(valuations.userId, userId));
      
      // Delete user's email subscriptions (if any)
      const user = await this.getUser(userId);
      if (user?.email) {
        await db.delete(emailSubscriptions).where(eq(emailSubscriptions.email, user.email));
      }
      
      console.log(`Successfully deleted all data for user: ${userId}`);
    } catch (error: any) {
      console.error('Error deleting user data:', error);
      throw new Error(`Failed to delete user data: ${error.message}`);
    }
  }
}

export const storage = new DatabaseStorage();
