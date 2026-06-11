---
title: "watchroll.com"
topic: "Hobbies & Interests"
summary: "www.watch-roll.com(http://www.watch-roll.com)"
---

[www.watch-roll.com](http://www.watch-roll.com)

We’re developing Watchroll, a consumer-facing web app for the luxury watch market.

---

WHAT WATCHROLL IS

Watchroll gamifies consumer intelligence in the watch market. It lets users discover and organise their watch preferences through intuitive swiping and "This or That" comparisons — similar to dating app mechanics — while silently building a taste profile in the background. That profile data is the product.

The business sits between consumers and dealers. We do not compete with Chrono24, eBay, or brick-and-mortar dealers. We complement them — by understanding what consumers actually want before they walk into a shop or search a listing.

Two users, one platform:

- Consumer — discovers watches, swipes, saves, builds a taste profile, gets personalised suggestions and listings
    
- Dealer / B2B — receives anonymised, aggregated consumer preference data and market intelligence reports (paid feature)
    

The core loop: Swipe → taste profile builds → suggestions improve → periodic reports generated → listings surfaced → dealer intelligence fed

---

WHAT'S ALREADY BUILT (in the attached HTML file)

- Full single-page app, mobile-first, max-width 420px
    
- Header — "watchroll" logo (Fraunces serif, italic treatment), top nav: Discover / Saved / Profile
    
- Discover panel with 4 modes:
    

- For you — swipeable cards, infinite loop, shuffled
    
- This or That — 2-up comparison, tap to choose, auto-advances after 700ms, progress dots, insight flash
    
- Independents — surfaces F.P. Journe, H. Moser, MB&F, Czapek, Voutilainen, De Bethune
    
- Expand taste — niche, microbrands, independents with curator's note explaining why we're showing it
    

- Swipe cards — pastel tinted backgrounds per watch, SVG illustrated watch face, brand/name/origin/tier/tags, price pill, "Pass" / "Love it" stamp on drag
    
- Ticker bar — updates live with swipe count and top affinity
    
- Profile strip — scrollable pills showing top style and tier affinities, updates per swipe
    
- Saved panel — 2-column grid of saved watches with SVG thumbnails
    
- Profile panel — swipe/liked/saved stats, style affinity bars, brand tier bars, monthly report block (AI-powered, paid feature CTA), suggested listings (matched by top style)
    
- Always-visible bottom action bar — 3 buttons, solid filled circles, white SVG icons: red ✕ (Pass), green ♥ (Love it, largest, centre), blue bookmark (Save). Never hidden, never replaced regardless of which panel is active
    
- Taste engine — every swipe and This or That tap scores style and tier silently. Scores feed profile bars, ticker, suggestions, and report generation
    

Watch catalogue includes:

- Mainstream: Rolex, Patek Philippe, AP, Tudor, Grand Seiko, IWC, Vacheron, Lange
    
- Independents: F.P. Journe, H. Moser, MB&F, Czapek, Voutilainen, De Bethune
    
- Microbrands/Niche: Baltic, Kurono Tokyo, Farer, Massena LAB, Yema, Ming, Seiko Prospex, Akrivia
    
- And of course more that arent listed here
    

---

DESIGN LANGUAGE

- Fonts: Fraunces (serif, display, editorial) + Geist (sans, UI text)
    
- Palette: warm off-whites (#F7F5F2 background, #fff cards), sandy neutrals, muted pastels per watch card. No loud colours except the 3 action buttons
    
- Action buttons: Red #FF6B6B, Green #4CD98A, Blue #6BB8F0 — solid fills, white icons, drop shadows, always visible
    
- Cards: 20px border radius, pastel tinted image area, white body section
    
- Tone: minimal, editorial, Hodinkee-adjacent. Clean without being cold. Confident without being loud
    
- No dark mode needed at this stage
    

---

WHAT NEEDS BUILDING NEXT (priority order)

1. Onboarding flow — 2-3 screen intro explaining the value exchange before first swipe. Should feel like a magazine, not an app store screenshot
    
2. Real watch images — replace SVG illustrations with actual watch photography. Source from brand press assets or approved image APIs
    
3. Expanded catalogue — more watches across all tiers, especially microbrands and Asian independents (Ming, Ochs und Junior, Hajime Asaoka, Kudoke)
    
4. User sessions — anonymous session ID stored in localStorage so taste profile persists across visits without requiring login
    
5. Backend connection — Node.js + Postgres (or Supabase) for storing anonymised preference data at scale
    
6. Dealer dashboard — separate view (or subdomain) showing aggregated consumer data: top styles this week, price tier breakdown, brand heat map, AI-generated plain-English insight
    
7. Listings integration — affiliate links to Chrono24, Watchfinder, eBay listings matched to user's top affinities
    
8. Monthly report — PDF or web report generated from taste profile, locked behind a subscription (paid feature)
    
9. This or That expansion — more comparison scenarios, 4-up grids for style comparisons, and use accumulated profile data to make later comparisons more targeted
    

---

TECHNICAL CONSTRAINTS & DECISIONS

- Deploying on Vercel (static first, serverless functions when backend needed)
    
- Custom domain will be pointed at Vercel
    
- No user login in v1 — anonymous sessions only
    
- Mobile-first, desktop works but not the priority
    
- No React framework — vanilla HTML/CSS/JS for now to keep it fast and simple to iterate
    
- Backend when needed: Node.js + Supabase (Postgres) — not built yet
    
- Keep everything in a single index.html for as long as possible
    

---

TONE & PRODUCT PHILOSOPHY

Watchroll is the bridge between AI and its actual application, specifically for the luxury watch industry, which is full of traditional players and since nobody is filling this gap yet.

The consumer product is free and genuinely useful. The dealer intelligence layer is where the business model lives. We are not competing with dealers but rather giving them something they've never had: real consumer preference data before the purchase decision is made.

Every design decision should feel considered. Nothing generic. This is a product for people with taste, it should have taste itself.

---

INSTRUCTIONS FOR YOU

1. Read the attached index.html carefully — that is the current state of the prototype
2. Do not rebuild from scratch — continue from what exists
3. Ask me which of the priority items above to tackle first
4. Maintain the exact design language, font choices, colour palette, and UX patterns already established
5. The bottom action bar (red/green/blue buttons) must always be visible on every panel — this is non-negotiable and has been a recurring fix
6. Keep the codebase in a single index.html until explicitly told otherwise
