# CONTEXT BRIEF — Button Standardization & Redesign

Repo root: `C:\Users\MAXWELL\Documents\Projects\Heliac\Heliacenergii` · Branch: `dev`

---

## 1. OBJECTIVE

Standardize **every** button / button-like interactive element in the project onto a single, reusable, design-system-driven button system, and redesign the existing buttons to be consistent, accessible, and dark-mode-correct.

The deliverable is a **shared button primitive** (or small set of primitives) plus a **mechanical migration** of every call site onto it. No new pages, no new features.

---

## 2. TECH STACK (fixed)

| Item | Value |
|---|---|
| Framework | Next.js `^13.5.6`, App Router |
| React | `18.2` |
| Language | TypeScript (`strict: false`) |
| Styling | Tailwind CSS `^3.3.5` + `prettier-plugin-tailwindcss` |
| Animation | `framer-motion` `^10.12.16` |
| UI kit | `flowbite-react` `^0.10.1` — **currently used for 2 buttons, should be removed** |
| Icons | `react-icons` `^5.2.1` |
| Toasts | `react-hot-toast` `^2.4.1` |
| Theme | `next-themes`, `darkMode: "class"`, default light |
| Alias | `@/*` → repo root |

Scripts: `npm run dev` / `build` / `lint`.

---

## 3. DESIGN SYSTEM TOKENS (`tailwind.config.js`)

### Colours
```
primary        #2b4797   (brand blue — the ONLY accent)
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
```

### Typography
```
metatitle 12px/20px · sectiontitle 14px/22px · regular 16px/26px
metatitle3 18px/26px · metatitle2 20px/32px · para2 22px/35px
itemtitle 26px/32px · itemtitle2 24px/32px · hero 44px/58px
sectiontitle3 44px/55px · sectiontitle4 34px/48px
```

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

### z-index
`99999`, `999`, `1`

### `app/globals.css`
```css
body { @apply relative z-1 font-inter text-regular font-normal text-waterloo dark:text-manatee; }
```
Also: `.no-scrollbar`, `.img-white`, `.active-tab`, `.loader`, `.blog-details*`, swiper overrides.

**Dark mode is mandatory on every element.**

---

## 4. COMPLETE BUTTON INVENTORY (audit of every button-like element)

### A. Primary filled pill — blue (`bg-primary`)
| # | File | Line | Label | Classes |
|---|---|---|---|---|
| A1 | `components/Header/index.tsx` | 184 | "Inquiry" (nav CTA) | `flex items-center justify-center rounded-full border border-white bg-primary px-7.5 py-2.5 text-regular text-white duration-300 ease-in-out hover:bg-primaryho` |
| A2 | `components/Contact/index.tsx` | 276 | "Send Message" | `inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-primaryho dark:bg-btndark` |
| A3 | `components/BuyBackContact/index.tsx` | 419 | "Send Message" | identical to A2 |
| A4 | `components/Hero/index.tsx` | 43 | "Get Started" | `flex rounded-full border-2 bg-primary px-7.5 py-2.5 text-white duration-300 ease-in-out hover:border-primary hover:bg-white hover:text-primary` — **no dark mode** |

### B. Primary filled pill — black (`bg-black`)
| # | File | Line | Label | Classes |
|---|---|---|---|---|
| B1 | `components/Auth/Signin.tsx` | 185 | "Log in" | `inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho` |
| B2 | `components/Auth/Signup.tsx` | 207 | (submit) | identical to B1 |
| B3 | `components/CTA/index.tsx` | 66 | "Sign up free" | `inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white hover:opacity-90 dark:bg-white dark:text-black` — **inverts in dark** |
| B4 | `app/(site)/error/page.tsx` | 30 | "Return to Home" | identical to B1 |

### C. `flowbite-react` `<Button>` — off-brand, must be replaced
| # | File | Line | Label | Props |
|---|---|---|---|---|
| C1 | `components/Header/index.tsx` | 191 | "Brochure" | `<Button pill gradientDuoTone="purpleToBlue" onClick={handleDownload}>` + `FaFileDownload` icon |
| C2 | `components/BuyBackContact/index.tsx` | 384 | "Download" | `<Button color="light" onClick={handleDownload}>` — **inside a commented-out block** |
| C3 | `components/Caurosel1/components/SliderImage.tsx` | 6 | — | `import { Button }` — **imported, never used** |

