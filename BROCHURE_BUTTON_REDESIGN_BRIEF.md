# CONTEXT BRIEF — Brochure Download Button Redesign

Repo root: `C:\Users\MAXWELL\Documents\Projects\Heliac\Heliacenergii` · Branch: `dev`

---

## 1. OBJECTIVE

Redesign the **"Brochure" download button** in the site header to be more visually distinctive and better communicate its download action, while strictly using the project's existing design system and the already-standardized `Button` primitive.

---

## 2. CURRENT STATE (after button standardization)

**File:** `components/Header/index.tsx` lines 183–190

```tsx
<Button
  variant="secondary"
  size="md"
  onClick={handleDownload}
  icon={<FaFileDownload className="h-5 w-5" />}
>
  Brochure
</Button>
```

**Rendered result:** A black pill button (`bg-black text-white hover:bg-blackho dark:bg-btndark`) with a download icon on the left and "Brochure" text. Sits immediately to the right of the blue "Inquiry" button.

**Header layout (right side):**
```tsx
<div className="mt-7 flex items-center gap-6 xl:mt-0">
  <Button href="/contact" variant="primary" size="lg">Inquiry</Button>
  <Button variant="secondary" size="md" onClick={handleDownload} icon={<FaFileDownload />}>
    Brochure
  </Button>
</div>
```

### Problems with the current design
1. **Looks identical to a navigation button** — the black pill could be mistaken for a "Sign up" or "Login" CTA. Nothing visually communicates "download".
2. **Icon is generic** — `FaFileDownload` is a standard file icon; it doesn't evoke a brochure/PDF/document.
3. **No visual hierarchy between the two buttons** — "Inquiry" (primary, blue, lg) and "Brochure" (secondary, black, md) are too similar in visual weight. The Brochure button should feel lighter/supporting.
4. **No hover delight** — hover only changes background color. No icon animation, no underline effect, no "click to download" affordance.
5. **No file context** — users don't know what format (PDF), what size, or what the brochure contains before clicking.
6. **Dark mode is flat** — `dark:bg-btndark` is fine but doesn't add any visual interest.

---

## 3. TECH STACK (fixed)

| Item | Value |
|---|---|
| Framework | Next.js `^13.5.6`, App Router |
| React | `18.2` |
| Language | TypeScript |
| Styling | Tailwind CSS `^3.3.5` |
| Icons | `react-icons` `^5.2.1` |
| Toasts | `react-hot-toast` `^2.4.1` |
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

## 5. BUTTON PRIMITIVE (already built — MUST use this)

**File:** `components/Common/Button.tsx`

```tsx
import Button from "@/components/Common/Button";

// API
type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "icon" | "social";
type ButtonSize = "sm" | "md" | "lg";

<Button
  variant="secondary"   // primary | secondary | ghost | outline | icon | social
  size="md"             // sm | md | lg
  onClick={handleDownload}
  icon={<FaFileDownload className="h-5 w-5" />}
  iconPosition="left"   // left | right
  className=""          // optional overrides
  ariaLabel=""          // optional aria-label
>
  Brochure
</Button>
```

### Variant styles (built into the primitive)
| Variant | Light mode | Dark mode |
|---|---|---|
| `primary` | `bg-primary text-white hover:bg-primaryho` | `bg-primary hover:bg-primaryho` |
| `secondary` | `bg-black text-white hover:bg-blackho` | `bg-btndark hover:bg-blackho` |
| `ghost` | `text-primary hover:bg-primary/5` | `text-white hover:text-primary` |
| `outline` | `border-2 border-white bg-primary text-white hover:border-primary hover:bg-white hover:text-primary` | `border-strokedark bg-transparent text-white hover:bg-primaryho hover:border-primaryho` |
| `icon` | `bg-transparent text-black hover:bg-stroke` | `text-white hover:bg-hoverdark` |
| `social` | `border border-stroke bg-alabaster text-black hover:border-primary hover:bg-primary/5` | `border-transparent bg-blackho text-white hover:border-primary` |

### Size styles
| Size | Padding | Text | Gap |
|---|---|---|---|
| `sm` | `px-4 py-2` | `text-sm` | `gap-1.5` |
| `md` | `px-6 py-3` | `text-regular` | `gap-2.5` |
| `lg` | `px-7.5 py-2.5` | `text-regular` | `gap-2.5` |

### Built-in behaviour
- `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho`
- `rounded-full` (can be overridden via `className`)
- `inline-flex items-center justify-center font-medium duration-300 ease-in-out transition-all`
- Renders `<Link>` when `href` is provided, `<button>` otherwise

---

## 6. HEADER CONTEXT

The Brochure button lives in the site header (`components/Header/index.tsx`), which is:
- `fixed left-0 top-0 z-999 w-full`
- Contains: logo (left), nav menu (center), Inquiry + Brochure buttons (right)
- The header has a sticky background that appears on scroll: `bg-[linear-gradient(#070d13b8,#070d133d)] backdrop-blur-[3rem]`

### Header right-side layout
```tsx
<div className="mt-7 flex items-center gap-6 xl:mt-0">
  <Button href="/contact" variant="primary" size="lg">Inquiry</Button>
  <Button variant="secondary" size="md" onClick={handleDownload} icon={<FaFileDownload />}>
    Brochure
  </Button>
</div>
```

### Download handler (already implemented)
```tsx
const handleDownload = () => {
  const fileUrl = "/downloads/brochure.pdf";
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = "brochure.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast.success(`File Downloaded Successfully.`);
};
```

