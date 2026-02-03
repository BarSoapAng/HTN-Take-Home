export function formatTimeRange(startMs, endMs) {
  const start = new Date(startMs);
  const end = new Date(endMs);

  // readable, stable, and timezone-aware without depending on libraries
  const dateFmt = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const timeFmt = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${dateFmt.format(start)} · ${timeFmt.format(start)}–${timeFmt.format(end)}`;
}
