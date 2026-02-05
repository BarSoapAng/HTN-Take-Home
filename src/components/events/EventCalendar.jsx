import { useEffect, useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

import { formatName, getEventColor } from "@utils/eventInfoProcessing.js";

import '@componentcss/eventCalendar.css';

// --- helpers ---
function toneToCssVar(tone) {
  if (tone === "yellow") return "#FFF0BA";
  if (tone === "red") return "#FFDDDD";
  if (tone === "green") return "#BCF6D2";
  return "#E0E0DE";
}

function formatTimeRange(startMs, endMs) {
  const fmt = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${fmt.format(new Date(startMs))} - ${fmt.format(new Date(endMs))}`;
}

export default function EventCalendar({ events, onScrollTo }) {
  const calendarRef = useRef(null);
  const previewRef = useRef(null);

  const [hoverInfo, setHoverInfo] = useState(null); // { x, y, event }
  const [isPreviewHover, setIsPreviewHover] = useState(false);
  const [canHover, setCanHover] = useState(true);

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
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!firstEventDate) return;
    const api = calendarRef.current?.getApi();
    if (!api) return;

    api.gotoDate(firstEventDate);
  }, [firstEventDate]);


  return (
    <div className="max-w-xl mt-4">
      <div className="calendar rounded-xl border border-black p-6 bg-white">
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
          headerToolbar={false}
          slotMinTime="01:00:00"
          slotMaxTime="16:00:00"
          nowIndicator={true}
          allDaySlot={false}
          height="auto"
          dayHeaderFormat={{ day: "numeric", weekday: "short"  }}
          slotLabelFormat={{
            hour: "numeric",
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
          eventContent={(arg) => {
            return (
              <div className="fc-event-content-inner">
                <div className="fc-event-title">{arg.event.title}</div>
                {arg.timeText && (
                  <div className="fc-event-time">{arg.timeText}</div>
                )}
              </div>
            );
          }}
          eventDidMount={(info) => {
            const tone = info.event.extendedProps?.tone;
            const bg = toneToCssVar(tone);
            const raw = info.event.extendedProps?.raw;

            info.el.style.background = bg;
            info.el.setAttribute("tabindex", "0");
            info.el.setAttribute("role", "button");

            if (raw) {
              const ariaLabel = `${raw.name ?? "Event"}. ${formatTimeRange(raw.start_time, raw.end_time)}. ${formatName(raw.event_type)}.`;
              info.el.setAttribute("aria-label", ariaLabel);
            }

            const handleKeyDown = (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                if (!raw) return;
                onScrollTo?.(raw.id, raw.id);
              }
            };

            const handleFocus = () => {
              if (!raw) return;
              const rect = info.el.getBoundingClientRect();
              setHoverInfo({
                x: rect.right,
                y: rect.top,
                event: raw,
              });
            };

            const handleBlur = () => {
              if (!isPreviewHover) setHoverInfo(null);
            };

            info.el.addEventListener("keydown", handleKeyDown);
            info.el.addEventListener("focus", handleFocus);
            info.el.addEventListener("blur", handleBlur);

            info.el.__keyDown = handleKeyDown;
            info.el.__focus = handleFocus;
            info.el.__blur = handleBlur;
          }}
          eventWillUnmount={(info) => {
            const el = info.el;
            if (el?.__keyDown) el.removeEventListener("keydown", el.__keyDown);
            if (el?.__focus) el.removeEventListener("focus", el.__focus);
            if (el?.__blur) el.removeEventListener("blur", el.__blur);
          }}
          eventMouseEnter={(mouseEnterInfo) => {
            if (!canHover) return;
            const raw = mouseEnterInfo.event.extendedProps?.raw;
            if (!raw) return;

            setHoverInfo((prev) => {
              if (prev?.event?.id === raw.id) return prev;
              return {
                x: mouseEnterInfo.jsEvent.clientX,
                y: mouseEnterInfo.jsEvent.clientY,
                event: raw,
              };
            });
          }}
          eventMouseLeave={(mouseLeaveInfo) => {
            if (!canHover) return;
            const nextTarget = mouseLeaveInfo.jsEvent?.relatedTarget;
            if (previewRef.current?.contains(nextTarget)) return;
            if (!isPreviewHover) setHoverInfo(null);
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
          ref={previewRef}
          className="fixed z-50 max-w-xs rounded-lg border border-[var(--gray-2)] bg-white shadow-md px-3 py-2"
          style={{
            left: Math.min(hoverInfo.x + 12, window.innerWidth - 340), // To make sure card hover doesn't go off screen
            top: Math.min(hoverInfo.y + 5, window.innerHeight - 130),
          }}
          onMouseEnter={() => {
            setIsPreviewHover(true);
          }}
          onMouseLeave={() => {
            setIsPreviewHover(false);
            setHoverInfo(null);
          }}
        >
          <div className="normal-text">{hoverInfo.event.name}</div>
          <div className="small-text gray-text">
            {formatTimeRange(hoverInfo.event.start_time, hoverInfo.event.end_time)}
          </div>
          <div className="small-text light-text">
            {formatName(hoverInfo.event.event_type)}
          </div>
        </div>
      )}

    </div>
  );
}

