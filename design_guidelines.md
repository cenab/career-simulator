# CareerSim Design Guidelines

## Design System

### Visual Foundation

**Aesthetic**: Character.ai-inspired dark-first interface with glass-morphism, card-centric browsing, and chat-native simulations.

**Color Palette**:
```css
--bg-base: #0B0D10
--bg-elevated: #111318
--border: #1D2128
--text-primary: #E9EDF1
--text-secondary: #A9B1BA
--text-muted: #76808A
--accent: #7B5CFF (purple) | #36B4A7 (teal)
```

**Typography** (Inter/Plus Jakarta Sans):
- H1: 32px/38px | H2: 24px/30px | H3: 18px/24px
- Body: 15px/22px | Caption: 12px/18px
- Use tabular numbers for metrics

**Spacing Scale**: 2, 4, 6, 8, 12, 16, 20, 24, 32 (Tailwind units)
- Cards: `p-6` | Sections: `py-12` to `py-20` | Gaps: `gap-4` to `gap-6`

**Border Radius**: 8px (chips) | 12px (cards/inputs) | 16px (panels) | 20px (hero)

**Shadows**:
- L1: `0 2px 10px rgba(0,0,0,.25)` (cards)
- L2: `0 10px 30px rgba(0,0,0,.35)` (modals)

**Grid**: 12-column, 24px gutters, max-width 1280px

**Breakpoints**: Mobile ≤640px | Tablet 641-1024px | Desktop ≥1025px

---

## Layout Structure

### App Shell

**Sidebar** (72px collapsed → 280px expanded):
- Nav: Create, Discover, Library, Workspace
- Bottom: Upgrade CTA + user menu
- Glass effect with backdrop blur

**Top Bar**: Search input + notifications/help/settings icons (sticky)

**Mobile**: Bottom tab bar (5 tabs: Discover, Create, Chat, Library, Profile)

**Content Canvas**: 24px padding (mobile), 32px (desktop)

---

## Components

### Scene Cards

**Sizes**: Small 224×140px | Medium 312×200px | Large 420×260px

**Structure**:
- Background image + gradient overlay (bottom 50%)
- Title (2-line clamp, bold)
- Creator chip (avatar + handle)
- Badges: Difficulty (color-coded: green/amber/red), Duration (clock icon), Mode, Skills (max 3 + "+X more")

**Hover** (180ms ease-out):
- Lift 4px + shadow increase
- Reveal actions: Preview • Save • Share • Start
- Gradient sweep animation

### Chat Interface

**Messages**:
- AI (left): elevated bg, 12px corners, avatar shown
- User (right): accent bg, rounded corners
- Timestamps below in muted text

**Composer**:
- Large textarea with tone chips (Neutral/Empathetic/Concise)
- Quick reply suggestions (horizontal scroll)
- Send button + mic icon + "Ask Coach" button

**Event Cards**: Full-width scene beat markers (distinct from messages)

### Carousels

**Hero**: 4-5 wide cards, snap scroll, pagination dots, auto-advance 8s (pause on hover)

**Category Rows**: 
- Header with "View all" link
- Horizontal snap scroll with edge fade shadows
- 4-5 cards (desktop), 1.5 (mobile)

### Modals

**Full-Screen Search** (`/search` route):
- 8-12px background blur
- Left column: Trending/Top/Recent
- Keyboard: ↑/↓ navigate, Enter select, Esc close

**Standard** (640px max-width):
- Centered, elevated surface, glass border
- Close button top-right

**Side Sheets** (400px desktop, full mobile):
- Slide from right (240ms)
- Sticky header with close

---

## Page Specifications

### Landing (Logged Out)

- **Hero**: Full-width gradient banner, H1 + "Try a Live Demo" CTA
- **Trust Row**: Grayscale logos (60% opacity)
- **Gallery**: 6-8 scene cards (3-col desktop, 1-col mobile)
- **How It Works**: 3 steps with icons, centered
- **Pricing**: 3-plan comparison
- **Footer**: Multi-column links + social

