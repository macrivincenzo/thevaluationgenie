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

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  stripeCustomerId: varchar("stripe_customer_id"),
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

// Business valuations table - enhanced for comprehensive questionnaire
export const valuations = pgTable("valuations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  
  // Basic business info
  businessName: varchar("business_name").notNull(),
  industry: varchar("industry").notNull(),
  location: varchar("location").notNull(),
  yearsInBusiness: integer("years_in_business").notNull(),
  buyerOrSeller: varchar("buyer_or_seller").notNull(),
  
  // Financial data (3 years)
  annualRevenue: jsonb("annual_revenue").notNull(), // Array of 3 years
  sde: jsonb("sde").notNull(), // Array of 3 years  
  profitMargin: decimal("profit_margin", { precision: 5, scale: 2 }),
  
  // Business dependency (seller questions)
  ownerWorkHours: integer("owner_work_hours"),
  canRunWithoutOwner: boolean("can_run_without_owner"),
  hasKeyEmployees: boolean("has_key_employees"),
  
  // Customer data
  topCustomersRevenuePct: decimal("top_customers_revenue_pct", { precision: 5, scale: 2 }),
  customerRetentionPct: decimal("customer_retention_pct", { precision: 5, scale: 2 }),
  hasLongTermContracts: boolean("has_long_term_contracts"),
  
  // Growth & market
  growthRates: jsonb("growth_rates"), // Array of 3 years
  competitiveAdvantage: text("competitive_advantage"),
  marketSize: varchar("market_size"), // local/regional/national
  
  // Assets & liabilities
  ownedAssets: text("owned_assets"),
  businessDebts: text("business_debts"),
  locationOwnership: varchar("location_ownership"), // own/lease
  
  // Buyer-specific fields
  maxInvestmentBudget: decimal("max_investment_budget", { precision: 12, scale: 2 }),
  availableCash: decimal("available_cash", { precision: 12, scale: 2 }),
  hasIndustryExperience: boolean("has_industry_experience"),
  timeCommitmentHours: integer("time_commitment_hours"),
  managementPlan: varchar("management_plan"), // have/will-hire
  riskTolerance: varchar("risk_tolerance"), // low/medium/high
  
  // Strategic planning
  buyingMotivation: text("buying_motivation"),
  plannedChanges: text("planned_changes"),
  investmentTimeline: varchar("investment_timeline"), // 1-3/3-5/5+ years
  
  // Due diligence priorities (stored as JSON array)
  financialRecordPriorities: jsonb("financial_record_priorities"),
  customerRelationshipConcerns: text("customer_relationship_concerns"),
  legalRegulatoryIssues: text("legal_regulatory_issues"),
  
  // Deal structure
  preferredPurchaseMethod: varchar("preferred_purchase_method"), // cash/seller-financing
  openToEarnOut: boolean("open_to_earn_out"),
  minAcceptableROI: decimal("min_acceptable_roi", { precision: 5, scale: 2 }),
  
  // Valuation results
  valuationLow: decimal("valuation_low", { precision: 12, scale: 2 }).notNull(),
  valuationHigh: decimal("valuation_high", { precision: 12, scale: 2 }).notNull(),
  industryMultiple: decimal("industry_multiple", { precision: 3, scale: 2 }).notNull(),
  
  // System fields
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
  valuationLow: true,
  valuationHigh: true,
  industryMultiple: true,
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
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type EmailSubscription = typeof emailSubscriptions.$inferSelect;
export type InsertEmailSubscription = z.infer<typeof insertEmailSubscriptionSchema>;
export type Valuation = typeof valuations.$inferSelect;
export type InsertValuation = z.infer<typeof insertValuationSchema>;
export type FileUpload = typeof fileUploads.$inferSelect;
export type InsertFileUpload = z.infer<typeof insertFileUploadSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
