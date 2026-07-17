const MILESTONES = [
  {
    year: "2023",
    label: "Award",
    title: "Venture Kick Stage 2 winner",
    icon: "trophy",
  },
  {
    year: "2023",
    label: "Award",
    title: "Venture Kick Stage 1 winner",
    icon: "medal",
  },
  {
    year: "2023",
    label: "Award",
    title: "‘Deep-tech pioneer’ at Hello-Tomorrow, Paris",
    icon: "landmark",
  },
  {
    year: "2022",
    label: "Grant",
    title: "Innogrant winners at EPFL Startup Unit",
    icon: "cap",
  },
  {
    year: "2022",
    label: "Grant",
    title: "‘Enabled by Design’ grant from EPFL",
    icon: "compass",
  },
  {
    year: "2021",
    label: "Grant",
    title: "Innosuisse grant, without implementation partner",
    icon: "cross",
  },
  {
    year: "2021",
    label: "Award",
    title: "Innosuisse Business Concept winner",
    icon: "bulb",
  },
] as const;

const HIGHLIGHTS = [
  "Letters of interest from 10 potential customers",
  "Interviews with 30 potential customers",
];

const LABEL_COLOR: Record<string, string> = {
  Award: "#a78bfa",
  Grant: "#c026d3",
};

const ROTATIONS = [-5, 3, -3, 5, -4, 2, 4];

const ICON_PROPS = {
  viewBox: "0 0 28 28",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICONS: Record<string, React.ReactNode> = {
  trophy: (
    <svg {...ICON_PROPS}>
      <path d="M9 4h10v4a5 5 0 0 1-5 5 5 5 0 0 1-5-5V4Z" />
      <path d="M9 5H5a3 3 0 0 0 3 3" />
      <path d="M19 5h4a3 3 0 0 1-3 3" />
      <path d="M14 13v4" />
      <path d="M10 21h8" />
      <path d="M11 21c0-2 1-3 3-4 2 1 3 2 3 4" />
    </svg>
  ),
  medal: (
    <svg {...ICON_PROPS}>
      <path d="M10 3 7 10" />
      <path d="M18 3l3 7" />
      <circle cx="14" cy="18" r="6" />
      <path d="m14 15.2 1 2 2.2.3-1.6 1.5.4 2.2-2-1.1-2 1.1.4-2.2-1.6-1.5 2.2-.3Z" />
    </svg>
  ),
  landmark: (
    <svg {...ICON_PROPS}>
      <path d="M14 3v4" />
      <path d="M11 10 14 7l3 3" />
      <path d="M9 15l5-5 5 5" />
      <path d="M7 22l7-14 7 14" />
      <path d="M10 22h8" />
      <path d="M11.5 17h5" />
    </svg>
  ),
  cap: (
    <svg {...ICON_PROPS}>
      <path d="M3 11l11-5 11 5-11 5-11-5Z" />
      <path d="M8 13.5V19c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
      <path d="M25 11v6" />
    </svg>
  ),
  compass: (
    <svg {...ICON_PROPS}>
      <circle cx="14" cy="14" r="10" />
      <path d="M17.5 10.5 15 15l-4.5 2.5L13 13l4.5-2.5Z" />
    </svg>
  ),
  cross: (
    <svg {...ICON_PROPS}>
      <rect x="4" y="4" width="20" height="20" rx="3" />
      <path d="M14 9v10M9 14h10" />
    </svg>
  ),
  bulb: (
    <svg {...ICON_PROPS}>
      <path d="M14 4a7 7 0 0 0-4 12.7c.7.5 1 1.3 1 2.1V19h6v-.2c0-.8.3-1.6 1-2.1A7 7 0 0 0 14 4Z" />
      <path d="M11 22h6" />
      <path d="M12 25h4" />
    </svg>
  ),
};

import { Reveal } from "./Reveal";

function TicketCard({
  milestone,
  rotate,
}: {
  milestone: (typeof MILESTONES)[number];
  rotate: number;
}) {
  const color = LABEL_COLOR[milestone.label] ?? "#a78bfa";
  return (
    <div
      className="flex w-64 shrink-0 flex-col gap-3 rounded-lg bg-white p-5 shadow-xl shadow-black/30"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="flex items-start justify-between">
        <span
          className="inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white"
          style={{ backgroundColor: color }}
        >
          {milestone.label}
        </span>
        <span className="h-7 w-7 shrink-0" style={{ color }}>
          {ICONS[milestone.icon]}
        </span>
      </div>
      <p className="text-sm font-semibold text-ink/40">{milestone.year}</p>
      <p className="text-base font-semibold leading-snug text-ink">
        {milestone.title}
      </p>
    </div>
  );
}

export function JourneySection() {
  const track = [...MILESTONES, ...MILESTONES];

  return (
    <section
      id="journey"
      className="relative z-[3] flex min-h-screen flex-col justify-center overflow-hidden bg-ink py-20 text-white"
    >
      <Reveal className="mx-auto w-full max-w-[1600px] px-8 sm:px-10 lg:px-16">
        <p className="text-base font-semibold uppercase tracking-wider text-accent-bright">
          The journey so far
        </p>
        <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight md:text-5xl">
          Backed by grants, awards, and early customer conviction.
        </h2>
      </Reveal>

      <div className="group mt-14 overflow-x-hidden overflow-y-visible py-4">
        <div className="flex w-max animate-marquee gap-6 [animation-direction:reverse] group-hover:[animation-play-state:paused]">
          {track.map((milestone, i) => (
            <TicketCard
              key={i}
              milestone={milestone}
              rotate={ROTATIONS[i % ROTATIONS.length]}
            />
          ))}
        </div>
      </div>

      <Reveal className="mx-auto mt-14 w-full max-w-[1600px] px-8 sm:px-10 lg:px-16">
        <ul className="flex flex-col gap-3">
          {HIGHLIGHTS.map((highlight) => (
            <li
              key={highlight}
              className="text-lg leading-relaxed text-white/70"
            >
              {highlight}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
