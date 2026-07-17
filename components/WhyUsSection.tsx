const REASONS = [
  {
    title: "Cost-effective by design",
    description:
      "No additional instruments required to operate. One device replaces a lab's worth of equipment.",
  },
  {
    title: "Defensible IP",
    description:
      "The AIR Monitor is protected under two separate patents, securing our approach to measurement and analysis.",
  },
  {
    title: "Deep domain expertise",
    description:
      "Technical expertise and scientific rigor built into a monitoring solution designed to scale.",
  },
];

import { ParticleField } from "./ParticleField";
import { Reveal } from "./Reveal";

export function WhyUsSection() {
  return (
    <section id="why-us" className="relative z-[3] flex min-h-screen flex-col justify-center overflow-hidden bg-white px-8 py-20 sm:px-10 lg:px-16">
      <ParticleField />
      <Reveal className="relative z-10 mx-auto w-full max-w-[1600px]">
        <p className="text-base font-semibold uppercase tracking-wider text-accent">
          Why us
        </p>
        <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-ink md:text-5xl">
          Built to be the standard, not another lab tool.
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {REASONS.map((reason) => (
            <div key={reason.title} className="border-t border-ink/10 pt-6">
              <h3 className="text-lg font-semibold text-ink">
                {reason.title}
              </h3>
              <p className="mt-2 text-lg leading-relaxed text-ink/60">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
