"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  FaBoxes,
  FaGlobeAmericas,
  FaHandshake,
  FaMapMarkerAlt,
} from "react-icons/fa";

/* Deterministic pseudo-random (SSR-safe — identical on server & client) */
const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

type FloaterKind = "clap" | "heart";

const FLOATERS = Array.from({ length: 12 }, (_, i) => {
  const kind: FloaterKind = i % 2 === 0 ? "clap" : "heart";
  return {
    kind,
    size: Math.round(16 + rand(i + 1) * 20),
    left: Math.round(3 + rand(i + 2) * 94),
    rise: Math.round(11 + rand(i + 3) * 13),
    sway: Math.round(4 + rand(i + 4) * 5),
    swayPx: Math.round(10 + rand(i + 5) * 26),
    delay: -Math.round(rand(i + 6) * 24),
    pulse: kind === "clap" ? 1.4 + rand(i + 7) * 0.8 : 2 + rand(i + 7) * 1.2,
    opacity: 0.5 + rand(i + 8) * 0.35,
  };
});

const stats = [
  {
    icon: <FaGlobeAmericas size={32} aria-hidden />,
    target: 100,
    suffix: "+",
    label: "World Wide Clients",
    accent:
      "bg-primaryho/15 text-primaryho dark:bg-primaryho/20 dark:text-primaryLight",
  },
  {
    icon: <FaMapMarkerAlt size={32} aria-hidden />,
    target: 10,
    suffix: "+",
    label: "Locations",
    accent: "bg-meta/15 text-meta dark:bg-meta/20 dark:text-meta",
  },
  {
    icon: <FaBoxes size={32} aria-hidden />,
    target: 100,
    suffix: "+",
    label: "Products",
    accent:
      "bg-primary/10 text-primary dark:bg-primaryLight/20 dark:text-primaryLight",
  },
];

/* Count-up number, triggered once in view */
const CountUp = ({ target, suffix }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
};

