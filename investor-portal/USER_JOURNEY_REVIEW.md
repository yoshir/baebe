# Investor Portal - User Journey Review

**Date:** 2025-11-12  
**Version:** v.20251112-2018

## Overview

This document reviews the complete user journey through the investor portal, identifying flow, access control, and potential improvements.

---

## Entry Point: Landing Page (`/`)

### User Flow:
1. **Initial State:**
   - User lands on `/`
   - Terminal window appears with typing animation
   - Animation types out company messaging (~30 seconds)
   - Form appears after animation completes

2. **Email Collection:**
   - User enters name and email
   - Can click "→ View First IP: BAEBE" link (goes to `/ip-pitch`)
   - On submit: Stores name/email in localStorage, redirects to `/portal`

3. **Access Control:**
   - If user already has name/email in localStorage → auto-redirects to `/portal`
   - No access required for initial landing

### Issues/Improvements:
- ✅ Good: Terminal aesthetic creates engaging first impression
- ✅ Good: Email collection is simple and non-intrusive
- ⚠️ **Issue:** Link to `/ip-pitch` uses `<a href>` instead of Next.js `Link` - should use `Link` for client-side navigation
- 💡 **Suggestion:** Could add a "Skip animation" button for returning users

---

## Main Portal Hub (`/portal`)

### User Flow:
1. **Access Check:**
   - Verifies name/email in localStorage
   - If missing → redirects to `/`
   - Displays personalized welcome with name

2. **Navigation Options:**
   - **READ INITIAL PITCH** → `/pitch` (free access)
   - **VIEW FIRST IP: BAEBE** → `/ip-pitch` (free preview)
   - **PURCHASE ACCESS** → `/purchase-access` (paid tiers)
   - **ENTER ACCESS CODE** → `/enter-code` (if already purchased)
   - **INVESTOR SIGNUP** → `/signup` (registration + NDA)
   - **BOOK CALL** → `/book-call` (schedule meeting)
   - **LETTER OF INTENT** → `/loi` (gets in line)
   - **TERM SHEET** → `/term-sheet` (priority processing)

3. **Visual Hierarchy:**
   - Warning banner about restricted access
   - Terminal command line aesthetic
   - Clear card-based navigation

### Issues/Improvements:
- ✅ Good: Clear access control
- ✅ Good: All navigation paths visible
- ✅ Good: Visual distinction for Term Sheet (yellow highlighting)
- ⚠️ **Issue:** Back link in `/ip-pitch` goes to `/` instead of `/portal` - should be consistent
- 💡 **Suggestion:** Could add breadcrumbs or "Back to Portal" link on all pages

---

## IP Pitch Preview (`/ip-pitch`)

### User Flow:
1. **No Access Required:**
   - Anyone can view this page
   - Shows terminal window with BAEBE pseudo-code
   - Typing animation displays IP structure

2. **Navigation:**
   - Link back to portal (currently goes to `/` - should go to `/portal`)

### Issues/Improvements:
- ✅ Good: Engaging preview of IP
- ✅ Good: Terminal aesthetic matches landing page
- ⚠️ **Issue:** Back link goes to `/` instead of `/portal`
- 💡 **Suggestion:** Could add CTA to purchase access or sign NDA after viewing

---

## Pitch Content (`/pitch`)

### User Flow:
1. **Access Check:**
   - Requires name/email (redirects to `/` if missing)
   - Checks for paid access level in localStorage

2. **Content Tabs:**
   - **Initial Pitch:** Always available (free)
   - **Full Pitch:** Requires paid access (accessLevel >= 1)
   - **FAQ:** Requires paid access (accessLevel >= 1)

3. **Default Behavior:**
   - If has paid access → shows Full Pitch tab by default
   - If no paid access → shows Initial Pitch tab

4. **CTAs:**
   - If viewing Initial Pitch without paid access → shows "Purchase Access" and "Sign Up as Investor" buttons
   - If has paid access → shows "Sign NDA & Access IP" and "Book a Call" buttons

### Issues/Improvements:
- ✅ Good: Clear access control
- ✅ Good: Progressive disclosure (free → paid)
- ✅ Good: Multiple CTAs based on access level
- ⚠️ **Issue:** Back link goes to `/` instead of `/portal`
- 💡 **Suggestion:** Could add "Upgrade to see Full Pitch" banner when viewing Initial Pitch

---

## Investor Signup (`/signup`)

