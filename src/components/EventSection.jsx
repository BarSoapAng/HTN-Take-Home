import { useRef, useState } from "react";
import EventList from "./events/EventList";
import EventCalendar from "./events/EventCalendar";

import '@componentcss/eventSection.css';

export default function EventSection({ events }) {

  const cardRefs = useRef(new Map());
  const [expandedId, setExpandedId] = useState(null);

  const setCardRef = (id, node) => {
    if (!id) return;
    if (node) cardRefs.current.set(id, node);
    else cardRefs.current.delete(id);
  };

  const onScrollTo = (id, fromId) => {
    const node = cardRefs.current.get(id);
    if (!node) return;

    setExpandedId(null);
    
    const runFlash = () => { // Landing animation
      requestAnimationFrame(() => setExpandedId(id));
    };

    const toNum = Number(id);
    const fromNum = Number(fromId);
    const canCompareNumber =
      Number.isFinite(toNum) && Number.isFinite(fromNum);
    const shouldSuppress = canCompareNumber
      ? toNum < fromNum
      : String(id).localeCompare(String(fromId)) < 0;

    window.__suppressHeader = shouldSuppress;
    node.scrollIntoView({ behavior: "smooth", block: "start" });

    let lastY = window.scrollY;
    let idleFrames = 0;
    const settle = () => {
      const currentY = window.scrollY;
      if (currentY === lastY) {
        idleFrames += 1;
      } else {
        idleFrames = 0;
        lastY = currentY;
      }

      if (idleFrames >= 3) {
        window.__suppressHeader = false;
        runFlash();
        return;
      }

      requestAnimationFrame(settle);
    };

    requestAnimationFrame(settle);
    setTimeout(() => {
      window.__suppressHeader = false;
    }, 1200);
  };

  return (
    <section className="section mt-8 grid grid-cols-[1fr_0.5fr] items-start gap-10">
      <EventList
        events={events}
        setCardRef={setCardRef}
        expandedId={expandedId}
        onScrollTo={onScrollTo}
      />
      <EventCalendar events={events} onScrollTo={onScrollTo} />
    </section>
  );
}

