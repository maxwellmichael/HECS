# CONTEXT BRIEF — Notification / Alert System Redesign

Repo root: `C:\Users\MAXWELL\Documents\Projects\Heliac\Heliacenergii` · Branch: `dev`

---

## 1. OBJECTIVE

Redesign the notification/alert system to be consistent, on-brand, accessible, and dark-mode-correct. The current system is a single global `react-hot-toast` `<Toaster>` with minimal configuration and ad-hoc `toast.success()` / `toast.error()` calls scattered across components. There is no shared notification component, no icon support, no action buttons, and no visual consistency.

---

## 2. CURRENT STATE — Full Audit

### 2.1 Global Toaster (the only notification UI)

**File:** `app/context/ToastContext.tsx` (23 lines)

```tsx
"use client";
import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            padding: "16px",
            width: "500px",
          },
        }}
        reverseOrder={false}
        gutter={12}
      />
    </div>
  );
};

export default ToasterContext;
```

**Mounted in:** `app/(site)/layout.tsx` line 27 — `<ToasterContext />` inside `<ThemeProvider>`.

### 2.2 Problems with the current Toaster config
1. **Fixed 500px width** — far too wide on mobile (320px viewport). Will overflow or be clipped.
2. **No style customization** — uses react-hot-toast's default look (dark background, white text). Does not match the project's design tokens at all.
3. **No icons** — success/error toasts have no visual indicator beyond color.
4. **No close button customization** — default close button may not match.
5. **No dark-mode awareness** — the default toast style is always dark, even in light mode.
6. **No action support** — toasts can't include buttons (e.g. "Undo", "View", "Dismiss").
7. **No exit animation** — toasts disappear abruptly.
8. **Position is top-right** — may conflict with the fixed header on mobile.

### 2.3 All toast call sites

| File | Line | Type | Message |
|---|---|---|---|
| `components/Contact/index.tsx` | 60 | `toast.success` | "Thank you! Your message has been sent successfully. We'll get back to you shortly." |
| `components/Contact/index.tsx` | 66 | `toast.error` | "Oops! Something went wrong. Please try again later." |
| `components/BuyBackContact/index.tsx` | 57 | `toast.success` | "Thank you! Your message has been sent successfully. We'll get back to you shortly." |
| `components/BuyBackContact/index.tsx` | 63 | `toast.error` | "Oops! Something went wrong. Please try again later." |
| `components/Header/BrochureButton.tsx` | 48 | `toast.success` | "2 Brochures Downloaded Successfully." |
| `components/Header/BrochureButton.tsx` | 58 | `toast.success` | "{title} Downloaded Successfully." |

### 2.4 Toast usage patterns
- **Success only** — 4 success toasts, 2 error toasts
- **No `toast.loading`** — form submissions show a spinner inside the button (`isLoading` state) but no toast
- **No `toast.dismiss`** — toasts auto-dismiss after 5s, no manual dismiss
- **No `toast.custom`** — no rich toasts with icons or actions
- **No promise toasts** — `toast.promise()` is not used anywhere

### 2.5 Console logging (not user-facing, but relevant)

| File | Line | Purpose |
|---|---|---|
| `components/Contact/index.tsx` | 45 | `console.log(newData)` — logs form data before sending |
| `components/Contact/index.tsx` | 65 | `console.log("FAILED...", error)` — logs emailjs errors |
| `components/BuyBackContact/index.tsx` | 42 | `console.log(newData)` — logs form data |
| `components/BuyBackContact/index.tsx` | 62 | `console.log("FAILED...", error)` — logs emailjs errors |
| `components/BrandSlider/index.tsx` | 14, 19 | `console.log` — debug logging |

### 2.6 Form error display (inline, not toast)

Both Contact and BuyBackContact use `react-hook-form` with inline error messages:
```tsx
{errors.fullName && (
  <p className="mt-1 text-sm text-red-600 dark:text-red-500">
    Full name is required.
  </p>
)}
```
- Errors are displayed below each field
- No toast is shown for validation errors
- No toast is shown on successful submission (only the emailjs success callback)

### 2.7 BrochureButton download feedback

`components/Header/BrochureButton.tsx` has its own download logic:
- `handleDownloadAll()` — downloads all brochures with 500ms stagger, shows one success toast at the end
- `handleDownloadSingle(brochure)` — downloads one brochure, shows success toast
- No error handling — if the download fails, the user gets no feedback
- No loading state during download

