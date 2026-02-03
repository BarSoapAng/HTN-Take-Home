import React from "react";
import { Link } from "react-router-dom";

export default function RelatedEvents({ related = [], eventsById }) {
  if (!related.length) return null;

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
      <div>
        <div className="normal-text underline underline-offset-4">Related Events</div>
        <ul className="mt-2 space-y-1 small-text text-[var(--gray-1)]">
          {related.map((id) => {
            const e = eventsById?.get?.(id);
            return (
              <li key={id}>
                <Link className="text-[var(--blue)] hover:underline" to={`/events/${id}`}>
                  {e?.name ?? `event ${id}`}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
