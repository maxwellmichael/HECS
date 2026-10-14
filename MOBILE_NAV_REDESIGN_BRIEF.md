# CONTEXT BRIEF — Mobile Navigation Menu Redesign

Repo root: `C:\Users\MAXWELL\Documents\Projects\Heliac\Heliacenergii` · Branch: `dev`

---

## 1. OBJECTIVE

Redesign the mobile navigation menu (hamburger dropdown) to be more modern, polished, and consistent with the project's design system. The current mobile menu is a simple dropdown panel with basic styling — it lacks animation, visual hierarchy, and the polish of the rest of the site.

---

## 2. CURRENT STATE — Full Audit

### 2.1 Header structure (desktop + mobile)

**File:** `components/Header/index.tsx` (187 lines)

The header is `fixed left-0 top-0 z-999 w-full` and contains:
- **Logo** (left) — 74×74px mobile, 86×86px desktop
- **Hamburger button** (right, `xl:hidden`) — animated 3-line → X icon
- **Nav panel** (below header, toggled by hamburger) — contains nav links + Inquiry button + BrochureButton

### 2.2 Mobile menu open/close mechanism

```tsx
const [navigationOpen, setNavigationOpen] = useState(false);
```

- Hamburger button toggles `navigationOpen`
- No animation on open/close — the panel simply appears/disappears via CSS class swap
- No overlay/backdrop behind the menu
- No body scroll lock when menu is open
- No escape key handler to close
- No click-outside-to-close

### 2.3 Mobile menu panel (current)

```tsx
<div
  className={`${
    navigationOpen
      ? "navbar !visible mt-4 h-auto max-h-[400px] rounded-2xl border border-white/60 bg-white/95 p-7.5 shadow-solid-5 backdrop-blur-xl dark:border-white/10 dark:bg-blacksection/95 xl:h-auto xl:border-none xl:bg-transparent xl:p-0 xl:shadow-none xl:backdrop-blur-none xl:dark:bg-transparent"
      : "invisible h-0 w-full items-center justify-between xl:visible xl:flex xl:h-auto xl:w-full"
  }`}
>
```

**When open (mobile):**
- `mt-4` — 16px gap below header
- `max-h-[400px]` — hard height limit (content may overflow)
- `rounded-2xl` — rounded corners
- `border border-white/60` — subtle border
- `bg-white/95` — near-opaque white
- `p-7.5` — 30px padding
- `shadow-solid-5` — soft shadow
- `backdrop-blur-xl` — frosted glass effect

**When closed (mobile):**
- `invisible h-0` — hidden with zero height
- No transition/animation between states

### 2.4 Mobile menu content

```tsx
<nav>
  <ul className="flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-3">
    {menuData.map((menuItem, key) => (
      <li key={key}>
        {/* Dropdown items (if submenu) */}
        <button onClick={() => setDropdownToggler(!dropdownToggler)}>
          {menuItem.title}
          <svg>...</svg>
        </button>
        <ul className={`dropdown ${dropdownToggler ? "flex" : ""}`}>
          {menuItem.submenu.map((item) => (
            <li><Link href={item.path}>{item.title}</Link></li>
          ))}
        </ul>

        {/* Regular items */}
        <Button href={menuItem.path} variant="ghost" size="sm" className="rounded-full">
          {menuItem.title}
        </Button>
      </li>
    ))}
  </ul>
</nav>

{/* CTA buttons */}
<div className="mt-7 flex items-center gap-6 xl:mt-0">
  <Button href="/contact" variant="primary" size="lg">Inquiry</Button>
  <BrochureButton className="hidden xl:inline-flex" />
</div>

{/* Mobile-only Brochure button */}
<div className="mt-6 border-t border-stroke pt-6 dark:border-strokedark xl:hidden">
  <BrochureButton className="w-full" />
</div>
```

### 2.5 Menu data

**File:** `components/Header/menuData.tsx`

