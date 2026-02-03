import React from "react";
import { eventTypeLabel, eventTypePillClasses } from "../../utils/eventMeta.js";

export default function EventTag({ type }) {
  return (
    <span
      className={`inline-flex items-center rounded-xl px-4 py-2 small-text ${eventTypePillClasses(
        type
      )}`}
    >
      {eventTypeLabel(type)}
    </span>
  );
}
