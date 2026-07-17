import { ParticleField } from "./ParticleField";
import { Reveal } from "./Reveal";

export function ImpactSection() {
  return (
    <section id="impact" className="relative z-[3] flex min-h-screen flex-col justify-center overflow-hidden bg-accent-soft px-8 py-20 sm:px-10 lg:px-16">
      <ParticleField />
      <Reveal className="relative z-10 mx-auto grid w-full max-w-[1600px] gap-12 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-base font-semibold uppercase tracking-wider text-accent">
            Our impact
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            Data that reaches the places it&apos;s needed most.
          </h2>
        </div>

        <div className="flex flex-col justify-center gap-6 border-t border-ink/10 pt-8 md:border-t-0 md:border-l md:pl-12 md:pt-0">
          <p className="text-xl leading-relaxed text-ink md:text-2xl">
            AeroSpec&apos;s work contributes to six UN Sustainable Development
            Goals. It turns pollution data into the evidence policymakers
            need to act.
          </p>
          <p className="text-lg leading-relaxed text-ink/60">
            We set aside a portion from every sale to fund PM measurements
            in a low-income country. That way, the communities most
            exposed to aerosol pollution aren&apos;t the last to get
            answers.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