```tsx
const menuData: Menu[] = [
  { id: 1, title: "Home", newTab: false, path: "/" },
  { id: 2, title: "Brands", newTab: false, path: "/brands" },
  { id: 3, title: "Buy Back", newTab: false, path: "/buy-back" },
  { id: 4, title: "About", newTab: false, path: "/about" },
  { id: 5, title: "Contact", newTab: false, path: "/contact" },
];
```

No submenu items exist in the current data (the dropdown logic is present but unused).

### 2.6 Hamburger icon (current)

```tsx
<button
  aria-label="hamburger Toggler"
  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho xl:hidden"
  onClick={() => setNavigationOpen(!navigationOpen)}
>
  <span className="relative block h-5.5 w-5.5 cursor-pointer">
    {/* 3 horizontal lines that animate to X */}
  </span>
</button>
```

- 3 lines (`h-0.5 w-full`) that collapse to center and rotate 45° to form an X
- Uses `delay-[0]`, `delay-150`, `delay-200`, `delay-300`, `delay-400`, `delay-500` for staggered animation
- `bg-black dark:bg-white`
- No background/border on the button itself — just the icon

### 2.7 CSS classes (from `app/globals.css`)

```css
@media (max-width: 1280px) {
  .navbar {
    @apply max-h-[400px] overflow-y-scroll;
  }
}
```

This applies `overflow-y-scroll` to the `.navbar` class on mobile, but the current mobile menu does NOT use the `navbar` class — it uses inline classes. This CSS rule is effectively dead.

### 2.8 ThemeToggler (commented out in header)

```tsx
{/* <ThemeToggler /> */}
```

The theme toggle exists (`components/Header/ThemeToggler.tsx`) but is commented out in the header. It is not visible in the mobile menu.

---

## 3. PROBLEMS WITH THE CURRENT MOBILE MENU

| # | Problem | Impact |
|---|---|---|
| 1 | **No open/close animation** | Menu appears/disappears instantly — feels abrupt and unpolished |
| 2 | **No overlay/backdrop** | Menu floats over content with no visual separation; content behind is still visible |
| 3 | **No body scroll lock** | User can scroll the page behind the menu, which is confusing |
| 4 | **No escape key handler** | Pressing Escape doesn't close the menu |
| 5 | **No click-outside-to-close** | User must click the hamburger again to close |
| 6 | **Hard 400px max-height** | Content may be clipped; no smooth height transition |
| 7 | **No staggered link animation** | All links appear at once; no visual delight |
| 8 | **No active page indicator** | Active nav link has `bg-primary text-white` but it's a pill — hard to see in the vertical list |
| 9 | **BrochureButton duplicated** | Shows in the CTA row (hidden on mobile) AND in a separate mobile-only section — redundant |
| 10 | **No theme toggle in mobile menu** | ThemeToggler is commented out; mobile users can't switch theme |
| 11 | **No social links / contact info** | Mobile menu is just nav links + CTA; no additional context |
| 12 | **Dropdown submenu logic is dead code** | `dropdownToggler` state exists but no menu item has a `submenu` property |
| 13 | **No animation on hamburger icon** | The icon animates (lines → X) but the button itself has no feedback |
| 14 | **Menu doesn't close on navigation** | Clicking a nav link doesn't close the menu — user must manually close it |
| 15 | **No focus management** | When menu opens, focus doesn't move into the menu; when it closes, focus doesn't return to the hamburger |

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

### z-index
`99999`, `999`, `1` — Header uses `z-999`. Mobile menu overlay should use `z-[998]` (below header, above content).

---

## 6. COMPONENT PATTERNS (must follow)

### Framer-motion pattern (used across the project)
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

### AnimatePresence pattern (from BrochureButton — the most polished component)
```tsx
<AnimatePresence>
  {isHovered && (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="origin-top-right"
    >
      {/* content */}
    </motion.div>
  )}
</AnimatePresence>
```

### Staggered children pattern (from BrochureButton dropdown items)
```tsx
{brochures.map((brochure, index) => (
  <motion.button
    key={brochure.id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
  >
    {/* content */}
  </motion.button>
))}
```

