import { useMemo, useRef, useState } from "react";
import EventCard from "./EventCard.jsx";
import { formatDateLabel } from "../utils/time.js";

import './css/eventList.css';

export default function EventList({ events }) {
  const cardRefs = useRef(new Map());
  const [expandedId, setExpandedId] = useState(null);

  const setCardRef = (id, node) => {
    if (!id) return;
    if (node) cardRefs.current.set(id, node);
    else cardRefs.current.delete(id);
  };

  const onScrollTo = (id, fromId) => {
    const node = cardRefs.current.get(id);
    if (!node) return;

    setExpandedId(null);
    
    const runFlash = () => { // Landing animation
      requestAnimationFrame(() => setExpandedId(id));
    };

    const toNum = Number(id);
    const fromNum = Number(fromId); ""
    const shouldSuppress = canCompareNumber
      ? toNum < fromNum
      : String(id).localeCompare(String(fromId)) < 0;

    window.__suppressHeader = shouldSuppress;
    node.scrollIntoView({ behavior: "smooth", block: "start" });

    let lastY = window.scrollY;
    let idleFrames = 0;
    const settle = () => {
      const currentY = window.scrollY;
      if (currentY === lastY) {
        idleFrames += 1;
      } else {
        idleFrames = 0;
        lastY = currentY;
      }

      if (idleFrames >= 3) {
        window.__suppressHeader = false;
        runFlash();
        return;
      }

      requestAnimationFrame(settle);
    };

    requestAnimationFrame(settle);
    setTimeout(() => {
      window.__suppressHeader = false;
    }, 1200);
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
    <div className="list mt-6 flex flex-col">
      {groupedEvents.map((group) => (
        <>
          <div className="title mt-5">{group.label}</div>
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
                    forceExpanded={expandedId === event.id}
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
