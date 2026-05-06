"use client";

import { motion } from "framer-motion";

const stack = ["React Native", "Next.js", "TypeScript", "REST APIs", "Firebase"];

export function TechStack() {
  return (
    <section
      id="tech-stack"
      className="mx-auto w-full max-w-5xl px-6 pb-24 sm:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="rounded-3xl border border-white/10 bg-surface/70 p-6 sm:p-10"
      >
        <h3 className="text-sm tracking-[0.22em] text-muted uppercase">
          Tech Stack
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
          A focused toolkit for building scalable products with strong DX and
          maintainable architecture.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {stack.map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
              whileHover={{ y: -2 }}
              className="rounded-full border border-white/10 bg-[#111] px-4 py-2 text-sm text-zinc-200 shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition hover:border-white/20 hover:bg-[#141416]"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
