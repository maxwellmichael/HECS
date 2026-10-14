# CONTEXT BRIEF — "Our Certifications" Section

Repo root: `C:\Users\MAXWELL\Documents\Projects\Heliac\Heliacenergii`
Git branch: `dev` (working tree has untracked `public/certifications/`)

---

## 1. TASK

Create a new, self-contained section component matching the supplied mockup:

- Eyebrow: **OUR CERTIFICATIONS**
- Heading: **We Are Certified In**
- 3 cards, one per certificate PDF:
  1. `ISO 9001:2015` / `Quality Management`
  2. `ISO 14001:2015` / `Environmental Management`
  3. `ISO 45001:2018` / `Occupational Health & Safety`
- Each card = certificate image preview + ISO code (bold) + short label (orange).
- **The component must NOT be wired into any page.** The user will place it manually afterwards. It only needs to be created and exported.

### Hard constraints from the user
- Use the system's **existing design system** and the **same component structure and styling strictly**.
- Certificate source files live in `public/certifications/`.

---

## 2. TECH STACK (fixed, do not change)

| Item | Value |
|---|---|
| Framework | Next.js `^13.5.6`, **App Router** (`app/` dir) |
| React | `18.2` |
| Language | TypeScript (`strict: false`, `strictNullChecks: true`) |
| Styling | Tailwind CSS `^3.3.5` + `prettier-plugin-tailwindcss` |
| Animation | `framer-motion` `^10.12.16` (every section uses it) |
| UI kit | `flowbite-react` `^0.10.1` (used sparingly, e.g. Header button) |
| Icons | `react-icons` `^5.2.1` |
| Carousel | `react-glider` `^4.0.2` |
| Toasts | `react-hot-toast` `^2.4.1` |
| Theme | `next-themes`, `darkMode: "class"` |
| Path alias | `@/*` → repo root (`tsconfig.json`) |

Scripts: `npm run dev`, `npm run build`, `npm run lint`.

