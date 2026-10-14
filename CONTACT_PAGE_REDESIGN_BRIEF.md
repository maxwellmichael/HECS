# CONTEXT BRIEF — Contact Page Redesign

Repo root: `C:\Users\MAXWELL\Documents\Projects\Heliac\Heliacenergii` · Branch: `dev`

---

## 1. OBJECTIVE

Redesign the **Contact Us** page UI to match the project's glass aesthetic and animation standards. **The form logic must remain exactly the same** — only the visual presentation changes. The page should feel like a natural extension of the rest of the site: glass cards, backdrop blur, staggered animations, and polished micro-interactions.

---

## 2. CURRENT STATE — Full Audit

### 2.1 Page structure

**File:** `app/(site)/contact/page.tsx` (45 lines)

```tsx
export default function SupportPage() {
  return (
    <main className="flex w-full flex-col pt-[90px] md:pt-[102px] mx-auto max-w-c-1390">
      <section className="w-full">
        <div className="relative h-[360px] w-full md:h-[720px]">
          <Image src="/images/contact/contact.jpg" fill priority={true} alt="..." />
          <div style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 25% 100%)" }}
               className="absolute inset-0 bg-gradient-to-b from-primary/100 to-primary/80" />
          <div className="absolute bottom-0 flex h-2/4 w-full flex-col justify-center align-middle">
            <h1 className="relative pr-[20%] text-end text-3xl font-extrabold text-white sm:text-5xl md:pr-[30%]">
              Contact Us
            </h1>
          </div>
        </div>
      </section>
      <Contact />
    </main>
  );
}
```

### 2.2 Contact component (the form + info panel)

**File:** `components/Contact/index.tsx` (376 lines)

**Layout:** Two-column on desktop (`md:flex-row`), stacked on mobile (`flex-col-reverse`):
- **Left (form):** `md:w-3/5 lg:w-3/4` — white card with form fields
- **Right (info):** `md:w-2/5 lg:w-[40%]` — locations, email, phone

**Form fields:**
| Field | Type | Required | Register name |
|---|---|---|---|
| Full name | text | Yes | `fullName` |
| Email | email | Yes | `email` |
| Company name | text | Yes | `companyName` |
| Phone number | PhoneInput | Yes | `phoneNumber` |
| Subject | text | No | `subject` |
| Message | textarea | No | `message` |
| Agree to Privacy Policy | checkbox | Yes | `agree` |

**Form logic (MUST PRESERVE):**
```tsx
const { register, handleSubmit, watch, control, reset, formState: { errors, isDirty, isValid } } = useForm();
const [isLoading, setLoading] = useState(false);

const handleFormSubmit = (formData: any) => {
  setLoading(true);
  const newData = { ...formData, current_year: new Date().getFullYear() };
  console.log(newData);
  emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID,
    newData,
    { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }
  ).then(
    () => { router.push("/"); toast.success("Thank you! Your message has been sent successfully..."); },
    (error) => { console.log("FAILED...", error); toast.error("Oops! Something went wrong..."); }
  ).finally(() => { setLoading(false); });
};
```

**Info panel content:**
- **Locations:** Goa, India + Kalispell, MT, USA
- **Email:** inquiry@heliacenergii.com
- **Phone:** 0091-8411981840, 0091-8793823181

### 2.3 Current styling

**Form panel:**
```tsx
className="animate_top w-full rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black md:w-3/5 lg:w-3/4 xl:p-15"
```

**Info panel:**
```tsx
className="animate_top w-full md:w-2/5 md:p-5.5 lg:w-[40%] xl:pt-15"
```

**Background decorations:**
- Gradient blob: `bg-gradient-to-t from-transparent to-[#dee7ff47]`
- Dotted shape overlay: `shape-dotted-light.svg` / `shape-dotted-dark.svg`

**Input styling:**
- Underline inputs: `border-b border-stroke bg-transparent pb-3.5`
- Error state: `border-red-500 text-red-900 placeholder-red-700`
- Focus: `focus:border-waterloo focus:placeholder:text-black`

---

## 3. FORM LOGIC — DO NOT CHANGE

The following must remain **functionally identical**:

