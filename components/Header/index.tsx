"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaBars, FaPaperPlane, FaTimes } from "react-icons/fa";

import menuData from "./menuData";
import BrochureButton from "./BrochureButton";
import MobileMenu from "./MobileMenu";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const INDICATOR_TRANSITION = {
  duration: 0.3,
  ease: EASE,
};

type IndicatorState = {
  x: number;
  y: number;
  width: number;
  height: number;
  ready: boolean;
  shouldAnimate: boolean;
};

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Soft, frosted blue glass using the Heliac design-system tokens.
 * All reflections stay inside the pill: no external glow or bottom accent line.
 */
const GlassPillLayers = ({
  active,
  emphasized = false,
}: {
  active: boolean;
  emphasized?: boolean;
}) => (
  <>
    {/* Soft blue glass body */}
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br ${
        active
          ? emphasized
            ? "dark:via-blacksection/15 dark:to-primary/15 from-zumthor/70 via-primaryLight/25 to-primary/10 dark:from-primaryLight/20"
            : "from-zumthor/55 via-primaryLight/18 to-primary/8 dark:from-primaryLight/15 dark:via-blacksection/10 dark:to-primary/10"
          : "from-zumthor/35 via-primaryLight/12 dark:to-primary/8 to-primary/5 dark:from-primaryLight/10 dark:via-blacksection/10"
      }`}
    />

    {/* Diffused blue refraction inside the glass */}
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 right-0 w-2/3 rounded-full bg-gradient-to-bl blur-lg ${
        active
          ? "from-zumthor/45 via-primaryLight/15 dark:from-primaryLight/15 to-transparent dark:via-primaryLight/5"
          : "from-zumthor/25 via-primaryLight/10 to-transparent dark:from-primaryLight/10 dark:via-primaryLight/5"
      }`}
    />

    {/* Soft secondary blue reflection */}
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr ${
        active
          ? "from-white/35 dark:to-primaryLight/15 via-transparent to-primaryLight/20 dark:from-white/10 dark:via-transparent"
          : "from-white/25 via-transparent to-primaryLight/10 dark:from-white/5 dark:via-transparent dark:to-primaryLight/10"
      }`}
    />

    {/* Broad glossy highlight */}
    <span
      aria-hidden="true"
      className={`dark:from-white/15 pointer-events-none absolute inset-x-1 top-px h-1/2 rounded-full bg-gradient-to-b from-white/70 via-white/20 to-transparent transition-opacity duration-300 dark:via-white/5 ${
        emphasized ? "opacity-100" : active ? "opacity-75" : "opacity-50"
      }`}
    />

    {/* Soft inner frost */}
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 rounded-full bg-white/5 transition-opacity duration-300 dark:bg-white/5 ${
        emphasized ? "opacity-100" : "opacity-60"
      }`}
    />
  </>
);

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const pathUrl = usePathname();

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const hasMeasured = useRef(false);

  const [indicator, setIndicator] = useState<IndicatorState>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    ready: false,
    shouldAnimate: false,
  });

  const activeIndex = menuData.findIndex((item) => item.path === pathUrl);

  const targetIndex =
    hoveredIndex ?? focusedIndex ?? (activeIndex >= 0 ? activeIndex : null);

  // The moving pill only appears over non-active links.
  const showHoverIndicator =
    targetIndex !== null && targetIndex !== activeIndex;

  // The active pill stays mounted and only becomes brighter on interaction.
  const activePillEmphasized =
    activeIndex >= 0 &&
    (hoveredIndex === activeIndex ||
      (hoveredIndex === null && focusedIndex === activeIndex));

  // Sticky header
  useEffect(() => {
    const handleStickyMenu = () => {
      setStickyMenu(window.scrollY >= 80);
    };

    handleStickyMenu();

    window.addEventListener("scroll", handleStickyMenu, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleStickyMenu);
    };
  }, []);

  // Restore focus to the hamburger when the drawer closes.
  useEffect(() => {
    if (wasOpen.current && !navigationOpen) {
      hamburgerRef.current?.focus();
    }

    wasOpen.current = navigationOpen;
  }, [navigationOpen]);

  // Measure and animate the hover indicator.
  useIsomorphicLayoutEffect(() => {
    const nav = navRef.current;

    if (!nav) return;

    const measureIndicator = () => {
      const target =
        targetIndex === null ? null : itemRefs.current[targetIndex];

      if (!target) {
        hasMeasured.current = false;

        setIndicator((current) =>
          current.ready
            ? {
                ...current,
                ready: false,
                shouldAnimate: false,
              }
            : current,
        );

        return;
      }

      const navRect = nav.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      // The desktop navigation is hidden below the xl breakpoint.
      if (
        navRect.width === 0 ||
        navRect.height === 0 ||
        targetRect.width === 0 ||
        targetRect.height === 0
      ) {
        hasMeasured.current = false;

        setIndicator((current) =>
          current.ready
            ? {
                ...current,
                ready: false,
                shouldAnimate: false,
              }
            : current,
        );

        return;
      }

      const isFirstMeasurement = !hasMeasured.current;
      hasMeasured.current = true;

      setIndicator({
        x: targetRect.left - navRect.left,
        y: targetRect.top - navRect.top,
        width: targetRect.width,
        height: targetRect.height,
        ready: true,
        shouldAnimate: !isFirstMeasurement,
      });
    };

    measureIndicator();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measureIndicator)
        : null;

    resizeObserver?.observe(nav);

    itemRefs.current.forEach((item) => {
      if (item) resizeObserver?.observe(item);
    });

    window.addEventListener("resize", measureIndicator, {
      passive: true,
    });

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measureIndicator);
    };
  }, [targetIndex, pathUrl]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[999] transition-[background-color,border-color,box-shadow] duration-300 ease-in-out ${
        stickyMenu || navigationOpen
          ? "dark:bg-blacksection/85 border-b border-white/60 bg-white/60 shadow-solid-5 backdrop-blur-md backdrop-saturate-150 dark:border-white/10"
          : "bg-white/55 dark:bg-blacksection/55 border-b border-transparent backdrop-blur-xl backdrop-saturate-150"
      }`}
    >
      {/* Header specular rim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/25"
      />

      <div className="relative mx-auto flex h-20 max-w-c-1390 items-center justify-between gap-4 px-4 md:h-24 md:gap-6 md:px-8 2xl:px-0">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Heliac Energii Controls Solutions — home"
          className="shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho"
        >
          <Image
            width={110}
            height={80}
            src="/images/logo/logo.svg"
            alt="Heliac Energii Controls Solutions"
            priority
            sizes="110px"
            className="h-14 w-auto dark:hidden md:h-16"
          />

          <Image
            width={110}
            height={80}
            src="/images/logo/logo-dark.svg"
            alt="Heliac Energii Controls Solutions"
            priority
            sizes="110px"
            className="hidden h-14 w-auto dark:block md:h-16"
          />
        </Link>

        {/* Desktop navigation */}
        <nav
          ref={navRef}
          aria-label="Primary"
          onMouseLeave={() => setHoveredIndex(null)}
          onBlur={(event) => {
            const nextTarget = event.relatedTarget;

            if (
              !(nextTarget instanceof Node) ||
              !event.currentTarget.contains(nextTarget)
            ) {
              setFocusedIndex(null);
            }
          }}
          className="relative isolate hidden flex-1 items-center justify-center gap-1.5 xl:flex xl:gap-2"
        >
          {/* Moving frosted-glass pill for non-active links */}
          <motion.span
            aria-hidden="true"
            initial={false}
            animate={{
              x: indicator.x,
              y: indicator.y,
              width: indicator.width,
              height: indicator.height,
              opacity: indicator.ready && showHoverIndicator ? 1 : 0,
            }}
            transition={
              indicator.shouldAnimate
                ? {
                    x: INDICATOR_TRANSITION,
                    y: INDICATOR_TRANSITION,
                    width: INDICATOR_TRANSITION,
                    height: INDICATOR_TRANSITION,
                    opacity: {
                      duration: showHoverIndicator ? 0.12 : 0,
                      ease: EASE,
                    },
                  }
                : { duration: 0 }
            }
            className="dark:border-white/15 pointer-events-none absolute left-0 top-0 z-0 overflow-hidden rounded-full border border-primaryLight/20 bg-white/25 backdrop-blur-2xl backdrop-saturate-150 dark:bg-white/5"
          >
            <GlassPillLayers active={false} />
          </motion.span>

          {menuData.map((item, index) => {
            const active = index === activeIndex;
            const isTarget = index === targetIndex;

            return (
              <Link
                key={item.id}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                href={item.path!}
                aria-current={active ? "page" : undefined}
                onMouseEnter={() => setHoveredIndex(index)}
                onFocus={() => setFocusedIndex(index)}
                className={`relative z-10 whitespace-nowrap rounded-full px-4.5 py-2 text-metatitle font-semibold uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho ${
                  active || isTarget
                    ? "text-primaryho dark:text-primaryLight"
                    : "text-blackho dark:text-manatee"
                }`}
              >
                {/* Permanent active pill: no external glow or bottom line */}
                {active && (
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full border backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,border-color] duration-300 ${
                      activePillEmphasized
                        ? "border-primaryLight/35 bg-zumthor/45 dark:bg-primaryLight/15 dark:border-primaryLight/25"
                        : "dark:border-white/15 border-primaryLight/25 bg-zumthor/30 dark:bg-primaryLight/10"
                    }`}
                  >
                    <GlassPillLayers active emphasized={activePillEmphasized} />
                  </span>
                )}

                <span className="relative z-10">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Brochure — tablet and desktop */}
          <div className="hidden md:block">
            <BrochureButton />
          </div>

          {/* Enquiry pill — tablet & desktop */}
          <Link
            href="/contact"
            className="group hidden items-center gap-3 rounded-full bg-primary py-1.5 pl-1.5 pr-6 text-metatitle font-semibold uppercase tracking-widest text-white shadow-solid-5 transition-all duration-300 hover:bg-primaryho hover:shadow-solid-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho dark:bg-primaryho dark:hover:bg-primary md:inline-flex"
          >
            <span className="bg-white/15 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 transition-transform duration-300 group-hover:scale-105">
              <FaPaperPlane aria-hidden className="h-3 w-3" />
            </span>
            Enquiry
          </Link>

          {/* Enquiry — mobile */}
          <Link
            href="/contact"
            aria-label="Send an enquiry"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-solid-5 transition-colors duration-300 hover:bg-primaryho focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho dark:bg-primary dark:hover:bg-primaryho md:hidden"
          >
            <FaPaperPlane aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>

          {/* Mobile menu toggle */}
          <button
            ref={hamburgerRef}
            type="button"
            aria-label={navigationOpen ? "Close menu" : "Open menu"}
            aria-expanded={navigationOpen}
            aria-controls="mobile-menu"
            onClick={() => setNavigationOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/60 text-blackho shadow-solid-12 backdrop-blur-xl transition-[background-color,border-color,color] duration-300 hover:border-primaryho hover:bg-primary/5 hover:text-primaryho focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-primaryho/40 dark:hover:bg-hoverdark dark:hover:text-primaryLight xl:hidden"
          >
            {navigationOpen ? (
              <FaTimes aria-hidden="true" className="h-4 w-4" />
            ) : (
              <FaBars aria-hidden="true" className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        open={navigationOpen}
        onClose={() => setNavigationOpen(false)}
      />
    </header>
  );
};

export default Header;