### D. Text / ghost link-buttons
| # | File | Line | Label | Classes |
|---|---|---|---|---|
| D1 | `components/Pricing/index.tsx` | 64, 119, 170 | "Get the Plan" ×3 | `group/btn inline-flex items-center gap-2.5 font-medium text-primary transition-all duration-300 dark:text-white dark:hover:text-primary` + arrow SVG animated via `group-hover/btn:pr-2` |
| D2 | `components/ISOCertification.tsx` | 22 | "View Certificate" | `text-blue-600 underline cursor-pointer` — **raw Tailwind blue, not a token; `<span onClick>`, not a button** |
| D3 | `components/Auth/Signin.tsx` | 180 | "Forgot Password?" | `hover:text-primary` — bare `<a href="#">` |

### E. Social / auth buttons — `rounded-sm`, off-system
| # | File | Line | Label |
|---|---|---|---|
| E1 | `components/Auth/Signin.tsx` | 57 | "Signup with Google" |
| E2 | `components/Auth/Signin.tsx` | 97 | "Signup with Github" |
| E3 | `components/Auth/Signup.tsx` | 59 | (Google) |
| E4 | `components/Auth/Signup.tsx` | 99 | (Github) |

All four share this class string:
```
text-body-color dark:text-body-color-dark dark:shadow-two mb-6 flex w-full items-center justify-center
rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300
hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B]
dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none
```
⚠️ `text-body-color`, `dark:text-body-color-dark`, `dark:shadow-two` are **not design tokens** — leftovers from another template.

### F. Icon-only buttons
| # | File | Line | Purpose | Classes |
|---|---|---|---|---|
| F1 | `components/Header/index.tsx` | 77 | Hamburger | `block xl:hidden` + animated spans |
| F2 | `components/Header/index.tsx` | 131 | Dropdown chevron | `flex cursor-pointer items-center justify-between gap-3 hover:text-primary` |
| F3 | `components/Header/ThemeToggler.tsx` | 8 | Theme toggle | `bg-gray-2 dark:bg-dark-bg absolute right-17 mr-1.5 flex cursor-pointer items-center justify-center rounded-full text-black dark:text-white lg:static` — **off-system classes; commented out in Header** |
| F4 | `components/Footer/index.tsx` | 300 | Newsletter submit | `absolute right-0 p-4` — icon only, no bg, no border |
| F5 | `app/(site)/blog/blog-details/page.tsx` | 31 | Search submit | `absolute right-0 top-0 p-5` |
| F6 | `components/ScrollToTop/index.tsx` | 33 | Scroll to top | `hover:shadow-signUp flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm bg-primary text-white shadow-md transition duration-300 ease-in-out hover:bg-opacity-80` — **`shadow-signUp`, `shadow-md`, `bg-opacity-80` are not tokens** |

### G. Toggle / accordion / tab buttons
| # | File | Line | Purpose | Classes |
|---|---|---|---|---|
| G1 | `components/FAQ/FAQItem.tsx` | 15 | Accordion header | `flex cursor-pointer items-center justify-between px-6 py-5 text-metatitle3 font-medium text-black dark:text-white lg:px-9 lg:py-7.5` |
| G2 | `components/FeaturesTab/index.tsx` | 51, 70, 89 | Tab items (×3) | outer `<div onClick>` `relative flex w-full cursor-pointer items-center gap-4 border-b border-stroke px-6 py-2 …` + inner `<button className="text-sm font-medium text-black dark:text-white xl:text-regular">` — **button nested inside clickable div** |

### H. Nav links styled as pills
| # | File | Line | Classes |
|---|---|---|---|
| H1 | `components/Header/index.tsx` | 158 | `duration-800 rounded-full px-6 py-1.5 text-black transition-all ease-in-out hover:bg-[#526ace] hover:text-white` + active `bg-primary text-white hover:text-white` — **raw hex `#526ace`** |

### I. Dead / commented-out buttons (delete or migrate)
| # | File | Line | Label | Note |
|---|---|---|---|---|
| I1 | `components/Caurosel1/components/SliderImage.tsx` | 61 | "Learn More" | `inline-flex items-center rounded-lg border-2 border-white bg-primary text-white px-5 py-2.5 text-center text-sm font-medium hover:bg-white hover:text-primary hover:border-primary focus:outline-none focus:ring-4 focus:ring-blue-300` |
| I2 | `components/NewProductsSection/SingleProduct.tsx` | 101 | "Add to cart" | `flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300` |
| I3 | `components/BuyBackContact/index.tsx` | 384 | "Download" | flowbite `<Button color="light">` |
| I4 | `components/Header/index.tsx` | 177 | "GitHub Repo" | text link |

