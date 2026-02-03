import React from "react";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";

export default function SearchFilterBar({
  query,
  onQueryChange,
  eventType,
  onEventTypeChange,
  onReset,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="w-full sm:max-w-md">
        <div className="small-text text-[var(--gray-1)] mb-1">Search</div>
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search events by name/description..."
        />
      </div>

      <div className="w-full sm:w-60">
        <div className="small-text text-[var(--gray-1)] mb-1">Filter type</div>
        <select
          className="w-full rounded-xl border-2 border-black bg-white px-3 py-2 small-text focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
          value={eventType}
          onChange={(e) => onEventTypeChange(e.target.value)}
        >
          <option value="all">all</option>
          <option value="workshop">workshop</option>
          <option value="activity">activity</option>
          <option value="tech_talk">tech talk</option>
        </select>
      </div>

      <div className="sm:pl-2">
        <Button variant="ghost" onClick={onReset} className="border-2 border-black">
          Reset
        </Button>
      </div>
    </div>
  );
}
