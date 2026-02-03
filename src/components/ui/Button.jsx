import React from "react";

export default function Button({
  children,
  className = "",
  variant = "solid",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 small-text transition focus:outline-none focus:ring-2 focus:ring-[var(--blue)]";
  const styles =
    variant === "ghost"
      ? "bg-transparent hover:bg-black/5"
      : "bg-[var(--black)] text-[var(--white)] hover:opacity-90";

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
