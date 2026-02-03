import React from "react";
import TimelineItem from "./TimelineItem.jsx";

export default function Timeline({ grouped, eventsById }) {
  return (
    <div className="relative">
      <div className="absolute left-5 top-0 bottom-0 w-[4px] bg-[var(--blue)] opacity-70" />
      <div className="space-y-10">
        {grouped.map((group) => (
          <TimelineItem key={group.dateLabel} group={group} eventsById={eventsById} />
        ))}
      </div>
    </div>
  );
}
