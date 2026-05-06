"use client";

import { motion } from "framer-motion";

const links = [
  { label: "Inicio", href: "#top" },
  { label: "Proyecto", href: "#featured-project" },
  { label: "Stack", href: "#tech-stack" },
  { label: "Contacto", href: "#contact" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="sticky top-5 z-30 mx-auto w-full max-w-6xl px-6 sm:px-8"
    >
      <nav className="mx-auto flex w-full items-center justify-between rounded-full border border-white/10 bg-black/35 px-5 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <a
          href="#top"
          className="text-xs tracking-[0.18em] text-zinc-200 uppercase transition hover:text-white"
        >
          ECB
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-xs text-zinc-400 transition hover:bg-white/[0.06] hover:text-zinc-100 sm:text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
