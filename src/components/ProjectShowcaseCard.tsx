"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useRef } from "react";

type Props = {
  src: string;
  title: string;
  index: number;
  disclaimer?: string;
};

const spring = { stiffness: 320, damping: 32, mass: 0.55 };

export function ProjectShowcaseCard({ src, title, index, disclaimer }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(my, [0, 1], reduceMotion ? [0, 0] : [8, -8]),
    spring,
  );
  const rotateY = useSpring(
    useTransform(mx, [0, 1], reduceMotion ? [0, 0] : [-10, 10]),
    spring,
  );

  const glowX = useSpring(useTransform(mx, [0, 1], [20, 80]), spring);
  const glowY = useSpring(useTransform(my, [0, 1], [15, 85]), spring);

  const shine = useMotionTemplate`radial-gradient(580px circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.2), transparent 52%)`;
  const rim = useMotionTemplate`radial-gradient(120% 90% at ${glowX}% ${glowY}%, rgba(56,189,248,0.32), transparent 62%)`;

  const reset = useCallback(() => {
    mx.set(0.5);
    my.set(0.5);
  }, [mx, my]);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reduceMotion || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    },
    [mx, my, reduceMotion],
  );

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{
        duration: 0.65,
        delay: index * 0.075,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative [perspective:1100px]"
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileTap={reduceMotion ? undefined : { scale: 0.985 }}
        transition={{ type: "spring", stiffness: 460, damping: 28 }}
        className="glass-panel relative rounded-xl shadow-[0_14px_48px_rgba(0,0,0,0.42)] transition-shadow duration-300 ease-out group-hover:shadow-[0_26px_72px_rgba(56,189,248,0.18)]"
      >
        {/* Rim light follows cursor (spatial depth cue) */}
        {!reduceMotion && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-xl opacity-70 blur-[1px]"
            style={{ background: rim }}
          />
        )}

        <div
          className="relative overflow-hidden rounded-xl bg-[#070708]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="relative aspect-square overflow-hidden"
            style={{ transform: "translateZ(28px)" }}
          >
            <div className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]">
              <Image
                src={src}
                alt={title}
                fill
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain object-center p-1"
              />
            </div>

            {!reduceMotion && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                style={{ background: shine }}
              />
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-white/[0.07]" />

            {disclaimer ? (
              <p className="pointer-events-none absolute inset-x-0 bottom-0 bg-black/72 px-2 py-2 text-center text-[0.58rem] leading-snug text-zinc-300 backdrop-blur-[2px]">
                {disclaimer}
              </p>
            ) : null}

            {/* Floating specular edge */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
            />
          </div>

          <p
            className="relative px-3 py-2.5 text-sm tracking-wide text-zinc-400 transition-colors duration-300 group-hover:text-zinc-100"
            style={{ transform: "translateZ(42px)" }}
          >
            {title}
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
}
