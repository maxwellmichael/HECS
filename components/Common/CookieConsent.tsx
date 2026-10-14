"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaCookieBite } from "react-icons/fa";
import Button from "@/components/Common/Button";
import GlassPanel from "@/components/Common/GlassPanel";
import { useToast } from "@/app/context/ToastContext";

const STORAGE_KEY = "heliac-cookie-consent";

type ConsentLevel = "all" | "necessary" | "custom";

interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  disabled?: boolean;
}

const Toggle = ({ checked, onChange, label, disabled }: ToggleProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho ${
      checked ? "bg-primary" : "bg-black/10 dark:bg-white/10"
    } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
  >
    <span
      className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-solid-12 transition-transform duration-300 ${
        checked ? "translate-x-5" : ""
      }`}
    />
  </button>
);

const CookieConsent = () => {
  const toast = useToast();
  const [visible, setVisible] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
    if (!stored) {
      const timer = window.setTimeout(() => setVisible(true), 600);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const save = (level: ConsentLevel) => {
    const payload = {
      level,
      analytics:
        level === "all" ? true : level === "necessary" ? false : analytics,
      marketing:
        level === "all" ? true : level === "necessary" ? false : marketing,
      updatedAt: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* storage unavailable */
    }
    setVisible(false);
    // toast.success(
    //   level === "all"
    //     ? "All cookies accepted."
    //     : level === "necessary"
    //     ? "Only necessary cookies enabled."
    //     : "Cookie preferences saved.",
    //   { title: "Privacy" },
    // );
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[9999] px-4 pb-4 md:px-6 md:pb-6"
        >
          <div className="mx-auto max-w-c-1390">
            <GlassPanel tint="from-primaryho/15 dark:from-primaryLight/15">
              <div className="flex flex-col gap-6 p-6 md:p-7.5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                {/* Message */}
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/60 text-regular text-primary dark:bg-white/10 dark:text-primaryLight">
                    <FaCookieBite aria-hidden />
                  </span>
                  <p className="text-sectiontitle text-blackho dark:text-manatee">
                    We use cookies to enhance site navigation, analyze site
                    usage, and support our marketing efforts. View our{" "}
                    <Link
                      href="/privacy-policy"
                      className="font-medium text-primary underline underline-offset-4 transition-colors duration-300 hover:text-primaryho focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho dark:text-primaryLight dark:hover:text-primaryho"
                    >
                      Privacy Policy
                    </Link>{" "}
                    for more information.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => setPanelOpen(!panelOpen)}
                    ariaLabel="Manage cookie preferences"
                    className="!text-blackho underline underline-offset-4 dark:!text-white"
                  >
                    Preferences
                  </Button>
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => save("necessary")}
                    className="border border-white/60 !bg-white/70 !text-black hover:!bg-white hover:!text-primary dark:border-white/10 dark:!bg-blackho/70 dark:!text-white dark:hover:!bg-hoverdark"
                  >
                    Accept necessary
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => save("all")}
                  >
                    Accept all
                  </Button>
                </div>
              </div>

              {/* Preferences panel */}
              <AnimatePresence initial={false}>
                {panelOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden border-t border-white/50 dark:border-white/10"
                  >
                    <div className="space-y-5 bg-white/40 p-6 dark:bg-white/5 md:p-7.5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-regular font-medium text-black dark:text-white">
                            Necessary
                          </p>
                          <p className="text-sectiontitle text-blackho dark:text-manatee">
                            Required for the site to function. Always enabled.
                          </p>
                        </div>
                        <Toggle
                          checked
                          onChange={() => {}}
                          label="Necessary cookies"
                          disabled
                        />
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-regular font-medium text-black dark:text-white">
                            Analytics
                          </p>
                          <p className="text-sectiontitle text-blackho dark:text-manatee">
                            Help us understand how visitors interact with the
                            site.
                          </p>
                        </div>
                        <Toggle
                          checked={analytics}
                          onChange={setAnalytics}
                          label="Allow analytics cookies"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-regular font-medium text-black dark:text-white">
                            Marketing
                          </p>
                          <p className="text-sectiontitle text-blackho dark:text-manatee">
                            Used to personalise advertising and campaigns.
                          </p>
                        </div>
                        <Toggle
                          checked={marketing}
                          onChange={setMarketing}
                          label="Allow marketing cookies"
                        />
                      </div>

                      <div className="flex justify-end pt-1">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => save("custom")}
                        >
                          Save preferences
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassPanel>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
