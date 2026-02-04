import ScrollIndicator from "@ui/ScrollIndicator";
import Scribble from '@assets/scribble.svg';
import Sparks from '@assets/sparks.svg';

import '@componentcss/hero.css';

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh]">
      <div className="relative mx-auto flex min-h-[100dvh] flex-col items-center justify-center text-center">
        <div className="grid place-items-center">
          <h3 className="hero-text text-[color:var(--gray-1)]">Events @</h3>
          <h1 className="hero-title text-[color:var(--red)] leading-[0.95]">
            Hackathon Global
          </h1>
        </div>

        <img 
          src={Scribble}
          className="decorators absolute left-[2%] top-[39%] w-[140px] opacity-60"
          aria-hidden="true"
        />

        <img 
          src={Sparks}
          className="decorators absolute right-[2.5%] top-[65%] w-[110px] opacity-60"
          aria-hidden="true"
        />
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}
