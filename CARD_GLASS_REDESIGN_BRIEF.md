# CONTEXT BRIEF — Card Redesign: Glass Effect & Animations

Repo root: `C:\Users\MAXWELL\Documents\Projects\Heliac\Heliacenergii` · Branch: `dev`

---

## 1. OBJECTIVE

Redesign all card components across the project to use the existing glass effect system and animation patterns. The project already has a polished glass aesthetic (via `GlassPanel`, `MobileMenu`, `ToastCard`, `BrochureButton`) but most content cards still use solid `bg-white dark:bg-blacksection` backgrounds. The goal is to bring every card into the same visual language: translucent glass, backdrop blur, gradient overlays, edge highlights, and smooth framer-motion animations.

---

## 2. CURRENT STATE — Glass System Audit

### 2.1 The GlassPanel primitive (the foundation)

**File:** `components/Common/GlassPanel.tsx` (46 lines)

```tsx
interface GlassPanelProps {
  tint?: string;        // e.g. "from-primaryho/25"
  density?: "float" | "read";
  className?: string;
  children: React.ReactNode;
}

const densityClasses = {
  float: "bg-white/55 dark:bg-blacksection/60",
  read:  "bg-white/85 dark:bg-blacksection/90",
};

// Rendered output:
<div className="relative overflow-hidden border border-white/60 shadow-solid-7
  backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:shadow-solid-6
  {density} {className}">
  {tint && <div className="pointer-events-none absolute inset-0 bg-gradient-to-r {tint} via-transparent to-transparent" />}
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent dark:from-white/5" />
  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/25" />
  <div className="relative">{children}</div>
</div>
```

**Glass layers (bottom to top):**
1. Semi-transparent background (`bg-white/55` or `bg-white/85`)
2. Optional colour tint gradient (left edge glow)
3. Top-to-bottom white gradient (depth illusion)
4. Top edge highlight (1px white line — glass rim light)
5. Content (relative, above all overlays)

### 2.2 Where glass is ALREADY used (reference implementations)

| Component | File | Glass usage |
|---|---|---|
| **MobileMenu** | `components/Header/MobileMenu.tsx` | Full glass drawer: `bg-white/75 backdrop-blur-2xl backdrop-saturate-150`, glass optics (blur orb, top gradient, edge highlight), staggered link animations |
| **ToastCard** | `components/ToastCard.tsx` | `GlassPanel density="read"` with type-specific tint, progress bar, slide-in animation |
| **BrochureButton** | `components/Header/BrochureButton.tsx` | `GlassPanel tint="from-primaryho/25"` dropdown, glass cards with `bg-white/90 dark:bg-blackho/90` |
| **CookieConsent** | `components/Common/CookieConsent.tsx` | `GlassPanel tint="from-primaryho/15"` banner |
| **Header (sticky)** | `components/Header/index.tsx` | `bg-white/75 backdrop-blur-2xl backdrop-saturate-150` when scrolled |

### 2.3 Where glass is MISSING (cards that need redesign)

