# CONTEXT BRIEF — Footer Redesign

Repo root: `C:\Users\MAXWELL\Documents\Projects\Heliac\Heliacenergii` · Branch: `dev`

---

## 1. OBJECTIVE

Redesign the site footer (`components/Footer/index.tsx`, 517 lines) so it matches the project's glass aesthetic, animation standards, and dark-mode parity. **Content and link targets stay the same** (with bug fixes called out below) — the visual presentation, structure, and micro-interactions change.

---

## 2. WHERE THE FOOTER LIVES

**File:** `components/Footer/index.tsx` (517 lines, `"use client"`)

**Rendered in:** `app/(site)/layout.tsx` line 32 — every page on the site gets it:

```tsx
<ThemeProvider enableSystem={false} attribute="class" defaultTheme="light">
  <ToasterContext />
  <Lines />
  <Header />
  {children}
  <Footer />
  <ScrollToTop />
  <CookieConsent />
</ThemeProvider>
```

Notes:
- The layout is a client component, so the footer can be a client component too (it already is).
- Font is **Inter** (`next/font/google`), applied at `<body>`.
- `Lines` and `ScrollToTop` exist — the footer must not visually collide with the scroll-to-top button (bottom-right typically).

---

## 3. CURRENT STRUCTURE — Full Audit

### 3.1 Shell

```tsx
<footer className="border-t border-stroke bg-white dark:border-strokedark dark:bg-blacksection">
  <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
    {/* Footer Top: py-20 lg:py-25 */}
    {/* Footer Bottom: border-t py-7 */}
  </div>
</footer>
```

### 3.2 Footer Top (3 logical blocks)

**Block A — Logo (lines 12–49)**
```tsx
<motion.div variants={...} initial="hidden" whileInView="visible"
  transition={{ duration: 1, delay: 0.5 }} viewport={{ once: true }}
  className="animate_top w-3/4 lg:w-1/4">
  <a href="index.html" className="relative">
    <Image width={110} height={80} src="/images/logo/logo.svg" alt="Logo" className="dark:hidden" />
    <Image width={110} height={80} src="/images/logo/logo-dark.svg" alt="Logo" className="hidden dark:block" />
  </a>
</motion.div>
```

**Block B — Company + Contact (lines 52–116)**
```tsx
<h4 className="mb-1.5 mt-0 text-itemtitle2 font-bold text-black">Heliac Energii Controls Solutions</h4>
<p className="mb-10">Powering the Future of Industrial Innovation.</p>
<p className="mb-1.5 text-sectiontitle uppercase tracking-[5px]">contact</p>
// email: MdOutlineEmail (color="black" hardcoded) → inquiry@heliacenergii.com
// phone: MdOutlinePhone (color="black" hardcoded) → 0091 - 8411981840
// phone: MdOutlinePhone (color="black" hardcoded) → 0091 - 8793823181
```

**Block C — Link columns (lines 118–328)**, wrapped in
`flex w-full flex-col gap-8 md:flex-row md:justify-center md:gap-20 lg:w-2/3 xl:w-7/12`

| Column | Heading | Links |
|---|---|---|
| Quick Links | `text-itemtitle2 font-medium` | Home `/` · Brands `/brands` · Buy Back `/buyback` ⚠️ · About `/about` · Contact `/contact` · Terms & Conditions `/terms` (Careers + Pricing commented out) |
| Support | `text-itemtitle2 font-medium` | Company `/` ⚠️ · Contact Us `/contact` (Press media + Our Blog commented out) |
| Newsletter | *(fully commented out, lines 266–327)* | email input + arrow submit button — no backend, `action="#"` |

All links: `className="mb-3 inline-block hover:text-primary"`.

### 3.3 Footer Bottom (lines 334–509)

`flex flex-col items-center justify-center gap-5 border-t border-stroke py-7 dark:border-strokedark lg:flex-row lg:justify-between`

Three motion blocks (each `duration: 1, delay: 0.1`):
1. **Legal links:** Privacy Policy `/privacy-policy` · Support `#` ⚠️ (English commented out)
2. **Copyright:** `© {new Date().getFullYear()} Heliac Energii Controls Solutions. All rights reserved`
3. **Social icons:** 3 inline SVGs (Facebook, Twitter/X, LinkedIn) — all `href="#"` ⚠️ · 4th (Instagram?) commented out.
   - Styling: `className="fill-[#D1D8E0] transition-all duration-300 hover:fill-primary"` ⚠️ raw hex instead of `fill-socialicon` token.

