const EVENT_TYPE_TONES = {
  "workshop": "yellow",
  "activity": "red",
  "tech talk": "green",
};

export function formatName(eventType) {
  if (!eventType) return "event";
  return String(eventType).replace(/_/g, " ").toLowerCase();
}

export function getEventColor(eventType) {
  const key = formatName(eventType);
  return EVENT_TYPE_TONES[key] || "neutral";
}
