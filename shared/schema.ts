import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  decimal,
  boolean
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table with email/password authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique().notNull(),
  passwordHash: varchar("password_hash"), // For email/password auth
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  profileImageUrl: varchar("profile_image_url"),
  stripeCustomerId: varchar("stripe_customer_id"),
  // Authentication method tracking
  authMethod: varchar("auth_method").notNull().default("email"), // "email" or "oauth"
  emailVerified: boolean("email_verified").default(false),
  resetPasswordToken: varchar("reset_password_token"),
  resetPasswordExpires: timestamp("reset_password_expires"),
  // Business/Professional Information
  company: varchar("company"),
  jobTitle: varchar("job_title"),
  phoneNumber: varchar("phone_number"),
  // Address Information
  address: varchar("address"),
  city: varchar("city"),
  state: varchar("state"),
  zipCode: varchar("zip_code"),
  country: varchar("country").default("United States"),
  // Professional Context
  businessType: varchar("business_type"), // buyer, seller, broker, investor, consultant
  industryExperience: varchar("industry_experience"),
  // Preferences & Settings
  emailNotifications: boolean("email_notifications").default(true),
  marketingEmails: boolean("marketing_emails").default(true),
  // Profile Completion
  profileComplete: boolean("profile_complete").default(false),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Email subscriptions table
export const emailSubscriptions = pgTable("email_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").notNull().unique(),
  subscribed: boolean("subscribed").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Business valuations table - matching actual database structure
export const valuations = pgTable("valuations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  businessName: varchar("business_name").notNull(),
  industry: varchar("industry").notNull(),
  location: varchar("location").notNull(),
  foundedYear: integer("founded_year"),
  yearsInBusiness: integer("years_in_business").notNull(),
  annualRevenue: decimal("annual_revenue").notNull(),
  sde: decimal("sde").notNull(),
  addBacks: decimal("add_backs").notNull(),
  ownerInvolvement: varchar("owner_involvement").notNull(),
  growthTrend: varchar("growth_trend").notNull(),
  majorRisks: text("major_risks"),
  buyerOrSeller: varchar("buyer_or_seller").notNull(),
  valuationLow: decimal("valuation_low").notNull(),
  valuationHigh: decimal("valuation_high").notNull(),
  industryMultiple: decimal("industry_multiple").notNull(),
  pdfPath: varchar("pdf_path"),
  stripePaymentIntentId: varchar("stripe_payment_intent_id"),
  paid: boolean("paid").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// File uploads table
export const fileUploads = pgTable("file_uploads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  valuationId: varchar("valuation_id").references(() => valuations.id).notNull(),
  fileName: varchar("file_name").notNull(),
  filePath: varchar("file_path").notNull(),
  fileSize: integer("file_size").notNull(),
  mimeType: varchar("mime_type").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Admin users table
export const adminUsers = pgTable("admin_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull().unique(),
  role: varchar("role").default("admin"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertEmailSubscriptionSchema = createInsertSchema(emailSubscriptions).omit({
  id: true,
  createdAt: true,
});

export const insertValuationSchema = createInsertSchema(valuations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  pdfPath: true,
  stripePaymentIntentId: true,
  paid: true,
});

export const insertFileUploadSchema = createInsertSchema(fileUploads).omit({
  id: true,
  createdAt: true,
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  createdAt: true,
});

// Types
// Customer data collection table for additional information
export const customerProfiles = pgTable("customer_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  // Business Context
  currentBusinessOwner: boolean("current_business_owner").default(false),
  businessesOwned: integer("businesses_owned").default(0),
  investmentBudget: decimal("investment_budget"),
  // Usage Intent
  purposeForValuation: varchar("purpose_for_valuation"), // buying, selling, curiosity, investment, advisory
  timelineForTransaction: varchar("timeline_for_transaction"),
  // Communication Preferences
  preferredContactMethod: varchar("preferred_contact_method").default("email"),
  referralSource: varchar("referral_source"),
  // Tracking
  totalReportsPurchased: integer("total_reports_purchased").default(0),
  totalAmountSpent: decimal("total_amount_spent").default("0"),
  lastPurchaseAt: timestamp("last_purchase_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type CustomerProfile = typeof customerProfiles.$inferSelect;
export type UpsertCustomerProfile = typeof customerProfiles.$inferInsert;
export type EmailSubscription = typeof emailSubscriptions.$inferSelect;
export type InsertEmailSubscription = z.infer<typeof insertEmailSubscriptionSchema>;
export type Valuation = typeof valuations.$inferSelect;
export type InsertValuation = z.infer<typeof insertValuationSchema>;
export type FileUpload = typeof fileUploads.$inferSelect;
export type InsertFileUpload = z.infer<typeof insertFileUploadSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;

// Comparison tables for comparing multiple valuations
export const comparisons = pgTable("comparisons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name").notNull(), // "Q1 2025 Acquisitions" or "Restaurant Options"
  description: varchar("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const comparisonItems = pgTable("comparison_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  comparisonId: varchar("comparison_id").notNull().references(() => comparisons.id, { onDelete: "cascade" }),
  valuationId: varchar("valuation_id").notNull().references(() => valuations.id, { onDelete: "cascade" }),
  notes: text("notes"),
  addedAt: timestamp("added_at").defaultNow(),
});

export const insertComparisonSchema = createInsertSchema(comparisons).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertComparisonItemSchema = createInsertSchema(comparisonItems).omit({
  id: true,
  addedAt: true,
});

export type InsertComparison = z.infer<typeof insertComparisonSchema>;
export type Comparison = typeof comparisons.$inferSelect;
export type InsertComparisonItem = z.infer<typeof insertComparisonItemSchema>;
export type ComparisonItem = typeof comparisonItems.$inferSelect;