| Component | File | Current style | Used on page |
|---|---|---|---|
| **SingleFeature** | `components/Features/SingleFeature.tsx` | `bg-white dark:bg-blacksection shadow-solid-3` | Home (`Feature`) |
| **SingleProduct (Services)** | `components/ServicesSection/SingleProduct.tsx` | `bg-white dark:bg-blacksection shadow-solid-3` + image overlay | Home (`ServicesSection`) |
| **SingleCertification** | `components/Certifications/SingleCertification.tsx` | `bg-white dark:bg-blacksection shadow-solid-3` | Certifications |
| **SingleProduct (Products)** | `components/NewProductsSection/SingleProduct.tsx` | `bg-white shadow-md border border-gray-100` | NewProducts (commented out) |
| **SingleTestimonial** | `components/Testimonial/SingleTestimonial.tsx` | `bg-white dark:bg-blacksection shadow-solid-9` | Testimonial (commented out) |
| **BlogItem** | `components/Blog/BlogItem.tsx` | `bg-white dark:bg-blacksection shadow-solid-8` | Blog |
| **RelatedPost** | `components/Blog/RelatedPost.tsx` | `bg-white dark:bg-blacksection shadow-solid-13` | Blog details |
| **Pricing card** | `components/Pricing/index.tsx` | `bg-white dark:bg-blacksection shadow-solid-10` | Pricing (commented out) |
| **FAQ item** | `components/FAQ/index.tsx` | `bg-white dark:bg-blacksection shadow-solid-8` | FAQ (commented out) |
| **Contact form** | `components/Contact/index.tsx` | `bg-white dark:bg-black shadow-solid-8` | Contact, Home |
| **BuyBack form** | `components/BuyBackContact/index.tsx` | `bg-white dark:bg-black shadow-solid-8` | Buy Back |
| **Auth forms** | `components/Auth/Signin.tsx`, `Signup.tsx` | `bg-white dark:bg-black shadow-solid-8` | Sign in, Sign up |
| **FunFact panel** | `components/FunFact/index.tsx` | `bg-gradient-to-t from-[#F8F9FF] to-[#DEE7FF]` | Home |
| **CTA panel** | `components/CTA/index.tsx` | `bg-gradient-to-t from-[#F8F9FF] to-[#DEE7FF]` | CTA (commented out) |
| **Integration logos** | `components/Integration/index.tsx` | `bg-white dark:bg-btndark shadow-solid-7` | Integration (commented out) |
| **Brand selector** | `components/BrandSlider/SingleBrand.tsx` | `backdrop-blur-lg` (partial glass) | Brands |

---

## 3. ANIMATION PATTERNS (must follow)

### 3.1 Section/card entrance (used everywhere)
```tsx
<motion.div
  variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
  initial="hidden"
  whileInView="visible"
  transition={{ duration: 1, delay: 0.1 }}
  viewport={{ once: true }}
  className="animate_top"
>
```

### 3.2 Card hover (current standard)
```tsx
className="... transition-all hover:shadow-solid-4 dark:hover:bg-hoverdark"
// or
className="... transition-all duration-300 hover:shadow-solid-4 md:hover:scale-110"
```

### 3.3 Glass card hover (from BrochureButton — the target pattern)
```tsx
className="... transition-all duration-300 hover:-translate-y-1 hover:shadow-solid-5"
```

### 3.4 Staggered children (from MobileMenu)
```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.15 + index * 0.05, ease: [0.23, 1, 0.32, 1] }}
  >
    {/* card */}
  </motion.div>
))}
```

### 3.5 Easing curve (project standard)
```tsx
ease: [0.23, 1, 0.32, 1]  // custom cubic-bezier — used in MobileMenu, ToastCard, BrochureButton
```

### 3.6 AnimatePresence exit (from MobileMenu)
```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 48, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* content */}
    </motion.div>
  )}
</AnimatePresence>
```

---

## 4. DESIGN SYSTEM (`tailwind.config.js`)

### Colours — ONLY these may be used
```
primary        #2b4797   (brand blue)
primaryho      #0063EC   (hover blue)
primaryLight   #879dde
black          #181C31
blackho        #2C3149
blacksection   #1C2136
btndark        #292E45
white          #FFFFFF
stroke         #EEEEEE
strokedark     #2D2F40
hoverdark      #252A42
waterloo       #757693   (body text)
manatee        #999AA1   (dark body text)
alabaster      #FBFBFB
zumthor        #EDF5FF
meta           #20C5A8
titlebg2       #FFDF68
titlebg2Light  #dfc35b
titlebg        #ADFFF8
titlebgdark    #46495A
socialicon     #D1D8E0
```

### Typography
```
metatitle 12px/20px · sectiontitle 14px/22px · regular 16px/26px
metatitle3 18px/26px · metatitle2 20px/32px · para2 22px/35px
itemtitle 26px/32px · itemtitle2 24px/32px · hero 44px/58px
sectiontitle3 44px/55px · sectiontitle4 34px/48px
```
Font: **Inter** only.

### Spacing
`4.5 5.5 6.5 7.5 8.5 10.5 11.5 12.5 13 13.5 14.5 15 15.5 16 17 17.5 18 18.5 19 21 21.5 22 22.5 25 27 27.5 29 29.5 30 32.5 35 37.5 40 42.5 45 46 47.5 50 55 60 65 67 67.5 90`

