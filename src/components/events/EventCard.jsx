import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../ui/Card.jsx";
import Divider from "../ui/Divider.jsx";
import EventTag from "./EventTag.jsx";
import { formatTimeRange } from "../../utils/date.js";
import { useAuth } from "../../context/AuthContext.jsx";
import RelatedEvents from "./RelatedEvents.jsx";

export default function EventCard({ event, eventsById }) {
  const { isAuthed } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const isPrivate = event.permission === "private";
  const canView = !isPrivate || isAuthed;

  const timeLabel = useMemo(
    () => formatTimeRange(event.start_time, event.end_time),
    [event.start_time, event.end_time]
  );

  if (!canView) {
    // Still render a "locked" placeholder so the list doesn't jump
    return (
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="title">Private Event</div>
            <div className="mt-2">
              <span className="inline-flex items-center rounded-xl px-4 py-2 small-text bg-black text-white">
                login required
              </span>
            </div>
          </div>
          <div className="small-text text-[var(--gray-1)]">{timeLabel}</div>
        </div>
        <Divider className="my-5" />
        <div className="normal-text text-[var(--gray-2)]">
          Log in to view details.
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="title leading-none">{event.name}</div>
          <div className="mt-3">
            <EventTag type={event.event_type} />
          </div>
        </div>
        <div className="small-text text-[var(--gray-1)] whitespace-nowrap">
          {timeLabel}
        </div>
      </div>

      <Divider className="my-5" />

      <div className="normal-text text-[var(--gray-1)]">
        {expanded ? event.description || "No description provided." : truncate(event.description, 140)}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <button
          className="small-text text-[var(--blue)] hover:underline"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "see less..." : "see more..."}
        </button>

        <Link
          className="small-text text-[var(--blue)] hover:underline"
          to={`/events/${event.id}`}
        >
          open
        </Link>
      </div>

      {expanded && (
        <>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <div className="normal-text underline underline-offset-4">Speakers</div>
              <ul className="mt-2 space-y-1 small-text text-[var(--gray-1)]">
                {event.speakers?.length ? (
                  event.speakers.map((s, idx) => <li key={`${s.name}-${idx}`}>• {s.name}</li>)
                ) : (
                  <li>• None</li>
                )}
              </ul>
            </div>
          </div>

          <RelatedEvents related={event.related_events} eventsById={eventsById} />

          <div className="mt-6">
            <SmartEventLink event={event} />
          </div>
        </>
      )}
    </Card>
  );
}

function truncate(str = "", n = 140) {
  const s = String(str || "");
  if (s.length <= n) return s;
  return s.slice(0, n).trimEnd() + "...";
}

function SmartEventLink({ event }) {
  const { isAuthed } = useAuth();
  const isPrivate = event.permission === "private";
  const url = !isPrivate ? event.public_url : (isAuthed ? event.private_url : "");

  if (!url) return null;

  return (
    <a
      className="small-text text-[var(--blue)] hover:underline"
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      {isPrivate ? "Open private link" : "Open public link"}
    </a>
  );
}
