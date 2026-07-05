import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-6 md:px-10 flex items-center justify-between rounded-full transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-black/40 border border-white/10 mx-4 md:mx-auto py-2.5"
            : "py-2"
        }`}
      >
        <a
          href="#top"
          data-testid="nav-logo"
          className="font-display text-lg tracking-tight flex items-center gap-2"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[#F4B961] shadow-[0_0_12px_#F4B961]" />
          <span>vansh<span className="text-[#F4B961]">.dev</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="hover:text-[#F4B961] transition-colors relative group"
            >
              {l.label}
              <span className="absolute left-0 -bottom-1 w-0 h-px bg-[#F4B961] transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          data-testid="nav-cta-contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F4B961] text-[#030305] text-sm font-medium hover:bg-[#E89D42] transition-colors"
        >
          Let's Talk
        </a>
        <button
          data-testid="nav-mobile-toggle"
          className="md:hidden text-white/80"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div
          data-testid="nav-mobile-menu"
          className="md:hidden mx-4 mt-2 rounded-2xl backdrop-blur-xl bg-black/70 border border-white/10 p-6 flex flex-col gap-4"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-[#F4B961]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="inline-flex justify-center items-center px-5 py-2 rounded-full bg-[#F4B961] text-[#030305] font-medium"
          >
            Let's Talk
          </a>
        </div>
      )}
    </header>
  );
}
