import { toISO, toCompactISO } from './time.js';

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

export function buildGCalUrl(event) {
  const start = toCompactISO(event.start_time);
  const end = toCompactISO(event.end_time);
  const text = event.name ?? "Event";
  const details = event.description ?? "";
  const url =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(text)}` +
    `&dates=${encodeURIComponent(`${start}/${end}`)}` +
    `&details=${encodeURIComponent(details)}`;
  return url;
}

export function buildOutlookUrl(event) {
  const start = toISO(event.start_time);
  const end = toISO(event.end_time);
  const subject = event.name ?? "Event";
  const body = event.description ?? "";

  const url = 
    "https://outlook.office.com/calendar/deeplink/compose" +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}` +
    `&startdt=${encodeURIComponent(start)}` +
    `&enddt=${encodeURIComponent(end)}` +
    `&rru=addevent`;
  return url;
}