### Notable config facts
- `next.config.js` → `images.domains: ["localhost"]`, remote `cdn.sanity.io`. **No other remote images allowed.**
- `postcss.config.js` — standard tailwind.
- `.prettierrc.json` → `{ "plugins": ["prettier-plugin-tailwindcss"] }` (class order is auto-normalised on format).
- Fonts: `Inter` loaded via `next/font/google` in `app/(site)/layout.tsx`, exposed as Tailwind font family `font-inter`. **Only one font — do not introduce a second font** (the mockup's condensed heading look must be approximated with weight/tracking, not a new typeface).

---

## 3. DESIGN SYSTEM (`tailwind.config.js`)

### Colours (`theme.extend.colors`)
```
current      #currentColor          titlebgdark    #46495A
transparent                          btndark        #292E45
stroke        #EEEEEE               white          #FFFFFF
strokedark    #2D2F40               black          #181C31
hoverdark     #252A42               blackho        #2C3149
titlebg       #ADFFF8               blacksection   #1C2136
titlebg2      #FFDF68               primary        #2b4797
titlebg2Light #dfc35b               primaryho      #0063EC
primaryLight  #879dde               meta           #20C5A8
waterloo      #757693  (body text)  manatee        #999AA1  (dark body text)
alabaster     #FBFBFB               zumthor        #EDF5FF
socialicon    #D1D8E0
```

> **IMPORTANT GAP:** The mockup's accent orange does **not** exist in the token set. Only inline occurrence of an orange in the codebase is `bg-[#EF5C00]` in `components/Integration/index.tsx`. The planning decision is whether to (a) add an `orange`/`brandOrange` token to `tailwind.config.js` (≈ `#F26522`/`#FF6B2C`) or (b) reuse `primary` blue. See §8 Q3.

### Typography scale (`theme.extend.fontSize`)
```
metatitle   12px/20px     regular      16px/26px     para2        22px/35px
sectiontitle14px/22px     metatitle3   18px/26px     itemtitle    26px/32px
sectiontitle2 40px/52px   metatitle2   20px/32px     itemtitle2   24px/32px
hero        44px/58px     sectiontitle3 44px/55px    sectiontitle4 34px/48px
```

### Max widths
```
c-1390  86.875rem   c-1315 82.188rem   c-1280 80rem
c-1235  77.188rem   c-1154 72.125rem   c-1016 63.5rem
```

### Spacing scale
Custom half-steps exist: `4.5 5.5 6.5 7.5 8.5 10.5 11.5 12.5 13 13.5 14.5 15 15.5 16 17 17.5 18 18.5 19 21 21.5 22 22.5 25 27 27.5 29 29.5 30 32.5 35 37.5 40 42.5 45 46 47.5 50 55 60 65 67 67.5 90`
(replaces the default 1–12 scale partially — **`px-3`, `py-4`, `p-7`, `mb-5` etc. are still valid defaults**; the codebase freely mixes both.)

### Box shadows
```
solid-2  0 2px 10px rgba(122,135,167,.05)     solid-7   0 30px 50px rgba(45,74,170,.1)
solid-3  0 6px 90px rgba(8,14,40,.04)         solid-8   0 12px 120px rgba(45,74,170,.06)
solid-4  0 6px 90px rgba(8,14,40,.1)          solid-9   0 12px 30px rgba(45,74,170,.06)
solid-5  0 8px 24px rgba(45,74,170,.08)      solid-10  0 8px 30px rgba(45,74,170,.06)
solid-6  0 8px 24px rgba(10,16,35,.08)       solid-11  0 6px 20px rgba(45,74,170,.05)
solid-l  0 10px 120px rgba(45,74,170,.1)     solid-12/13  0 2px 10px/19px rgba(0,0,0,.05)
```
**Most-used in cards: `shadow-solid-3`, hover `shadow-solid-4`, hero `shadow-solid-l`.**

### z-index
`99999`, `999`, `1` (Header uses `z-999`, decorative layers use `z-1`).

### `app/globals.css` essentials
```css
body { @apply relative z-1 font-inter text-regular font-normal text-waterloo dark:text-manatee; }
```
Also defines `.no-scrollbar`, `.img-white`, `.active-tab`, `.loader`, `.blog-details*`, swiper pagination overrides.

**Dark mode is mandatory on every element** — every component pairs `text-black dark:text-white`, `bg-white dark:bg-blacksection`, `border-white dark:border-strokedark`, etc.

---

## 4. COMPONENT STRUCTURE CONVENTIONS (follow exactly)

Folder-per-section pattern:
```
components/<SectionName>/
  index.tsx        ← section shell + grid + <SectionHeader/>
  Single<Item>.tsx ← one card, framer-motion animated
  <name>Data.tsx   ← data array, typed via types/
```
Data files default-export a typed array; types live in `types/*.ts` (e.g. `types/feature.ts` exports `Feature`, `Service`, `Product`).

Canonical section shell (copy this):
```tsx
"use client";
import React from "react";
import data from "./xData";
import SingleX from "./SingleX";
import SectionHeader from "../Common/SectionHeader";

const XSection = () => (
  <>
    {/* <!-- ===== X Start ===== --> */}
    <section id="x" className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <SectionHeader headerInfo={{ title: "…", subtitle: "…", description: "…" }} />
        <div className="mt-12.5 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-12.5">
          {data.map((item, key) => <SingleX feature={item} key={key} />)}
        </div>
      </div>
    </section>
    {/* <!-- ===== X End ===== --> */}
  </>
);
export default XSection;
```

### Canonical card / framer-motion pattern (used verbatim in Features, Services, NewProducts)
```tsx
<motion.div
  variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
  initial="hidden"
  whileInView="visible"
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
  className="animate_top z-40 rounded-lg border border-white bg-white p-7.5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark"
>
```
Section headers use `y: -20`, `duration: 1, delay: 0.1`. Cards use `y: -10`, `duration: 0.5`.

### The two shared section headers — `components/Common/`
`SectionHeader.tsx` and `SectionHeader2.tsx` are **byte-identical except the eyebrow pill colour**:

`SectionHeader.tsx` (blue pill):
```tsx
<div className="mb-4 inline-block rounded-full bg-primaryho px-4.5 py-1.5 dark:border dark:border-strokedark dark:bg-blacksection">
  <span className="text-sectiontitle font-medium text-white dark:text-white">{title}</span>
</div>
<h2 className="mx-auto mb-4 text-3xl font-bold text-black dark:text-white md:w-4/5 xl:w-1/2 xl:text-sectiontitle3">{subtitle}</h2>
<p className="mx-auto md:w-4/5 lg:w-3/5 xl:w-[46%]">{description}</p>
```
`SectionHeader2.tsx` (light-blue pill `bg-zumthor`, `text-black`).

Both are wrapped in `<motion.div className="animate_top mx-auto text-center">` with `{ hidden:{opacity:0,y:-20}, visible:{opacity:1,y:0} }`.

> **MISMATCH:** the mockup shows a **plain orange uppercase letterspaced eyebrow** (no pill) + heading + a **short centred divider rule**. Neither exists in the codebase today. Decision required — see §8 Q1.

---

## 5. REFERENCE COMPONENTS TO MIMIC

| Need | Reference file |
|---|---|
| Section shell + grid | `components/Features/index.tsx` (3-col grid, `mt-12.5 … xl:gap-12.5`) |
| Card w/ image + title + sub | `components/NewProductsSection/SingleProduct.tsx` (img, then `h5.sectiontitle4 text-black`, then secondary line) |
| Card hover + dark mode | `components/Features/SingleFeature.tsx`, `components/ServicesSection/SingleProduct.tsx` |
| Section w/ bg gradient panel | `components/FunFact/index.tsx` (`bg-gradient-to-t from-[#F8F9FF] to-[#DEE7FF]`, dotted shape overlay) |
| Arrow CTA pill | `components/CTA/index.tsx` (`rounded-full bg-black px-6 py-3 … hover:opacity-90`) |
| Download-file handler | `components/Header/index.tsx` L33-45 (temp `<a download>` + `toast.success`) |
| Open PDF in new tab | `components/ISOCertification.tsx` (`window.open(path, "_blank")`) |

### Existing PDF/asset download helper (verbatim)
```ts
const fileUrl = "/downloads/brochure.pdf";
const link = document.createElement("a");
link.href = fileUrl;
link.download = "brochure.pdf";
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
toast.success(`File Downloaded Successfully.`);
```

---

## 6. ASSETS ON DISK

`public/certifications/` — **untracked in git**, filenames contain spaces:
```
HELIAC ENERGII CONTROLS SOLUTIONS ISO 9001 - 2015.pdf   (748 KB)  → ISO 9001:2015  / Quality Management
HELIAC ENERGII CONTROLS SOLUTIONS 14.pdf                (1.23 MB) → ISO 14001:2015 / Environmental Management
HELIAC ENERGII CONTROLS SOLUTIONS 45.pdf                (1.22 MB) → ISO 45001:2018 / Occupational Health & Safety
```
Mapping derived from filenames + mockup labels. (Verify 14 = 14001, 45 = 45001 by opening the PDFs.)

Other relevant asset dirs:
- `public/images/certifications/` — **exists but is EMPTY** (intended home for card preview images).
- `public/iso/badge.jpg`, `public/iso/certificate.pdf` — legacy single-certificate assets.
- `public/images/shape/` — dotted/shape SVGs used as section overlays.
- `public/images/services/`, `public/images/products/`, `public/images/brand/` — existing card imagery patterns.

⚠️ `next/image` **cannot render PDFs**. Preview images must be produced (PNG/WebP exported from page 1 of each PDF) or the PDF must be embedded via `<object>`/`<iframe>`.

---

## 7. EXISTING `ISOCertification` COMPONENT (legacy — do not silently delete)

`components/ISOCertification.tsx` — 29 lines, `"use client"`, shows `/iso/badge.jpg` + text "We are ISO 9001:2015 certified for Quality Management, certified by KSR Certification." + "View Certificate" link opening `/iso/certificate.pdf`. Not currently imported by any page. Flag to the user: the new section supersedes it.

---

## 8. OPEN QUESTIONS FOR THE PLAN TO RESOLVE (decide + justify, don't ask the user)

**Q1 — Section header treatment.**
Option A: reuse `components/Common/SectionHeader` verbatim (title `"OUR CERTIFICATIONS"`, subtitle `"We Are Certified In"`, empty/short description) → maximum consistency with every other section, but diverges from the mockup's orange eyebrow + divider rule.
Option B: add `components/Common/SectionHeader3.tsx` following the exact same markup/classes as its siblings, swapping only the eyebrow treatment to match the mockup (plain `text-sectiontitle font-medium uppercase tracking-*`, no pill) and appending the centred divider rule.
Option C: local inline header inside the new section (no shared component change).
Recommend B if the mockup is authoritative; A if "strict existing styling" outranks the mockup. Note the codebase already establishes the precedent of near-duplicate header variants (SectionHeader / SectionHeader2).

**Q2 — Certificate preview rendering.** Images exported to `public/images/certifications/*.png|webp` + `next/image` (recommended: matches every other card, keeps `next/image` optimisation, no new deps) vs. `<object type="application/pdf">` / `<iframe>` inside the card (true-to-file, but inconsistent with the design system and heavy on mobile). If images: filenames should be slugified (`iso-9001.png`, `iso-14001.png`, `iso-45001.png`) and a `width`/`height` or `fill` + `sizes` supplied. Also decide whether the PDF filenames should be renamed to remove spaces (spaces force `%20` encoding in `href`/`src` and break the `link.download` filename).

**Q3 — Accent colour.** Add a token to `tailwind.config.js` `theme.extend.colors` (e.g. `brandorange: "#F26522"`) vs. reuse existing `primary` blue. If a new token is added, note it in the plan as a global design-system change. Also decide dark-mode value.

**Q4 — Card interaction.** Click behaviour: open PDF in new tab (`window.open(url, "_blank")` — matches `ISOCertification.tsx`), trigger download (`<a download>` + toast — matches `Header`), or non-clickable display-only. Also decide if a hover overlay ("View Certificate" pill) is added, and whether the whole card is an `<a>` (current product cards use `<a href="#" className="relative rounded-lg bg-stroke">` wrapping the image + meta block).

**Q5 — Grid & responsiveness.** Mockup is 3-up. Existing precedent for 3-up: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-12.5`. Certificates are portrait/A4-ish (taller than wide) whereas existing cards are landscape — aspect ratio handling (`aspect-*`, `object-contain` vs `object-cover`) and card height balance need deciding. Consider whether certificates need a `max-h` with `object-contain` and white padding to avoid cropping the seal.

**Q6 — Container width.** Sections use `max-w-c-1315` (Features, Services, NewProducts, BrandsSection) or `max-w-c-1390` (Hero, CTA, FunFact, Integration, header/footer). 3 large portrait cards likely want `c-1315` or `c-1390` — decide.

**Q7 — Data typing.** Add a `Certification` type to `types/feature.ts` (or a new `types/certification.ts`) with `{ id, code, title, image, pdfUrl }`, plus `components/Certifications/certificationsData.tsx` default-exporting the 3-item array. Keep the `*Data.tsx` + `types/` convention.

**Q8 — Optional extras.** Section `id` attribute (every section has one; note several sections reuse `id="features"` — pick a unique one, e.g. `id="certifications"`). Whether a short `description` line is rendered under the heading (mockup shows none).

---

## 9. DEFINITION OF DONE

- [ ] New folder `components/Certifications/` with `index.tsx`, `SingleCertification.tsx`, `certificationsData.tsx` (+ type in `types/`).
- [ ] Default export from `components/Certifications/index.tsx`; **not imported by any page** (user places it manually).
- [ ] Uses `SectionHeader` (or the agreed variant) — no bespoke header markup outside the Common folder if Option A/C rejected.
- [ ] All colours from `tailwind.config.js` tokens (or the newly agreed token); no raw hex unless following existing precedent (`Integration` uses raw hex sparingly).
- [ ] All spacing/shadows/typography from the custom scale (`py-20 lg:py-25 xl:py-30`, `text-sectiontitle`, `shadow-solid-3`, etc.).
- [ ] Full `dark:` parity on every coloured element.
- [ ] `framer-motion` in-view animation matching the house pattern.
- [ ] Certificates 1 & 2 & 3 map to the correct PDFs / images; clicking behaves as agreed in Q4.
- [ ] Responsive: 3-up desktop → 2-up tablet → 1-up mobile (or as agreed in Q5), certificates not cropped.
- [ ] `npm run lint` and `npm run build` pass with no new errors.
- [ ] Prettier tailwind class ordering respected (`npx prettier --write` on new files).
- [ ] Any `tailwind.config.js` colour addition is called out explicitly in the final summary.
- [ ] Legacy `components/ISOCertification.tsx` left untouched unless the user approves removal.

---

## 10. FILE TREE SNAPSHOT (relevant subset)

```
app/
  globals.css
  context/ToastContext.tsx
  (site)/
    layout.tsx        ← Inter font, ThemeProvider(light default), Header/Footer/Lines
    head.tsx          ← title/meta/favicons (theme-color #2b4797)
    page.tsx          ← home: Caurosel1, Hero, BrandsSection, Feature, ServicesSection, FunFact, Contact
    about/page.tsx  brands/page.tsx  buy-back/page.tsx  contact/page.tsx
    blog/…  docs/page.tsx  error/  privacy-policy/  terms/  auth/
components/
  Common/SectionHeader.tsx  Common/SectionHeader2.tsx
  Features/{index,SingleFeature,featuresData}.tsx
  ServicesSection/{index,SingleProduct,featuresData}.tsx
  NewProductsSection/{index,SingleProduct,productsData}.tsx
  BrandsSection/index.tsx   BrandSlider/{index,SingleBrand,brandData}.tsx
  About  Blog  Brands  BuyBackContact  Caurosel1  Contact  CTA  Docs
  FAQ  FeaturesTab  Footer  FunFact  Header  Hero  Integration  Lines
  Pricing  ScrollToTop  Testimonial
  ISOCertification.tsx      ← legacy, unreferenced
types/
  feature.ts (Feature, Service, Product)  blog.ts brand.ts doc.ts faq.ts featureTab.ts menu.ts testimonial.ts
public/
  certifications/*.pdf      ← 3 certificate PDFs (untracked)
  images/certifications/    ← EMPTY
  iso/{badge.jpg,certificate.pdf}
  downloads/{brochure.pdf,brochure_old.pdf,sample.xlsx}
  favicons/  images/{about,blog,brand,buyback,caurousel,certifications,contact,features,hero,icon,logo,products,services,shape,user}
```
