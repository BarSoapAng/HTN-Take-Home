const ENDPOINT = "https://api.hackthenorth.com/v3/frontend-challenge";

/**
 * Normalizes an event to a predictable shape so UI code stays stable.
 */
export function normalizeEvent(raw) {
  const speakers =
    Array.isArray(raw?.speakers) ? raw.speakers.filter(Boolean) : [];

  return {
    id: Number(raw?.id),
    name: raw?.name ?? "Untitled Event",
    event_type: raw?.event_type ?? "activity",
    permission: raw?.permission ?? "public",
    start_time: Number(raw?.start_time ?? 0),
    end_time: Number(raw?.end_time ?? 0),
    description: raw?.description ?? "",
    speakers: speakers.map((s) => ({ name: s?.name ?? "Unknown Speaker" })),
    public_url: raw?.public_url ?? "",
    private_url: raw?.private_url ?? "",
    related_events: Array.isArray(raw?.related_events)
      ? raw.related_events.map((n) => Number(n)).filter((n) => Number.isFinite(n))
      : [],
  };
}

export async function fetchEvents() {
  const res = await fetch(ENDPOINT);
  if (!res.ok) {
    throw new Error(`Failed to load events: ${res.status}`);
  }
  const data = await res.json();
  const list = Array.isArray(data) ? data : [data];
  return list.map(normalizeEvent);
}

export function sortByStartTime(events) {
  return [...events].sort((a, b) => a.start_time - b.start_time);
}
