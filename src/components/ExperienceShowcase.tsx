"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobileLayout } from "@/hooks/useMediaQuery";

const MechanicalKeyboard = dynamic(
  () =>
    import("@/components/experience/MechanicalKeyboard").then((m) => ({
      default: m.MechanicalKeyboard,
    })),
  { ssr: false, loading: () => <div className="h-[320px] w-[280px]" aria-hidden /> },
);

export type ExperienceJob = {
  role: string;
  company: string;
  bullets: string[];
};

type Props = {
  jobs: ExperienceJob[];
};

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0, delayChildren: 0 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/** Zigzag: right → left → right */
function zigzagSide(index: number): "left" | "right" {
  return index % 2 === 0 ? "right" : "left";
}

export function ExperienceShowcase({ jobs }: Props) {
  const reduceMotion = useReducedMotion();
  const isMobileLayout = useIsMobileLayout();
  const motionDisabled = reduceMotion || isMobileLayout;

  return (
    <div className="relative mt-10 min-w-0">
      <div className="pointer-events-none absolute top-8 bottom-8 left-1/2 z-0 hidden w-[min(100%,300px)] -translate-x-1/2 lg:block">
        <div className="sticky top-32">
          <MechanicalKeyboard />
        </div>
      </div>

      <motion.div
        className="relative z-10 flex flex-col gap-10 sm:gap-14 lg:gap-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
      >
        {jobs.map((job, index) => {
          const side = zigzagSide(index);
          const alignRight = side === "right";

          return (
            <motion.article
              key={`${job.company}-${job.role}`}
              variants={motionDisabled ? undefined : cardVariants}
              whileHover={
                motionDisabled
                  ? undefined
                  : {
                      y: -6,
                      transition: { type: "spring", stiffness: 400, damping: 28 },
                    }
              }
              className={`glass-panel group relative w-full max-w-[min(100%,520px)] overflow-hidden rounded-2xl px-5 py-6 shadow-[0_16px_56px_rgba(0,0,0,0.38)] ring-1 ring-white/[0.04] transition-[box-shadow,border-color] duration-300 sm:px-6 sm:py-7 lg:max-w-[min(42vw,480px)] lg:hover:border-sky-400/25 lg:hover:shadow-[0_28px_90px_rgba(56,189,248,0.14)] ${
                alignRight
                  ? "ml-auto lg:mr-[calc(50%+11rem)]"
                  : "mr-auto lg:ml-[calc(50%+11rem)]"
              }`}
            >
              <div
                className={`relative flex items-start justify-between gap-4 ${
                  alignRight ? "flex-row-reverse text-right" : ""
                }`}
              >
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold tracking-tight text-zinc-100 sm:text-xl">
                    {job.role}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-400">{job.company}</p>
                </div>
                <span className="shrink-0 font-mono text-[11px] font-semibold tracking-[0.2em] text-accent/90 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <ul
                className={`relative mt-5 space-y-2.5 border-t border-white/[0.06] pt-5 text-sm leading-relaxed text-zinc-300 ${
                  alignRight ? "text-right" : ""
                }`}
              >
                {job.bullets.map((b) => (
                  <li
                    key={b}
                    className={`flex gap-3 ${alignRight ? "flex-row-reverse" : ""}`}
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent shadow-[0_0_10px_rgba(56,189,248,0.65)]"
                      aria-hidden
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </motion.div>

      <div className="relative z-10 mt-12 flex justify-center lg:hidden">
        <MechanicalKeyboard />
      </div>
    </div>
  );
}
