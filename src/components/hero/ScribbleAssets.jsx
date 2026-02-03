import React from "react";

// Placeholder scribbles. Replace with SVG assets later.
export function ScribbleLeft() {
  return (
    <div className="h-24 w-24 rounded-full border-4 border-[var(--green)] opacity-60" />
  );
}

export function ScribbleBirds() {
  return (
    <div className="flex gap-2 opacity-50">
      <div className="h-4 w-6 rounded-full border-2 border-[var(--green)]" />
      <div className="h-4 w-6 rounded-full border-2 border-[var(--green)]" />
      <div className="h-4 w-6 rounded-full border-2 border-[var(--green)]" />
    </div>
  );
}

export function ScribbleArrow() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="small-text text-[var(--red)]">check it out</div>
      <div className="text-4xl text-[var(--blue)]">↓</div>
    </div>
  );
}
