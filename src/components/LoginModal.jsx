import { useEffect, useMemo, useRef, useState } from "react";
import Input from "./ui/Input.jsx";
import Button from "./ui/Button.jsx";

export default function LoginModal({ open, onClose, onSubmit }) {
  const dialogRef = useRef(null);
  const firstInputRef = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => username.trim() && password.trim(), [username, password]);

  function closeModal() {
    setError("");
    setUsername("");
    setPassword("");
    onClose();
  }

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const ok = onSubmit(username.trim(), password);
    if (!ok) {
      setError("Wrong username/password");
      return;
    }

    closeModal();
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
        onClick={closeModal}
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
            <p className="small-text light-text mt-2 text-[color:var(--gray-1)]">
              Sign in to view private events for hackers :)
            </p>
          </div>

          <button
            className="small-text light-text mx-1 hover:cursor-pointer"
            onClick={closeModal}
          >
            ✕
          </button>
        </div>

        {error && (
          <p
            className="mt-2 small-text text-[#E24D4D]"
            role="alert"
          >
            {error}
          </p>
        )}

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <div className="small-text mb-1">Username</div>
            <Input
              ref={firstInputRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </label>

          <label className="block">
            <div className="small-text mb-1">Password</div>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
            />
          </label>



          <Button
            className="mt-3"
            style={{ backgroundColor: "var(--red)" }}
            disabled={!canSubmit}
            type="submit"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