### Shadows
```
solid-2  0 2px 10px rgba(122,135,167,.05)      solid-7  0 30px 50px rgba(45,74,170,.1)
solid-3  0 6px 90px rgba(8,14,40,.04)          solid-8  0 12px 120px rgba(45,74,170,.06)
solid-4  0 6px 90px rgba(8,14,40,.1)           solid-9  0 12px 30px rgba(45,74,170,.06)
solid-5  0 8px 24px rgba(45,74,170,.08)       solid-10 0 8px 30px rgba(45,74,170,.06)
solid-6  0 8px 24px rgba(10,16,35,.08)        solid-11 0 6px 20px rgba(45,74,170,.05)
solid-l  0 10px 120px rgba(45,74,170,.1)      solid-12 0 2px 10px rgba(0,0,0,.05)
solid-13 0 2px 19px rgba(0,0,0,.05)
```

### z-index
`99999`, `999`, `1`

---

## 5. GLASS CARD SPECIFICATION (the target design)

Every redesigned card should follow this specification:

### 5.1 Structure
```tsx
<motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.3, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
  className="group relative overflow-hidden rounded-2xl border border-white/60
    bg-white/75 shadow-solid-3 backdrop-blur-2xl backdrop-saturate-150
    transition-all duration-300 hover:-translate-y-1 hover:shadow-solid-5
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho
    dark:border-white/10 dark:bg-blacksection/75 dark:shadow-solid-6"
>
  {/* Glass optics */}
  <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent dark:from-white/5" />
  <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/25" />

  {/* Optional brand glow */}
  <div aria-hidden className="pointer-events-none absolute -top-8 right-6 h-16 w-32 rounded-full bg-primary/20 blur-2xl dark:bg-primaryho/25" />

  {/* Content */}
  <div className="relative">{children}</div>
</motion.div>
```

### 5.2 Density rules
| Card type | Density | Background |
|---|---|---|
| Text-heavy cards (features, services, testimonials) | `read` | `bg-white/85 dark:bg-blacksection/90` |
| Image cards (certifications, products, blog) | `float` | `bg-white/55 dark:bg-blacksection/60` |
| Form panels (contact, auth) | `read` | `bg-white/85 dark:bg-blacksection/90` |
| Pricing cards | `read` | `bg-white/85 dark:bg-blacksection/90` |

### 5.3 Hover behaviour
- **Lift:** `hover:-translate-y-1` (subtle 4px rise)
- **Shadow:** `hover:shadow-solid-5` (increase from solid-3)
- **Border:** `hover:border-primary/30` (subtle colour shift on hover)
- **Glow:** Optional `group-hover:opacity-100` on a brand glow orb

### 5.4 Border radius
- Cards: `rounded-2xl` (16px) — matches MobileMenu, BrochureButton
- Inner elements: `rounded-xl` (12px) or `rounded-lg` (8px)
- Small badges: `rounded-full`

### 5.5 What NOT to do
- Do NOT use solid `bg-white dark:bg-blacksection` — always use the translucent glass equivalent
- Do NOT use `shadow-md` or raw box-shadow — use `shadow-solid-*` tokens
- Do NOT use `border-gray-100` — use `border-white/60 dark:border-white/10`
- Do NOT use CSS transitions for enter/exit — use `framer-motion`
- Do NOT use `duration-200` — use `duration-300` or `duration-500`
- Do NOT forget `dark:` variants on every glass layer

---

## 6. COMPONENT-BY-COMPONENT REDESIGN GUIDE

### 6.1 SingleFeature (`components/Features/SingleFeature.tsx`)
**Current:** `bg-white dark:bg-blacksection shadow-solid-3 hover:shadow-solid-4`
**Target:** Glass card with `density="read"`, icon in a glass badge, staggered entrance
**Used on:** Home page Feature section (3-col grid)

### 6.2 SingleProduct / Services (`components/ServicesSection/SingleProduct.tsx`)
**Current:** `bg-white dark:bg-blacksection shadow-solid-3` + image with gradient overlay
**Target:** Glass card with image visible through the glass, `density="float"`, hover scale
**Used on:** Home page ServicesSection (4-col grid)

### 6.3 SingleCertification (`components/Certifications/SingleCertification.tsx`)
**Current:** `bg-white dark:bg-blacksection shadow-solid-3`
**Target:** Glass card with `density="float"`, certificate image visible through glass, hover lift
**Used on:** Certifications section (3-col grid)

