import {
  users,
  emailSubscriptions,
  valuations,
  fileUploads,
  adminUsers,
  customerProfiles,
  comparisons,
  comparisonItems,
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
  type CustomerProfile,
  type UpsertCustomerProfile,
  type Comparison,
  type InsertComparison,
  type ComparisonItem,
  type InsertComparisonItem,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (both OAuth and email/password)
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>; // For OAuth users
  createEmailUser(user: UpsertUser): Promise<User>; // For email/password users
  updateUserProfile(id: string, profileData: Partial<UpsertUser>): Promise<User>;
  updateStripeCustomerId(userId: string, customerId: string): Promise<User>;
  
  // Customer profile operations
  createCustomerProfile(profile: UpsertCustomerProfile): Promise<CustomerProfile>;
  getCustomerProfile(userId: string): Promise<CustomerProfile | undefined>;
  updateCustomerProfile(userId: string, profile: Partial<UpsertCustomerProfile>): Promise<CustomerProfile>;
  
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

  // Comparison operations
  createComparison(comparison: InsertComparison): Promise<Comparison>;
  getUserComparisons(userId: string): Promise<Comparison[]>;
  getComparison(id: string): Promise<Comparison | undefined>;
  updateComparison(id: string, updates: Partial<InsertComparison>): Promise<Comparison>;
  deleteComparison(id: string): Promise<void>;
  
  // Comparison items operations
  addComparisonItem(item: InsertComparisonItem): Promise<ComparisonItem>;
  getComparisonItems(comparisonId: string): Promise<(ComparisonItem & { valuation: Valuation })[]>;
  removeComparisonItem(comparisonId: string, valuationId: string): Promise<void>;
  updateComparisonItemNotes(id: string, notes: string): Promise<ComparisonItem>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
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

  async createEmailUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return user;
  }

  async updateUserProfile(id: string, profileData: Partial<UpsertUser>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...profileData, updatedAt: new Date() })
      .where(eq(users.id, id))
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

  // Customer profile operations
  async createCustomerProfile(profile: UpsertCustomerProfile): Promise<CustomerProfile> {
    const [customerProfile] = await db
      .insert(customerProfiles)
      .values(profile)
      .returning();
    return customerProfile;
  }

  async getCustomerProfile(userId: string): Promise<CustomerProfile | undefined> {
    const [profile] = await db
      .select()
      .from(customerProfiles)
      .where(eq(customerProfiles.userId, userId));
    return profile;
  }

  async updateCustomerProfile(userId: string, profile: Partial<UpsertCustomerProfile>): Promise<CustomerProfile> {
    const [customerProfile] = await db
      .update(customerProfiles)
      .set({ ...profile, updatedAt: new Date() })
      .where(eq(customerProfiles.userId, userId))
      .returning();
    return customerProfile;
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

  // Comparison operations
  async createComparison(comparison: InsertComparison): Promise<Comparison> {
    const [result] = await db.insert(comparisons).values(comparison).returning();
    return result;
  }

  async getUserComparisons(userId: string): Promise<Comparison[]> {
    return await db
      .select()
      .from(comparisons)
      .where(eq(comparisons.userId, userId))
      .orderBy(desc(comparisons.createdAt));
  }

  async getComparison(id: string): Promise<Comparison | undefined> {
    const [result] = await db.select().from(comparisons).where(eq(comparisons.id, id));
    return result;
  }

  async updateComparison(id: string, updates: Partial<InsertComparison>): Promise<Comparison> {
    const [result] = await db
      .update(comparisons)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(comparisons.id, id))
      .returning();
    return result;
  }

  async deleteComparison(id: string): Promise<void> {
    // Delete comparison items first (cascade should handle this, but being explicit)
    await db.delete(comparisonItems).where(eq(comparisonItems.comparisonId, id));
    // Delete the comparison
    await db.delete(comparisons).where(eq(comparisons.id, id));
  }

  // Comparison items operations
  async addComparisonItem(item: InsertComparisonItem): Promise<ComparisonItem> {
    const [result] = await db.insert(comparisonItems).values(item).returning();
    return result;
  }

  async getComparisonItems(comparisonId: string): Promise<(ComparisonItem & { valuation: Valuation })[]> {
    return await db
      .select({
        id: comparisonItems.id,
        comparisonId: comparisonItems.comparisonId,
        valuationId: comparisonItems.valuationId,
        notes: comparisonItems.notes,
        addedAt: comparisonItems.addedAt,
        valuation: {
          id: valuations.id,
          userId: valuations.userId,
          businessName: valuations.businessName,
          industry: valuations.industry,
          location: valuations.location,
          foundedYear: valuations.foundedYear,
          yearsInBusiness: valuations.yearsInBusiness,
          annualRevenue: valuations.annualRevenue,
          sde: valuations.sde,
          addBacks: valuations.addBacks,
          ownerInvolvement: valuations.ownerInvolvement,
          growthTrend: valuations.growthTrend,
          majorRisks: valuations.majorRisks,
          buyerOrSeller: valuations.buyerOrSeller,
          valuationLow: valuations.valuationLow,
          valuationHigh: valuations.valuationHigh,
          industryMultiple: valuations.industryMultiple,
          pdfPath: valuations.pdfPath,
          stripePaymentIntentId: valuations.stripePaymentIntentId,
          paid: valuations.paid,
          createdAt: valuations.createdAt,
          updatedAt: valuations.updatedAt,
        }
      })
      .from(comparisonItems)
      .innerJoin(valuations, eq(comparisonItems.valuationId, valuations.id))
      .where(eq(comparisonItems.comparisonId, comparisonId))
      .orderBy(comparisonItems.addedAt) as any;
  }

  async removeComparisonItem(comparisonId: string, valuationId: string): Promise<void> {
    await db
      .delete(comparisonItems)
      .where(
        sql`${comparisonItems.comparisonId} = ${comparisonId} AND ${comparisonItems.valuationId} = ${valuationId}`
      );
  }

  async updateComparisonItemNotes(id: string, notes: string): Promise<ComparisonItem> {
    const [result] = await db
      .update(comparisonItems)
      .set({ notes })
      .where(eq(comparisonItems.id, id))
      .returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
