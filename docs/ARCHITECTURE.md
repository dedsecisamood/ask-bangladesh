# Ask Bangladesh — System Architecture

> **Version:** 1.0.0
> **Last Updated:** 2026-10-19
> **Status:** Living Document

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Component Architecture](#2-component-architecture)
3. [Data Flow Diagrams](#3-data-flow-diagrams)
4. [Technology Decisions](#4-technology-decisions)
5. [Deployment Architecture](#5-deployment-architecture)
6. [Security Architecture](#6-security-architecture)
7. [Scalability Considerations](#7-scalability-considerations)
8. [Cost Optimization Strategy](#8-cost-optimization-strategy)

---

## 1. System Overview

Ask Bangladesh is an AI-powered platform that helps Bangladeshis discover and understand government services. The system ingests content from official government sources, processes it through a RAG (Retrieval-Augmented Generation) pipeline, and serves answers to users in Bangla, Banglish, and English.

> [!IMPORTANT]
> Ask Bangladesh is an **independent project** and is **not affiliated with the Bangladesh government**. All information is sourced from publicly available government websites and documents.

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                              USERS                                       │
│              (Mobile / Desktop — Bangla, Banglish, English)              │
└──────────────────────────┬───────────────────────────────────────────────┘
                           │ HTTPS
                           ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                         EDGE / CDN (Vercel)                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐  │
│  │  Static Assets  │  │  ISR / SSR Pages│  │  Edge Middleware        │  │
│  │  (CSS, JS, img) │  │  (React RSC)    │  │  (Rate Limit, Geo, i18n)│  │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────┘  │
└──────────────────────────┬───────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                      NEXT.JS APPLICATION                                 │
│                                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │  App Router  │  │  Route       │  │  Server      │  │  Client    │  │
│  │  (Pages &    │  │  Handlers    │  │  Actions     │  │  Components│  │
│  │   Layouts)   │  │  (/api/*)    │  │  (mutations) │  │  (interact)│  │
│  └──────────────┘  └──────┬───────┘  └──────────────┘  └────────────┘  │
│                           │                                              │
│  ┌────────────────────────┴──────────────────────────────────────────┐  │
│  │                     SERVICE LAYER                                 │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │  │
│  │  │  Search   │  │  RAG     │  │  Admin   │  │  Ingestion       │  │  │
│  │  │  Service  │  │  Engine  │  │  Service │  │  Orchestrator    │  │  │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────────┬─────────┘  │  │
│  └───────┼──────────────┼──────────────┼────────────────┼────────────┘  │
│          │              │              │                │                │
└──────────┼──────────────┼──────────────┼────────────────┼────────────────┘
           │              │              │                │
           ▼              ▼              ▼                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                          │
│                                                                          │
│  ┌────────────────────────────────────┐  ┌───────────────────────────┐  │
│  │  PostgreSQL + pgvector             │  │  LLM Provider (External) │  │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ │  │  ┌─────────────────────┐ │  │
│  │  │ Relat. │ │ Vector │ │ FTS    │ │  │  │  OpenAI / Gemini /  │ │  │
│  │  │ Tables │ │ Index  │ │ Index  │ │  │  │  Anthropic (abstrd) │ │  │
│  │  └────────┘ └────────┘ └────────┘ │  │  └─────────────────────┘ │  │
│  └────────────────────────────────────┘  └───────────────────────────┘  │
│                                                                          │
│  ┌────────────────────────────────────┐                                  │
│  │  Python Ingestion Workers          │                                  │
│  │  (Crawling, Parsing, Embedding)    │                                  │
│  └────────────────────────────────────┘                                  │
└──────────────────────────────────────────────────────────────────────────┘
```

### Design Principles

| Principle | Application |
|---|---|
| **Bangla-First** | All UI, prompts, and search are optimized for Bangla content and Bangla script rendering |
| **Mobile-First** | Designed for low-end Android phones on slow 3G/4G connections |
| **Privacy by Default** | No user accounts, no PII collection, session data auto-expires |
| **Source Grounded** | Every answer is grounded in official government sources with citations |
| **Offline Resilient** | Service worker caching, minimal JS bundles, progressive enhancement |
| **Cost Efficient** | Aggressive caching, smart retrieval to minimize LLM token usage |

---

## 2. Component Architecture

### 2.1 Frontend — Next.js App Router

The frontend is built on Next.js 14+ using the App Router paradigm, leveraging React Server Components (RSC) for performance-critical pages and Client Components for interactive elements.

#### Directory Structure

```
src/
├── app/
│   ├── (public)/              # Public-facing routes
│   │   ├── page.tsx           # Landing page (RSC)
│   │   ├── chat/
│   │   │   └── page.tsx       # Chat interface (mixed RSC + Client)
│   │   ├── services/
│   │   │   ├── page.tsx       # Services directory (RSC with ISR)
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # Service detail (RSC with ISR)
│   │   └── about/
│   │       └── page.tsx       # About page (RSC, static)
│   ├── admin/                 # Admin dashboard (protected)
│   │   ├── layout.tsx         # Auth guard layout
│   │   ├── page.tsx           # Dashboard overview
│   │   ├── sources/           # Source management
│   │   ├── documents/         # Document review
│   │   ├── feedback/          # User feedback review
│   │   ├── crawl-jobs/        # Crawl job monitoring
│   │   └── settings/          # System configuration
│   ├── api/                   # Route Handlers
│   │   ├── chat/              # Chat API
│   │   ├── search/            # Search API
│   │   ├── feedback/          # Feedback submission
│   │   └── admin/             # Admin APIs
│   ├── layout.tsx             # Root layout (fonts, metadata, providers)
│   ├── not-found.tsx          # 404 page
│   └── error.tsx              # Error boundary
├── components/
│   ├── ui/                    # shadcn/ui base components
│   ├── chat/                  # Chat-specific components
│   ├── services/              # Service browsing components
│   ├── admin/                 # Admin dashboard components
│   └── shared/                # Shared/layout components
├── lib/                       # Utility libraries
├── hooks/                     # Custom React hooks
├── stores/                    # Client-side state (Zustand)
└── styles/                    # Global styles and Tailwind config
```

#### React Server Components (RSC)

RSCs are used for all data-fetching pages to minimize client-side JavaScript:

- **Service directory pages** — Server-rendered with ISR (Incremental Static Regeneration), revalidated every 1 hour
- **Service detail pages** — Server-rendered with ISR, revalidated on content change
- **Landing page** — Static generation with dynamic chat entry point
- **Admin dashboard tables** — Server-rendered with real-time refresh triggers

#### Client Components

Client Components are used sparingly, only where interactivity is required:

- **Chat interface** — Message input, streaming response display, source citation expansion
- **Search autocomplete** — Debounced search with keyboard navigation
- **Language switcher** — Client-side locale toggle with cookie persistence
- **Admin forms** — CRUD operations with optimistic updates
- **Mobile navigation** — Hamburger menu with slide-out animation

#### State Management

| State Type | Solution | Rationale |
|---|---|---|
| Server state | RSC + Server Actions | No client-side cache needed for read-heavy pages |
| Chat state | Zustand store | Lightweight, minimal boilerplate for message history |
| Form state | React Hook Form + Zod | Type-safe validation that works with Server Actions |
| URL state | `nuqs` (URL search params) | Shareable filter/search states in admin dashboard |
| Language preference | Cookie + Context | Persists across sessions without authentication |

### 2.2 API Layer

#### Route Handlers

All API routes live under `src/app/api/` and follow RESTful conventions:

| Endpoint | Method | Purpose | Auth |
|---|---|---|---|
| `/api/chat` | POST | Submit question, receive streamed answer | Rate limited |
| `/api/chat/feedback` | POST | Submit feedback on a message | Rate limited |
| `/api/search` | GET | Keyword/semantic search for services | Public |
| `/api/search/suggest` | GET | Autocomplete suggestions | Public |
| `/api/admin/sources` | GET/POST | List/create approved sources | Admin |
| `/api/admin/sources/[id]` | PUT/DELETE | Update/remove sources | Admin |
| `/api/admin/crawl-jobs` | GET/POST | List/trigger crawl jobs | Admin |
| `/api/admin/documents` | GET | List crawled documents | Admin |
| `/api/admin/documents/[id]/review` | POST | Approve/reject document | Admin |
| `/api/admin/feedback` | GET | List user feedback | Admin |
| `/api/admin/feedback/[id]` | PUT | Update feedback status | Admin |
| `/api/admin/users` | GET/POST | Admin user management | Super Admin |
| `/api/admin/audit-log` | GET | View audit trail | Admin |

#### Middleware Stack

```
Request
  │
  ├── Edge Middleware (middleware.ts)
  │   ├── Rate limiting (token bucket via Upstash Redis or in-memory)
  │   ├── Language detection (Accept-Language header, cookie, URL)
  │   ├── Bot detection (basic User-Agent filtering)
  │   ├── Admin route protection (JWT verification)
  │   └── Request ID injection (X-Request-ID header)
  │
  ├── Route Handler Middleware (per-route)
  │   ├── Input validation (Zod schemas)
  │   ├── CSRF protection (for mutations)
  │   ├── Response compression
  │   └── Error handling (structured error responses)
  │
  └── Response
```

#### Streaming Responses

The chat endpoint uses the Vercel AI SDK's `streamText` to deliver streaming responses:

```typescript
// Simplified chat route handler pattern
export async function POST(request: Request) {
  const { message, sessionId, language } = await validateInput(request);

  // 1. Detect language & intent
  const detectedLanguage = await detectLanguage(message);

  // 2. Retrieve relevant passages (hybrid search)
  const passages = await hybridSearch(message, { language: detectedLanguage });

  // 3. Rerank passages for relevance
  const rankedPassages = await rerank(message, passages);

  // 4. Assemble prompt with context
  const systemPrompt = buildSystemPrompt(rankedPassages, detectedLanguage);

  // 5. Stream LLM response
  const result = streamText({
    model: getModel(),
    system: systemPrompt,
    messages: [{ role: 'user', content: message }],
  });

  // 6. Log interaction (async, non-blocking)
  logInteraction({ sessionId, message, passages: rankedPassages });

  return result.toDataStreamResponse();
}
```

### 2.3 Database — PostgreSQL with pgvector

PostgreSQL serves as the single database, handling relational data, full-text search, and vector similarity search through the `pgvector` extension.

#### Why a Single Database?

- **Operational simplicity** — One database to manage, backup, and monitor
- **Transactional consistency** — Vector embeddings and metadata stay in sync
- **Cost efficiency** — No separate vector database service needed
- **pgvector maturity** — Production-ready for our scale (< 1M vectors)

#### Key Extensions

| Extension | Purpose |
|---|---|
| `pgvector` | Vector similarity search for semantic retrieval |
| `pg_trgm` | Trigram matching for fuzzy Bangla/Banglish search |
| `btree_gin` | Composite GIN indexes for filtered full-text search |

#### Connection Management

- **Application side:** Connection pooling via `@vercel/postgres` or `pg` with `Pool` (max 10 connections per serverless instance)
- **Database side:** PgBouncer in transaction mode for connection multiplexing
- **Serverless consideration:** Each Vercel function instance maintains its own small pool; PgBouncer prevents connection exhaustion

#### Full Schema

See [DATABASE_DESIGN.md](./DATABASE_DESIGN.md) for the complete schema specification.

### 2.4 Ingestion Pipeline — Python Workers

The ingestion pipeline is a separate Python service responsible for crawling government websites, extracting content, generating embeddings, and populating the database.

#### Pipeline Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Scheduler   │───▶│  Crawler    │───▶│  Processor  │───▶│  Embedder   │
│  (cron)      │    │  (scrapy /  │    │  (parsing,  │    │  (OpenAI /  │
│              │    │   httpx)    │    │   chunking) │    │   local)    │
└─────────────┘    └─────────────┘    └──────┬──────┘    └──────┬──────┘
                                             │                   │
                                             ▼                   ▼
                                      ┌─────────────┐    ┌─────────────┐
                                      │  Document    │    │  Vector     │
                                      │  Store (PG)  │    │  Store (PG) │
                                      └─────────────┘    └─────────────┘
```

#### Pipeline Stages

| Stage | Technology | Responsibility |
|---|---|---|
| **Scheduler** | Cron / Task queue | Triggers crawl jobs on schedule or admin request |
| **Crawler** | `httpx` + `BeautifulSoup` / Scrapy | Fetches pages from approved sources, respects robots.txt |
| **Processor** | Custom Python | Extracts text, cleans HTML, handles Bangla encoding, chunks into passages |
| **Embedder** | OpenAI `text-embedding-3-small` | Generates 1536-dim vectors for each passage |
| **Loader** | `psycopg2` / `asyncpg` | Upserts documents and passages into PostgreSQL |

#### Chunking Strategy

```
Document
  │
  ├── Split by headings (H1-H3) into sections
  │
  ├── Within sections, split into passages:
  │   ├── Target size: 512 tokens
  │   ├── Max size: 768 tokens
  │   ├── Overlap: 64 tokens between adjacent passages
  │   └── Preserve sentence boundaries (Bangla sentence detection)
  │
  └── Each passage retains metadata:
      ├── Source URL
      ├── Section title
      ├── Page number (for PDFs)
      ├── Character offsets
      └── Document version
```

#### Content Change Detection

- **Hash-based:** SHA-256 of extracted text content; skip re-processing if unchanged
- **Version tracking:** Previous versions are preserved for diff analysis
- **Freshness checks:** Periodic HEAD requests to detect modified-since timestamps

### 2.5 Search & Retrieval

The search system uses a hybrid approach combining keyword search (BM25 via PostgreSQL full-text search) and vector similarity search, with a reranking step.

#### Hybrid Search Pipeline

```
User Query
  │
  ├── Language Detection
  │   └── Bangla / Banglish / English
  │
  ├── Query Preprocessing
  │   ├── Banglish → Bangla transliteration (lookup table + rules)
  │   ├── Spelling normalization
  │   └── Query expansion (synonym mapping for common terms)
  │
  ├── Parallel Search (executed concurrently)
  │   │
  │   ├── [Branch A] Full-Text Search (BM25)
  │   │   ├── tsvector match on search_index
  │   │   ├── Trigram similarity on service names/aliases
  │   │   └── Returns top 20 candidates with BM25 scores
  │   │
  │   └── [Branch B] Vector Similarity Search
  │       ├── Embed query → 1536-dim vector
  │       ├── Cosine similarity on document_passages.embedding
  │       └── Returns top 20 candidates with similarity scores
  │
  ├── Score Fusion (Reciprocal Rank Fusion)
  │   ├── RRF(d) = Σ 1 / (k + rank_i(d))  where k = 60
  │   ├── Merge and deduplicate results
  │   └── Returns top 30 fused candidates
  │
  ├── Reranking (optional, for chat queries)
  │   ├── Cross-encoder model or LLM-based reranking
  │   ├── Scores query-passage relevance
  │   └── Returns top 5-8 passages
  │
  └── Result
      ├── Ranked passages with source metadata
      ├── Relevance scores
      └── Source citations (URL, agency, document title)
```

#### Search Configuration

| Parameter | Value | Rationale |
|---|---|---|
| BM25 weight in RRF | 1.0 | Keyword matches are highly precise for government service names |
| Vector weight in RRF | 1.0 | Equal weighting; vector catches semantic paraphrases |
| RRF constant (k) | 60 | Standard value; balances top-ranked vs. lower-ranked results |
| Vector search candidates | 20 | Sufficient recall for reranking |
| FTS candidates | 20 | Sufficient recall for reranking |
| Final passages to LLM | 5–8 | Balances context quality vs. token cost |
| Similarity threshold | 0.3 | Below this, passages are excluded as irrelevant |

### 2.6 AI/RAG Engine

The RAG engine orchestrates the retrieval and generation pipeline, producing grounded, cited answers.

#### LLM Provider Abstraction

The system supports multiple LLM providers through a unified interface:

```typescript
// Provider abstraction
interface LLMProvider {
  generateStream(params: GenerateParams): AsyncIterable<StreamChunk>;
  generateStructured<T>(params: StructuredParams<T>): Promise<T>;
  embedText(text: string): Promise<number[]>;
}

// Supported providers
const providers = {
  openai: OpenAIProvider,     // GPT-4o-mini (default)
  google: GoogleProvider,     // Gemini 1.5 Flash
  anthropic: AnthropicProvider // Claude 3.5 Haiku
};
```

#### Prompt Assembly

Prompts are structured in layers:

```
┌─────────────────────────────────────────────────────────┐
│  SYSTEM PROMPT                                           │
│  ├── Identity: "You are Ask Bangladesh, an AI assistant  │
│  │   that helps people understand government services."  │
│  ├── Constraints:                                        │
│  │   ├── Only answer from provided context               │
│  │   ├── Cite sources with [n] notation                  │
│  │   ├── Say "I don't have information" when uncertain   │
│  │   ├── Never impersonate government officials          │
│  │   └── Respond in the user's detected language         │
│  ├── Response Format:                                    │
│  │   ├── Use clear, simple language                      │
│  │   ├── Use bullet points for steps                     │
│  │   ├── Include relevant fees, timelines, requirements  │
│  │   └── Always end with source citations                │
│  └── Language-specific instructions                      │
├─────────────────────────────────────────────────────────┤
│  CONTEXT PASSAGES                                        │
│  ├── [Source 1] Agency: ..., URL: ..., Content: ...     │
│  ├── [Source 2] Agency: ..., URL: ..., Content: ...     │
│  └── [Source N] ...                                      │
├─────────────────────────────────────────────────────────┤
│  USER MESSAGE                                            │
│  └── Original user question (in detected language)       │
└─────────────────────────────────────────────────────────┘
```

#### Structured Outputs

For specific operations, the engine uses structured output schemas:

| Operation | Schema | Purpose |
|---|---|---|
| Language detection | `{ language: "bn" \| "en" \| "banglish", confidence: number }` | Route to correct search/response language |
| Intent classification | `{ intent: string, entities: Entity[] }` | Identify service names, agencies, action types |
| Answer with citations | `{ answer: string, citations: Citation[], confidence: string }` | Ensure every claim has a source |
| Query refinement | `{ refinedQuery: string, searchTerms: string[] }` | Improve retrieval for ambiguous questions |

#### Safety & Guardrails

- **Input filtering:** Block prompt injection attempts, detect adversarial inputs
- **Output validation:** Ensure citations reference actual source passages
- **Hallucination mitigation:** Require grounding in retrieved passages; low-confidence answers include disclaimers
- **Topic boundaries:** Only answer questions about Bangladesh government services; redirect off-topic questions politely
- **Bias monitoring:** Log interactions for periodic review of systematic biases

### 2.7 Admin Dashboard

The admin dashboard is a protected area for managing sources, reviewing content, and monitoring system health.

#### Feature Areas

| Module | Features |
|---|---|
| **Dashboard** | System health overview, crawl job status, recent feedback, key metrics |
| **Sources** | Add/edit/remove approved sources, trigger verification checks, view crawl history |
| **Documents** | Review crawled documents, approve/reject, view extracted passages |
| **Services** | Manage government services catalog, categories, agencies |
| **Feedback** | Review user feedback, mark as addressed, identify content gaps |
| **Crawl Jobs** | Monitor running jobs, view errors, trigger manual crawls |
| **Users** | Manage admin accounts and roles (super admin only) |
| **Audit Log** | View all admin actions with timestamps and details |
| **Settings** | System configuration, LLM provider settings, rate limits |

#### Access Control

| Role | Permissions |
|---|---|
| **Viewer** | Read-only access to all modules |
| **Editor** | Manage sources, documents, services, feedback |
| **Admin** | All editor permissions + user management + settings |
| **Super Admin** | All permissions + audit log access + system configuration |

---

## 3. Data Flow Diagrams

### 3.1 User Question → Answer Flow

```
┌──────┐
│ User │
└──┬───┘
   │ 1. Types question in Bangla/Banglish/English
   ▼
┌──────────────────┐
│ Chat Interface   │  Client Component
│ (React)          │
└──┬───────────────┘
   │ 2. POST /api/chat { message, sessionId, language }
   ▼
┌──────────────────┐
│ Rate Limiter     │  Edge Middleware
│ (token bucket)   │
└──┬───────────────┘
   │ 3. Pass if within limits
   ▼
┌──────────────────┐
│ Input Validator  │  Route Handler
│ (Zod schema)     │
└──┬───────────────┘
   │ 4. Validated input
   ▼
┌──────────────────┐
│ Language Detect  │  LLM structured output (cached for common patterns)
│                  │
└──┬───────────────┘
   │ 5. { language: "bn", confidence: 0.95 }
   ▼
┌──────────────────┐
│ Query Preprocess │  Service Layer
│ ├─ Transliterate │  (Banglish → Bangla if needed)
│ ├─ Normalize     │
│ └─ Expand        │
└──┬───────────────┘
   │ 6. Processed query
   ▼
┌──────────────────────────────────────┐
│ Hybrid Search (parallel)             │
│ ┌────────────┐  ┌────────────────┐  │
│ │ BM25 / FTS │  │ Vector Search  │  │
│ │ (tsvector)  │  │ (pgvector)     │  │
│ └─────┬──────┘  └──────┬─────────┘  │
│       └────────┬───────┘             │
│                ▼                     │
│       ┌────────────────┐             │
│       │ RRF Fusion     │             │
│       │ (merge & rank) │             │
│       └────────┬───────┘             │
│                ▼                     │
│       ┌────────────────┐             │
│       │ Reranker       │             │
│       │ (top 5-8)      │             │
│       └────────────────┘             │
└──────────┬───────────────────────────┘
           │ 7. Ranked passages + source metadata
           ▼
┌──────────────────┐
│ Prompt Assembly  │  Build system prompt + context + user message
└──┬───────────────┘
   │ 8. Complete prompt
   ▼
┌──────────────────┐
│ LLM Provider     │  Stream response via Vercel AI SDK
│ (GPT-4o-mini)    │
└──┬───────────────┘
   │ 9. Streamed tokens
   ▼
┌──────────────────┐
│ Response Post-   │  Validate citations, format for client
│ Processor        │
└──┬───────────────┘
   │ 10. Streamed response with citation metadata
   ▼
┌──────────────────┐
│ Chat Interface   │  Renders markdown, expandable source cards
│ (React)          │
└──┬───────────────┘
   │ 11. Displayed answer with source links
   ▼
┌──────┐
│ User │  Can click sources, provide feedback, ask follow-ups
└──────┘

   ║ Async (non-blocking):
   ║ • Save message to chat_messages
   ║ • Update session activity timestamp
```

### 3.2 Document Ingestion Flow

```
┌──────────────┐
│ Cron Schedule│  or Admin triggers manual crawl
│ / Admin UI   │
└──┬───────────┘
   │ 1. Trigger crawl job for source_id
   ▼
┌──────────────────┐
│ Job Coordinator  │  Create crawl_jobs record, status = 'running'
└──┬───────────────┘
   │ 2. Fetch approved_source config
   ▼
┌──────────────────┐
│ Crawler          │
│ ├─ Check robots  │  Respect robots.txt
│ ├─ Fetch pages   │  HTTP GET with rate limiting (1 req/sec per domain)
│ ├─ Follow links  │  Within approved domain scope
│ └─ Download docs │  PDF, HTML, structured data
└──┬───────────────┘
   │ 3. Raw HTML/PDF content
   ▼
┌──────────────────┐
│ Content Extractor│
│ ├─ HTML parsing  │  BeautifulSoup, extract main content
│ ├─ PDF extraction│  PyMuPDF / pdfplumber
│ ├─ Bangla OCR    │  (future: for scanned PDFs)
│ └─ Metadata      │  Title, dates, language detection
└──┬───────────────┘
   │ 4. Extracted text + metadata
   ▼
┌──────────────────┐
│ Change Detection │  Hash comparison with existing content
│ (SHA-256)        │
└──┬───────────────┘
   │ 5. Only process changed/new documents
   ▼
┌──────────────────┐
│ Text Chunker     │
│ ├─ Section split │  By headings
│ ├─ Passage split │  ~512 tokens with 64 overlap
│ └─ Bangla-aware  │  Sentence boundary detection for Bangla
└──┬───────────────┘
   │ 6. Passages with metadata
   ▼
┌──────────────────┐
│ Embedding Engine │
│ (OpenAI API)     │  Batch embedding (up to 2048 inputs per request)
└──┬───────────────┘
   │ 7. 1536-dim vectors
   ▼
┌──────────────────┐
│ Database Loader  │
│ ├─ Upsert docs   │  crawled_documents table
│ ├─ Upsert pass.  │  document_passages table (with vectors)
│ ├─ Update FTS    │  search_index tsvector columns
│ └─ Update job    │  crawl_jobs status, counters
└──┬───────────────┘
   │ 8. Updated database
   ▼
┌──────────────────┐
│ Post-Processing  │
│ ├─ Verify counts │  Ensure all passages indexed
│ ├─ Clean orphans │  Remove passages from deleted sections
│ └─ Notify admin  │  If errors occurred during crawl
└──────────────────┘
```

### 3.3 Admin Review Flow

```
┌──────────┐
│ Admin    │  Logged in with JWT session
└──┬───────┘
   │ 1. Navigate to Sources / Documents / Feedback
   ▼
┌──────────────────┐
│ Admin Dashboard  │  Server-rendered with real-time data
│ (Next.js RSC)    │
└──┬───────────────┘
   │
   ├── [Source Review]
   │   │ 2a. Admin adds new source URL
   │   ▼
   │   ┌──────────────────┐
   │   │ Source Validator  │  Check URL accessibility, robots.txt, domain
   │   └──┬───────────────┘
   │      │ 3a. Create approved_source (status: 'pending')
   │      ▼
   │   ┌──────────────────┐
   │   │ Admin Review     │  Approve or reject the source
   │   └──┬───────────────┘
   │      │ 4a. Update status → 'approved' / 'rejected'
   │      │     Log to audit_logs
   │      ▼
   │   ┌──────────────────┐
   │   │ Trigger Crawl    │  If approved, schedule initial crawl
   │   └──────────────────┘
   │
   ├── [Document Review]
   │   │ 2b. View crawled documents pending review
   │   ▼
   │   ┌──────────────────┐
   │   │ Document Preview │  Show extracted text, passages, metadata
   │   └──┬───────────────┘
   │      │ 3b. Admin approves/rejects/flags for re-crawl
   │      │     Log to audit_logs
   │      ▼
   │   ┌──────────────────┐
   │   │ Update Status    │  Document becomes searchable (or removed)
   │   └──────────────────┘
   │
   └── [Feedback Review]
       │ 2c. View user feedback on answers
       ▼
       ┌──────────────────┐
       │ Feedback Queue   │  Sorted by type (negative first)
       └──┬───────────────┘
          │ 3c. Admin reviews, identifies content gaps
          │     Updates status, adds internal notes
          ▼
       ┌──────────────────┐
       │ Action Items     │  Create tasks: add source, update content,
       │                  │  adjust prompt, etc.
       └──────────────────┘
```

---

## 4. Technology Decisions

### Core Stack Rationale

| Technology | Choice | Alternatives Considered | Rationale |
|---|---|---|---|
| **Framework** | Next.js 14+ (App Router) | Remix, SvelteKit, Nuxt | Best RSC support, Vercel deployment synergy, largest ecosystem |
| **Language** | TypeScript | JavaScript | Type safety critical for API contracts, better DX |
| **Styling** | Tailwind CSS + shadcn/ui | Chakra UI, MUI, CSS Modules | Smallest bundle, composable primitives, full control |
| **Database** | PostgreSQL + pgvector | Supabase, PlanetScale + Pinecone | Single database simplicity, native vector support, cost effective |
| **ORM/Query** | Drizzle ORM | Prisma, Knex, raw SQL | Type-safe, lightweight, great migration support, close to SQL |
| **Embeddings** | OpenAI text-embedding-3-small | Cohere, local models | Best multilingual (Bangla) performance, cost effective at 1536 dims |
| **LLM** | GPT-4o-mini (default) | Claude Haiku, Gemini Flash | Best Bangla output quality at lowest cost tier |
| **Auth** | NextAuth.js (admin only) | Clerk, Auth0, custom JWT | Simple setup, no external dependency for admin-only auth |
| **Validation** | Zod | Yup, io-ts, Valibot | Runtime + compile-time safety, great Next.js integration |
| **Ingestion** | Python (httpx, BeautifulSoup) | Node.js (Cheerio), Scrapy | Best PDF processing ecosystem, mature NLP libraries for Bangla |

### Key Design Decisions

**1. No User Accounts**

Users interact anonymously with session-based tokens. This eliminates PII storage concerns, reduces regulatory burden, and simplifies the user experience for a population that may be hesitant to create accounts on unofficial platforms.

**2. Single Database (PostgreSQL)**

Rather than a separate vector database (Pinecone, Weaviate), we use pgvector within PostgreSQL. At our expected scale (< 500K passages), pgvector with HNSW indexes provides adequate performance (< 50ms for top-20 retrieval) while dramatically simplifying operations.

**3. Hybrid Search over Pure Vector Search**

Government service names and terminology are highly specific. Pure vector search may miss exact keyword matches (e.g., "NID" should match "National ID" documents precisely). BM25 keyword search excels at these exact matches, while vector search captures semantic similarity for paraphrased queries.

**4. Server-Side Rendering for Content Pages**

Service directory and detail pages are server-rendered with ISR to minimize client-side JavaScript. This is critical for users on low-end Android phones where JS parsing is a performance bottleneck.

**5. Streaming Responses**

Chat responses are streamed token-by-token using the Vercel AI SDK. This provides immediate feedback to users on slow connections and reduces perceived latency from ~5s (full response) to ~500ms (first token).

---

## 5. Deployment Architecture

### Production Environment

```
┌─────────────────────────────────────────────────────────────────────┐
│                        VERCEL PLATFORM                               │
│                                                                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────────┐  │
│  │  Edge Network   │  │  Serverless     │  │  Build System      │  │
│  │  (CDN + Edge    │  │  Functions      │  │  (CI/CD from       │  │
│  │   Middleware)   │  │  (API routes,   │  │   GitHub main)     │  │
│  │                 │  │   RSC, SSR)     │  │                    │  │
│  └─────────────────┘  └────────┬────────┘  └────────────────────┘  │
│                                │                                     │
└────────────────────────────────┼─────────────────────────────────────┘
                                 │ Database connection (pooled)
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    MANAGED POSTGRESQL                                 │
│                    (Neon / Supabase / Vercel Postgres)               │
│                                                                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────────┐  │
│  │  Primary DB     │  │  pgvector       │  │  PgBouncer         │  │
│  │  (Relational +  │  │  (Vector Index) │  │  (Connection Pool) │  │
│  │   FTS Index)    │  │                 │  │                    │  │
│  └─────────────────┘  └─────────────────┘  └────────────────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    PYTHON WORKERS                                     │
│                    (Railway / Render / VPS)                           │
│                                                                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────────┐  │
│  │  Crawl Workers  │  │  Embedding      │  │  Freshness         │  │
│  │  (scheduled)    │  │  Workers        │  │  Checker           │  │
│  └─────────────────┘  └─────────────────┘  └────────────────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                                  │
│                                                                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────────┐  │
│  │  OpenAI API     │  │  Upstash Redis  │  │  Sentry            │  │
│  │  (LLM + Embed)  │  │  (Rate Limits,  │  │  (Error Tracking)  │  │
│  │                 │  │   Cache)        │  │                    │  │
│  └─────────────────┘  └─────────────────┘  └────────────────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Environment Configuration

| Environment | Purpose | Database | LLM | URL |
|---|---|---|---|---|
| **Production** | Live users | Managed PG (prod) | GPT-4o-mini | askbangladesh.com |
| **Staging** | Pre-release testing | Managed PG (staging) | GPT-4o-mini | staging.askbangladesh.com |
| **Preview** | PR previews | Shared dev DB | GPT-4o-mini (limited) | *.vercel.app |
| **Development** | Local dev | Docker PG | Mock / GPT-4o-mini | localhost:3000 |

### CI/CD Pipeline

```
GitHub Push/PR
  │
  ├── Lint & Type Check (ESLint, TypeScript)
  ├── Unit Tests (Vitest)
  ├── Integration Tests (Playwright, limited)
  ├── Build Check (next build)
  │
  ├── [PR] → Deploy to Vercel Preview
  │          Run E2E smoke tests
  │          Post preview URL to PR
  │
  └── [main] → Deploy to Vercel Production
               Run post-deploy health checks
               Notify team on failure
```

---

## 6. Security Architecture

### Threat Model

| Threat | Risk | Mitigation |
|---|---|---|
| **Prompt injection** | High | Input sanitization, system prompt hardening, output validation |
| **Data exfiltration** | Medium | No PII stored, session data auto-expires, no sensitive data in LLM context |
| **DDoS / abuse** | High | Rate limiting (IP + session), edge-level protection, Vercel DDoS mitigation |
| **Admin account compromise** | High | Strong passwords, 2FA, session rotation, audit logging |
| **SSRF via crawler** | Medium | URL allowlisting, domain-scoped crawling, no user-supplied URLs to crawler |
| **SQL injection** | Medium | Parameterized queries via ORM, input validation |
| **XSS** | Medium | React's built-in escaping, CSP headers, sanitized markdown rendering |

### Authentication & Authorization

```
┌─────────────────────────────────────────────┐
│              PUBLIC ROUTES                    │
│  No authentication required                  │
│  Rate limited by IP + session token          │
│  ┌───────────────────────────────────────┐   │
│  │ /          Landing page               │   │
│  │ /chat      Chat interface             │   │
│  │ /services  Service directory           │   │
│  │ /api/chat  Chat API                    │   │
│  │ /api/search Search API                │   │
│  └───────────────────────────────────────┘   │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│              ADMIN ROUTES                    │
│  JWT authentication required                 │
│  Role-based access control                   │
│  All actions logged to audit_logs            │
│  ┌───────────────────────────────────────┐   │
│  │ /admin/*        Dashboard pages       │   │
│  │ /api/admin/*    Admin APIs            │   │
│  └───────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

#### Admin Auth Flow

1. Admin navigates to `/admin/login`
2. Submits email + password
3. Server validates credentials against `admin_users` (bcrypt-hashed passwords)
4. Server issues JWT (httpOnly cookie, 24h expiry)
5. Edge middleware validates JWT on all `/admin/*` and `/api/admin/*` routes
6. JWT contains: `{ sub: admin_id, role: admin_role, iat, exp }`
7. Role checked per-route for authorization

### Input Validation

All API inputs are validated using Zod schemas before processing:

```typescript
// Example: Chat input validation
const ChatInputSchema = z.object({
  message: z.string()
    .min(1, "Message cannot be empty")
    .max(2000, "Message too long")
    .refine(sanitizeInput, "Invalid characters detected"),
  sessionId: z.string().uuid().optional(),
  language: z.enum(["bn", "en", "banglish"]).optional(),
});
```

### Rate Limiting

| Endpoint | Limit | Window | Key |
|---|---|---|---|
| `/api/chat` | 20 requests | 1 minute | IP + session |
| `/api/search` | 60 requests | 1 minute | IP |
| `/api/feedback` | 10 requests | 1 minute | IP + session |
| `/api/admin/*` | 120 requests | 1 minute | Admin user ID |
| Global | 1000 requests | 1 minute | IP |

### Security Headers

```typescript
// next.config.ts security headers
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.openai.com;"
  },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];
```

### SSRF Protection (Crawler)

- **Domain allowlist:** Crawler only fetches from domains in `approved_sources`
- **URL validation:** Reject private IPs (127.0.0.1, 10.x.x.x, 192.168.x.x, etc.)
- **Protocol restriction:** Only HTTP/HTTPS allowed
- **Redirect limit:** Maximum 3 redirects, only within allowed domains
- **Timeout:** 30-second connection timeout, 60-second total timeout
- **No user-supplied URLs:** All crawl targets are admin-approved

---

## 7. Scalability Considerations

### Current Scale Targets

| Metric | Target | Notes |
|---|---|---|
| Concurrent users | 500 | Serverless auto-scales |
| Chat requests/min | 200 | Rate limited per-user |
| Document passages | 500,000 | pgvector HNSW handles well |
| Vector search latency | < 50ms | HNSW index with ef_search=40 |
| FTS search latency | < 20ms | GIN indexes on tsvectors |
| Chat response (first token) | < 1s | Streaming from LLM provider |
| Chat response (complete) | < 8s | Depends on response length |
| Page load (mobile 3G) | < 3s | SSR + minimal JS |

### Scaling Strategy

#### Phase 1: Current (MVP)
- Vercel serverless functions (auto-scaling)
- Single PostgreSQL instance (managed)
- In-memory rate limiting (per-function instance)
- Direct LLM API calls

#### Phase 2: Growth (1K+ daily users)
- Upstash Redis for shared rate limiting and caching
- PostgreSQL read replica for search-heavy queries
- Response caching for common questions (Redis)
- CDN caching for service pages (Vercel Edge Cache)

#### Phase 3: Scale (10K+ daily users)
- Dedicated vector search (if pgvector becomes a bottleneck)
- Multiple Python worker instances
- LLM response caching with semantic similarity matching
- Database connection pooling optimization (PgBouncer tuning)
- Consider edge-deployed embedding models for faster search

### Database Scaling

```
Phase 1:
  Single PG instance (4 vCPU, 16GB RAM)
  └── Handles: relational + FTS + vector (< 500K passages)

Phase 2:
  Primary PG (writes + admin reads)
  └── Read Replica (user-facing search queries)

Phase 3:
  Primary PG (writes)
  ├── Read Replica 1 (FTS queries)
  ├── Read Replica 2 (vector queries)
  └── Consider: Partitioning passages by agency/category
```

### Caching Strategy

| Cache Layer | Technology | TTL | Content |
|---|---|---|---|
| **Edge Cache** | Vercel Edge | 1 hour | Service pages (ISR) |
| **API Cache** | Upstash Redis | 5 min | Search results for common queries |
| **LLM Cache** | Upstash Redis | 24 hours | Full responses for exact query matches |
| **Embedding Cache** | In-memory | Session | Embeddings for repeat queries |
| **Static Assets** | Vercel CDN | 1 year | CSS, JS, fonts, images |

---

## 8. Cost Optimization Strategy

### Cost Breakdown (Estimated Monthly at MVP Scale)

| Service | Estimated Cost | Optimization |
|---|---|---|
| **Vercel** (hosting) | $20/mo (Pro plan) | ISR reduces function invocations |
| **PostgreSQL** (Neon/Supabase) | $25/mo | Single DB, compute auto-suspend |
| **OpenAI API** (LLM) | $50–100/mo | GPT-4o-mini, aggressive caching |
| **OpenAI API** (embeddings) | $5–10/mo | Batch embedding, only re-embed changes |
| **Upstash Redis** | $10/mo | Pay-per-request pricing |
| **Domain + DNS** | $15/yr | Cloudflare free tier |
| **Monitoring** (Sentry) | Free tier | 5K events/month |
| **Total** | **~$120–170/mo** | |

### Cost Reduction Techniques

**1. LLM Cost Optimization**
- Use GPT-4o-mini as default (10x cheaper than GPT-4o)
- Cache responses for identical/near-identical queries
- Minimize context window: only include top 5–8 most relevant passages
- Use structured outputs for classification tasks (fewer tokens)
- Set max_tokens appropriately per response type

**2. Embedding Cost Optimization**
- Batch embed during ingestion (up to 2048 texts per API call)
- Only re-embed changed passages (hash-based change detection)
- Use `text-embedding-3-small` (1536 dims, cheaper than `text-embedding-3-large`)
- Cache query embeddings for repeated searches

**3. Database Cost Optimization**
- Use Neon's auto-suspend (scale to zero when idle)
- HNSW indexes over IVFFlat (better query performance, less need for re-indexing)
- Periodic cleanup of expired chat sessions and old crawl data
- Partition large tables by date if they grow beyond 10M rows

**4. Bandwidth Cost Optimization**
- Aggressive static asset caching (immutable hashes)
- Image optimization via Next.js Image component
- Brotli compression for all text responses
- Minimal client-side JavaScript (< 100KB gzipped for public pages)
- Font subsetting for Bangla fonts (only include used glyphs)

---

> [!NOTE]
> This architecture document is a living document and will be updated as the project evolves. All decisions documented here represent the current best understanding and may be revised based on real-world performance data and user feedback.
