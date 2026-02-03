import { useMemo, useRef } from "react";
import EventCard from "./EventCard.jsx";

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

    node.scrollIntoView({ behavior: "smooth", block: "start" });
    // Optional “flash” effect to help the user see where they landed
    node.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.01)" }, { transform: "scale(1)" }],
      { duration: 350 }
    );
  };

  const eventIds = useMemo(() => new Set(events.map((e) => e.id)), [events]);
  const eventById = useMemo(() => {
    const map = new Map();
    events.forEach((event) => map.set(event.id, event));
    return map;
  }, [events]);

  return (
    <div className="mt-6 grid grid-cols-1 gap-6">
      {events.map((event) => (
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
  );
}
