# DESIGN SYSTEM CONTEXT — Heliac Energii

Repo root: `C:\Users\MAXWELL\Documents\Projects\Heliac\Heliacenergii` · Branch: `dev`

This is the canonical reference for every design decision in the project. Hand it to any planning/implementation agent alongside a task brief. Nothing here may be reinvented, renamed, or extended without an explicit new token/primitive decision.

---

## 1. TECH STACK (fixed — no new dependencies)

| Item | Value |
|---|---|
| Framework | Next.js `^13.5.6`, App Router, `"use client"` components for anything animated |
| React | `^18.2.0` |
| Language | TypeScript `^5.2.2` |
| Styling | Tailwind CSS `^3.3.5` + `prettier-plugin-tailwindcss` (class order is auto-sorted — keep it sorted) |
| Animation | `framer-motion` `^10.12.16` |
| Theming | `next-themes` `^0.2.1`, `darkMode: "class"`, **default light**, `enableSystem={false}` |
| Font | Inter via `next/font/google` in `app/(site)/layout.tsx`, exposed as `font-inter` |
| Forms | `react-hook-form` `^7.54.2`, `react-phone-number-input` `^3.4.10`, `@emailjs/browser` `^4.4.1` |
| Toasts | `react-hot-toast` `^2.4.1` (rendered via `app/context/ToastContext.tsx` → `ToastCard`) |
| Icons | `react-icons` `^5.2.1` (families in use: `fa`, `md`) |
| Carousels | `flowbite-react` `^0.10.1` (**only** for `<Carousel>` in `components/Caurosel1`), `swiper` `^9.3.2` (Testimonial), `react-glider` `^4.0.2` (BrandSlider) |
| Aliases | `@/*` → repo root |
| E2E | `playwright` (devDependency) |

**Validation:** `npx next build` (compiles + type-checks). `npm run lint` is unconfigured/interactive — don't rely on it.

---

## 2. THEME MODEL

- Dark mode is **class-based** (`darkMode: "class"`), toggled by `next-themes`; every element must carry explicit `dark:` variants — there is no automatic inversion.
- Default theme is **light**. Dark backgrounds come from tokens (`blacksection`, `black`, `btndark`, `hoverdark`), never from raw black.
- Layout (`app/(site)/layout.tsx`) wraps everything in `ThemeProvider` and renders, in order: `Lines` (fixed background guide lines) → `Header` → `{children}` → `Footer` → `ScrollToTop` → `CookieConsent`.
- Body defaults (`app/globals.css`): `font-inter text-regular font-normal text-waterloo dark:text-manatee` — i.e. **body text is `waterloo` in light, `manatee` in dark**. Headings must set their own `text-black dark:text-white`.

---

## 3. COLOUR TOKENS (`tailwind.config.js` — the ONLY allowed colours)

| Token | Hex | Role |
|---|---|---|
| `primary` | `#2b4797` | Brand blue — headings accent, primary buttons, borders on hover |
| `primaryho` | `#0063EC` | Hover blue — button hover, focus rings, badges, glow orbs |
| `primaryLight` | `#879dde` | Blue for dark-mode accents/links |
| `black` | `#181C31` | Headings in light mode; `secondary` button bg |
| `blackho` | `#2C3149` | Hover state of `black`; dark dropdown/sub-panel bg |
| `blacksection` | `#1C2136` | Dark section & footer background; dark "read" glass bg |
| `btndark` | `#292E45` | `secondary` button bg in dark mode |
| `hoverdark` | `#252A42` | Dark hover surfaces (icon buttons, country flag chip) |
| `white` | `#FFFFFF` | — |
| `stroke` | `#EEEEEE` | **Light-mode hairline** — borders on every page-background surface |
| `strokedark` | `#2D2F40` | Dark-mode hairline for non-glass borders (dropdowns, solid cards) |
| `waterloo` | `#757693` | Body text, light mode |
| `manatee` | `#999AA1` | Body text, dark mode; dark focus borders |
| `alabaster` | `#FBFBFB` | Near-white surface (social button bg) |
| `zumthor` | `#EDF5FF` | Light blue chip bg (SectionHeader2 pill), upload hover |
| `meta` | `#20C5A8` | Teal accent — success badge/bar, decorative glow |
| `titlebg` | `#ADFFF8` | Decorative highlight |
| `titlebg2` / `titlebg2Light` | `#FFDF68` / `#dfc35b` | Yellow highlight + its dark-mode variant |
| `titlebgdark` | `#46495A` | Dark-mode heading on muted surfaces; blog body text |
| `socialicon` | `#D1D8E0` | Social icon resting fill |