const FunFact = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [gasActive, setGasActive] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Panel tilt
  const rotateX = useSpring(useTransform(py, [0, 1], [2.5, -2.5]), {
    stiffness: 120,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-2.5, 2.5]), {
    stiffness: 120,
    damping: 22,
  });

  // Gas (1:1 mouse track)
  const gas1x = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.6 });
  const gas1y = useSpring(my, { stiffness: 90, damping: 18, mass: 0.6 });
  const gas2x = useSpring(mx, { stiffness: 35, damping: 26, mass: 1.6 });
  const gas2y = useSpring(my, { stiffness: 35, damping: 26, mass: 1.6 });

  // Parallax layers
  // Foreground (content) shifts in the direction of the mouse
  const contentX = useSpring(useTransform(px, [0, 1], [-12, 12]), {
    stiffness: 80,
    damping: 20,
  });
  const contentY = useSpring(useTransform(py, [0, 1], [-8, 8]), {
    stiffness: 80,
    damping: 20,
  });

  // Background (dots/floaters) shifts opposite to the mouse
  const bgX = useSpring(useTransform(px, [0, 1], [8, -8]), {
    stiffness: 60,
    damping: 20,
  });
  const bgY = useSpring(useTransform(py, [0, 1], [5, -5]), {
    stiffness: 60,
    damping: 20,
  });

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(r.width / 2);
    my.set(r.height / 2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mx.set(x);
      my.set(y);
      px.set(x / rect.width);
      py.set(y / rect.height);
      if (!gasActive) setGasActive(true);
    },
    [gasActive, mx, my, px, py],
  );

  const handleMouseLeave = useCallback(() => {
    setGasActive(false);
    px.set(0.5);
    py.set(0.5);
  }, [px, py]);

  return (
    <>
      {/* <!-- ===== Funfact Start ===== */}
      <section className="px-4 py-20 md:px-8 lg:py-22.5 2xl:px-0">
        <div style={{ perspective: 1200 }}>
          <motion.div
            ref={panelRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top bg-white/45 relative z-1 mx-auto max-w-c-1390 overflow-hidden rounded-2xl border border-white/60 shadow-solid-l backdrop-blur-2xl backdrop-saturate-200 dark:border-white/10 dark:bg-blacksection/50"
          >
            {/* ---- Background Parallax Layer (Dots & Floaters) ---- */}
            {/* -inset-6 provides a 24px bleed so edges don't show when shifted */}
            <motion.div
              aria-hidden
              style={{ x: bgX, y: bgY }}
              className="pointer-events-none absolute -inset-6"
            >
              <Image
                fill
                sizes="(max-width: 1390px) 100vw, 1390px"
                src="/images/shape/shape-dotted-light-02.svg"
                alt="Dotted"
                className="absolute inset-0 opacity-50 dark:hidden"
              />
              <Image
                fill
                sizes="(max-width: 1390px) 100vw, 1390px"
                src="/images/shape/shape-dotted-dark-02.svg"
                alt="Dotted"
                className="absolute inset-0 hidden opacity-25 dark:block"
              />

              <div className="absolute inset-6 select-none">
                {FLOATERS.map((f, i) => (
                  <span
                    key={i}
                    className="absolute animate-[float-rise_linear_infinite]"
                    style={{
                      left: `${f.left}%`,
                      fontSize: f.size,
                      lineHeight: 1,
                      animationDuration: `${f.rise}s`,
                      animationDelay: `${f.delay}s`,
                    }}
                  >
                    <span
                      className="block animate-[float-sway_ease-in-out_infinite_alternate]"
                      style={
                        {
                          animationDuration: `${f.sway}s`,
                          animationDelay: `${f.delay}s`,
                          "--sway": `${f.swayPx}px`,
                        } as React.CSSProperties
                      }
                    >
                      <span
                        className={`relative block ${
                          f.kind === "clap"
                            ? "animate-[clap-pulse_ease-in-out_infinite]"
                            : "animate-[heart-beat_ease-in-out_infinite]"
                        }`}
                        style={{
                          animationDuration: `${f.pulse}s`,
                          opacity: f.opacity,
                        }}
                      >
                        <span
                          className={`absolute -inset-1.5 rounded-full blur-md ${
                            f.kind === "clap"
                              ? "bg-zumthor/70 dark:bg-primaryho/20"
                              : "bg-primaryho/25 dark:bg-primaryho/30"
                          }`}
                        />
                        <span className="relative drop-shadow-sm">
                          {f.kind === "clap" ? "👏" : "💙"}
                        </span>
                      </span>
                    </span>
                  </span>
                ))}
              </div>
            </motion.div>

            {/* ---- Blue gas following the pointer (1:1 track) ---- */}
            <motion.div
              aria-hidden
              style={{ x: gas1x, y: gas1y }}
              className={`dark:bg-primaryho/35 pointer-events-none absolute -ml-20 -mt-20 h-40 w-40 rounded-full bg-primaryho/25 blur-2xl transition-opacity duration-500 ${
                gasActive ? "opacity-100" : "opacity-0"
              }`}
            />
            <motion.div
              aria-hidden
              style={{ x: gas2x, y: gas2y }}
              className={`pointer-events-none absolute -ml-32 -mt-32 h-64 w-64 rounded-full bg-primary/20 blur-3xl transition-opacity duration-700 dark:bg-primaryLight/20 ${
                gasActive ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* ---- Glass optics (static relative to panel frame) ---- */}
            <div
              aria-hidden
              className="dark:from-primaryho/15 pointer-events-none absolute inset-0 bg-gradient-to-r from-primaryho/10 via-transparent to-transparent"
            />
            <div
              aria-hidden
              className="dark:bg-primaryho/15 pointer-events-none absolute -top-20 right-10 h-56 w-56 rounded-full bg-zumthor/50 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent dark:from-white/5"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/25"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/30 dark:ring-white/5"
            />

            {/* ---- Foreground Parallax Layer (Content) ---- */}
            <motion.div
              style={{ x: contentX, y: contentY }}
              className="relative px-6 py-22.5 md:px-10 xl:py-27.5"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.1 }}
                viewport={{ once: true }}
                className="animate_top mx-auto mb-12.5 text-center md:w-4/5 lg:mb-15 lg:w-2/3 xl:w-1/2"
              >
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-4.5 py-1.5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                  <FaHandshake
                    aria-hidden
                    className="h-6.5 w-6.5 text-primaryho dark:text-primaryLight"
                  />
                  <span className="text-metatitle font-semibold uppercase tracking-widest text-primary dark:text-primaryLight">
                    Trusted Worldwide
                  </span>
                </span>

                <h2 className="mb-4 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
                  Trusted by{" "}
                  <span className="bg-gradient-to-r from-primary to-primaryho bg-clip-text text-transparent dark:from-white dark:to-primaryLight">
                    Global Companies.
                  </span>
                </h2>
                <p className="mx-auto lg:w-11/12">
                  At Heliac Energii Controls Solutions, we pride ourselves on
                  building strong relationships with our partners. Our
                  commitment to excellence and reliability has earned the trust
                  of leading brands and clients in the industrial sector.
                  Discover why our partners choose Heliac Energii Controls
                  Solutions for their critical component needs and exceptional
                  service.
                </p>
              </motion.div>

              <div
                aria-hidden
                className="dark:via-white/15 mx-auto mb-12.5 h-px w-2/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.4,
                      delay: 0.2 + index * 0.12,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="group/stat relative overflow-hidden rounded-2xl border border-stroke bg-white/40 p-6 text-center backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:shadow-solid-5 dark:border-white/10 dark:bg-white/5 dark:hover:border-primaryho/40 md:p-7"
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primaryho/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover/stat:opacity-100 dark:bg-primaryho/20"
                    />

                    <span
                      className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl text-regular ${stat.accent}`}
                    >
                      {stat.icon}
                    </span>

                    <p className="mt-4 bg-gradient-to-b from-primary to-primaryho bg-clip-text text-sectiontitle3 font-bold text-transparent dark:from-white dark:to-primaryLight">
                      <CountUp target={stat.target} suffix={stat.suffix} />
                    </p>
                    <p className="mt-1.5 text-sectiontitle font-medium uppercase tracking-widest text-waterloo dark:text-manatee">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* <!-- ===== Funfact End ===== */}
    </>
  );
};

export default FunFact;
