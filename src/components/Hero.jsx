import ScrollIndicator from "./ui/ScrollIndicator";
import Scribble from '@assets/scribble.svg';
import Sparks from '@assets/sparks.svg';

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh]">
      <div className="relative mx-auto flex min-h-[100dvh] flex-col items-center justify-center text-center">
        <div className="grid place-items-center">
          <div className="title text-[color:var(--gray-1)]">Events</div>
          <div className="title text-[color:var(--gray-1)]">@</div>
          <h1 className="hero-title text-[color:var(--red)] leading-[0.95]">
            Hackathon Global
          </h1>
        </div>

        <img 
          src={Scribble}
          className="absolute left-[4%] top-[22%] w-[180px] text-[color:var(--green)] opacity-90 sm:left-[-2%] sm:top-[14%] sm:w-[140px]"
          aria-hidden="true"
        />

        <img 
          src={Sparks}
          className="absolute right-[10%] top-[48%] w-[140px] text-[color:var(--green)] opacity-70 sm:right-[4%] sm:top-[56%] sm:w-[110px]"
          aria-hidden="true"
        />
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}
