import {
  pgTable,
  text,
  timestamp,
  varchar,
  uuid,
  integer,
  boolean,
  jsonb,
  customType,
} from "drizzle-orm/pg-core";

// Vector custom type for pgvector
const vector = customType<{ data: number[] }>({
  dataType() {
    return "vector(1536)";
  },
});

// 1. Government Agencies
export const governmentAgencies = pgTable("government_agencies", {
  id: uuid("id").defaultRandom().primaryKey(),
  nameEn: varchar("name_en", { length: 255 }).notNull(),
  nameBn: varchar("name_bn", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  websiteUrl: text("website_url").notNull(),
  descriptionBn: text("description_bn"),
  status: varchar("status", { length: 50 }).default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 2. Service Categories
export const serviceCategories = pgTable("service_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  nameEn: varchar("name_en", { length: 255 }).notNull(),
  nameBn: varchar("name_bn", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  descriptionBn: text("description_bn"),
  iconName: varchar("icon_name", { length: 50 }).default("Compass"),
  sortOrder: integer("sort_order").default(0),
  status: varchar("status", { length: 50 }).default("active").notNull(),
});

// 3. Government Services
export const governmentServices = pgTable("government_services", {
  id: uuid("id").defaultRandom().primaryKey(),
  agencyId: uuid("agency_id")
    .references(() => governmentAgencies.id, { onDelete: "cascade" })
    .notNull(),
  categoryId: uuid("category_id")
    .references(() => serviceCategories.id, { onDelete: "cascade" })
    .notNull(),
  nameEn: varchar("name_en", { length: 255 }).notNull(),
  nameBn: varchar("name_bn", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  descriptionBn: text("description_bn").notNull(),
  officialUrl: text("official_url").notNull(),
  deliveryTime: varchar("delivery_time", { length: 120 }),
  officialFee: varchar("official_fee", { length: 120 }),
  status: varchar("status", { length: 50 }).default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 4. Approved Sources (Domain allowlist)
export const approvedSources = pgTable("approved_sources", {
  id: uuid("id").defaultRandom().primaryKey(),
  agencyId: uuid("agency_id").references(() => governmentAgencies.id),
  domain: varchar("domain", { length: 255 }).notNull(),
  url: text("url").notNull().unique(),
  title: text("title").notNull(),
  approvalStatus: varchar("approval_status", { length: 50 })
    .default("approved")
    .notNull(),
  lastVerifiedAt: timestamp("last_verified_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 5. Crawled Documents
export const crawledDocuments = pgTable("crawled_documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  sourceId: uuid("source_id")
    .references(() => approvedSources.id, { onDelete: "cascade" })
    .notNull(),
  url: text("url").notNull(),
  contentHash: varchar("content_hash", { length: 64 }).notNull(),
  extractedText: text("extracted_text").notNull(),
  documentType: varchar("document_type", { length: 50 }).default("html").notNull(),
  metadataJson: jsonb("metadata_json"),
  version: integer("version").default(1).notNull(),
  crawledAt: timestamp("crawled_at").defaultNow().notNull(),
});

// 6. Document Passages with Vector Embeddings
export const documentPassages = pgTable("document_passages", {
  id: uuid("id").defaultRandom().primaryKey(),
  documentId: uuid("document_id")
    .references(() => crawledDocuments.id, { onDelete: "cascade" })
    .notNull(),
  passageText: text("passage_text").notNull(),
  passageIndex: integer("passage_index").notNull(),
  sectionTitle: text("section_title"),
  embedding: vector("embedding"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 7. Feedback & Error Reports
export const userFeedback = pgTable("user_feedback", {
  id: uuid("id").defaultRandom().primaryKey(),
  category: varchar("category", { length: 50 }).notNull(),
  comment: text("comment").notNull(),
  status: varchar("status", { length: 50 }).default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
