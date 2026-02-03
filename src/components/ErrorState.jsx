export default function ErrorState({ message }) {
  return (
    <div
      className="mt-10 rounded-3xl border border-black/10 p-6"
      style={{ backgroundColor: "var(--red)" }}
      role="alert"
    >
      <div className="big-text">Couldn’t load events</div>
      <div className="small-text mt-2">{message}</div>
      <div className="small-text mt-2 text-black/70">
        If this keeps happening, the endpoint is having a moment.
      </div>
    </div>
  );
}