### 3.4 Animation used today

Every block repeats the same boilerplate:
```tsx
variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
initial="hidden" whileInView="visible"
transition={{ duration: 1, delay: 0.5 }}   // logo/company block
transition={{ duration: 1, delay: 0.1 }}   // everything else
viewport={{ once: true }}
className="animate_top"
```
- No stagger index, no project easing curve, `y: -20` (falls *down* into place — unusual direction).

---

## 4. BUGS FOUND (fix during the redesign)

| # | Bug | Location | Fix |
|---|---|---|---|
| 1 | **Broken route** — Buy Back links to `/buyback` but the page is `app/(site)/buy-back/page.tsx` (404) | line 160 | use `/buy-back` (matches `menuData.tsx`) |
| 2 | **Dead link** — "Company" points to `/` (duplicate of Home) | line 234 | point to `/about` |
| 3 | **Dead link** — bottom "Support" is `href="#"` | line 365 | remove or point to `/contact` |
| 4 | **Dead links** — all 3 social icons are `href="#"` | lines 416, 440, 464 | real URLs if known, else remove or keep `#` with `aria-label` |
| 5 | **Wrong logo href** — `href="index.html"` (static-site leftover, full reload) | line 32 | `href="/"` or `<Link href="/">` |
| 6 | **Dark-mode bug** — first `<h4>` is `text-black` with **no** `dark:text-white` → invisible in dark mode | line 70 | add `dark:text-white` |
| 7 | **Dark-mode bug** — contact icons hardcode `color="black"` | lines 87, 99, 108 | use `className="text-black dark:text-white"` (or token) |
| 8 | **Raw hex** — `fill-[#D1D8E0]` instead of the `socialicon` token | lines 418, 442, 466 | `fill-socialicon` |
| 9 | **Missing Products link** — header nav has `/products`, footer doesn't | — | add to Quick Links |
| 10 | **`<a>` for internal routes** — no `next/link`, causes full page reloads | everywhere | use `Link` for internal, `<a>` only for `mailto:`/`tel:` |
| 11 | **Dead code** — ~150 lines of commented-out markup (newsletter, careers, pricing, press, blog, extra social) | multiple | delete during rewrite |
| 12 | **Duplicate alt text** — both logo images `alt="Logo"` (one is always hidden, acceptable) | lines 37, 44 | keep, or `alt="Heliac Energii Controls Solutions"` |

---

## 5. FORM LOGIC / CONTENT — DO NOT CHANGE

**Keep this content exactly:**
- Company name: `Heliac Energii Controls Solutions`
- Tagline: `Powering the Future of Industrial Innovation.`
- Email: `inquiry@heliacenergii.com` → `mailto: inquiry@heliacenergii.com`
- Phones: `0091 - 8411981840` → `tel://+00918411981840`, `0091 - 8793823181` → `tel://+00918793823181`
- Quick Links set (Home, Brands, Buy Back, About, Contact, Terms & Conditions)
- Support column (Company, Contact Us)
- Privacy Policy link
- Copyright with dynamic `new Date().getFullYear()`
- 3 social icons (Facebook, Twitter/X, LinkedIn)
- Logo swap logic (`logo.svg` light / `logo-dark.svg` dark)

**No backend / no new data sources.** The commented-out newsletter form has **no** email service — do not reintroduce it unless a real endpoint is provided (see Q7).

---

## 6. TECH STACK (fixed)

| Item | Value |
|---|---|
| Framework | Next.js `^13.5.6`, App Router |
| React | `18.2` |
| Language | TypeScript |
| Styling | Tailwind CSS `^3.3.5` |
| Animation | `framer-motion` `^10.12.16` |
| Theme | `next-themes`, `darkMode: "class"`, default light |
| Alias | `@/*` → repo root |

---