**Exception — semantic reds:** `red-500/600` are tolerated for form-error states only (no red token exists). `blue-600`, `gray-*` and any raw hex in components are **violations** — replace with `primary`/`stroke`/`waterloo` families.

**Opacity modifiers** are used heavily on glass (`/55`, `/85`, `/40`, `/5`, `/10`, `/15`, `/20`, `/25`); a custom `opacity-65` token also exists.

---

## 4. TYPOGRAPHY SCALE (`fontSize` tokens — never raw sizes)

| Token | Size/Line | Typical use |
|---|---|---|
| `metatitle` | 12/20 | Small labels, toast secondary text |
| `sectiontitle` | 14/22 | Section-header pills, badges |
| `regular` | 16/26 | Body default (set on `body`) |
| `metatitle3` | 18/26 | Card sub-headings, contact rows |
| `metatitle2` | 20/32 | Stat numerals, capability discs |
| `itemtitle2` | 24/32 | Footer/column headings |
| `itemtitle` | 26/32 | Card titles |
| `para2` | 22/35 | Lead paragraphs |
| `sectiontitle4` | 34/48 | Mid section headings |
| `sectiontitle2` | 40/52 | Large panel headings (form cards) |
| `hero` | 44/58 | Hero/slider headings |
| `sectiontitle3` | 44/55 | Section h2 (`SectionHeader` subtitle) |

Weights in use: `font-medium`, `font-semibold`, `font-bold`, `font-extrabold`. Font is **Inter only**.

---

## 5. SPACING, CONTAINERS, MISC TOKENS

**Custom spacing** (in addition to Tailwind defaults): `4.5 5.5 6.5 7.5 8.5 10.5 11.5 12.5 13 13.5 14.5 15 15.5 16 17 17.5 18 18.5 19 21 21.5 22 22.5 25 27 27.5 29 29.5 30 32.5 35 37.5 40 42.5 45 46 47.5 50 55 60 65 67 67.5 90`

**Max-width containers:** `max-w-c-1390` (86.875rem — the standard page container), `c-1315`, `c-1280`, `c-1235`, `c-1154`, `c-1016`. Standard page shell:

```tsx
<main className="flex w-full flex-col pt-[90px] md:pt-[102px] mx-auto max-w-c-1390">
```
(`pt-[90px]/[102px]` clears the fixed header — keep it or an equivalent.)

**Shadows** (`shadow-solid-*`, all blue-tinted):
```
solid-l  0 10px 120px rgba(45,74,170,.10)   ← hero glass surfaces
solid-2  0 2px 10px  rgba(122,135,167,.05)  ← resting glass cards
solid-3  0 6px 90px  rgba(8,14,40,.04)      ← small cards/inputs
solid-4  0 6px 90px  rgba(8,14,40,.10)
solid-5  0 8px 24px  rgba(45,74,170,.08)    ← hover elevation
solid-6  0 8px 24px  rgba(10,16,35,.08)
solid-7  0 30px 50px rgba(45,74,170,.10)    ← large panels (MobileMenu)
solid-8  0 12px 120px rgba(45,74,170,.06)   ← form cards
solid-9  0 12px 30px rgba(45,74,170,.06)
solid-10 0 8px 30px  rgba(45,74,170,.06)
solid-11 0 6px 20px  rgba(45,74,170,.05)    ← inputs
solid-12 0 2px 10px  rgba(0,0,0,.05)        ← icon badges, round buttons
solid-13 0 2px 19px  rgba(0,0,0,.05)        ← docs/sidebar cards
```

**Other tokens:** `zIndex: 1 / 999 / 99999` (negative z like `-z-1`, `-z-20` used ad hoc for background decor), `opacity: 65`, `transitionProperty: { width }`.

**Keyframes in config:** `line` → `animate-line1/2/3` (the fixed vertical guide lines rendered by `components/Lines`, `bg-stroke dark:bg-strokedark`).

---

## 6. THE GLASS SYSTEM (the core of the visual identity)

### 6.1 `GlassCard` — animated glass card primitive
**File:** `components/Common/GlassCard.tsx`