1. **react-hook-form** setup: `register`, `handleSubmit`, `watch`, `control`, `reset`, `formState`
2. **emailjs.send()** call with the same parameters
3. **Environment variables:** `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
4. **Success callback:** `router.push("/")` + `toast.success(...)`
5. **Error callback:** `console.log(...)` + `toast.error(...)`
6. **Loading state:** `isLoading` → disables inputs, shows "Please wait..." on button
7. **Validation rules:** `fullName` (required), `email` (required), `companyName` (required), `phoneNumber` (required + `isValidPhoneNumber`), `agree` (required)
8. **PhoneInput** with `defaultCountry="IN"`, `autoFormat`
9. **Form submission handler:** `handleSubmit(handleFormSubmit, () => toast.error("Please fill in all required fields."))`

**What CAN change:**
- Visual styling of inputs, labels, buttons, panels
- Layout structure (as long as all fields remain)
- Animations and transitions
- Glass effects on panels
- Spacing and typography
- Icon additions
- Field grouping and visual hierarchy

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

---

## 5. GLASS CARD SYSTEM (already built — MUST use)

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

## 6. PROBLEMS WITH THE CURRENT DESIGN

| # | Problem | Impact |
|---|---|---|
| 1 | **Form panel is solid white** — `bg-white dark:bg-black` | Inconsistent with the glass aesthetic |
| 2 | **Info panel has no card** — just text on the page background | Looks disconnected from the form |
| 3 | **No glass effect anywhere** | Missed opportunity for brand consistency |
| 4 | **Inputs are underline-only** — no borders, no backgrounds | Looks unfinished; hard to see focus state |
| 5 | **No icons on form fields** | Users have to read placeholders to know what to enter |
| 6 | **No floating labels** — just placeholders | Poor UX; users forget what they're typing |
| 7 | **Checkbox is raw browser default** | Clashes with the design system |
| 8 | **No form section header** — just "Send a message" | Could be more descriptive |
| 9 | **No success state on the form** — only a toast | User may not notice the toast |
| 10 | **No loading state on the panel** — only button text change | Could be more obvious |
| 11 | **Info panel is plain text** — no icons, no cards | Looks sparse and unstructured |
| 12 | **No map or visual location indicator** | Locations are just text addresses |
| 13 | **No social links** | Missed connection opportunity |
| 14 | **No "why contact us" section** | Missing context for the user |
| 15 | **No FAQ or quick help** | Users may have simple questions |
| 16 | **No response time expectation** | Users don't know when to expect a reply |
| 17 | **No alternative contact methods** — no chat, no WhatsApp | Limited options for user |
| 18 | **No form progress indicator** | Users don't know how long the form is |
| 19 | **No field grouping** — all fields look the same | Hard to scan |
| 20 | **No glass on the banner** — the hero image has a plain gradient | Inconsistent with the rest of the page |

---

## 7. AVAILABLE ASSETS

### Contact page banner
```
public/images/contact/contact.jpg
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

### Icon options (react-icons)
```
react-icons/fa: FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock, FaPaperPlane, FaUser, FaBuilding, FaMobileAlt, FaComment, FaCheckCircle
react-icons/md: MdOutlineEmail, MdOutlinePhone, MdOutlineLocationOn
react-icons/hi: HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker
```

---

## 8. COMPONENT PATTERNS (must follow)

### GlassCard (already built — use for all panels)
```tsx
<GlassCard index={0} density="read" glow className="p-8 md:p-12">
  {children}
</GlassCard>
```

### Button primitive (already built)
```tsx
<Button type="submit" variant="primary" size="md" icon={<ArrowIcon />} iconPosition="right">
  Send Message
</Button>
```

### SectionHeader (already built)
```tsx
<SectionHeader headerInfo={{ title: "…", subtitle: "…", description: "…" }} />
```

### MobileMenu (reference for glass + animation quality)
`components/Header/MobileMenu.tsx` — the most polished component in the project.

---

## 9. DESIGN DIRECTIONS (for the planning agent to consider)

### Direction A — Split glass panels
- Left: glass form panel with floating labels, icons on inputs, grouped fields
- Right: glass info panel with icon + text rows for locations, email, phone
- Both panels use `GlassCard density="read"` with `tint="from-primaryho/15"`
- Stagger animation: form panel slides in from left, info panel from right

### Direction B — Centered glass card
- Single large glass card centered on the page
- Form on the left half, info on the right half (inside the same card)
- More compact; good for shorter pages

### Direction C — Tabbed interface
- Tabs: "Send Message" | "Find Us" | "FAQ"
- Each tab is a glass panel
- Reduces scrolling; good for mobile

### Direction D — Accordion sections
- Each section (form, locations, FAQ) is a collapsible glass accordion
- Most compact; good for content-heavy pages

### Direction E — Chat-style form
- Form styled like a chat interface
- Fields appear as chat bubbles
- Most modern; good for younger audiences

---

## 10. CONSTRAINTS

