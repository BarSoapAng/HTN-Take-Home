import React from "react";

export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-xl border-2 border-black bg-white px-3 py-2 small-text focus:outline-none focus:ring-2 focus:ring-[var(--blue)] ${className}`}
      {...props}
    />
  );
}
