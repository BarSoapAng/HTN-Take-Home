import { useMemo, useRef } from "react";
import EventCard from "./EventCard.jsx";
import { formatDateLabel } from "../utils/time.js";

import './css/eventList.css';

export default function EventList({ events }) {
  const cardRefs = useRef(new Map());

  const setCardRef = (id, node) => {
    if (!id) return;
    if (node) cardRefs.current.set(id, node);
    else cardRefs.current.delete(id);
  };

  const onScrollTo = (id) => {
    const node = cardRefs.current.get(id);
    if (!node) return;

    const runFlash = () => { // Landing animation
      node.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.005)" }, { transform: "scale(1)" }],
        { duration: 400 }
      );
    };

    const rect = node.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const alreadyInView = rect.top >= 0 && rect.bottom <= viewportHeight;

    if (alreadyInView) {
      runFlash();
      return;
    }

    node.scrollIntoView({ behavior: "smooth", block: "start" });

    window.addEventListener("scrollend", runFlash, { once: true });
  };

  const eventIds = useMemo(() => new Set(events.map((e) => e.id)), [events]);
  const eventById = useMemo(() => {
    const map = new Map();
    events.forEach((event) => map.set(event.id, event));
    return map;
  }, [events]);

  const groupedEvents = useMemo(() => {
    const map = new Map();

    events.forEach((event) => {
      const date = new Date(event.start_time ?? 0);
      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(event);
    });

    return Array.from(map.entries()).map(([key, group]) => ({
      key,
      label: formatDateLabel(group[0]?.start_time ?? 0),
      events: group,
    }));
  }, [events]);

  return (
    <div className="mt-6 flex flex-col gap-10">
      {groupedEvents.map((group) => (
        <>
          <div className="title">{group.label}</div>
          <section key={group.key} className="date-block px-3">
            <div className="date-rail">
              <div className="date-dot w-4 h-4" />
              <div className="date-line" />
            </div>

            <div className="grid gap-4">
              {group.events.map((event) => (
                <div key={event.id} ref={(node) => setCardRef(event.id, node)}>
                  <EventCard
                    event={event}
                    onScrollTo={onScrollTo}
                    // only show related ids that exist in the current visible list
                    relatedEvents={(event.related_events || [])
                      .filter((id) => eventIds.has(id))
                      .map((id) => eventById.get(id))
                      .filter(Boolean)}
                  />
                </div>
              ))}
            </div>
          </section>
        </>
      ))}
    </div>
  );
}
