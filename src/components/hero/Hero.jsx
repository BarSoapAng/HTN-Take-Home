import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button.jsx";
import { ScribbleLeft, ScribbleBirds, ScribbleArrow } from "./ScribbleAssets.jsx";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center py-14">
      <div className="absolute left-6 top-10 hidden sm:block">
        <ScribbleLeft />
      </div>

      <div className="absolute right-10 top-40 hidden md:block">
        <ScribbleBirds />
      </div>

      <div className="text-center">
        <div className="title text-[var(--gray-1)]">Events</div>
        <div className="big-text text-[var(--gray-1)] -mt-2">@</div>
        <h1 className="hero-title text-[var(--red)] leading-none">
          Hackathon Global
        </h1>

        <div className="mt-10 flex flex-col items-center gap-4">
          <ScribbleArrow />
          <Button
            onClick={() => navigate("/events")}
            className="bg-[var(--blue)] text-[var(--white)] border-2 border-black"
          >
            Go to Events
          </Button>
        </div>
      </div>
    </section>
  );
}
