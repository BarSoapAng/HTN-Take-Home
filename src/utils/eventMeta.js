export function eventTypeLabel(type) {
  if (type === "tech_talk") return "tech talk";
  if (type === "workshop") return "workshop";
  return "activity";
}

export function eventTypePillClasses(type) {
  // Match your reference colors (roughly)
  if (type === "tech_talk") return "bg-[var(--red)] text-[var(--black)]";
  if (type === "workshop") return "bg-[var(--yellow)] text-[var(--black)]";
  return "bg-[var(--green)] text-[var(--black)]";
}

export function permissionBadge(permission) {
  return permission === "private" ? "Private" : "Public";
}
