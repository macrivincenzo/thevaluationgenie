import { DatabaseStorage, IStorage } from './storage';
import { withDatabaseRetry } from './db';
import type { User, UpsertUser } from '@shared/schema';

// In-memory fallback storage for critical user data
class MemoryStorage {
  private users = new Map<string, User>();
  private usersByEmail = new Map<string, User>();
  private valuations = new Map<string, any>();

  setUser(user: User) {
    this.users.set(user.id, user);
    this.usersByEmail.set(user.email, user);
  }

  getUser(id: string): User | undefined {
    return this.users.get(id);
  }

  getUserByEmail(email: string): User | undefined {
    return this.usersByEmail.get(email);
  }

  updateUser(id: string, updates: Partial<User>): User | undefined {
    const existingUser = this.users.get(id);
    if (!existingUser) return undefined;

    const updatedUser = { ...existingUser, ...updates };
    this.setUser(updatedUser);
    return updatedUser;
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  // Basic valuation storage for testing
  createValuation(valuation: any): any {
    const id = Math.random().toString(36);
    const newValuation = {
      ...valuation,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.valuations.set(id, newValuation);
    return newValuation;
  }

  getValuation(id: string): any {
    return this.valuations.get(id);
  }

  getUserValuations(userId: string): any[] {
    return Array.from(this.valuations.values()).filter(v => v.userId === userId);
  }
}

// Resilient storage that falls back to memory when database fails
export class ResilientStorage implements IStorage {
  private dbStorage = new DatabaseStorage();
  private memoryStorage = new MemoryStorage();
  private dbAvailable = true;

  // Initialize with test users in memory
  constructor() {
    // Add test users to memory storage
    const testUser: User = {
      id: 'test-user-id',
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
      membershipType: 'free',
      lifetimeAccess: false,
      lifetimeTier: null,
      monthlyReportLimit: null,
      reportsUsedThisMonth: 0,
      currentMonthStart: new Date(),
      lifetimeSource: null,
      lifetimePurchaseDate: null,
      lifetimeFeatures: null,
      stripeCustomerId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const mainUser: User = {
      id: 'your-user-id',
      email: 'macrivincenzo@hotmail.com',
      firstName: '',
      lastName: '',
      membershipType: 'free',
      lifetimeAccess: false,
      lifetimeTier: null,
      monthlyReportLimit: null,
      reportsUsedThisMonth: 0,
      currentMonthStart: new Date(),
      lifetimeSource: null,
      lifetimePurchaseDate: null,
      lifetimeFeatures: null,
      stripeCustomerId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.memoryStorage.setUser(testUser);
    this.memoryStorage.setUser(mainUser);
  }

  private async withFallback<T>(
    dbOperation: () => Promise<T>,
    memoryOperation: () => T | Promise<T>
  ): Promise<T> {
    if (!this.dbAvailable) {
      console.log('Using memory storage fallback');
      return await memoryOperation();
    }

    try {
      const result = await withDatabaseRetry(dbOperation);
      return result;
    } catch (error) {
      console.error('Database operation failed, falling back to memory:', error);
      this.dbAvailable = false;
      return await memoryOperation();
    }
  }

  // User operations with fallback
  async getUser(id: string): Promise<User | undefined> {
    return this.withFallback(
      () => this.dbStorage.getUser(id),
      () => this.memoryStorage.getUser(id)
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.withFallback(
      () => this.dbStorage.getUserByEmail(email),
      () => this.memoryStorage.getUserByEmail(email)
    );
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    return this.withFallback(
      () => this.dbStorage.upsertUser(userData),
      () => {
        const existingUser = this.memoryStorage.getUser(userData.id!);
        const user: User = {
          ...existingUser,
          ...userData,
          id: userData.id!,
          createdAt: existingUser?.createdAt || new Date(),
          updatedAt: new Date(),
          membershipType: existingUser?.membershipType || 'free',
          lifetimeAccess: existingUser?.lifetimeAccess || false,
          lifetimeTier: existingUser?.lifetimeTier || null,
          monthlyReportLimit: existingUser?.monthlyReportLimit || null,
          reportsUsedThisMonth: existingUser?.reportsUsedThisMonth || 0,
          currentMonthStart: existingUser?.currentMonthStart || new Date(),
          lifetimeSource: existingUser?.lifetimeSource || null,
          lifetimePurchaseDate: existingUser?.lifetimePurchaseDate || null,
          lifetimeFeatures: existingUser?.lifetimeFeatures || null,
          stripeCustomerId: existingUser?.stripeCustomerId || null
        };
        this.memoryStorage.setUser(user);
        return user;
      }
    );
  }

  async createEmailUser(userData: UpsertUser): Promise<User> {
    return this.withFallback(
      () => this.dbStorage.createEmailUser(userData),
      () => {
        const user: User = {
          ...userData,
          id: userData.id!,
          createdAt: new Date(),
          updatedAt: new Date(),
          membershipType: 'free',
          lifetimeAccess: false,
          lifetimeTier: null,
          monthlyReportLimit: null,
          reportsUsedThisMonth: 0,
          currentMonthStart: new Date(),
          lifetimeSource: null,
          lifetimePurchaseDate: null,
          lifetimeFeatures: null,
          stripeCustomerId: null
        };
        this.memoryStorage.setUser(user);
        return user;
      }
    );
  }

  async grantLifetimeAccess(userId: string, source: string, tier: string = 'unlimited', verificationCode?: string): Promise<User> {
    return this.withFallback(
      () => this.dbStorage.grantLifetimeAccess(userId, source, tier, verificationCode),
      () => {
        const tierSettings = {
          basic: { limit: 5, price: 69 },
          pro: { limit: 10, price: 89 },
          unlimited: { limit: null, price: 149 }
        };

        const settings = tierSettings[tier as keyof typeof tierSettings] || tierSettings.unlimited;
        
        const updates = {
          membershipType: 'lifetime' as const,
          lifetimeAccess: true,
          lifetimeTier: tier,
          monthlyReportLimit: settings.limit,
          lifetimeSource: source,
          lifetimePurchaseDate: new Date(),
          reportsUsedThisMonth: 0,
          currentMonthStart: new Date(),
          updatedAt: new Date()
        };

        const user = this.memoryStorage.updateUser(userId, updates);
        if (!user) {
          throw new Error('User not found for lifetime access grant');
        }
        return user;
      }
    );
  }

  // Delegated methods that require database (with graceful degradation)
  async updateUserProfile(id: string, profileData: Partial<UpsertUser>): Promise<User> {
    return this.withFallback(
      () => this.dbStorage.updateUserProfile(id, profileData),
      () => {
        const user = this.memoryStorage.updateUser(id, profileData as Partial<User>);
        if (!user) throw new Error('User not found');
        return user;
      }
    );
  }

  async updateStripeCustomerId(userId: string, customerId: string): Promise<User> {
    return this.withFallback(
      () => this.dbStorage.updateStripeCustomerId(userId, customerId),
      () => {
        const user = this.memoryStorage.updateUser(userId, { stripeCustomerId: customerId });
        if (!user) throw new Error('User not found');
        return user;
      }
    );
  }

  // Methods that gracefully degrade when database is unavailable
  async createEmailSubscription(subscription: any): Promise<any> {
    try {
      return await this.dbStorage.createEmailSubscription(subscription);
    } catch (error) {
      console.warn('Email subscription creation failed, continuing without persistence');
      return { ...subscription, id: Math.random().toString(36) };
    }
  }

  // Valuation operations with fallback
  async createValuation(valuation: any): Promise<any> {
    return this.withFallback(
      () => this.dbStorage.createValuation(valuation),
      () => this.memoryStorage.createValuation(valuation)
    );
  }

  async getValuation(id: string): Promise<any> {
    return this.withFallback(
      () => this.dbStorage.getValuation(id),
      () => this.memoryStorage.getValuation(id)
    );
  }

  async getUserValuations(userId: string): Promise<any[]> {
    return this.withFallback(
      () => this.dbStorage.getUserValuations(userId),
      () => this.memoryStorage.getUserValuations(userId)
    );
  }

  // Stub implementations for remaining methods (add full implementations as needed)
  async getEmailSubscription(email: string) { return undefined; }
  async createCustomerProfile(profile: any) { throw new Error('Not implemented in fallback mode'); }
  async getCustomerProfile(userId: string) { return undefined; }
  async updateCustomerProfile(userId: string, profile: any) { throw new Error('Not implemented in fallback mode'); }
  async updateValuationPayment(id: string, paymentIntentId: string, pdfPath: string) {
    return this.withFallback(
      () => this.dbStorage.updateValuationPayment(id, paymentIntentId, pdfPath),
      () => {
        // In-memory fallback - mark valuation as paid
        const valuation = this.memoryStorage.getValuation(id);
        if (valuation) {
          valuation.stripePaymentIntentId = paymentIntentId;
          valuation.paid = true;
          valuation.pdfPath = pdfPath;
          valuation.updatedAt = new Date();
          return valuation;
        }
        throw new Error('Valuation not found');
      }
    );
  }
  async deleteValuation(id: string) { }
  async getAllValuations() { return []; }
  async createFileUpload(upload: any) { throw new Error('Not implemented in fallback mode'); }
  async getValuationFiles(valuationId: string) { return []; }
  async deleteFile(id: string) { }
  async createAdminUser(admin: any) { throw new Error('Not implemented in fallback mode'); }
  async isAdmin(userId: string) { return false; }
  async getAllUsers() { return this.memoryStorage.getAllUsers(); }
  async getUserCount() { return this.memoryStorage.getAllUsers().length; }
  async getValuationStats() { return { total: 0, paid: 0, totalRevenue: 0 }; }
  async createComparison(comparison: any) { throw new Error('Not implemented in fallback mode'); }
  async getUserComparisons(userId: string) { return []; }
  async getComparison(id: string) { return undefined; }
  async updateComparison(id: string, updates: any) { throw new Error('Not implemented in fallback mode'); }
  async deleteComparison(id: string) { }
  async addComparisonItem(item: any) { throw new Error('Not implemented in fallback mode'); }
  async getComparisonItems(comparisonId: string) { return []; }
  async removeComparisonItem(comparisonId: string, valuationId: string) { }
  async updateComparisonItemNotes(id: string, notes: string) { throw new Error('Not implemented in fallback mode'); }
}

// Export singleton instance
export const resilientStorage = new ResilientStorage();