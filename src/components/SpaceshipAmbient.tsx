"use client";

import { motion } from "framer-motion";

type Props = {
  reduceMotion: boolean | null;
};

function RocketSvg({ uid, className }: { uid: string; className?: string }) {
  const hull = `${uid}-hull`;
  const flame = `${uid}-flame`;
  return (
    <svg
      viewBox="0 0 48 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <ellipse cx="24" cy="22" rx="10" ry="22" fill={`url(#${flame})`} opacity="0.55" />
      <ellipse cx="24" cy="26" rx="5" ry="12" fill="rgba(103,232,249,0.25)" />
      <path
        d="M12 46 L6 62 L16 54 L12 46ZM36 46 L42 62 L32 54 L36 46Z"
        fill="rgba(56,189,248,0.22)"
        stroke="rgba(56,189,248,0.35)"
        strokeWidth="0.75"
      />
      <path
        d="M24 96 L40 44 H8 L24 96Z"
        fill={`url(#${hull})`}
        stroke="rgba(56,189,248,0.45)"
        strokeWidth="1"
      />
      <circle cx="24" cy="62" r="5.5" fill="rgba(186,230,253,0.35)" stroke="rgba(56,189,248,0.4)" strokeWidth="0.75" />
      <defs>
        <linearGradient id={hull} x1="24" y1="44" x2="24" y2="96" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(56,189,248,0.4)" />
          <stop offset="1" stopColor="rgba(15,23,42,0.92)" />
        </linearGradient>
        <radialGradient id={flame} cx="50%" cy="100%" r="85%">
          <stop stopColor="rgba(56,189,248,0.55)" />
          <stop offset="0.65" stopColor="rgba(14,165,233,0.15)" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function SpaceshipAmbient({ reduceMotion }: Props) {
  if (reduceMotion === true) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden>
      <motion.div
        className="absolute right-[min(11vw,4.25rem)] w-[46px] opacity-[0.13] sm:right-[min(10vw,5rem)] sm:w-[54px] sm:opacity-[0.17]"
        style={{
          filter: "drop-shadow(0 0 14px rgba(56,189,248,0.35))",
          top: "-22vh",
        }}
        animate={{
          y: ["0vh", "142vh"],
          rotate: [0, 1.8, -1.2, 0.6, 0],
          x: [0, 4, -3, 2, 0],
        }}
        transition={{
          y: {
            duration: 92,
            repeat: Infinity,
            ease: "linear",
          },
          rotate: {
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          },
          x: {
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <RocketSvg uid="spaceship-ambient" className="w-full" />
      </motion.div>
    </div>
  );
}
