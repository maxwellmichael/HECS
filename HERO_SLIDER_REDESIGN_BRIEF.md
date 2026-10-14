# CONTEXT BRIEF — Hero Slider (Caurosel1) Redesign

Repo root: `C:\Users\MAXWELL\Documents\Projects\Heliac\Heliacenergii` · Branch: `dev`

---

## 1. OBJECTIVE

Redesign the first hero slider on the home page (`components/Caurosel1/`) to be more modern, visually striking, and consistent with the project's glass aesthetic and animation standards. The current slider is a basic flowbite-react Carousel with a gradient overlay and left-aligned text — it lacks the polish, glass effects, and animation quality of the rest of the site.

---

## 2. CURRENT STATE — Full Audit

### 2.1 Component structure

```
components/Caurosel1/
  index.tsx              ← Carousel wrapper + slide data (65 lines)
  components/
    SliderImage.tsx      ← Individual slide (64 lines)
```

### 2.2 Caurosel1/index.tsx (the carousel wrapper)

```tsx
"use client";
import { Carousel } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import SliderImage from "./components/SliderImage";

const customTheme: CustomFlowbiteTheme["carousel"] = {
  root: {
    leftControl: "display-none",
    rightControl: "display-none",
  },
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-none",
    snap: "snap-x",
  },
};

const slides = [
  {
    id: 1,
    title: "Trouble Shooting, Servicing and supply of spares for Hydraulics & Pneumatics",
    description: "Heliac Energii excels in troubleshooting, servicing, and supplying spares for hydraulic and pneumatic systems across industries like Marine, Oil & Gas, Construction, and Power Plants...",
    imagePath: "/images/caurousel/slide_1.jpg",
  },
  {
    id: 2,
    title: "Electrical, Mechanical, Instrumentation & Automation Solutions",
    description: "Your one-stop destination for all Industrial Spares in Electrical, Mechanical, Instrumentation, and Automation...",
    imagePath: "/images/caurousel/slide_2.jpg",
  },
  {
    id: 3,
    title: "Asset Recovery",
    description: "Maximize asset value and secure the highest return on investments with our buy-back solutions.",
    imagePath: "/images/caurousel/slide_3.jpg",
  },
  // { id: 4, title: "Motor Repair", ... }  ← commented out
];

export default function Component() {
  return (
    <section className="pb-8 md:pb-20 pt-[90px] md:pt-[102px]">
      <div className="h-[368px] md:h-[700px] mx-auto max-w-c-1390">
        <Carousel theme={customTheme} onSlideChange={(index) => {}} leftControl=" " rightControl=" ">
          {slides.map((slide) => (
            <SliderImage key={slide.id} {...slide} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
```

### 2.3 SliderImage.tsx (individual slide)

```tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type TSlideImage = {
  title: string;
  description: string;
  imagePath: string;
  linkPath?: string;
};

export default function SliderImage({ title, description, imagePath, linkPath }: TSlideImage) {
  return (
    <section className="relative h-full w-full">
      {/* Gradient overlay */}
      <div className="absolute inset-0 z-20 bg-transparent bg-gradient-to-r from-white/60 to-white/30 md:from-white/90 md:to-white/20"></div>

      {/* Background image */}
      <Image
        src={imagePath}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1920px) 75vw, 33vw"
        alt="Picture of the About page banner"
        priority={true}
        className="absolute z-10"
      />

      {/* Content */}
      <div className="relative mx-auto max-w-screen-xl px-4 py-6 sm:px-6 md:py-12 lg:flex lg:h-full lg:items-center lg:px-8">
        <div className="absolute z-30 w-3/4 text-left md:max-w-xl">
          <motion.div
            variants={{ hidden: { opacity: 0, x: -80 }, visible: { opacity: 1, x: 0 } }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_left md:w-[70%] lg:w-full"
          >
            <h1 className="mb-2 text-itemtitle2 font-bold text-black dark:text-white md:mb-3 md:text-hero">
              <strong className="block font-extrabold text-primary">{title}</strong>
            </h1>
            <p className="text-metatitle sm:text-metatitle text-black md:text-para2">{description}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

### 2.4 Slide data

| ID | Title | Description | Image |
|---|---|---|---|
| 1 | Trouble Shooting, Servicing and supply of spares for Hydraulics & Pneumatics | Heliac Energii excels in troubleshooting, servicing, and supplying spares for hydraulic and pneumatic systems across industries like Marine, Oil & Gas, Construction, and Power Plants... | `/images/caurousel/slide_1.jpg` |
| 2 | Electrical, Mechanical, Instrumentation & Automation Solutions | Your one-stop destination for all Industrial Spares in Electrical, Mechanical, Instrumentation, and Automation... | `/images/caurousel/slide_2.jpg` |
| 3 | Asset Recovery | Maximize asset value and secure the highest return on investments with our buy-back solutions. | `/images/caurousel/slide_3.jpg` |
| 4 | Motor Repair (commented out) | Empower Your Electrical Systems with ACB Expertise | `/images/caurousel/slide_4.jpg` |

### 2.5 Where it's used

**File:** `app/(site)/page.tsx` line 18 — `<Caurosel1 />` is the first component on the home page, before `<Hero />`.

---

## 3. PROBLEMS WITH THE CURRENT DESIGN

| # | Problem | Impact |
|---|---|---|
| 1 | **No navigation controls** — arrows hidden, no dots, no indicators | User can't tell there are multiple slides or navigate between them |
| 2 | **No autoplay** — slides never change automatically | Static; user must manually scroll |
| 3 | **No glass effect** — uses a plain white gradient overlay | Inconsistent with the rest of the site |
| 4 | **Text sits on a gradient, not glass** — readability depends on image | Text may be unreadable on busy images |
| 5 | **No CTA button** — slides have no call-to-action | Missed conversion opportunity |
| 6 | **No slide indicators** — no dots, no progress bar | User can't tell which slide they're on |
| 7 | **No keyboard navigation** — can't use arrow keys | Accessibility issue |
| 8 | **No swipe gesture config** — uses flowbite's default | May not feel native on mobile |
| 9 | **Animation is basic** — only `x: -80 → 0` on the text block | No stagger, no parallax, no image zoom |
| 10 | **No parallax on image** — image is static | Missed depth effect |
| 11 | **No dark-mode-specific overlay** — gradient is always white | Dark mode looks washed out |
| 12 | **No slide counter** — no "1 / 3" indicator | Poor orientation |
| 13 | **No transition between slides** — abrupt cut | Feels mechanical |
| 14 | **No pause on hover** — if autoplay existed, it wouldn't pause | Poor UX |
| 15 | **No thumbnail navigation** — can't jump to a specific slide | Poor usability for 3+ slides |
| 16 | **Container is fixed height** — `h-[368px] md:h-[700px]` | Content may overflow or be clipped |
| 17 | **No responsive text sizing** — uses fixed breakpoints | Text may be too large/small on some devices |
| 18 | **No loading state** — image loads with `priority` but no skeleton | Flash of unstyled content |
| 19 | **No error state** — if image fails, the slide is blank | Poor resilience |
| 20 | **flowbite-react Carousel is heavy** — adds bundle size | Performance cost for a simple slider |

---

## 4. TECH STACK (fixed)

| Item | Value |
|---|---|
| Framework | Next.js `^13.5.6`, App Router |
| React | `18.2` |
| Language | TypeScript |
| Styling | Tailwind CSS `^3.3.5` |
| Animation | `framer-motion` `^10.12.16` |
| Theme | `next-themes`, `darkMode: "class"`, default light |
| Alias | `@/*` → repo root |
| Carousel lib | `flowbite-react` `^0.10.1` (current) — can be replaced |

---

## 5. DESIGN SYSTEM (`tailwind.config.js`)

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

---

## 6. GLASS CARD SYSTEM (already built — MUST use)

### GlassCard primitive
**File:** `components/Common/GlassCard.tsx`

```tsx
interface GlassCardProps {
  density?: "float" | "read";
  tint?: string;
  glow?: boolean;
  index?: number;
  hover?: boolean;
  blur?: "xl" | "2xl";
  className?: string;
  children: React.ReactNode;
}
```

### Glass layers (built into GlassCard)
1. Semi-transparent background (`bg-white/55` or `bg-white/85`)
2. Optional colour tint gradient
3. Top gloss gradient (`from-white/40`)
4. Specular rim light (1px top edge)
5. Optional hover glow orb
6. Hover lift (`whileHover={{ y: -4 }}`)
7. Staggered entrance (`delay: index * 0.05`)

### Animation patterns
```tsx
// Entrance
initial={{ opacity: 0, y: 12 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.15 }}
transition={{ duration: 0.3, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}

// Hover
whileHover={{ y: -4 }}
className="... transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-solid-5"
```

---

## 7. AVAILABLE ASSETS

### Slide images
```
public/images/caurousel/slide_1.jpg
public/images/caurousel/slide_2.jpg
public/images/caurousel/slide_3.jpg
public/images/caurousel/slide_4.jpg
```

### Shape/background assets
```
public/images/shape/shape-dotted-light.svg
public/images/shape/shape-dotted-dark.svg
public/images/shape/shape-dotted-light-02.svg
public/images/shape/shape-dotted-dark-02.svg
public/images/shape/shape-01.png through shape-06.png
```

### Brand assets
```
public/images/logo/logo.png        (light mode logo)
public/images/logo/logo-dark.svg    (dark mode logo)
```

---

## 8. COMPONENT PATTERNS (must follow)

### Section shell
```tsx
<section className="pb-8 md:pb-20 pt-[90px] md:pt-[102px]">
  <div className="mx-auto max-w-c-1390">
    {/* content */}
  </div>