---

## 3. TECH STACK (fixed)

| Item | Value |
|---|---|
| Framework | Next.js `^13.5.6`, App Router |
| React | `18.2` |
| Language | TypeScript |
| Styling | Tailwind CSS `^3.3.5` |
| Animation | `framer-motion` `^10.12.16` |
| Toast library | `react-hot-toast` `^2.4.1` |
| Theme | `next-themes`, `darkMode: "class"`, default light |
| Alias | `@/*` → repo root |

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
`99999`, `999`, `1` — Toasts should use `z-[99999]` to sit above everything.

---

## 5. COMPONENT PATTERNS (must follow)

### Framer-motion pattern
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

### Button primitive (already standardized)
```tsx
import Button from "@/components/Common/Button";
<Button variant="primary" size="md" onClick={handleAction}>Submit</Button>
```
Variants: `primary` | `secondary` | `ghost` | `outline` | `icon` | `social`
Sizes: `sm` | `md` | `lg`

### BrochureButton (reference for rich interactive component)
`components/Header/BrochureButton.tsx` — uses `framer-motion` + `AnimatePresence` for a hover dropdown with staggered card animations. This is the most polished component in the project and sets the bar for animation quality.

---

## 6. CURRENT NOTIFICATION FLOW

### Contact form submission
```
User clicks "Send Message"
  → Button shows spinner (isLoading state)
  → emailjs.send() called
  → On success: router.push("/") + toast.success("Thank you!...")
  → On error: console.log + toast.error("Oops!...")
  → Finally: setLoading(false)
```

### BuyBackContact form submission
```
User clicks "Send Message"
  → Button shows spinner (isLoading state)
  → emailjs.sendForm() called
  → On success: router.push("/") + toast.success("Thank you!...")
  → On error: console.log + toast.error("Oops!...")
  → Finally: setLoading(false)
```

### Brochure download (single)
```
User clicks a brochure card
  → triggerDownload() creates temporary <a> and clicks it
  → toast.success("{title} Downloaded Successfully.")
  → No error handling
```

### Brochure download (all)
```
User clicks main "Brochures" button
  → For each brochure: setTimeout(triggerDownload, index * 500)
  → After last one: toast.success("2 Brochures Downloaded Successfully.")
  → No error handling
```

---

## 7. GAPS & PROBLEMS

| # | Problem | Impact |
|---|---|---|
| 1 | Fixed 500px toast width | Overflows on mobile |
| 2 | Default react-hot-toast styling | Clashes with brand (dark toast in light mode) |
| 3 | No icons in toasts | Success/error not visually distinct at a glance |
| 4 | No dark-mode toast styling | Toast looks the same in both modes |
| 5 | No action buttons in toasts | Can't offer "Undo", "View", "Retry" |
| 6 | No exit animation | Toasts vanish abruptly |
| 7 | No error handling for downloads | User gets no feedback if download fails |
| 8 | No loading toast for async ops | Only button spinner; no global feedback |
| 9 | No toast for form validation errors | Errors are inline only; no summary toast |
| 10 | `console.log` in production code | Form data logged to console (privacy concern) |
| 11 | No notification for "file not found" | If PDF is missing, user gets no feedback |
| 12 | No notification history | Toasts disappear after 5s; no way to review |
| 13 | Position top-right may conflict on mobile | Header is fixed; toast may overlap |
| 14 | No `toast.promise()` usage | Async operations don't show loading → success/error progression |

---

## 8. DESIGN DIRECTIONS (for the planning agent to consider)

### Direction A — Styled react-hot-toast (minimal change)
Keep `react-hot-toast` but fully customize the `<Toaster>`:
- Light mode: white bg, `border border-stroke`, `shadow-solid-3`, `text-black`
- Dark mode: `bg-blacksection`, `border-strokedark`, `text-white`
- Icon on the left (success: green check, error: red X, info: blue i)
- Close button on the right
- `max-w-[90vw] sm:max-w-[400px]` for mobile safety
- Slide-in from right, fade-out on dismiss

### Direction B — Custom toast component with framer-motion
Replace `react-hot-toast` with a custom `<NotificationProvider>`:
- Full control over animation (slide, scale, stagger)
- Rich toasts: icon + title + message + action button
- Stacked notifications with `AnimatePresence`
- Progress bar showing time until auto-dismiss
- Pause on hover