### User Flow:
1. **Registration Form:**
   - Collects investor information (name, email, company, title, etc.)
   - Investment amount and type selection
   - Phone and LinkedIn optional

2. **NDA Section:**
   - Expandable NDA view
   - Checkbox acceptance required
   - Clear explanation of what's protected (Entertainment IP) vs. what's not (Company Info)

3. **Submission:**
   - On submit → shows success page
   - Options to return to portal or book a call

### Issues/Improvements:
- ✅ Good: Comprehensive form
- ✅ Good: Clear NDA explanation
- ✅ Good: Success state with next steps
- ⚠️ **Issue:** Back link goes to `/` instead of `/portal`
- 💡 **Suggestion:** Could pre-fill name/email from localStorage if available

---

## Purchase Access (`/purchase-access`)

### User Flow:
1. **Tier Selection:**
   - 4 tiers displayed: Explorer ($99), Insider ($499), Partner ($1,999), Strategic ($9,999)
   - Click tier to select
   - Click "Purchase Access" button

2. **Processing:**
   - Simulates payment (2 second delay)
   - Generates access code
   - Stores in localStorage (accessCode, accessTier, accessLevel)

3. **Success State:**
   - Shows access code
   - Options to return to portal or access protected content

### Issues/Improvements:
- ✅ Good: Clear tier structure
- ✅ Good: Visual feedback on selection
- ⚠️ **Issue:** Payment is simulated - needs real payment integration
- ⚠️ **Issue:** Access codes are generated client-side - should be server-side for security
- 💡 **Suggestion:** Could add "What you get" comparison table
- 💡 **Suggestion:** Could show "Most Popular" badge on a tier

---

## Enter Access Code (`/enter-code`)

### User Flow:
1. **Code Entry:**
   - Input field for access code
   - Auto-uppercases input
   - Validates code format

2. **Validation:**
   - Checks code against access tiers
   - If valid → stores in localStorage and redirects to `/protected`
   - If invalid → shows error message

3. **Fallback:**
   - Link to purchase access if no code

### Issues/Improvements:
- ✅ Good: Simple, clear interface
- ✅ Good: Helpful error messages
- ⚠️ **Issue:** Code validation is client-side - should be server-side
- ⚠️ **Issue:** Back link goes to `/` instead of `/portal`
- 💡 **Suggestion:** Could add "Paste code" button for convenience

---

## Letter of Intent (`/loi`)

### User Flow:
1. **Form Completion:**
   - Investor information
   - Investment terms (amount, type, timeline)
   - Proposed terms and conditions

2. **Generation:**
   - Generates LOI document
   - Shows preview in terminal-style format
   - Download button available

3. **Priority Notice:**
   - Yellow banner explaining LOI vs. Term Sheet
   - Link to Term Sheet page for faster processing

### Issues/Improvements:
- ✅ Good: Comprehensive form
- ✅ Good: Clear priority messaging
- ✅ Good: Download functionality
- ⚠️ **Issue:** Back link goes to `/` instead of `/portal`
- 💡 **Suggestion:** Could add email submission option
- 💡 **Suggestion:** Could add signature field or DocuSign integration

---

## Term Sheet (`/term-sheet`)

### User Flow:
1. **Form Completion:**
   - More detailed than LOI
   - Investment terms, valuation, equity percentage
   - Investor rights (pro rata, information, co-sale, drag-along)
   - Board seats, liquidation preference, anti-dilution

2. **Generation:**
   - Generates comprehensive term sheet
   - Yellow highlighting emphasizes priority processing
   - Download button available

3. **Priority Messaging:**
   - Multiple mentions of priority processing benefits
   - Clear differentiation from LOI

### Issues/Improvements:
- ✅ Good: Comprehensive term sheet generation
- ✅ Good: Strong priority messaging
- ✅ Good: Visual distinction (yellow highlighting)
- ⚠️ **Issue:** Back link goes to `/` instead of `/portal`
- 💡 **Suggestion:** Could add email submission option
- 💡 **Suggestion:** Could add signature field or DocuSign integration

---

## Book Call (`/book-call`)

### User Flow:
1. **Form Completion:**
   - Contact information
   - Call type selection (investment, IP review, partnership, general)
   - Date, time, timezone selection
   - Additional notes

2. **Submission:**
   - Shows success state
   - Options to return to portal or create LOI

