// For time formatting
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

// For date formatting
export function formatDateLabel(ms) {
  const date = new Date(ms);
  const dateFmt = new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return dateFmt.format(date);
}

export function toISO(ms) {
  const d = new Date(ms);

  const yyyy = d.getFullYear();
  const MM = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const HH = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");

  const offsetMin = -d.getTimezoneOffset();
  const sign = offsetMin >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMin);
  const offHH = String(Math.floor(abs / 60)).padStart(2, "0");
  const offMM = String(abs % 60).padStart(2, "0");

  return `${yyyy}-${MM}-${dd}T${HH}:${mm}:${ss}${sign}${offHH}:${offMM}`;
}

export function toCompactISO(ms) {
  function pad2(n) {
    return String(n).padStart(2, "0");
  }
  const d = new Date(ms);
  return (
    d.getUTCFullYear() +
    pad2(d.getUTCMonth() + 1) +
    pad2(d.getUTCDate()) +
    "T" +
    pad2(d.getUTCHours()) +
    pad2(d.getUTCMinutes()) +
    pad2(d.getUTCSeconds()) +
    "Z"
  );
}