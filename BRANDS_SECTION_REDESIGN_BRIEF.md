# CONTEXT BRIEF — Brands Section Redesign

Repo root: `C:\Users\MAXWELL\Documents\Projects\Heliac\Heliacenergii` · Branch: `dev`

---

## 1. OBJECTIVE

Redesign the "Brands We Serve" section to match the project's glass aesthetic and animation standards. The current section is a functional but visually plain two-row layout: a horizontal brand selector (Glider carousel) on top and a product grid below. It needs to be brought into the same visual language as the rest of the site — glass cards, backdrop blur, staggered animations, and brand-appropriate visual treatment.

---

## 2. CURRENT STATE — Full Audit

### 2.1 Section structure

**File:** `components/BrandsSection/index.tsx` (23 lines)

```tsx
export default function BrandsSection() {
  return (
    <section id="features" className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <SectionHeader
          headerInfo={{
            title: "Brand Products",
            subtitle: "Brands We Serve",
            description: ``,
          }}
        />
        <div className="mt-12">
          <BrandSlider />
        </div>
        <p className="mx-auto md:w-4/5 lg:w-3/5 xl:w-[46%] text-center mt-5">
          We are not authorized distributors or representatives of any specific
          brands mentioned. All trademarks and brand names are the property of
          their respective owners.
        </p>
      </div>
    </section>
  );
}
```

### 2.2 BrandSlider (the main component)

**File:** `components/BrandSlider/index.tsx` (70 lines)

```tsx
export default function BrandSlider() {
  const [selected, setSelected] = useState<number>(0);

  return (
    <section className="border border-x-0 border-y-stroke bg-white py-0 dark:border-y-strokedark dark:bg-black">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <Glider
          className="glider-container py-0"
          draggable
          hasArrows
          slidesToShow="auto"
          slidesToScroll="1"
          itemWidth={400}
          resizeLock
          onAnimated={handleSlideChange}
        >
          {brandData.map((b, i) => (
            <SingleBrand key={i} brand={{ name: b.name, index: i }} selected={selected} setSelected={handleSelectedClick} />
          ))}
        </Glider>
      </div>
      <div className="grid max-h-[320px] md:max-h-[60vh] overflow-y-auto w-full grid-cols-2 gap-x-6 gap-y-4 border border-x-0 border-y-stroke bg-alabaster py-8 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {brandData[selected].products.map((product, i) => (
          <a key={product.name} href="#" className="relative rounded-lg bg-stroke">
            <div className="relative flex w-full flex-col items-start justify-between px-3 py-4">
              <h3 className="line-clamp-3 text-metatitle text-gray-700 sm:line-clamp-3 md:line-clamp-3">
                {product.name}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
```

### 2.3 SingleBrand (brand selector card)

**File:** `components/BrandSlider/SingleBrand.tsx` (46 lines)

```tsx
const SingleBrand = ({ brand, selected, setSelected }) => {
  const { name, index } = brand;
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setSelected(index)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelected(index); }}
      className={`${selected === index ? "bg-primary" : null}
        mx-w-full group relative mx-6 block h-20 w-full rounded rounded-b-none
        opacity-100 backdrop-blur-lg transition-all duration-300 hover:bg-primaryLight`}
    >
      <h3 className={`${selected === index ? "text-white opacity-100" : "text-gray-900"}
        my-8 px-8 text-center text-2xl font-bold leading-none tracking-tight
        text-gray-900 transition-all duration-300 group-hover:text-white
        group-hover:opacity-100 dark:hidden md:text-2xl lg:text-3xl`}>
        {name}
      </h3>
    </div>
  );
};
```

### 2.4 Brand data

**File:** `components/BrandSlider/brandData.tsx` (778 lines)

