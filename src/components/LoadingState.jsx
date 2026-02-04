export default function LoadingState() {
  return (
    <div
      className="mt-10 rounded-3xl border border-black/10 p-6"
      style={{ backgroundColor: "white" }}
      role="status"
      aria-live="polite"
    >
      <div className="big-text">Loading events...</div>
      <div className="small-text mt-2 text-[color:var(--gray-1)]">
        Fetching from the endpoint. Humans love waiting.
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-32 rounded-3xl border border-black/10"
            style={{ backgroundColor: "var(--white)" }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}