### J. Non-button interactive elements that behave like buttons
| # | File | Line | Element | Issue |
|---|---|---|---|---|
| J1 | `components/BrandSlider/SingleBrand.tsx` | 21 | `<div onClick>` brand selector | no `role`, no `tabIndex`, no keyboard handler |
| J2 | `components/Certifications/SingleCertification.tsx` | 31 | whole card is `<a>` | ✅ good — has `focus-visible:ring-2 focus-visible:ring-primaryho` |
| J3 | `components/ScrollToTop/index.tsx` | 33 | `<div onClick>` | no `role="button"`, no `tabIndex`, no `onKeyDown` |
| J4 | `components/ISOCertification.tsx` | 22 | `<span onClick>` | not keyboard accessible |

---

## 5. INCONSISTENCY ANALYSIS (the problems to solve)

### 5.1 No shared primitive
Every button is hand-rolled. **Zero reuse.** The same semantic role (form submit) is implemented 4 different ways (A2, A3, B1, B2).

### 5.2 Two competing "primary" styles
- **Blue** (`bg-primary`): Header Inquiry, Contact, BuyBackContact, Hero
- **Black** (`bg-black`): Signin, Signup, CTA, error page

Both are used for the same semantic role (primary action). There is no documented rule for when to use which.

### 5.3 Sizing / padding drift
| Variant | px | py | radius |
|---|---|---|---|
| Header "Inquiry" | 7.5 | 2.5 | full |
| Hero "Get Started" | 7.5 | 2.5 | full |
| Contact / BuyBack "Send Message" | 6 | 3 | full |
| Signin / Signup / CTA / error | 6 | 3 | full |
| Nav links | 6 | 1.5 | full |
| Auth social buttons | 6 | 3 | **sm** |
| ScrollToTop | — | — | **sm** |
| Dead "Learn More" | 5 | 2.5 | **lg** |
| Dead "Add to cart" | 5 | 2.5 | **md** |

### 5.4 Hover mechanism inconsistency
- `hover:bg-primaryho` (blue buttons)
- `hover:bg-blackho` (black buttons)
- `hover:opacity-90` (CTA)
- `hover:bg-white hover:text-primary` (Hero — outline swap)
- `hover:bg-opacity-80` (ScrollToTop — non-token)
- `group-hover/btn:pr-2` (Pricing — text indent)

### 5.5 Dark mode is ad hoc
- A2/A3/B1/B2/B4 use `dark:bg-btndark` (dark navy) for the black button
- B3 (CTA) **inverts** to `dark:bg-white dark:text-black`
- A4 (Hero) has **no dark mode at all**
- E1–E4 use `dark:bg-[#2C303B]` (raw hex)
- F3 uses `dark:bg-dark-bg` (non-token)

### 5.6 Off-system / dead classes
These appear in button code but are **not** in `tailwind.config.js` and will not resolve:
```
text-body-color  dark:text-body-color-dark  dark:shadow-two  bg-gray-2  dark:bg-dark-bg
hover:shadow-signUp  shadow-md  bg-opacity-80  text-blue-600  bg-slate-900
focus:ring-blue-300  hover:bg-[#526ace]  bg-[#f8f8f8]  dark:bg-[#2C303B]
```

### 5.7 `flowbite-react` is off-brand
`gradientDuoTone="purpleToBlue"` renders a **purple gradient** on a blue-themed site. `color="light"` renders a generic light button. Both must be replaced.

### 5.8 Accessibility defects
1. `FeaturesTab` — `<button>` nested inside clickable `<div>` → double tab stop, nested interactive elements, screen-reader confusion.
2. `ScrollToTop` — `<div onClick>` with no `role="button"`, no `tabIndex={0}`, no `onKeyDown`.
3. `BrandSlider/SingleBrand` — `<div onClick>`, same issues.
4. `ISOCertification` — `<span onClick>`, same issues.
5. `Pricing` "Get the Plan" — `<button>` with no `type`, no `href`, no handler → **does nothing**.
6. `Footer` newsletter — `<form action="#">` with a submit button and no handler.
7. `Contact` / `BuyBackContact` submit buttons — no `type="submit"` (they rely on implicit form submission; `Contact` uses `react-hook-form`).
8. **No consistent focus ring.** Only `Certifications` has `focus-visible:ring-2 focus-visible:ring-primaryho`. Everything else has no visible focus indicator.
9. `aria-label` present on some buttons (Contact, BuyBackContact, FAQ, Footer, blog search, ScrollToTop via `sr-only`), absent on others (Header Inquiry, Hero, Pricing, Signin, Signup, CTA, error).

