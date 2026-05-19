"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 48));
    return () => unsub();
  }, [scrollY]);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, [open]);

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-40 px-4 pt-4 sm:px-6 sm:pt-5"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-5 ${
          scrolled ? "glass-panel-strong shadow-lg" : "glass-panel"
        }`}
      >
        <a
          href="#top"
          className="focus-ring font-[family-name:var(--font-syne)] text-sm font-semibold tracking-tight text-zinc-100"
        >
          Eliana<span className="text-accent">.</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring rounded-full px-3.5 py-2 text-[13px] text-zinc-400 transition hover:bg-white/[0.06] hover:text-zinc-100"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="focus-ring ml-2 rounded-full bg-white/[0.08] px-4 py-2 text-[13px] font-medium text-zinc-100 transition hover:bg-white/[0.12]"
          >
            Let&apos;s talk
          </a>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-zinc-300 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
            <path
              d={open ? "M2 2L16 12M16 2L2 12" : "M1 1H17M1 7H17M1 13H17"}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden md:hidden"
          >
            <motion.div className="glass-panel-strong flex flex-col gap-1 rounded-2xl p-3">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="focus-ring rounded-xl px-4 py-3 text-sm text-zinc-300 hover:bg-white/[0.06]"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
