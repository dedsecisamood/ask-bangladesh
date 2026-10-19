# Ask Bangladesh — Database Design

> **Version:** 1.0.0
> **Last Updated:** 2026-10-19
> **Status:** Living Document
> **Database:** PostgreSQL 16+ with pgvector extension

---

## Table of Contents

1. [Overview](#1-overview)
2. [Entity-Relationship Model](#2-entity-relationship-model)
3. [Table Definitions](#3-table-definitions)
4. [Indexes](#4-indexes)
5. [Foreign Key Relationships](#5-foreign-key-relationships)
6. [Row-Level Security](#6-row-level-security)
7. [Migration Strategy](#7-migration-strategy)
8. [Data Lifecycle & Retention](#8-data-lifecycle--retention)

---

## 1. Overview

The database is designed around a single PostgreSQL instance that serves three roles:

1. **Relational store** — Government agencies, services, sources, admin users, audit logs
2. **Full-text search engine** — tsvector indexes for BM25-style keyword search in Bangla and English
3. **Vector store** — pgvector embeddings for semantic similarity search

### Required Extensions

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";    -- UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";      -- Cryptographic functions
CREATE EXTENSION IF NOT EXISTS "vector";        -- pgvector for embeddings
CREATE EXTENSION IF NOT EXISTS "pg_trgm";       -- Trigram similarity for fuzzy search
CREATE EXTENSION IF NOT EXISTS "btree_gin";     -- Composite GIN indexes
```

### Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Tables | `snake_case`, plural | `government_services` |
| Columns | `snake_case` | `name_en`, `created_at` |
| Primary keys | `id` (UUID) | `id UUID DEFAULT uuid_generate_v4()` |
| Foreign keys | `<table_singular>_id` | `agency_id`, `source_id` |
| Indexes | `idx_<table>_<columns>` | `idx_services_agency_id` |
| Unique constraints | `uq_<table>_<columns>` | `uq_services_slug` |
| Check constraints | `chk_<table>_<description>` | `chk_services_status` |
| Timestamps | `created_at`, `updated_at` | Auto-managed |
| JSON columns | `<name>_json` | `metadata_json`, `errors_json` |
| tsvector columns | `<name>_tsvector` | `keywords_tsvector` |
| Enum-like columns | Text with CHECK constraint | `status TEXT CHECK (status IN (...))` |

---

## 2. Entity-Relationship Model

### Domain Relationships

```
government_agencies (1) ──── (N) government_services
government_agencies (1) ──── (N) approved_sources

service_categories  (1) ──── (N) government_services
service_categories  (1) ──── (N) service_categories (self-ref: parent_id)

government_services (1) ──── (N) service_aliases

approved_sources    (1) ──── (N) crawled_documents
approved_sources    (1) ──── (N) crawl_jobs
approved_sources    (1) ──── (N) source_freshness_checks

crawled_documents   (1) ──── (N) document_passages
crawled_documents   (1) ──── (1) crawled_documents (self-ref: previous_version_id)

document_passages   (1) ──── (N) search_index

chat_sessions       (1) ──── (N) chat_messages
chat_messages       (1) ──── (N) user_feedback

admin_users         (1) ──── (N) audit_logs
admin_users         (1) ──── (N) user_feedback (reviewed_by)
admin_users         (1) ──── (N) approved_sources (approved_by)

search_index        (N) ──── (1) document_passages
search_index        (N) ──── (1) crawled_documents
search_index        (N) ──── (1) government_services
```

### Entity Groups

| Group | Tables | Purpose |
|---|---|---|
| **Service Catalog** | `government_agencies`, `service_categories`, `government_services`, `service_aliases` | Structured directory of government services |
| **Content Pipeline** | `approved_sources`, `crawled_documents`, `document_passages`, `search_index`, `crawl_jobs`, `source_freshness_checks` | Ingestion, storage, and indexing of source content |
| **User Interaction** | `chat_sessions`, `chat_messages`, `user_feedback` | Anonymous chat sessions and feedback |
| **Administration** | `admin_users`, `audit_logs` | Admin access control and audit trail |

---

## 3. Table Definitions

### 3.1 `government_agencies`

Stores official Bangladesh government agencies and ministries.

```sql
CREATE TABLE government_agencies (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en     TEXT NOT NULL,
    name_bn     TEXT NOT NULL,
    slug        TEXT NOT NULL UNIQUE,
    website_url TEXT,
    description TEXT,
    logo_url    TEXT,
    status      TEXT NOT NULL DEFAULT 'active'
                CHECK (status IN ('active', 'inactive', 'archived')),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE government_agencies IS 'Official Bangladesh government agencies and ministries';
COMMENT ON COLUMN government_agencies.name_en IS 'Agency name in English';
COMMENT ON COLUMN government_agencies.name_bn IS 'Agency name in Bangla (Bengali script)';
COMMENT ON COLUMN government_agencies.slug IS 'URL-friendly identifier, e.g., "ministry-of-education"';
COMMENT ON COLUMN government_agencies.status IS 'Visibility status: active agencies appear in search results';
```

### 3.2 `service_categories`

Hierarchical categorization of government services. Supports one level of nesting via `parent_id`.

```sql
CREATE TABLE service_categories (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en     TEXT NOT NULL,
    name_bn     TEXT NOT NULL,
    slug        TEXT NOT NULL UNIQUE,
    description TEXT,
    icon        TEXT,
    sort_order  INTEGER NOT NULL DEFAULT 0,
    parent_id   UUID REFERENCES service_categories(id) ON DELETE SET NULL,
    status      TEXT NOT NULL DEFAULT 'active'
                CHECK (status IN ('active', 'inactive', 'archived')),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_categories_no_self_parent CHECK (parent_id != id)
);

COMMENT ON TABLE service_categories IS 'Hierarchical categories for organizing government services';
COMMENT ON COLUMN service_categories.icon IS 'Lucide icon name for UI display';
COMMENT ON COLUMN service_categories.sort_order IS 'Display order within parent category (ascending)';
COMMENT ON COLUMN service_categories.parent_id IS 'Parent category for hierarchical nesting (NULL = top-level)';
```

### 3.3 `government_services`

Core table representing individual government services.

```sql
CREATE TABLE government_services (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agency_id       UUID NOT NULL REFERENCES government_agencies(id) ON DELETE RESTRICT,
    category_id     UUID REFERENCES service_categories(id) ON DELETE SET NULL,
    name_en         TEXT NOT NULL,
    name_bn         TEXT NOT NULL,
    slug            TEXT NOT NULL UNIQUE,
    description_en  TEXT,
    description_bn  TEXT,
    official_url    TEXT,
    status          TEXT NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active', 'inactive', 'deprecated', 'archived')),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE government_services IS 'Individual government services offered by agencies';
COMMENT ON COLUMN government_services.official_url IS 'Direct URL to the service page on the official government website';
COMMENT ON COLUMN government_services.status IS 'deprecated = service exists but is no longer offered; archived = removed from search';
```

### 3.4 `service_aliases`

Alternative names, abbreviations, and Banglish spellings for services to improve search recall.

```sql
CREATE TABLE service_aliases (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id  UUID NOT NULL REFERENCES government_services(id) ON DELETE CASCADE,
    alias       TEXT NOT NULL,
    language    TEXT NOT NULL DEFAULT 'bn'
                CHECK (language IN ('bn', 'en', 'banglish')),
    is_banglish BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_aliases_service_alias UNIQUE (service_id, alias)
);

COMMENT ON TABLE service_aliases IS 'Alternative names and Banglish spellings for improved search matching';
COMMENT ON COLUMN service_aliases.alias IS 'Alternative name, e.g., "NID" for "National ID Card", "jatio porichoy potro" in Banglish';
COMMENT ON COLUMN service_aliases.is_banglish IS 'TRUE if this alias is a romanized Bangla (Banglish) spelling';
```

### 3.5 `approved_sources`

Admin-approved URLs and domains that the crawler is authorized to fetch content from.

```sql
CREATE TABLE approved_sources (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agency_id           UUID REFERENCES government_agencies(id) ON DELETE SET NULL,
    url                 TEXT NOT NULL,
    domain              TEXT NOT NULL,
    title               TEXT,
    description         TEXT,
    source_type         TEXT NOT NULL DEFAULT 'webpage'
                        CHECK (source_type IN ('webpage', 'pdf', 'api', 'sitemap', 'rss')),
    approval_status     TEXT NOT NULL DEFAULT 'pending'
                        CHECK (approval_status IN ('pending', 'approved', 'rejected', 'suspended')),
    approved_by         UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    approved_at         TIMESTAMPTZ,
    last_verified_at    TIMESTAMPTZ,
    verification_status TEXT DEFAULT 'unknown'
                        CHECK (verification_status IN ('unknown', 'accessible', 'inaccessible', 'changed', 'redirected')),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_sources_url UNIQUE (url)
);

COMMENT ON TABLE approved_sources IS 'Admin-approved source URLs that the crawler is authorized to fetch from';
COMMENT ON COLUMN approved_sources.domain IS 'Extracted domain for grouping and rate limiting, e.g., "www.btcl.gov.bd"';
COMMENT ON COLUMN approved_sources.source_type IS 'Type of content expected at this URL';
COMMENT ON COLUMN approved_sources.verification_status IS 'Result of the most recent accessibility check';
```

### 3.6 `crawled_documents`

Raw documents fetched by the crawler, with version tracking.

```sql
CREATE TABLE crawled_documents (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id           UUID NOT NULL REFERENCES approved_sources(id) ON DELETE CASCADE,
    url                 TEXT NOT NULL,
    content_hash        TEXT NOT NULL,
    raw_content         TEXT,
    extracted_text      TEXT,
    document_type       TEXT NOT NULL DEFAULT 'html'
                        CHECK (document_type IN ('html', 'pdf', 'json', 'xml', 'text')),
    metadata_json       JSONB DEFAULT '{}',
    crawl_status        TEXT NOT NULL DEFAULT 'pending'
                        CHECK (crawl_status IN ('pending', 'crawled', 'processed', 'approved', 'rejected', 'error')),
    crawled_at          TIMESTAMPTZ,
    version             INTEGER NOT NULL DEFAULT 1,
    previous_version_id UUID REFERENCES crawled_documents(id) ON DELETE SET NULL,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE crawled_documents IS 'Documents fetched by the crawler from approved sources';
COMMENT ON COLUMN crawled_documents.content_hash IS 'SHA-256 hash of extracted_text for change detection';
COMMENT ON COLUMN crawled_documents.raw_content IS 'Original HTML/PDF content before extraction (stored temporarily for debugging)';
COMMENT ON COLUMN crawled_documents.extracted_text IS 'Clean text content extracted from raw_content';
COMMENT ON COLUMN crawled_documents.metadata_json IS 'Structured metadata: { title, author, publish_date, language, word_count, ... }';
COMMENT ON COLUMN crawled_documents.version IS 'Incrementing version number for this URL; v1 is the first crawl';
COMMENT ON COLUMN crawled_documents.previous_version_id IS 'Link to the previous version of this document for change tracking';
```

### 3.7 `document_passages`

Chunked passages from documents, each with a vector embedding for semantic search.

```sql
CREATE TABLE document_passages (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id     UUID NOT NULL REFERENCES crawled_documents(id) ON DELETE CASCADE,
    passage_text    TEXT NOT NULL,
    passage_index   INTEGER NOT NULL,
    section_title   TEXT,
    page_number     INTEGER,
    char_start      INTEGER,
    char_end        INTEGER,
    embedding       vector(1536),
    metadata_json   JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_passages_document_index UNIQUE (document_id, passage_index)
);

COMMENT ON TABLE document_passages IS 'Chunked text passages with vector embeddings for semantic search';
COMMENT ON COLUMN document_passages.passage_text IS 'Text content of this passage (~512 tokens target size)';
COMMENT ON COLUMN document_passages.passage_index IS 'Sequential index of this passage within the document (0-based)';
COMMENT ON COLUMN document_passages.section_title IS 'Heading/section title this passage falls under';
COMMENT ON COLUMN document_passages.page_number IS 'Source page number (for PDFs)';
COMMENT ON COLUMN document_passages.char_start IS 'Character offset start position in the full extracted text';
COMMENT ON COLUMN document_passages.char_end IS 'Character offset end position in the full extracted text';
COMMENT ON COLUMN document_passages.embedding IS '1536-dimensional vector from OpenAI text-embedding-3-small';
COMMENT ON COLUMN document_passages.metadata_json IS 'Additional metadata: { language, token_count, has_table, has_list, ... }';
```

### 3.8 `search_index`

Denormalized search index combining full-text search vectors with foreign key references for filtered queries.

```sql
CREATE TABLE search_index (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    passage_id          UUID NOT NULL REFERENCES document_passages(id) ON DELETE CASCADE,
    document_id         UUID NOT NULL REFERENCES crawled_documents(id) ON DELETE CASCADE,
    service_id          UUID REFERENCES government_services(id) ON DELETE SET NULL,
    keywords_tsvector   TSVECTOR NOT NULL,
    language            TEXT NOT NULL DEFAULT 'bn'
                        CHECK (language IN ('bn', 'en', 'mixed')),
    indexed_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_search_index_passage UNIQUE (passage_id)
);

COMMENT ON TABLE search_index IS 'Denormalized full-text search index for BM25-style keyword retrieval';
COMMENT ON COLUMN search_index.keywords_tsvector IS 'Pre-computed tsvector for full-text search; includes passage text + section title + document title';
COMMENT ON COLUMN search_index.service_id IS 'Optional link to a specific government service for filtered search';
COMMENT ON COLUMN search_index.language IS 'Detected language of the passage content';
```

### 3.9 `chat_sessions`

Minimal session tracking for chat conversations. No PII is stored.

```sql
CREATE TABLE chat_sessions (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_token       TEXT NOT NULL UNIQUE,
    language_preference TEXT DEFAULT 'bn'
                        CHECK (language_preference IN ('bn', 'en', 'banglish')),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at          TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '24 hours'),

    CONSTRAINT chk_sessions_expiry CHECK (expires_at > created_at)
);

COMMENT ON TABLE chat_sessions IS 'Minimal, anonymous chat sessions with automatic expiry. No PII stored.';
COMMENT ON COLUMN chat_sessions.session_token IS 'Cryptographically random token for client-side session identification';
COMMENT ON COLUMN chat_sessions.language_preference IS 'User-selected or auto-detected language preference';
COMMENT ON COLUMN chat_sessions.expires_at IS 'Session auto-expires after 24 hours; all associated messages are cleaned up';
```

### 3.10 `chat_messages`

Individual messages within a chat session. Subject to TTL-based automatic cleanup.

```sql
CREATE TABLE chat_messages (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id      UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
    role            TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content         TEXT NOT NULL,
    sources_json    JSONB DEFAULT '[]',
    feedback        TEXT CHECK (feedback IN ('positive', 'negative', NULL)),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE chat_messages IS 'Chat messages within a session. Auto-deleted when session expires.';
COMMENT ON COLUMN chat_messages.role IS 'Message role: user (question), assistant (answer), system (internal)';
COMMENT ON COLUMN chat_messages.sources_json IS 'Array of source citations: [{ url, title, agency, passage_id, relevance_score }]';
COMMENT ON COLUMN chat_messages.feedback IS 'Quick inline feedback: positive (thumbs up) or negative (thumbs down)';
```

### 3.11 `admin_users`

Admin accounts for the dashboard. Separate from public user interactions.

```sql
CREATE TABLE admin_users (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email           TEXT NOT NULL UNIQUE,
    password_hash   TEXT NOT NULL,
    name            TEXT NOT NULL,
    role            TEXT NOT NULL DEFAULT 'viewer'
                    CHECK (role IN ('viewer', 'editor', 'admin', 'super_admin')),
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login_at   TIMESTAMPTZ
);

COMMENT ON TABLE admin_users IS 'Admin dashboard user accounts with role-based access control';
COMMENT ON COLUMN admin_users.password_hash IS 'bcrypt hash of the admin password';
COMMENT ON COLUMN admin_users.role IS 'Access level: viewer (read-only), editor (manage content), admin (manage users), super_admin (full access)';
```

### 3.12 `audit_logs`

Immutable log of all admin actions for accountability and debugging.

```sql
CREATE TABLE audit_logs (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id        UUID NOT NULL REFERENCES admin_users(id) ON DELETE RESTRICT,
    action          TEXT NOT NULL,
    resource_type   TEXT NOT NULL,
    resource_id     UUID,
    details_json    JSONB DEFAULT '{}',
    ip_address      INET,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE audit_logs IS 'Immutable audit trail of all admin actions';
COMMENT ON COLUMN audit_logs.action IS 'Action performed: create, update, delete, approve, reject, login, logout';
COMMENT ON COLUMN audit_logs.resource_type IS 'Type of resource affected: source, document, service, user, crawl_job, setting';
COMMENT ON COLUMN audit_logs.resource_id IS 'UUID of the affected resource';
COMMENT ON COLUMN audit_logs.details_json IS 'Additional action details: { before: {...}, after: {...}, reason: "..." }';
```

### 3.13 `source_freshness_checks`

Periodic checks to verify that approved sources are still accessible and unchanged.

```sql
CREATE TABLE source_freshness_checks (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id       UUID NOT NULL REFERENCES approved_sources(id) ON DELETE CASCADE,
    check_type      TEXT NOT NULL DEFAULT 'http_head'
                    CHECK (check_type IN ('http_head', 'content_hash', 'full_crawl')),
    status          TEXT NOT NULL
                    CHECK (status IN ('accessible', 'inaccessible', 'changed', 'unchanged', 'redirected', 'error')),
    details_json    JSONB DEFAULT '{}',
    checked_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE source_freshness_checks IS 'Log of periodic source accessibility and freshness verification checks';
COMMENT ON COLUMN source_freshness_checks.check_type IS 'Type of check: http_head (quick availability), content_hash (content changed?), full_crawl (re-crawl)';
COMMENT ON COLUMN source_freshness_checks.details_json IS 'Check details: { http_status, content_hash, response_time_ms, error_message, redirect_url }';
```

### 3.14 `user_feedback`

Detailed user feedback on AI responses, for quality improvement.

```sql
CREATE TABLE user_feedback (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    message_id      UUID NOT NULL REFERENCES chat_messages(id) ON DELETE CASCADE,
    feedback_type   TEXT NOT NULL CHECK (feedback_type IN ('positive', 'negative', 'inaccurate', 'incomplete', 'outdated', 'other')),
    comment         TEXT,
    status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'reviewed', 'addressed', 'dismissed')),
    reviewed_by     UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    reviewed_at     TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE user_feedback IS 'Detailed user feedback on AI responses for quality monitoring and improvement';
COMMENT ON COLUMN user_feedback.feedback_type IS 'Category of feedback: positive, negative, inaccurate (wrong info), incomplete (missing info), outdated, other';
COMMENT ON COLUMN user_feedback.comment IS 'Optional free-text comment from the user (max 1000 chars, validated at API level)';
COMMENT ON COLUMN user_feedback.status IS 'Admin review status: pending → reviewed → addressed/dismissed';
```

### 3.15 `crawl_jobs`

Tracks the execution of crawl operations for monitoring and debugging.

```sql
CREATE TABLE crawl_jobs (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id           UUID NOT NULL REFERENCES approved_sources(id) ON DELETE CASCADE,
    status              TEXT NOT NULL DEFAULT 'queued'
                        CHECK (status IN ('queued', 'running', 'completed', 'failed', 'cancelled')),
    started_at          TIMESTAMPTZ,
    completed_at        TIMESTAMPTZ,
    documents_found     INTEGER DEFAULT 0,
    documents_processed INTEGER DEFAULT 0,
    errors_json         JSONB DEFAULT '[]',
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE crawl_jobs IS 'Tracks crawl job execution for monitoring, debugging, and admin visibility';
COMMENT ON COLUMN crawl_jobs.documents_found IS 'Total number of pages/documents discovered during the crawl';
COMMENT ON COLUMN crawl_jobs.documents_processed IS 'Number of documents successfully processed (extracted + embedded)';
COMMENT ON COLUMN crawl_jobs.errors_json IS 'Array of errors: [{ url, error_type, message, timestamp }]';
```

---

## 4. Indexes

### 4.1 Primary & Unique Indexes

Primary key indexes are created automatically. Additional unique indexes:

```sql
-- Unique slugs for URL-friendly identifiers
CREATE UNIQUE INDEX uq_agencies_slug ON government_agencies(slug);
CREATE UNIQUE INDEX uq_categories_slug ON service_categories(slug);
CREATE UNIQUE INDEX uq_services_slug ON government_services(slug);

-- Unique session tokens
CREATE UNIQUE INDEX uq_sessions_token ON chat_sessions(session_token);

-- Unique admin emails
CREATE UNIQUE INDEX uq_admin_email ON admin_users(email);

-- Unique source URLs
CREATE UNIQUE INDEX uq_sources_url ON approved_sources(url);

-- Unique passage per document position
CREATE UNIQUE INDEX uq_passages_doc_index ON document_passages(document_id, passage_index);

-- Unique search index entry per passage
CREATE UNIQUE INDEX uq_search_passage ON search_index(passage_id);

-- Unique alias per service
CREATE UNIQUE INDEX uq_aliases_svc_alias ON service_aliases(service_id, alias);
```

### 4.2 Foreign Key Indexes

```sql
-- government_services lookups
CREATE INDEX idx_services_agency_id ON government_services(agency_id);
CREATE INDEX idx_services_category_id ON government_services(category_id);
CREATE INDEX idx_services_status ON government_services(status);

-- service_aliases lookups
CREATE INDEX idx_aliases_service_id ON service_aliases(service_id);

-- service_categories hierarchy
CREATE INDEX idx_categories_parent_id ON service_categories(parent_id);

-- approved_sources lookups
CREATE INDEX idx_sources_agency_id ON approved_sources(agency_id);
CREATE INDEX idx_sources_approval_status ON approved_sources(approval_status);
CREATE INDEX idx_sources_domain ON approved_sources(domain);

-- crawled_documents lookups
CREATE INDEX idx_documents_source_id ON crawled_documents(source_id);
CREATE INDEX idx_documents_crawl_status ON crawled_documents(crawl_status);
CREATE INDEX idx_documents_content_hash ON crawled_documents(content_hash);
CREATE INDEX idx_documents_url ON crawled_documents(url);

-- document_passages lookups
CREATE INDEX idx_passages_document_id ON document_passages(document_id);

-- search_index lookups
CREATE INDEX idx_search_document_id ON search_index(document_id);
CREATE INDEX idx_search_service_id ON search_index(service_id);

-- chat_messages lookups
CREATE INDEX idx_messages_session_id ON chat_messages(session_id);
CREATE INDEX idx_messages_created_at ON chat_messages(created_at);

-- chat_sessions expiry
CREATE INDEX idx_sessions_expires_at ON chat_sessions(expires_at);

-- audit_logs lookups
CREATE INDEX idx_audit_admin_id ON audit_logs(admin_id);
CREATE INDEX idx_audit_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_created_at ON audit_logs(created_at);

-- crawl_jobs lookups
CREATE INDEX idx_crawl_jobs_source_id ON crawl_jobs(source_id);
CREATE INDEX idx_crawl_jobs_status ON crawl_jobs(status);

-- user_feedback lookups
CREATE INDEX idx_feedback_message_id ON user_feedback(message_id);
CREATE INDEX idx_feedback_status ON user_feedback(status);
CREATE INDEX idx_feedback_created_at ON user_feedback(created_at);

-- source_freshness_checks lookups
CREATE INDEX idx_freshness_source_id ON source_freshness_checks(source_id);
CREATE INDEX idx_freshness_checked_at ON source_freshness_checks(checked_at);
```

### 4.3 Full-Text Search Indexes (GIN)

```sql
-- Primary FTS index on the search_index table
CREATE INDEX idx_search_keywords_gin ON search_index USING GIN (keywords_tsvector);

-- Trigram indexes for fuzzy Bangla/Banglish matching
CREATE INDEX idx_services_name_bn_trgm ON government_services USING GIN (name_bn gin_trgm_ops);
CREATE INDEX idx_services_name_en_trgm ON government_services USING GIN (name_en gin_trgm_ops);
CREATE INDEX idx_aliases_alias_trgm ON service_aliases USING GIN (alias gin_trgm_ops);

-- Composite GIN index for filtered FTS queries
-- Allows efficient: WHERE keywords_tsvector @@ query AND language = 'bn'
CREATE INDEX idx_search_lang_keywords ON search_index USING GIN (language, keywords_tsvector);
```

### 4.4 Vector Indexes (pgvector)

```sql
-- HNSW index for approximate nearest neighbor search
-- HNSW provides better query performance than IVFFlat and doesn't require training
CREATE INDEX idx_passages_embedding_hnsw ON document_passages
    USING hnsw (embedding vector_cosine_ops)
    WITH (m = 16, ef_construction = 128);
```

> [!IMPORTANT]
> **HNSW vs IVFFlat:** We use HNSW indexes because they provide better recall at equivalent speed, don't require a separate training step, and support concurrent inserts without index rebuilds. This is critical for a system where documents are continuously ingested.

#### Vector Index Tuning Parameters

| Parameter | Value | Description |
|---|---|---|
| `m` | 16 | Maximum number of connections per node. Higher = better recall, more memory |
| `ef_construction` | 128 | Size of the dynamic candidate list during index building. Higher = better index quality |
| `ef_search` (runtime) | 40 | Set via `SET hnsw.ef_search = 40;` at query time. Higher = better recall, slower |

#### Expected Performance (HNSW)

| Passages | Index Size | Query Latency (top-20) | Recall@20 |
|---|---|---|---|
| 100,000 | ~600 MB | < 10ms | > 98% |
| 500,000 | ~3 GB | < 30ms | > 95% |
| 1,000,000 | ~6 GB | < 50ms | > 92% |

---

## 5. Foreign Key Relationships

### Relationship Map

```sql
-- Service Catalog relationships
government_services.agency_id    → government_agencies.id  (RESTRICT on DELETE)
government_services.category_id  → service_categories.id   (SET NULL on DELETE)
service_categories.parent_id     → service_categories.id   (SET NULL on DELETE)
service_aliases.service_id       → government_services.id   (CASCADE on DELETE)

-- Content Pipeline relationships
approved_sources.agency_id       → government_agencies.id   (SET NULL on DELETE)
approved_sources.approved_by     → admin_users.id           (SET NULL on DELETE)
crawled_documents.source_id      → approved_sources.id      (CASCADE on DELETE)
crawled_documents.previous_version_id → crawled_documents.id (SET NULL on DELETE)
document_passages.document_id    → crawled_documents.id     (CASCADE on DELETE)
search_index.passage_id          → document_passages.id     (CASCADE on DELETE)
search_index.document_id         → crawled_documents.id     (CASCADE on DELETE)
search_index.service_id          → government_services.id   (SET NULL on DELETE)
crawl_jobs.source_id             → approved_sources.id      (CASCADE on DELETE)
source_freshness_checks.source_id → approved_sources.id     (CASCADE on DELETE)

-- User Interaction relationships
chat_messages.session_id         → chat_sessions.id         (CASCADE on DELETE)
user_feedback.message_id         → chat_messages.id         (CASCADE on DELETE)
user_feedback.reviewed_by        → admin_users.id           (SET NULL on DELETE)

-- Administration relationships
audit_logs.admin_id              → admin_users.id           (RESTRICT on DELETE)
```

### Cascade Delete Strategy

| Parent Table | Child Table | On Delete | Rationale |
|---|---|---|---|
| `government_agencies` | `government_services` | RESTRICT | Prevent accidental deletion of agency with services |
| `government_agencies` | `approved_sources` | SET NULL | Sources can exist without agency link |
| `government_services` | `service_aliases` | CASCADE | Aliases are meaningless without their service |
| `approved_sources` | `crawled_documents` | CASCADE | Documents belong to their source |
| `crawled_documents` | `document_passages` | CASCADE | Passages belong to their document |
| `document_passages` | `search_index` | CASCADE | Index entries follow their passages |
| `chat_sessions` | `chat_messages` | CASCADE | Messages belong to their session |
| `chat_messages` | `user_feedback` | CASCADE | Feedback is on a specific message |
| `admin_users` | `audit_logs` | RESTRICT | Never delete admins with audit history |

---

## 6. Row-Level Security

Row-Level Security (RLS) can be used if the application connects to PostgreSQL with per-role credentials (e.g., via Supabase or with custom roles). Below are the recommended policies:

### Database Roles

```sql
-- Application roles
CREATE ROLE app_public;      -- Public-facing API (chat, search)
CREATE ROLE app_admin;       -- Admin dashboard operations
CREATE ROLE app_ingestion;   -- Python ingestion workers
CREATE ROLE app_readonly;    -- Read-only for monitoring/analytics
```

### RLS Policies

```sql
-- Enable RLS on all tables
ALTER TABLE government_agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE government_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE approved_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE crawled_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_passages ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_index ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Public role: read-only access to active content
CREATE POLICY "public_read_agencies" ON government_agencies
    FOR SELECT TO app_public
    USING (status = 'active');

CREATE POLICY "public_read_services" ON government_services
    FOR SELECT TO app_public
    USING (status = 'active');

CREATE POLICY "public_read_categories" ON service_categories
    FOR SELECT TO app_public
    USING (status = 'active');

CREATE POLICY "public_read_passages" ON document_passages
    FOR SELECT TO app_public
    USING (
        document_id IN (
            SELECT id FROM crawled_documents WHERE crawl_status = 'approved'
        )
    );

CREATE POLICY "public_read_search" ON search_index
    FOR SELECT TO app_public
    USING (TRUE);  -- All indexed content is searchable

-- Public role: can create and read own sessions/messages
CREATE POLICY "public_create_sessions" ON chat_sessions
    FOR INSERT TO app_public
    WITH CHECK (TRUE);

CREATE POLICY "public_read_own_session" ON chat_sessions
    FOR SELECT TO app_public
    USING (session_token = current_setting('app.session_token', TRUE));

CREATE POLICY "public_create_messages" ON chat_messages
    FOR INSERT TO app_public
    WITH CHECK (
        session_id IN (
            SELECT id FROM chat_sessions
            WHERE session_token = current_setting('app.session_token', TRUE)
        )
    );

-- Admin role: full access to all tables
CREATE POLICY "admin_full_access" ON government_agencies
    FOR ALL TO app_admin
    USING (TRUE) WITH CHECK (TRUE);

-- (Similar policies for all tables with FOR ALL TO app_admin)

-- Ingestion role: write access to content pipeline tables only
CREATE POLICY "ingestion_write_documents" ON crawled_documents
    FOR ALL TO app_ingestion
    USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "ingestion_write_passages" ON document_passages
    FOR ALL TO app_ingestion
    USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "ingestion_write_search" ON search_index
    FOR ALL TO app_ingestion
    USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "ingestion_write_jobs" ON crawl_jobs
    FOR ALL TO app_ingestion
    USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "ingestion_read_sources" ON approved_sources
    FOR SELECT TO app_ingestion
    USING (approval_status = 'approved');
```

> [!NOTE]
> If using a single database connection role (common in serverless setups), RLS can be skipped in favor of application-level authorization checks in the API layer. The policies above serve as a defense-in-depth measure.

---

## 7. Migration Strategy

### Tool

We use **Drizzle Kit** for database migrations, which generates SQL migration files from TypeScript schema definitions.

### Migration Workflow

```
1. Developer modifies schema in src/db/schema/*.ts
2. Run: npx drizzle-kit generate
   → Creates timestamped SQL migration in drizzle/migrations/
3. Review generated SQL for correctness
4. Run: npx drizzle-kit migrate (or push for dev)
   → Applies migration to the database
5. Commit both schema changes and migration file
```

### Migration File Structure

```
drizzle/
├── migrations/
│   ├── 0000_initial_schema.sql
│   ├── 0001_add_service_aliases.sql
│   ├── 0002_add_vector_index.sql
│   ├── 0003_add_crawl_jobs.sql
│   └── meta/
│       ├── 0000_snapshot.json
│       ├── 0001_snapshot.json
│       └── _journal.json
└── drizzle.config.ts
```

### Migration Best Practices

| Practice | Description |
|---|---|
| **Forward-only** | Never modify existing migration files; create new migrations for changes |
| **Idempotent** | Use `IF NOT EXISTS` and `IF EXISTS` guards where possible |
| **Reversible** | Document rollback steps in comments (manual rollback, not auto-down) |
| **Small & focused** | One logical change per migration file |
| **Data migrations** | Separate schema migrations from data migrations |
| **Index creation** | Use `CONCURRENTLY` for index creation on large tables to avoid locking |
| **Testing** | Apply migrations to a test database before production |

### Seed Data

Initial seed data is managed separately from migrations:

```
drizzle/
├── seed/
│   ├── agencies.ts        -- Government agencies
│   ├── categories.ts      -- Service categories
│   ├── services.ts        -- Initial government services
│   ├── aliases.ts         -- Common service aliases
│   └── admin.ts           -- Initial super admin account
```

### Zero-Downtime Migration Checklist

For production deployments:

1. **Adding columns:** Add with `DEFAULT` value or `NULL` allowed → no lock
2. **Adding indexes:** Use `CREATE INDEX CONCURRENTLY` → no table lock
3. **Removing columns:** Deploy code that ignores the column first, then drop in next release
4. **Renaming columns:** Add new column → migrate data → update code → drop old column (3-step process)
5. **Adding tables:** Safe, no impact on existing tables
6. **Changing column types:** Add new column → migrate data → swap in code → drop old column

---

## 8. Data Lifecycle & Retention

### Automatic Cleanup

```sql
-- Delete expired chat sessions and cascade to messages and feedback
-- Run as a scheduled job (e.g., every hour via pg_cron or application cron)
DELETE FROM chat_sessions WHERE expires_at < NOW();

-- Delete old freshness check records (keep last 30 days)
DELETE FROM source_freshness_checks WHERE checked_at < NOW() - INTERVAL '30 days';

-- Delete raw_content from old crawled documents (keep extracted_text only)
-- Saves storage by removing raw HTML after processing
UPDATE crawled_documents
SET raw_content = NULL
WHERE crawl_status IN ('approved', 'rejected')
  AND crawled_at < NOW() - INTERVAL '7 days'
  AND raw_content IS NOT NULL;

-- Archive old audit logs to cold storage (keep last 90 days in main table)
-- Implement as a separate archival job
```

### Retention Policies

| Data Type | Retention | Rationale |
|---|---|---|
| Chat sessions + messages | 24 hours | Privacy: no long-term storage of user interactions |
| Crawled documents (approved) | Indefinite | Core content, needed for serving answers |
| Crawled documents (rejected) | 30 days | Kept briefly for admin review, then purged |
| Raw HTML/PDF content | 7 days after processing | Only needed for debugging extraction issues |
| Document passages + embeddings | Indefinite (until document updated) | Core search index |
| Audit logs | 1 year | Compliance and debugging |
| Freshness checks | 30 days | Trend analysis, then purge |
| Crawl job records | 90 days | Debugging and monitoring |
| User feedback (addressed) | 6 months | Quality analysis |
| User feedback (pending) | Indefinite | Until reviewed |

### Backup Strategy

| Backup Type | Frequency | Retention | Method |
|---|---|---|---|
| **Full backup** | Daily | 30 days | Managed PG automated backups |
| **WAL archiving** | Continuous | 7 days | Point-in-time recovery |
| **Schema export** | Per migration | Indefinite | Git (migration files) |
| **Seed data** | Per change | Indefinite | Git (seed files) |

---

> [!NOTE]
> This database design document is a living document. Schema changes should be accompanied by updates to this document and corresponding Drizzle schema files.
