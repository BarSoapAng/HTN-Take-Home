import React, { useEffect, useMemo, useState } from "react";
import { fetchEvents, sortByStartTime } from "../api/events.js";
import Timeline from "../components/events/Timeline.jsx";
import Modal from "../components/ui/Modal.jsx";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import SearchFilterBar from "../components/events/SearchFilterBar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { formatDateHeading } from "../utils/date.js";

export default function EventsPage() {
  const { isAuthed, login, logout } = useAuth();

  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | error | success
  const [error, setError] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);

  // search/filter (optional extra functionality)
  const [query, setQuery] = useState("");
  const [eventType, setEventType] = useState("all");

  // login form
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [loginErr, setLoginErr] = useState("");

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
        setError(e?.message ?? "Failed to load events");
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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((e) => {
      const typeOk = eventType === "all" ? true : e.event_type === eventType;
      if (!typeOk) return false;

      if (!q) return true;
      const hay = `${e.name} ${e.description || ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [events, query, eventType]);

  const grouped = useMemo(() => groupByDate(filtered), [filtered]);

  const onSubmitLogin = (e) => {
    e.preventDefault();
    setLoginErr("");
    const ok = login(u.trim(), p);
    if (!ok) {
      setLoginErr("Wrong credentials. Try again.");
      return;
    }
    setLoginOpen(false);
    setU("");
    setP("");
  };

  return (
    <div className="py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="title">Events</h2>

        <div className="flex items-center gap-2">
          {isAuthed ? (
            <>
              <span className="small-text text-[var(--gray-1)]">Logged in</span>
              <Button onClick={logout} className="border-2 border-black bg-[var(--black)]">
                Log out
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setLoginOpen(true)}
              className="bg-[var(--black)] text-[var(--white)] border-2 border-black"
            >
              Log in
            </Button>
          )}
        </div>
      </div>

      <div className="mt-6">
        <SearchFilterBar
          query={query}
          onQueryChange={setQuery}
          eventType={eventType}
          onEventTypeChange={setEventType}
          onReset={() => {
            setQuery("");
            setEventType("all");
          }}
        />
      </div>

      <div className="mt-8">
        {status === "loading" && (
          <div className="normal-text text-[var(--gray-1)]">Loading events…</div>
        )}
        {status === "error" && (
          <div className="normal-text text-[var(--red)]">
            {error || "Something broke."}
          </div>
        )}
        {status === "success" && grouped.length === 0 && (
          <div className="normal-text text-[var(--gray-1)]">No events match.</div>
        )}
        {status === "success" && grouped.length > 0 && (
          <Timeline grouped={grouped} eventsById={eventsById} />
        )}
      </div>

      {/* Login modal */}
      <Modal open={loginOpen} title="Login" onClose={() => setLoginOpen(false)}>
        <form onSubmit={onSubmitLogin} className="space-y-3">
          <div>
            <div className="small-text text-[var(--gray-1)] mb-1">Username</div>
            <Input value={u} onChange={(e) => setU(e.target.value)} placeholder="hacker" />
          </div>
          <div>
            <div className="small-text text-[var(--gray-1)] mb-1">Password</div>
            <Input
              type="password"
              value={p}
              onChange={(e) => setP(e.target.value)}
              placeholder="htn2026"
            />
          </div>

          {loginErr && <div className="small-text text-[var(--red)]">{loginErr}</div>}

          <div className="flex gap-2 justify-end pt-2">
            <Button type="button" variant="ghost" onClick={() => setLoginOpen(false)} className="border-2 border-black">
              Cancel
            </Button>
            <Button type="submit" className="border-2 border-black">
              Log in
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function groupByDate(events) {
  const groups = new Map();
  for (const e of events) {
    const label = formatDateHeading(e.start_time);
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push(e);
  }

  // preserve chronological order (events already sorted)
  return Array.from(groups.entries()).map(([dateLabel, list]) => ({
    dateLabel,
    events: list,
  }));
}
