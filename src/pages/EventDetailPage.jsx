import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchEvents, sortByStartTime } from "../api/events.js";
import Card from "../components/ui/Card.jsx";
import Divider from "../components/ui/Divider.jsx";
import EventTag from "../components/events/EventTag.jsx";
import RelatedEvents from "../components/events/RelatedEvents.jsx";
import { formatDateHeading, formatTimeRange } from "../utils/date.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function EventDetailPage() {
  const { id } = useParams();
  const eventId = Number(id);

  const { isAuthed } = useAuth();

  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    setStatus("loading");
    fetchEvents()
      .then((list) => {
        if (!alive) return;
        setEvents(sortByStartTime(list));
        setStatus("success");
      })
      .catch((e) => {
        if (!alive) return;
        setError(e?.message ?? "Failed to load");
        setStatus("error");
      });
    return () => {
      alive = false;
    };
  }, []);

  const eventsById = useMemo(() => {
    const m = new Map();
    events.forEach((e) => m.set(e.id, e));
    return m;
  }, [events]);

  const event = eventsById.get(eventId);

  if (status === "loading") {
    return <div className="py-10 normal-text text-[var(--gray-1)]">Loading…</div>;
  }
  if (status === "error") {
    return (
      <div className="py-10 normal-text text-[var(--red)]">
        {error || "Something broke."}
      </div>
    );
  }
  if (!event) {
    return (
      <div className="py-10">
        <div className="title">Event not found</div>
        <Link className="small-text text-[var(--blue)] hover:underline" to="/events">
          Back to events
        </Link>
      </div>
    );
  }

  const isPrivate = event.permission === "private";
  const canView = !isPrivate || isAuthed;

  if (!canView) {
    return (
      <div className="py-10">
        <Card className="p-6">
          <div className="title">Private Event</div>
          <div className="mt-3 normal-text text-[var(--gray-1)]">
            You need to log in to view this event.
          </div>
          <div className="mt-4">
            <Link className="small-text text-[var(--blue)] hover:underline" to="/events">
              Go to login
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="mb-4">
        <Link className="small-text text-[var(--blue)] hover:underline" to="/events">
          ← Back
        </Link>
      </div>

      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="title leading-none">{event.name}</div>
            <div className="mt-3">
              <EventTag type={event.event_type} />
            </div>
          </div>
          <div className="small-text text-[var(--gray-1)] text-right whitespace-nowrap">
            <div>{formatDateHeading(event.start_time)}</div>
            <div>{formatTimeRange(event.start_time, event.end_time)}</div>
          </div>
        </div>

        <Divider className="my-5" />

        <div className="normal-text text-[var(--gray-1)]">
          {event.description || "No description provided."}
        </div>

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
      </Card>
    </div>
  );
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
