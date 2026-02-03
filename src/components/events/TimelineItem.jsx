import React from "react";
import EventCard from "./EventCard.jsx";

export default function TimelineItem({ group, eventsById }) {
  return (
    <div className="relative pl-16">
      <div className="absolute left-2 top-2 h-8 w-8 rounded-full bg-[var(--white)] border-[4px] border-[var(--blue)]" />
      <div className="title">{group.dateLabel}</div>
      <div className="mt-4 space-y-6">
        {group.events.map((evt) => (
          <EventCard key={evt.id} event={evt} eventsById={eventsById} />
        ))}
      </div>
    </div>
  );
}