1. **Must use `GlassCard`** for all panels — no solid `bg-white dark:bg-black`
2. **Must use `framer-motion`** for all animations
3. **Must use design tokens only** — no raw hex colours
4. **Must have `dark:` variants** on every element
5. **Must have `focus-visible` ring** on all interactive elements
6. **Must use `ease: [0.23, 1, 0.32, 1]`** for animations
7. **Must use `duration-300` or `duration-500`**
8. **Must not add new dependencies** — `framer-motion`, `react-hook-form`, `react-phone-number-input`, `react-hot-toast` are already installed
9. **Must not add new Tailwind tokens**
10. **Must keep all form fields** — fullName, email, companyName, phoneNumber, subject, message, agree
11. **Must keep all validation rules** — required fields, phone validation, agree checkbox
12. **Must keep the emailjs integration** — same env vars, same template ID
13. **Must keep the success/error callbacks** — router.push + toast
14. **Must keep the loading state** — isLoading disables inputs and shows "Please wait..."
15. **Must keep the info panel content** — locations, email, phone numbers
16. **Must keep the banner image** — `/images/contact/contact.jpg`
17. **Must be responsive** — works on 320px, 768px, 1024px, 1280px+
18. **Must not break the form submission** — the form must still send emails via emailjs

---

## 11. OPEN QUESTIONS FOR THE PLANNING AGENT

**Q1 — Layout.** Split panels (A), centered card (B), tabs (C), accordion (D), or chat (E)? Recommend **A (split glass panels)** — it's the most natural evolution of the current design.

**Q2 — Input style.** Underline (current), floating labels, boxed inputs, or glass inputs? Recommend: **floating labels with glass input backgrounds** — `bg-white/50 dark:bg-white/5 rounded-xl border border-stroke p-4` with a label that floats up on focus.

**Q3 — Icons on inputs.** Should each field have an icon? Recommend: yes — `FaUser` (name), `FaEnvelope` (email), `FaBuilding` (company), `FaMobileAlt` (phone), `FaComment` (message). Use `react-icons`.

**Q4 — Field grouping.** Should related fields be grouped visually? Recommend: yes — "Your Information" (name, email, phone) and "Your Message" (subject, message) as two groups with subtle dividers.

**Q5 — Info panel structure.** Should locations be cards with map pins? Recommend: yes — each location is a small glass card with a `FaMapMarkerAlt` icon, the address, and a "Get Directions" link (Google Maps).

**Q6 — Social links.** Should social media links be added? Recommend: yes — LinkedIn, Facebook, Twitter/X as small glass icon buttons in the info panel.

**Q7 — Response time.** Should we add "We typically respond within 24 hours"? Recommend: yes — a small glass badge with `FaClock` icon.

**Q8 — Form success state.** Should the form show a success state after submission (in addition to the toast)? Recommend: yes — replace the form with a success glass card showing `FaCheckCircle` and "Message sent successfully!"

**Q9 — Dark mode.** Does the design need a distinct dark-mode treatment? Recommend: no — the glass system already handles dark mode via `dark:` classes.

**Q10 — Banner.** Should the banner image get a glass overlay? Recommend: yes — a subtle `GlassCard` overlay at the bottom with the "Contact Us" heading.

**Q11 — Map.** Should we embed a Google Map? Recommend: no — it adds weight and may not load in all environments. Use a static map image or just the address cards.

**Q12 — FAQ.** Should we add a small FAQ section below the form? Recommend: optional — only if the design has room. Keep the focus on the form.

---

## 12. DEFINITION OF DONE

- [ ] Contact page redesigned with glass panels and animations
- [ ] Form panel uses `GlassCard density="read"` with `tint="from-primaryho/15"`
- [ ] Info panel uses `GlassCard density="read"`
- [ ] All form fields have icons (react-icons)
- [ ] Inputs have floating labels or glass backgrounds
- [ ] Fields are grouped: "Your Information" + "Your Message"
- [ ] Checkbox is custom-styled (not browser default)
- [ ] Info panel has icon + text rows for locations, email, phone
- [ ] Location cards have "Get Directions" links
- [ ] Social links added to info panel
- [ ] Response time badge added
- [ ] Form success state (glass card with checkmark)
- [ ] Banner has glass overlay
- [ ] Stagger animation: form from left, info from right
- [ ] Full dark-mode parity
- [ ] All colours from design tokens only
- [ ] All animations use `ease: [0.23, 1, 0.32, 1]`
- [ ] All panels use `GlassCard`
- [ ] Form logic unchanged (emailjs, validation, env vars)
- [ ] No new dependencies added
- [ ] No new Tailwind tokens added
- [ ] Responsive: works on 320px, 768px, 1024px, 1280px+
- [ ] `npm run build` passes with no errors