</section>
```

### GlassCard (already built — use for text panels)
```tsx
<GlassCard index={0} density="read" glow className="p-8 md:p-12">
  {children}
</GlassCard>
```

### Button primitive (already built)
```tsx
<Button href="/contact" variant="primary" size="lg">Get Started</Button>
<Button href="/brands" variant="outline" size="lg">View Brands</Button>
```

### MobileMenu (reference for glass + animation quality)
`components/Header/MobileMenu.tsx` — the most polished component in the project. Uses:
- `createPortal` for rendering
- `AnimatePresence` for enter/exit
- Staggered children (`delay: index * 0.05`)
- Glass optics (blur orb, top gradient, edge highlight)
- `ease: [0.23, 1, 0.32, 1]` easing
- Body scroll lock
- Escape key + click-outside to close
- Focus management

---

## 9. DESIGN DIRECTIONS (for the planning agent to consider)

### Direction A — Full-screen glass hero with parallax
- Full-viewport-height slides with background image
- Glass text panel floating on the left (or center)
- Parallax: image moves at 50% speed on scroll
- Text staggers in: title → description → CTA
- Slide indicators: thin progress bars at the bottom
- Autoplay with pause on hover
- Keyboard navigation (arrow keys)
- Swipe gesture support

### Direction B — Split-screen slide
- Left: glass panel with text + CTA (50% width)
- Right: full-bleed image (50% width)
- Image has a subtle zoom on slide change
- Active slide indicator: vertical dots on the left edge
- Stagger animation on text elements

### Direction C — Carousel with thumbnail navigation
- Large main slide (image + glass text panel)
- Thumbnail strip at the bottom showing all slides
- Click thumbnail to jump to that slide
- Active thumbnail has a blue border
- Autoplay with progress indicator

### Direction D — Cinematic Ken Burns effect
- Full-screen background image with slow zoom (Ken Burns)
- Glass text panel fades in after the image settles
- Slide transition: crossfade + scale
- Progress bar at the bottom showing time until next slide
- Pause on hover, play/pause button

### Direction E — Minimal typography-focused
- No image — just a gradient/glass background
- Giant typography as the hero
- Subtle animated shapes in the background
- CTA buttons below the text
- Most minimal; good for brand-focused messaging

---

## 10. CONSTRAINTS

1. **Must use `GlassCard`** for text panels — no plain gradient overlays
2. **Must use `framer-motion`** for all animations
3. **Must use design tokens only** — no raw hex colours
4. **Must have `dark:` variants** on every element
5. **Must have `focus-visible` ring** on all interactive elements
6. **Must use `ease: [0.23, 1, 0.32, 1]`** for animations
7. **Must use `duration-300` or `duration-500`**
8. **Must not add new dependencies** — `framer-motion` is already installed
9. **Must not add new Tailwind tokens**
10. **Must keep the slide data** — 3 active slides with their titles, descriptions, and images
11. **Must keep the section position** — it's the first component on the home page
12. **Must be responsive** — works on 320px, 768px, 1024px, 1280px+
13. **Must handle image loading** — show a skeleton or placeholder while the image loads
14. **Must handle image error** — show a fallback if the image fails to load
15. **Must be accessible** — keyboard navigation, ARIA labels, screen reader support
16. **Must not break the home page layout** — the slider sits between the header and the Hero section

---

## 11. OPEN QUESTIONS FOR THE PLANNING AGENT

**Q1 — Carousel library.** Keep `flowbite-react` Carousel or build a custom slider with `framer-motion`? Recommend: **build custom** — `framer-motion` + `AnimatePresence` gives full control over transitions, parallax, and stagger. The flowbite Carousel is heavy and limited.

**Q2 — Autoplay.** Should slides auto-advance? Recommend: yes — 6 second interval, pause on hover, pause when tab is not visible.

**Q3 — Navigation.** Arrows, dots, thumbnails, or progress bar? Recommend: **progress bar + arrows** — thin progress bar at the bottom (fills over 6 seconds), arrows on the sides (appear on hover).

**Q4 — CTA.** Should each slide have a CTA button? Recommend: yes — slide 1: "Get Started" (primary), slide 2: "View Brands" (outline), slide 3: "Sell Your Surplus" (primary).

**Q5 — Text position.** Left, center, or right? Recommend: **left** — matches the current design and is the most common hero pattern.

**Q6 — Glass panel.** Should the text sit on a glass panel or directly on the image? Recommend: **glass panel** — `GlassCard density="read"` with `tint="from-primaryho/15"` for brand consistency.

**Q7 — Parallax.** Should the background image move on scroll? Recommend: yes — subtle parallax (image moves at 30% speed) for depth.

**Q8 — Ken Burns.** Should the image slowly zoom? Recommend: yes — subtle scale from 1.0 to 1.1 over the autoplay duration.

**Q9 — Dark mode.** Should dark mode use a different overlay? Recommend: yes — in dark mode, use `bg-blacksection/80` instead of `bg-white/90` for the gradient overlay.

**Q10 — Slide counter.** Should there be a "1 / 3" indicator? Recommend: yes — small text in the bottom-right corner.

**Q11 — Keyboard navigation.** Should arrow keys change slides? Recommend: yes — left/right arrows, Home/End for first/last.

**Q12 — Touch/swipe.** Should mobile users swipe to change slides? Recommend: yes — use `framer-motion`'s `drag` gesture or a simple touch handler.

**Q13 — Reduced motion.** Should the design respect `prefers-reduced-motion`? Recommend: yes — disable autoplay and parallax for users who prefer reduced motion.

**Q14 — 4th slide.** Should the commented-out "Motor Repair" slide be re-enabled? Recommend: yes — 4 slides gives the carousel more purpose.

---

## 12. DEFINITION OF DONE

- [ ] Hero slider redesigned with glass text panel and framer-motion animations
- [ ] Custom slider built (no flowbite-react Carousel)
- [ ] Autoplay with 6-second interval, pause on hover
- [ ] Navigation: progress bar + side arrows (appear on hover)
- [ ] Keyboard navigation (arrow keys)
- [ ] Touch/swipe support on mobile
- [ ] Parallax on background image
- [ ] Ken Burns slow zoom on active slide
- [ ] Text staggers in: title → description → CTA
- [ ] CTA button on each slide
- [ ] Slide counter ("1 / 3")
- [ ] Full dark-mode parity
- [ ] Image loading state (skeleton)
- [ ] Image error state (fallback)
- [ ] `prefers-reduced-motion` support
- [ ] All colours from design tokens only
- [ ] All animations use `ease: [0.23, 1, 0.32, 1]`
- [ ] Text panel uses `GlassCard`
- [ ] No new dependencies added
- [ ] No new Tailwind tokens added
- [ ] Responsive: works on 320px, 768px, 1024px, 1280px+
- [ ] `npm run build` passes with no errors
