<![CDATA[<!-- markdownlint-disable MD033 MD041 -->
<p align="center">
  <img src="docs/assets/logo.png" alt="Ask Bangladesh Logo" width="120" />
</p>

<h1 align="center">Ask Bangladesh</h1>

<p align="center">
  <strong>The easiest way for Bangladeshis to understand and navigate government services.</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#environment-variables">Environment Variables</a> •
  <a href="#testing">Testing</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <!-- CI/CD -->
  <img src="https://img.shields.io/github/actions/workflow/status/AskBangladesh/ask-bangladesh/ci.yml?branch=main&label=CI&style=flat-square" alt="CI Status" />
  <!-- Coverage -->
  <img src="https://img.shields.io/codecov/c/github/AskBangladesh/ask-bangladesh?style=flat-square&label=Coverage" alt="Coverage" />
  <!-- License -->
  <img src="https://img.shields.io/github/license/AskBangladesh/ask-bangladesh?style=flat-square" alt="License" />
  <!-- Version -->
  <img src="https://img.shields.io/github/package-json/v/AskBangladesh/ask-bangladesh?style=flat-square&label=Version" alt="Version" />
</p>

---

## What Is Ask Bangladesh?

**Ask Bangladesh** is an AI-powered platform that helps Bangladeshi citizens discover, understand, and navigate government services — in plain language. Whether you need to renew your passport, register a birth certificate, apply for a trade license, or understand your tax obligations, Ask Bangladesh translates dense bureaucratic processes into simple, step-by-step guidance.

The platform uses **Retrieval-Augmented Generation (RAG)** to ground every answer in official government sources, ensuring accuracy and trustworthiness. Users can ask questions in **Bangla** (বাংলা), **Banglish** (romanized Bangla), or **English** — and receive clear, actionable answers with citations pointing back to the original government documents.

> [!IMPORTANT]
> **Ask Bangladesh is an independent, community-driven project.** It is **not** affiliated with, endorsed by, or operated by the Government of the People's Republic of Bangladesh or any of its agencies. All information is sourced from publicly available government documents and websites.

---

## Features

### 🗣️ Multilingual Conversational Interface
- Ask questions in **Bangla**, **Banglish**, or **English**
- Automatic language detection and contextual responses
- Natural, conversational tone that avoids bureaucratic jargon

### 🔍 RAG-Grounded Answers
- Every response is backed by retrieved official government documents
- No hallucinated or fabricated government information
- Transparent source citations with direct links to official pages

### 📋 Step-by-Step Service Guides
- Clear, numbered instructions for completing government procedures
- Required document checklists
- Fee breakdowns and estimated timelines
- Nearest office locations and contact details (where available)

### 🔒 Privacy-First Design
- No user accounts required for basic usage
- Minimal data collection — conversations are not stored by default
- No tracking, no ads, no third-party analytics by default
- Transparent data handling policies

### 📱 Mobile-First & Accessible
- Optimized for low-end Android devices (2GB RAM, small screens)
- Works on slow 2G/3G connections with aggressive caching
- Lightweight page loads (< 100 KB initial JS bundle target)
- WCAG 2.1 AA compliance
- Bangla screen reader compatibility

### 🏛️ Comprehensive Coverage
- National ID (NID) and birth/death registration
- Passport and visa services
- Land and property registration
- Business and trade licensing
- Tax and VAT filing
- Education board services
- Utility connections and bill payments
- Social safety net programs

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | [Next.js 14+](https://nextjs.org/) (App Router), [React 18+](https://react.dev/), [TypeScript 5+](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 3.4+](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) |
| **Database** | [PostgreSQL 16+](https://www.postgresql.org/) with [pgvector](https://github.com/pgvector/pgvector) for semantic search |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) |
| **AI/LLM** | [Vercel AI SDK](https://sdk.vercel.ai/), OpenAI / Anthropic / local models |
| **Ingestion Pipeline** | [Python 3.11+](https://www.python.org/), document parsing, chunking, embedding generation |
| **Validation** | [Zod](https://zod.dev/) for runtime schema validation |
| **Testing** | [Vitest](https://vitest.dev/) (unit), [Playwright](https://playwright.dev/) (e2e), [Pytest](https://pytest.org/) (Python) |
| **Runtime** | [Node.js 20+](https://nodejs.org/) |
| **Package Manager** | [pnpm](https://pnpm.io/) |

---

## Project Structure

```
ask-bangladesh/
├── src/
│   ├── app/                    # Next.js App Router pages and layouts
│   │   ├── (chat)/             # Chat interface routes
│   │   ├── api/                # API routes (search, chat, feedback)
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── ui/                 # shadcn/ui primitives
│   │   └── chat/               # Chat-specific components
│   ├── lib/
│   │   ├── ai/                 # LLM integration, prompt templates, RAG pipeline
│   │   ├── db/                 # Database client, schema, migrations
│   │   ├── services/           # Business logic and service layer
│   │   ├── utils/              # Shared utilities
│   │   └── validators/         # Zod schemas for input validation
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # Shared TypeScript type definitions
│   └── config/                 # App configuration constants
├── ingestion/
│   ├── scrapers/               # Government website scrapers
│   ├── parsers/                # Document parsers (PDF, HTML)
│   ├── chunkers/               # Text chunking strategies
│   ├── embedders/              # Embedding generation
│   ├── loaders/                # Database loaders
│   └── pipeline.py             # Orchestration entry point
├── drizzle/
│   └── migrations/             # SQL migration files
├── public/                     # Static assets
├── tests/
│   ├── unit/                   # Vitest unit tests
│   ├── e2e/                    # Playwright end-to-end tests
│   └── fixtures/               # Shared test data
├── docs/                       # Project documentation
│   ├── architecture.md
│   ├── api-reference.md
│   └── assets/
├── .env.example                # Environment variable template
├── .gitignore
├── AGENTS.md                   # AI agent instructions
├── LICENSE                     # MIT License
├── README.md                   # This file
├── drizzle.config.ts           # Drizzle ORM configuration
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── vitest.config.ts            # Vitest configuration
├── playwright.config.ts        # Playwright configuration
├── package.json
└── pnpm-lock.yaml
```

---

## Getting Started

### Prerequisites

| Tool | Version | Purpose |
|---|---|---|
| **Node.js** | 20.x or later | JavaScript runtime |
| **pnpm** | 9.x or later | Package manager |
| **PostgreSQL** | 16.x or later | Database (with pgvector extension) |
| **Python** | 3.11 or later | Ingestion pipeline |

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AskBangladesh/ask-bangladesh.git
   cd ask-bangladesh
   ```

2. **Install Node.js dependencies**

   ```bash
   pnpm install
   ```

3. **Set up the Python ingestion environment**

   ```bash
   cd ingestion
   python -m venv .venv
   source .venv/bin/activate      # Linux/macOS
   .venv\Scripts\activate         # Windows
   pip install -r requirements.txt
   cd ..
   ```

4. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in the required values — see [Environment Variables](#environment-variables) below.

5. **Set up the database**

   ```bash
   # Ensure PostgreSQL is running and pgvector extension is available
   pnpm db:push       # Apply schema to database
   # OR
   pnpm db:migrate    # Run migrations (production)
   ```

6. **Seed initial data** (optional — runs the ingestion pipeline)

   ```bash
   cd ingestion
   python pipeline.py --source sample
   cd ..
   ```

### Development

```bash
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Useful Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format code with Prettier |
| `pnpm type-check` | Run TypeScript compiler checks |
| `pnpm test` | Run unit tests (Vitest) |
| `pnpm test:e2e` | Run end-to-end tests (Playwright) |
| `pnpm db:generate` | Generate migration files from schema changes |
| `pnpm db:migrate` | Apply pending migrations |
| `pnpm db:push` | Push schema directly (development) |
| `pnpm db:studio` | Open Drizzle Studio (database GUI) |

---

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

### Application

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Public URL of the application (e.g., `http://localhost:3000`) | Yes |
| `NODE_ENV` | Environment: `development`, `test`, or `production` | Yes |

### Database

| Variable | Description | Required |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string (e.g., `postgresql://user:pass@localhost:5432/askbd`) | Yes |
| `DATABASE_POOL_MIN` | Minimum connection pool size (default: `2`) | No |
| `DATABASE_POOL_MAX` | Maximum connection pool size (default: `10`) | No |

### AI / LLM

| Variable | Description | Required |
|---|---|---|
| `OPENAI_API_KEY` | OpenAI API key for embeddings and chat completions | Yes* |
| `ANTHROPIC_API_KEY` | Anthropic API key (alternative LLM provider) | No* |
| `AI_PROVIDER` | Active LLM provider: `openai`, `anthropic`, or `local` (default: `openai`) | No |
| `EMBEDDING_MODEL` | Embedding model name (default: `text-embedding-3-small`) | No |
| `CHAT_MODEL` | Chat completion model name (default: `gpt-4o-mini`) | No |
| `AI_TEMPERATURE` | LLM temperature for chat responses (default: `0.3`) | No |
| `AI_MAX_TOKENS` | Maximum tokens in LLM response (default: `1024`) | No |

> \* At least one LLM provider API key is required.

### Ingestion Pipeline (Python)

| Variable | Description | Required |
|---|---|---|
| `INGESTION_DATABASE_URL` | PostgreSQL connection string for the ingestion pipeline | Yes |
| `INGESTION_OPENAI_API_KEY` | OpenAI API key for generating embeddings during ingestion | Yes |
| `INGESTION_CHUNK_SIZE` | Target chunk size in tokens (default: `512`) | No |
| `INGESTION_CHUNK_OVERLAP` | Overlap between chunks in tokens (default: `64`) | No |

### Rate Limiting

| Variable | Description | Required |
|---|---|---|
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in milliseconds (default: `60000`) | No |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window (default: `20`) | No |

### Analytics (optional)

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_ANALYTICS_ID` | Privacy-respecting analytics ID (e.g., Plausible, Umami) | No |

---

## Testing

### Unit Tests (Vitest)

```bash
# Run all unit tests
pnpm test

# Run in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

### End-to-End Tests (Playwright)

```bash
# Install Playwright browsers (first time only)
pnpm exec playwright install

# Run e2e tests
pnpm test:e2e

# Run e2e tests with UI
pnpm test:e2e --ui

# Run a specific test file
pnpm test:e2e tests/e2e/chat.spec.ts
```

### Python Tests (Pytest)

```bash
cd ingestion
source .venv/bin/activate
pytest
pytest --cov=. --cov-report=html    # with coverage
```

---

## Deployment

### Production Build

```bash
pnpm build
pnpm start
```

### Docker

```bash
docker compose up --build
```

### Recommended Hosting

| Component | Recommended Platform |
|---|---|
| **Next.js App** | [Vercel](https://vercel.com/), [Railway](https://railway.app/), or self-hosted with Docker |
| **PostgreSQL + pgvector** | [Supabase](https://supabase.com/), [Neon](https://neon.tech/), or self-hosted |
| **Ingestion Pipeline** | Scheduled via cron job, GitHub Actions, or a task runner |

### Pre-Deployment Checklist

- [ ] All environment variables set in production environment
- [ ] Database migrations applied (`pnpm db:migrate`)
- [ ] Initial data ingested via the Python pipeline
- [ ] SSL/TLS configured for all endpoints
- [ ] Rate limiting enabled
- [ ] Error monitoring connected (e.g., Sentry)
- [ ] Performance monitoring enabled
- [ ] CI/CD pipeline passing (lint, type-check, test)

---

## Contributing

We welcome contributions! Please read our contributing guidelines before submitting a pull request.

### Quick Start

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes following the conventions in [AGENTS.md](AGENTS.md)
4. Write or update tests for your changes
5. Ensure all checks pass: `pnpm lint && pnpm type-check && pnpm test`
6. Commit with a conventional commit message: `git commit -m "feat: add passport renewal guide"`
7. Push and open a pull request

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: correct a bug
docs: update documentation
style: formatting, no logic change
refactor: restructure without behavior change
test: add or update tests
chore: tooling, dependencies, config
perf: performance improvement
ci: CI/CD pipeline changes
```

### Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating, you agree to uphold a welcoming, inclusive, and respectful environment.

---

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## Disclaimer

> [!CAUTION]
> **Ask Bangladesh is an independent, community-driven open-source project.** It is **not** affiliated with, endorsed by, sponsored by, or officially connected to the Government of the People's Republic of Bangladesh or any of its ministries, departments, or agencies.
>
> The information provided by this platform is sourced from **publicly available government documents and websites** and is intended for general informational purposes only. It does **not** constitute legal, financial, or professional advice. Government policies, fees, and procedures change frequently — always verify critical information directly with the relevant government office or official website before taking action.
>
> The maintainers of this project make **no warranties** regarding the accuracy, completeness, or timeliness of the information provided.

---

<p align="center">
  Built with ❤️ for Bangladesh
</p>
]]>
