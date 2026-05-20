"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

export type MascotLook = {
  head: number;
  eyeX: number;
  eyeY: number;
};

export const IDLE_MASCOT_LOOK: MascotLook = { head: 0, eyeX: 0, eyeY: 0 };

type Props = {
  look?: MascotLook;
  greeting?: boolean;
  size?: "hero" | "floating";
  className?: string;
};

export function PortfolioRobotCharacter({
  look = IDLE_MASCOT_LOOK,
  greeting = false,
  size = "floating",
  className = "",
}: Props) {
  const uid = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();
  const isHero = size === "hero";

  const sizeClass = isHero
    ? "h-auto w-[min(72vw,300px)] sm:w-[min(340px,320px)]"
    : "h-auto w-[88px] sm:w-[105px] md:w-[118px] lg:w-[128px]";

  return (
    <div className={`relative ${sizeClass} ${className}`}>
      <div
        aria-hidden
        className={`absolute -inset-6 rounded-full bg-sky-400/30 blur-3xl ${
          isHero ? "opacity-80" : "opacity-55"
        }`}
      />
      <motion.svg
        viewBox="0 0 220 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 h-auto w-full drop-shadow-[0_24px_60px_rgba(56,189,248,0.4)]"
        animate={
          reduceMotion
            ? undefined
            : {
                y: greeting ? [0, -8, 0] : [0, -5, 0],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: greeting ? 1.6 : 2.2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <defs>
          <linearGradient id={`${uid}-head`} x1="60" y1="28" x2="140" y2="110">
            <stop stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#f1f5f9" />
            <stop offset="1" stopColor="#dbeafe" />
          </linearGradient>
          <linearGradient id={`${uid}-body`} x1="48" y1="108" x2="152" y2="220">
            <stop stopColor="#ffffff" />
            <stop offset="0.6" stopColor="#f8fafc" />
            <stop offset="1" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#cbd5e1" />
            <stop offset="0.5" stopColor="#94a3b8" />
            <stop offset="1" stopColor="#64748b" />
          </linearGradient>
          <radialGradient id={`${uid}-core`} cx="0.5" cy="0.5" r="0.5">
            <stop stopColor="#7dd3fc" />
            <stop offset="0.45" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#0284c7" />
          </radialGradient>
          <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse cx="100" cy="268" rx="58" ry="9" fill="#0ea5e9" opacity="0.12" />

        {/* Torso */}
        <ellipse
          cx="100"
          cy="168"
          rx="54"
          ry="62"
          fill={`url(#${uid}-body)`}
          stroke="#cbd5e1"
          strokeWidth="1.5"
        />
        <ellipse cx="100" cy="168" rx="48" ry="56" fill="#f8fafc" opacity="0.55" />

        {/* Chest core */}
        <motion.circle
          cx="100"
          cy="158"
          r="26"
          fill={`url(#${uid}-core)`}
          filter={`url(#${uid}-glow)`}
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.85, 1, 0.85], scale: [1, 1.04, 1] }
          }
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="100" cy="158" r="18" fill="#0ea5e9" opacity="0.35" />
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={88 + col * 8}
              y={146 + row * 8}
              width="5"
              height="5"
              rx="1"
              fill="#e0f2fe"
              opacity={0.35 + (row + col) * 0.08}
            />
          )),
        )}

        {/* Left arm (down) */}
        <g>
          <circle cx="52" cy="128" r="9" fill={`url(#${uid}-metal)`} stroke="#94a3b8" strokeWidth="1" />
          <path
            d="M48 132 L32 168 L38 172 L54 138 Z"
            fill="#f1f5f9"
            stroke="#cbd5e1"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="30" cy="170" r="7" fill={`url(#${uid}-metal)`} />
          <path
            d="M26 174 L18 198 L24 200 L34 178 Z"
            fill="#f8fafc"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />
          {/* Fingers */}
          <rect x="14" y="196" width="5" height="14" rx="2" fill="#e2e8f0" stroke="#cbd5e1" />
          <rect x="21" y="198" width="5" height="12" rx="2" fill="#e2e8f0" stroke="#cbd5e1" />
          <rect x="28" y="196" width="5" height="14" rx="2" fill="#e2e8f0" stroke="#cbd5e1" />
          <rect x="35" y="194" width="5" height="11" rx="2" fill="#e2e8f0" stroke="#cbd5e1" />
        </g>

        {/* Right arm (wave) */}
        <motion.g
          style={{ transformOrigin: "148px 128px", transformBox: "fill-box" }}
          animate={
            greeting && !reduceMotion
              ? { rotate: [-8, -52, -38, -48, -12] }
              : { rotate: -12 }
          }
          transition={
            greeting && !reduceMotion
              ? { duration: 0.75, repeat: Infinity, ease: "easeInOut" }
              : { type: "spring", stiffness: 260, damping: 24 }
          }
        >
          <circle cx="148" cy="128" r="9" fill={`url(#${uid}-metal)`} stroke="#94a3b8" strokeWidth="1" />
          <path
            d="M152 132 L168 108 L174 112 L158 138 Z"
            fill="#f1f5f9"
            stroke="#cbd5e1"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="172" cy="104" r="7" fill={`url(#${uid}-metal)`} />
          <path
            d="M176 100 L188 72 L194 76 L182 104 Z"
            fill="#f8fafc"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />
          {/* Open palm */}
          <ellipse cx="192" cy="64" rx="14" ry="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="180" y="58" width="5" height="16" rx="2" fill="#e2e8f0" stroke="#cbd5e1" />
          <rect x="187" y="54" width="5" height="18" rx="2" fill="#e2e8f0" stroke="#cbd5e1" />
          <rect x="194" y="56" width="5" height="17" rx="2" fill="#e2e8f0" stroke="#cbd5e1" />
          <rect x="201" y="60" width="5" height="14" rx="2" fill="#e2e8f0" stroke="#cbd5e1" />
          <rect x="206" y="66" width="4" height="10" rx="2" fill="#e2e8f0" stroke="#cbd5e1" />
        </motion.g>

        {/* Neck */}
        <rect x="88" y="108" width="24" height="14" rx="6" fill={`url(#${uid}-metal)`} />

        {/* Head */}
        <motion.g
          style={{ transformOrigin: "100px 72px", transformBox: "fill-box" }}
          animate={{ rotate: look.head }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
        >
          <circle cx="100" cy="72" r="44" fill={`url(#${uid}-head)`} stroke="#e2e8f0" strokeWidth="2" />
          <ellipse cx="100" cy="78" rx="36" ry="8" fill="#ffffff" opacity="0.45" />

          {/* Ear rings */}
          <motion.circle
            cx="54"
            cy="72"
            r="11"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            filter={`url(#${uid}-glow)`}
            animate={reduceMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="146"
            cy="72"
            r="11"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            filter={`url(#${uid}-glow)`}
            animate={reduceMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          />

          {/* Visor */}
          <path
            d="M58 68 Q100 54 142 68 Q142 90 100 96 Q58 90 58 68Z"
            fill="#111827"
            opacity="0.92"
          />
          <path
            d="M62 70 Q100 58 138 70"
            fill="none"
            stroke="#334155"
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Eyes */}
          <motion.g
            animate={{ x: look.eyeX, y: look.eyeY }}
            transition={{ type: "spring", stiffness: 520, damping: 30 }}
          >
            <rect x="72" y="72" width="22" height="18" rx="4" fill="#0ea5e9" opacity="0.25" />
            <rect x="106" y="72" width="22" height="18" rx="4" fill="#0ea5e9" opacity="0.25" />
            <rect x="76" y="76" width="14" height="12" rx="2" fill="#38bdf8" filter={`url(#${uid}-glow)`} />
            <rect x="110" y="76" width="14" height="12" rx="2" fill="#38bdf8" filter={`url(#${uid}-glow)`} />
            {[76, 80, 84, 110, 114, 118].map((x) => (
              <rect key={x} x={x} y={78} width="3" height="3" rx="0.5" fill="#e0f2fe" opacity="0.9" />
            ))}
            {[76, 84, 110, 118].map((x) => (
              <rect key={`b-${x}`} x={x} y={84} width="3" height="3" rx="0.5" fill="#bae6fd" opacity="0.7" />
            ))}
          </motion.g>
        </motion.g>
      </motion.svg>
    </div>
  );
}
