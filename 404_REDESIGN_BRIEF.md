# CONTEXT BRIEF — 404 Page Redesign

Repo root: `C:\Users\MAXWELL\Documents\Projects\Heliac\Heliacenergii` · Branch: `dev`

---

## 1. OBJECTIVE

Redesign the 404 error page using modern design standards while strictly adhering to the project's existing colors, typography, spacing, shadows, and component patterns. The page should feel like a natural part of the Heliac Energii website — not a generic template error page.

---

## 2. CURRENT 404 PAGE (what exists today)

**File:** `app/(site)/error/page.tsx` (39 lines)

```tsx
import { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Common/Button";

export const metadata: Metadata = {
  title: "Error Page - Solid SaaS Boilerplate",
  description: "This page is for Solid Pro",
};

const ErroPage = () => {
  return (
    <section className="overflow-hidden pb-25 pt-45 lg:pb-32.5 lg:pt-50 xl:pb-37.5 xl:pt-55">
      <div className="animate_top mx-auto max-w-[518px] text-center">
        <Image
          src="/images/shape/404.svg"
          alt="404"
          className="mx-auto mb-7.5"
          width={400}
          height={400}
        />
        <h2 className="mb-5 text-2xl font-semibold text-black dark:text-white md:text-4xl">
          This Page Does Not Exist
        </h2>
        <p className="mb-7.5">
          The page you were looking for appears to have been moved, deleted or
          does not exist.
        </p>
        <Button href="/" variant="secondary" size="md">
          Return to Home
        </Button>
      </div>
    </section>
  );
};

export default ErroPage;
```

### Problems with the current design
1. **Metadata is wrong** — title says "Solid SaaS Boilerplate" (template leftover), not "Heliac Energii"
2. **Generic layout** — centered SVG + heading + paragraph + button. No visual interest, no brand personality.
3. **Wasted space** — 400×400 SVG in a 518px container on a large viewport; the page feels empty and small.
4. **No dark-mode-specific artwork** — uses the same `404.svg` in both modes.
5. **No secondary action** — only "Return to Home"; no link to Contact, no search, no popular pages.
6. **No animation** — only `animate_top` on the wrapper; the SVG itself is static.
7. **Container too narrow** — `max-w-[518px]` is unnecessarily constraining for a full-page error state.
8. **No visual hierarchy** — the "404" number is inside the SVG (not selectable, not styleable); the heading is only `text-2xl`/`md:text-4xl`.

---

## 3. TECH STACK (fixed)

| Item | Value |
|---|---|
| Framework | Next.js `^13.5.6`, App Router |
| React | `18.2` |
| Language | TypeScript |
| Styling | Tailwind CSS `^3.3.5` |
| Animation | `framer-motion` `^10.12.16` |
| Theme | `next-themes`, `darkMode: "class"`, default light |
| Alias | `@/*` → repo root |
| Images | `next/image` with local assets only (`images.domains: ["localhost"]`) |

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
btndark        #292E45   (dark-mode button bg)
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

### Typography scale
```
metatitle 12px/20px · sectiontitle 14px/22px · regular 16px/26px
metatitle3 18px/26px · metatitle2 20px/32px · para2 22px/35px
itemtitle 26px/32px · itemtitle2 24px/32px · hero 44px/58px
sectiontitle3 44px/55px · sectiontitle4 34px/48px
```
Font: **Inter** (loaded via `next/font/google` in `app/(site)/layout.tsx`). No other font may be introduced.

### Spacing (custom half-steps)
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

### Max widths
```
c-1390 86.875rem · c-1315 82.188rem · c-1280 80rem · c-1235 77.188rem
c-1154 72.125rem · c-1016 63.5rem
```

### z-index
`99999`, `999`, `1`

---

## 5. COMPONENT PATTERNS (must follow)

### Page shell convention
```tsx
<section className="overflow-hidden pb-25 pt-45 lg:pb-32.5 lg:pt-50 xl:pb-37.5 xl:pt-55">
  <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
    {/* content */}
  </div>
</section>
```
Other sections use `max-w-c-1315`. The 404 page can use either — decide based on layout.

