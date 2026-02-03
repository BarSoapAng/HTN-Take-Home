const tones = {
  neutral: { bg: "var(--gray-2)" },
  yellow: { bg: "var(--yellow)" },
  green: { bg: "var(--green)"},
  red: { bg: "var(--red)"},
};

export default function Pill({ label, tone }) {
  const t = tones[tone] || tones.neutral;

  return (
    <span
      className="small-text inline-flex items-center rounded-xl px-3 py-1"
      style={{ backgroundColor: t.bg, color: "var(--black)" }}
    >
      {label}
    </span>
  );
}
