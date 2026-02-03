export function formatTimeRange(startMs, endMs) {
  const start = new Date(startMs);
  const end = new Date(endMs);
  
  const timeFmt = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${timeFmt.format(start)} - ${timeFmt.format(end)}`;
}
