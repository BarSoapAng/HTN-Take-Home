import { useEffect, useMemo, useRef } from "react";

import Button from "./Button.jsx";
import { RiArrowDropDownLine  } from "react-icons/ri";

export default function DropdownMultiSelect({
  className = "",
  style = {},
  placeholder = "Select options",
  options = [],
  extraOptions = [],
  selectedValues = [],
  isOpen = false,
  onOpenChange,
  onToggleValue,
  onClear,
}) {
  const wrapRef = useRef(null);

  const normalizedOptions = useMemo(() => {
    return options.map((option) =>
      typeof option === "string"
        ? { label: option, value: option }
        : option
    );
  }, [options]);

  const selected = Array.isArray(selectedValues) ? selectedValues : [];
  const extraSelectedCount = extraOptions.filter((option) => option.checked).length;
  const totalSelectedCount = selected.length + extraSelectedCount;

  useEffect(() => {
    function handleClickOutside(event) {
      if (!wrapRef.current?.contains(event.target)) {
        onOpenChange?.(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onOpenChange]);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      
        <Button
          onClick={() => onOpenChange?.(!isOpen)}
          style={{ backgroundColor: "white" }}
          className="w-full text-left light-text border border-black/15"
        >
          <div className="flex justify-between items-center">
            {totalSelectedCount > 0
              ? `${totalSelectedCount} selected`
              : placeholder}
            <RiArrowDropDownLine className="h-3.5 w-3.5 mr-0 light-text" />
          </div>
        </Button>

      {isOpen && (
        <div
          className="absolute z-20 mt-1 w-full rounded-xl border border-black/15 bg-white py-2 px-5 shadow-sm"
          style={{ backgroundColor: "white" }}
        >
          <div>
            {normalizedOptions.map((opt, index) => {
              const checked = selected.includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className={`small-text light-text flex items-center gap-2 py-1.5 hover:cursor-pointer`}
                >
                  <input
                    type="checkbox"
                    className="h-3 w-3 appearance-none rounded-sm border border-black/30 bg-white transition hover:cursor-pointer checked:bg-[color:var(--red)]"
                    checked={checked}
                    onChange={() => onToggleValue?.(opt.value)}
                  />
                  {opt.label}
                </label>
              );
            })}
            
            {extraOptions.length > 0 && (
              <div className={`${className}`}>
                {extraOptions.map((opt, index) => (
                  <label
                    key={`${opt.label}`}
                    className="small-text light-text flex items-center gap-2 py-1.5 hover:cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="h-3 w-3 appearance-none rounded-sm border border-black/30 bg-white transition hover:cursor-pointer checked:bg-[color:var(--red)]"
                      checked={opt.checked}
                      onChange={opt.onChange}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-black/10 mt-2 py-1">
            <label
              className="small-text light-text hover:cursor-pointer"
              onClick={() => onClear?.()}
            >
              Clear
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