### Button primitive (already standardized)
```tsx
import Button from "@/components/Common/Button";
<Button href="/contact" variant="primary" size="lg">Inquiry</Button>
```
Variants: `primary` | `secondary` | `ghost` | `outline` | `icon` | `social`
Sizes: `sm` | `md` | `lg`

### Glassmorphism pattern (from BrochureButton dropdown — current best-in-class)
```tsx
className="rounded-2xl border border-white/60 bg-white/75 shadow-solid-8 backdrop-blur-xl dark:border-strokedark/60 dark:bg-blacksection/75"
```

### Brand glow pattern (from BrochureButton)
```tsx
<div className="pointer-events-none absolute -top-8 right-6 h-16 w-32 rounded-full bg-primary/30 blur-2xl dark:bg-primaryho/40" />
```

---

## 7. HEADER CONTEXT

### Desktop layout
```
┌─────────────────────────────────────────────────────────┐
│  [Logo]    Home  Brands  Buy Back  About  Contact    [Inquiry] [Brochures] │
└─────────────────────────────────────────────────────────┘
```

### Mobile layout (current)
```
┌─────────────────────────────┐
│  [Logo]              [☰]   │  ← Header (fixed)
├─────────────────────────────┤
│  ┌───────────────────────┐  │
│  │  Home                 │  │  ← Dropdown panel
│  │  Brands               │  │     (appears below header)
│  │  Buy Back             │  │
│  │  About                │  │
│  │  Contact              │  │
│  │                       │  │
│  │  [Inquiry]            │  │
│  │  ─────────────────    │  │
│  │  [Brochures]          │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

### Header sticky behavior
```tsx
const [stickyMenu, setStickyMenu] = useState(false);
// Triggers at window.scrollY >= 80
// When sticky: border-b border-white/60 bg-white/75 shadow-solid-5 backdrop-blur-2xl
// When not: border-b border-transparent
```

### Breakpoints
- Mobile: `< 768px` (Tailwind `md`)
- Tablet: `768px – 1279px` (`md` to `xl`)
- Desktop: `≥ 1280px` (`xl`) — hamburger hidden, full nav visible

---

## 8. AVAILABLE ASSETS

```
public/images/logo/logo.png        (light mode logo)
public/images/logo/logo-dark.svg    (dark mode logo)
public/images/logo/logo.svg
public/images/icon/icon-moon.svg    (theme toggle)
public/images/icon/icon-sun.svg     (theme toggle)
public/images/shape/shape-dotted-light.svg
public/images/shape/shape-dotted-dark.svg
```

---

## 9. DESIGN DIRECTIONS (for the planning agent to consider)

### Direction A — Slide-in drawer (most modern)
- Full-height panel slides in from the right (or left)
- Overlay backdrop with `bg-black/50 backdrop-blur-sm`
- Header stays visible at top
- Nav links stagger in from the left
- CTA buttons at the bottom
- Close button (X) at top-right of the panel
- Body scroll lock
- Escape key + click-outside to close

### Direction B — Expandable accordion (current, improved)
- Keep the dropdown panel below the header
- Add smooth height animation via `framer-motion`
- Stagger nav links vertically
- Add overlay backdrop
- Add active page indicator (left border or icon)
- Move theme toggle into the menu
- Remove duplicate BrochureButton

### Direction C — Full-screen overlay
- Menu takes up the entire viewport below the header
- Large typography for nav links
- Centered layout with brand glow decoration
- Social links at the bottom
- Most dramatic; good for brand-focused sites

### Direction D — Bottom sheet
- Panel slides up from the bottom
- Rounded top corners
- Drag handle indicator
- Common in mobile app design
- Less common for websites; may feel out of place

---

## 10. CONSTRAINTS

1. **Must work in dark mode** — every element needs `dark:` variants
2. **Must use design tokens only** — no raw hex colours
3. **Must use `framer-motion`** for animations — no CSS transitions for enter/exit
4. **Must use the `Button` primitive** for all buttons
5. **Must have `focus-visible` ring** on all interactive elements
6. **Must have `aria-expanded`** on the hamburger button
7. **Must have `aria-hidden`** on the menu when closed
8. **Must lock body scroll** when menu is open
9. **Must close on Escape key**
10. **Must close on navigation** (when a link is clicked)
11. **Must close on click-outside**
12. **Must not break desktop layout** — desktop nav must remain unchanged
13. **Must not add new dependencies** — `framer-motion` is already installed
14. **Must not add new Tailwind tokens**
15. **Must be responsive** — works on 320px, 768px, 1024px, 1280px+
16. **Must handle the sticky header** — when scrolled, the header has a backdrop-blur background; the mobile menu must work in both sticky and non-sticky states

---

## 11. OPEN QUESTIONS FOR THE PLANNING AGENT

**Q1 — Pattern.** Drawer (A), improved accordion (B), full-screen (C), or bottom sheet (D)? Recommend **A (slide-in drawer)** — it's the most modern and expected pattern for mobile navigation in 2024+.

**Q2 — Overlay.** Should there be a dimmed backdrop behind the menu? Recommend: yes — `bg-black/50 backdrop-blur-sm` with a fade-in animation.

**Q3 — Height.** Full-height drawer or partial-height panel? Recommend: full-height (100vh minus header height) for a more immersive feel.

**Q4 — Theme toggle.** Should the ThemeToggler be uncommented and placed in the mobile menu? Recommend: yes — it's the only way mobile users can switch themes.

**Q5 — BrochureButton duplication.** Currently shows in both the CTA row (hidden on mobile) and a mobile-only section. Should it be consolidated? Recommend: yes — show it once, full-width, at the bottom of the menu.

**Q6 — Active page indicator.** How should the active page be shown? Recommend: a left border bar (`border-l-2 border-primary`) or a small dot indicator — more subtle than the current full pill.

**Q7 — Stagger animation.** Should nav links stagger in? Recommend: yes — `delay: index * 0.05` with `y: 10 → 0` and `opacity: 0 → 1`.

**Q8 — Social links.** Should social media links appear at the bottom of the mobile menu? Recommend: optional — only if the design has space.

**Q9 — Contact info.** Should email/phone appear in the mobile menu? Recommend: no — keep it clean; the Contact page has that info.

**Q10 — Close button.** Should there be an explicit X button inside the menu (in addition to the hamburger)? Recommend: yes — a small icon button at the top-right of the drawer.

**Q11 — Focus management.** When the menu opens, should focus move to the first nav link? When it closes, should focus return to the hamburger? Recommend: yes — use `useRef` and `useEffect` for focus management.

**Q12 — Dead code.** Should the unused `dropdownToggler` state and submenu logic be removed? Recommend: yes — no menu item currently has a submenu.

---

## 12. DEFINITION OF DONE

- [ ] Mobile menu has smooth open/close animation (framer-motion)
- [ ] Overlay backdrop with fade-in/out
- [ ] Body scroll lock when menu is open
- [ ] Escape key closes the menu
- [ ] Click-outside closes the menu
- [ ] Menu closes when a nav link is clicked
- [ ] Nav links stagger in with animation
- [ ] Active page indicator is visible
- [ ] Theme toggle is accessible in the mobile menu
- [ ] BrochureButton appears only once (not duplicated)
- [ ] Hamburger button has `aria-expanded`
- [ ] Menu has `aria-hidden` when closed
- [ ] Focus management: focus moves into menu on open, returns to hamburger on close
- [ ] Full dark-mode parity
- [ ] All colours from design tokens only
- [ ] All animations use framer-motion
- [ ] All buttons use the `Button` primitive
- [ ] Desktop layout unchanged
- [ ] Responsive: works on 320px, 768px, 1024px, 1280px+
- [ ] No new dependencies added
- [ ] No new Tailwind tokens added
- [ ] `npm run build` passes with no errors
