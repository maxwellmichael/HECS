# CONTEXT BRIEF — Buy Back Page Redesign

Repo root: `C:\Users\MAXWELL\Documents\Projects\Heliac\Heliacenergii` · Branch: `dev`

---

## 1. OBJECTIVE

Redesign the **Buy Back** page (`/buy-back`) so it matches the project's glass aesthetic, animation standards, and dark-mode parity. **The form logic (emailjs + react-hook-form) must remain exactly the same** — only the visual presentation and page structure change.

The current page is essentially the Contact page with a different banner and one swapped heading. It has no explanatory content about the buy-back program, so a visitor landing here gets a form and nothing else — no value proposition, no process, no trust signals.

---

## 2. ROUTE & ENTRY POINTS

| Item | Value |
|---|---|
| Route | `/buy-back` |
| Page file | `app/(site)/buy-back/page.tsx` (39 lines) |
| Component | `components/BuyBackContact/index.tsx` (399 lines) |
| Header nav | `components/Header/menuData.tsx` id 4 — `"Buy Back"` → `/buy-back` |
| Metadata | `title: "Buy Back - Heliac Energii Controls Solutions"` |

**Known bug elsewhere:** the footer's Buy Back link points to `/buyback` (404) instead of `/buy-back`. Tracked in `FOOTER_REDESIGN_BRIEF.md` §4 bug #1 — fix is independent of this redesign but the planner should be aware.

---

## 3. CURRENT STATE — Full Audit

### 3.1 Page shell — `app/(site)/buy-back/page.tsx`

```tsx
export default function BuyBack() {
  return (
    <main className="flex w-full flex-col pt-[90px] md:pt-[102px] mx-auto max-w-c-1390">
      {/* Banner */}
      <section className="w-full">
        <div className="relative h-[360px] w-full md:h-[720px]">
          <Image
            src="/images/buyback/buyback.jpg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1600px) 75vw,33vw"
            alt="Picture of the About page banner"
            priority={true}
          />
          <div
            style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 25% 100%)" }}
            className="absolute inset-0 bg-transparent bg-gradient-to-b from-primary/100 to-primary/80"
          />
          <div className="absolute bottom-0 flex h-2/4 w-full flex-col justify-center align-middle">
            <h1 className="relative pr-[20%] text-end text-3xl font-extrabold text-white before:-z-1 before:bg-black dark:before:bg-titlebgdark sm:text-5xl md:pr-[30%]">
              Buy Back
            </h1>
          </div>
        </div>
      </section>

      <BuyBackContact />
    </main>
  );
}
```

**Banner notes:**
- Height: `h-[360px] md:h-[720px]` — very tall on desktop.
- A `clipPath: polygon(50% 50%, 100% 50%, 100% 100%, 25% 100%)` cuts the primary gradient into a diagonal wedge over the bottom-right.
- The `<h1>` is right-aligned with a large right padding (`pr-[20%] md:pr-[30%]`), plain white text, no glass, no animation.
- `alt` text is wrong — says "Picture of the About page banner" (copy-paste artifact).
- This exact banner pattern is **shared with the Contact page** (`app/(site)/contact/page.tsx`) — only the image path, title, and heading differ.

### 3.2 Component — `components/BuyBackContact/index.tsx` (399 lines)

**Layout:** A single-column form card. The container is `flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20` — but it only has **one child**, so the flex row/column logic is dead code.

```tsx
<motion.div
  variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
  initial="hidden" whileInView="visible"
  transition={{ duration: 1, delay: 0.1 }}
  viewport={{ once: true }}
  className="animate_top mx-auto w-full rounded-lg bg-white p-7.5 shadow-solid-8
             dark:border dark:border-strokedark dark:bg-black md:w-3/5 lg:w-3/4 xl:p-15"
>
```

**Card header:**
```tsx
<h2 className="mb-2 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">Buy Back</h2>
<p className="mb-15">Transform your industrial surplus into value with our streamlined buyback solutions.</p>
```

**Background decorations:**
- Gradient blob: `absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:to-[#252A42]` ⚠️ raw hex
- Dotted shape overlay (light/dark swap) at `bottom-[-255px]`