### 6.4 BlogItem (`components/Blog/BlogItem.tsx`)
**Current:** `bg-white dark:bg-blacksection shadow-solid-8`
**Target:** Glass card with `density="float"`, image at top visible through glass
**Used on:** Blog listing page

### 6.5 RelatedPost (`components/Blog/RelatedPost.tsx`)
**Current:** `bg-white dark:bg-blacksection shadow-solid-13`
**Target:** Glass card with `density="float"`
**Used on:** Blog details page

### 6.6 Pricing cards (`components/Pricing/index.tsx`)
**Current:** `bg-white dark:bg-blacksection shadow-solid-10`
**Target:** Glass card with `density="read"`, popular card gets `tint="from-primaryho/25"` and elevated shadow
**Used on:** Pricing page (currently commented out)

### 6.7 FAQ items (`components/FAQ/index.tsx`)
**Current:** `bg-white dark:bg-blacksection shadow-solid-8`
**Target:** Glass item with `density="read"`, accordion animation via `AnimatePresence`
**Used on:** FAQ section (currently commented out)

### 6.8 Contact form panel (`components/Contact/index.tsx`)
**Current:** `bg-white dark:bg-black shadow-solid-8`
**Target:** Glass panel with `density="read"`, `tint="from-primaryho/15"`
**Used on:** Contact page, Home page

### 6.9 BuyBack form panel (`components/BuyBackContact/index.tsx`)
**Current:** `bg-white dark:bg-black shadow-solid-8`
**Target:** Glass panel with `density="read"`, `tint="from-primaryho/15"`
**Used on:** Buy Back page

### 6.10 Auth forms (`components/Auth/Signin.tsx`, `Signup.tsx`)
**Current:** `bg-white dark:bg-black shadow-solid-8`
**Target:** Glass panel with `density="read"`, centered, `tint="from-primaryho/10"`
**Used on:** Sign in, Sign up pages

### 6.11 FunFact panel (`components/FunFact/index.tsx`)
**Current:** `bg-gradient-to-t from-[#F8F9FF] to-[#DEE7FF]`
**Target:** Glass panel with `density="read"`, `tint="from-primaryho/15"`, dotted shape overlay
**Used on:** Home page

### 6.12 CTA panel (`components/CTA/index.tsx`)
**Current:** `bg-gradient-to-t from-[#F8F9FF] to-[#DEE7FF]`
**Target:** Glass panel with `density="read"`, `tint="from-primaryho/20"`
**Used on:** CTA section (currently commented out)

### 6.13 Integration logo badges (`components/Integration/index.tsx`)
**Current:** `bg-white dark:bg-btndark shadow-solid-7`
**Target:** Small glass badges with `density="float"`
**Used on:** Integration section (currently commented out)

---

## 7. ANIMATION SPECIFICATION

### 7.1 Entrance animation (all cards)
```tsx
initial={{ opacity: 0, y: 12 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.3, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
```

### 7.2 Hover animation (all cards)
```tsx
className="transition-all duration-300 hover:-translate-y-1 hover:shadow-solid-5"
```

### 7.3 Stagger pattern (grids)
```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
  >
    <Card item={item} />
  </motion.div>
))}
```

### 7.4 Image zoom on hover (image cards)
```tsx
className="transition-transform duration-500 group-hover:scale-105"
```

### 7.5 Glow reveal on hover
```tsx
// Glow div (hidden by default)
<div className="pointer-events-none absolute -top-8 right-6 h-16 w-32 rounded-full bg-primary/20 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 dark:bg-primaryho/25" />
```

---

## 8. MIGRATION STRATEGY

### Option A — Wrap with GlassPanel (fastest)
Replace the outer `<div>` or `<article>` with `<GlassPanel>`:
```tsx
// Before
<div className="rounded-lg border border-white bg-white p-7.5 shadow-solid-3 dark:border-strokedark dark:bg-blacksection">
  {children}
</div>

// After
<GlassPanel density="read" className="rounded-2xl p-7.5">
  {children}
</GlassPanel>
```

### Option B — Inline glass classes (most control)
Replace classes directly on the existing element:
```tsx
// Before
<div className="rounded-lg border border-white bg-white p-7.5 shadow-solid-3 dark:border-strokedark dark:bg-blacksection">

// After
<div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/85 p-7.5 shadow-solid-3 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-1 hover:shadow-solid-5 dark:border-white/10 dark:bg-blacksection/90 dark:shadow-solid-6">
  <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent dark:from-white/5" />
  <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/25" />
  <div className="relative">{children}</div>
</div>
```

