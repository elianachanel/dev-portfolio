"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

export type ExperienceJob = {
  role: string;
  company: string;
  bullets: string[];
};

type Props = {
  jobs: ExperienceJob[];
};

const bulletParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.055, delayChildren: 0.08 },
  },
};

export function ExperienceShowcase({ jobs }: Props) {
  const reduceMotion = useReducedMotion();

  const cardVariants = useMemo(
    () => ({
      hidden: (i: number) =>
        reduceMotion
          ? { opacity: 0, y: 16 }
          : {
              opacity: 0,
              y: 64,
              x: i % 2 === 0 ? -36 : 36,
              filter: "blur(14px)",
              rotateX: 6,
            },
      show: (i: number) =>
        reduceMotion
          ? {
              opacity: 1,
              y: 0,
              transition: { delay: i * 0.06, duration: 0.35 },
            }
          : {
              opacity: 1,
              y: 0,
              x: 0,
              filter: "blur(0px)",
              rotateX: 0,
              transition: {
                delay: i * 0.11,
                duration: 0.78,
                ease: [0.22, 1, 0.36, 1] as const,
              },
            },
    }),
    [reduceMotion],
  );

  const bulletItem = useMemo(
    () => ({
      hidden: reduceMotion
        ? { opacity: 0 }
        : { opacity: 0, x: -18, skewX: -3 },
      show: reduceMotion
        ? { opacity: 1, transition: { duration: 0.25 } }
        : {
            opacity: 1,
            x: 0,
            skewX: 0,
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
          },
    }),
    [reduceMotion],
  );

  return (
    <div
      className="relative mt-10 grid gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-7 [perspective:1400px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-4 top-0 hidden h-full w-24 overflow-visible lg:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute left-6 top-4 bottom-24 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            style={{ originY: 0 }}
          />
          <motion.div
            className="absolute left-[22px] top-4 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_24px_rgba(56,189,248,0.75)]"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 18 }}
          />
        </motion.div>
      )}

      {jobs.map((job, index) => (
        <motion.article
          key={`${job.company}-${job.role}`}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.22 }}
          style={{ transformStyle: "preserve-3d" }}
          whileHover={
            reduceMotion
              ? undefined
              : {
                  y: -12,
                  scale: 1.018,
                  transition: { type: "spring", stiffness: 420, damping: 26 },
                }
          }
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 px-5 py-6 shadow-[0_16px_56px_rgba(0,0,0,0.38)] ring-1 ring-white/[0.04] transition-[box-shadow] duration-300 sm:px-6 sm:py-7 lg:hover:border-accent/25 lg:hover:shadow-[0_28px_90px_rgba(56,189,248,0.16)] lg:hover:ring-accent/20"
        >
          {!reduceMotion && (
            <>
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                initial={false}
              >
                <div className="animate-experience-shimmer absolute -inset-[40%] rotate-12 bg-[linear-gradient(105deg,transparent_35%,rgba(56,189,248,0.12)_48%,rgba(255,255,255,0.06)_52%,transparent_65%)] bg-[length:220%_100%]" />
              </motion.div>
              <motion.div
                aria-hidden
                className="absolute left-0 top-8 bottom-8 w-[3px] origin-top rounded-full bg-gradient-to-b from-accent via-accent/70 to-accent/10"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.11 + 0.18,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </>
          )}

          <div className="relative flex items-start justify-between gap-4">
            <div className="min-w-0 pl-1 lg:pl-2">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-100 sm:text-xl">
                {job.role}
              </h3>
              <p className="mt-1 text-sm text-zinc-400">{job.company}</p>
            </div>
            <motion.span
              className="shrink-0 font-mono text-[11px] font-semibold tracking-[0.2em] text-accent/90 tabular-nums"
              initial={{
                scale: reduceMotion ? 1 : 0,
                rotate: reduceMotion ? 0 : -18,
              }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 16,
                delay: reduceMotion ? 0 : index * 0.11 + 0.08,
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>
          </div>

          <motion.ul
            variants={bulletParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="relative mt-5 space-y-2.5 border-t border-white/[0.06] pt-5 text-sm leading-relaxed text-zinc-300"
          >
            {job.bullets.map((b) => (
              <motion.li
                key={b}
                variants={bulletItem}
                className="flex gap-3 pl-0.5"
              >
                <span
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent shadow-[0_0_10px_rgba(56,189,248,0.65)]"
                  aria-hidden
                />
                <span>{b}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.article>
      ))}
    </div>
  );
}
