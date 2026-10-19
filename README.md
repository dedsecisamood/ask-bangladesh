<div align="center">

# Ask Bangladesh

### Government services, made simpler.

**An independent AI-powered platform in development to help Bangladeshis find, understand, and navigate government services with confidence.**

![Status](https://img.shields.io/badge/Status-In%20Development-F59E0B?style=flat-square)
![Focus](https://img.shields.io/badge/Focus-Bangladesh-006A4E?style=flat-square)
![Languages](https://img.shields.io/badge/Planned%20Languages-Bangla%20%7C%20Banglish%20%7C%20English-2563EB?style=flat-square)

**[Our Vision](#our-vision) · [How It Will Work](#how-it-will-work) · [Core Capabilities](#core-capabilities) · [Roadmap](#development-roadmap) · [Get Started](#getting-started)**

</div>

> **Development notice:** Ask Bangladesh is an evolving project. This README describes the product vision and planned capabilities, not a guarantee that every feature is available in the current codebase.
>
> **Independent project:** Ask Bangladesh is **not a Government of Bangladesh website** and is not affiliated with or endorsed by any government agency. Users should confirm important requirements, fees, and deadlines through the linked official sources.

## Our Vision

Government information should be easy to find, easy to understand, and accessible to everyone.

Yet finding the right government service can mean searching across different websites, learning unfamiliar terms, and reading complicated instructions. **Ask Bangladesh aims to make that journey simpler.**

Our goal is to build one clear, trustworthy place where people can ask a question in everyday language, discover the right service, understand the next steps, and reach the original government source.

**Less searching. Less confusion. More clarity.**

## Built for the People of Bangladesh

Ask Bangladesh is being designed for people across Bangladesh and Bangladeshis living abroad—including students, parents, job seekers, landowners, entrepreneurs, older adults, and first-time internet users.

The planned experience is:

- **Multilingual:** Ask in **বাংলা**, **Banglish** (Bangla written in English letters), or **English**.
- **Easy to use:** Clear explanations instead of complicated government language.
- **Source-aware:** Direct links to relevant official pages, with verification details where available.
- **Mobile-first:** Designed with smaller screens, slower connections, and low-end devices in mind.
- **Accessible:** Built toward inclusive navigation and readable, understandable content.
- **Privacy-conscious:** Basic information discovery is intended to work without mandatory registration.


## How It Will Work

The planned Ask Bangladesh experience follows a simple path:

1. **Ask** — Describe a government-service question in Bangla, Banglish, or English.
2. **Find** — Identify the relevant service and search approved official information sources.
3. **Understand** — Receive a clear explanation and step-by-step guidance *only when supported by evidence*.
4. **Verify** — Review direct source links and available verification details.
5. **Continue** — Go to the appropriate official government service to take action.

**A trustworthy “I couldn't verify that” is better than a confident wrong answer.** The system is being designed to show uncertainty instead of inventing procedures, fees, deadlines, or requirements.

## Core Capabilities

The long-term product plan brings together several connected parts:

| Area | What we're building |
| --- | --- |
| **Government service directory** | Browse services by topic, agency, and category, even without using AI. |
| **AI assistant** | Ask natural-language questions and receive explanations grounded in retrieved evidence. |
| **Official-source references** | Link to relevant government pages and show source context and verification information. |
| **Service guides** | Make supported processes easier to follow with clear, practical steps. |
| **Multilingual experience** | Support Bangla, Banglish spelling variations, and English. |
| **Feedback and corrections** | Give users a way to flag confusing, outdated, or inaccurate information. |
| **Administrative tools** | Review sources, manage content, monitor freshness, and maintain quality. |

These are **planned capabilities**. Their availability depends on implementation, testing, and release approval.

### Initial Service Focus

The first reliable information coverage is planned around three areas:

1. **E-passport services**
2. **National Identity Card (NID) services**
3. **Land services and land development tax**

The broader vision includes birth registration, driving licences, education, taxation, jobs, social welfare, healthcare, business registration, and other public services. **A category will not be presented as fully supported before its sources and guidance are verified.**

## Trust Is a Product Requirement

People may use this information to make important decisions. That makes accuracy, safety, and transparency essential—not optional.

Ask Bangladesh is being developed around these principles:

- **Official sources first.** Important government-service claims should be supported by relevant official evidence.
- **Clear citations.** A useful answer should point to the specific source, not just an agency's homepage.
- **No guessing.** Missing, outdated, or conflicting information should be acknowledged.
- **Responsible data handling.** Minimize personal information and avoid asking for sensitive ID or passport numbers when unnecessary.
- **Secure by design.** Treat retrieved content as untrusted data and protect against abuse, data leaks, and prompt injection.
- **Respect for government systems.** Do not bypass authentication, CAPTCHAs, or access restrictions, or submit transactions without authorization.

Ask Bangladesh is an **information and guidance project**, not a replacement for an official government portal.

## Technology Direction

The project plan uses a modern, maintainable architecture. The exact tools in use should always be confirmed against the repository's code and configuration.

| Layer | Planned technologies and approach |
| --- | --- |
| **Web application** | Next.js, React, TypeScript, Tailwind CSS, shadcn/ui |
| **API and validation** | Next.js Route Handlers, TypeScript, Zod |
| **Data storage** | PostgreSQL, with pgvector for vector search where appropriate |
| **Information processing** | Python, HTML/PDF extraction, controlled ingestion, document versioning |
| **AI and search** | Retrieval-augmented generation (RAG), multilingual embeddings, keyword + semantic search, reranking |
| **Quality assurance** | Unit, integration, end-to-end, security, accessibility, and multilingual evaluation |
| **Deployment** | A managed hosting and database setup with monitoring, backups, and secure configuration |

The architecture is designed to grow in stages instead of introducing unnecessary complexity early.

## Development Roadmap

Ask Bangladesh follows a phased plan, with progress determined by **verified outcomes**, not just completed tasks.

| Stage | Phases | Focus |
| --- | --- | --- |
| **1. Build the foundation** | 0–2 | Architecture, project setup, and accessible public interface |
| **2. Organize trusted information** | 3–6 | Database, service directory, controlled ingestion, and search |
| **3. Deliver useful answers** | 7–8 | Source-grounded AI guidance and multilingual support |
| **4. Prepare for public use** | 9–12 | Admin operations, security, testing, public beta, and deployment |

**Longer-term possibilities:** voice assistance, regional guidance, document help, and authorized government integrations. These are future ideas—not available features or announced partnerships.

> **Current progress:** The development roadmap is defined, but the latest completed phase and feature status are not established by this README. Check the repository's code, issues, and development records for verified progress.

## Getting Started

To explore the code locally, clone the repository:

```bash
git clone https://github.com/dedsecisamood/ask-bangladesh.git
cd ask-bangladesh
```

If the checked-in project uses **npm** and provides a `dev` script, the usual Next.js workflow is:

```bash
npm install
npm run dev
```

Then open **http://localhost:3000** in your browser.

**Before running:** Check `package.json`, the repository's lockfile, and any existing setup documentation. Use the package manager and environment configuration actually defined in the project. Some services may require additional configuration; never commit `.env` files, API keys, or credentials.

## Contributing and Feedback

Ask Bangladesh is being developed as an independent project. Thoughtful feedback is welcome—especially from people familiar with Bangladesh's public services, Bangla accessibility, and citizen-facing technology.

If you notice an issue or have a suggestion, [open a GitHub issue](https://github.com/dedsecisamood/ask-bangladesh/issues). For government-service information, please include the relevant **official source URL** so it can be reviewed.

For substantial code contributions, start with an issue to discuss the scope before opening a pull request.

## Project Maintainer

Created and maintained by **[@dedsecisamood](https://github.com/dedsecisamood)**.

## License

A software license has not been confirmed for this repository. Until a license is published, please do not assume permission to reuse or redistribute the source code.

---

<div align="center">

### 🇧🇩 A simpler way to understand public services.

**Built for Bangladesh. Guided by evidence. Designed for people.**

</div>
