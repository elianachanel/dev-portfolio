"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AmbientBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 mesh-gradient"
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.85, 1, 0.9] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 grid-fade opacity-60" />
      <motion.div
        className="absolute -left-[20%] top-[10%] h-[min(70vw,520px)] w-[min(70vw,520px)] rounded-full bg-sky-500/10 blur-[100px]"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 40, 0], y: [0, 30, 0] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[15%] top-[35%] h-[min(55vw,420px)] w-[min(55vw,420px)] rounded-full bg-indigo-500/10 blur-[90px]"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, -35, 0], y: [0, -25, 0] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="noise-overlay absolute inset-0" />
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,var(--background)_92%)]"
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.7, 1, 0.75] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
