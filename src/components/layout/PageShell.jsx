import React from "react";
import Footer from "./Footer.jsx";

export default function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-[var(--white)] text-[var(--black)]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {children}
      </div>
      <Footer />
    </div>
  );
}
