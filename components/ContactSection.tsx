import { Reveal } from "./Reveal";

export function ContactSection() {
  return (
    <section id="contact" className="relative z-[3] bg-accent px-8 py-20 text-white sm:px-10 md:py-28 lg:px-16">
      <Reveal className="mx-auto flex max-w-[1600px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="text-base font-semibold uppercase tracking-wider text-white/70">
            Get in touch
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Let&apos;s talk about your PM measurement needs.
          </h2>
          <a
            href="mailto:info@aerospec.ch?subject=PM%20measurement%20inquiry"
            className="mt-8 inline-block rounded-md bg-white px-6 py-3 text-base font-bold text-accent-strong transition-all duration-200 hover:scale-[1.03] hover:bg-white/90 active:scale-95"
          >
            Send a message
          </a>
        </div>

        <div className="flex flex-col items-end gap-3 text-right text-lg">
          <a
            href="mailto:info@aerospec.ch"
            className="font-medium underline decoration-white/40 underline-offset-4 transition-colors duration-200 hover:decoration-white"
          >
            info@aerospec.ch
          </a>
          <a
            href="tel:+41779601753"
            className="font-medium underline decoration-white/40 underline-offset-4 transition-colors duration-200 hover:decoration-white"
          >
            +41 (0)77 960 17 53
          </a>
          <a
            href="tel:+41216973535"
            className="font-medium underline decoration-white/40 underline-offset-4 transition-colors duration-200 hover:decoration-white"
          >
            +41 (0)21 697 35 35
          </a>
        </div>
      </Reveal>
    </section>
  );
}
