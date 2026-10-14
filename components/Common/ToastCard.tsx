"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Toast } from "react-hot-toast";
import {
  FaCheck,
  FaExclamation,
  FaInfo,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";
import GlassPanel from "@/components/Common/GlassPanel";

export type ToastType = "success" | "error" | "info" | "loading";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastCardProps {
  toast: Toast;
  type: ToastType;
  message: React.ReactNode;
  title?: string;
  action?: ToastAction;
  duration?: number;
  onDismiss: () => void;
}

const typeConfig: Record<
  ToastType,
  {
    icon: React.ReactNode;
    badge: string;
    tint: string;
    bar: string;
    role: "status" | "alert";
  }
> = {
  success: {
    icon: <FaCheck aria-hidden />,
    badge: "bg-meta",
    tint: "from-meta/20",
    bar: "bg-meta",
    role: "status",
  },
  error: {
    icon: <FaExclamation aria-hidden />,
    badge: "bg-red-600 dark:bg-red-500",
    tint: "from-red-600/20 dark:from-red-500/20",
    bar: "bg-red-600 dark:bg-red-500",
    role: "alert",
  },
  info: {
    icon: <FaInfo aria-hidden />,
    badge: "bg-primaryho",
    tint: "from-primaryho/20 dark:from-primaryLight/20",
    bar: "bg-primaryho dark:bg-primaryLight",
    role: "status",
  },
  loading: {
    icon: <FaSpinner aria-hidden className="animate-spin" />,
    badge: "bg-primaryho",
    tint: "from-primaryho/20 dark:from-primaryLight/20",
    bar: "bg-primaryho",
    role: "status",
  },
};

const ToastCard = ({
  toast,
  type,
  message,
  title,
  action,
  duration,
  onDismiss,
}: ToastCardProps) => {
  const config = typeConfig[type];
  const progress = duration ?? toast.duration;
  const showProgress =
    type !== "loading" && typeof progress === "number" && progress !== Infinity;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.97 }}
      animate={{
        opacity: toast.visible ? 1 : 0,
        y: toast.visible ? 0 : -8,
        scale: toast.visible ? 1 : 0.97,
      }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="pointer-events-auto w-[calc(100vw-2rem)] max-w-full sm:w-[360px]"
    >
      <GlassPanel tint={config.tint} density="read" className="rounded-xl">
        <div
          role={config.role}
          aria-live={config.role === "alert" ? "assertive" : "polite"}
          className="flex items-center gap-3 p-3 sm:p-3.5"
        >
          {/* Solid icon badge — maximum visibility on glass */}
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sectiontitle text-white shadow-solid-12 ${config.badge}`}
          >
            {config.icon}
          </span>

          {/* Message — clamped so height never runs away */}
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-sectiontitle font-medium leading-snug text-black dark:text-white">
              {title ?? message}
            </p>
            {title && (
              <p className="mt-0.5 truncate text-metatitle text-waterloo dark:text-manatee">
                {message}
              </p>
            )}
          </div>

          {/* Optional action chip */}
          {action && (
            <button
              type="button"
              onClick={() => {
                action.onClick();
                onDismiss();
              }}
              className="dark:bg-primaryho/15 shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-metatitle font-semibold text-primary transition-colors duration-300 hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho dark:text-primaryLight dark:hover:bg-primaryho dark:hover:text-white"
            >
              {action.label}
            </button>
          )}

          {/* Dismiss */}
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss notification"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-waterloo transition-colors duration-300 hover:bg-black/5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho dark:text-manatee dark:hover:bg-white/10 dark:hover:text-white"
          >
            <FaTimes aria-hidden className="h-3 w-3" />
          </button>
        </div>

        {/* Countdown bar */}
        {showProgress && (
          <motion.span
            aria-hidden
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{
              duration: (progress as number) / 1000,
              ease: "linear",
            }}
            className={`absolute bottom-0 left-0 h-0.5 w-full origin-left ${config.bar}`}
          />
        )}
      </GlassPanel>
    </motion.div>
  );
};

export default ToastCard;