## 7. DESIGN SYSTEM (`tailwind.config.js`)

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
socialicon     #D1D8E0   ← use for social icon fills (replaces raw hex)
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
solid-5  0 8px 24px rgba(45,74,170,.08)        solid-10 0 8px 30px rgba(45,74,170,.06)
solid-6  0 8px 24px rgba(10,16,35,.08)         solid-11 0 6px 20px rgba(45,74,170,.05)
solid-l  0 10px 120px rgba(45,74,170,.1)       solid-12 0 2px 10px rgba(0,0,0,.05)
solid-13 0 2px 19px rgba(0,0,0,.05)
```

---

## 8. BUILT PRIMITIVES (already exist — MUST reuse, do not reinvent)

| Primitive | File | Use in footer |
|---|---|---|
| `GlassCard` | `components/Common/GlassCard.tsx` | Optional: glass panels for contact block / CTA card |
| `GlassPanel` | `components/Common/GlassPanel.tsx` | Lighter glass wrapper (older primitive) |
| `Button` | `components/Common/Button.tsx` | Any CTA (variants: primary/secondary/ghost/outline/icon/social; sizes sm/md/lg) |
| `ArrowIcon` | `components/Common/ArrowIcon.tsx` | Icon inside buttons |
| `SectionHeader` | `components/Common/SectionHeader.tsx` | Only if footer gains a section heading |
| `BrochureButton` + `useBrochureDownloads` | `components/Header/` | If footer offers brochure downloads (see Q6) |

### GlassCard API
```tsx
interface GlassCardProps {
  density?: "float" | "read";   // float = image cards, read = text cards
  tint?: string;                // e.g. "from-primaryho/15"
  glow?: boolean;
  index?: number;               // stagger = index * 0.05
  hover?: boolean;
  blur?: "xl" | "2xl";
  className?: string;
  children: React.ReactNode;
}
```
Layers built in: semi-transparent bg → tint gradient → top gloss → 1px specular rim → optional glow orb → hover lift → staggered entrance.

### Animation pattern (project standard)
```tsx
initial={{ opacity: 0, y: 12 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.15 }}
transition={{ duration: 0.3, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
// hover: whileHover={{ y: -4 }} + transition-[border-color,box-shadow] duration-300
```

### Reference components (quality bar)
- `components/Header/MobileMenu.tsx` — the most polished component: portal + `AnimatePresence`, stagger `index * 0.05`, glass optics, `ease: [0.23, 1, 0.32, 1]`.
- `components/Header/index.tsx` — header uses `<Button href="/contact" variant="primary" size="lg">`; footer should feel like the same family.
- `components/Contact/index.tsx` lines 82–84 — already defines a social array: `FaLinkedinIn`, `FaFacebookF`, `FaTwitter` (all `href="#"`). Reuse `react-icons` instead of inline SVG paths if desired.

---

## 9. AVAILABLE ASSETS

```
public/images/logo/logo.svg          ← light-mode logo (currently used)
public/images/logo/logo-dark.svg     ← dark-mode logo (currently used)
public/images/logo/logo.png
public/images/logo/logo-light.svg
public/images/shape/shape-dotted-light.svg
public/images/shape/shape-dotted-dark.svg
public/images/shape/shape-dotted-light-02.svg
public/images/shape/shape-dotted-dark-02.svg
public/images/shape/shape-01.png … shape-06.png
```

---

## 10. PROBLEMS WITH THE CURRENT DESIGN

| # | Problem | Impact |
|---|---|---|
| 1 | **Flat, template-y layout** — logo, text, two link columns in a plain row | Looks like the stock template it came from |
| 2 | **No glass** — plain `bg-white dark:bg-blacksection` | Inconsistent with the redesigned cards/header |
| 3 | **Dark-mode text bug** — company `<h4>` is `text-black` only | Heading disappears in dark mode |
| 4 | **Dark-mode icon bug** — contact icons hardcode `color="black"` | Icons disappear in dark mode |
| 5 | **Broken + dead links** (see §4) | 404s and dead ends |
| 6 | **Social icons are placeholder `#` links** | Non-functional |
| 7 | **Raw hex `#D1D8E0`** instead of `socialicon` token | Token discipline violated |
| 8 | **No CTA** — footer never invites action | Missed conversion surface |
| 9 | **No Products link** | Footer nav diverges from header nav |
| 10 | **`<a>` instead of `Link`** | Full-page reloads on every footer click |
| 11 | **~150 lines of commented-out code** | Maintenance noise |
| 12 | **Animation is 6 copies of the same block**, `y: -20`, `duration: 1` | Slow, repetitive, non-standard easing |
| 13 | **No visual hierarchy** — all columns equal weight | Company/contact block doesn't lead |
| 14 | **Column headings not tokenized** — Quick Links uses `font-medium`, company block uses `font-bold` | Inconsistent typography |
| 15 | **No hover states on contact rows** | Feels static |
| 16 | **Bottom bar is cramped on mobile** (3 stacked centered items) | Poor small-screen rhythm |
| 17 | **No back-to-top affordance in footer** (ScrollToTop exists separately) | Optional integration |
| 18 | **Link columns are centered oddly** (`md:justify-center`) | Alignment feels unresolved on tablet |

---

## 11. DESIGN DIRECTIONS (for the planning agent)

### Direction A — Glass-panel footer (recommended)
- Keep the `blacksection` background; float **one or two `GlassCard` panels** inside it:
  - Panel 1: logo + tagline + contact rows + socials (left, `tint="from-primaryho/15"`)
  - Panel 2: Quick Links / Support columns (right)
- Section top edge gets a subtle gradient fade from the page above.
- Stagger the panels in with `index * 0.05`.

### Direction B — CTA-first footer
- Top strip: a `GlassCard density="float" glow` CTA band — "Ready to power your operations?" + `<Button variant="primary">Get a Quote</Button>` + `<Button variant="outline">Brochure</Button>`.
- Below: the standard link columns on the flat `blacksection` bg.
- Most conversion-focused option; reuses `Button` + `BrochureButton`.

### Direction C — Mega-footer with newsletter-style form
- 4 columns: Brand/contact · Quick Links · Support/Products · Connect (socials + optional newsletter).
- Top border replaced by a `gradient-to-r from-primary/40 via-transparent` hairline.
- Note: the newsletter has no backend (see Q7).

### Direction D — Minimal bar
- Collapse to a compact single-row legal bar: logo mark · links · socials · copyright.
- Lightest option; loses content. Only if the client wants a slim footer.

### Direction E — Layered/depth footer
- `blacksection` bg + dotted shape overlay (`shape-dotted-dark.svg`) at low opacity + a soft `primary` glow orb bleeding up from the bottom edge.
- Columns sit directly on the background (no cards) but get hover-slide indicators (small `primary` bar animating in on link hover).

---

## 12. CONSTRAINTS

1. **Must reuse `Button`** for any CTA — no raw `<button>`/`<a>` styled by hand.
2. **Must use `framer-motion`** for animations; **`ease: [0.23, 1, 0.32, 1]`**, `duration-300`/`duration-500`, stagger `index * 0.05`.
3. **Must use design tokens only** — no raw hex (`fill-socialicon` replaces `fill-[#D1D8E0]`).
4. **Must have `dark:` variants on every element** — fix bugs #6 and #7.
5. **Must have `focus-visible` rings** on all links/icons (footer is keyboard-heavy).
6. **Must not add new dependencies** — `framer-motion`, `react-icons` already installed.
7. **Must not add new Tailwind tokens.**
8. **Must keep all existing content** (§5) and fix the link bugs (§4).
9. **Must use `next/link` `<Link>` for internal routes.**
10. **Must keep `dark:hidden` / `hidden dark:block` logo swap** (or equivalent `useTheme` logic).
11. **Must remain a client component** if it uses framer-motion `whileInView` (it does) — or use the `"use client"` directive as today.
12. **Must not break layout** — footer renders on every page after `{children}`; must not overlap `ScrollToTop` or `CookieConsent`.
13. **Must be responsive** at 320px, 768px, 1024px, 1280px+.
14. **Must delete commented-out dead code** rather than port it.
15. **Must keep the copyright dynamic** (`new Date().getFullYear()`).
16. **Must be screen-reader friendly** — semantic `<footer>`, `<nav aria-label="Footer">`, social links need unique `aria-label`s (currently all say "social icon").

---

## 13. OPEN QUESTIONS FOR THE PLANNING AGENT

**Q1 — Direction.** A (glass panels), B (CTA-first), C (mega-footer), D (minimal bar), or E (layered)? Recommend **A with elements of B** — glass contact panel + a slim CTA strip, since the header already carries the main CTA.

**Q2 — CTA strip.** Add a "Get a Quote" / brochure-download band above the link columns? Recommend: yes — `<Button variant="primary">Get a Quote</Button>` linking `/contact`, plus reuse `BrochureButton` if brochures are a priority.

**Q3 — Products link.** Add `/products` to Quick Links (header has it, footer doesn't)? Recommend: **yes**.

**Q4 — Link column split.** 2 columns (current) or reorganize into Company / Explore / Support? Recommend: **3 columns** — Company+Contact (left, wider), Explore (Home, Brands, Products, Buy Back, About), Support (Contact, Terms, Privacy Policy). Removes the weak "Company → /" entry.

**Q5 — Social URLs.** Real profile URLs are not in the repo (all `#`). Options: (a) supply real URLs, (b) remove the icons until available, (c) keep `#` placeholders. Recommend: **(a)** — provide them to the planning agent; otherwise (b).

**Q6 — Newsletter.** Re-enable the commented-out newsletter form? It has **no backend** (`action="#"`). Recommend: **no** until an endpoint (emailjs/Mailchimp) exists. If wanted, wire it to the existing emailjs setup used by the Contact form — but that's a separate task.

**Q7 — Glass or flat?** Should the footer be glass panels (Direction A) or stay on the flat `blacksection` with better typography (Direction E)? Recommend: **one glass contact panel**, not the whole footer — full glass on a dark footer can hurt text contrast.

**Q8 — Dark background.** Keep `bg-blacksection` (#1C2136) or go true black `bg-black`? Recommend: keep `blacksection` — it's the token used by dark sections site-wide.

**Q9 — Back-to-top.** Add a "Back to top" link inside the footer (in addition to the existing floating `ScrollToTop`)? Recommend: no — avoid duplication.

**Q10 — Legal row.** Merge Privacy Policy + Terms into the bottom bar, or keep Terms in Quick Links and Privacy in the bar (current)? Recommend: **Terms + Privacy together in the bottom bar**, freeing the link columns.

**Q11 — Hover treatment.** Simple `hover:text-primary` (current), animated underline, or sliding `primary` indicator? Recommend: **animated underline** (`after:` pseudo-element scaling from left with `origin-left`, `duration-300`) — cheap, on-brand.

**Q12 — Icons on contact rows.** Keep `react-icons` `MdOutlineEmail`/`MdOutlinePhone` or switch to `react-icons/hi`/`fa` used elsewhere in Contact? Recommend: keep `react-icons` but fix the hardcoded color — consistency with `components/Contact/index.tsx` matters more than the specific set.

**Q13 — Columns on tablet.** Current `md:justify-center` centers the link group awkwardly. Recommend: `md:justify-between` with a max-width container.

**Q14 — Logo link.** Fix `index.html` → `/`. Any objection? Recommend: no objection, just fix it.

---

## 14. DEFINITION OF DONE

- [ ] Footer redesigned per the chosen direction (specify which)
- [ ] Bug #1 fixed — `/buyback` → `/buy-back`
- [ ] Bug #2 fixed — "Company" → `/about`
- [ ] Bug #3 fixed — bottom "Support" `#` link resolved
- [ ] Bug #4 fixed — social links resolved per Q5
- [ ] Bug #5 fixed — logo href `index.html` → `/`
- [ ] Bug #6 fixed — `<h4>` gets `dark:text-white`
- [ ] Bug #7 fixed — contact icon colors get `dark:` variants
- [ ] Bug #8 fixed — `fill-[#D1D8E0]` → `fill-socialicon`
- [ ] Bug #9 fixed — `/products` added to links
- [ ] Bug #10 fixed — internal links use `next/link`
- [ ] Bug #11 fixed — commented-out dead code removed
- [ ] Contact rows have hover states
- [ ] Link hover treatment animated (`duration-300`, `origin-left`)
- [ ] Staggered entrance using `index * 0.05` and `ease: [0.23, 1, 0.32, 1]`
- [ ] CTA present (per Q2)
- [ ] Full dark-mode parity — verified by toggling on home, about, contact pages
- [ ] All colours from tokens only (no raw hex)
- [ ] Unique `aria-label`s on social icons; semantic `<nav>` landmark
- [ ] `focus-visible` ring on every link and icon
- [ ] No new dependencies, no new Tailwind tokens
- [ ] Responsive at 320 / 768 / 1024 / 1280+
- [ ] No overlap with `ScrollToTop` or `CookieConsent`
- [ ] All original content preserved (§5)
- [ ] `npx next build` passes with no errors

---

### The five findings that should drive the plan

1. **The footer has real bugs, not just styling issues** — `/buyback` 404s, "Company" and "Support" are dead links, and two headings/icons vanish in dark mode. Any redesign must fix these, not port them.
2. **It's the stock template footer** — 517 lines, ~150 of them commented out, with six copies of the same `motion.div` boilerplate and non-standard `y: -20` / `duration: 1` animation.
3. **No glass, no CTA, no Products link** — it's the only major surface not yet brought into the design system, and it never invites action despite being on every page.
4. **Social icons are placeholders and use raw hex** — `href="#"` ×3 and `fill-[#D1D8E0]` instead of the `socialicon` token.
5. **Internal navigation uses plain `<a>`** — every footer click triggers a full-page reload instead of client-side routing.
