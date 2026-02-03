import EventList from "./EventList.jsx";

export default function EventsSection({ events, isLoggedIn }) {
  return (
    <section className="mt-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="title leading-none">Schedule</h2>
        <div className="small-text text-[color:var(--gray-1)]">
          Viewing: {isLoggedIn ? "public + private" : "public only"}
        </div>
      </div>

      <EventList events={events} />
    </section>
  );
}
