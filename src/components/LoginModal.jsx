import { useEffect, useMemo, useRef, useState } from "react";

export default function LoginModal({ open, onClose, onSubmit }) {
  const dialogRef = useRef(null);
  const firstInputRef = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => username.trim() && password.trim(), [username, password]);

  useEffect(() => {
    if (!open) return;
    setError("");
    // focus input when opened
    setTimeout(() => firstInputRef.current?.focus(), 0);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const ok = onSubmit(username.trim(), password);
    if (!ok) {
      setError("Nope. Wrong username/password.");
      return;
    }

    setUsername("");
    setPassword("");
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Login"
    >
      <button
        className="absolute inset-0 cursor-default bg-black/40"
        onClick={onClose}
        aria-label="Close login modal"
        tabIndex={-1}
      />

      <div
        ref={dialogRef}
        className="relative w-full max-w-lg rounded-3xl border border-black/15 p-6 shadow-lg"
        style={{ backgroundColor: "var(--white)" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="title leading-none">Log in</div>
            <p className="small-text mt-2 text-[color:var(--gray-1)]">
              Private events are for hackers. Public events are for everyone else.
            </p>
          </div>

          <button
            className="small-text rounded-xl border border-black/20 px-3 py-2"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <div className="small-text mb-1">Username</div>
            <input
              ref={firstInputRef}
              className="small-text w-full rounded-2xl border border-black/15 px-4 py-3 outline-none focus:border-black/40"
              style={{ backgroundColor: "white" }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </label>

          <label className="block">
            <div className="small-text mb-1">Password</div>
            <input
              className="small-text w-full rounded-2xl border border-black/15 px-4 py-3 outline-none focus:border-black/40"
              style={{ backgroundColor: "white" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
            />
          </label>

          {error && (
            <div
              className="small-text rounded-2xl border border-black/10 px-4 py-3"
              style={{ backgroundColor: "var(--red)" }}
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            className="normal-text w-full rounded-2xl border border-black/20 px-5 py-3 transition disabled:opacity-60"
            style={{ backgroundColor: "var(--green)" }}
            disabled={!canSubmit}
            type="submit"
          >
            Unlock private events
          </button>

          <div className="small-text text-[color:var(--gray-2)]">
            (Credentials are hardcoded: hacker / htn2026)
          </div>
        </form>
      </div>
    </div>
  );
}
