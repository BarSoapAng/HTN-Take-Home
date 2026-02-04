import { useEffect, useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

import { formatName, getEventColor } from "@utils/eventInfoProcessing.js";

import '@componentcss/eventCalendar.css';

// --- helpers ---
function toneToCssVar(tone) {
  if (tone === "yellow") return "var(--yellow)";
  if (tone === "red") return "var(--red)";
  if (tone === "green") return "var(--green)";
  return "var(--gray-2)";
}

function formatTimeRange(startMs, endMs) {
  const fmt = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${fmt.format(new Date(startMs))} – ${fmt.format(new Date(endMs))}`;
}

export default function EventCalendar({ events, onScrollTo }) {
  const calendarRef = useRef(null);

  const [hoverInfo, setHoverInfo] = useState(null); // { x, y, event }

  const fcEvents = useMemo(() => {
    return (events ?? []).map((e) => {
      const tone = getEventColor(e.event_type); // uses your helper
      return {
        id: String(e.id),
        title: e.name ?? `Event ${e.id}`,
        start: new Date(e.start_time),
        end: new Date(e.end_time),
        extendedProps: {
          raw: e,
          tone,
        },
      };
    });
  }, [events]);

  const firstEventDate = useMemo(() => {
    if (!events?.length) return null;

    // find earliest start_time (ms)
    let min = Infinity;
    for (const e of events) {
      const t = Number(e?.start_time);
      if (Number.isFinite(t) && t < min) min = t;
    }
    if (!Number.isFinite(min)) return null;

    return new Date(min);
  }, [events]);

  useEffect(() => {
    if (!firstEventDate) return;
    const api = calendarRef.current?.getApi();
    if (!api) return;

    api.gotoDate(firstEventDate);
  }, [firstEventDate]);


  return (
    <div className="max-w-xl">
      <div className="rounded-xl border border-black p-10 bg-white">
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin, listPlugin, interactionPlugin]}
          timeZone="local"
          initialView="timeGridTwoDay"
          initialDate={firstEventDate ?? undefined}
          views={{
            timeGridTwoDay: {
              type: "timeGrid",
              duration: { days: 2 },
            },
          }}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "twoDay,timeGridDay,listDay",
          }}
          customButtons={{
            twoDay: {
              text: "2 day",
              click: () => calendarRef.current?.getApi().changeView("timeGridTwoDay"),
            },
          }}
          slotMinTime="01:00:00"
          slotMaxTime="24:00:00"
          nowIndicator={true}
          allDaySlot={false}
          expandRows={false}
          height="auto"
          dayHeaderFormat={{ weekday: "short", day: "numeric" }}
          slotLabelFormat={{
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }}
          eventOverlap={true}
          events={fcEvents}
          eventDisplay="block"
          eventDidMount={(info) => {
            // Solid pill styling per event
            const tone = info.event.extendedProps?.tone;
            const bg = toneToCssVar(tone);

            info.el.style.background = bg;
            info.el.style.border = "1px solid var(--gray-2)";
            info.el.style.borderRadius = "0.25rem";
            info.el.style.padding = "2px 8px";
            info.el.style.boxShadow = "none";
            info.el.style.color = "var(--black)";
            info.el.style.fontFamily = '"Patrick Hand", cursive';
            info.el.style.fontSize = "0.9rem";
            info.el.style.cursor = "pointer";

            // make the inner title not wrap into chaos too quickly
            const titleEl = info.el.querySelector(".fc-event-title");
            if (titleEl) {
              titleEl.style.whiteSpace = "nowrap";
              titleEl.style.overflow = "hidden";
              titleEl.style.textOverflow = "ellipsis";
            }
          }}
          eventMouseEnter={(mouseEnterInfo) => {
            const raw = mouseEnterInfo.event.extendedProps?.raw;
            if (!raw) return;

            setHoverInfo({
              x: mouseEnterInfo.jsEvent.clientX,
              y: mouseEnterInfo.jsEvent.clientY,
              event: raw,
            });
          }}
          eventMouseLeave={() => {
            setHoverInfo(null);
          }}
          eventClick={(clickInfo) => {
            const raw = clickInfo.event.extendedProps?.raw;
            if (!raw) return;
            onScrollTo?.(raw.id, raw.id);
          }}
        />
      </div>

      {/* Hover preview popover */}
      {hoverInfo?.event && (
        <div
          className="fixed z-50 max-w-xs rounded-xl border border-black/10 bg-white shadow-lg p-3"
          style={{
            left: Math.min(hoverInfo.x + 12, window.innerWidth - 340),
            top: Math.min(hoverInfo.y + 12, window.innerHeight - 180),
          }}
        >
          <div className="big-text leading-tight">{hoverInfo.event.name}</div>
          <div className="small-text gray-text mt-1">
            {formatTimeRange(hoverInfo.event.start_time, hoverInfo.event.end_time)}
          </div>
          <div className="small-text light-text mt-1">
            {formatName(hoverInfo.event.event_type)}
          </div>
        </div>
      )}

    </div>
  );
}
