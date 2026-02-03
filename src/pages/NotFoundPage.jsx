import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="py-14">
      <div className="title">404</div>
      <div className="normal-text text-[var(--gray-1)] mt-2">
        This page doesn’t exist. Shocking.
      </div>
      <Link className="small-text text-[var(--blue)] hover:underline mt-4 inline-block" to="/">
        Go home
      </Link>
    </div>
  );
}
