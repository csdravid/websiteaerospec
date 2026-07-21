const TEAM = [
  {
    name: "Nikunj Dudani",
    title: "CEO, Co-founder",
    linkedin: "https://www.linkedin.com/in/nikunj-dudani?originalSubdomain=ch",
    photo: "/team/nikunj-dudani.jpg",
  },
  {
    name: "Satoshi Takahama",
    title: "Scientific Advisor, Co-Founder",
    linkedin: "https://www.linkedin.com/in/satoshi-takahama-aa92872/",
    photo: "/team/satoshi-takahama.jpg",
  },
  {
    name: "Andrea Baccarini",
    title: "CTO",
    linkedin: "https://www.linkedin.com/in/baccandr/",
    photo: "/team/andrea-baccarini.jpg",
  },
  {
    name: "Kamila Babayeva",
    title: "Programming",
    linkedin: "https://www.linkedin.com/in/kamilababayeva/",
    photo: "/team/kamila-babayeva.jpg",
  },
  {
    name: "Myrabelle Oestreicher",
    title: "Sales & Marketing",
    linkedin: "https://www.linkedin.com/in/myrabelle-oestreicher-7ba2a9122/",
    photo: "/team/myrabelle-oestreicher.jpeg",
  },
];

import Image from "next/image";
import { ParticleField } from "./ParticleField";
import { Reveal } from "./Reveal";

export function TeamSection() {
  return (
    <section id="team" className="relative z-[3] flex min-h-screen flex-col justify-center overflow-hidden bg-accent-soft px-8 py-20 sm:px-10 lg:px-16">
      <ParticleField />
      <Reveal className="relative z-10 mx-auto w-full max-w-[1600px]">
        <p className="text-base font-semibold uppercase tracking-wider text-accent">
          Team
        </p>
        <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-ink md:text-5xl">
          Scientists and builders working on the same problem.
        </h2>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member) => {
            const card = (
              <>
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-ink">{member.name}</p>
                  <p className="text-base text-ink/55">{member.title}</p>
                </div>
              </>
            );

            const baseClassName =
              "flex items-center gap-4 border border-ink/10 p-6 transition-all duration-200";

            return member.linkedin ? (
              <a
                key={member.name}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseClassName} hover:-translate-y-1 hover:border-accent/40 hover:shadow-md`}
              >
                {card}
              </a>
            ) : (
              <div key={member.name} className={baseClassName}>
                {card}
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