```tsx
interface GlassCardProps {
  density?: "float" | "read"; // float = image-led · read = text/form-led
  tint?: string;              // gradient start, e.g. "from-primaryho/15"
  glow?: boolean;             // brand glow orb on hover
  index?: number;             // grid position → stagger delay (delay = index * 0.05)
  hover?: boolean;            // hover lift, default true
  blur?: "xl" | "2xl";        // xl for grid cards · 2xl for hero surfaces
  className?: string;         // padding etc. — additive only
  children: React.ReactNode;
}
```

**Base surface (current, post-hairline-update):**
```
group relative overflow-hidden rounded-2xl
border border-stroke dark:border-white/10          ← resting hairline
shadow-solid-2
transition-[border-color,box-shadow,background-color] duration-300
hover:border-primary/30 hover:shadow-solid-5 dark:hover:border-primaryho/40 dark:hover:shadow-solid-5   (when hover)
density read → bg-white/85 dark:bg-blacksection/90
density float → bg-white/55 dark:bg-white/5
backdrop-blur-xl | backdrop-blur-2xl  +  backdrop-saturate-150
```

**Motion (built in):**
```tsx
initial={{ opacity: 0, y: 12 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.15 }}
transition={{ duration: 0.3, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
whileHover={hover ? { y: -4 } : undefined}
```

**Internal layers (in order):**
1. **Tint** — `absolute inset-0 bg-gradient-to-br ${tint} to-transparent` (optional)
2. **Top gloss** — `bg-gradient-to-b from-white/40 via-transparent to-transparent dark:from-white/5`
3. **Specular rim** — `inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/25`
4. **Glow orb** (optional) — `-top-10 right-0 h-24 w-24 rounded-full bg-primaryho/20 blur-2xl opacity-0 group-hover:opacity-100 dark:bg-primaryho/25`
5. **Content wrapper** — `relative flex h-full flex-col`

### 6.2 `GlassPanel` — static glass surface
**File:** `components/Common/GlassPanel.tsx`

Same optics (hairline, density backgrounds, tint, gloss, rim) but **no framer-motion, no hover, no glow, no index**. Use for surfaces that must not animate (toasts, embedded panels). `ToastCard` is built on it.

### 6.3 THE TWO-TONE BORDER RULE (site-wide law)

