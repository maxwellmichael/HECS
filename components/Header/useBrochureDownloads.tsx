"use client";

import { useCallback } from "react";
import { useToast } from "@/app/context/ToastContext";
import { brochures, triggerDownload } from "./brochuresData";

export const useBrochureDownloads = () => {
  const toast = useToast();

  const handleDownloadAll = useCallback(() => {
    brochures.forEach((brochure, index) => {
      setTimeout(() => {
        try {
          triggerDownload(brochure.fileUrl, brochure.fileName);
        } catch {
          toast.error("Download failed. Please try again.", {
            title: "Download failed",
            action: { label: "Retry", onClick: handleDownloadAll },
          });
          return;
        }
        if (index === brochures.length - 1) {
          toast.success(
            `${brochures.length} Brochures Downloaded Successfully.`,
          );
        }
      }, index * 500);
    });
  }, [toast]);

  const handleDownloadSingle = useCallback(
    (brochure: (typeof brochures)[number]) => {
      try {
        triggerDownload(brochure.fileUrl, brochure.fileName);
        toast.success(`${brochure.title} Downloaded Successfully.`);
      } catch {
        toast.error("Download failed. Please try again.", {
          title: "Download failed",
          action: {
            label: "Retry",
            onClick: () => handleDownloadSingle(brochure),
          },
        });
      }
    },
    [toast],
  );

  return { brochures, handleDownloadAll, handleDownloadSingle };
};
