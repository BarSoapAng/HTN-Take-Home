import { useEffect, useMemo, useState } from "react";
import { fetchAllEvents } from "./services/eventsApi.js";
import { useAuth } from "./hooks/useAuth.js";

import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import EventList from "./components/EventList";
import LoginModal from "./components/LoginModal.jsx";
import LoadingState from "./components/LoadingState.jsx";
import Footer from "./components/footer.jsx";

export default function App() {
  const auth = useAuth();

  const [loginOpen, setLoginOpen] = useState(false);

  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

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

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--white)", color: "var(--black)" }}
    >
      <Header
        isLoggedIn={auth.isLoggedIn}
        onLoginClick={() => setLoginOpen(true)}
        onLogoutClick={auth.logout}
      />

      <main className="mx-auto w-full max-w-6xl px-10 mb-16">
        <Hero />
        <hr className="mt-15 mb-10 mx-[-15px]" />
        {status === "loading" && <LoadingState />}
        {status === "ready" && (
          <EventList
            events={visibleEvents}
          />
        )}
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
