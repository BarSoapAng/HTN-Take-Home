import Pill from "./Pill.jsx";
import { formatTimeRange } from "../utils/time.js";

function prettyType(t) {
  if (t === "tech_talk") return "tech talk";
  return t || "event";
}

export default function EventCard({ event, onScrollTo, relatedIds }) {
  const perm = event.permission ?? "public";
  const isPrivate = perm === "private";

  return (
    <article
      className="rounded-3xl border border-black/15 p-5 shadow-sm transition hover:translate-y-[-1px]"
      style={{ backgroundColor: "white" }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="big-text truncate">{event.name || "Untitled event"}</h3>
          <div className="small-text mt-1 text-[color:var(--gray-1)]">
            {formatTimeRange(event.start_time, event.end_time)}
          </div>
        </div>

        {/* Placeholder "drawn icon" per event */}
        <div
          className="h-12 w-12 flex-none rounded-2xl border border-black/10"
          style={{ backgroundColor: isPrivate ? "var(--blue)" : "var(--yellow)" }}
          aria-hidden="true"
          title={isPrivate ? "Private" : "Public"}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Pill label={prettyType(event.event_type)} tone="neutral" />
        <Pill label={perm} tone={isPrivate ? "blue" : "green"} />
      </div>

      {event.description && (
        <p className="small-text mt-4 text-[color:var(--gray-1)]">
          {event.description}
        </p>
      )}

      {Array.isArray(event.speakers) && event.speakers.length > 0 && (
        <div className="mt-4">
          <div className="small-text text-[color:var(--gray-2)]">Speakers</div>
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

      {relatedIds?.length > 0 && (
        <div className="mt-5">
          <div className="small-text text-[color:var(--gray-2)]">Related events</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {relatedIds.map((id) => (
              <button
                key={id}
                className="small-text rounded-2xl border border-black/15 px-3 py-2 transition hover:translate-y-[-1px]"
                style={{ backgroundColor: "var(--white)" }}
                onClick={() => onScrollTo(id)}
              >
                #{id}
              </button>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
