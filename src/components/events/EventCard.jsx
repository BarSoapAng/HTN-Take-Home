import { useEffect, useState } from 'react';

import Pill from "@ui/Pill.jsx";
import Button from '@ui/Button.jsx';
import { formatTimeRange } from "@utils/time.js";
import { formatName, getEventColor, buildGCalUrl, buildOutlookUrl } from "@utils/eventInfoProcessing.js";

function getURL(event, isPrivate) {
  if(isPrivate) {
    return event.private_url;
  } else {
    return event.public_url ? event.public_url : "/";
  }
}

export default function EventCard({ event, onScrollTo, relatedEvents, forceExpanded }) {
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    if (forceExpanded) {
      setExpanded(true);
    }
  }, [forceExpanded]);

  const perm = event.permission ?? "private";
  const isPrivate = perm === "private";

  const name = event.name;
  const start_time = event.start_time;
  const end_time = event.end_time;

  const type = formatName(event.event_type);
  const type_color = getEventColor(event.event_type);

  const description = event.description;
  const url = getURL(event, isPrivate);

  if (isExpanded === false) {
    return (
      <article
        className="bg-white rounded-xl border border-black px-7 py-5 transition hover:translate-y-[-1px] hover:shadow-md"
      >
        <div className="flex items-start justify-between gap-4">
          <a 
            href={url}
            className="min-w-0 big-text hover:underline"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
          >
            {name}
          </a>

          <div className="normal-text gray-text mt-2 text-nowrap">
            {formatTimeRange(start_time, end_time)}
          </div>
        </div>

      <div className="flex items-start justify-between gap-4">
        <div className="mt-4 mb-5 flex flex-wrap gap-2">
          <Pill label={type} tone={type_color} />
          {isPrivate && <Pill label="hacker only" tone="neutral"/>}
        </div>

        <p className='normal-text blue-text hover:cursor-pointer hover:opacity-60 my-auto' onClick={() => setExpanded(true)}>see more...</p>
      </div>

        <hr className='blue-text mb-4'/>

        {event.description && (
          <p
            className="small-text gray-text hover:light-text"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              overflow: "hidden",
            }}
          >
            {description}
          </p>
        )}
      </article>
    );
  }

  return (
    <article
        className="bg-white rounded-xl border border-black px-7 py-5 transition hover:translate-y-[-1px] hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-20">
          <a 
            href={url}
            className="min-w-0 big-text hover:underline"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
            }}
          >
            {name}
          </a>
        </div>

        <div className="normal-text gray-text mt-2 text-nowrap">
          {formatTimeRange(start_time, end_time)}
        </div>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="mt-4 mb-5 flex flex-wrap gap-2">
          <Pill label={type} tone={type_color} />
          {isPrivate && <Pill label="hacker only" tone="neutral" />}
        </div>

        <p className='normal-text blue-text hover:cursor-pointer hover:opacity-60 my-auto' onClick={() => setExpanded(false)}>see less...</p>
      </div>

      <hr className='blue-text mb-4'/>

      {event.description && (
        <p className="small-text gray-text">{description}</p>
      )}

      <div className="flex gap-20 mb-1">
        {Array.isArray(event.speakers) && event.speakers.length > 0 && (
          <div className="mt-4">
            <div className="small-text underline">Speakers</div>
            <div className="small-text mt-1 gray-text text-nowrap">
              {event.speakers.map((s, idx) => (
                <span key={`${s.name}-${idx}`}>
                  • {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {relatedEvents?.length > 0 && (
          <div className="mt-4">
            <div className="small-text underline">Related events</div>
            <div className="mt-1 flex flex-col justify-start">
              {relatedEvents.map((related) => (
                <button
                  key={related.id}
                  className="small-text blue-text text-left inline-flex items-start w-fit"
                  onClick={() => onScrollTo(related.id, event.id)}
                >
                  <span className="mr-2">•</span>
                  <span className='hover:underline'>{related.name ?? related.id}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className='flex flex-col gap-2 items-start'>
        <p className='small-text underline'>Add to Calendar:</p>
        <div className='flex flex-row gap-3'>
          <Button
            className="small-text gray-text hover:underline"
            href={buildGCalUrl(event)}
            target="_blank"
            rel="noreferrer"
            style={{ backgroundColor: "var(--white)" }}
          >
            Google
          </Button>
          <Button
            className="small-text gray-text hover:underline"
            href={buildOutlookUrl(event)}
            target="_blank"
            rel="noreferrer"
            style={{ backgroundColor: "var(--white)" }}
          >
            Outlook
          </Button>
        </div>
      </div>
    </article>
  );
}
