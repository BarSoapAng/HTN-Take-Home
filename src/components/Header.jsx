export default function Header({ isLoggedIn, onLoginClick, onLogoutClick }) {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[color:var(--white)]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          {/* Placeholder "drawn" asset */}
          <div
            className="h-10 w-10 rounded-xl border border-black/15"
            style={{ backgroundColor: "var(--yellow)" }}
            aria-hidden="true"
          />
          <div className="title leading-none">Events</div>
        </div>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <button
              className="small-text rounded-xl border border-black/20 px-4 py-2 transition hover:translate-y-[-1px] hover:shadow-sm"
              style={{ backgroundColor: "var(--green)" }}
              onClick={onLogoutClick}
            >
              Log out
            </button>
          ) : (
            <button
              className="small-text rounded-xl border border-black/20 px-4 py-2 transition hover:translate-y-[-1px] hover:shadow-sm"
              style={{ backgroundColor: "var(--blue)" }}
              onClick={onLoginClick}
            >
              Log in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
