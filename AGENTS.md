<![CDATA[# AGENTS.md — AI Agent Instructions for Ask Bangladesh

> This file provides context and conventions for AI coding agents (Codex, Copilot, Cursor, etc.)
> working on the **Ask Bangladesh** codebase. Read this file before making any changes.

---

## Project Overview

**Ask Bangladesh** is an AI-powered platform that helps Bangladeshi citizens discover and navigate government services. Users ask questions in Bangla, Banglish (romanized Bangla), or English, and the system returns grounded, cited answers using Retrieval-Augmented Generation (RAG).

This is an **independent open-source project** — it is NOT affiliated with the Bangladesh government.

### Core Principles

1. **Accuracy over speed** — Never fabricate government information. Every factual claim must trace back to an ingested source document.
2. **Bangla-first** — The primary audience speaks Bangla. UI strings, error messages, and AI responses should prioritize Bangla and Banglish users.
3. **Mobile-first** — Target device is a low-end Android phone on a 3G connection. Performance budgets are strict.
4. **Privacy by default** — Collect minimal data. No tracking without explicit opt-in.
5. **Simplicity** — Prefer clear, maintainable code over clever abstractions.

---

## Repository Structure

```
ask-bangladesh/
├── src/                        # Next.js application source
│   ├── app/                    # App Router: pages, layouts, API routes
│   │   ├── (chat)/             # Chat interface route group
│   │   ├── api/                # API route handlers
│   │   │   ├── chat/           # Chat completion endpoint
│   │   │   ├── search/         # Document search endpoint
│   │   │   └── feedback/       # User feedback endpoint
│   │   ├── layout.tsx          # Root layout (global providers, fonts, metadata)
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   ├── ui/                 # shadcn/ui primitives (Button, Input, Card, etc.)
│   │   └── chat/               # Domain-specific chat components
│   ├── lib/
│   │   ├── ai/                 # LLM client, prompt templates, RAG retrieval
│   │   ├── db/                 # Drizzle schema, client, queries
│   │   ├── services/           # Business logic layer
│   │   ├── utils/              # Pure utility functions
│   │   └── validators/         # Zod schemas for request/response validation
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # Shared TypeScript type definitions
│   └── config/                 # App-wide configuration constants
├── ingestion/                  # Python data ingestion pipeline
│   ├── scrapers/               # Source-specific web scrapers
│   ├── parsers/                # Document parsing (PDF, HTML → text)
│   ├── chunkers/               # Text splitting and chunking strategies
│   ├── embedders/              # Embedding generation (OpenAI, local)
│   ├── loaders/                # Database bulk loaders
│   ├── pipeline.py             # Main pipeline orchestrator
│   ├── requirements.txt        # Python dependencies
│   └── tests/                  # Pytest tests for the pipeline
├── drizzle/
│   └── migrations/             # Generated SQL migration files
├── public/                     # Static assets served at /
├── tests/
│   ├── unit/                   # Vitest unit tests (mirrors src/ structure)
│   ├── e2e/                    # Playwright end-to-end tests
│   └── fixtures/               # Shared test data and mocks
├── docs/                       # Extended documentation
├── .env.example                # Environment variable template
├── .gitignore
├── drizzle.config.ts
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
├── package.json
└── pnpm-lock.yaml
```

---

## Technology Stack

| Technology | Version | Notes |
|---|---|---|
| **Next.js** | 14.x+ | App Router only. No Pages Router. |
| **React** | 18.x+ | Server Components by default. |
| **TypeScript** | 5.x+ | Strict mode enabled. |
| **Node.js** | 20.x+ | LTS only. |
| **pnpm** | 9.x+ | Required package manager. Do not use npm or yarn. |
| **Tailwind CSS** | 3.4+ | Utility-first styling. |
| **shadcn/ui** | latest | Copy-paste component library (not a dependency). |
| **PostgreSQL** | 16.x+ | Primary database. |
| **pgvector** | 0.7+ | Vector similarity search extension. |
| **Drizzle ORM** | latest | Type-safe SQL query builder and schema management. |
| **Zod** | 3.x+ | Runtime schema validation. |
| **Vercel AI SDK** | 3.x+ | Streaming AI responses. |
| **Python** | 3.11+ | Ingestion pipeline only. |

---

## Coding Conventions

### TypeScript

- **Strict mode is mandatory.** The `tsconfig.json` has `"strict": true`. Do not weaken it.
- Use `type` for object shapes. Use `interface` only when declaration merging is needed.
- Prefer `const` over `let`. Never use `var`.
- Use explicit return types on all exported functions and public API boundaries.
- Avoid `any`. Use `unknown` and narrow with type guards when the type is truly unknown.
- Use `as const` for literal constant objects and arrays.
- Prefer discriminated unions over boolean flags for state modeling.

### React / Next.js

- **Server Components are the default.** Only add `"use client"` when the component genuinely needs browser APIs, event handlers, or React state/effects.
- Colocate related files: a page's components, utils, and types should live near the page.
- Use Next.js `<Image>` for all images. Do not use raw `<img>` tags.
- Use Next.js `<Link>` for all internal navigation.
- Data fetching should happen in Server Components or Route Handlers. Do not use `useEffect` for data fetching.
- Prefer Server Actions for mutations when appropriate.
- All pages must export proper `metadata` or `generateMetadata` for SEO.

### Styling

- Use **Tailwind CSS** utility classes exclusively. Do not write custom CSS unless absolutely necessary (e.g., complex animations).
- Follow **mobile-first** responsive design: start with the smallest screen and use `sm:`, `md:`, `lg:` breakpoints to scale up.
- Use the design system tokens defined in `tailwind.config.ts` for colors, spacing, and typography.
- Use `cn()` (clsx + tailwind-merge) for conditional class composition.
- shadcn/ui components live in `src/components/ui/` and can be customized freely since they are owned source code.

### Validation

- Use **Zod** for all external input validation: API request bodies, query parameters, form submissions, environment variables.
- Define Zod schemas in `src/lib/validators/` and derive TypeScript types from them using `z.infer<>`.
- Validate at the boundary (API route handlers, Server Actions) — not deep inside business logic.

### Error Handling

- Use custom error classes extending `Error` for domain-specific errors.
- API routes must return structured JSON error responses with appropriate HTTP status codes.
- Never expose internal error details (stack traces, SQL queries) in production responses.
- Log errors with sufficient context for debugging (request ID, user action, relevant IDs).

---

## File Naming Conventions

| Type | Convention | Example |
|---|---|---|
| React components | `kebab-case.tsx` | `chat-input.tsx` |
| Utility modules | `kebab-case.ts` | `format-date.ts` |
| Type definition files | `kebab-case.ts` | `chat-types.ts` |
| Zod validators | `kebab-case.ts` | `chat-schema.ts` |
| Test files | `*.test.ts` or `*.test.tsx` | `chat-input.test.tsx` |
| E2E test files | `*.spec.ts` | `chat.spec.ts` |
| Python files | `snake_case.py` | `chunk_text.py` |
| Python test files | `test_*.py` | `test_chunk_text.py` |
| Migration files | Auto-generated by Drizzle | `0001_initial_schema.sql` |
| Constants / config | `kebab-case.ts` | `site-config.ts` |

### Directory Conventions

- Directories use `kebab-case`.
- Each directory should have a clear, single responsibility.
- Use barrel exports (`index.ts`) sparingly — only for public module APIs with more than 3 exports.

---

## Import Conventions

### Import Order (enforced by ESLint)

1. **Node built-ins** — `import { readFile } from "node:fs/promises"`
2. **External packages** — `import { z } from "zod"`
3. **Internal aliases** — `import { db } from "@/lib/db"`
4. **Relative imports** — `import { ChatBubble } from "./chat-bubble"`

### Path Aliases

- `@/` maps to `src/`. Always use `@/` for imports from `src/`.
- Never use relative imports that traverse more than one directory up (`../../`). Use `@/` instead.

```typescript
// ✅ Correct
import { searchDocuments } from "@/lib/ai/retrieval";
import { ChatInput } from "./chat-input";

// ❌ Wrong
import { searchDocuments } from "../../lib/ai/retrieval";
```

---

## Testing Requirements

### General Rules

- All new features must include tests. Bug fixes must include a regression test.
- Test files are colocated with source code or placed in the `tests/` directory mirroring the source structure.
- Aim for **meaningful coverage**, not 100% line coverage. Test behavior, not implementation.
- Mock external services (LLM APIs, database) in unit tests. Use real dependencies in e2e tests.

### Unit Tests (Vitest)

- File pattern: `*.test.ts` or `*.test.tsx`
- Test pure functions, utility modules, validators, and React component rendering.
- Use `describe` / `it` blocks with descriptive names.
- Prefer `vi.fn()` and `vi.mock()` for mocking.

```typescript
// ✅ Good test name
it("returns formatted Bangla date when locale is bn-BD", () => { ... });

// ❌ Bad test name
it("works", () => { ... });
```

### End-to-End Tests (Playwright)

- File pattern: `*.spec.ts`
- Test critical user flows: asking a question, receiving a response, viewing citations, switching language.
- Use Page Object Model (POM) for reusable page interactions.
- Tests must be independent and not rely on execution order.

### Python Tests (Pytest)

- File pattern: `test_*.py`
- Test chunking logic, embedding generation, parser output, and pipeline orchestration.
- Use `pytest-mock` for mocking external calls.
- Use `pytest-cov` for coverage reporting.

---

## Security Rules

> [!CAUTION]
> Violating these rules is a blocking issue in code review.

1. **Never hardcode secrets, API keys, or credentials.** Always use environment variables.
2. **Validate all external input** at API boundaries using Zod schemas. Reject malformed input with a `400` response.
3. **Sanitize all output** rendered in the browser. Use React's built-in XSS protections. Never use `dangerouslySetInnerHTML` unless absolutely necessary and with a sanitizer.
4. **Use parameterized queries.** Drizzle ORM handles this, but if you ever write raw SQL, always use parameterized queries. Never concatenate user input into SQL strings.
5. **Apply rate limiting** to all public API endpoints.
6. **Do not log sensitive data.** Never log API keys, user PII, full request bodies with sensitive fields, or database credentials.
7. **Use HTTPS everywhere.** All external API calls must use HTTPS.
8. **Set appropriate CORS headers.** API routes should only accept requests from the application's own origin in production.
9. **Keep dependencies up to date.** Address `npm audit` and `pip audit` warnings promptly.
10. **Content Security Policy (CSP)** headers must be configured in `next.config.mjs`.

---

## Git Conventions

### Branching

- `main` — production-ready code. Protected branch.
- `dev` — integration branch for features.
- `feat/<name>` — feature branches.
- `fix/<name>` — bug fix branches.
- `docs/<name>` — documentation-only changes.
- `chore/<name>` — tooling, config, dependency updates.

### Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`

**Scope:** optional, describes the area of change (e.g., `chat`, `db`, `ingestion`, `auth`)

```bash
# ✅ Good
feat(chat): add message streaming with Vercel AI SDK
fix(search): handle empty query parameter gracefully
docs: update environment variables in README
chore: upgrade next to 14.2.0

# ❌ Bad
updated stuff
fix bug
WIP
```

### Pull Requests

- One logical change per PR.
- PR title follows conventional commit format.
- PR description explains the **what** and **why**, not just the **how**.
- All CI checks must pass before merge.
- Squash merge to `main` for a clean history.

### Rules

- **Never force push** to `main` or `dev`.
- **Never commit** `.env`, `.env.local`, or any file containing secrets.
- **Never commit** `node_modules/`, `.next/`, `__pycache__/`, or build artifacts.

---

## Database Conventions

### Schema Management

- Define all schemas in `src/lib/db/schema/` using Drizzle ORM's TypeScript schema definition.
- Generate migrations with `pnpm db:generate` — never write migration SQL by hand unless fixing a migration issue.
- Migration files are version-controlled and must never be modified after being applied to any environment.
- Use meaningful table and column names in `snake_case` (PostgreSQL convention).

### Query Patterns

- All database queries go through Drizzle ORM. No raw SQL in application code.
- Complex queries that cannot be expressed via Drizzle should be encapsulated in database functions or views and called through Drizzle.
- Wrap multi-step mutations in transactions using `db.transaction()`.
- Always index columns used in `WHERE`, `JOIN`, and `ORDER BY` clauses.

### Vector Search

- Embeddings are stored in `vector(1536)` columns (for `text-embedding-3-small`) or the appropriate dimension for the configured model.
- Use `cosine` distance for similarity search by default.
- Always apply a similarity threshold (e.g., `distance < 0.8`) to filter out irrelevant results.
- Limit the number of retrieved documents (default: 5) to control prompt token usage.

---

## AI / LLM Conventions

> [!IMPORTANT]
> These rules are critical to the project's mission of providing accurate government information.

### Response Generation

1. **Never fabricate government information.** If the retrieved documents do not contain relevant information, the AI must explicitly say it does not have the answer — not guess.
2. **Always cite sources.** Every factual statement in an AI response must reference the source document it was retrieved from, including the document title and URL when available.
3. **Use the RAG pipeline.** All user-facing AI responses must be generated using the retrieval-augmented generation pipeline. Do not rely solely on the LLM's parametric knowledge for government-related facts.
4. **Prompt templates are version-controlled.** System prompts and prompt templates live in `src/lib/ai/prompts/` and must go through code review.
5. **Keep LLM temperature low** for factual responses (default: 0.3). Higher temperatures are only acceptable for conversational scaffolding, not factual content.
6. **Respect token budgets.** Retrieved context should be trimmed to fit within model context windows. Monitor and log token usage.
7. **Handle LLM errors gracefully.** If the LLM API is unavailable, return a user-friendly message in Bangla — never a raw error.

### Ingestion Pipeline

- New data sources require a documented scraper in `ingestion/scrapers/` with clear attribution.
- All ingested content must include metadata: source URL, title, last updated date, government department.
- Chunk sizes and overlap settings are tunable via environment variables.
- Re-ingestion should be idempotent — running the pipeline twice with the same source should not create duplicate records.

---

## What NOT To Do

> [!WARNING]
> AI agents must follow these rules strictly.

1. **Do NOT delete files or code unrelated to your current task.** If you encounter code that seems wrong but is outside your scope, leave a comment or create an issue — do not modify it.
2. **Do NOT skip writing tests.** Every feature and bug fix must have corresponding tests.
3. **Do NOT deploy without approval.** Production deployments require a reviewed and approved pull request.
4. **Do NOT modify migration files** that have already been applied to any environment.
5. **Do NOT install new dependencies** without justification. Prefer the existing stack. If a new dependency is genuinely needed, explain why in the PR description.
6. **Do NOT use `npm` or `yarn`.** This project uses `pnpm` exclusively.
7. **Do NOT weaken TypeScript strict mode.** Do not add `@ts-ignore`, `@ts-expect-error`, or `any` without a clear justification comment.
8. **Do NOT commit large binary files** (images, PDFs, datasets) to the repository. Use external storage or Git LFS.
9. **Do NOT add console.log for debugging.** Use the project's structured logger. Remove all debug logging before committing.
10. **Do NOT make changes to `.env.example`** without updating the README's environment variables section.
11. **Do NOT bypass validation.** All external inputs must pass through Zod schemas.
12. **Do NOT hardcode Bangla text** in components. Use a localization system or constants file so translations can be managed centrally.

---

## Performance Budgets

These targets ensure the platform works on low-end devices with slow connections:

| Metric | Target |
|---|---|
| First Contentful Paint (FCP) | < 1.5s on 3G |
| Largest Contentful Paint (LCP) | < 2.5s on 3G |
| Total Blocking Time (TBT) | < 200ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Initial JS bundle (compressed) | < 100 KB |
| API response (p95) | < 500ms (excluding LLM streaming) |

---

## Getting Help

- **Architecture questions:** See `docs/architecture.md`
- **API reference:** See `docs/api-reference.md`
- **Environment setup issues:** See the Getting Started section of `README.md`
- **Open issues:** Check the GitHub Issues tab before starting new work
]]>
