const tones = {
  neutral: { bg: "var(--white)", fg: "var(--black)" },
  blue: { bg: "var(--blue)", fg: "var(--black)" },
  green: { bg: "var(--green)", fg: "var(--black)" },
};

export default function Pill({ label, tone = "neutral" }) {
  const t = tones[tone] || tones.neutral;

  return (
    <span
      className="small-text inline-flex items-center rounded-full border border-black/15 px-3 py-1"
      style={{ backgroundColor: t.bg, color: t.fg }}
    >
      {label}
    </span>
  );
}
