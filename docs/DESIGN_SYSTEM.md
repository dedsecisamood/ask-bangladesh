# Ask Bangladesh — Design System

> **Version:** 1.0.0
> **Last Updated:** 2026-10-19
> **Status:** Living Document
> **Framework:** Tailwind CSS + shadcn/ui

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [Color Palette](#2-color-palette)
3. [Typography](#3-typography)
4. [Spacing](#4-spacing)
5. [Border Radius](#5-border-radius)
6. [Shadows](#6-shadows)
7. [Breakpoints](#7-breakpoints)
8. [Component Specifications](#8-component-specifications)
9. [Accessibility Requirements](#9-accessibility-requirements)
10. [RTL/LTR Considerations](#10-rtlltr-considerations)
11. [Animation Guidelines](#11-animation-guidelines)
12. [Icon System](#12-icon-system)

---

## 1. Design Principles

| Principle | Description |
|---|---|
| **Bangla-First** | All typography, layouts, and interactions are optimized for Bangla script rendering before English |
| **Mobile-First** | Every component is designed for 320px minimum viewport width on low-end Android devices |
| **Clarity over Cleverness** | Simple, clear interfaces that any Bangladeshi citizen can understand without technical literacy |
| **Trustworthy** | Professional, government-adjacent feel without impersonating an official government site |
| **Lightweight** | Minimal CSS, no heavy animations, optimized fonts — designed for slow connections |
| **Accessible** | WCAG 2.1 AA compliant at minimum; large touch targets, sufficient contrast, screen reader support |

---

## 2. Color Palette

### 2.1 Primary Colors

The primary palette is anchored by Bangladesh Green, the dominant color of the national flag.

| Name | Hex | HSL | Tailwind Token | Usage |
|---|---|---|---|---|
| **Green 50** | `#E8F5F0` | `158 44% 93%` | `primary-50` | Subtle backgrounds, hover states |
| **Green 100** | `#C5E8DB` | `158 44% 84%` | `primary-100` | Light accents, selected states |
| **Green 200** | `#9DD9C3` | `158 44% 74%` | `primary-200` | Borders, dividers |
| **Green 300** | `#6DC9A8` | `158 44% 61%` | `primary-300` | Secondary text on dark |
| **Green 400** | `#3DB88D` | `158 55% 48%` | `primary-400` | Hover on primary buttons |
| **Green 500** | `#006A4E` | `158 100% 21%` | `primary-500` | **Primary brand color** (Bangladesh Green) |
| **Green 600** | `#005C43` | `158 100% 18%` | `primary-600` | Active/pressed states |
| **Green 700** | `#004D38` | `158 100% 15%` | `primary-700` | Dark accents |
| **Green 800** | `#003D2C` | `158 100% 12%` | `primary-800` | Very dark accents |
| **Green 900** | `#002E21` | `158 100% 9%` | `primary-900` | Darkest shade |

### 2.2 Secondary Colors (Warm Accent)

A warm amber accent complements the cool green primary and is used for highlights, CTAs, and attention-drawing elements.

| Name | Hex | HSL | Tailwind Token | Usage |
|---|---|---|---|---|
| **Amber 50** | `#FFF8E1` | `45 100% 94%` | `secondary-50` | Warm background tint |
| **Amber 100** | `#FFECB3` | `43 100% 85%` | `secondary-100` | Light highlight |
| **Amber 200** | `#FFE082` | `42 100% 75%` | `secondary-200` | Badge backgrounds |
| **Amber 300** | `#FFD54F` | `41 100% 65%` | `secondary-300` | Notification accent |
| **Amber 400** | `#FFCA28` | `40 100% 58%` | `secondary-400` | Hover state |
| **Amber 500** | `#FFC107` | `40 100% 51%` | `secondary-500` | **Secondary accent** |
| **Amber 600** | `#FFB300` | `38 100% 50%` | `secondary-600` | Active state |
| **Amber 700** | `#FFA000` | `35 100% 50%` | `secondary-700` | Dark accent |
| **Amber 800** | `#FF8F00` | `30 100% 50%` | `secondary-800` | Strong emphasis |

### 2.3 Neutral Colors

| Name | Hex | Tailwind Token | Usage |
|---|---|---|---|
| **White** | `#FFFFFF` | `neutral-0` | Page background (light mode) |
| **Gray 50** | `#F8FAFB` | `neutral-50` | Card backgrounds, subtle fills |
| **Gray 100** | `#F1F5F9` | `neutral-100` | Section backgrounds |
| **Gray 200** | `#E2E8F0` | `neutral-200` | Borders, dividers |
| **Gray 300** | `#CBD5E1` | `neutral-300` | Disabled borders |
| **Gray 400** | `#94A3B8` | `neutral-400` | Placeholder text |
| **Gray 500** | `#64748B` | `neutral-500` | Secondary text |
| **Gray 600** | `#475569` | `neutral-600` | Body text |
| **Gray 700** | `#334155` | `neutral-700` | Headings |
| **Gray 800** | `#1E293B` | `neutral-800` | Primary text |
| **Gray 900** | `#0F172A` | `neutral-900` | Highest contrast text |
| **Black** | `#020617` | `neutral-950` | Page background (dark mode) |

### 2.4 Semantic Colors

| Purpose | Light Mode | Dark Mode | Token | Usage |
|---|---|---|---|---|
| **Success** | `#059669` | `#34D399` | `success` | Verified sources, approved status |
| **Success BG** | `#ECFDF5` | `#064E3B` | `success-bg` | Success alert background |
| **Warning** | `#D97706` | `#FBBF24` | `warning` | Expiring content, attention needed |
| **Warning BG** | `#FFFBEB` | `#78350F` | `warning-bg` | Warning alert background |
| **Error** | `#DC2626` | `#F87171` | `error` | Errors, rejected status, dangerous actions |
| **Error BG** | `#FEF2F2` | `#7F1D1D` | `error-bg` | Error alert background |
| **Info** | `#2563EB` | `#60A5FA` | `info` | Informational notices, links |
| **Info BG** | `#EFF6FF` | `#1E3A5F` | `info-bg` | Info alert background |

### 2.5 Dark Mode

Dark mode uses a cool-toned dark background to maintain the trustworthy, professional feel.

| Element | Light Mode | Dark Mode |
|---|---|---|
| Page background | `#FFFFFF` | `#0F172A` (Gray 900) |
| Card background | `#F8FAFB` (Gray 50) | `#1E293B` (Gray 800) |
| Elevated card | `#FFFFFF` | `#334155` (Gray 700) |
| Primary text | `#1E293B` (Gray 800) | `#F1F5F9` (Gray 100) |
| Secondary text | `#64748B` (Gray 500) | `#94A3B8` (Gray 400) |
| Border | `#E2E8F0` (Gray 200) | `#334155` (Gray 700) |
| Primary button | `#006A4E` | `#3DB88D` (Green 400) |
| Primary button text | `#FFFFFF` | `#002E21` (Green 900) |

#### Tailwind CSS Variables

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 215 28% 17%;
    --card: 200 20% 98%;
    --card-foreground: 215 28% 17%;
    --popover: 0 0% 100%;
    --popover-foreground: 215 28% 17%;
    --primary: 158 100% 21%;
    --primary-foreground: 0 0% 100%;
    --secondary: 40 100% 51%;
    --secondary-foreground: 215 28% 17%;
    --muted: 210 40% 96%;
    --muted-foreground: 215 16% 47%;
    --accent: 158 44% 93%;
    --accent-foreground: 158 100% 21%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 214 32% 91%;
    --input: 214 32% 91%;
    --ring: 158 100% 21%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222 47% 11%;
    --foreground: 210 40% 98%;
    --card: 217 33% 17%;
    --card-foreground: 210 40% 98%;
    --popover: 222 47% 11%;
    --popover-foreground: 210 40% 98%;
    --primary: 158 55% 48%;
    --primary-foreground: 158 100% 9%;
    --secondary: 40 100% 51%;
    --secondary-foreground: 215 28% 17%;
    --muted: 217 33% 17%;
    --muted-foreground: 215 20% 65%;
    --accent: 217 33% 17%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 63% 31%;
    --destructive-foreground: 0 0% 100%;
    --border: 217 33% 30%;
    --input: 217 33% 30%;
    --ring: 158 55% 48%;
  }
}
```

---

## 3. Typography

### 3.1 Font Families

| Purpose | Font | Fallback Stack | Tailwind Class |
|---|---|---|---|
| **Bangla text** | Noto Sans Bengali | `system-ui, sans-serif` | `font-bangla` |
| **English text** | Inter | `system-ui, -apple-system, sans-serif` | `font-sans` |
| **Monospace** | JetBrains Mono | `ui-monospace, Consolas, monospace` | `font-mono` |

#### Font Loading Strategy

```typescript
// next/font configuration for optimal loading
import { Inter } from 'next/font/google';
import { Noto_Sans_Bengali } from 'next/font/google';
import { JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  display: 'swap',
  variable: '--font-bangla',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});
```

> [!TIP]
> Using `next/font` with `display: 'swap'` ensures text is visible immediately with system fonts, then swaps to custom fonts when loaded. This is critical for users on slow connections.

### 3.2 Type Scale

| Token | Size (rem) | Size (px) | Line Height | Bangla Line Height | Usage |
|---|---|---|---|---|---|
| `text-xs` | 0.75 | 12 | 1.5 | 1.75 | Captions, metadata, timestamps |
| `text-sm` | 0.875 | 14 | 1.5 | 1.75 | Secondary text, labels, helper text |
| `text-base` | 1.0 | 16 | 1.625 | 1.875 | Body text (default) |
| `text-lg` | 1.125 | 18 | 1.625 | 1.875 | Emphasized body text |
| `text-xl` | 1.25 | 20 | 1.5 | 1.75 | Section subheadings |
| `text-2xl` | 1.5 | 24 | 1.375 | 1.625 | Card titles, section headings |
| `text-3xl` | 1.875 | 30 | 1.375 | 1.625 | Page headings |
| `text-4xl` | 2.25 | 36 | 1.25 | 1.5 | Hero headings |

> [!IMPORTANT]
> **Bangla Script Considerations:** Bangla script has taller ascenders and descenders than Latin script. The "Bangla Line Height" column specifies increased line heights when the content is primarily Bangla, preventing characters from clipping or overlapping.

### 3.3 Font Weights

| Weight | Value | Usage |
|---|---|---|
| Regular | 400 | Body text, descriptions |
| Medium | 500 | Labels, navigation items, secondary emphasis |
| Semibold | 600 | Subheadings, card titles, button text |
| Bold | 700 | Page headings, strong emphasis |

### 3.4 Bangla-Specific Typography Rules

```css
/* Ensure proper Bangla text rendering */
.bangla-text {
  font-family: var(--font-bangla), 'Noto Sans Bengali', system-ui, sans-serif;
  line-height: 1.875; /* Taller for Bangla script */
  letter-spacing: 0.01em; /* Slight spacing for readability */
  word-break: break-word; /* Bangla words can be long */
  hyphens: auto;
  -webkit-hyphens: auto;
}

/* Mixed Bangla + English content */
.mixed-text {
  font-family: var(--font-bangla), var(--font-inter), system-ui, sans-serif;
  line-height: 1.75; /* Compromise between Bangla and English */
}
```

---

## 4. Spacing

### 4.1 Base Unit

The spacing system uses a **4px base unit** for consistency.

| Token | Value | Rem | Tailwind Class | Usage |
|---|---|---|---|---|
| `space-0` | 0px | 0 | `p-0`, `m-0` | Reset |
| `space-0.5` | 2px | 0.125 | `p-0.5`, `m-0.5` | Hairline gaps |
| `space-1` | 4px | 0.25 | `p-1`, `m-1` | Tight spacing (icons inline) |
| `space-1.5` | 6px | 0.375 | `p-1.5`, `m-1.5` | Small internal padding |
| `space-2` | 8px | 0.5 | `p-2`, `m-2` | Compact padding |
| `space-2.5` | 10px | 0.625 | `p-2.5`, `m-2.5` | Button padding (vertical) |
| `space-3` | 12px | 0.75 | `p-3`, `m-3` | Default internal padding |
| `space-4` | 16px | 1 | `p-4`, `m-4` | Standard padding, gaps |
| `space-5` | 20px | 1.25 | `p-5`, `m-5` | Comfortable padding |
| `space-6` | 24px | 1.5 | `p-6`, `m-6` | Section padding (mobile) |
| `space-8` | 32px | 2 | `p-8`, `m-8` | Section padding (desktop) |
| `space-10` | 40px | 2.5 | `p-10`, `m-10` | Large section gaps |
| `space-12` | 48px | 3 | `p-12`, `m-12` | Page margins |
| `space-16` | 64px | 4 | `p-16`, `m-16` | Hero section spacing |
| `space-20` | 80px | 5 | `p-20`, `m-20` | Major section divisions |
| `space-24` | 96px | 6 | `p-24`, `m-24` | Footer/header height areas |

### 4.2 Layout Spacing Guidelines

| Context | Mobile | Desktop |
|---|---|---|
| Page horizontal padding | `px-4` (16px) | `px-8` (32px) |
| Section vertical spacing | `py-8` (32px) | `py-16` (64px) |
| Card internal padding | `p-4` (16px) | `p-6` (24px) |
| Stack gap (form fields) | `gap-4` (16px) | `gap-4` (16px) |
| Grid gap (cards) | `gap-4` (16px) | `gap-6` (24px) |
| Inline element gap | `gap-2` (8px) | `gap-3` (12px) |
| Chat message spacing | `gap-3` (12px) | `gap-4` (16px) |

---

## 5. Border Radius

| Token | Value | Tailwind Class | Usage |
|---|---|---|---|
| `radius-none` | 0px | `rounded-none` | No rounding |
| `radius-sm` | 4px | `rounded-sm` | Small tags, inline badges |
| `radius-default` | 8px | `rounded-lg` | Buttons, inputs, small cards |
| `radius-md` | 12px | `rounded-xl` | Cards, dialogs |
| `radius-lg` | 16px | `rounded-2xl` | Chat bubbles, modals |
| `radius-full` | 9999px | `rounded-full` | Avatars, pills, circular buttons |

### Component-Specific Radius

| Component | Radius | Rationale |
|---|---|---|
| Button | `rounded-lg` (8px) | Friendly but professional |
| Input field | `rounded-lg` (8px) | Matches buttons |
| Card | `rounded-xl` (12px) | Visually distinct containers |
| Chat bubble | `rounded-2xl` (16px) | Familiar chat aesthetic |
| Badge | `rounded-full` (pill) | Compact, scannable |
| Modal | `rounded-xl` (12px) | Matches card style |
| Avatar | `rounded-full` | Standard circular avatar |
| Tooltip | `rounded-lg` (8px) | Matches button radius |

---

## 6. Shadows

A subtle elevation system that provides depth without visual heaviness. Shadows are reduced on mobile to conserve rendering performance.

| Token | Value | Tailwind Class | Usage |
|---|---|---|---|
| `shadow-xs` | `0 1px 2px rgba(0,0,0,0.05)` | `shadow-xs` | Subtle lift (input fields) |
| `shadow-sm` | `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)` | `shadow-sm` | Cards at rest |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)` | `shadow-md` | Cards on hover, dropdowns |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)` | `shadow-lg` | Modals, floating elements |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.1), 0 8px 10px rgba(0,0,0,0.04)` | `shadow-xl` | Elevated modals, toasts |

### Dark Mode Shadows

In dark mode, shadows are replaced with subtle border glows or reduced opacity:

```css
.dark {
  --shadow-card: 0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2);
  --shadow-elevated: 0 4px 6px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3);
}
```

---

## 7. Breakpoints

The system follows a **mobile-first** approach. All base styles target mobile viewports; larger breakpoints add progressive enhancements.

| Breakpoint | Min Width | Tailwind Prefix | Target Devices |
|---|---|---|---|
| Default | 0px | (none) | Small phones (320px–639px) |
| `sm` | 640px | `sm:` | Large phones, small tablets |
| `md` | 768px | `md:` | Tablets (portrait) |
| `lg` | 1024px | `lg:` | Tablets (landscape), small laptops |
| `xl` | 1280px | `xl:` | Desktops |

### Layout Behavior

| Element | Mobile (default) | `sm` (640px) | `md` (768px) | `lg` (1024px) |
|---|---|---|---|---|
| Navigation | Bottom tab bar | Bottom tab bar | Top navbar | Sidebar + top bar |
| Content width | Full width | Full width | Max 720px centered | Max 960px centered |
| Card grid | 1 column | 2 columns | 2 columns | 3 columns |
| Chat layout | Full screen | Full screen | Centered panel (640px) | Centered panel (720px) |
| Admin layout | Stacked, hamburger | Stacked, hamburger | Sidebar + content | Sidebar + content |
| Font sizes | Base scale | Base scale | +1 step for headings | +1 step for headings |

### Container Widths

```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem; /* 16px */
}

@media (min-width: 640px) {
  .container { max-width: 640px; }
}

@media (min-width: 768px) {
  .container { max-width: 720px; padding: 0 2rem; }
}

@media (min-width: 1024px) {
  .container { max-width: 960px; }
}

@media (min-width: 1280px) {
  .container { max-width: 1140px; }
}
```

---

## 8. Component Specifications

### 8.1 Buttons

#### Variants

| Variant | Background | Text | Border | Usage |
|---|---|---|---|---|
| **Primary** | `primary-500` | White | None | Main CTAs: "জিজ্ঞাসা করুন" (Ask), Submit |
| **Secondary** | Transparent | `primary-500` | `primary-500` 1px | Secondary actions: Cancel, Back |
| **Ghost** | Transparent | `neutral-600` | None | Tertiary actions: nav items, links |
| **Danger** | `error` | White | None | Destructive actions: Delete, Remove |

#### Sizes

| Size | Height | Padding | Font Size | Min Touch Target |
|---|---|---|---|---|
| `sm` | 32px | `px-3 py-1.5` | `text-sm` (14px) | 32×32px |
| `md` | 40px | `px-4 py-2` | `text-sm` (14px) | 40×40px |
| `lg` | 48px | `px-6 py-3` | `text-base` (16px) | 48×48px |

#### States

| State | Visual Change |
|---|---|
| Default | As specified per variant |
| Hover | Lighten background 10% (primary → `primary-400`) |
| Focus | 2px ring in `primary-300` with 2px offset |
| Active/Pressed | Darken background 10% (primary → `primary-600`), scale 0.98 |
| Disabled | Opacity 50%, cursor not-allowed, no hover effects |
| Loading | Spinner icon replaces content or prepends, disabled interaction |

#### Specification

```tsx
// Button component API
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}
```

### 8.2 Input Fields

#### Standard Text Input

| Property | Value |
|---|---|
| Height | 40px (`md` size) / 48px (`lg` for mobile-primary) |
| Border | 1px `neutral-200`, radius `rounded-lg` |
| Padding | `px-3 py-2` |
| Font | `font-bangla` (or `font-sans` for English-only fields) |
| Placeholder color | `neutral-400` |
| Focus | Border `primary-500`, ring 2px `primary-100` |
| Error | Border `error`, ring 2px `error-bg`, error message below |
| Disabled | Background `neutral-100`, opacity 60% |

#### Bangla-Specific Input Considerations

```css
/* Bangla input fields need extra vertical space */
.input-bangla {
  font-family: var(--font-bangla);
  line-height: 1.75;
  padding-top: 0.625rem; /* 10px */
  padding-bottom: 0.625rem;
  /* Prevent Bangla conjuncts from being cut off */
  overflow: visible;
}

/* Chat input with Bangla keyboard support */
.chat-input {
  min-height: 48px;
  max-height: 120px; /* ~4 lines of Bangla text */
  resize: none;
  font-size: 1rem; /* 16px - prevents iOS zoom on focus */
}
```

> [!IMPORTANT]
> Always set `font-size: 16px` (or larger) on mobile input fields to prevent iOS Safari from auto-zooming when the input is focused.

### 8.3 Cards

#### Service Card

Displays a government service in the browse/search interface.

```
┌──────────────────────────────────┐
│  [Agency Logo]  Agency Name      │  ← Header area (gray bg)
├──────────────────────────────────┤
│                                  │
│  📋 Service Name (Bangla)       │  ← Title (semibold, text-lg)
│  Service Name (English)          │  ← Subtitle (regular, text-sm, gray)
│                                  │
│  Brief description of the       │  ← Description (2-line clamp)
│  service in Bangla...            │
│                                  │
│  ┌────────┐ ┌────────┐          │
│  │ Badge  │ │ Badge  │          │  ← Category + status badges
│  └────────┘ └────────┘          │
│                                  │
│  [View Details →]               │  ← Ghost button, right-aligned
└──────────────────────────────────┘
```

| Property | Value |
|---|---|
| Background | `card` (white/dark) |
| Border | 1px `neutral-200` |
| Radius | `rounded-xl` (12px) |
| Shadow | `shadow-sm` → `shadow-md` on hover |
| Padding | `p-4` mobile / `p-6` desktop |
| Min height | 180px |
| Title clamp | 2 lines |
| Description clamp | 2 lines |

#### Source Card

Displays an approved source in the admin interface.

```
┌──────────────────────────────────┐
│  🌐 source-domain.gov.bd        │  ← Domain (monospace, text-sm)
├──────────────────────────────────┤
│  Source Title                    │  ← Title (semibold)
│  https://full-url.gov.bd/path   │  ← URL (truncated, text-xs, gray)
│                                  │
│  ┌──────────┐ ┌───────────────┐ │
│  │ Approved │ │ Last verified │ │  ← Status + timestamp badges
│  │  ✓       │ │ 2 days ago    │ │
│  └──────────┘ └───────────────┘ │
└──────────────────────────────────┘
```

#### Citation Card

Inline citation within a chat response, expandable to show source details.

```
Collapsed:
┌──────────────────────────────────┐
│ [1] Ministry of Education ▸      │  ← Clickable, shows source title
└──────────────────────────────────┘

Expanded:
┌──────────────────────────────────┐
│ [1] Ministry of Education        │
│                                  │
│ "Relevant passage text from the  │  ← Quoted passage (italic)
│  source document..."             │
│                                  │
│ 🔗 education.gov.bd/page ↗     │  ← External link
│ Last updated: Oct 15, 2026      │
└──────────────────────────────────┘
```

| Property | Value |
|---|---|
| Background | `neutral-50` / `neutral-800` (dark) |
| Border | 1px `neutral-200`, left border 3px `primary-500` |
| Radius | `rounded-lg` (8px) |
| Padding | `px-3 py-2` (collapsed) / `p-4` (expanded) |
| Transition | Height + opacity, 200ms ease-out |

### 8.4 Navigation

#### Mobile Navigation (Bottom Tab Bar)

Used on screens below `lg` (1024px).

```
┌──────────────────────────────────────────┐
│                                          │
│              [Page Content]              │
│                                          │
├──────────────────────────────────────────┤
│  🏠        💬        📋        ≡       │
│  হোম     চ্যাট    সেবা     মেনু     │
│  Home     Chat    Services  Menu       │
└──────────────────────────────────────────┘
```

| Property | Value |
|---|---|
| Height | 64px (includes safe area for notched phones) |
| Background | White / Dark with `backdrop-blur-lg` |
| Border top | 1px `neutral-200` |
| Active indicator | `primary-500` dot or underline |
| Icon size | 24px |
| Label size | `text-xs` (12px) |
| Touch target | 48×48px minimum per tab |
| Safe area | `pb-safe` (env(safe-area-inset-bottom)) |

#### Desktop Navigation (Sidebar)

Used on `lg` screens and above.

```
┌────────────────┬──────────────────────────────┐
│                │                              │
│  🇧🇩 Ask       │  [Top Bar: Search + Lang]   │
│  Bangladesh    │                              │
│                ├──────────────────────────────┤
│  ────────────  │                              │
│  🏠 হোম       │                              │
│  💬 চ্যাট     │    [Main Content Area]       │
│  📋 সেবাসমূহ  │                              │
│  ℹ️ সম্পর্কে  │                              │
│                │                              │
│  ────────────  │                              │
│  🌙 Dark Mode  │                              │
│  🌐 Language   │                              │
│                │                              │
└────────────────┴──────────────────────────────┘
```

| Property | Value |
|---|---|
| Width | 240px (collapsible to 64px icon-only) |
| Background | `neutral-50` / `neutral-900` |
| Border right | 1px `neutral-200` |
| Nav item height | 40px |
| Nav item padding | `px-3 py-2` |
| Active state | `primary-50` background, `primary-500` text + left border 3px |
| Hover state | `neutral-100` background |

### 8.5 Chat Interface

#### Message Bubbles

```
User message (right-aligned):
                           ┌──────────────────────┐
                           │  আমি কিভাবে NID     │
                           │  নতুন করে পাবো?     │
                           │                  2:31p│
                           └──────────────────────┘

Assistant message (left-aligned):
┌──────────────────────────────────┐
│  🤖 Ask Bangladesh               │
│                                  │
│  NID (জাতীয় পরিচয়পত্র) নতুন  │
│  করার জন্য আপনাকে নিচের       │
│  ধাপগুলো অনুসরণ করতে হবে:     │
│                                  │
│  1. নিকটস্থ উপজেলা/সিটি       │
│     কর্পোরেশন অফিসে যান        │
│  2. প্রয়োজনীয় কাগজপত্র...     │
│                                  │
│  📎 Sources:                     │
│  ┌────────────────────────────┐  │
│  │ [1] NID Wing, EC ▸        │  │
│  └────────────────────────────┘  │
│  ┌────────────────────────────┐  │
│  │ [2] Services Portal ▸     │  │
│  └────────────────────────────┘  │
│                                  │
│  👍  👎  📋                     │
│                          2:32p   │
└──────────────────────────────────┘
```

#### User Message Bubble

| Property | Value |
|---|---|
| Background | `primary-500` |
| Text color | White |
| Radius | `rounded-2xl` with bottom-right `rounded-sm` |
| Max width | 85% of container |
| Padding | `px-4 py-3` |
| Font | `font-bangla` (auto-detected) |
| Alignment | Right |

#### Assistant Message Bubble

| Property | Value |
|---|---|
| Background | `neutral-50` / `neutral-800` (dark) |
| Text color | `neutral-800` / `neutral-100` (dark) |
| Radius | `rounded-2xl` with bottom-left `rounded-sm` |
| Max width | 90% of container |
| Padding | `px-4 py-3` |
| Font | `font-bangla` (for Bangla responses) |
| Alignment | Left |
| Markdown | Rendered with custom styles (lists, bold, links) |

#### Loading State (Typing Indicator)

```
┌──────────────────────────────────┐
│  🤖 Ask Bangladesh               │
│                                  │
│  ● ● ●                          │  ← Three dots, animated pulse
│                                  │
└──────────────────────────────────┘
```

| Property | Value |
|---|---|
| Dot size | 8px |
| Dot color | `neutral-400` |
| Animation | Sequential pulse (opacity 0.3 → 1.0), 1.4s loop |
| Dot spacing | `gap-1` (4px) |

#### Chat Input Area

```
┌──────────────────────────────────────────┐
│ ┌──────────────────────────────┐ ┌─────┐│
│ │ আপনার প্রশ্ন লিখুন...       │ │ ➤  ││
│ │                              │ │     ││
│ └──────────────────────────────┘ └─────┘│
└──────────────────────────────────────────┘
```

| Property | Value |
|---|---|
| Container | Sticky bottom, `backdrop-blur-lg`, border-top |
| Input | Auto-resize textarea, max 4 lines |
| Send button | 40×40px circle, `primary-500`, white arrow icon |
| Min height | 56px (container) |
| Padding | `p-3` |

### 8.6 Badges

#### Variants

| Variant | Background | Text | Border | Usage |
|---|---|---|---|---|
| **Default** | `neutral-100` | `neutral-700` | None | General labels |
| **Primary** | `primary-50` | `primary-700` | None | Category tags |
| **Success** | `success-bg` | `success` | None | Verified, approved, active |
| **Warning** | `warning-bg` | `warning` | None | Pending, expiring |
| **Error** | `error-bg` | `error` | None | Rejected, failed, inactive |
| **Info** | `info-bg` | `info` | None | Informational |
| **Outline** | Transparent | `neutral-600` | 1px `neutral-300` | Subtle labels |

#### Sizes

| Size | Height | Padding | Font Size | Radius |
|---|---|---|---|---|
| `sm` | 20px | `px-1.5 py-0.5` | `text-xs` (12px) | `rounded-full` |
| `md` | 24px | `px-2 py-0.5` | `text-xs` (12px) | `rounded-full` |
| `lg` | 28px | `px-2.5 py-1` | `text-sm` (14px) | `rounded-full` |

#### Special Badge Types

| Badge | Example | Usage |
|---|---|---|
| **Language** | `🇧🇩 বাংলা` / `EN` / `Banglish` | Language indicator on content |
| **Status** | `✓ সক্রিয়` (Active) | Content/source status |
| **Verification** | `✓ যাচাইকৃত` (Verified) | Source verification status |
| **Count** | `42` | Notification/item counts |

### 8.7 Alerts and Notifications

#### Alert Variants

| Variant | Left Border | Icon | Background | Usage |
|---|---|---|---|---|
| **Info** | `info` (3px) | `ℹ️ Info` | `info-bg` | General information |
| **Success** | `success` (3px) | `✓ Check` | `success-bg` | Success confirmation |
| **Warning** | `warning` (3px) | `⚠ Alert` | `warning-bg` | Caution notice |
| **Error** | `error` (3px) | `✕ XCircle` | `error-bg` | Error message |

#### Alert Layout

```
┌──────────────────────────────────────────┐
│ ┃  ⚠  সতর্কতা                          │  ← Icon + Title (semibold)
│ ┃                                        │
│ ┃  এই তথ্য সর্বশেষ ৩০ দিন আগে        │  ← Description (regular)
│ ┃  যাচাই করা হয়েছে। সর্বশেষ তথ্যের  │
│ ┃  জন্য অফিসিয়াল ওয়েবসাইট দেখুন।    │
│ ┃                                        │
│ ┃  [বিস্তারিত দেখুন]                   │  ← Optional action link
└──────────────────────────────────────────┘
```

| Property | Value |
|---|---|
| Radius | `rounded-lg` (8px) |
| Padding | `p-4` |
| Left border | 3px solid (variant color) |
| Icon size | 20px |
| Title | `text-sm font-semibold` |
| Description | `text-sm` |
| Max width | 100% of container |

#### Toast Notifications

Temporary notifications that appear at the top-right (desktop) or top-center (mobile).

| Property | Value |
|---|---|
| Position | Fixed, top-right (desktop) / top-center (mobile) |
| Width | 360px (desktop) / calc(100% - 32px) (mobile) |
| Shadow | `shadow-lg` |
| Duration | 5 seconds (auto-dismiss), configurable |
| Animation | Slide in from top, fade out |
| Max stacked | 3 (older toasts pushed down) |

### 8.8 Modal Dialogs

#### Standard Modal

```
┌──────────────────────────────────────────┐  ← Backdrop (black 50% opacity)
│                                          │
│   ┌──────────────────────────────────┐   │
│   │  ✕                               │   │  ← Close button (top-right)
│   │                                  │   │
│   │  Modal Title                     │   │  ← Title (text-lg, semibold)
│   │  ─────────────────────────────   │   │  ← Divider
│   │                                  │   │
│   │  Modal content goes here.        │   │  ← Body content (scrollable)
│   │  Can include forms, text,        │   │
│   │  confirmations, etc.             │   │
│   │                                  │   │
│   │  ─────────────────────────────   │   │  ← Divider
│   │              [Cancel] [Confirm]  │   │  ← Footer actions
│   └──────────────────────────────────┘   │
│                                          │
└──────────────────────────────────────────┘
```

| Property | Value |
|---|---|
| Backdrop | Black with 50% opacity, `backdrop-blur-sm` |
| Width | 90% on mobile, 480px on desktop (max 640px) |
| Radius | `rounded-xl` (12px) |
| Shadow | `shadow-xl` |
| Padding | `p-6` |
| Max height | 85vh (body scrollable) |
| Animation | Scale from 95% → 100% + fade in, 200ms |
| Close | Click backdrop, press Escape, or close button |
| Focus trap | Yes — Tab cycles within modal |
| Scroll lock | Yes — Body scroll disabled while modal is open |

#### Confirmation Dialog

Compact modal for destructive action confirmation.

| Property | Value |
|---|---|
| Width | 400px max |
| Icon | Warning/danger icon (48px) centered |
| Title | `text-lg font-semibold` centered |
| Description | `text-sm text-neutral-500` centered |
| Actions | Cancel (secondary) + Confirm (danger) side by side |

### 8.9 Skeleton Loaders

Content placeholder while data is loading. Uses a shimmer animation for visual feedback.

#### Variants

```
Text skeleton:
┌──────────────────────────────────┐
│ ███████████████████████░░░░░░░░  │  ← Line 1 (100% width)
│ █████████████████░░░░░░░░░░░░░  │  ← Line 2 (70% width)
│ ████████████████████████░░░░░░  │  ← Line 3 (85% width)
└──────────────────────────────────┘

Card skeleton:
┌──────────────────────────────────┐
│ ████████████░░░░░░░░░░░░░░░░░░  │  ← Title
│                                  │
│ ██████████████████████░░░░░░░░  │  ← Description line 1
│ ████████████████░░░░░░░░░░░░░░  │  ← Description line 2
│                                  │
│ ┌────────┐ ┌────────┐           │  ← Badge skeletons
│ │████████│ │████████│           │
│ └────────┘ └────────┘           │
└──────────────────────────────────┘

Chat message skeleton:
      ┌──────────────────────┐
      │ ████████████████████ │  ← User message
      └──────────────────────┘

┌──────────────────────────────────┐
│ ██████████████████████░░░░░░░░  │  ← Assistant response line 1
│ ████████████████░░░░░░░░░░░░░░  │  ← Assistant response line 2
│ ██████████████████████████░░░░  │  ← Assistant response line 3
└──────────────────────────────────┘
```

#### Skeleton Animation

```css
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    hsl(var(--muted)) 25%,
    hsl(var(--muted-foreground) / 0.1) 50%,
    hsl(var(--muted)) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 4px;
}
```

| Property | Value |
|---|---|
| Base color | `neutral-200` (light) / `neutral-700` (dark) |
| Highlight color | `neutral-100` (light) / `neutral-600` (dark) |
| Animation duration | 1.5s |
| Animation timing | `ease-in-out` |
| Border radius | 4px (text) / matches component radius |
| Height | Matches text line height for text skeletons |

---

## 9. Accessibility Requirements

### 9.1 Standards Compliance

| Standard | Level | Notes |
|---|---|---|
| WCAG 2.1 | AA (minimum) | All public-facing pages |
| WCAG 2.1 | AAA (target) | Text contrast, focus indicators |
| ARIA 1.2 | Full compliance | All interactive components |
| Section 508 | Compliant | Federal accessibility standard |

### 9.2 Color Contrast

| Element | Minimum Ratio | Standard |
|---|---|---|
| Body text on background | 4.5:1 | WCAG AA |
| Large text (18px+) on background | 3:1 | WCAG AA |
| UI components (buttons, inputs) | 3:1 | WCAG AA |
| Focus indicators | 3:1 | WCAG AA |
| Decorative elements | No requirement | — |

#### Verified Contrast Ratios

| Combination | Ratio | Pass |
|---|---|---|
| `neutral-800` on white | 12.6:1 | ✓ AAA |
| `neutral-600` on white | 5.7:1 | ✓ AA |
| `neutral-500` on white | 4.6:1 | ✓ AA |
| White on `primary-500` | 6.8:1 | ✓ AAA |
| `primary-500` on white | 6.8:1 | ✓ AAA |
| White on `error` | 4.5:1 | ✓ AA |
| `neutral-100` on `neutral-900` | 13.5:1 | ✓ AAA |

### 9.3 Keyboard Navigation

| Component | Keys | Behavior |
|---|---|---|
| Buttons | `Enter`, `Space` | Activate |
| Links | `Enter` | Navigate |
| Modals | `Escape` | Close |
| Modals | `Tab` | Cycle focus within modal (trapped) |
| Dropdowns | `Arrow Up/Down` | Navigate options |
| Dropdowns | `Enter` | Select option |
| Dropdowns | `Escape` | Close dropdown |
| Chat input | `Enter` | Send message |
| Chat input | `Shift+Enter` | New line |
| Citation cards | `Enter`, `Space` | Toggle expand/collapse |
| Tab bar | `Arrow Left/Right` | Navigate tabs |
| Skip link | `Tab` (first focusable) | Skip to main content |

### 9.4 Focus Management

```css
/* Visible focus indicator for all interactive elements */
*:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
  border-radius: 2px;
}

/* Remove default outline when using mouse (focus-visible handles keyboard) */
*:focus:not(:focus-visible) {
  outline: none;
}

/* High contrast mode support */
@media (forced-colors: active) {
  *:focus-visible {
    outline: 2px solid Highlight;
  }
}
```

### 9.5 Screen Reader Requirements

| Component | ARIA Requirements |
|---|---|
| Chat messages | `role="log"`, `aria-live="polite"`, `aria-label="Chat conversation"` |
| Loading indicator | `aria-busy="true"`, `aria-label="Loading response"` |
| Citations | `role="button"`, `aria-expanded`, `aria-controls` |
| Language switcher | `role="radiogroup"`, `aria-label="Select language"` |
| Navigation | `role="navigation"`, `aria-label="Main navigation"` |
| Search input | `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded` |
| Modals | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` |
| Alerts | `role="alert"`, `aria-live="assertive"` |
| Toasts | `role="status"`, `aria-live="polite"` |
| Skip link | Hidden until focused, links to `#main-content` |

### 9.6 Touch Targets

| Element | Minimum Size | Standard |
|---|---|---|
| Buttons | 44×44px | WCAG 2.5.8 (AAA target) |
| Links (inline) | 24×24px | WCAG 2.5.5 (AA) |
| Navigation items | 48×48px | Android guidelines |
| Chat send button | 44×44px | Touch-friendly |
| Close buttons | 44×44px | Easy to tap on mobile |
| Checkbox/radio | 24×24px visual + 44×44px touch area | Combined approach |

---

## 10. RTL/LTR Considerations

### Current Language Direction

| Language | Direction | Script |
|---|---|---|
| **Bangla (বাংলা)** | LTR | Bengali script |
| **English** | LTR | Latin script |
| **Banglish** | LTR | Latin script |

> [!NOTE]
> All currently supported languages are **left-to-right (LTR)**. Bengali script is an LTR script, unlike Arabic or Hebrew. Therefore, full RTL support is not required at this time.

### Future RTL Preparation

If RTL language support is added in the future (e.g., Arabic for Rohingya communities):

```tsx
// Use logical CSS properties instead of physical ones
// ✓ Correct (logical)
<div className="ms-4 me-2 ps-3 pe-1">
  {/* ms = margin-inline-start, me = margin-inline-end */}
</div>

// ✗ Avoid (physical)
<div className="ml-4 mr-2 pl-3 pr-1">
  {/* ml/mr are direction-dependent */}
</div>
```

### Mixed-Script Handling

When Bangla and English text appear together:

```css
/* Ensure proper bidirectional text rendering */
.mixed-content {
  unicode-bidi: plaintext;
  text-align: start; /* Logical, not 'left' */
}

/* Numbers in Bangla text should remain LTR */
.bangla-text {
  direction: ltr;
  /* Bengali numerals (if used) are naturally LTR */
}
```

---

## 11. Animation Guidelines

### Core Principles

| Principle | Description |
|---|---|
| **Purpose-driven** | Every animation must serve a functional purpose (feedback, context, continuity) |
| **Subtle** | Animations should be barely noticeable — they guide, not distract |
| **Fast** | Keep durations under 300ms for interactions; users are on slow devices |
| **Respectful** | Honor `prefers-reduced-motion` — disable all non-essential animations |

### Duration Scale

| Token | Duration | Usage |
|---|---|---|
| `duration-75` | 75ms | Micro-interactions (color changes, opacity) |
| `duration-150` | 150ms | Button hover/press, toggle switches |
| `duration-200` | 200ms | Modals, dropdowns, tooltips |
| `duration-300` | 300ms | Page transitions, card expand/collapse |
| `duration-500` | 500ms | Maximum for any UI animation |

### Easing Functions

| Token | Value | Usage |
|---|---|---|
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering (modals opening, menus appearing) |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements exiting (modals closing, menus hiding) |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Elements moving (skeleton shimmer, transitions) |

### Specific Animations

| Component | Animation | Duration | Easing |
|---|---|---|---|
| Button hover | Background color change | 150ms | `ease-out` |
| Button press | Scale to 0.98 | 75ms | `ease-in` |
| Modal open | Scale 0.95→1.0 + fade in | 200ms | `ease-out` |
| Modal close | Scale 1.0→0.95 + fade out | 150ms | `ease-in` |
| Dropdown open | Scale Y 0.95→1.0 + fade in | 150ms | `ease-out` |
| Toast enter | Slide down from top + fade in | 200ms | `ease-out` |
| Toast exit | Fade out | 150ms | `ease-in` |
| Skeleton shimmer | Gradient position cycle | 1500ms | `ease-in-out` |
| Chat message enter | Slide up + fade in | 200ms | `ease-out` |
| Typing indicator | Dot opacity pulse | 1400ms | `ease-in-out` |
| Citation expand | Height auto + fade in | 200ms | `ease-out` |
| Page transition | Fade | 150ms | `ease-in-out` |

### Reduced Motion

```css
/* Disable all animations when user prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```tsx
// React hook for checking motion preference
function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
```

---

## 12. Icon System

### Provider

[Lucide Icons](https://lucide.dev/) — an open-source icon library with consistent stroke-based icons.

### Why Lucide?

| Reason | Details |
|---|---|
| **Tree-shakeable** | Only import icons you use; no bloated bundle |
| **Consistent design** | 24×24px grid, 2px stroke, rounded joins |
| **React native** | First-class React components via `lucide-react` |
| **Accessible** | Includes `aria-label` support out of the box |
| **Open source** | MIT license, active development |

### Icon Sizes

| Size | Pixels | Tailwind Class | Usage |
|---|---|---|---|
| `xs` | 14px | `w-3.5 h-3.5` | Inline with small text |
| `sm` | 16px | `w-4 h-4` | Inline with body text, badges |
| `md` | 20px | `w-5 h-5` | Buttons, navigation items |
| `lg` | 24px | `w-6 h-6` | Standalone icons, tab bar |
| `xl` | 32px | `w-8 h-8` | Feature icons, empty states |
| `2xl` | 48px | `w-12 h-12` | Hero illustrations, confirmations |

### Icon Color

Icons inherit text color by default (`currentColor`). Override with Tailwind text color classes:

```tsx
<Search className="w-5 h-5 text-neutral-400" />       // Placeholder icon
<CheckCircle className="w-5 h-5 text-success" />       // Success state
<AlertTriangle className="w-5 h-5 text-warning" />     // Warning
<XCircle className="w-5 h-5 text-error" />              // Error
<ExternalLink className="w-4 h-4 text-primary-500" />  // Link icon
```

### Common Icons Used

| Icon | Lucide Name | Usage |
|---|---|---|
| 🏠 Home | `Home` | Home/landing page navigation |
| 💬 Chat | `MessageCircle` | Chat interface navigation |
| 📋 Services | `FileText` | Service directory navigation |
| 🔍 Search | `Search` | Search input, search action |
| ⬆ Send | `SendHorizontal` | Chat send button |
| 👍 Thumbs up | `ThumbsUp` | Positive feedback |
| 👎 Thumbs down | `ThumbsDown` | Negative feedback |
| 📋 Copy | `Copy` | Copy to clipboard |
| 🔗 External link | `ExternalLink` | Open in new tab |
| ✕ Close | `X` | Close modal/dialog |
| ≡ Menu | `Menu` | Mobile hamburger menu |
| ⚙ Settings | `Settings` | Admin settings |
| 👤 User | `User` | Admin profile |
| 🌙 Moon | `Moon` | Dark mode toggle |
| ☀ Sun | `Sun` | Light mode toggle |
| 🌐 Globe | `Globe` | Language switcher |
| ▸ Chevron right | `ChevronRight` | Expand, navigate forward |
| ▾ Chevron down | `ChevronDown` | Expand downward, dropdown |
| ✓ Check | `Check` | Success, selected |
| ⚠ Alert | `AlertTriangle` | Warning |
| ℹ Info | `Info` | Information |
| ➕ Plus | `Plus` | Add new item |
| ✏ Edit | `Pencil` | Edit item |
| 🗑 Delete | `Trash2` | Delete item |
| 📊 Dashboard | `LayoutDashboard` | Admin dashboard |
| 📦 Archive | `Archive` | Archive item |
| 🔄 Refresh | `RefreshCw` | Refresh/reload |
| 📥 Download | `Download` | Download/export |
| ⏱ Clock | `Clock` | Timestamps, history |
| 🏢 Building | `Building2` | Government agencies |
| 📁 Folder | `Folder` | Categories |
| 🔒 Lock | `Lock` | Protected/restricted |
| 📄 Document | `FileText` | Document/source |

### Icon Usage Guidelines

1. **Always pair with text** — Icons alone can be ambiguous. Use `aria-label` for icon-only buttons.
2. **Consistent sizing** — Use the size scale; don't mix arbitrary sizes.
3. **Don't colorize** randomly — Use semantic colors or inherit from text.
4. **Left placement** — Icons go before text labels (LTR languages).
5. **Stroke width** — Keep default 2px stroke. Don't modify.
6. **No emoji** — Use Lucide icons instead of emoji in the actual UI. Emoji in this document is for illustration only.

---

> [!NOTE]
> This design system document is a living document. As components are built and refined, specifications should be updated to match the implemented design. All color, spacing, and sizing values should be treated as guidelines that may be fine-tuned during development.