### Available brochure files
```
public/downloads/brochure.pdf
public/downloads/brochure_old.pdf
```

---

## 7. ICON OPTIONS (react-icons)

The project has `react-icons` `^5.2.1`. Relevant download/document icons:

| Icon | Import | Visual |
|---|---|---|
| `FaFileDownload` | `react-icons/fa` | File with down arrow (current) |
| `FaDownload` | `react-icons/fa` | Simple down arrow into tray |
| `FaFilePdf` | `react-icons/fa` | PDF document |
| `FaFileAlt` | `react-icons/fa` | Document with lines |
| `FaBookOpen` | `react-icons/fa` | Open book |
| `FaRegFilePdf` | `react-icons/fa` | Outline PDF |
| `HiOutlineDownload` | `react-icons/hi` | Outline download |
| `HiOutlineDocumentDownload` | `react-icons/hi` | Outline document download |
| `MdOutlineFileDownload` | `react-icons/md` | Material outline download |
| `IoDocumentOutline` | `react-icons/io5` | Ionicons document |

---

## 8. DESIGN DIRECTIONS (for the planning agent to consider)

### Direction A — Ghost/download hybrid
- Use `variant="ghost"` with a download icon
- Text: "Brochure" with a subtle "PDF" badge next to it
- Hover: icon bounces down slightly, text underlines
- Feels lighter than the solid Inquiry button — clear visual hierarchy

### Direction B — Outline with icon emphasis
- Use `variant="outline"` with `border-primary` instead of `border-white`
- Icon inside a small circular badge
- Text: "Download Brochure" (more explicit)
- Hover: fills with `bg-primary/5`

### Direction C — Card-style button
- Slightly larger padding, `rounded-xl` instead of `rounded-full`
- Icon on the left in a `bg-primary/10 rounded-lg p-1.5` container
- Two-line text: "Brochure" (bold) + "PDF · 2.4 MB" (small, waterloo)
- Hover: shadow lifts, icon container turns blue

### Direction D — Underlined text link with icon
- No background at all — just icon + underlined text
- `text-primary hover:text-primaryho` with `underline underline-offset-4`
- Icon: `FaFilePdf` in blue
- Most minimal option; clearly secondary to the solid Inquiry button

### Direction E — Split button
- Main area: "Brochure" text (click to download)
- Right area: download icon in a separated section with a divider
- `rounded-full overflow-hidden flex` with two clickable zones
- More complex but very "download button"

---

## 9. CONSTRAINTS

1. **Must use the `Button` primitive** — no hand-rolled button markup. Pass `className` for any visual overrides.
2. **Must keep `onClick={handleDownload}`** — the download handler is already implemented and working.
3. **Must keep `toast.success(...)`** — user feedback on download.
4. **Must work in dark mode** — every element needs `dark:` variants.
5. **Must have `focus-visible` ring** — built into the primitive.
6. **Must not break the header layout** — the button sits next to "Inquiry" in a `flex items-center gap-6` container.
7. **Must not add new Tailwind tokens** — use existing colours only.
8. **Must not add new dependencies** — `react-icons` is already installed.
9. **Must be responsive** — the header collapses to a hamburger menu on mobile (`xl:hidden`); the Brochure button should still be accessible in the mobile menu or hidden gracefully.
10. **File size badge is optional** — if shown, it should be static text (e.g. "PDF") since we can't easily read file size at runtime without an API call.

---

## 10. OPEN QUESTIONS FOR THE PLANNING AGENT

**Q1 — Variant.** Which variant best communicates "download" while staying secondary to the solid "Inquiry" button? Recommend `ghost` or `outline` (lighter than the current `secondary`).

**Q2 — Icon.** Keep `FaFileDownload` or switch to something more document-specific like `FaFilePdf`? Recommend `FaFilePdf` — it's more specific to the actual file type.

**Q3 — Text.** Keep "Brochure" or change to "Download Brochure" / "Brochure PDF"? Recommend keeping "Brochure" (the header is space-constrained) but adding a small "PDF" badge.

**Q4 — File size indicator.** Add a "PDF" label/badge next to the text? This sets expectations before clicking. Recommend yes — a small `text-xs text-waterloo` span.

**Q5 — Hover animation.** Subtle icon bounce? Background fill? Shadow lift? Recommend a subtle icon translate-y on hover (download arrow moves down) — communicates the action.

**Q6 — Mobile behaviour.** On mobile (`<xl`), the header shows a hamburger. Should the Brochure button appear inside the mobile nav menu, or be hidden? Recommend: show it inside the mobile nav as a ghost button below the nav links.

**Q7 — Dark mode.** Does the redesign need a distinct dark-mode treatment, or do the existing `dark:` classes on the variant suffice? Recommend: existing variant dark classes are sufficient; just ensure any custom `className` overrides also have dark variants.

---

## 11. DEFINITION OF DONE

- [ ] Brochure button redesigned using the `Button` primitive (no hand-rolled markup)
- [ ] Visually distinct from the "Inquiry" button (clear hierarchy)
- [ ] Download action is visually communicated (icon + text)
- [ ] `onClick={handleDownload}` preserved
- [ ] `toast.success(...)` feedback preserved
- [ ] Full dark-mode parity
- [ ] `focus-visible` ring present (built into primitive)
- [ ] Responsive: works in desktop header and mobile nav
- [ ] No new Tailwind tokens added
- [ ] No new dependencies added
- [ ] All colours from design tokens only
- [ ] `npm run build` passes with no errors
