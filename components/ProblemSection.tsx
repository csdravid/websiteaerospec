import { ParticleField } from "./ParticleField";
import { Reveal } from "./Reveal";

export function ProblemSection() {
  return (
    <section id="problem" className="relative z-[2] flex min-h-screen flex-col justify-center overflow-hidden bg-white px-8 py-20 sm:px-10 lg:px-16">
      <ParticleField />
      <Reveal className="relative z-10 mx-auto grid w-full max-w-[1600px] gap-12 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-base font-semibold uppercase tracking-wider text-accent">
            The problem
          </p>
          <p className="mt-4 text-6xl font-semibold tracking-tight text-ink md:text-8xl">
            4.2M
          </p>
          <p className="mt-2 text-lg leading-relaxed text-ink/60">
            premature deaths every year. The WHO identifies aerosol pollution
            as the single largest environmental health risk.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-6 border-t border-black/10 pt-8 md:border-t-0 md:border-l md:pl-12 md:pt-0">
          <p className="text-xl leading-relaxed text-ink md:text-2xl">
            The core challenge isn&apos;t measuring particulate matter. It&apos;s
            identifying where it comes from, what it&apos;s made of, and how it
            affects health.
          </p>
          <p className="text-lg leading-relaxed text-ink/60">
            That kind of analysis is expensive today. It takes skilled labor
            and a room full of costly instruments, so real answers stay out
            of reach for most cities, industries, and low-income countries.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
