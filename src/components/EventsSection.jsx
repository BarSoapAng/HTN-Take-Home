import EventList from "./EventList.jsx";

export default function EventsSection({ events }) {
  return (
    <section className="mt-10">
      <EventList events={events} />
    </section>
  );
}
