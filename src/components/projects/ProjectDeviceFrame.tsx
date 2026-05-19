"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  variant?: "phone" | "browser";
  className?: string;
  children?: ReactNode;
};

export function ProjectDeviceFrame({
  src,
  alt,
  priority,
  variant = "phone",
  className = "",
  children,
}: Props) {
  const reduceMotion = useReducedMotion();
  const isPhone = variant === "phone";

  return (
    <motion.div
      className={`relative mx-auto w-full ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[3.5rem] bg-gradient-to-br from-sky-500/25 via-indigo-500/10 to-transparent blur-3xl"
      />

      <motion.div
        className={`relative overflow-hidden border border-white/20 bg-gradient-to-b from-[#141418] to-[#0a0a0c] shadow-[0_40px_120px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.08)_inset] ${
          isPhone
            ? "mx-auto max-w-[min(320px,78vw)] rounded-[2.75rem] p-3 sm:max-w-[min(340px,88vw)] sm:rounded-[3rem] sm:p-3.5"
            : "rounded-3xl p-2.5 sm:rounded-[2rem]"
        }`}
        whileHover={
          reduceMotion
            ? undefined
            : {
                y: -6,
                transition: { type: "spring", stiffness: 260, damping: 22 },
              }
        }
      >
        {isPhone ? (
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-4 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-black/80"
          />
        ) : (
          <div
            aria-hidden
            className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2.5"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-2 flex-1 rounded-full bg-white/[0.04] px-2 py-0.5 text-[9px] text-zinc-600">
              app.preview
            </span>
          </div>
        )}

        <motion.div
          className={`relative overflow-hidden bg-[#050506] ring-1 ring-white/[0.06] ${
            isPhone
              ? "aspect-[9/19] rounded-[2.15rem] sm:rounded-[2.35rem]"
              : "aspect-[16/10] rounded-2xl sm:rounded-3xl"
          }`}
        >
          <div
            className={`absolute inset-0 overflow-hidden ${
              isPhone ? "rounded-[2rem] sm:rounded-[2.2rem]" : "rounded-xl sm:rounded-2xl"
            }`}
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes={
                isPhone
                  ? "(max-width:640px) 78vw, 340px"
                  : "(max-width:1024px) 100vw, 900px"
              }
              className="object-contain object-center"
            />
          </div>
          <motion.div
            aria-hidden
            className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/[0.04] ${
              isPhone ? "rounded-[2.15rem] sm:rounded-[2.35rem]" : "rounded-2xl sm:rounded-3xl"
            }`}
          />
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
