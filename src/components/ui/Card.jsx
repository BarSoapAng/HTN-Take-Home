import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white border-2 border-black rounded-none ${className}`}>
      {children}
    </div>
  );
}