### 3.3 Form fields

| Field | Type | Required | Register name | Layout |
|---|---|---|---|---|
| Full name | text | Yes | `fullName` | left half |
| Email | email | Yes | `email` | right half |
| Company name | text | Yes | `companyName` | left half |
| Phone number | PhoneInput | Yes | `phoneNumber` | right half |
| Brand name | text | Yes | `brandName` | full width |
| Message | textarea (rows=4) | No | `message` | full width |
| Agree to Privacy Policy | checkbox | Yes | `agree` | full width |

**Input styling (underline pattern, same as old Contact page):**
```tsx
className="w-full border-b bg-transparent pb-3.5 border-stroke focus:placeholder:text-black"
// error state:
className="... border-red-500 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500"
```
⚠️ **Bug:** the *Full name* input uses `border` (all sides) while every other input uses `border-b` (bottom only) — inconsistent even within this form.

**Phone input:** `react-phone-number-input` via `<Controller>`, `defaultCountry="IN"`, `autoFormat`, validated with `isValidPhoneNumber`.

**Checkbox:** raw browser default with hard-coded Tailwind blues:
```
h-5 w-5 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500
dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600
```
⚠️ Uses `blue-600`/`gray-*` — not design tokens. The Privacy Policy link also uses `text-blue-600 dark:text-blue-500`.

**Submit button (already uses the primitive correctly):**
```tsx
<Button type="submit" variant="primary" size="md" disabled={isLoading}
  icon={<ArrowIcon className="fill-white" />} iconPosition="right">
  {isLoading ? "Please wait..." : "Send Message"}
</Button>
```

### 3.4 Commented-out code (~90 lines)

- **Lines 20–26:** `hasMounted` rehydration guard (also commented out on the Contact page — `react-phone-number-input` is the likely hydration culprit; see Q10).
- **Lines 216–230:** an old plain `<input name="mobile">` replaced by `PhoneInput`.
- **Lines 263–348:** a **file-upload dropzone** — "Upload Stock Details (Part No, Quantities…)", accepts `.xlsx,.xls,.csv` (max 25MB), shows an Excel icon chip (`/images/logo/excel.png`) when a file is selected, registered as `fileUpload` with `required`. References an undefined `selectedFile` state, so it cannot be uncommented as-is.

---

## 4. FORM LOGIC — DO NOT CHANGE

The following must remain **functionally identical**:

