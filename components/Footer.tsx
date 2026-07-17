export function Footer() {
  return (
    <footer className="relative z-[3] bg-ink px-8 py-12 text-white/60 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between border-t border-white/10 pt-10 text-base">
        <span>© {new Date().getFullYear()} AeroSpec SA</span>

        <a
          href="https://www.linkedin.com/company/aerospecch"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block pb-0.5 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:text-white hover:after:w-full"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