### Recommendation
Use **Option A (GlassPanel)** for most cards — it's cleaner, consistent, and future-proof. Use **Option B** only when the card needs custom glass optics that GlassPanel doesn't provide.

---

## 9. CONSTRAINTS

1. **Must use `GlassPanel` or inline glass classes** — no solid `bg-white dark:bg-blacksection`
2. **Must use `framer-motion`** for all animations — no CSS transitions for enter/exit
3. **Must use design tokens only** — no raw hex colours
4. **Must have `dark:` variants** on every glass layer
5. **Must have `focus-visible` ring** on all interactive cards
6. **Must use `ease: [0.23, 1, 0.32, 1]`** for animations — this is the project's standard easing
7. **Must use `duration-300` or `duration-500`** — no `duration-200`
8. **Must not add new dependencies** — `framer-motion` is already installed
9. **Must not add new Tailwind tokens**
10. **Must not break existing layouts** — card dimensions and grid behaviour must remain the same
11. **Must be responsive** — glass effect must work on mobile (backdrop-blur is GPU-accelerated but test performance)
12. **Must handle image cards carefully** — images behind glass need sufficient opacity to remain visible

---

## 10. OPEN QUESTIONS FOR THE PLANNING AGENT

**Q1 — GlassPanel vs inline.** Should all cards use `<GlassPanel>` or should some use inline classes? Recommend: GlassPanel for all — consistency over flexibility.

**Q2 — Background opacity.** Current glass uses `/55` and `/85`. Should cards be more transparent (`/40`) or more opaque (`/90`)? Recommend: keep `/85` for text cards, `/55` for image cards — the current values are well-tuned.

**Q3 — Border radius.** Should all cards be `rounded-2xl`? Recommend: yes — matches MobileMenu and BrochureButton.

**Q4 — Hover lift.** Should all cards lift on hover (`-translate-y-1`)? Recommend: yes — it's the established pattern from BrochureButton.

**Q5 — Brand glow.** Should all cards have the brand glow orb on hover? Recommend: only on feature/service cards — not on forms or text-heavy cards (too busy).

**Q6 — Stagger delay.** What stagger delay should grids use? Recommend: `index * 0.05` — matches MobileMenu.

**Q7 — Form panels.** Should contact/auth forms be glass? Recommend: yes — but use `density="read"` and a subtle `tint="from-primaryho/15"` to distinguish them from content cards.

**Q8 — FunFact / CTA panels.** Should these large panels be glass? Recommend: yes — replace the `bg-gradient-to-t from-[#F8F9FF] to-[#DEE7FF]` with `GlassPanel density="read" tint="from-primaryho/15"`.

**Q9 — Performance.** `backdrop-blur-2xl` on many cards may cause GPU pressure on low-end devices. Should we use `backdrop-blur-xl` instead? Recommend: keep `backdrop-blur-2xl` for the header and mobile menu (few instances), use `backdrop-blur-xl` for content cards (many instances).

**Q10 — Commented-out components.** Should commented-out cards (Testimonial, Pricing, FAQ, NewProducts) also be migrated? Recommend: yes — when they're uncommented they should already be glass.

---

## 11. DEFINITION OF DONE

- [ ] All card components use `GlassPanel` or inline glass classes (no solid `bg-white dark:bg-blacksection`)
- [ ] All cards have the 3 glass layers: background, top gradient, edge highlight
- [ ] All cards have `backdrop-blur` + `backdrop-saturate-150`
- [ ] All cards have `border-white/60 dark:border-white/10`
- [ ] All cards have `framer-motion` entrance animation with stagger
- [ ] All cards have hover lift (`-translate-y-1`) and shadow increase
- [ ] All cards have `focus-visible` ring
- [ ] All cards have full dark-mode parity
- [ ] All animations use `ease: [0.23, 1, 0.32, 1]`
- [ ] All colours from design tokens only
- [ ] No new dependencies added
- [ ] No new Tailwind tokens added
- [ ] Card dimensions and grid layouts unchanged
- [ ] `npm run build` passes with no errors