1. **react-hook-form** setup: `register`, `handleSubmit`, `watch`, `control`, `reset`, `formState: { errors, isDirty, isValid }`
2. **`emailjs.sendForm()`** — note: this page uses `sendForm` (submits the DOM form element), **unlike the Contact page which uses `emailjs.send()`** with a data object.
3. **Environment variables:** `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_BUYBACK_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
4. **Success callback:** `router.push("/")` + `toast.success("Thank you! Your message has been sent successfully. We'll get back to you shortly.")`
5. **Error callback:** `console.log("FAILED...", error)` + `toast.error("Oops! Something went wrong. Please try again later.")`
6. **Loading state:** `isLoading` disables inputs and swaps button text to "Please wait..."
7. **Validation rules:** `fullName` (required), `email` (required), `companyName` (required), `phoneNumber` (required + `isValidPhoneNumber`), `brandName` (required), `agree` (required); `message` optional
8. **PhoneInput** with `defaultCountry="IN"`, `autoFormat`
9. **Submit handler wiring:** `handleSubmit(handleFormSubmit, () => toast.error("Please fill in all required fields."))`

**⚠️ CRITICAL — `sendForm` coupling.** Because `emailjs.sendForm(event.target)` serializes the DOM form, the `<form>` element must keep its inputs **directly nested inside it** with their `register` spread props intact. You may restyle inputs and wrap them in `<div>`s, but you **cannot** move inputs outside the `<form>` or replace `<form onSubmit>` with a non-form element without switching to `emailjs.send()` — which would be a logic change and is out of scope.

**What CAN change:**
- Visual styling of inputs, labels, checkbox, button layout
- Layout structure and the surrounding page sections
- Animations and transitions
- Glass effects on the card
- Spacing, typography, icons
- Field grouping and visual hierarchy
- All page content *above and around* the form (new sections welcome — see §8)
- Deleting all commented-out dead code

---

## 5. TECH STACK (fixed)

| Item | Value |
|---|---|
| Framework | Next.js `^13.5.6`, App Router |
| React | `18.2` |
| Language | TypeScript |
| Styling | Tailwind CSS `^3.3.5` |
| Animation | `framer-motion` `^10.12.16` |
| Theme | `next-themes`, `darkMode: "class"`, default light |
| Alias | `@/*` → repo root |
| Forms | `react-hook-form`, `react-phone-number-input`, `@emailjs/browser` |
| Toasts | `react-hot-toast` (config in `app/context/ToastContext.tsx`) |

---

## 6. DESIGN SYSTEM (`tailwind.config.js`)

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
⚠️ `red-500/600`, `blue-500/600`, `gray-*` are used in the current code but are **not** tokens. Keep reds for errors (no token exists) but replace `blue-600`/`gray-*` with `primary`/`stroke`/`waterloo` where possible.

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

## 7. BUILT PRIMITIVES (already exist — MUST reuse, do not reinvent)

| Primitive | File | Use here |
|---|---|---|
| `GlassCard` | `components/Common/GlassCard.tsx` | Wrap the form card and any new content cards |
| `GlassPanel` | `components/Common/GlassPanel.tsx` | Lighter glass wrapper |
| `Button` | `components/Common/Button.tsx` | Submit + any CTAs (variants: primary/secondary/ghost/outline/icon/social; sizes sm/md/lg) |
| `ArrowIcon` | `components/Common/ArrowIcon.tsx` | Already used in the submit button |
| `SectionHeader` | `components/Common/SectionHeader.tsx` | Title + subtitle band for new sections |
| `ToastCard` | `app/context/ToastContext.tsx` | Toast styling already handled globally |

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
Layers built in: semi-transparent bg → tint gradient → top gloss → 1px specular rim → optional glow orb → hover lift (`y: -4`) → staggered entrance.

### Project animation pattern (standard)
```tsx
initial={{ opacity: 0, y: 12 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.15 }}
transition={{ duration: 0.3, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
// hover: whileHover={{ y: -4 }} + transition-[border-color,box-shadow] duration-300
```
⚠️ The current component uses `y: -20`, `duration: 1`, and **no easing curve** — it falls *down* into place. Replace with the standard above.

### Reference components (quality bar)
- `components/Header/MobileMenu.tsx` — the most polished component: portal + `AnimatePresence`, stagger `index * 0.05`, glass optics, `ease: [0.23, 1, 0.32, 1]`.
- `components/Certifications/` + `components/Features/` — migrated card grids, good examples of `GlassCard` + `index` stagger.
- `components/Contact/index.tsx` — sibling form page; the planner should keep the two visually coherent (or consider whether to unify their banners).

---

## 8. AVAILABLE ASSETS

```
public/images/buyback/buyback.jpg          ← page banner (only buyback asset)
public/images/logo/logo.svg                ← light logo
public/images/logo/logo-dark.svg           ← dark logo
public/images/logo/logo.png
public/images/logo/logo-light.svg
public/images/logo/excel.png               ← Excel icon, referenced by the commented-out file upload
public/images/shape/shape-dotted-light.svg
public/images/shape/shape-dotted-dark.svg
public/images/shape/shape-dotted-light-02.svg
public/images/shape/shape-dotted-dark-02.svg
public/images/shape/shape-01.png … shape-06.png
public/images/brand/brand-01.svg … brand-12.svg   ← 12 brand logos (usable if the redesign wants to show brands we buy back)
```

---

## 9. PROBLEMS WITH THE CURRENT DESIGN

| # | Problem | Impact |
|---|---|---|
| 1 | **No content besides a form** — no explanation of the buy-back program, process, or benefits | Visitor lands on a bare form with no context or motivation |
| 2 | **Single lonely card** — the flex container wraps exactly one child | Wasted layout machinery; page feels empty |
| 3 | **No glass anywhere** — solid `bg-white dark:bg-black` card | Inconsistent with the redesigned cards/header |
| 4 | **Banner is copy-pasted from Contact** — same clipPath, same gradient, same wrong `alt` text | Reads as unfinished; `alt` is an accessibility bug |
| 5 | **Banner is 720px tall on desktop** for a page with ~600px of content below | Disproportionate; pushes the form below the fold |
| 6 | **`h1` has no animation** — sits static while everything else animates | Feels disconnected |
| 7 | **Inputs are underline-only, placeholder-only** — no labels, no icons | Looks unfinished; poor a11y (no persistent label for screen readers) |
| 8 | **Full name input uses `border`, others use `border-b`** | Visually inconsistent within one form |
| 9 | **Checkbox + Privacy link use raw `blue-600`/`gray-*`** | Token discipline violated; clashes with `primary` |
| 10 | **Error copy bug** — the *Brand name* error says "Company name is required." | Confusing |
| 11 | **No success state** — only a toast, and the user is immediately `router.push("/")`ed away | User may not see confirmation |
| 12 | **No field grouping** — 7 fields in an undifferentiated stack | Hard to scan |
| 13 | **No trust signals** — no logos, stats, certifications, or testimonials | B2B sellers need reassurance before sharing inventory details |
| 14 | **No "how it works"** — the process (submit → evaluate → quote → pickup) is never explained | Users don't know what happens after they submit |
| 15 | **No categories / what we buy** — no mention of hydraulics, pneumatics, electrical, spares | Users don't know if their surplus qualifies |
| 16 | **Animation is `y: -20`, `duration: 1`, no easing** | Non-standard, slow, wrong direction |
| 17 | **~90 lines of commented-out dead code** | Maintenance noise |
| 18 | **Raw hex `#dee7ff47` / `#252A42`** in the background blob | Should be tokens (`zumthor` / `hoverdark` are close) |
| 19 | **No CTA to Contact / Brands** for users who don't want to sell | Dead end |
| 20 | **No FAQ** — pricing, minimum quantity, location, shipping all unaddressed | Support burden |
| 21 | **`section id="support"`** on a buy-back section | Misleading anchor |
| 22 | **Duplicate `metadata` export risk** — the component file exports nothing metadata-wise, fine, but the page's metadata has no `description` | SEO gap |

---

## 10. DESIGN DIRECTIONS (for the planning agent)

### Direction A — "How it works" + glass form (recommended)
- **Banner:** keep the image but reduce height (`h-[280px] md:h-[420px]`), add an animated `h1` and a subtitle, fix the `alt`.
- **Section 1 — How it works:** 4 steps in `GlassCard` grid (`index` stagger): *1. Submit your list → 2. Get a valuation → 3. Agree a price → 4. Ship & get paid*. Use `SectionHeader`.
- **Section 2 — What we buy:** icon/chip grid — Hydraulics, Pneumatics, Electrical, Instrumentation, Automation, Industrial Spares.
- **Section 3 — The form:** wrap in `GlassCard density="read"` with `tint="from-primaryho/15"`, add icons + real labels to fields, group into "Your details" / "Your inventory".
- Optional **Section 4 — FAQ** accordion in glass.

### Direction B — Split hero form
- Banner collapses into a two-column hero: left = value prop + trust stats, right = the glass form immediately (no scrolling).
- Below: a slim "How it works" strip.
- Most aggressive; best conversion.

### Direction C — Stepped/multi-step form
- Keep one page but turn the form into 3 steps (Contact → Inventory → Review) with a progress indicator.
- Lower perceived effort; but **⚠️ conflicts with `sendForm`** — all inputs must still end up in one `<form>` DOM node. Achievable (steps hide/show within one form) but riskier; see Q8.

### Direction D — Minimal polish only
- Keep the exact structure; just add `GlassCard`, fix the banner, fix the bugs, standardize animation.
- Lowest risk, lowest reward.

### Direction E — Landing-page treatment
- Full redesign as a marketing page: hero value prop → stats band → what we buy → testimonials/logos → form → FAQ.
- Largest scope; needs content the repo doesn't currently have (see Q12).

---

## 11. CONSTRAINTS

1. **Must keep the form logic identical** (§4) — same env vars, same `sendForm`, same callbacks, same validation.
2. **Must keep all inputs directly inside the `<form>` element** with their `register`/`Controller` props — required by `emailjs.sendForm(event.target)`.
3. **Must keep all 7 fields** — fullName, email, companyName, phoneNumber, brandName, message, agree.
4. **Must use `Button`** for the submit and any CTA — no hand-rolled buttons.
5. **Must use `framer-motion`** with `ease: [0.23, 1, 0.32, 1]`, `duration-300`/`duration-500`, stagger `index * 0.05`.
6. **Must use design tokens only** — no raw hex; replace `blue-600`/`gray-*` with tokens (reds for errors are acceptable).
7. **Must have `dark:` variants** on every new element.
8. **Must have `focus-visible` rings** on every interactive element.
9. **Must not add new dependencies.**
10. **Must not add new Tailwind tokens.**
11. **Must fix the `alt` text** on the banner image.
12. **Must fix the Brand name error copy** ("Company name is required." → "Brand name is required.").
13. **Must delete commented-out dead code** rather than port it (except: flag the file-upload feature as a product decision — see Q9).
14. **Must remain responsive** at 320px, 768px, 1024px, 1280px+.
15. **Must keep `pt-[90px] md:pt-[102px]`** on `<main>` (clears the fixed header) or an equivalent that doesn't hide content under the header.
16. **Must not break the toasts** — `react-hot-toast` is configured globally in `app/context/ToastContext.tsx`.
17. **Validation to keep:** phone must pass `isValidPhoneNumber`; required fields must block submission and show the error toast.

---

## 12. OPEN QUESTIONS FOR THE PLANNING AGENT

**Q1 — Direction.** A (how-it-works + glass form), B (split hero), C (multi-step), D (minimal), or E (full landing)? Recommend **A** — biggest gain per unit of risk, and it doesn't fight `sendForm`.

**Q2 — Content sections.** Add "How it works", "What we buy", and/or FAQ? Recommend: **yes to How-it-works + What-we-buy**; FAQ optional.

**Q3 — Banner.** Keep, shrink, or replace with a designed hero? Recommend: **keep the image, shrink to ~`h-[280px] md:h-[420px]`**, add animation + subtitle, fix `alt`.

**Q4 — Shared banner pattern.** The Contact and Buy Back pages use an identical banner (same clipPath + gradient). Factor it into a shared component, or leave duplicated? Recommend: **factor into `components/Common/PageBanner.tsx`** if both are being redesigned.

**Q5 — Input style.** Underline (current), floating labels, or boxed glass inputs? Recommend: **boxed glass inputs with floating labels** — `bg-white/50 dark:bg-white/5 rounded-xl border border-stroke p-4` + `react-icons` icon, matching the Contact page redesign (`CONTACT_PAGE_REDESIGN_BRIEF.md`).

**Q6 — Field grouping.** Group into "Your details" (name, email, company, phone) and "Your inventory" (brand name, message)? Recommend: **yes**.

**Q7 — Success state.** Currently the user is `router.push("/")`ed immediately with only a toast. Add an in-form success card before/instead of the redirect? ⚠️ Changing `router.push` is a logic change — see Q7a.
- **Q7a — Keep or remove the redirect?** Recommend: **keep the redirect** (logic constraint) but show the success state for ~1.5s first, or simply keep toast-only to avoid touching logic.

**Q8 — Multi-step form (Direction C).** Technically possible while preserving `sendForm` (all inputs stay in one `<form>`, steps only toggle visibility), but adds state complexity and risk. Recommend: **only if the user explicitly wants it**; otherwise A/B.

**Q9 — File upload.** ~90 lines are commented out for an Excel/CSV stock-list upload (`fileUpload`, accepts `.xlsx/.xls/.csv`, 25MB). It references undefined `selectedFile` state and emailjs file upload requires a **different template + `FormData`**, so it cannot simply be uncommented. Options: (a) delete the dead code, (b) restore as a real feature (separate task, needs emailjs file-upload setup). Recommend: **(a) delete now, treat (b) as a follow-up feature request**.

**Q10 — Hydration guard.** The `hasMounted` block (lines 20–26) is commented out with a note about rehydration errors, and `react-phone-number-input` is a known hydration-risk component. Is the dev seeing hydration warnings? Recommend: planner should **verify no hydration error in the console** after restyling; if warnings appear, reinstate the guard.

**Q11 — Trust signals.** Add stats (years, brands, transactions), certification logos (`public/certifications/` exists as untracked), or testimonials? Recommend: **yes — stats row + the 12 brand logos** (`public/images/brand/brand-01..12.svg`) as a "brands we handle" strip. Confirm certifications are approved for use before adding.

**Q12 — Content availability.** Any new copy (process steps, FAQ answers, stats) must be **written by the planner** — none exists in the repo beyond the one-line subtitle. Flag any invented claims (e.g., "get paid in 48 hours") for client confirmation before shipping.

**Q13 — Cross-links.** Add CTAs to `/brands` and `/contact`? Recommend: yes — a secondary `Button variant="outline"` "Browse our brands" near the form.

**Q14 — Section anchor.** `section id="support"` is meaningless here. Rename to `id="buy-back-form"` or drop it? Recommend: **rename**.

**Q15 — Metadata.** Add a `description` to the page metadata (currently only a title)? Recommend: yes — one sentence about selling industrial surplus.

**Q16 — Dark mode.** Anything beyond standard `dark:` parity? Recommend: no — `GlassCard` handles it.

---

## 13. DEFINITION OF DONE

- [ ] Page redesigned per the chosen direction (specify which)
- [ ] Form logic byte-for-byte equivalent (§4) — `sendForm`, env vars, callbacks, validation, loading state
- [ ] All 7 fields present, all directly inside `<form>`
- [ ] `Button` + `ArrowIcon` used for submit
- [ ] Form card wrapped in `GlassCard density="read"`
- [ ] Banner image `alt` text fixed
- [ ] Brand name error copy fixed
- [ ] Full name input border made consistent (`border-b`)
- [ ] Checkbox + Privacy link migrated from `blue-600`/`gray-*` to tokens
- [ ] Raw hex `#dee7ff47` / `#252A42` replaced with tokens
- [ ] Animation standardized: `ease: [0.23, 1, 0.32, 1]`, `duration-300`/`duration-500`, stagger `index * 0.05`, `y: 12` (not `-20`)
- [ ] `h1` now animated
- [ ] Commented-out dead code deleted (file upload decision per Q9 recorded)
- [ ] `section id` renamed
- [ ] Page metadata `description` added
- [ ] New content sections added per Q2 (if chosen) using `SectionHeader` + `GlassCard`
- [ ] Inputs have icons and/or persistent labels (a11y)
- [ ] Full dark-mode parity — verified by toggling
- [ ] All colours from tokens (reds for errors excepted)
- [ ] `focus-visible` ring on every interactive element
- [ ] No new dependencies, no new Tailwind tokens
- [ ] Responsive at 320 / 768 / 1024 / 1280+
- [ ] No hydration warnings in the browser console
- [ ] Toasts still fire on validation error, success, and failure
- [ ] `npx next build` passes with no errors

---

### The five findings that should drive the plan

1. **This is a bare form on a page with zero explanatory content** — no "how it works", no "what we buy", no trust signals. That's the biggest opportunity: the redesign should mostly be about adding context around the form.
2. **`emailjs.sendForm(event.target)` couples the logic to the DOM structure** — every input must stay inside the `<form>`. Any redesign that separates inputs from the form element breaks submission.
3. **The banner is copy-pasted from the Contact page, including wrong `alt` text** — and it's 720px tall, pushing the form below the fold.
4. **The form styling is the old underline pattern** that the Contact redesign brief already flagged — placeholder-only inputs, no labels, no icons, inconsistent `border` vs `border-b`, and non-token blue/gray on the checkbox.
5. **~90 lines of commented-out file-upload code** reference undefined state and would need a different emailjs template — it's a product decision (Q9), not something to uncomment.