```tsx
export const brandData = [
  {
    name: "Allen Bradley – RockWell Automation",
    logoImagepath: "",
    products: [
      { name: "ControlLogix 5580 Controllers", imagePath: "" },
      { name: "ControlLogix 5570 Controllers", imagePath: "" },
      // ... 30 products
    ],
  },
  // 12 active brands total:
  // Allen Bradley, Parker, Siemens, ABB, Omron, Schneider,
  // Mitsubishi, Weidmuller, Beckhoff, Emerson, Woodward, Yokogawa
  // 3 commented-out brands: Ge Speedtronics, Bently Nevada, Ge Excitations
];
```

**Data characteristics:**
- 12 active brands, 3 commented out
- Each brand has `name`, `logoImagepath` (all empty), and `products[]`
- Each product has `name` and `imagePath` (all empty)
- Product counts vary: Allen Bradley (30), Siemens (22), Schneider (20), Omron (20), ABB (14), Mitsubishi (15), Parker (6), Beckhoff (12), Weidmuller (10), Emerson (7), Woodward (5), Yokogawa (4)
- **No images exist** — all `logoImagepath` and `imagePath` fields are empty strings

### 2.5 Type definition

**File:** `types/brand.ts`

```ts
export type Brand = {
  name: string;
  logoImagepath: string;
  products: Product[];
};
```

---

## 3. CURRENT LAYOUT (visual)

```
┌─────────────────────────────────────────────────────────────┐
│  [SectionHeader: "Brand Products" / "Brands We Serve"]      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │  [Brand 1] [Brand 2] [Brand 3] ... (Glider carousel)│    │  ← h-20, text-only, no logos
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  [Product] [Product] [Product] [Product]            │    │  ← 4-col grid
│  │  [Product] [Product] [Product] [Product]            │    │    text-only cards
│  │  ...                                                │    │    max-h-320px/60vh
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│  "We are not authorized distributors..." (disclaimer)       │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. PROBLEMS WITH THE CURRENT DESIGN

| # | Problem | Impact |
|---|---|---|
| 1 | **No brand logos** — all `logoImagepath` are empty, so brands are just text | No visual brand recognition; looks unfinished |
| 2 | **No product images** — all `imagePath` are empty | Product cards are just grey boxes with text |
| 3 | **Two separate sections** — brand selector and product grid are visually disconnected | User must scroll between them; no spatial relationship |
| 4 | **No glass effect** — uses solid `bg-white dark:bg-black` and `bg-alabaster` | Inconsistent with the rest of the site |
| 5 | **No animations** — no framer-motion on brand cards or product cards | Feels static compared to other sections |
| 6 | **Product grid is cramped** — `max-h-[320px] md:max-h-[60vh] overflow-y-auto` | Products are hidden behind a scroll; poor discoverability |
| 7 | **Product cards are plain** — `bg-stroke` with just text | No visual hierarchy, no hover feedback |
| 8 | **Brand selector is text-only** — no logo, no visual weight | Hard to scan; no brand identity |
| 9 | **No stagger animation** — all products appear at once | Missed opportunity for visual delight |
| 10 | **No active brand indicator** — selected brand is `bg-primary` but hard to see | User can't easily tell which brand's products are shown |
| 11 | **Glider carousel is basic** — no animation on slide change | Feels mechanical |
| 12 | **No empty state** — if a brand has no products, the grid is just empty | Poor UX |
| 13 | **No search/filter** — with 100+ products, there's no way to find a specific item | Poor usability for large catalogs |
| 14 | **Dark mode is incomplete** — `dark:hidden` on brand text means dark mode shows nothing | Brand names invisible in dark mode |
| 15 | **No category grouping** — products are a flat list | Hard to navigate |

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
  density?: "float" | "read";   // float = image-led · read = text/form-led
  tint?: string;                // e.g. "from-primaryho/25"
  glow?: boolean;               // brand glow orb on hover
  index?: number;               // grid position → stagger delay
  hover?: boolean;              // hover lift (default true)
  blur?: "xl" | "2xl";          // xl for grids · 2xl for hero surfaces
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

### Brand logos
```
public/images/brand/brand-01.svg through brand-12.svg (exist but unused — data has empty paths)
```

### Shape/background assets
```
public/images/shape/shape-dotted-light.svg
public/images/shape/shape-dotted-dark.svg
public/images/shape/shape-dotted-light-02.svg
public/images/shape/shape-dotted-dark-02.svg
public/images/shape/shape-01.png through shape-06.png
```

### Brand logo files on disk
```
public/images/brand/brand-01.svg
public/images/brand/brand-02.svg
public/images/brand/brand-03.svg
public/images/brand/brand-04.svg
public/images/brand/brand-05.svg
public/images/brand/brand-06.svg
public/images/brand/brand-07.svg
public/images/brand/brand-08.svg
public/images/brand/brand-09.svg
public/images/brand/brand-10.svg
public/images/brand/brand-11.svg
public/images/brand/brand-12.svg
```

**Note:** The brand data has `logoImagepath: ""` for all brands. The SVG files exist in `public/images/brand/` but are not referenced. The redesign should map each brand to its corresponding logo file.

---

## 8. COMPONENT PATTERNS (must follow)

### Section shell
```tsx
<section id="brands" className="py-20 lg:py-25 xl:py-30">
  <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
    <SectionHeader headerInfo={{ title: "…", subtitle: "…", description: "…" }} />
    {/* content */}
  </div>
