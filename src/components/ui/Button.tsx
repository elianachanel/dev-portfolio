"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  external?: boolean;
};

const variants = {
  primary:
    "relative overflow-hidden bg-gradient-to-r from-sky-500/90 to-indigo-500/90 text-white shadow-[0_0_40px_rgba(56,189,248,0.25)] hover:shadow-[0_0_50px_rgba(56,189,248,0.35)] border border-white/20",
  ghost:
    "bg-white/[0.04] text-zinc-100 border border-white/10 hover:bg-white/[0.08] hover:border-white/18",
  outline:
    "bg-transparent text-zinc-200 border border-white/15 hover:bg-white/[0.05] hover:border-sky-400/40",
};

export function Button({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const reduceMotion = useReducedMotion();
  const base =
    "focus-ring group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-colors duration-300";
  const classes = `${base} ${variants[variant]} ${className}`;

  const motionProps = reduceMotion
    ? {}
    : {
        whileHover: { scale: 1.03, y: -1 },
        whileTap: { scale: 0.98 },
        transition: { type: "spring" as const, stiffness: 400, damping: 24 },
      };

  const inner = (
    <>
      {variant === "primary" && !reduceMotion ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      ) : null}
      <span className="relative z-[1]">{children}</span>
    </>
  );

  if (href) {
    const isExternal =
      href.startsWith("http") || href.endsWith(".pdf") || href.startsWith("mailto:");
    return (
      <motion.a
        href={href}
        className={classes}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        {...motionProps}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} className={classes} {...motionProps}>
      {inner}
    </motion.button>
  );
}