> **`border-stroke` (#EEEEEE) on every card, tile, panel, input and round button that sits on a page background. `border-white/60` ONLY where the surface sits on photography or animated decor. `dark:border-white/10` everywhere for glass.**

Rationale: a white frost edge is invisible on white/alabaster page backgrounds — surfaces "dissolve". The primitives (`GlassCard`, `GlassPanel`) carry the hairline; every hand-rolled surface must match.

**Where `border-white/60` is still legal (current inventory, verified by sweep):**
- Hero image frames: `ProductsHero`, `ContactHero`, `AboutHero`, `BrandsHero`, `BuyBackHero`
- The About image-zone frame (`About/index.tsx:226`)
- Chips/badges overlaid on images: straddling category badge (`SingleProductCategory:72`), FunFact band + its chip (`FunFact:186/315` — band sits over background photos)
- Floating overlay surfaces: sticky header bar (`Header/index.tsx:38`), `MobileMenu` panel/buttons/cards, `BrochureButton` dropdown cards, `CookieConsent`
- Glass optics **inside** surfaces: specular rims, gloss gradients (always white-based, both modes)
- One judgment call pending: `Certifications/SingleCertification:30` image zone and `Features/SingleFeature:22` icon badge (inside cards, currently frost edge)

**Never:** mix the rule per-element within one surface; hover borders (`hover:border-primary/30`, `hover:border-primaryho/40`) and focus rings layer **on top of** the resting hairline.

### 6.4 Older solid-card pattern (legacy, being phased out)
`rounded-lg bg-white shadow-solid-8 dark:border dark:border-strokedark dark:bg-black` — still visible on unmigrated pages (e.g. blog details). New work must use glass, not this.

---

## 7. MOTION SYSTEM

**Standard (all new work):**
```tsx
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

initial={{ opacity: 0, y: 12 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.15 }}
transition={{ duration: 0.3, delay: index * 0.05, ease: EASE }}

// hover
whileHover={{ y: -4 }}
// + CSS: transition-[border-color,box-shadow] duration-300
```

**Rules:**
- Easing is always `[0.23, 1, 0.32, 1]`; durations `duration-300` (surfaces) or `duration-500` (glow/opacity).
- Grid stagger: parent passes `index={key}`, primitive computes `delay: index * 0.05`.
- Enter/exit mounts use `AnimatePresence` (see `MobileMenu` — the quality bar: portal, scroll lock, escape/outside close, focus management, staggered children).
- Toasts: `y: -12 → 0`, `scale 0.97 → 1`, `duration: 0.3`, same easing; countdown bar scales X linearly.

**Legacy pattern (do NOT copy into new work):**
```tsx
variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
transition={{ duration: 1, delay: 0.1 }}
```
Falls *down* into place, no easing, slow — still present in `SectionHeader`, `SectionHeader2`, older sections, and duplicated as `className="animate_top"`.

**⚠️ Dead classes:** `animate_top` and `animate_left` have **no CSS definition anywhere** — they are no-ops left from the original template. The framer-motion props do the real animation. Don't rely on them; don't propagate them.

**CSS keyframes that do exist** (`app/globals.css`): `float-rise`, `float-sway` (uses `--sway` var), `clap-pulse`, `heart-beat` (FunFact celebration icons inside glass), `brand-marquee` (Buy Back infinite brand strip), `rotation` (`.loader` spinner).

---

## 8. BUTTON SYSTEM — `components/Common/Button.tsx`

Polymorphic: renders `<Link>` when `href` is set, otherwise `<button>`. Round (`rounded-full`), `transition-all duration-300`, focus ring `focus-visible:ring-2 ring-primaryho`.

| Variant | Light | Dark |
|---|---|---|
| `primary` | `bg-primary text-white hover:bg-primaryho` | same |
| `secondary` | `bg-black text-white hover:bg-blackho` | `bg-btndark hover:bg-blackho` |
| `ghost` | `text-primary hover:bg-primary/5` | `text-white hover:text-primary` |
| `outline` | `border-2 border-white bg-primary text-white hover:bg-white hover:text-primary` | `border-strokedark bg-transparent text-white hover:bg-primaryho` |
| `icon` | `bg-transparent text-black hover:bg-stroke` | `text-white hover:bg-hoverdark` |
| `social` | `border border-stroke bg-alabaster text-black hover:border-primary hover:bg-primary/5` | `border-transparent bg-blackho text-white hover:border-primary` |

Sizes: `sm` `px-4 py-2 text-sm` · `md` `px-6 py-3 text-regular` · `lg` `px-7.5 py-2.5 text-regular`.

Props: `icon` (ReactNode) + `iconPosition: "left" | "right"`, `ariaLabel`, `type`, plus native button/anchor attrs. **Blue = primary, black = secondary.** No hand-rolled buttons anywhere.

**`ArrowIcon`** (`components/Common/ArrowIcon.tsx`): 14×14, `fill-current`, size/fill owned by the component; pass only additive classes (e.g. `fill-white` on primary buttons).

---

## 9. SECTION HEADERS & PAGE FURNITURE

**`SectionHeader`** (`components/Common/SectionHeader.tsx`) — centered: pill (`bg-primaryho`, white `text-sectiontitle`) + h2 (`text-3xl … xl:text-sectiontitle3 font-bold text-black dark:text-white`) + description paragraph. Props: `headerInfo: { title, subtitle, description }`.

**`SectionHeader2`** — identical layout, pill is light (`bg-zumthor`, `text-black`). Choose based on the section's background weight.

⚠️ Both still use the **legacy animation** (`y: -20`, `duration: 1`) and the dead `animate_top` class. New sections may use them as-is, but any redesign should migrate them to the standard motion block.

**Other furniture:**
- `Lines` — three fixed full-height 1px guide lines behind all content (`animate-line1/2/3`).
- `ScrollToTop` — floating button; keep footers clear of the bottom-right corner.
- `CookieConsent` — floating glass consent bar (frost edge legal — overlay).
- `ToastCard` (via `app/context/ToastContext.tsx`) — GlassPanel toast; types `success` (`meta`), `error` (`red-600/500`), `info`/`loading` (`primaryho`/`primaryLight`); icon badge, optional action chip, dismiss button, countdown bar. Fire with `toast.success/error(...)` — styling is centralized; never style toasts locally.
- `CookieConsent`/`Header`/`Footer` render on **every** page — new sections must not overlap them.

**Page banner pattern** (Contact + Buy Back, duplicated today): full-bleed `Image fill` + `clipPath: polygon(50% 50%, 100% 50%, 100% 100%, 25% 100%)` primary gradient wedge + right-aligned white `h1`. Being factored into a shared `PageBanner` per the page briefs.

---

## 10. GLOBAL CSS INVENTORY (`app/globals.css`)

| Block | Purpose |
|---|---|
| `@layer base` body | Inter, `text-regular`, `text-waterloo dark:text-manatee` |
| `.dropdown` | Header nav dropdown (stroke border, before-arrow, dark variants) |
| `.navbar` | ≤1280px scroll cap |
| `.no-scrollbar` | Hide scrollbars (horizontal strips) |
| `.img-white` | Invert filter for logo recoloring |
| `.blog-details*` | Long-form typography (headings `text-black dark:text-white`, body `titlebgdark dark:text-waterloo`, blockquote on `manatee`/`titlebgdark`) |
| `.active-tab` | `bg-stroke text-black dark:bg-blackho dark:text-white` |
| `.PhoneInput*` | Glass-box integration for `react-phone-number-input` (transparent input, `stroke`/`hoverdark` flag chip, `waterloo`/`manatee` placeholder) |
| `.loader` | Spinner ring, `#2b4797` (raw CSS, matches `primary`) |
| celebration keyframes | FunFact floating icons |
| `brand-marquee` | Buy Back logo strip |

---

## 11. ASSETS

```
public/images/logo/logo.svg · logo-dark.svg · logo-light.svg · logo.png · excel.png
public/images/shape/shape-dotted-light.svg · -dark.svg · -light-02.svg · -dark-02.svg
public/images/shape/shape-01.png … shape-06.png
public/images/brand/brand-01.svg … brand-12.svg        ← 12 brand logos
public/images/caurousel/slide_1.jpg … slide_4.jpg      ← hero slides
public/images/contact/contact.jpg · buyback/buyback.jpg
public/certifications/                                  ← untracked, pending approval
```
Dark-mode image swap convention: `className="dark:hidden"` + `hidden dark:block` pair.

---

## 12. RULES FOR ANY PLANNING/IMPLEMENTATION AGENT

1. **Tokens only.** Every colour/size/shadow/spacing value comes from §3–§5. No raw hex, no `blue-600`/`gray-*` (reds for form errors excepted).
2. **Reuse primitives.** `GlassCard`/`GlassPanel` for surfaces, `Button` for every CTA, `ArrowIcon` inside buttons, `SectionHeader` for section intros, `ToastCard` via `toast.*` for feedback. Never re-implement these.
3. **Two-tone border law** (§6.3) — `border-stroke` on page-background surfaces, `border-white/60` only on photography/overlays, `dark:border-white/10` for all glass.
4. **Motion standard** (§7) — `ease: [0.23, 1, 0.32, 1]`, `duration-300/500`, stagger `index * 0.05`, entrance `y: 12`. Never the legacy `y: -20 / duration: 1` block, never `animate_top`/`animate_left`.
5. **Dark-mode parity is mandatory** — every element gets explicit `dark:` variants; check headings (`text-black` without `dark:text-white` is a known recurring bug).
6. **Interactivity:** `focus-visible:ring-2 focus-visible:ring-primaryho` on every interactive element; `duration-300` transitions; `whileHover={{ y: -4 }}` lift on cards.
7. **`next/link` for internal routes**; `<a>` only for `mailto:`/`tel:`/external.
8. **Images:** `next/image` with explicit `sizes`; meaningful `alt` (no "About page banner" copy-paste).
9. **A11y:** unique `aria-label`s on icon-only controls, semantic landmarks, `aria-live` handled by ToastCard.
10. **No new dependencies, no new Tailwind tokens, no structural rewrites of primitives.** Pure class-level work stays within the system.
11. **Responsive floor:** 320 / 768 / 1024 / 1280+.
12. **Validate with `npx next build`.**

---

## 13. KNOWN DEBT / GOTCHAS (context, not license)

- `animate_top` / `animate_left` are dead classes (no CSS) — cosmetic noise in older files.
- `SectionHeader`/`SectionHeader2` still use legacy motion; migrating them is an open item.
- Legacy solid-card pattern survives on blog/docs pages.
- Footer previously had dead links (`/buyback` 404, `#` socials) — fixed during the footer redesign; keep new links on real routes (`/buy-back`, `/products` exist).
- `flowbite-react` is loaded for one Carousel; do not adopt its components elsewhere.
- A stale dev server can serve old code — after structural changes, restart `npm run dev` before debugging runtime errors.
