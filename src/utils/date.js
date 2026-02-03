export function formatDateHeading(unixMs) {
  if (!unixMs) return "Date TBD";
  const d = new Date(unixMs);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString(undefined, { month: "long" });
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

export function formatTimeRange(startMs, endMs) {
  if (!startMs || !endMs) return "Time TBD";
  const start = new Date(startMs);
  const end = new Date(endMs);

  const fmt = (x) =>
    x.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });

  return `${fmt(start)} - ${fmt(end)}`;
}