### 5.9 Icon inconsistency
The same 14×14 arrow SVG is copy-pasted in **8 places** (Pricing ×3, Contact, BuyBackContact, Signin, CTA, error page) with three different fill strategies:
- `fill="currentColor"` (Pricing)
- `fill-white` (Contact, BuyBackContact, Signin, CTA, error)
- `fill=""` — **broken empty attribute** (Contact, BuyBackContact, Signin, error)

`react-icons` is used in Header (`FaFileDownload`) and BuyBackContact (`FaFileDownload`) but inline SVG everywhere else.

### 5.10 Dead code
3 commented-out button blocks (I1, I2, I3) + 1 unused import (C3). Should be deleted.

---

## 6. REFERENCE FILES

| Purpose | File |
|---|---|
| Best current button (has focus ring) | `components/Certifications/SingleCertification.tsx:31-37` |
| Form submit pattern | `components/Contact/index.tsx:276-299` |
| Download handler | `components/Header/index.tsx:33-45` |
| Text/ghost button | `components/Pricing/index.tsx:64-82` |
| Icon-only button | `components/Footer/index.tsx:300-303` |
| Toggle button | `components/FAQ/FAQItem.tsx:15-50` |
| Tab button (anti-pattern) | `components/FeaturesTab/index.tsx:51-107` |
| Nav pill links | `components/Header/index.tsx:158-168` |
| Dark-mode button bg token | `btndark: "#292E45"` in `tailwind.config.js` |

---

## 7. OPEN QUESTIONS FOR THE PLAN (decide + justify)

**Q1 — Primitive shape.** Single `<Button>` component with variants (`primary` | `secondary` | `ghost` | `outline` | `icon`) and sizes (`sm` | `md` | `lg`)? Or a set of small components? Or Tailwind `@layer components` classes only (no JS component)? Recommend a TS component in `components/Common/Button.tsx` with a `variant` + `size` prop, since the project already has a `components/Common/` folder for shared primitives.

**Q2 — Primary colour.** Blue (`bg-primary`) or black (`bg-black`)? The brand is blue (`#2b4797`), so blue is the natural primary. But 4 call sites currently use black. Recommend: **blue = primary**, black = `secondary` (or `dark`) variant. Justify in the plan.

**Q3 — Sizes.** Define 2–3 sizes. Suggested:
- `sm`: `px-4 py-2 text-sm` (icon buttons, nav links)
- `md`: `px-6 py-3 text-regular` (default — matches most current CTAs)
- `lg`: `px-7.5 py-2.5 text-regular` (hero / prominent CTAs)

**Q4 — Radius.** `rounded-full` for pill buttons (current dominant pattern) vs `rounded-lg` for cards/inputs. Recommend `rounded-full` for buttons, `rounded-lg` for inputs/cards — keep the existing visual language.

**Q5 — Hover.** Single consistent hover per variant. Recommend `hover:bg-primaryho` for primary, `hover:bg-blackho` for dark, `hover:bg-primary/5` for ghost. Drop `hover:opacity-90` and `hover:bg-opacity-80`.

**Q6 — Dark mode.** Define the dark-mode value for each variant. Recommend: primary stays `bg-primary` (or `bg-primaryho`) in dark; dark/black variant becomes `bg-btndark` (already the pattern in A2/A3/B1/B2). CTA's invert-to-white is a special case — decide whether to keep it.

**Q7 — Focus ring.** Adopt `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho` (from Certifications) as the standard for all variants.

**Q8 — Icon strategy.** Standardise on `react-icons` (already a dependency) for all icons, or inline SVG? Recommend `react-icons` for consistency with Header/BuyBackContact, and extract the repeated arrow into a shared `<ArrowIcon />` component.

**Q9 — Link-buttons.** Buttons that navigate (`<a href>`) vs buttons that act (`<button onClick>`). The component should support both via a `href` prop (render `<a>`) or `onClick` (render `<button>`). The error page "Return to Home" is an `<a>` styled as a button — it should use the same primitive.

**Q10 — Migration scope.** Migrate **all** live call sites (A1–A4, B1–B4, D1–D3, E1–E4, F1–F6, G1–G2, H1, J1–J4) or only the "real" buttons (A, B, C, D, E)? Recommend all — the icon buttons and toggles benefit from the same focus/hover/dark-mode treatment. Delete dead code (I1–I4) rather than migrating it.

**Q11 — `flowbite-react` removal.** Replace C1 (Header Brochure) and C2 (BuyBackContact Download) with the new primitive, then remove the `flowbite-react` import from those files. **Do not remove the dependency from `package.json`** unless no other file uses it — check `components/Header/index.tsx:9` and `components/BuyBackContact/index.tsx:12` and `components/Caurosel1/components/SliderImage.tsx:6`.

