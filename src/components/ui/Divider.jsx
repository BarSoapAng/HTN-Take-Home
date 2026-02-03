import React from "react";

export default function Divider({ className = "" }) {
  return (
    <div className={`border-t-2 border-dashed border-[var(--blue)] ${className}`} />
  );
}
