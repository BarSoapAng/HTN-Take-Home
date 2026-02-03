import { useState } from 'react';

import Pill from "./Pill.jsx";
import { formatTimeRange } from "../utils/time.js";

function prettyType(t) {
  if (t === "tech_talk") return "tech talk";
  return t;
}

const colors = {
  "workshop": "yellow",
  "activity": "red",
  "tech talk": "green",
};

export default function EventCard({ event, onScrollTo, relatedEvents }) {
  const [isExpanded, setExpanded] = useState(false);

  const perm = event.permission ?? "public";
  const isPrivate = perm === "private";

  const name = event.name;
  const start_time = event.start_time;
  const end_time = event.end_time;
  const type = prettyType(event.event_type);
  const description = event.description;

  if (isExpanded === false) {
    return (
      <article
        className="bg-white rounded-md border border-black px-7 py-5 transition hover:translate-y-[-1px] hover:shadow-md"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-20">
            <h3 className="big-text truncate">{name}</h3>

          </div>

          <div className="normal-text gray-text mt-2">
            {formatTimeRange(start_time, end_time)}
          </div>
        </div>

        <div className="mt-4 mb-4 flex flex-wrap gap-2">
          <Pill label={type} tone={colors[type]} />
          {isPrivate && <Pill label="hacker only" tone="netural" />}
        </div>

        {event.description && (
          <p
            className="small-text gray-text hover:light-text"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              overflow: "hidden",
            }}
          >
            {description}
          </p>
        )}
        <p className='normal-text blue-text hover:cursor-pointer hover:opacity-60' onClick={() => setExpanded(true)}>see more...</p>
      </article>
    );
  }

  return (
    <article
        className="bg-white rounded-md border border-black px-7 py-5 transition hover:translate-y-[-1px] hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-20">
          <h3 className="big-text truncate">{name}</h3>

        </div>

        <div className="normal-text gray-text mt-2">
          {formatTimeRange(start_time, end_time)}
        </div>
      </div>

      <div className="mt-4 mb-4 flex flex-wrap gap-2">
        <Pill label={type} tone={colors[type]} />
        {isPrivate && <Pill label="hacker only" tone="netural" />}
      </div>

      {event.description && (
        <p className="small-text gray-text hover:light-text">{description}</p>
      )}

      {Array.isArray(event.speakers) && event.speakers.length > 0 && (
        <div className="mt-4">
          <div className="small-text">Speakers</div>
          <div className="small-text mt-1">
            {event.speakers.map((s, idx) => (
              <span key={`${s.name}-${idx}`}>
                {s.name}
                {idx < event.speakers.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </div>
      )}

      {relatedEvents?.length > 0 && (
        <div className="mt-5">
          <div className="small-text text-[color:var(--gray-2)]">Related events</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {relatedEvents.map((related) => (
              <button
                key={related.id}
                className="small-text rounded-2xl border border-black/15 px-3 py-2 transition hover:translate-y-[-1px] hover:shadow-md"
                style={{ backgroundColor: "var(--white)" }}
                onClick={() => onScrollTo(related.id)}
              >
                {related.name ?? related.id}
              </button>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
