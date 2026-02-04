import { useEffect, useMemo, useState } from "react";
import { fetchAllEvents } from "./services/eventsApi.js";
import { useAuth } from "./hooks/useAuth.js";

import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import EventSection from "./components/EventSection";
import LoginModal from "./components/LoginModal.jsx";
import LoadingState from "./components/LoadingState.jsx";
import Footer from "./components/Footer.jsx";
import EventTypeFilter from "./components/events/EventTypeFilter.jsx";

export default function App() {
  const auth = useAuth();

  const [loginOpen, setLoginOpen] = useState(false);

  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("loading");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [privateOnly, setPrivateOnly] = useState(false);

  useEffect(() => {
    let alive = true;

    async function run() {
      setStatus("loading");

      const result = await fetchAllEvents();
      if (!alive) return;

      setEvents(result.data);
      setStatus("ready");
    }

    run();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!auth.isLoggedIn && privateOnly) {
      setPrivateOnly(false);
    }
  }, [auth.isLoggedIn, privateOnly]);

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => (a.start_time ?? 0) - (b.start_time ?? 0));
  }, [events]);

  const visibleEvents = useMemo(() => {
    if (auth.isLoggedIn) return sortedEvents;

    return sortedEvents.filter((e) => {
      // permission can be undefined, so default to public
      const perm = e.permission ?? "public";
      return perm === "public";
    });
  }, [sortedEvents, auth.isLoggedIn]);

  const filteredEvents = useMemo(() => {
    const allowed = selectedTypes.length > 0 ? new Set(selectedTypes) : null;
    return visibleEvents.filter((event) => {
      return (!privateOnly || (event.permission ?? "private") === "private") && (!allowed || allowed.has(event.event_type));
    });
  }, [visibleEvents, selectedTypes, privateOnly]);

  return (
    <div
      id="top"
      className="min-h-screen"
      style={{ backgroundColor: "var(--white)", color: "var(--black)" }}
    >
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <Header
        isLoggedIn={auth.isLoggedIn}
        onLoginClick={() => setLoginOpen(true)}
        onLogoutClick={auth.logout}
      />

      <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-6xl px-8 mb-16">
        <Hero />
        <hr className="mt-15 mb-10 mx-[-15px]" />
        <EventTypeFilter
          events={visibleEvents}
          selectedTypes={selectedTypes}
          onSelectedTypesChange={setSelectedTypes}
          isLoggedIn={auth.isLoggedIn}
          privateOnly={privateOnly}
          onPrivateOnlyChange={setPrivateOnly}
        />
        {status === "loading" && <LoadingState />}
        {status === "ready" && <EventSection events={filteredEvents} />}
      </main>

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSubmit={(u, p) => auth.login(u, p)}
      />
      <Footer />
    </div>
  );
}
