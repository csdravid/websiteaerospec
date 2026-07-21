import Image from "next/image";
import { ParticleField } from "./ParticleField";
import { Reveal } from "./Reveal";

const SDGS = [
  { number: 3, name: "Good Health and Well-Being", icon: "/sdg/sdg-03.png" },
  { number: 8, name: "Decent Work and Economic Growth", icon: "/sdg/sdg-08.png" },
  { number: 10, name: "Reduced Inequalities", icon: "/sdg/sdg-10.png" },
  { number: 11, name: "Sustainable Cities and Communities", icon: "/sdg/sdg-11.png" },
  { number: 13, name: "Climate Action", icon: "/sdg/sdg-13.png" },
  { number: 15, name: "Life on Land", icon: "/sdg/sdg-15.png" },
];

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

          <div className="mt-10 flex flex-wrap gap-4">
            {SDGS.map((sdg) => (
              <div
                key={sdg.number}
                title={`SDG ${sdg.number}: ${sdg.name}`}
                className="h-20 w-20 shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-24"
              >
                <Image
                  src={sdg.icon}
                  alt={`UN Sustainable Development Goal ${sdg.number}: ${sdg.name}`}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
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
