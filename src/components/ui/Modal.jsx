import React, { useEffect } from "react";
import Button from "./Button.jsx";

export default function Modal({ open, title, children, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md bg-[var(--white)] border-2 border-black p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="title leading-none">{title}</div>
          <Button variant="ghost" onClick={onClose} aria-label="Close">
            ✕
          </Button>
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}