### Discover (`/home`)

- **Hero Carousel**: 4-5 featured scenes above fold
- **Rows**: "For You", "Popular This Week", "New Releases", category-based
- Horizontal scrolling cards per row

### Scene Detail (`/scene/:slug`)

**Hero**: 16:9 banner image/video

**Meta Bar**: Difficulty • Duration • Skills (3 max) • Mode • Rating • Plays

**CTA**: "Start Simulation" (large, accent, sticky)

**Actions**: Select Characters • Save • Share • Report

**Tabs** (sticky):
1. Overview (synopsis + objectives)
2. Roles & Characters (cards with traits)
3. Scoring & Feedback (rubric dimensions)
4. Reviews (ratings + stats)

**Right Sheet** (character selection):
- Role picker, difficulty, time limit slider
- Toggles: feedback mode, confidential mode
- Start button

### Chat/Simulation (`/chat/:sessionId`)

**Header**: Scene title + character avatars + timer + actions menu

**Conversation**: Auto-scroll, AI left, user right, event cards centered

**Right Panel** (360px, toggleable):
- Objectives checklist
- Live rubric meters (animated spring, 400ms)
- Private notes
- Branch map (collapsible)

**Summary Modal** (end session):
- Rubric scores with colored bars
- Evidence quotes (italic, indented)
- Strengths & Opportunities
- Actions: Replay • Save • Export PDF • Share

### Creator Wizard (`/create`)

**Stepper**: 7 steps (Concept → World → Roles → Flow → Feedback → Assets → Publish)

**Layout**: Single-column forms + persistent right preview panel

**Navigation**: Back/Next + Save Draft (ghost, top-right)

### Workspace (`/workspace`)

**Dashboard**:
- 4 KPI cards: Completion Rate, Avg Score, Active Assignments, Team Size
- 2-column: Recent Activity + Trending Scenes

**Analytics**:
- Filters: Team, Date Range, Scene, Skill
- Heatmap visualization
- Exportable tables

---

## Motion & Interaction

**Timing**:
- Hover: 180ms ease-out
- Modals: 240ms cubic-bezier
- Toasts: 120ms in, 4s hold, 240ms out
- Rubric meters: 400ms spring

**Effects**:
- Card hover: Lift 4px + gradient sweep
- Button hover: Raise 2px + brightness boost
- Search focus: Blur + scale 1.02
- Start simulation: Shared element transition (card → chat header)
- Typing: 3-dot pulsing
- High scores: Confetti (respect `prefers-reduced-motion`)

**Reduced Motion**: Disable all animations if `prefers-reduced-motion: reduce`

---

## Accessibility

- **Contrast**: 4.5:1 (body), 3:1 (large text)
- **Keyboard**: Full nav via Tab, Enter, Esc, Arrows
- **ARIA**: Proper roles for carousels, dialogs, live regions
- **Focus**: 2px accent outline on all interactive elements
- **Screen Readers**: Descriptive labels for icon buttons, live regions for streaming AI/scores

---

## Content Standards

**Voice**: Professional, approachable, constructive

**Examples**:
- Scene titles: "Crisis Manager: Vendor Breach"
- Meta format: "15m • Medium • Solo • Negotiation"
- Feedback: "Consider asking about X to clarify Y" (not "You did this wrong")
- Safety: "Professional mode active. Personal topics are filtered."

---

## Assets

**Images**: 16:9 hero banners, contextual scene thumbnails, abstract career illustrations

**Icons**: Heroicons (outline) via CDN

**Avatars**: Circular - 24px (small), 32px (standard), 48px (large); character avatars with colored borders

---

## Responsive Behavior

**Mobile**: Single column, bottom tabs, full-width cards, stacked meta, bottom drawers

**Tablet**: 2-column grids, icon-only sidebar (expand on hover), horizontal carousels

**Desktop**: Full sidebar, 3-4 column grids, right panels/sheets, advanced filters visible