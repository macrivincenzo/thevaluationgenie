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
  
  // Section 1: Basic Business Information
  businessName: varchar("business_name").notNull(),
  industry: varchar("industry").notNull(),
  businessDescription: text("business_description"),
  foundedYear: integer("founded_year"),
  location: varchar("location").notNull(),
  employeeCount: integer("employee_count"),
  
  // Section 2: Financial Performance (Last 12 Months)
  annualRevenue: decimal("annual_revenue").notNull(),
  recurringRevenuePct: decimal("recurring_revenue_pct"),
  oneTimeRevenuePct: decimal("one_time_revenue_pct"),
  ebitda: decimal("ebitda"),
  ebitdaMargin: decimal("ebitda_margin"),
  ownerSalary: decimal("owner_salary"),
  addBacks: decimal("add_backs"),
  
  // Section 3: Customer & Market Metrics
  customerRetentionRate: decimal("customer_retention_rate"),
  top5CustomersPct: decimal("top5_customers_pct"),
  customerLifetimeValue: decimal("customer_lifetime_value"),
  customerAcquisitionCost: decimal("customer_acquisition_cost"),
  revenueGrowthRate: decimal("revenue_growth_rate"),
  
  // Section 4: Operational Metrics
  ownerInvolvement: varchar("owner_involvement").notNull(),
  managementTeam: varchar("management_team"),
  systemsProcesses: varchar("systems_processes"),
  
  // Section 5: Market & Competition
  marketPosition: varchar("market_position"),
  competitiveAdvantages: jsonb("competitive_advantages"),
  marketGrowth: varchar("market_growth"),
  
  // Section 6: Risk Assessment
  majorRiskFactors: jsonb("major_risk_factors"),
  technologyRisk: varchar("technology_risk"),
  
  // Section 7: Growth & Future Potential
  growthOpportunities: jsonb("growth_opportunities"),
  expansionPlans: varchar("expansion_plans"),
  
  // Section 8: Assets & Liabilities
  majorAssets: text("major_assets"),
  outstandingDebt: decimal("outstanding_debt"),
  intellectualProperty: jsonb("intellectual_property"),
  
  // Legacy/compatibility fields
  yearsInBusiness: integer("years_in_business").notNull(),
  buyerOrSeller: varchar("buyer_or_seller").notNull(),
  sde: decimal("sde").notNull(),
  growthTrend: varchar("growth_trend").notNull(),
  majorRisks: text("major_risks"),
  
  // Enhanced valuation results
  valuationLow: decimal("valuation_low"),
  valuationHigh: decimal("valuation_high"),
  industryMultiple: decimal("industry_multiple"),
  revenueMultiple: decimal("revenue_multiple"),
  ebitdaMultiple: decimal("ebitda_multiple"),
  dcfValuation: decimal("dcf_valuation"),
  weightedValuation: decimal("weighted_valuation"),
  
  // Payment and file tracking
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