### Framer-motion pattern (used on every page)
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
Cards use `y: -10`, `duration: 0.5`. Section headers use `y: -20`, `duration: 1, delay: 0.1`.

### Button primitive (already standardized — MUST use this)
```tsx
import Button from "@/components/Common/Button";
import ArrowIcon from "@/components/ArrowIcon";

<Button href="/" variant="secondary" size="md">Return to Home</Button>
<Button href="/contact" variant="primary" size="md" icon={<ArrowIcon />} iconPosition="right">
  Contact Us
</Button>
```
Variants: `primary` | `secondary` | `ghost` | `outline` | `icon` | `social`
Sizes: `sm` | `md` | `lg`
All buttons have `focus-visible:ring-2 focus-visible:ring-primaryho` built in.

### Section header pattern (if needed)
```tsx
<SectionHeader headerInfo={{ title: "…", subtitle: "…", description: "…" }} />
```
Uses `components/Common/SectionHeader.tsx` — pill eyebrow + `text-3xl` heading + description.

---

## 6. AVAILABLE ASSETS

### Current 404 artwork
- `public/images/shape/404.svg` — the current 404 illustration (400×400)

### Shape/background assets (can be used for decoration)
```
public/images/shape/shape-dotted-light.svg      (dotted pattern, light mode)
public/images/shape/shape-dotted-dark.svg       (dotted pattern, dark mode)
public/images/shape/shape-dotted-light-02.svg
public/images/shape/shape-dotted-dark-02.svg
public/images/shape/shape-01.png
public/images/shape/shape-02.svg
public/images/shape/shape-03.svg
public/images/shape/shape-04.png
public/images/shape/shape-05.png
public/images/shape/shape-06.png
```

### Brand assets
```
public/images/logo/logo.png        (light mode logo)
public/images/logo/logo-dark.svg    (dark mode logo)
public/images/logo/logo.svg
```

### Other imagery
```
public/images/hero/electric_banner_1.jpg
public/images/about/banner_1.jpg
public/images/services/…
public/images/products/…
```

---

## 7. PAGE STRUCTURE CONTEXT

The 404 page lives in `app/(site)/error/page.tsx` and is wrapped by `app/(site)/layout.tsx`:
```tsx
// app/(site)/layout.tsx
<body className={`dark:bg-black ${inter.className}`}>
  <ThemeProvider enableSystem={false} attribute="class" defaultTheme="light">
    <ToasterContext />
    <Lines />
    <Header />
    {children}    ← 404 page renders here
    <Footer />
    <ScrollToTop />
  </ThemeProvider>
</body>
```

The page already has Header and Footer. The 404 content sits between them.

### Other pages for reference
| Page | File | Layout pattern |
|---|---|---|
| Home | `app/(site)/page.tsx` | Full-width sections |
| About | `app/(site)/about/page.tsx` | Banner image (360/720px) + content |
| Contact | `app/(site)/contact/page.tsx` | Form + info panel |
| Blog details | `app/(site)/blog/blog-details/page.tsx` | Content + sidebar |
| Auth | `app/(site)/auth/signin/page.tsx` | Centered card (max-w-c-1016) |
| Docs | `app/(site)/docs/page.tsx` | Sidebar + content |

---

## 8. DARK MODE REQUIREMENTS

- Every element must have `dark:` variants
- Body text: `text-waterloo dark:text-manatee`
- Headings: `text-black dark:text-white`
- Backgrounds: `bg-white dark:bg-blacksection`
- Borders: `border-stroke dark:border-strokedark`
- The 404 artwork should either work in both modes or have a dark-mode variant
- Dotted shape overlays have light/dark variants: `shape-dotted-light.svg` / `shape-dotted-dark.svg`

---

## 9. ACCESSIBILITY REQUIREMENTS