**Q12 — Accessibility fixes.** The plan must address: nested button in `FeaturesTab`, `div onClick` in `ScrollToTop` / `BrandSlider` / `ISOCertification`, missing `type` on form buttons, missing `aria-label` on icon-only buttons, and the non-functional Pricing "Get the Plan" button.

**Q13 — `tailwind.config.js` changes.** If new tokens are needed (e.g. a `focusring` colour, or a `secondary` colour), they must be added to `theme.extend.colors`. Currently `primaryho: "#0063EC"` is the closest thing to a focus/hover blue. No new tokens should be added unless strictly necessary.

---

## 8. DEFINITION OF DONE

- [ ] New shared button primitive in `components/Common/Button.tsx` (or agreed location) with `variant`, `size`, `href`/`onClick`, and `icon` support.
- [ ] All live call sites migrated: A1–A4, B1–B4, D1–D3, E1–E4, F1–F6, G1–G2, H1, J1–J4.
- [ ] Dead code deleted: I1–I4, C3 unused import.
- [ ] `flowbite-react` `<Button>` no longer used anywhere (C1, C2 replaced).
- [ ] No off-system classes remain in any button: `text-body-color`, `dark:text-body-color-dark`, `dark:shadow-two`, `bg-gray-2`, `dark:bg-dark-bg`, `hover:shadow-signUp`, `shadow-md`, `bg-opacity-80`, `text-blue-600`, `bg-slate-900`, `focus:ring-blue-300`, `hover:bg-[#526ace]`, `bg-[#f8f8f8]`, `dark:bg-[#2C303B]`.
- [ ] Every button has a visible `focus-visible` ring.
- [ ] Every button has correct dark-mode classes.
- [ ] Every icon-only button has an `aria-label`.
- [ ] No `<button>` nested inside a clickable `<div>` (FeaturesTab fixed).
- [ ] No `<div onClick>` / `<span onClick>` without `role="button"` + `tabIndex` + `onKeyDown` (ScrollToTop, BrandSlider, ISOCertification fixed).
- [ ] All form buttons have correct `type` (`submit` or `button`).
- [ ] The repeated arrow SVG is extracted to a single shared icon component.
- [ ] `npm run lint` and `npm run build` pass with no new errors.
- [ ] `npx prettier --write` run on all touched files.
- [ ] Any `tailwind.config.js` token additions are called out explicitly in the final summary.

---

## 9. FILE TREE SNAPSHOT (relevant subset)

```
app/
  globals.css
  (site)/
    layout.tsx          ← Inter font, ThemeProvider, Header/Footer/Lines
    page.tsx            ← home page composition
    error/page.tsx      ← B4 (Return to Home)
    blog/blog-details/page.tsx  ← F5 (search)
    about/ brands/ buy-back/ contact/ docs/ blog/ auth/ privacy-policy/ terms/
components/
  Common/
    SectionHeader.tsx   ← shared section header (pattern for shared primitives)
    SectionHeader2.tsx
  Header/index.tsx      ← A1, C1, F1, F2, H1, I4
  Header/ThemeToggler.tsx  ← F3
  Hero/index.tsx        ← A4
  CTA/index.tsx         ← B3
  Contact/index.tsx     ← A2
  BuyBackContact/index.tsx  ← A3, C2, I3
  Pricing/index.tsx     ← D1 (×3)
  Auth/Signin.tsx       ← B1, E1, E2, D3
  Auth/Signup.tsx       ← B2, E3, E4
  FAQ/FAQItem.tsx       ← G1
  FeaturesTab/index.tsx ← G2
  Footer/index.tsx      ← F4
  ScrollToTop/index.tsx ← F6, J3
  BrandSlider/SingleBrand.tsx  ← J1
  Certifications/SingleCertification.tsx  ← J2 (reference)
  ISOCertification.tsx  ← D2, J4
  Caurosel1/components/SliderImage.tsx  ← C3, I1
  NewProductsSection/SingleProduct.tsx  ← I2
  Features/ ServicesSection/ NewProductsSection/ BrandsSection/ BrandSlider/
  About/ Blog/ Docs/ FunFact/ Integration/ Lines/ Auth/ Pricing/ Testimonial/
types/
  feature.ts certification.ts blog.ts brand.ts doc.ts faq.ts featureTab.ts menu.ts testimonial.ts
public/
  certifications/*.pdf  images/certifications/*.png  iso/  downloads/  favicons/  images/…
```
