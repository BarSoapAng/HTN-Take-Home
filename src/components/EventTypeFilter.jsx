import { useMemo, useState } from "react";


import DropdownMultiSelect from "./ui/DropdownMultiSelect.jsx";
import { formatName } from "../utils/eventInfoProcessing.js";

export default function EventTypeFilter({
  events = [],
  selectedTypes = [],
  onSelectedTypesChange,
  isLoggedIn = false,
  privateOnly = false,
  onPrivateOnlyChange,
}) {
  const [filterOpen, setFilterOpen] = useState(false);

  const eventTypes = useMemo(() => {
    const types = new Set();
    events.forEach((event) => {
      if (event.event_type) types.add(event.event_type);
    });
    return Array.from(types)
      .sort((a, b) => a.localeCompare(b))
      .map((type) => ({ value: type, label: formatName(type) }));
  }, [events]);

  const updateSelectedTypes = (updater) => {
    if (typeof onSelectedTypesChange !== "function") return;
    onSelectedTypesChange((prev) =>
      typeof updater === "function" ? updater(prev) : updater
    );
  };

  const toggleType = (value) => {
    updateSelectedTypes((prev) => {
      if (prev.includes(value)) return prev.filter((type) => type !== value);
      return [...prev, value];
    });
  };

  if (eventTypes.length <= 1) return null;

  const extraOptions = isLoggedIn
    ? [
        {
          label: "hacker only",
          checked: privateOnly,
          onChange: () => onPrivateOnlyChange?.(!privateOnly),
        },
      ]
    : [];

  return (
    <div className="flex flex-col gap-2 w-50">
      <div className="small-text">Filter by event</div>
      <DropdownMultiSelect
        placeholder="Select event types"
        options={eventTypes}
        extraOptions={extraOptions}
        selectedValues={selectedTypes}
        isOpen={filterOpen}
        onOpenChange={setFilterOpen}
        onToggleValue={toggleType}
        onClear={() => updateSelectedTypes([])}
      />
    </div>
  );
}