### Direction C — Hybrid (recommended)
Keep `react-hot-toast` for simple success/error, but wrap it in a custom `<ToastProvider>` that:
- Adds icons via `toast.custom()`
- Provides a `useToast()` hook with typed helpers: `toast.success()`, `toast.error()`, `toast.info()`, `toast.loading()`, `toast.promise()`
- Customizes the `<Toaster>` styling to match the design system
- Adds a progress bar to each toast

### Direction D — Notification center
A bell icon in the header with a dropdown showing recent notifications:
- Persists notifications in state (or localStorage)
- Unread count badge
- "Mark all as read" action
- Most complex; may be overkill for this project

---

## 9. CONSTRAINTS

1. **Must work in dark mode** — every notification style needs `dark:` variants
2. **Must use design tokens only** — no raw hex colours
3. **Must be responsive** — toasts must not overflow on 320px viewports
4. **Must have `z-[99999]`** — toasts sit above all content including the fixed header
5. **Must have exit animation** — no abrupt disappearance
6. **Must be dismissible** — close button on every toast
7. **Must have `aria-live`** — screen readers must announce toasts
8. **Must not add new dependencies** — `react-hot-toast` and `framer-motion` are already installed
9. **Must not break existing call sites** — all `toast.success()` / `toast.error()` calls must continue to work
10. **Must be accessible** — `role="alert"` for errors, `role="status"` for success, `aria-live="polite"`

---

## 10. OPEN QUESTIONS FOR THE PLANNING AGENT

**Q1 — Library.** Keep `react-hot-toast` (customized) or build a custom provider? Recommend: keep `react-hot-toast` but fully customize it (Direction C). It's battle-tested, supports `toast.promise()`, and the migration is minimal.

**Q2 — Position.** Top-right (current), top-center, bottom-right, or bottom-center? Recommend: top-right on desktop, top-center on mobile (to avoid header overlap).

**Q3 — Duration.** Keep 5000ms or make it configurable per toast? Recommend: default 5000ms, but allow override (e.g. errors stay longer, 7000ms).

**Q4 — Icons.** Use `react-icons` for toast icons? Recommend: `FaCheckCircle` (success), `FaExclamationCircle` (error), `FaInfoCircle` (info), `FaSpinner` (loading).

**Q5 — Action buttons.** Should toasts support an action button (e.g. "View", "Undo", "Retry")? Recommend: yes, via `toast.custom()` or a custom toast component.

**Q6 — Progress bar.** Add a visual countdown bar at the bottom of each toast? Recommend: yes — a thin `bg-primary` bar that animates width from 100% to 0%.

**Q7 — Mobile behaviour.** Should toasts be full-width on mobile? Recommend: `mx-4 max-w-[calc(100vw-2rem)]` on mobile, `max-w-[400px]` on desktop.

**Q8 — Dark mode.** Should the toast background be dark in light mode (for contrast) or light (for brand consistency)? Recommend: light bg in light mode, dark bg in dark mode — match the page theme.

**Q9 — Form validation.** Should a summary toast appear when form validation fails (in addition to inline errors)? Recommend: yes — a single error toast at the top listing the first error, e.g. "Please fill in all required fields."

**Q10 — Download error handling.** Should the BrochureButton show an error toast if the download fails? Recommend: yes — wrap `triggerDownload` in try/catch and show `toast.error("Download failed. Please try again.")`.

**Q11 — Console.log removal.** Should `console.log(newData)` calls be removed from production code? Recommend: yes — they log form data (including email/phone) to the console.

**Q12 — Notification history.** Is a notification center / history needed? Recommend: no — overkill for this project. Keep it simple.

---

## 11. DEFINITION OF DONE

- [ ] `<Toaster>` fully customized to match design system (colours, shadows, borders, typography)
- [ ] Responsive width: no overflow on 320px viewports
- [ ] Icons on all toast types (success, error, info, loading)
- [ ] Dark-mode styling for all toast variants
- [ ] Exit animation (fade/slide out)
- [ ] Close button on every toast
- [ ] `aria-live` / `role` attributes for accessibility
- [ ] `z-[99999]` to sit above fixed header
- [ ] Progress bar showing time until auto-dismiss
- [ ] All existing `toast.success()` / `toast.error()` calls still work
- [ ] BrochureButton has error handling with `toast.error()`
- [ ] `console.log` calls removed from production code
- [ ] No new dependencies added
- [ ] No new Tailwind tokens added
- [ ] `npm run build` passes with no errors
