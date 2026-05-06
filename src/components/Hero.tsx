"use client";

import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" as const },
  viewport: { once: true, amount: 0.3 },
};

export function Hero() {
  return (
    <motion.section
      {...fadeUp}
      className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-24 pt-28 text-center sm:px-8 lg:items-start lg:text-left"
    >
      <p className="mb-6 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1 text-xs tracking-[0.24em] text-muted uppercase">
        Portafolio
      </p>
      <h1 className="max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Eliana Chanel Batista
      </h1>
      <h2 className="mt-4 text-base font-medium tracking-wide text-accent sm:text-lg">
        Software Engineer · React Native
      </h2>
      <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
        Building scalable mobile &amp; web experiences
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        Focused on performance, usability, and clean architecture across mobile
        and web platforms.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a
          href="#featured-project"
          className="rounded-full border border-white/10 bg-white/[0.05] px-6 py-3 text-sm text-zinc-100 transition hover:bg-white/[0.08]"
        >
          View Featured Work
        </a>
        <a
          href="#contact"
          className="rounded-full border border-white/10 px-6 py-3 text-sm text-zinc-300 transition hover:border-white/20 hover:text-zinc-100"
        >
          Contact
        </a>
      </div>
    </motion.section>
  );
}
