"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Toaster, toast, type Toast } from "react-hot-toast";
import ToastCard, {
  type ToastAction,
  type ToastType,
} from "@/components/Common/ToastCard";

const DEFAULT_DURATION: Record<ToastType, number> = {
  success: 5000,
  error: 7000,
  info: 5000,
  loading: Infinity,
};

interface NotifyOptions {
  title?: string;
  duration?: number;
  action?: ToastAction;
}

export interface ToastHelpers {
  success: (message: string, options?: NotifyOptions) => string;
  error: (message: string, options?: NotifyOptions) => string;
  info: (message: string, options?: NotifyOptions) => string;
  loading: (message: string, options?: NotifyOptions) => string;
  dismiss: (id?: string) => void;
}

const showCustomToast = (
  type: ToastType,
  message: string,
  options?: NotifyOptions,
) => {
  const duration = options?.duration ?? DEFAULT_DURATION[type];
  return toast.custom(
    (t) => (
      <ToastCard
        toast={t}
        type={type}
        message={message}
        title={options?.title}
        action={options?.action}
        duration={duration}
        onDismiss={() => toast.dismiss(t.id)}
      />
    ),
    { duration },
  );
};

export const useToast = (): ToastHelpers =>
  useMemo(
    () => ({
      success: (message, options) =>
        showCustomToast("success", message, options),
      error: (message, options) => showCustomToast("error", message, options),
      info: (message, options) => showCustomToast("info", message, options),
      loading: (message, options) =>
        showCustomToast("loading", message, { duration: Infinity, ...options }),
      dismiss: (id) => (id ? toast.dismiss(id) : toast.dismiss()),
    }),
    [],
  );

const mapBuiltInType = (type: Toast["type"]): ToastType => {
  switch (type) {
    case "error":
      return "error";
    case "loading":
      return "loading";
    case "blank":
      return "info";
    default:
      return "success";
  }
};

/** top-right from sm up, top-center on mobile — no CSS overrides needed */
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mq.matches);
    update();

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
    // Safari < 14 fallback
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  return isDesktop;
};

const ToasterContext = () => {
  const isDesktop = useIsDesktop();

  return (
    <Toaster
      position={isDesktop ? "top-right" : "top-center"}
      containerClassName="toast-container pointer-events-none"
      containerStyle={{ top: 104, zIndex: 99999 }}
      reverseOrder={false}
      gutter={12}
      toastOptions={{ duration: 5000 }}
    >
      {(t) => {
        // Rich toasts created via useToast() render themselves
        if (t.type === "custom") {
          const content = (t.message as (toast: Toast) => React.ReactNode)(t);
          return <>{content}</>;
        }

        // Legacy toast.success / toast.error / toast.loading call sites
        const type = mapBuiltInType(t.type);
        const message =
          typeof t.message === "function"
            ? (t.message as (toast: Toast) => React.ReactNode)(t)
            : t.message;

        return (
          <ToastCard
            toast={t}
            type={type}
            message={message}
            onDismiss={() => toast.dismiss(t.id)}
          />
        );
      }}
    </Toaster>
  );
};

export default ToasterContext;