- All interactive elements must have `focus-visible:ring-2 focus-visible:ring-primaryho` (Button has this built in)
- Icon-only buttons must have `aria-label`
- The "404" number should be real text (not only inside an SVG) for screen readers
- Sufficient color contrast: body text `waterloo` on `white` / `manatee` on `blacksection`
- Minimum touch target: 44×44px for any clickable element

---

## 10. MODERN 404 DESIGN DIRECTIONS (for the design agent to consider)

These are suggestions, not mandates. The design agent should pick one direction and execute it well.

### Direction A — Bold typographic
- Giant "404" as real text (e.g. `text-[200px]` or larger, `font-bold`, `text-primary` or gradient)
- Subtle dotted shape background (light/dark variants)
- Heading + description + 2 buttons (primary "Return to Home", ghost "Contact Us")
- Framer-motion: number slides in, text fades up

### Direction B — Split layout
- Left: large illustration or branded graphic + "404" text
- Right: heading, description, CTA buttons, maybe quick links
- Stacks vertically on mobile

### Direction C — Centered card
- Card with `rounded-2xl border border-white bg-white shadow-solid-3 dark:border-strokedark dark:bg-blacksection`
- Illustration at top, content below
- Dotted shape background behind the card

### Direction D — Interactive/playful
- Animated SVG (framer-motion path animation)
- Hover effects on the 404 number
- Subtle parallax or mouse-follow effect

### Common elements across all directions
- Fix metadata: title should be "Page Not Found | Heliac Energii" or similar
- At least 2 actions: "Return to Home" (primary) + "Contact Us" or "Go Back" (ghost/secondary)
- Optional: quick links to popular pages (Brands, About, Contact)
- Optional: search input (non-functional is fine, or link to /blog)

---

## 11. OPEN QUESTIONS FOR THE DESIGN AGENT

**Q1 — Artwork.** Keep the existing `404.svg` (restyled via CSS/filters) or create a new visual using the dotted shapes + typography? Recommend: use real text for "404" (selectable, styleable, accessible) + dotted shape decoration.

**Q2 — Layout.** Centered single column, split two-column, or card? Recommend: centered with generous spacing (the page should feel open, not cramped like the current 518px container).

**Q3 — Actions.** How many and which? Minimum: "Return to Home" (primary). Recommended second: "Contact Us" (ghost). Optional third: "View Brands" or search.

**Q4 — Animation.** Subtle fade/slide (matches current `animate_top` pattern) or something more elaborate? Recommend: subtle — the project uses `animate_top` everywhere; a 404 page should not be jarring.

**Q5 — Container width.** `max-w-c-1390` (full width) or `max-w-c-1315` (standard section) or something narrower? Recommend: `max-w-c-1390` for the section, with inner content constrained to `max-w-[600px]` or similar for readability.

**Q6 — Dark mode artwork.** Does the design need a separate dark-mode visual, or does one design work for both? Recommend: use the dotted shape overlays (which have light/dark variants) + real text that adapts via `dark:` classes.

**Q7 — Metadata.** Update to `"Page Not Found | Heliac Energii Controls Solutions"` with description `"The page you are looking for does not exist. Return to the homepage or contact us."`?

**Q8 — Quick links.** Add a row of popular page links (Home, Brands, About, Contact) below the CTA? This is common on modern 404 pages.

---

## 12. DEFINITION OF DONE

- [ ] `app/(site)/error/page.tsx` redesigned with modern layout
- [ ] Metadata updated (title + description mention Heliac Energii)
- [ ] "404" is real text (not only inside SVG) for accessibility
- [ ] Uses `Button` primitive for all actions (no hand-rolled buttons)
- [ ] At least 2 actions: "Return to Home" (primary) + one secondary/ghost
- [ ] Full dark-mode parity on every element
- [ ] Framer-motion animation matching house pattern (`animate_top` or similar)
- [ ] All colours from design tokens only — no raw hex
- [ ] All spacing/shadows/typography from the custom scale
- [ ] `focus-visible` ring on all interactive elements
- [ ] Responsive: works on mobile (320px), tablet, desktop
- [ ] `npm run build` passes with no errors
- [ ] No new dependencies added
- [ ] No new Tailwind tokens added
