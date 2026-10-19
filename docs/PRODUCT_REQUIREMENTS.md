# Product Requirements Document — Ask Bangladesh

> **Version:** 1.0.0  
> **Last Updated:** 2025-07-15  
> **Status:** Draft  
> **Owner:** Core Team

---

## Table of Contents

- [1. Product Vision & Mission](#1-product-vision--mission)
- [2. Target Users](#2-target-users)
- [3. Functional Requirements](#3-functional-requirements)
- [4. Non-Functional Requirements](#4-non-functional-requirements)
- [5. Content Requirements](#5-content-requirements)
- [6. Initial Scope](#6-initial-scope)
- [7. Success Metrics](#7-success-metrics)
- [8. Out of Scope for V1](#8-out-of-scope-for-v1)

---

## 1. Product Vision & Mission

### Vision

A Bangladesh where every citizen can easily discover, understand, and navigate government services — regardless of their language, location, device, or digital literacy.

### Mission

Ask Bangladesh is an AI-powered platform that makes government services accessible and understandable for all Bangladeshis. We translate the complexity of government bureaucracy into simple, step-by-step guidance in the language people actually speak — Bangla, Banglish, or English.

### Core Principles

| Principle | Description |
|---|---|
| **Bangla-first** | The primary interface and experience is designed for Bangla speakers. English and Banglish are equally supported, but Bangla is never an afterthought. |
| **Grounded in truth** | Every answer is sourced from official government publications. The system never fabricates procedures, fees, or requirements. |
| **Accessible to all** | Designed for low-end Android phones on slow 3G connections. Works for elderly citizens with limited digital literacy. |
| **Independent & transparent** | Not a government project. Clearly communicated as an independent tool. Sources are always cited so users can verify information. |
| **Privacy-respecting** | No mandatory registration. Minimal data collection. No personal document storage. No tracking beyond essential analytics. |

> [!IMPORTANT]
> Ask Bangladesh is **NOT** affiliated with, endorsed by, or operated by the Government of Bangladesh. This must be prominently displayed on every page.

---

## 2. Target Users

### Persona 1: Rural Citizen — Rina

| Attribute | Detail |
|---|---|
| **Age** | 35 |
| **Location** | Bogura district, rural area |
| **Language** | Bangla only |
| **Device** | Low-end Android phone (Samsung Galaxy A03), shared with family |
| **Connectivity** | 3G, unstable, data-conscious (prepaid) |
| **Digital literacy** | Basic — can use Facebook Messenger, YouTube |
| **Goals** | Get her child's birth certificate; understand land tax payment process |
| **Pain points** | Cannot read English; government websites are confusing and don't work well on her phone; doesn't know which office to visit or what documents to bring; has been sent away from offices for missing paperwork |
| **Usage pattern** | Occasional, high-intent — uses the tool when she has a specific need |

**Key design implications:**
- UI must be fully functional in Bangla
- Pages must load on 3G within 2 seconds
- Information must be step-by-step with document checklists
- Minimal data usage (< 500 KB initial load)

---

### Persona 2: Urban Professional — Tanvir

| Attribute | Detail |
|---|---|
| **Age** | 28 |
| **Location** | Dhaka city |
| **Language** | Bangla, English, Banglish (prefers Banglish for quick typing) |
| **Device** | Mid-range Android phone (Xiaomi Redmi Note 12), 4G |
| **Digital literacy** | High — uses apps daily, comfortable with technology |
| **Goals** | Renew his e-passport; check driving license requirements |
| **Pain points** | Government websites are outdated and hard to navigate; doesn't want to take time off work to visit offices unnecessarily; wants to know exact requirements before starting any process |
| **Usage pattern** | Quick lookups — wants fast, accurate answers without browsing multiple sites |

**Key design implications:**
- Banglish input must be handled natively (no transliteration required by user)
- Fast response times for AI queries
- Direct links to online application portals where available
- Clean, modern UI that feels trustworthy

---

### Persona 3: Overseas Bangladeshi — Farhana

| Attribute | Detail |
|---|---|
| **Age** | 42 |
| **Location** | London, UK |
| **Language** | English primary, Bangla secondary |
| **Device** | iPhone 14, fast WiFi |
| **Digital literacy** | Very high |
| **Goals** | Understand property registration process in Bangladesh; help parents navigate pension process; renew passport from abroad |
| **Pain points** | Completely unfamiliar with current government processes; cannot visit offices; time zone differences make phone inquiries difficult; information online is fragmented and contradictory |
| **Usage pattern** | Research-oriented — wants comprehensive guides and process overviews; will share information with family members in Bangladesh |

**Key design implications:**
- English-language support must be comprehensive
- Guides should distinguish between in-person and online processes
- Content should note options available from abroad (embassy services, online portals)
- Shareable content (links that work when forwarded)

---

### Persona 4: Student — Rahat

| Attribute | Detail |
|---|---|
| **Age** | 18 |
| **Location** | Chittagong |
| **Language** | Bangla, basic English |
| **Device** | Very low-end Android phone, mostly on WiFi |
| **Digital literacy** | Moderate — comfortable with social media, less with government sites |
| **Goals** | Check HSC exam results; understand university admission process; apply for NID |
| **Pain points** | Education board websites crash during result publication; doesn't understand which documents are needed for NID application; first time navigating government services independently |
| **Usage pattern** | Seasonal spikes around exam results and admission periods; occasional for NID |

**Key design implications:**
- Support for education board result queries (or clear links)
- NID application guide targeted at first-time applicants
- UI must work on very low-end devices
- Handle traffic spikes during result seasons (if relevant)

---

### Persona 5: Small Business Owner — Kamal

| Attribute | Detail |
|---|---|
| **Age** | 45 |
| **Location** | Sylhet |
| **Language** | Bangla, limited English |
| **Device** | Mid-range Android phone |
| **Digital literacy** | Moderate — uses bKash, Facebook for business |
| **Goals** | Register his business (trade license); understand tax obligations; learn about government business support programs |
| **Pain points** | Business registration process is opaque; doesn't know which permits he needs; afraid of making mistakes that could result in fines; has relied on middlemen (dalals) who charge high fees |
| **Usage pattern** | Periodic — during business registration, tax season, or when applying for permits |

**Key design implications:**
- Business service guides must be practical and complete
- Fee schedules with actual amounts (not just "as applicable")
- Clear distinction between national and local government processes
- Information that reduces dependency on middlemen

---

### Persona 6: Elderly Citizen — Rashida Begum

| Attribute | Detail |
|---|---|
| **Age** | 65 |
| **Location** | Rajshahi |
| **Language** | Bangla only |
| **Device** | Basic Android phone (borrowed from grandchild), 2G/3G |
| **Digital literacy** | Very limited — can make phone calls, basic messaging |
| **Goals** | Apply for old age allowance; understand widow pension process |
| **Pain points** | Cannot read small text; unfamiliar with app navigation patterns; intimidated by technology; relies on family members to help |
| **Usage pattern** | Assisted use — a family member typically operates the device on her behalf |

**Key design implications:**
- Large touch targets (minimum 48px)
- Large, readable Bangla text (minimum 16px base)
- Simple navigation — minimal nesting, clear labels
- Information structured for someone reading aloud to another person
- High contrast ratios for readability
- Works on 2G connections (extreme optimization)

---

## 3. Functional Requirements

### FR-001: Natural Language Q&A

| Property | Value |
|---|---|
| **ID** | FR-001 |
| **Priority** | P0 (Must-have) |
| **Description** | Users can ask questions about government services in natural language and receive accurate, sourced answers. |
| **Languages** | Bangla (বাংলা), Banglish (romanized Bangla), English |
| **Input** | Text input via chat interface |
| **Output** | AI-generated response grounded in official government sources |
| **Behavior** | The system detects the input language and responds in the same language. If the question is ambiguous, the system asks a clarifying question. If the answer is not in the knowledge base, the system clearly states it cannot answer rather than guessing. |
| **Acceptance criteria** | 1. User types a question in any supported language 2. System returns a relevant answer within 10 seconds (median) 3. Answer includes source citations 4. System correctly handles Bangla, Banglish, and English inputs |

---

### FR-002: Government Service Directory

| Property | Value |
|---|---|
| **ID** | FR-002 |
| **Priority** | P0 (Must-have) |
| **Description** | A browsable and searchable directory of government services organized by category. |
| **Features** | Category-based browsing (16 categories), full-text search in Bangla and English, filtering by agency, service detail pages |
| **Data** | Service name (Bangla + English), description, responsible agency, required documents, fees, process steps, online portal link (if available), estimated timeline |
| **Acceptance criteria** | 1. User can browse services by category 2. User can search by service name or keyword 3. Service detail pages display complete information 4. Search works in Bangla, Banglish, and English |

---

### FR-003: Agency Directory

| Property | Value |
|---|---|
| **ID** | FR-003 |
| **Priority** | P1 (Should-have) |
| **Description** | A directory of government agencies with contact information and services provided. |
| **Data** | Agency name (Bangla + English), description, website, contact info, services offered, regional offices |
| **Acceptance criteria** | 1. User can browse agencies 2. User can see which services each agency provides 3. Contact information is displayed where available |

---

### FR-004: Step-by-Step Service Guides

| Property | Value |
|---|---|
| **ID** | FR-004 |
| **Priority** | P0 (Must-have) |
| **Description** | Structured, step-by-step guides for completing government service processes. |
| **Content** | Numbered steps, required documents checklist, fees, timelines, tips, common mistakes to avoid, links to online portals |
| **Languages** | Available in Bangla and English |
| **Acceptance criteria** | 1. Guides follow a consistent format 2. Each step is actionable and clear 3. Document checklists are presented as checkable lists 4. Fees include actual amounts where available |

---

### FR-005: Official Source Citations

| Property | Value |
|---|---|
| **ID** | FR-005 |
| **Priority** | P0 (Must-have) |
| **Description** | Every AI-generated answer must include citations linking to the official government sources used. |
| **Format** | Inline citations with numbered references, expandable source details at the bottom of the response |
| **Data per citation** | Source title, URL, government agency, date accessed, date published (if known) |
| **Acceptance criteria** | 1. Every answer includes at least one citation 2. Citations link to real, accessible government URLs 3. Users can click through to verify information 4. If no source is available, the system states this explicitly |

---

### FR-006: Source Verification Metadata

| Property | Value |
|---|---|
| **ID** | FR-006 |
| **Priority** | P1 (Should-have) |
| **Description** | Display metadata about the freshness and reliability of sources used in answers. |
| **Metadata** | Last crawled date, source status (active/stale/unreachable), confidence indicator |
| **Display** | Subtle metadata below source citations; visual indicator (green/yellow/red) for source freshness |
| **Acceptance criteria** | 1. Users can see when the source was last verified 2. Stale sources (> 30 days since last crawl) show a warning 3. Unreachable sources are flagged |

---

### FR-007: Multi-Turn Conversations

| Property | Value |
|---|---|
| **ID** | FR-007 |
| **Priority** | P1 (Should-have) |
| **Description** | Users can have follow-up conversations that reference previous messages in the same session. |
| **Behavior** | The AI maintains context within a session (up to 10 messages). Context is not persisted across browser sessions unless the user is authenticated. |
| **Limits** | Maximum 10 messages per conversation; maximum 5 active conversations per session |
| **Acceptance criteria** | 1. Follow-up questions reference prior context correctly 2. User can start a new conversation to reset context 3. Session context does not leak between users |

---

### FR-008: Feedback & Error Reporting

| Property | Value |
|---|---|
| **ID** | FR-008 |
| **Priority** | P1 (Should-have) |
| **Description** | Users can provide feedback on AI responses and report errors or outdated information. |
| **Mechanisms** | Thumbs up/down on each AI response, "Report incorrect information" button, optional free-text feedback |
| **Data collected** | Rating, feedback text, the query that produced the response, the response itself, timestamp |
| **Privacy** | No PII collected; feedback is anonymous unless user chooses to provide contact info |
| **Acceptance criteria** | 1. Users can rate responses without friction 2. Error reports include the context needed for investigation 3. Feedback is stored and accessible to admins |

---

### FR-009: Admin — Source Management

| Property | Value |
|---|---|
| **ID** | FR-009 |
| **Priority** | P1 (Should-have) |
| **Description** | Admin interface to manage government sources (add, edit, remove, trigger re-crawl). |
| **Features** | CRUD operations on sources, manual crawl trigger, source health status, crawl history |
| **Access** | Protected by authentication; admin role required |
| **Acceptance criteria** | 1. Admin can add a new government source URL 2. Admin can trigger a re-crawl of a specific source 3. Admin can view crawl history and errors for each source |

---

### FR-010: Admin — Document Review

| Property | Value |
|---|---|
| **ID** | FR-010 |
| **Priority** | P2 (Nice-to-have) |
| **Description** | Admin interface to review crawled documents and their processed chunks before they enter the knowledge base. |
| **Features** | Document list with status, chunk preview, approve/reject workflow, edit capability |
| **Acceptance criteria** | 1. Admin can view all crawled documents 2. Admin can preview how a document was chunked 3. Admin can approve or reject documents for the knowledge base |

---

### FR-011: Admin — Crawler Monitoring

| Property | Value |
|---|---|
| **ID** | FR-011 |
| **Priority** | P1 (Should-have) |
| **Description** | Dashboard showing the status of the ingestion pipeline — crawl jobs, success rates, errors. |
| **Features** | Active/completed/failed job list, per-source health, error logs, resource usage |
| **Acceptance criteria** | 1. Admin can see the status of all crawl jobs 2. Failed jobs show error details 3. Source health is visible at a glance |

---

### FR-012: Admin — User Feedback Review

| Property | Value |
|---|---|
| **ID** | FR-012 |
| **Priority** | P2 (Nice-to-have) |
| **Description** | Admin interface to review user feedback and error reports. |
| **Features** | Feedback list with filters (rating, date, query text), bulk actions, feedback-to-source linking |
| **Acceptance criteria** | 1. Admin can view all user feedback 2. Admin can filter by rating type 3. Admin can mark feedback as reviewed/actioned |

---

### FR-013: System Status Page

| Property | Value |
|---|---|
| **ID** | FR-013 |
| **Priority** | P2 (Nice-to-have) |
| **Description** | Public status page showing the operational status of the platform. |
| **Components** | Website status, AI chat status, search status, database status, last updated timestamp |
| **Acceptance criteria** | 1. Status page is publicly accessible 2. Status updates automatically based on health checks 3. Historical uptime is displayed |

---

### FR-014: Mobile-First Responsive Design

| Property | Value |
|---|---|
| **ID** | FR-014 |
| **Priority** | P0 (Must-have) |
| **Description** | The entire application is designed mobile-first and is fully functional on screen widths from 360px to 2560px. |
| **Breakpoints** | 360px (min), 640px (sm), 768px (md), 1024px (lg), 1280px (xl) |
| **Requirements** | Touch-friendly targets (≥ 48px), no horizontal scrolling, readable text without zooming, bottom-anchored chat input on mobile |
| **Acceptance criteria** | 1. All features work on a 360px wide screen 2. No horizontal scrolling on any page 3. Touch targets are ≥ 48px 4. Text is readable without zooming (≥ 16px base for Bangla) |

---

### FR-015: No Mandatory Registration

| Property | Value |
|---|---|
| **ID** | FR-015 |
| **Priority** | P0 (Must-have) |
| **Description** | Users can access all core features (Q&A, service directory, guides) without creating an account or logging in. |
| **Limits** | Anonymous users may have lower rate limits (e.g., 10 queries/hour). Optional registration unlocks higher limits and conversation history. |
| **Acceptance criteria** | 1. A first-time visitor can ask a question immediately 2. No login wall, popup, or prompt appears before the user can interact 3. All public content is accessible without authentication |

---

## 4. Non-Functional Requirements

### NFR-001: First Contentful Paint < 2s on 3G

| Property | Value |
|---|---|
| **ID** | NFR-001 |
| **Priority** | P0 |
| **Metric** | First Contentful Paint (FCP) |
| **Target** | < 2 seconds |
| **Condition** | Simulated 3G connection (1.6 Mbps download, 750 ms RTT) |
| **Measurement** | Lighthouse CI in GitHub Actions; Vercel Analytics in production |
| **Rationale** | Majority of Bangladeshi users are on 3G/4G with variable speeds. Fast FCP is critical for perceived performance and retention. |

---

### NFR-002: Time to Interactive < 5s on 3G

| Property | Value |
|---|---|
| **ID** | NFR-002 |
| **Priority** | P0 |
| **Metric** | Time to Interactive (TTI) |
| **Target** | < 5 seconds |
| **Condition** | Simulated 3G connection |
| **Measurement** | Lighthouse CI |
| **Rationale** | Users must be able to type a question or navigate within 5 seconds of page load. |

---

### NFR-003: AI Response Time < 10s Median

| Property | Value |
|---|---|
| **ID** | NFR-003 |
| **Priority** | P0 |
| **Metric** | Time from query submission to first response token (streaming) |
| **Target** | < 3 seconds to first token; < 10 seconds for complete response (median, P50) |
| **Condition** | Production environment under normal load |
| **Measurement** | Application-level timing logged to analytics |
| **Rationale** | Users expect conversational response times. Streaming mitigates perceived latency. |

---

### NFR-004: 99.5% Uptime Target

| Property | Value |
|---|---|
| **ID** | NFR-004 |
| **Priority** | P1 |
| **Metric** | Service availability |
| **Target** | 99.5% monthly uptime (~3.65 hours downtime/month allowed) |
| **Measurement** | UptimeRobot or equivalent external monitoring |
| **Exclusions** | Scheduled maintenance windows (announced 24h in advance) |
| **Rationale** | Users need to trust the service is available when they need it. 99.5% is achievable with Vercel + Supabase without complex HA infrastructure. |

---

### NFR-005: WCAG 2.1 AA Accessibility

| Property | Value |
|---|---|
| **ID** | NFR-005 |
| **Priority** | P0 |
| **Target** | WCAG 2.1 Level AA compliance |
| **Key requirements** | Sufficient color contrast (4.5:1 for text), keyboard navigation, screen reader compatibility, focus indicators, alt text for images, ARIA labels for interactive elements, language attributes (`lang="bn"` or `lang="en"`) |
| **Measurement** | axe-core automated testing in CI; manual screen reader testing (NVDA/TalkBack) |
| **Rationale** | Government information must be accessible to people with disabilities. This is both an ethical obligation and a legal best practice. |

---

### NFR-006: Support Android 8+ Chrome

| Property | Value |
|---|---|
| **ID** | NFR-006 |
| **Priority** | P0 |
| **Browser support** | Chrome 70+ (Android 8+), Firefox 68+, Safari 14+ (iOS 14+), Samsung Internet 12+ |
| **Not supported** | Internet Explorer, Opera Mini (extreme mode), UC Browser (turbo mode) |
| **Measurement** | Cross-browser testing via BrowserStack or manual testing |
| **Rationale** | Chrome on Android is the dominant browser in Bangladesh. Android 8 (Oreo, 2017) represents a reasonable minimum for active devices. |

---

### NFR-007: Work on 360px Width Screens

| Property | Value |
|---|---|
| **ID** | NFR-007 |
| **Priority** | P0 |
| **Minimum viewport** | 360px width (e.g., Samsung Galaxy J2, older Xiaomi devices) |
| **Requirements** | No horizontal scrolling, no text truncation that hides critical info, all interactive elements reachable, readable Bangla text |
| **Measurement** | Responsive design testing in Chrome DevTools; real device testing |
| **Rationale** | Many low-end Android phones in Bangladesh have 360px wide screens. |

---

### NFR-008: Graceful Degradation Without JS

| Property | Value |
|---|---|
| **ID** | NFR-008 |
| **Priority** | P2 |
| **Behavior** | If JavaScript fails to load or is disabled, the service directory and static content pages are still readable. The AI chat feature shows a clear message that JavaScript is required. |
| **Measurement** | Manual testing with JavaScript disabled |
| **Rationale** | Unstable connections may cause JS bundle download failures. Core informational content should still be accessible via server-rendered HTML. |

---

### NFR-009: < 500 KB Initial Page Load

| Property | Value |
|---|---|
| **ID** | NFR-009 |
| **Priority** | P0 |
| **Metric** | Total transferred bytes for initial page load (compressed) |
| **Target** | < 500 KB |
| **Breakdown target** | HTML: < 50 KB, CSS: < 50 KB, JS: < 300 KB, Fonts: < 100 KB, Images: lazy-loaded |
| **Measurement** | Chrome DevTools Network tab; Lighthouse CI budget checks |
| **Rationale** | Users on prepaid data plans are cost-sensitive. A 500 KB page costs approximately 0.15 BDT on a typical data pack, which is acceptable. Larger pages deter repeat usage. |

---

### NFR-010: Support Unstable Connections

| Property | Value |
|---|---|
| **ID** | NFR-010 |
| **Priority** | P1 |
| **Behaviors** | 1. Retry failed API requests with exponential backoff 2. Show meaningful loading states during slow responses 3. Cache previously visited pages for offline viewing (Service Worker) 4. Queue user actions during temporary disconnects 5. Show connection status indicator when offline |
| **Measurement** | Testing with Chrome DevTools network throttling (offline, slow 3G) |
| **Rationale** | Mobile connectivity in Bangladesh is frequently interrupted, especially outside urban areas. The app must handle interruptions gracefully rather than showing error states. |

---

## 5. Content Requirements

The knowledge base covers government services across 16 categories. Each category requires structured content for its constituent services.

### Content Structure Per Service

Every service in the knowledge base must include, where applicable:

| Field | Required | Description |
|---|---|---|
| Service name (Bangla) | Yes | Official Bangla name |
| Service name (English) | Yes | English translation |
| Description | Yes | What the service is and who it's for |
| Responsible agency | Yes | Government agency/ministry |
| Eligibility | Yes | Who can apply |
| Required documents | Yes | Complete list of required documents |
| Fees | Yes | Actual amounts in BDT, not "as applicable" |
| Process steps | Yes | Numbered, actionable steps |
| Timeline | Yes | Expected processing time |
| Online portal | If exists | Direct URL to online application |
| Office locations | If applicable | Where to apply in person |
| Contact info | If available | Phone, email, website of the agency |
| Common mistakes | Recommended | What to avoid |
| Tips | Recommended | Insider knowledge for smoother process |
| Last verified | Yes | Date the information was last confirmed |

### 16 Service Categories

| # | Category | Bengali Name | Example Services | Priority |
|---|---|---|---|---|
| 1 | Passport & Immigration | পাসপোর্ট ও অভিবাসন | E-passport application, renewal, visa extension | **P0** |
| 2 | National Identity | জাতীয় পরিচয়পত্র | NID application, correction, replacement, smart card | **P0** |
| 3 | Land & Property | ভূমি ও সম্পত্তি | Land registration, mutation, khatian copy, land tax | **P0** |
| 4 | Birth & Death Registration | জন্ম ও মৃত্যু নিবন্ধন | Birth certificate, death certificate, correction |  P1 |
| 5 | Education | শিক্ষা | Board exam results, university admission, scholarship | P1 |
| 6 | Health | স্বাস্থ্য | Hospital card, disability certificate, health insurance | P2 |
| 7 | Tax & Revenue | কর ও রাজস্ব | TIN registration, income tax return, VAT registration | P1 |
| 8 | Business & Trade | ব্যবসা ও বাণিজ্য | Trade license, company registration, import/export license | P1 |
| 9 | Social Safety | সামাজিক নিরাপত্তা | Old age allowance, widow pension, disability allowance | P2 |
| 10 | Judiciary & Legal | বিচার ও আইন | Case filing, legal aid, court fee payment | P2 |
| 11 | Utilities | ইউটিলিটি | Electricity connection, water, gas, internet | P2 |
| 12 | Transport & Vehicles | পরিবহন ও যানবাহন | Driving license, vehicle registration, route permit | P1 |
| 13 | Agriculture | কৃষি | Agricultural subsidy, crop insurance, fertilizer card | P2 |
| 14 | Local Government | স্থানীয় সরকার | Ward certificate, character certificate, trade license (local) | P2 |
| 15 | Employment | কর্মসংস্থান | Government job circular, PSC application, manpower export | P2 |
| 16 | Digital Services | ডিজিটাল সেবা | My Government portal, a2i services, digital center | P2 |

---

## 6. Initial Scope

### V1 Scope: Three Priority Categories

The first version of Ask Bangladesh focuses on the three highest-demand service categories:

| Category | Services Included | Source Websites |
|---|---|---|
| **E-passport** | New application, renewal, lost passport, urgent processing, fees, tracking | dip.gov.bd, epassport.gov.bd |
| **National ID (NID)** | New NID, smart card, correction, replacement, online copy, verification | nidw.gov.bd, services.nidw.gov.bd |
| **Land & Tax** | Land registration, mutation (নামজারি), khatian copy, land development tax, record correction | land.gov.bd, minland.gov.bd |

### V1 Feature Scope

| Feature | Status |
|---|---|
| AI Q&A (Bangla, Banglish, English) | ✅ Included |
| Service directory (3 categories) | ✅ Included |
| Step-by-step guides | ✅ Included |
| Source citations | ✅ Included |
| Mobile-first responsive UI | ✅ Included |
| Single-turn Q&A | ✅ Included |
| Multi-turn conversations | ⚠️ Stretch goal |
| Feedback (thumbs up/down) | ✅ Included |
| Admin source management (CLI) | ✅ Included |
| Admin dashboard (UI) | ⚠️ Stretch goal |
| User authentication | ❌ Post-V1 |
| Conversation history | ❌ Post-V1 |

---

## 7. Success Metrics

### Launch Metrics (First 30 Days)

| Metric | Target | Measurement |
|---|---|---|
| Questions answered successfully | > 70% receive a relevant, sourced answer | Manual review of sample (100 queries) |
| User satisfaction | > 60% positive feedback (thumbs up) | In-app feedback data |
| Page load performance | FCP < 2s, TTI < 5s on 3G | Lighthouse CI + Vercel Analytics |
| Uptime | > 99% | UptimeRobot |
| Critical bugs | 0 open SEV-1/SEV-2 issues | Issue tracker |

### Growth Metrics (First 90 Days)

| Metric | Target | Measurement |
|---|---|---|
| Monthly active users | 500+ | Analytics |
| Queries per day | 50+ average | Application logs |
| Return visitors | > 20% visit more than once | Analytics |
| Knowledge base coverage | 3 categories fully covered | Content audit |
| Source freshness | > 90% of sources crawled within 7 days | Crawler monitoring |

### Quality Metrics (Ongoing)

| Metric | Target | Measurement |
|---|---|---|
| Answer accuracy | > 85% factually correct (sampled) | Monthly manual review |
| Source citation rate | 100% of answers include citations | Automated monitoring |
| Hallucination rate | < 5% of answers contain unsourced claims | Monthly manual review |
| Negative feedback rate | < 20% of rated responses are negative | In-app feedback |
| Accessibility score | > 90 Lighthouse Accessibility | Lighthouse CI |

---

## 8. Out of Scope for V1

The following features and capabilities are explicitly **not** included in the V1 release:

| Feature | Reason | Planned For |
|---|---|---|
| Voice input/output | Increases complexity significantly; text-first approach is more reliable for V1 | V2+ |
| Document upload/processing | Privacy and security concerns; requires careful design | V2+ |
| Online form submission | Would require government API integrations that don't exist yet | V3+ |
| Payment processing | Regulatory complexity; out of scope for an information platform | V3+ |
| User accounts/authentication | Not needed for core value proposition; adds friction | V2 |
| Conversation history (persistent) | Requires user accounts | V2 |
| Mobile app (native) | Web app is sufficient; PWA capabilities cover most needs | V3+ |
| SMS/USSD interface | Interesting for feature phone users but different product entirely | V3+ |
| WhatsApp/Messenger bot | Integration complexity; separate project | V2+ |
| All 16 service categories | Content creation is time-intensive; focus on 3 high-value categories first | V1.1, V1.2 |
| Real-time government data | No APIs available; rely on periodic crawling | When APIs exist |
| Localized office finder (GPS) | Requires comprehensive office location database | V2+ |
| Comparison between services | Nice-to-have but not core | V2 |
| Bangla handwriting recognition | Very specialized; not needed for text chat | Not planned |
| Multi-user admin roles | Single admin is sufficient for V1 | V2 |

> [!NOTE]
> "Out of scope" does not mean "never." These features are deferred to maintain focus on delivering a high-quality core experience. Each will be reconsidered based on user feedback and usage data after V1 launch.

---

> [!TIP]
> This PRD should be reviewed whenever a new phase begins. User feedback collected after launch should drive updates to priorities, personas, and success metrics.