### Issues/Improvements:
- ✅ Good: Simple booking form
- ✅ Good: Success state with next steps
- ⚠️ **Issue:** Back link goes to `/` instead of `/portal`
- ⚠️ **Issue:** No calendar integration - needs real booking system
- 💡 **Suggestion:** Could integrate with Calendly or similar
- 💡 **Suggestion:** Could show available time slots based on calendar

---

## Protected Content Hub (`/protected`)

### User Flow:
1. **Access Check:**
   - Requires accessLevel and accessTier in localStorage
   - If missing → redirects to `/enter-code`

2. **Tier Display:**
   - Shows all 4 tiers
   - Indicates which tier user has access to
   - Shows upgrade options for locked tiers

3. **Content Links:**
   - Based on access level, shows links to:
     - IP Preview (Insider+)
     - Full IP Review (Partner+)
     - Financials (Partner+)
     - Strategic Portal (Strategic)

### Issues/Improvements:
- ✅ Good: Clear tier structure
- ✅ Good: Visual access indicators
- ✅ Good: Upgrade prompts for locked content
- ⚠️ **Issue:** Back link goes to `/` instead of `/portal`
- 💡 **Suggestion:** Could add "Your Access" summary card at top

---

## Protected Content Pages

### `/protected/ip-preview` (Insider+)
- Shows IP preview content
- Requires NDA acceptance

### `/protected/full-ip` (Partner+)
- Shows full IP content
- Requires NDA acceptance

### `/protected/financials` (Partner+)
- Shows financial projections
- Requires paid access

### `/protected/strategic` (Strategic)
- Shows strategic partnership content
- Requires highest tier access

### `/protected/ip-excerpt` (All paid tiers)
- Shows IP excerpt
- Requires NDA acceptance

### Issues/Improvements:
- ⚠️ **Issue:** Need to verify these pages exist and have proper access control
- 💡 **Suggestion:** Should all have consistent back navigation to `/portal` or `/protected`

---

## Overall User Journey Flow

### Primary Paths:

**Path 1: Free Exploration**
1. `/` → Landing page, enter email
2. `/portal` → Main hub
3. `/pitch` → Read initial pitch (free)
4. `/ip-pitch` → Preview IP
5. `/signup` → Register as investor (optional)
6. `/book-call` → Schedule call (optional)

**Path 2: Paid Access**
1. `/` → Landing page, enter email
2. `/portal` → Main hub
3. `/purchase-access` → Buy access tier
4. `/protected` → View protected content
5. `/signup` → Sign NDA to access IP
6. `/protected/ip-excerpt` → View IP

**Path 3: Investment Intent**
1. `/` → Landing page, enter email
2. `/portal` → Main hub
3. `/pitch` → Read pitch
4. `/loi` OR `/term-sheet` → Generate investment document
5. `/book-call` → Schedule call
6. `/signup` → Complete registration

---

## Critical Issues to Fix

1. **Navigation Consistency:**
   - All "Back" links should go to `/portal` instead of `/`
   - Use Next.js `Link` component instead of `<a href>` for client-side navigation

2. **Access Code Security:**
   - Access code validation should be server-side
   - Code generation should be server-side

3. **Payment Integration:**
   - Replace simulated payment with real payment processor (Stripe, etc.)

4. **Calendar Integration:**
   - Replace simulated booking with real calendar system (Calendly, etc.)

5. **Form Pre-filling:**
   - Pre-fill name/email from localStorage where applicable

---

## Recommendations for Enhancement

1. **Breadcrumbs:**
   - Add breadcrumb navigation on all pages
   - Shows: Portal > Current Page

2. **Progress Indicators:**
   - Show user's progress through the investment funnel
   - "You've completed: Email → Pitch → Signup → LOI"

3. **Email Integration:**
   - Send confirmation emails for signups, LOIs, term sheets
   - Email access codes instead of showing on screen

4. **Analytics:**
   - Track which pages users visit
   - Track conversion funnel (landing → pitch → signup → LOI)

5. **Mobile Optimization:**
   - Ensure all forms work well on mobile
   - Test terminal aesthetic on small screens

---

## Summary

The user journey is well-structured with clear access control and progressive disclosure. The main issues are:
- Navigation consistency (back links)
- Security (client-side code validation)
- Integration (payment, calendar, email)

The flow supports multiple user paths (free exploration, paid access, investment intent) and provides clear CTAs at each stage.









