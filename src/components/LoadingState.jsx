export default function LoadingState() {
  return (
    <div
      className="mt-10 rounded-3xl border border-black/10 p-6"
      style={{ backgroundColor: "white" }}
      role="status"
      aria-live="polite"
    >
      <div className="big-text gray-text">Loading events...</div>
    </div>
  );
}