</section>
```

### SectionHeader (already built)
```tsx
<SectionHeader headerInfo={{ title: "Brand Products", subtitle: "Brands We Serve", description: "" }} />
```

### GlassCard (already built — use for all cards)
```tsx
<GlassCard index={index} density="read" glow className="p-6">
  {children}
</GlassCard>
```

### Button primitive (already built)
```tsx
<Button href="/contact" variant="primary" size="md">Inquiry</Button>
```

---

## 9. DESIGN DIRECTIONS (for the planning agent to consider)

### Direction A — Split layout with brand sidebar
- Left: vertical list of brand logos (glass cards, stacked)
- Right: product grid for the selected brand
- Active brand highlighted with `bg-primary/10 border-primary`
- Products in a 3-col glass card grid with stagger animation
- Search/filter input at the top of the product area

### Direction B — Tabbed brand selector
- Horizontal scrollable tab bar at the top (glass pill buttons)
- Each tab shows brand logo + name
- Active tab: `bg-primary text-white`
- Product grid below with `AnimatePresence` transition between brands
- Stagger animation on products

### Direction C — Card grid with brand filter
- All brands shown as a grid of glass cards (logo + name + product count)
- Click a brand card → expands to show products (accordion style)
- Or: clicking navigates to a dedicated brand detail view

### Direction D — Showcase carousel
- Large brand logo cards in a horizontal carousel (react-glider or swiper)
- Each card is a glass panel with the brand logo, name, and a "View Products" CTA
- Below: a preview of featured products from the selected brand
- Most visually impressive; good for brand-focused storytelling

### Direction E — Masonry/hexagonal grid
- Products shown in a masonry layout with brand logos as section headers
- Each brand section is a glass panel with its products inside
- Most compact; good for large catalogs

---

## 10. DATA CONSIDERATIONS

### Brand-to-logo mapping (proposed)
| Brand | Logo file |
|---|---|
| Allen Bradley | `brand-01.svg` |
| Parker | `brand-02.svg` |
| Siemens | `brand-03.svg` |
| ABB | `brand-04.svg` |
| Omron | `brand-05.svg` |
| Schneider | `brand-06.svg` |
| Mitsubishi | `brand-07.svg` |
| Weidmuller | `brand-08.svg` |
| Beckhoff | `brand-09.svg` |
| Emerson | `brand-10.svg` |
| Woodward | `brand-11.svg` |
| Yokogawa | `brand-12.svg` |

**Note:** This mapping is assumed based on file ordering. Verify by opening the SVG files.

### Product images
- All `imagePath` fields are empty
- Product cards should work without images (text-only glass cards are fine)
- If product images are added later, the design should accommodate them

### Data updates needed
- Populate `logoImagepath` for each brand
- Optionally populate `imagePath` for each product
- Consider adding `categories` or `tags` to products for filtering

---

## 11. CONSTRAINTS

1. **Must use `GlassCard`** for all cards — no solid `bg-white dark:bg-blacksection`
2. **Must use `framer-motion`** for all animations
3. **Must use design tokens only** — no raw hex colours
4. **Must have `dark:` variants** on every element
5. **Must have `focus-visible` ring** on all interactive elements
6. **Must use `ease: [0.23, 1, 0.32, 1]`** for animations
7. **Must use `duration-300` or `duration-500`**
8. **Must not add new dependencies** — `framer-motion`, `react-glider`, `swiper` are already installed
9. **Must not add new Tailwind tokens**
10. **Must keep the disclaimer text** — "We are not authorized distributors..."
11. **Must keep the section `id`** — currently `id="features"` (should be changed to `id="brands"`)
12. **Must be responsive** — works on 320px, 768px, 1024px, 1280px+
13. **Must handle the case where brand logos don't load** — fallback to text
14. **Must handle the case where products don't exist** — show empty state
15. **Must keep the `SectionHeader`** — title "Brand Products", subtitle "Brands We Serve"

---

## 12. OPEN QUESTIONS FOR THE PLANNING AGENT

**Q1 — Layout.** Split (A), tabs (B), card grid (C), carousel (D), or masonry (E)? Recommend **B (tabs)** — it's the most usable for 12 brands and keeps the product grid visible.

**Q2 — Brand logos.** Should we populate `logoImagepath` with the existing SVG files? Recommend: yes — the files exist, they just need to be referenced.

**Q3 — Product images.** Should product cards be text-only or should we add placeholder images? Recommend: text-only for now — the data has no images and adding placeholders would be misleading.

**Q4 — Search/filter.** Should we add a search input for products? Recommend: yes — with 100+ products across 12 brands, search is essential. Use a simple text filter.

**Q5 — Brand selector.** Should the brand selector be a horizontal tab bar, a vertical sidebar, or a dropdown? Recommend: horizontal tab bar on desktop, horizontal scroll on mobile.

**Q6 — Product grid columns.** How many columns? Recommend: 2 on mobile, 3 on tablet, 4 on desktop.

**Q7 — Animation on brand switch.** Should products animate when switching brands? Recommend: yes — use `AnimatePresence` with a fade/slide transition.

**Q8 — Stagger delay.** What stagger delay for products? Recommend: `index * 0.05` — matches the rest of the site.

**Q9 — Empty state.** What should show if a brand has no products? Recommend: a glass card with "No products available for this brand" and a "Contact Us" CTA.

**Q10 — Dark mode.** Does the design need a distinct dark-mode treatment? Recommend: no — the glass system already handles dark mode via `dark:` classes.

**Q11 — Glider vs Swiper.** Should we keep `react-glider` for the brand carousel or switch to `swiper`? Recommend: keep `react-glider` — it's already installed and working.

**Q12 — Section ID.** Should we change `id="features"` to `id="brands"`? Recommend: yes — the current ID is misleading (it's the brands section, not features).

---

## 13. DEFINITION OF DONE

- [ ] Brands section redesigned with glass cards and animations
- [ ] Brand logos populated (or text fallback if logos unavailable)
- [ ] Product cards use `GlassCard` with stagger animation
- [ ] Brand selector is visually clear with active state
- [ ] Product grid is responsive (2/3/4 columns)
- [ ] Search/filter functionality for products
- [ ] `AnimatePresence` transition when switching brands
- [ ] Empty state for brands with no products
- [ ] Disclaimer text preserved
- [ ] Section ID changed to `id="brands"`
- [ ] Full dark-mode parity
- [ ] All colours from design tokens only
- [ ] All animations use `ease: [0.23, 1, 0.32, 1]`
- [ ] All cards use `GlassCard`
- [ ] No new dependencies added
- [ ] No new Tailwind tokens added
- [ ] `npm run build` passes with no errors
