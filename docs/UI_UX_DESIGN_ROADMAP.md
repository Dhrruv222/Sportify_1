# Sportify — UI/UX Design Roadmap

> **Complete page-by-page design spec with API endpoint mapping**
> Last updated: March 2026

---

## Table of Contents

1. [Project Context](#1-project-context)
2. [Design System & Tokens](#2-design-system--tokens)
3. [Information Architecture & Sitemap](#3-information-architecture--sitemap)
4. [Page Specifications](#4-page-specifications)
   - [4.1 Home / Landing Page](#41-home--landing-page)
   - [4.2 About Us](#42-about-us)
   - [4.3 Login](#43-login)
   - [4.4 Registration (Role Fork)](#44-registration-role-fork)
   - [4.5 Forgot Password](#45-forgot-password)
   - [4.6 Player Dashboard](#46-player-dashboard)
   - [4.7 Player Profile (Public View)](#47-player-profile-public-view)
   - [4.8 Player Profile Edit](#48-player-profile-edit)
   - [4.9 Club Dashboard](#49-club-dashboard)
   - [4.10 Club Profile](#410-club-profile)
   - [4.11 Player Search & Directory](#411-player-search--directory)
   - [4.12 Messages / Inbox](#412-messages--inbox)
   - [4.13 Conversation Thread](#413-conversation-thread)
   - [4.14 News Feed](#414-news-feed)
   - [4.15 News Article Detail](#415-news-article-detail)
   - [4.16 Social Feed](#416-social-feed)
   - [4.17 Shortlisted Players](#417-shortlisted-players)
   - [4.18 Fitpass Plans](#418-fitpass-plans)
   - [4.19 Fitpass Subscription & QR](#419-fitpass-subscription--qr)
   - [4.20 Account Settings](#420-account-settings)
   - [4.21 404 / Error Page](#421-404--error-page)
5. [Shared Components Library](#5-shared-components-library)
6. [API Endpoint ↔ Page Matrix](#6-api-endpoint--page-matrix)
7. [Implementation Phases](#7-implementation-phases)
8. [Mobile (Flutter) Parity Notes](#8-mobile-flutter-parity-notes)

---

## 1. Project Context

| Attribute | Detail |
|-----------|--------|
| **Product** | Sportify — Football talent scouting platform |
| **Web Stack** | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| **Mobile Stack** | Flutter (Dart) |
| **Backend** | Express.js, Prisma ORM, PostgreSQL |
| **API Base** | `/api/v1` |
| **Auth** | JWT (Bearer), Refresh tokens (Cookie), Google OAuth |
| **User Roles** | `PLAYER`, `CLUB`, `AGENT`, `SCOUT`, `COACH`, `FAN`, `COMPANY` |
| **Current Client State** | Bare Next.js template — no pages built yet |

---

## 2. Design System & Tokens

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#E63946` | Primary CTA buttons, active states, brand accent |
| `--color-primary-hover` | `#C62D39` | Hover state for primary actions |
| `--color-primary-light` | `#FDECED` | Light tint backgrounds, badges |
| `--color-white` | `#FFFFFF` | Page backgrounds, card surfaces |
| `--color-gray-50` | `#F9FAFB` | Subtle section backgrounds |
| `--color-gray-100` | `#F3F4F6` | Input backgrounds, dividers |
| `--color-gray-300` | `#D1D5DB` | Borders, disabled states |
| `--color-gray-500` | `#6B7280` | Secondary text, labels |
| `--color-gray-700` | `#374151` | Body text |
| `--color-gray-900` | `#111827` | Headings, primary text |
| `--color-dark` | `#1A1A2E` | Dark sections, footer bg |
| `--color-success` | `#10B981` | Positive metrics, confirmation |
| `--color-warning` | `#F59E0B` | Caution indicators |
| `--color-error` | `#EF4444` | Errors, validation failures |

### Typography

| Style | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| Display | Geist Sans | 48–64px | 700 | Hero headlines |
| H1 | Geist Sans | 36px | 700 | Page titles |
| H2 | Geist Sans | 28px | 600 | Section headings |
| H3 | Geist Sans | 22px | 600 | Card headings |
| Body | Geist Sans | 16px | 400 | Default text |
| Body Small | Geist Sans | 14px | 400 | Secondary info, table rows |
| Caption | Geist Sans | 12px | 400 | Labels, timestamps |
| Button | Geist Sans | 14–16px | 600 | CTAs |
| Code/Data | Geist Mono | 14px | 400 | Metric values, stats |

### Spacing Scale

`4px` / `8px` / `12px` / `16px` / `24px` / `32px` / `48px` / `64px` / `96px`

### Border Radii

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 4px | Tags, chips |
| `rounded-md` | 8px | Cards, inputs |
| `rounded-lg` | 12px | Panels, modals |
| `rounded-full` | 9999px | Avatars, pill buttons |

### Elevation

| Level | Shadow | Usage |
|-------|--------|-------|
| 0 | none | Flat elements |
| 1 | `0 1px 3px rgba(0,0,0,0.1)` | Cards, inputs |
| 2 | `0 4px 12px rgba(0,0,0,0.1)` | Dropdowns, popovers |
| 3 | `0 8px 24px rgba(0,0,0,0.12)` | Modals, dialogs |

---

## 3. Information Architecture & Sitemap

```
/                               ← Home / Landing + About Us
├── /login                      ← Login
├── /register                   ← Registration (Role Fork)
├── /forgot-password            ← Forgot Password
├── /news                       ← News Feed (public)
│   └── /news/[id]              ← News Article Detail
│
├── /dashboard                  ← Role-based redirect
│   ├── /dashboard/player       ← Player Dashboard
│   └── /dashboard/club         ← Club Dashboard
│
├── /profile                    ← Own profile (redirect by role)
│   └── /profile/edit           ← Edit own profile
│
├── /player/[id]                ← Public Player Profile
├── /club/[id]                  ← Public Club Profile
│
├── /search                     ← Player Search & Directory
│
├── /messages                   ← Inbox / Conversations list
│   └── /messages/[userId]      ← Conversation Thread
│
├── /shortlist                  ← Saved / Shortlisted Players
│
├── /social                     ← Social Feed
│
├── /fitpass                    ← Fitpass Plans
│   └── /fitpass/my             ← My Subscription & QR
│
├── /settings                   ← Account Settings
│   └── /settings/account       ← Account deletion
│
└── /404                        ← Not Found
```

**Navigation Model:**

| Element | Visible To | Items |
|---------|-----------|-------|
| **Public Navbar** | Unauthenticated | Logo, About, News, Login, Sign Up |
| **Player Sidebar/Nav** | `PLAYER` | Dashboard, My Profile, Messages, Social, Fitpass, News, Settings |
| **Club Sidebar/Nav** | `CLUB`, `SCOUT`, `COMPANY` | Dashboard, Search Players, Shortlist, Messages, News, Settings |
| **Common Footer** | All | About, Contact, Terms, Privacy, Social links |

---

## 4. Page Specifications

---

### 4.1 Home / Landing Page

**Route:** `/`
**Auth Required:** No
**Purpose:** First impression — communicate Sportify's value proposition

#### Layout Structure

```
┌────────────────────────────────────────────────────┐
│ NAVBAR: Logo │ About │ News │ Login │ [Sign Up btn] │
├────────────────────────────────────────────────────┤
│                                                    │
│  HERO SECTION                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │ "Connect Talent with Opportunity"             │  │
│  │ Subtext: short value proposition              │  │
│  │ [Get Started] [Learn More]                    │  │
│  │ Background: football field / action imagery   │  │
│  └──────────────────────────────────────────────┘  │
│                                                    │
│  PROBLEM SECTION                                   │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐           │
│  │ Icon    │  │ Icon    │  │ Icon    │           │
│  │ Fragmented│ │ Hidden  │  │ Time    │           │
│  │ Scouting │ │ Talent  │  │ Wasted  │           │
│  └─────────┘  └─────────┘  └─────────┘           │
│                                                    │
│  HOW IT WORKS (3o steps)                           │
│  ① Create Profile  ② Showcase Skills  ③ Get Found │
│                                                    │
│  VALUE SPLIT (Two-column)                          │
│  ┌────────────────┐  ┌────────────────┐           │
│  │ FOR PLAYERS    │  │ FOR CLUBS      │           │
│  │ • Showcase     │  │ • Discover     │           │
│  │ • Video upload │  │ • Filter/Sort  │           │
│  │ • Get noticed  │  │ • Data-driven  │           │
│  │ [Join as Player]│ │ [Join as Club] │           │
│  └────────────────┘  └────────────────┘           │
│                                                    │
│  STATS BAR                                         │
│  "500+ Players │ 50+ Clubs │ 10k+ Connections"    │
│                                                    │
│  CTA BANNER                                        │
│  "Ready to transform scouting?"  [Sign Up Free]   │
│                                                    │
│  FOOTER                                            │
└────────────────────────────────────────────────────┘
```

#### API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| None | Static page, no API calls |

#### Interaction Notes

- Hero CTA "Get Started" → `/register`
- "Learn More" → smooth-scroll to problem section
- Role-specific CTAs → `/register?role=player` or `/register?role=club`
- Responsive: single-column stacking on mobile
- Lazy-load images, optimize LCP with hero image priority

---

### 4.2 About Us

**Route:** `/` (embedded section) or `/about` (standalone)
**Auth Required:** No
**Purpose:** Explain the scouting gap and Sportify's solution

#### Content Blocks

1. **The Problem:** Current football scouting is fragmented — talent goes unnoticed because there's no centralized platform connecting players with clubs
2. **Our Solution:** Sportify provides a single hub where players showcase skills through video and data, and clubs discover talent through search and filters
3. **For Players:** Build a professional profile, upload highlights, track career history, get discovered
4. **For Clubs:** Advanced search filters, player metrics, direct messaging, shortlist management
5. **Team/Mission:** Brief mission statement

#### API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| None | Static content |

---

### 4.3 Login

**Route:** `/login`
**Auth Required:** No (redirect to `/dashboard` if already logged in)
**Purpose:** Authenticate existing users

#### Layout Structure

```
┌────────────────────────────────────────┐
│           SPORTIFY LOGO                │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │       Welcome Back               │  │
│  │                                  │  │
│  │  Email / Username                │  │
│  │  ┌────────────────────────────┐  │  │
│  │  │ john@example.com           │  │  │
│  │  └────────────────────────────┘  │  │
│  │                                  │  │
│  │  Password                        │  │
│  │  ┌────────────────────────────┐  │  │
│  │  │ ••••••••       [👁 toggle] │  │  │
│  │  └────────────────────────────┘  │  │
│  │                                  │  │
│  │  [Forgot Password?]      (link)  │  │
│  │                                  │  │
│  │  [        LOG IN         ] (btn) │  │
│  │                                  │  │
│  │  ──────── OR ────────            │  │
│  │                                  │  │
│  │  [🔵 Continue with Google] (btn) │  │
│  │                                  │  │
│  │  Don't have an account?          │  │
│  │  [Sign Up] (link)                │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

#### Form Validation

| Field | Rules |
|-------|-------|
| Email | Required, valid email format |
| Password | Required, min 8 characters |

#### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/auth/login` | POST | Authenticate with email + password |
| `/api/v1/auth/oauth/google` | GET | Initiate Google OAuth flow |
| `/api/v1/auth/oauth/callback` | GET | Handle Google OAuth callback |

#### State & Flow

- On success → store tokens, redirect to `/dashboard` (which then redirects by role)
- On error → inline error message below form ("Invalid credentials")
- Loading state on submit button (spinner, disable)
- Google OAuth opens popup or redirect flow

---

### 4.4 Registration (Role Fork)

**Route:** `/register`
**Auth Required:** No
**Purpose:** Onboard new users with role differentiation

#### Layout Structure — Step 1: Role Selection

```
┌─────────────────────────────────────────────┐
│            SPORTIFY LOGO                    │
│                                             │
│        "Join Sportify"                      │
│        "Choose how you want to get started" │
│                                             │
│   ┌──────────────┐    ┌──────────────┐     │
│   │   ⚽          │    │   🏟️         │     │
│   │              │    │              │     │
│   │  I'M A      │    │  I'M A       │     │
│   │  PLAYER     │    │  CLUB        │     │
│   │              │    │              │     │
│   │ Showcase     │    │ Discover top │     │
│   │ your talent  │    │ talent       │     │
│   │ and get      │    │ and build    │     │
│   │ discovered   │    │ your team    │     │
│   └──────────────┘    └──────────────┘     │
│                                             │
│   Additional roles (collapsible/link):      │
│   [Agent] [Scout] [Coach] [Fan] [Company]  │
│                                             │
│   Already have an account? [Login]          │
└─────────────────────────────────────────────┘
```

#### Layout Structure — Step 2: Registration Form

```
┌───────────────────────────────────────────┐
│          SPORTIFY LOGO                    │
│                                           │
│   Creating account as: [PLAYER] (chip)    │
│   [← Change role]                         │
│                                           │
│   Full Name                               │
│   ┌─────────────────────────────────────┐ │
│   │                                     │ │
│   └─────────────────────────────────────┘ │
│                                           │
│   Email Address                           │
│   ┌─────────────────────────────────────┐ │
│   │                                     │ │
│   └─────────────────────────────────────┘ │
│                                           │
│   Password          [strength indicator]  │
│   ┌─────────────────────────────────────┐ │
│   │                                     │ │
│   └─────────────────────────────────────┘ │
│                                           │
│   Confirm Password                        │
│   ┌─────────────────────────────────────┐ │
│   │                                     │ │
│   └─────────────────────────────────────┘ │
│                                           │
│   ☐ I agree to the Terms & Conditions     │
│   ☐ I consent to GDPR data processing     │
│                                           │
│   [       CREATE ACCOUNT        ] (btn)   │
│                                           │
│   ──────── OR ────────                    │
│   [🔵 Sign up with Google]                │
│                                           │
│   Already have an account? [Login]        │
└───────────────────────────────────────────┘
```

#### Conditional Fields by Role

| Role | Additional Fields |
|------|-------------------|
| `PLAYER` | Position, Dominant Foot, Height, Weight, Location |
| `CLUB` | Club Name, Description |
| `AGENT` | Agency Name |
| `SCOUT` | (Associated Club — optional) |
| `COACH` | (Current Club — optional) |
| `FAN` | None |
| `COMPANY` | Company Name, Industry |

#### Form Validation

| Field | Rules |
|-------|-------|
| Name | Required, 2–100 chars |
| Email | Required, valid email, unique |
| Password | Required, min 8 chars, 1 uppercase, 1 number |
| Confirm Password | Must match password |
| Terms | Must be checked |
| GDPR | Must be checked |
| Role | Must be selected |

#### Password Strength Indicator

| Strength | Criteria | Color |
|----------|----------|-------|
| Weak | < 8 chars | Red |
| Fair | 8+ chars, some variety | Orange |
| Strong | 8+ chars, upper + lower + number + special | Green |

#### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/auth/register` | POST | Create new user account |
| `/api/v1/auth/oauth/google` | GET | Google OAuth registration |

#### State & Flow

- Step 1 → role selection (cards), proceed to step 2
- Step 2 → form fill + conditional fields + submit
- On success → redirect to `/dashboard`
- On error → inline error messages per field
- Optional: query param `?role=player` pre-selects role from landing page CTAs

---

### 4.5 Forgot Password

**Route:** `/forgot-password`
**Auth Required:** No
**Purpose:** Password recovery flow

#### Layout

- Email input field
- "Send Reset Link" button
- Success state: "Check your email for reset instructions"
- Back to Login link

#### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| *Not yet implemented* | POST | Send password reset email |

> **Note:** This endpoint needs to be added to the Auth module.

---

### 4.6 Player Dashboard

**Route:** `/dashboard/player`
**Auth Required:** Yes (role: `PLAYER`)
**Purpose:** Player's central hub — manage profile, view stats, showcase videos

#### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ SIDEBAR          │  MAIN CONTENT                            │
│                  │                                           │
│ 🏠 Dashboard     │  Welcome back, {firstName}!              │
│ 👤 My Profile    │                                           │
│ 💬 Messages (3)  │  ┌─────────────────────────────────────┐ │
│ 📰 News          │  │  FEATURED VIDEO                     │ │
│ 👥 Social Feed   │  │  ┌─────────────────────────────┐    │ │
│ 🏋️ Fitpass       │  │  │                             │    │ │
│ ⚙️ Settings      │  │  │    ▶  Video Player          │    │ │
│                  │  │  │                             │    │ │
│                  │  │  └─────────────────────────────┘    │ │
│                  │  │  "Training Highlights - March 2026"  │ │
│                  │  └─────────────────────────────────────┘ │
│                  │                                           │
│                  │  VIDEO GALLERY                            │
│                  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│                  │  │thumb │ │thumb │ │thumb │ │ + Add│   │
│                  │  │  ▶   │ │  ▶   │ │  ▶   │ │ New  │   │
│                  │  └──────┘ └──────┘ └──────┘ └──────┘   │
│                  │                                           │
│                  │  PERFORMANCE METRICS                      │
│                  │  ┌──────────┐┌──────────┐┌──────────┐   │
│                  │  │ Right Leg ││ Accuracy  ││ Miss Pass│   │
│                  │  │   85%    ││   78%    ││   12%   │   │
│                  │  │ ████████ ││ ███████  ││ ██      │   │
│                  │  └──────────┘└──────────┘└──────────┘   │
│                  │                                           │
│                  │  CAREER HISTORY                           │
│                  │  ┌───────────────────────────────────┐   │
│                  │  │ ● 2024-now  FC Barcelona B        │   │
│                  │  │ │           Midfielder             │   │
│                  │  │ ● 2022-2024 Sporting CP Youth     │   │
│                  │  │ │           Midfielder             │   │
│                  │  │ ● 2020-2022 Local Academy          │   │
│                  │  └───────────────────────────────────┘   │
│                  │                                           │
│                  │  ACHIEVEMENTS                             │
│                  │  🏆 U21 Regional Champion 2023           │
│                  │  ⭐ Best Midfielder - Youth League        │
│                  │  [+ Add Achievement]                      │
│                  │                                           │
│                  │  QUICK STATS                              │
│                  │  Followers: 128 │ Profile Views: 1.2k    │
│                  │  Messages: 3 unread                       │
└─────────────────────────────────────────────────────────────┘
```

#### Component Breakdown

| Component | Description |
|-----------|-------------|
| **Profile Header** | Avatar, name, position, age, nationality, edit button |
| **Featured Video** | Large video player for highlighted clip |
| **Video Gallery** | Grid of thumbnails with play overlay; "+ Add" card for upload |
| **Metric Cards** | Three cards — Right Leg, Accuracy, Miss Pass — with progress bars or radial gauges |
| **Career Timeline** | Vertical timeline with club names, dates, position, achievements per entry |
| **Achievements** | Badge/tag list with icon + title; "Add Achievement" button |
| **Quick Stats Bar** | Followers count, profile views, unread messages |

#### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/profile/` | GET | Fetch player's own profile |
| `/api/v1/users/account` | GET | Fetch account details (photo, email) |
| `/api/v1/messages/unread-count` | GET | Badge count for messages |
| `/api/v1/social/followers` | GET | Follower count |
| `/api/v1/social/following` | GET | Following count |
| `/api/v1/profile/me` | PUT | Update profile (inline edits) |
| `/api/v1/profile/me/career` | POST | Add career entry |
| `/api/v1/profile/me/career/:id` | PUT | Update career entry |
| `/api/v1/profile/me/career/:id` | DELETE | Delete career entry |
| `/api/v1/profile/me/achivements` | POST | Add achievement |
| `/api/v1/profile/me/achivements/:id` | DELETE | Delete achievement |
| `/api/v1/profile/me/avatar` | POST | Get S3 upload URL for avatar |
| `/api/v1/users/avatar-url` | GET | Get S3 upload URL |
| `/api/v1/users/photos` | PUT | Save photo URL after upload |

---

### 4.7 Player Profile (Public View)

**Route:** `/player/[id]`
**Auth Required:** Yes (any role)
**Purpose:** Public-facing player portfolio for recruiters to evaluate

#### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│  COVER PHOTO BANNER                                 │
│  ┌──────────────────────────────────────────────┐   │
│  │                                              │   │
│  │            Cover image area                  │   │
│  │                                              │   │
│  │   ┌────┐                                     │   │
│  │   │ AV │  Player Name                        │   │
│  │   └────┘  Midfielder │ 22 yrs │ 🇵🇹 Portugal │   │
│  └──────────────────────────────────────────────┘   │
│                                                     │
│  [💬 Message] [⭐ Shortlist] [👤 Follow]             │
│                                                     │
│  ┌───────────────────┐  ┌────────────────────────┐  │
│  │ VIDEO SHOWCASE    │  │ SKILL METRICS          │  │
│  │ Featured video +  │  │ Right Leg: ████ 85%    │  │
│  │ Gallery grid      │  │ Accuracy:  ███  78%    │  │
│  │                   │  │ Miss Pass: █    12%    │  │
│  └───────────────────┘  │                        │  │
│                         │ Playing Style: Box-to- │  │
│  CAREER HISTORY         │ box midfielder         │  │
│  (timeline view)        │ Dom. Foot: Right       │  │
│                         │ Height: 181cm          │  │
│  ACHIEVEMENTS           │ Weight: 75kg           │  │
│  (badge list)           └────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

#### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/players/search` | GET | Fetch player data by ID (via search with filters) |
| `/api/v1/social/follow/:id` | POST | Follow this player |
| `/api/v1/social/unfollow/:id` | DELETE | Unfollow this player |
| `/api/v1/social/shortlist/saved/:playerId` | POST | Add to shortlist |
| `/api/v1/social/shortlist/saved/:playerId` | DELETE | Remove from shortlist |
| `/api/v1/messages/send/:userId` | POST | Open message to player |

> **Note:** A dedicated `GET /api/v1/players/:id` endpoint should be added for fetching a single player's full public profile.

---

### 4.8 Player Profile Edit

**Route:** `/profile/edit`
**Auth Required:** Yes (role: `PLAYER`)
**Purpose:** Edit personal info, skills, photos

#### Editable Sections

| Section | Fields | API |
|---------|--------|-----|
| **Avatar / Cover** | Photo upload via S3 presigned URL | `POST /profile/me/avatar`, `PUT /users/photos` |
| **Basic Info** | First name, last name, position, location, dominant foot, height, weight | `PUT /profile/me` |
| **Skills** | Right Leg, Accuracy, Miss Pass (JSON) | `PUT /profile/me` |
| **Playing Style** | Text description | `PUT /profile/me` |
| **Career History** | CRUD entries (club, position, dates) | `POST/PUT/DELETE /profile/me/career/:id` |
| **Achievements** | CRUD entries (title, description) | `POST/DELETE /profile/me/achivements/:id` |

#### UX Notes

- Inline editing where possible (click-to-edit fields)
- S3 upload: get presigned URL → upload directly to S3 → save URL to profile
- Unsaved changes warning on navigation away
- Success toast notification on save

---

### 4.9 Club Dashboard

**Route:** `/dashboard/club`
**Auth Required:** Yes (role: `CLUB`, `SCOUT`, `COMPANY`)
**Purpose:** Recruiter command center for discovering and evaluating players

#### Layout Structure

```
┌──────────────────────────────────────────────────────────────────┐
│ SIDEBAR          │  MAIN CONTENT                                 │
│                  │                                                │
│ 🏠 Dashboard     │  SEARCH BAR                                   │
│ 🔍 Search Players│  ┌──────────────────────────────────────────┐  │
│ ⭐ Shortlist      │  │🔍 Search by name, position, or club...  │  │
│ 👥 Employees     │  └──────────────────────────────────────────┘  │
│ 💬 Messages (2)  │                                                │
│ 📰 News          │  FILTER BAR                                   │
│ ⚙️ Settings      │  [Position ▾] [Age ▾] [Salary ▾] [Foot ▾]   │
│                  │  Active: [Midfielder ×] [18-25 ×]  [Clear All]│
│                  │                                                │
│                  │  ┌──────────────────────────────────────────┐  │
│                  │  │ PLAYER TABLE                             │  │
│                  │  │                                          │  │
│                  │  │ Photo│ Name    │ Pos  │ Age │ Accuracy  │  │
│                  │  │ ─────┼─────────┼──────┼─────┼────────── │  │
│                  │  │ [av] │ J.Silva │ MF   │ 22  │ 78%       │  │
│                  │  │ [av] │ M.Rossi │ FW   │ 19  │ 85%       │  │
│                  │  │ [av] │ K.Müller│ DF   │ 24  │ 72%       │  │
│                  │  │ ...                                      │  │
│                  │  │                                          │  │
│                  │  │ ← 1 2 3 ... 12 →   (pagination)         │  │
│                  │  └──────────────────────────────────────────┘  │
│                  │                                                │
│                  │  INSIGHTS SIDEBAR (right panel or below)       │
│                  │  ┌─────────────────┐  ┌─────────────────┐     │
│                  │  │ 📊 Avg Salary   │  │ 📈 Top Viewed   │     │
│                  │  │ Strikers: €45k  │  │ 1. Midfielders  │     │
│                  │  │ Midfield: €38k  │  │ 2. Forwards     │     │
│                  │  └─────────────────┘  └─────────────────┘     │
│                  │  ┌─────────────────┐  ┌─────────────────┐     │
│                  │  │ 👥 Your Team    │  │ ⭐ Shortlisted  │     │
│                  │  │ 12 employees    │  │ 8 players saved │     │
│                  │  └─────────────────┘  └─────────────────┘     │
└──────────────────────────────────────────────────────────────────┘
```

#### Player Table Columns

| Column | Sortable | Source |
|--------|----------|--------|
| Photo (thumbnail) | No | Player avatar |
| Name | Yes | `firstName` + `lastName` |
| Position | Yes | `position` |
| Age | Yes | Calculated from profile |
| Location | Yes | `location` |
| Dominant Foot | No | `dominantFoot` |
| Accuracy | Yes | `skills.accuracy` |
| Actions | No | [View Profile] [⭐ Shortlist] |

#### Filter Controls

| Filter | UI Element | Maps to Query Param |
|--------|-----------|-------------------|
| Position | Dropdown (multi-select) | `?position=MF` |
| Location | Dropdown or text input | `?location=Portugal` |
| Name | Search text input | `?name=Silva` |
| Dominant Foot | Toggle (Left / Right / Both) | `?dominantFoot=right` |
| Min Height | Slider or number input | `?height=175` |
| Max Weight | Slider or number input | `?weight=85` |

#### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/players/search` | GET | Search/filter players (with pagination cursor) |
| `/api/v1/company/employees` | GET | List club employees |
| `/api/v1/company/stats` | GET | Company/club statistics |
| `/api/v1/social/shortlist/saved` | GET | Get shortlisted players |
| `/api/v1/social/shortlist/saved/:playerId` | POST | Shortlist a player |
| `/api/v1/messages/unread-count` | GET | Unread message badge |

---

### 4.10 Club Profile

**Route:** `/club/[id]`
**Auth Required:** Yes (any role)
**Purpose:** Public-facing club information page

#### Layout

- Club name + logo
- Description
- Verified badge (if `isVerified`)
- Associated coaches & scouts count
- Employee count
- [Message] button
- [Follow] button

#### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/company/stats` | GET | Club stats |
| `/api/v1/company/employees` | GET | Employee list (if own club) |
| `/api/v1/social/follow/:id` | POST | Follow club |
| `/api/v1/messages/send/:userId` | POST | Message club |

> **Note:** A `GET /api/v1/clubs/:id` public endpoint should be added.

---

### 4.11 Player Search & Directory

**Route:** `/search`
**Auth Required:** Yes
**Purpose:** Full-page player search experience (standalone version of club dashboard table)

#### Layout

- Same filter system as Club Dashboard but full-width
- Card view toggle (grid) in addition to table view
- More filter options exposed
- URL-driven filters for shareable search links: `/search?position=FW&location=Spain`

#### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/players/search` | GET | Core search with all filters |
| `/api/v1/social/shortlist/saved/:playerId` | POST/DELETE | Shortlist toggle |

---

### 4.12 Messages / Inbox

**Route:** `/messages`
**Auth Required:** Yes (any role)
**Purpose:** View all conversations

#### Layout Structure

```
┌────────────────────────────────────────────────────┐
│  CONVERSATIONS LIST          │  THREAD (selected)  │
│                              │                     │
│  🔍 Search conversations     │  Player Name        │
│                              │  ──────────────     │
│  ┌────────────────────────┐  │  Them: Hey, I saw   │
│  │ [av] J. Silva          │  │  your highlights... │
│  │ Last msg preview  2h ⏱ │  │                     │
│  │ ● (unread indicator)   │  │  You: Thanks! I'm   │
│  ├────────────────────────┤  │  interested in...    │
│  │ [av] FC Barcelona      │  │                     │
│  │ We'd like to invit..  │  │  Them: Great, let's  │
│  ├────────────────────────┤  │  schedule a call     │
│  │ [av] M. Rossi          │  │                     │
│  │ Thanks for connecting  │  │  ┌───────────────┐  │
│  └────────────────────────┘  │  │ Type message...│  │
│                              │  │           [Send]│  │
│                              │  └───────────────┘  │
└────────────────────────────────────────────────────┘
```

#### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/messages/conversations` | GET | List all conversations |
| `/api/v1/messages/unread-count` | GET | Total unread badge |
| `/api/v1/messages/thread/:userId` | GET | Load conversation on select |
| `/api/v1/messages/read/:userId` | PUT | Mark as read when opening |
| `/api/v1/messages/send/:userId` | POST | Send new message |

#### UX Notes

- Split-panel layout on desktop; stack on mobile (list → thread)
- Real-time updates via polling (every 10s) or WebSocket (future)
- Unread indicator dot on conversation rows
- Timestamp formatting: "2h ago", "Yesterday", "Mar 15"
- Empty state: "No conversations yet. Find players to connect with."

---

### 4.13 Conversation Thread

**Route:** `/messages/[userId]`
**Auth Required:** Yes
**Purpose:** Full conversation view (mobile-first route)

Same as the right panel in 4.12, but as a standalone page for mobile navigation.

#### API Endpoints Used

Same as Messages section above.

---

### 4.14 News Feed

**Route:** `/news`
**Auth Required:** No (public)
**Purpose:** Browse published news articles

#### Layout Structure

```
┌────────────────────────────────────────────────┐
│  LATEST FOOTBALL NEWS                          │
│                                                │
│  ┌──────────────────────────────────────────┐  │
│  │ FEATURED ARTICLE (hero card)             │  │
│  │ [Image]                                  │  │
│  │ "Transfer Window: Top 10 Moves..."       │  │
│  │ March 25, 2026 │ 5 min read              │  │
│  └──────────────────────────────────────────┘  │
│                                                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ [thumb]  │ │ [thumb]  │ │ [thumb]  │      │
│  │ Title    │ │ Title    │ │ Title    │      │
│  │ Date     │ │ Date     │ │ Date     │      │
│  └──────────┘ └──────────┘ └──────────┘      │
│                                                │
│  [Load More]                                   │
└────────────────────────────────────────────────┘
```

#### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/news/` | GET | List published news |

---

### 4.15 News Article Detail

**Route:** `/news/[id]`
**Auth Required:** No
**Purpose:** Read a full news article

#### Layout

- Article title (H1)
- Published date + author
- Featured image
- Article body (rich text)
- Back to news link

#### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/news/:id` | GET | Fetch article by ID |

---

### 4.16 Social Feed

**Route:** `/social`
**Auth Required:** Yes
**Purpose:** Activity feed from followed users

#### Layout

- Feed of posts/updates from followed users and players
- Follow/unfollow actions
- Like and comment on videos

#### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/social/feed` | GET | Fetch social feed |
| `/api/v1/social/follow/:id` | POST | Follow user |
| `/api/v1/social/unfollow/:id` | DELETE | Unfollow user |
| `/api/v1/social/followers` | GET | View followers |
| `/api/v1/social/following` | GET | View following |

---

### 4.17 Shortlisted Players

**Route:** `/shortlist`
**Auth Required:** Yes (role: `SCOUT`, `CLUB`, `COMPANY`)
**Purpose:** Manage saved/bookmarked players

#### Layout

- Same table format as player directory
- Columns: Photo, Name, Position, Age, Location, Date Saved, Actions
- Actions: [View Profile] [Remove from Shortlist] [Message]
- Sort by date saved (default), name, position
- Empty state: "No saved players yet. Use the ⭐ button on player profiles to build your shortlist."

#### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/social/shortlist/saved` | GET | List all shortlisted players |
| `/api/v1/social/shortlist/saved/:playerId` | DELETE | Remove from shortlist |

---

### 4.18 Fitpass Plans

**Route:** `/fitpass`
**Auth Required:** No (view plans) / Yes (subscribe)
**Purpose:** Browse and subscribe to fitness plans

#### Layout Structure

```
┌────────────────────────────────────────────────────┐
│  FITNESS PLANS                                     │
│                                                    │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐    │
│  │  BASIC     │ │  PRO       │ │  ELITE     │    │
│  │            │ │  ★ POPULAR │ │            │    │
│  │  €9.99/mo  │ │  €19.99/mo │ │  €39.99/mo │    │
│  │            │ │            │ │            │    │
│  │  • Feature │ │  • Feature │ │  • Feature │    │
│  │  • Feature │ │  • Feature │ │  • Feature │    │
│  │  • Feature │ │  • Feature │ │  • Feature │    │
│  │            │ │            │ │            │    │
│  │ [Subscribe]│ │ [Subscribe]│ │ [Subscribe]│    │
│  └────────────┘ └────────────┘ └────────────┘    │
└────────────────────────────────────────────────────┘
```

#### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/fitpass/plans` | GET | List all plans |
| `/api/v1/fitpass/subscribe` | POST | Subscribe to a plan |

---

### 4.19 Fitpass Subscription & QR

**Route:** `/fitpass/my`
**Auth Required:** Yes
**Purpose:** View active subscription and QR code for gym check-in

#### Layout

- Current plan details (name, expiry date, status)
- QR code display (large, centered)
- "Check In" instructions
- Checkin history log
- [Upgrade Plan] and [Cancel] actions

#### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/fitpass/me/qr` | GET | Get QR code |
| `/api/v1/fitpass/checkin` | POST | Record check-in |

---

### 4.20 Account Settings

**Route:** `/settings`
**Auth Required:** Yes
**Purpose:** Manage account preferences

#### Sections

| Section | Fields | API |
|---------|--------|-----|
| **Profile Photo** | Upload/change avatar and cover | `PUT /users/photos` |
| **Account Info** | Email (read-only), role (read-only) | `GET /users/account` |
| **Security** | Change password | *Needs new endpoint* |
| **Notifications** | Email preferences | *Needs new endpoint* |
| **Danger Zone** | Delete account (with confirmation modal) | `DELETE /users/account/delete` |

#### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/users/account` | GET | Fetch account info |
| `/api/v1/users/avatar-url` | GET | Get upload URL |
| `/api/v1/users/photos` | PUT | Update photos |
| `/api/v1/users/account/delete` | DELETE | Delete account (requires confirmation) |
| `/api/v1/auth/logout` | POST | Logout action |
| `/api/v1/auth/refresh` | POST | Token refresh |

---

### 4.21 404 / Error Page

**Route:** `/404` (catch-all)
**Auth Required:** No

#### Layout

- Sportify logo
- "Page Not Found" message
- Illustration (football themed)
- [Go Home] button
- [Go Back] button

---

## 5. Shared Components Library

| Component | Used In | Description |
|-----------|---------|-------------|
| `<Navbar />` | All pages | Public vs authenticated variants |
| `<Sidebar />` | Dashboard pages | Role-specific nav (player vs club) |
| `<Footer />` | All pages | Links, social icons |
| `<PlayerCard />` | Search, Shortlist, Feed | Compact player info card |
| `<PlayerTable />` | Club Dashboard, Search | Sortable data table |
| `<FilterBar />` | Search, Club Dashboard | Dropdowns, sliders, chips |
| `<VideoPlayer />` | Player Dashboard, Profile | Embedded video playback |
| `<VideoGallery />` | Player Dashboard, Profile | Grid of video thumbnails |
| `<MetricCard />` | Player Dashboard, Profile | Progress bar / gauge for a stat |
| `<CareerTimeline />` | Player Dashboard, Profile | Vertical timeline of career |
| `<AchievementBadge />` | Player Dashboard, Profile | Icon + title badge |
| `<MessageThread />` | Messages | Conversation bubble list |
| `<ConversationItem />` | Messages | List row with avatar, preview, time |
| `<Avatar />` | Everywhere | Circular image with fallback initials |
| `<Button />` | Everywhere | Primary, secondary, ghost, danger variants |
| `<Input />` | Auth, Forms | Text, email, password with validation |
| `<Modal />` | Delete confirm, etc. | Overlay dialog |
| `<Toast />` | After actions | Success/error/info notifications |
| `<EmptyState />` | Lists, Tables | Illustration + message + CTA |
| `<LoadingSpinner />` | Everywhere | Consistent loading indicator |
| `<ProtectedRoute />` | Dashboard pages | Auth + role guard wrapper |
| `<PlanCard />` | Fitpass | Pricing plan display |
| `<QRCodeDisplay />` | Fitpass | QR code renderer |
| `<InsightCard />` | Club Dashboard | Stat/trend card with icon |
| `<NewsList />` | News, Dashboard | Article card grid |

---

## 6. API Endpoint ↔ Page Matrix

| API Endpoint | Method | Pages Using It |
|---|---|---|
| `POST /auth/register` | POST | Registration |
| `POST /auth/login` | POST | Login |
| `GET /auth/oauth/google` | GET | Login, Registration |
| `GET /auth/oauth/callback` | GET | Login, Registration (callback) |
| `POST /auth/refresh` | POST | All authenticated (interceptor) |
| `POST /auth/logout` | POST | Settings, Navbar |
| `GET /users/account` | GET | Settings, Dashboards |
| `GET /users/avatar-url` | GET | Profile Edit, Settings |
| `PUT /users/photos` | PUT | Profile Edit, Settings |
| `DELETE /users/account/delete` | DELETE | Settings |
| `GET /profile/` | GET | Player Dashboard, Profile |
| `PUT /profile/me` | PUT | Profile Edit |
| `POST /profile/me/avatar` | POST | Profile Edit |
| `POST /profile/me/career` | POST | Player Dashboard, Profile Edit |
| `PUT /profile/me/career/:id` | PUT | Player Dashboard, Profile Edit |
| `DELETE /profile/me/career/:id` | DELETE | Player Dashboard, Profile Edit |
| `POST /profile/me/achivements` | POST | Player Dashboard, Profile Edit |
| `DELETE /profile/me/achivements/:id` | DELETE | Player Dashboard, Profile Edit |
| `GET /players/search` | GET | Club Dashboard, Player Search, Shortlist |
| `GET /company/employees` | GET | Club Dashboard, Club Profile |
| `POST /company/employees` | POST | Club Dashboard (manage team) |
| `DELETE /company/employees/:id` | DELETE | Club Dashboard (manage team) |
| `GET /company/stats` | GET | Club Dashboard, Club Profile |
| `POST /messages/send/:userId` | POST | Messages, Player Profile |
| `GET /messages/thread/:userId` | GET | Messages (thread view) |
| `PUT /messages/read/:userId` | PUT | Messages (on open) |
| `GET /messages/conversations` | GET | Messages (inbox) |
| `GET /messages/unread-count` | GET | Navbar badge, Dashboards |
| `POST /social/follow/:id` | POST | Player Profile, Social Feed |
| `DELETE /social/unfollow/:id` | DELETE | Player Profile, Social Feed |
| `GET /social/followers` | GET | Dashboard, Profile |
| `GET /social/following` | GET | Dashboard, Social Feed |
| `GET /social/feed` | GET | Social Feed |
| `POST /social/shortlist/saved/:playerId` | POST | Player Profile, Search, Club Dashboard |
| `DELETE /social/shortlist/saved/:playerId` | DELETE | Shortlist, Player Profile |
| `GET /social/shortlist/saved` | GET | Shortlist, Club Dashboard |
| `GET /news/` | GET | News Feed, Dashboard insights |
| `GET /news/:id` | GET | News Article Detail |
| `GET /fitpass/plans` | GET | Fitpass Plans |
| `POST /fitpass/subscribe` | POST | Fitpass Plans |
| `GET /fitpass/me/qr` | GET | Fitpass Subscription |
| `POST /fitpass/checkin` | POST | Fitpass QR (partner use) |

---

## 7. Implementation Phases

### Phase 1 — Foundation (Week 1–2)

| Priority | Task | Route(s) |
|----------|------|----------|
| P0 | Design system setup (colors, typography, spacing in Tailwind config) | Global |
| P0 | Shared components: `Navbar`, `Footer`, `Button`, `Input`, `Avatar`, `Toast`, `Modal` | Global |
| P0 | Auth context/provider (token storage, refresh interceptor, role guards) | Global |
| P0 | `ProtectedRoute` wrapper component | Global |
| P0 | Home / Landing Page | `/` |
| P0 | Login Page | `/login` |
| P0 | Registration Page (with role fork) | `/register` |

**API Integration:**
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/oauth/google` + callback
- `POST /auth/refresh`
- `POST /auth/logout`

---

### Phase 2 — Player Experience (Week 3–4)

| Priority | Task | Route(s) |
|----------|------|----------|
| P0 | Player Dashboard | `/dashboard/player` |
| P0 | Player Profile (public view) | `/player/[id]` |
| P1 | Player Profile Edit | `/profile/edit` |
| P1 | Video Gallery + Player components | Shared |
| P1 | Career Timeline component | Shared |
| P1 | Metric Cards (Right Leg, Accuracy, Miss Pass) | Shared |

**API Integration:**
- `GET /profile/`
- `PUT /profile/me`
- `POST/PUT/DELETE /profile/me/career/:id`
- `POST/DELETE /profile/me/achivements/:id`
- `POST /profile/me/avatar`
- `GET /users/account`
- `PUT /users/photos`

---

### Phase 3 — Club Experience (Week 5–6)

| Priority | Task | Route(s) |
|----------|------|----------|
| P0 | Club Dashboard | `/dashboard/club` |
| P0 | Player Search/Directory | `/search` |
| P0 | Player Table + Filter Bar components | Shared |
| P1 | Club Profile (public) | `/club/[id]` |
| P1 | Shortlisted Players page | `/shortlist` |
| P1 | Insight Cards | Shared |

**API Integration:**
- `GET /players/search` (with all filter params)
- `GET /company/employees`
- `GET /company/stats`
- `GET/POST/DELETE /social/shortlist/saved`

---

### Phase 4 — Communication (Week 7)

| Priority | Task | Route(s) |
|----------|------|----------|
| P0 | Messages Inbox | `/messages` |
| P0 | Conversation Thread | `/messages/[userId]` |
| P1 | Unread badge in navbar | Navbar |

**API Integration:**
- `GET /messages/conversations`
- `GET /messages/thread/:userId`
- `POST /messages/send/:userId`
- `PUT /messages/read/:userId`
- `GET /messages/unread-count`

---

### Phase 5 — Content & Social (Week 8)

| Priority | Task | Route(s) |
|----------|------|----------|
| P1 | News Feed | `/news` |
| P1 | News Article Detail | `/news/[id]` |
| P1 | Social Feed | `/social` |
| P2 | Follow/Unfollow interactions | Various |

**API Integration:**
- `GET /news/`
- `GET /news/:id`
- `GET /social/feed`
- `POST /social/follow/:id`
- `DELETE /social/unfollow/:id`

---

### Phase 6 — Extras & Polish (Week 9–10)

| Priority | Task | Route(s) |
|----------|------|----------|
| P1 | Fitpass Plans | `/fitpass` |
| P1 | Fitpass Subscription & QR | `/fitpass/my` |
| P1 | Account Settings | `/settings` |
| P2 | Forgot Password | `/forgot-password` |
| P2 | 404 / Error Page | `/404` |
| P2 | Dark mode support | Global |
| P2 | Mobile responsiveness audit | All pages |
| P2 | Loading skeletons & empty states | All pages |
| P2 | SEO metadata per page | All pages |

---

## 8. Mobile (Flutter) Parity Notes

The Flutter app (`mobile/`) should mirror the web experience with native UI patterns:

| Web Page | Flutter Screen | Notes |
|----------|---------------|-------|
| `/` Landing | Onboarding carousel | 3–4 slides instead of scrollable landing |
| `/login` | Login screen | Same fields, native keyboard types |
| `/register` | Multi-step registration | Stepper/page-view for role → form |
| `/dashboard/player` | Player home tab | Bottom navigation instead of sidebar |
| `/dashboard/club` | Club home tab | Bottom navigation |
| `/player/[id]` | Player detail screen | Push navigation from search |
| `/search` | Search tab | Native filter sheet (bottom sheet) |
| `/messages` | Messages tab | Native list → detail push navigation |
| `/news` | News tab | Card list with pull-to-refresh |
| `/fitpass` | Fitpass tab | Plan cards with native payment flow |
| `/settings` | Settings screen | Native grouped list style |

**Bottom Navigation Tabs (Player):** Home, Social, Messages, News, Profile
**Bottom Navigation Tabs (Club):** Home, Search, Shortlist, Messages, Profile

---

## Missing API Endpoints (Recommended Additions)

| Endpoint | Method | Purpose | Needed For |
|----------|--------|---------|------------|
| `GET /players/:id` | GET | Fetch single player public profile | Player Profile page |
| `GET /clubs/:id` | GET | Fetch single club public profile | Club Profile page |
| `POST /auth/forgot-password` | POST | Request password reset | Forgot Password page |
| `POST /auth/reset-password` | POST | Reset password with token | Reset Password page |
| `PUT /auth/change-password` | PUT | Change password (authenticated) | Settings page |
| `GET /users/notifications` | GET | Notification preferences | Settings page |
| `PUT /users/notifications` | PUT | Update notification prefs | Settings page |
| `GET /players/:id/videos` | GET | List player videos | Player Profile page |
| `POST /players/:id/videos` | POST | Upload video metadata | Player Dashboard |
| `DELETE /players/:id/videos/:videoId` | DELETE | Delete a video | Player Dashboard |
| `GET /analytics/dashboard` | GET | Club insights data | Club Dashboard insights |

---

*This roadmap is the single source of truth for UI/UX development. Update it as designs are finalized and endpoints are implemented.*
