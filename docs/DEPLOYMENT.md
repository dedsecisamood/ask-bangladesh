# Deployment Guide — Ask Bangladesh

> **Version:** 1.0.0  
> **Last Updated:** 2025-07-15  
> **Status:** Draft  
> **Owner:** Core Team

---

## Table of Contents

- [1. Environment Strategy](#1-environment-strategy)
- [2. Frontend Deployment](#2-frontend-deployment)
- [3. Database Deployment](#3-database-deployment)
- [4. Python Ingestion Workers](#4-python-ingestion-workers)
- [5. CI/CD Pipeline](#5-cicd-pipeline)
- [6. Domain & SSL](#6-domain--ssl)
- [7. Monitoring & Alerting](#7-monitoring--alerting)
- [8. Incident Response](#8-incident-response)
- [9. Cost Estimation](#9-cost-estimation)
- [10. Pre-Launch Checklist](#10-pre-launch-checklist)
- [11. Go/No-Go Criteria](#11-gono-go-criteria)

---

## 1. Environment Strategy

Ask Bangladesh operates across three deployment environments, each with isolated resources and distinct purposes.

| Environment | Purpose | URL Pattern | Database | Deploy Trigger |
|---|---|---|---|---|
| **Local** | Development & debugging | `localhost:3000` | Local PostgreSQL / Docker | Manual |
| **Preview** | PR review & QA | `ask-bangladesh-<hash>.vercel.app` | Staging database | Automatic on PR |
| **Production** | Live user traffic | `askbangladesh.org` | Production database | Manual approval after merge to `main` |

### 1.1 Local Development

```bash
# Prerequisites
node >= 20.x
pnpm >= 9.x
python >= 3.11
postgresql >= 16 (with pgvector extension)

# Setup
pnpm install
cp .env.example .env.local  # Configure local environment variables
pnpm db:migrate              # Run database migrations
pnpm dev                     # Start Next.js dev server on :3000
```

**Local environment variables** are stored in `.env.local` (git-ignored). A `.env.example` template is committed with placeholder values and inline documentation for every variable.

### 1.2 Preview / Staging

- **Platform:** Vercel Preview Deployments
- **Trigger:** Every push to a pull request branch
- **Database:** Shared staging database (Supabase staging project)
- **AI Provider:** Same provider as production but with lower rate limits and a cost cap
- **Lifecycle:** Automatically torn down when the PR is closed or merged

Preview deployments receive their environment variables from Vercel's project-level preview settings. Secrets that differ between preview and production (e.g., database URLs, API keys) are configured per-environment in the Vercel dashboard.

### 1.3 Production

- **Platform:** Vercel Production
- **Trigger:** Merge to `main` + manual approval in GitHub Actions
- **Database:** Production Supabase project (dedicated instance on Pro plan)
- **AI Provider:** Production API keys with production-tier rate limits
- **CDN:** Vercel Edge Network (global PoPs)

---

## 2. Frontend Deployment

### 2.1 Vercel Deployment

The Next.js application is deployed to Vercel with the following configuration:

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install --frozen-lockfile",
  "outputDirectory": ".next",
  "regions": ["sin1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://*.supabase.co https://api.openai.com; frame-ancestors 'none'"
        }
      ]
    }
  ]
}
```

**Region selection:** `sin1` (Singapore) is the closest Vercel region to Bangladesh, minimizing origin latency. The Vercel Edge Network handles CDN distribution globally.

### 2.2 Build Configuration

| Setting | Value | Rationale |
|---|---|---|
| Node.js version | 20.x | LTS, required for Next.js 14+ features |
| Package manager | pnpm | Fast installs, strict dependency resolution |
| Build command | `pnpm build` | Runs `next build` with type checking |
| Output | Standalone | Smaller deployment bundle |
| React strict mode | Enabled | Catch bugs early |

```typescript
// next.config.ts (production-relevant excerpt)
const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};
```

### 2.3 Environment Variables

All environment variables are managed through Vercel's dashboard with per-environment scoping.

| Variable | Environments | Sensitive | Description |
|---|---|---|---|
| `DATABASE_URL` | All | Yes | PostgreSQL connection string (pooled) |
| `DIRECT_DATABASE_URL` | All | Yes | Direct PostgreSQL connection (migrations only) |
| `OPENAI_API_KEY` | All | Yes | OpenAI API key for embeddings and chat |
| `NEXT_PUBLIC_APP_URL` | All | No | Canonical app URL |
| `NEXT_PUBLIC_ENVIRONMENT` | All | No | `development` / `preview` / `production` |
| `ADMIN_SECRET` | Preview, Prod | Yes | Admin route protection |
| `SENTRY_DSN` | Preview, Prod | No | Sentry error tracking DSN |
| `SENTRY_AUTH_TOKEN` | Preview, Prod | Yes | Sentry release upload token |
| `RATE_LIMIT_REDIS_URL` | Prod | Yes | Upstash Redis for rate limiting |
| `CRON_SECRET` | Prod | Yes | Secret for cron endpoint authentication |

> [!CAUTION]
> Never commit `.env.local` or any file containing real secrets. The `.gitignore` must include all `.env*` files except `.env.example`.

### 2.4 Edge Functions

The following routes leverage Vercel Edge Functions for lower latency:

| Route | Runtime | Reason |
|---|---|---|
| `/api/chat` | Edge | Streaming AI responses with minimal TTFB |
| `/api/search` | Edge | Fast vector search proxying |
| Middleware | Edge | Auth checks, rate limiting, geo-routing |

```typescript
// Example: app/api/chat/route.ts
export const runtime = 'edge';
export const preferredRegion = 'sin1';
```

### 2.5 CDN & Caching Strategy

| Resource Type | Cache Strategy | TTL | Notes |
|---|---|---|---|
| Static assets (JS, CSS, fonts) | Immutable | 1 year | Hashed filenames enable long-term caching |
| Images | `stale-while-revalidate` | 1 day | Revalidate in background |
| HTML pages (SSG) | ISR | 1 hour | Incremental Static Regeneration |
| HTML pages (SSR) | No cache | — | Dynamic, personalized content |
| API responses (`/api/services`) | `s-maxage` | 5 min | CDN caches, origin revalidates |
| API responses (`/api/chat`) | No cache | — | Real-time streaming, never cached |
| Service worker | No cache | — | Always fetch latest |

```typescript
// Example: ISR for service pages
export const revalidate = 3600; // 1 hour
```

---

## 3. Database Deployment

### 3.1 Managed PostgreSQL — Supabase

| Property | Staging | Production |
|---|---|---|
| Provider | Supabase (Free tier) | Supabase (Pro plan) |
| Region | Singapore (`ap-southeast-1`) | Singapore (`ap-southeast-1`) |
| PostgreSQL version | 16 | 16 |
| Extensions | `pgvector`, `pg_trgm`, `unaccent` | `pgvector`, `pg_trgm`, `unaccent` |
| Compute | Shared | Dedicated (Small: 2 vCPU, 4 GB RAM) |
| Storage | 500 MB | 8 GB (expandable) |
| Connections | 60 (direct) | 200 (direct) |

### 3.2 Connection Pooling — PgBouncer

Supabase includes built-in PgBouncer. The application uses two connection strings:

- **Pooled URL** (`DATABASE_URL`): Used by the application for all runtime queries. PgBouncer in `transaction` mode, port `6543`.
- **Direct URL** (`DIRECT_DATABASE_URL`): Used only for migrations and schema changes. Direct connection, port `5432`.

```
# Pooled (runtime)
postgresql://postgres.[project-ref]:[password]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres

# Direct (migrations)
postgresql://postgres.[project-ref]:[password]@aws-0-ap-southeast-1.supabase.com:5432/postgres
```

### 3.3 Migration Strategy

Migrations are managed with Drizzle ORM and run as a pre-deploy step:

```bash
# Generate migration from schema changes
pnpm drizzle-kit generate

# Apply migrations (uses DIRECT_DATABASE_URL)
pnpm drizzle-kit migrate
```

**Migration rules:**

1. Migrations run **before** the new application version is deployed
2. All migrations must be **backwards-compatible** (the old application version must still work after migration)
3. Destructive changes (dropping columns/tables) are performed in two phases:
   - Phase 1: Deploy code that no longer reads/writes the column
   - Phase 2: Run migration to drop the column (next deploy cycle)
4. Every migration is tested against a copy of the staging database before being applied to production
5. Migration files are committed to version control and never modified after being applied

### 3.4 Backup Schedule

| Backup Type | Frequency | Retention | Environment |
|---|---|---|---|
| Automatic (Supabase) | Daily | 7 days (Pro plan) | Production |
| Point-in-Time Recovery | Continuous (WAL archiving) | 7 days | Production |
| Manual pre-migration | Before every migration | 30 days | Production |
| Logical dump (`pg_dump`) | Weekly | 90 days (stored in S3) | Production |
| Staging snapshot | On-demand | 3 days | Staging |

**Point-in-Time Recovery (PITR):** Supabase Pro plan includes PITR via WAL archiving. Recovery can restore the database to any second within the retention window.

**Recovery procedure:**

1. Identify the target recovery timestamp
2. Initiate PITR from Supabase dashboard or API
3. Verify recovered data integrity
4. Update connection strings if the restored instance has a new endpoint
5. Redeploy application if necessary

### 3.5 Environment Isolation

Each environment has a completely separate Supabase project:

- **Local:** Docker-based PostgreSQL with pgvector (`docker-compose.yml`)
- **Staging:** Supabase free-tier project (`ask-bd-staging`)
- **Production:** Supabase pro-tier project (`ask-bd-prod`)

> [!WARNING]
> Production database credentials must never be used in local or staging environments. Connection strings are environment-specific and managed through Vercel's environment variable scoping.

---

## 4. Python Ingestion Workers

### 4.1 Deployment Platform

The Python ingestion pipeline (web crawlers, document processors, embedding generators) runs separately from the Next.js frontend.

| Property | Value |
|---|---|
| Platform | Railway (or Render as fallback) |
| Runtime | Python 3.11+ |
| Container | Docker (custom `Dockerfile`) |
| Region | Singapore (same as database) |

```dockerfile
# ingestion/Dockerfile
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "-m", "ingestion.main"]
```

### 4.2 Scheduled Jobs vs. On-Demand

| Job | Schedule | Type | Typical Duration |
|---|---|---|---|
| Government site crawl (full) | Weekly (Sunday 02:00 BST) | Cron | 2–6 hours |
| Government site crawl (incremental) | Daily (02:00 BST) | Cron | 15–60 min |
| Document processing & chunking | Triggered after crawl | Event-driven | 30–120 min |
| Embedding generation | Triggered after chunking | Event-driven | 30–90 min |
| Stale content detection | Daily (06:00 BST) | Cron | 10–30 min |
| Source health check | Every 6 hours | Cron | 5–10 min |

Cron schedules are configured via Railway's cron service or a dedicated scheduler container. Event-driven jobs are triggered by inserting tasks into a `job_queue` table in PostgreSQL, which the worker polls.

### 4.3 Resource Limits

| Resource | Limit | Rationale |
|---|---|---|
| Memory | 1 GB (max 2 GB burst) | Document processing can be memory-intensive |
| CPU | 1 vCPU | Sufficient for I/O-bound crawling |
| Disk | 1 GB ephemeral | Temporary storage for downloaded documents |
| Concurrent crawl requests | 5 | Respectful crawling; avoid overloading .gov.bd |
| Request timeout | 30 seconds | Prevent hanging on unresponsive sources |
| Embedding batch size | 100 chunks | Balance throughput vs. API rate limits |

### 4.4 Monitoring

- **Job status:** Written to `ingestion_runs` table with start time, end time, status, documents processed, errors encountered
- **Logging:** Structured JSON logs shipped to Railway's log drain → forwarded to a log aggregator
- **Alerts:** Failures trigger alerts via webhook (Discord/Slack) or email
- **Metrics tracked:**
  - Crawl success/failure rate per source
  - Documents processed per run
  - Embedding generation throughput
  - Source response times
  - Error categorization (network, parsing, API)

---

## 5. CI/CD Pipeline

### 5.1 GitHub Actions

The CI/CD pipeline is implemented entirely with GitHub Actions.

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm format:check

  typecheck:
    name: Type Check
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck

  unit-tests:
    name: Unit Tests
    runs-on: ubuntu-latest
    needs: typecheck
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:unit --coverage
      - uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: unit-tests
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
        env:
          DATABASE_URL: ${{ secrets.STAGING_DATABASE_URL }}
      - uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: .next/

  integration-tests:
    name: Integration Tests
    runs-on: ubuntu-latest
    needs: build
    services:
      postgres:
        image: pgvector/pgvector:pg16
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: askbd_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:integration
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/askbd_test

  deploy-preview:
    name: Deploy Preview
    runs-on: ubuntu-latest
    needs: [build, integration-tests]
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          github-comment: true

  deploy-production:
    name: Deploy Production
    runs-on: ubuntu-latest
    needs: [build, integration-tests]
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    environment:
      name: production
      url: https://askbangladesh.org
    steps:
      - uses: actions/checkout@v4
      - name: Run database migrations
        run: pnpm drizzle-kit migrate
        env:
          DIRECT_DATABASE_URL: ${{ secrets.PROD_DIRECT_DATABASE_URL }}
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### 5.2 Pipeline Stages

```
┌──────┐   ┌───────────┐   ┌────────────┐   ┌───────┐   ┌───────────────────┐   ┌────────┐
│ Lint │──▶│ Type Check│──▶│ Unit Tests │──▶│ Build │──▶│ Integration Tests │──▶│ Deploy │
└──────┘   └───────────┘   └────────────┘   └───────┘   └───────────────────┘   └────────┘
```

| Stage | Tool | Failure Action |
|---|---|---|
| Lint | ESLint + Prettier | Block merge |
| Type Check | `tsc --noEmit` | Block merge |
| Unit Tests | Vitest | Block merge |
| Build | `next build` | Block merge |
| Integration Tests | Vitest + Testcontainers | Block merge |
| Deploy (Preview) | Vercel | Comment on PR |
| Deploy (Production) | Vercel | Requires `production` environment approval |

### 5.3 Preview Deployments

Every pull request receives an automatic preview deployment:

- Unique URL per commit (e.g., `ask-bangladesh-abc123.vercel.app`)
- Connected to the staging database
- Vercel bot comments the preview URL on the PR
- Preview is automatically cleaned up when the PR is merged or closed

### 5.4 Production Deployment — Manual Approval

Production deployments require manual approval through GitHub's environment protection rules:

1. Code is merged to `main`
2. CI pipeline runs all checks
3. The `deploy-production` job waits for approval from a designated reviewer
4. Upon approval, database migrations run first
5. Vercel production deployment executes
6. Post-deploy smoke tests verify critical paths

### 5.5 Rollback Procedure

**Instant rollback (< 1 minute):**

```bash
# List recent deployments
vercel ls --prod

# Promote a previous deployment to production
vercel promote <deployment-url> --yes
```

**Database rollback:**

1. If the migration was backwards-compatible (as required by our rules), no database rollback is needed — the previous application version works with the current schema
2. If a migration must be reverted, apply a new "reverse migration" rather than modifying the migration history
3. For catastrophic database issues, use Supabase PITR to restore to a point before the migration

**Rollback decision tree:**

1. Is the issue frontend-only? → Promote previous Vercel deployment
2. Is the issue database + frontend? → Promote previous deployment + apply reverse migration
3. Is data corrupted? → Initiate PITR + promote previous deployment + notify users

---

## 6. Domain & SSL

### 6.1 Custom Domain Setup

| Domain | Purpose | Provider |
|---|---|---|
| `askbangladesh.org` | Primary production domain | Namecheap / Cloudflare Registrar |
| `www.askbangladesh.org` | Redirect to apex | Vercel |
| `staging.askbangladesh.org` | Staging environment | Vercel |

**DNS Configuration:**

```
# Apex domain
askbangladesh.org.    A      76.76.21.21
askbangladesh.org.    AAAA   2606:4700:...  (if using Cloudflare proxy)

# www redirect
www.askbangladesh.org. CNAME  cname.vercel-dns.com.

# Staging
staging.askbangladesh.org. CNAME  cname.vercel-dns.com.
```

### 6.2 HTTPS Enforcement

- **SSL Certificates:** Automatically provisioned and renewed by Vercel (Let's Encrypt)
- **HTTP → HTTPS redirect:** Automatic via Vercel
- **Minimum TLS version:** TLS 1.2

### 6.3 Security Headers

All responses include the following security headers (configured in `vercel.json`):

| Header | Value | Purpose |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | HSTS with 2-year max-age |
| `X-Content-Type-Options` | `nosniff` | Prevent MIME sniffing |
| `X-Frame-Options` | `DENY` | Prevent clickjacking |
| `X-XSS-Protection` | `1; mode=block` | XSS filter (legacy browsers) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Control referrer info |
| `Content-Security-Policy` | See `vercel.json` above | Restrict resource loading |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Disable unnecessary APIs |

---

## 7. Monitoring & Alerting

### 7.1 Error Tracking — Sentry

```typescript
// sentry.client.config.ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
  tracesSampleRate: 0.1, // 10% of transactions
  replaysSessionSampleRate: 0.01, // 1% of sessions
  replaysOnErrorSampleRate: 0.5, // 50% of error sessions
});
```

| Metric | Alert Threshold | Channel |
|---|---|---|
| Error rate | > 5% of requests in 5 min | Email + Discord |
| New error type | Any new unhandled error | Discord |
| Performance regression | P95 response time > 2x baseline | Email |
| AI API errors | > 3 consecutive failures | Email + Discord |

### 7.2 Uptime Monitoring

| Tool | Check Frequency | Endpoints Monitored |
|---|---|---|
| UptimeRobot (or Better Uptime) | Every 1 minute | `/`, `/api/health` |
| Vercel Analytics | Continuous | All routes |
| Custom health endpoint | Every 1 minute | `/api/health` (checks DB + AI connectivity) |

**Health check endpoint:**

```typescript
// app/api/health/route.ts
export async function GET() {
  const checks = {
    database: await checkDatabase(),
    ai_provider: await checkAIProvider(),
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION,
  };

  const healthy = checks.database && checks.ai_provider;
  return Response.json(checks, { status: healthy ? 200 : 503 });
}
```

### 7.3 Performance Monitoring — Core Web Vitals

| Metric | Target | Measurement |
|---|---|---|
| Largest Contentful Paint (LCP) | < 2.5s | Vercel Analytics |
| First Input Delay (FID) | < 100ms | Vercel Analytics |
| Cumulative Layout Shift (CLS) | < 0.1 | Vercel Analytics |
| First Contentful Paint (FCP) | < 2.0s (3G target) | Lighthouse CI |
| Time to Interactive (TTI) | < 5.0s (3G target) | Lighthouse CI |
| Total Blocking Time (TBT) | < 300ms | Lighthouse CI |

**Lighthouse CI** runs on every PR as part of the CI pipeline, comparing against performance budgets.

### 7.4 Database Monitoring

| Metric | Source | Alert Threshold |
|---|---|---|
| Active connections | Supabase dashboard | > 80% of pool |
| Query latency (P95) | Supabase logs | > 500ms |
| Database size | Supabase dashboard | > 80% of plan limit |
| Failed queries | Application logs | > 1% error rate |
| Slow queries | `pg_stat_statements` | > 1s execution time |
| Replication lag | Supabase (if read replicas) | > 10s |

### 7.5 AI Cost Monitoring

| Metric | Source | Alert Threshold |
|---|---|---|
| Daily API spend | OpenAI dashboard / billing API | > $5/day |
| Weekly API spend | OpenAI dashboard | > $25/week |
| Cost per query (average) | Application metrics | > $0.02/query |
| Token usage per query | Application logs | > 4000 tokens/query |
| Embedding generation cost | Ingestion worker logs | > $1/run |

**Cost control measures:**

- Per-user rate limiting (10 queries/hour for anonymous, 30 for authenticated)
- Response token cap (max 1000 tokens per AI response)
- Caching frequent queries (Redis)
- Monitoring dashboards with weekly cost reports

### 7.6 Alert Channels

| Severity | Channel | Response Time |
|---|---|---|
| Critical (site down) | Email + Discord + SMS | < 30 min |
| High (feature broken) | Email + Discord | < 2 hours |
| Medium (degraded perf) | Discord | < 24 hours |
| Low (non-urgent) | Discord | Next business day |

---

## 8. Incident Response

### 8.1 Severity Levels

| Level | Name | Definition | Examples |
|---|---|---|---|
| **SEV-1** | Critical | Complete service outage or data breach | Site unreachable, database compromise |
| **SEV-2** | High | Major feature unavailable | AI chat not responding, search broken |
| **SEV-3** | Medium | Degraded performance or minor feature broken | Slow responses, one language not working |
| **SEV-4** | Low | Cosmetic or minor issue | Styling bug, typo in content |

### 8.2 Response Procedures

#### SEV-1 — Critical

1. **Acknowledge** within 15 minutes
2. **Assess** the scope and impact
3. **Mitigate** — rollback deployment, failover, or disable affected feature
4. **Communicate** — post status update on status page within 30 minutes
5. **Resolve** — implement fix and deploy
6. **Review** — conduct post-incident review within 48 hours

#### SEV-2 — High

1. **Acknowledge** within 1 hour
2. **Investigate** root cause
3. **Mitigate** — apply temporary workaround if possible
4. **Fix** — develop and deploy permanent fix
5. **Review** — document in incident log

#### SEV-3/4 — Medium/Low

1. **Log** the issue in the issue tracker
2. **Prioritize** based on user impact
3. **Fix** in the next development cycle
4. **Verify** fix in preview deployment

### 8.3 Communication Plan

| Audience | Channel | When |
|---|---|---|
| Users | Status page (`status.askbangladesh.org`) | SEV-1 and SEV-2, within 30 min |
| Users | In-app banner | SEV-1, after status page update |
| Development team | Discord `#incidents` channel | All severities |
| Stakeholders | Email summary | SEV-1 and SEV-2, after resolution |

### 8.4 Post-Incident Review

Every SEV-1 and SEV-2 incident triggers a blameless post-incident review:

**Template:**

```markdown
## Incident Report: [TITLE]

- **Date:** YYYY-MM-DD
- **Severity:** SEV-X
- **Duration:** X hours Y minutes
- **Impact:** [Description of user impact]

### Timeline
- HH:MM — [Event]

### Root Cause
[Description]

### Resolution
[What was done to fix it]

### Lessons Learned
- [What went well]
- [What could be improved]

### Action Items
- [ ] [Action item with owner and due date]
```

---

## 9. Cost Estimation

### 9.1 Monthly Cost Breakdown

| Service | Tier | Low Estimate | High Estimate | Notes |
|---|---|---|---|---|
| **Vercel** | Hobby (free) → Pro ($20/mo) | $0 | $20 | Free tier sufficient for launch |
| **Supabase** | Free → Pro ($25/mo) | $0 | $25 | Free tier: 500 MB, Pro: 8 GB |
| **OpenAI API** | Pay-as-you-go | $10 | $100 | Depends on query volume |
| **Railway** (ingestion) | Hobby ($5/mo) → Pro | $5 | $20 | Workers run periodically |
| **Upstash Redis** | Free → Pay-as-you-go | $0 | $10 | Rate limiting, caching |
| **Domain** | Annual / 12 | $1 | $2 | ~$12–$20/year |
| **UptimeRobot** | Free tier | $0 | $0 | 50 monitors free |
| **Sentry** | Developer (free) | $0 | $0 | 5K errors/month free |
| **Email (alerts)** | Free tier | $0 | $0 | Discord webhooks are free |
| **Total** | — | **$16** | **$177** | — |

### 9.2 AI API Cost Estimates

| Metric | Estimate |
|---|---|
| Average tokens per query (input) | ~800 tokens |
| Average tokens per response (output) | ~500 tokens |
| Cost per query (GPT-4o-mini) | ~$0.001 |
| Cost per query (GPT-4o, fallback) | ~$0.01 |
| Embedding cost per 1000 chunks | ~$0.01 |
| Queries per day (early stage) | 50–200 |
| Queries per day (growth stage) | 500–2000 |
| Monthly AI cost (early) | $2–$10 |
| Monthly AI cost (growth) | $20–$80 |

### 9.3 Cost Optimization Strategies

1. **Use GPT-4o-mini as default** — 10x cheaper than GPT-4o, sufficient for most queries
2. **Cache frequent queries** — Many government service questions are repetitive; cache with Redis (TTL: 1 hour)
3. **Semantic caching** — Cache by embedding similarity, not just exact match
4. **Limit output tokens** — Cap at 1000 tokens per response
5. **Rate limit aggressively** — Prevent abuse from driving up costs
6. **Batch embeddings** — Process chunks in batches during off-peak hours
7. **Monitor daily spend** — Set up billing alerts at $5/day and $50/week thresholds
8. **Evaluate open-source models** — As local inference becomes viable, consider Mistral/Llama for cost reduction
9. **Progressive upgrade path** — Start on free tiers, upgrade only when traffic justifies it

### 9.4 Scaling Cost Projections

| Monthly Active Users | Est. Queries/Month | Est. Monthly Cost |
|---|---|---|
| 100 | 1,500 | $16–$30 |
| 1,000 | 15,000 | $30–$60 |
| 10,000 | 150,000 | $80–$200 |
| 50,000 | 500,000 | $200–$500 |

---

## 10. Pre-Launch Checklist

### Infrastructure

- [ ] Production Supabase project created and configured
- [ ] Database migrations applied to production
- [ ] pgvector extension enabled
- [ ] Connection pooling verified (PgBouncer)
- [ ] Backup schedule confirmed (daily + PITR)
- [ ] Vercel production deployment configured
- [ ] Custom domain DNS configured and propagated
- [ ] SSL certificate provisioned and verified
- [ ] CDN caching verified for static assets
- [ ] Edge function regions confirmed (`sin1`)

### Application

- [ ] All environment variables set in Vercel production
- [ ] Health check endpoint responding correctly
- [ ] Error tracking (Sentry) configured and sending test events
- [ ] Rate limiting enabled and tested
- [ ] CORS configuration verified
- [ ] CSP headers verified (no console errors)
- [ ] Robots.txt and sitemap.xml deployed
- [ ] Favicon and PWA manifest deployed
- [ ] OpenGraph/social meta tags configured
- [ ] Analytics tracking verified

### Performance

- [ ] Lighthouse score ≥ 90 on mobile (Performance, Accessibility, Best Practices, SEO)
- [ ] First Contentful Paint < 2s on simulated 3G
- [ ] Time to Interactive < 5s on simulated 3G
- [ ] Initial page load < 500 KB
- [ ] No layout shifts (CLS < 0.1)

### Security

- [ ] HSTS header present and correct
- [ ] All security headers verified (see Section 6.3)
- [ ] No secrets exposed in client-side code
- [ ] Admin routes protected
- [ ] SQL injection testing passed
- [ ] XSS testing passed
- [ ] Rate limiting prevents abuse
- [ ] CORS allows only expected origins

### Content & AI

- [ ] Initial knowledge base loaded (E-passport, NID, Land/Tax)
- [ ] AI responses verified for accuracy on test queries
- [ ] Source citations displaying correctly
- [ ] Bangla, Banglish, and English queries working
- [ ] Fallback responses for unknown queries are helpful
- [ ] Offensive content filtering active
- [ ] Cost monitoring alerts configured

### Monitoring

- [ ] Uptime monitoring active
- [ ] Error tracking active
- [ ] Performance monitoring active
- [ ] Database monitoring active
- [ ] AI cost monitoring active
- [ ] Alert channels tested (Discord, email)
- [ ] Status page set up

### Documentation

- [ ] README.md is current
- [ ] API documentation complete
- [ ] Deployment guide reviewed (this document)
- [ ] Incident response procedure documented
- [ ] Rollback procedure tested

### CI/CD

- [ ] CI pipeline green on `main`
- [ ] Production environment protection rules configured
- [ ] Rollback procedure tested on staging
- [ ] Preview deployments working on PRs

---

## 11. Go/No-Go Criteria

Production launch requires **all** of the following criteria to be met:

### Must-Have (Launch Blockers)

| # | Criterion | Verification Method |
|---|---|---|
| 1 | Core Q&A works in Bangla, Banglish, and English | Manual testing with 50+ test queries |
| 2 | AI responses include source citations | Automated test suite |
| 3 | First Contentful Paint < 2s on 3G | Lighthouse CI report |
| 4 | Initial page load < 500 KB | Bundle analysis |
| 5 | No critical or high-severity bugs open | Issue tracker |
| 6 | Database backups verified | Restore test on staging |
| 7 | Rollback procedure tested | Simulated rollback on staging |
| 8 | Error tracking operational | Sentry test event received |
| 9 | Rate limiting active | Load test results |
| 10 | HTTPS enforced with HSTS | SSL Labs A+ rating |
| 11 | Privacy policy published | Legal review |
| 12 | Initial knowledge base loaded and verified | Content audit report |

### Should-Have (Defer if Necessary)

| # | Criterion | Notes |
|---|---|---|
| 1 | Lighthouse Performance score ≥ 90 | Target, but 80+ acceptable for launch |
| 2 | Multi-turn conversation support | Single-turn Q&A is minimum viable |
| 3 | Admin dashboard fully functional | CLI-based admin is acceptable for launch |
| 4 | Automated integration tests > 80% coverage | Manual testing acceptable for launch |

### Decision

The **go/no-go decision** is made by the project owner after reviewing all criteria. If any must-have criterion is not met, the launch is postponed until it is resolved. Should-have criteria that are not met are documented as known limitations in the launch announcement.

---

> [!NOTE]
> This document should be reviewed and updated before every production deployment. Changes to the deployment architecture, infrastructure providers, or operational procedures must be reflected here.
