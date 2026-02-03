export default function Hero() {
  return (
    <section className="pt-10 sm:pt-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="hero-title leading-[0.9]">Hackathon</h1>
          <div className="title">Global Inc.™</div>
          <p className="normal-text mt-4 max-w-2xl text-[color:var(--gray-1)]">
            A one-page events board for humans who like schedules. Public events are visible to
            everyone. Private events unlock after login.
          </p>
        </div>

        {/* Placeholder "drawn" asset */}
        <div
          className="mt-6 h-28 w-full rounded-3xl border border-black/15 sm:mt-0 sm:h-36 sm:w-72"
          style={{ backgroundColor: "var(--red)" }}
          aria-hidden="true"
        />
      </div>

      <div className="mt-10 border-b border-black/10" />
    </section>
  );
}
