# Production Deployment & Operational Release Checklist

## 1. Environment & Infrastructure
- [x] Next.js 14+ App Router with strict TypeScript (`tsconfig.json`)
- [x] Responsive, mobile-first Tailwind design system with Bangladesh Green branding tokens
- [x] PostgreSQL schema with `pgvector(1536)` for semantic document passages
- [x] Drizzle ORM migrations configured and tested
- [x] GitHub Actions automated CI/CD pipeline (`.github/workflows/ci.yml`)

## 2. Security & Compliance
- [x] Zero-PII Policy: Automated redaction for NID, Passport, and Phone numbers (`SecurityGuard`)
- [x] Anti-SSRF crawler guard restricting fetches exclusively to verified `.gov.bd` domains
- [x] Prompt injection defenses and system prompt boundary protections
- [x] Strict security headers configured in `next.config.mjs` (CSP, X-Frame-Options, HSTS, etc.)
- [x] No secrets committed to git (`.gitignore` + `.env.example`)

## 3. Grounded AI & Multilingual Support
- [x] Retrieval-Augmented Generation (RAG) engine grounded in verified official sources
- [x] Banglish phonetic normalization dictionary for colloquial queries
- [x] Safe refusal & abstention when official evidence is not present in the knowledge base
- [x] Every material claim accompanied by agency title, verified timestamp, and direct `.gov.bd` link

## 4. Operational Monitoring
- [x] Live admin observability dashboard (`/admin`)
- [x] Crawler politeness delay controls (rate limiting)
- [x] Feedback & correction reporting interface (`/feedback`)
- [x] Status monitoring indicators
