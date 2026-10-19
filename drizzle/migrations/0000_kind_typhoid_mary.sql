CREATE TABLE IF NOT EXISTS "approved_sources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"agency_id" uuid,
	"domain" varchar(255) NOT NULL,
	"url" text NOT NULL,
	"title" text NOT NULL,
	"approval_status" varchar(50) DEFAULT 'approved' NOT NULL,
	"last_verified_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "approved_sources_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "crawled_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_id" uuid NOT NULL,
	"url" text NOT NULL,
	"content_hash" varchar(64) NOT NULL,
	"extracted_text" text NOT NULL,
	"document_type" varchar(50) DEFAULT 'html' NOT NULL,
	"metadata_json" jsonb,
	"version" integer DEFAULT 1 NOT NULL,
	"crawled_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "document_passages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_id" uuid NOT NULL,
	"passage_text" text NOT NULL,
	"passage_index" integer NOT NULL,
	"section_title" text,
	"embedding" vector(1536),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "government_agencies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name_en" varchar(255) NOT NULL,
	"name_bn" varchar(255) NOT NULL,
	"slug" varchar(120) NOT NULL,
	"website_url" text NOT NULL,
	"description_bn" text,
	"status" varchar(50) DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "government_agencies_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "government_services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"agency_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"name_en" varchar(255) NOT NULL,
	"name_bn" varchar(255) NOT NULL,
	"slug" varchar(120) NOT NULL,
	"description_bn" text NOT NULL,
	"official_url" text NOT NULL,
	"delivery_time" varchar(120),
	"official_fee" varchar(120),
	"status" varchar(50) DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "government_services_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name_en" varchar(255) NOT NULL,
	"name_bn" varchar(255) NOT NULL,
	"slug" varchar(120) NOT NULL,
	"description_bn" text,
	"icon_name" varchar(50) DEFAULT 'Compass',
	"sort_order" integer DEFAULT 0,
	"status" varchar(50) DEFAULT 'active' NOT NULL,
	CONSTRAINT "service_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category" varchar(50) NOT NULL,
	"comment" text NOT NULL,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "approved_sources" ADD CONSTRAINT "approved_sources_agency_id_government_agencies_id_fk" FOREIGN KEY ("agency_id") REFERENCES "public"."government_agencies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crawled_documents" ADD CONSTRAINT "crawled_documents_source_id_approved_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."approved_sources"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "document_passages" ADD CONSTRAINT "document_passages_document_id_crawled_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."crawled_documents"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "government_services" ADD CONSTRAINT "government_services_agency_id_government_agencies_id_fk" FOREIGN KEY ("agency_id") REFERENCES "public"."government_agencies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "government_services" ADD CONSTRAINT "government_services_category_id_service_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."service_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
