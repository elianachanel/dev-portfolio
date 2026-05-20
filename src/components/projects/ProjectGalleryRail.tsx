"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

export type GalleryItem = {
  src: string;
  title: string;
  disclaimer?: string;
  frame?: "phone" | "browser";
};

type Props = {
  items: GalleryItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  layoutIdPrefix: string;
  mobileLayout?: boolean;
};

export function ProjectGalleryRail({
  items,
  activeIndex,
  onSelect,
  layoutIdPrefix,
  mobileLayout = false,
}: Props) {
  const reduceMotion = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hasMountedRef = useRef(false);

  const scrollRailToIndex = useCallback(
    (index: number) => {
      const rail = railRef.current;
      const el = itemRefs.current[index];
      if (!rail || !el) return;

      const maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth);
      const target = Math.min(
        maxScroll,
        Math.max(0, el.offsetLeft - (rail.clientWidth - el.offsetWidth) / 2),
      );

      rail.scrollTo({
        left: target,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [reduceMotion],
  );

  const handleSelect = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      onSelect(index);
      requestAnimationFrame(() => scrollRailToIndex(index));
    },
    [activeIndex, onSelect, scrollRailToIndex],
  );

  /** Centra la miniatura solo tras interacción (flechas del bloque), nunca al montar la página */
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    scrollRailToIndex(activeIndex);
  }, [activeIndex, scrollRailToIndex]);

  if (items.length <= 1) return null;

  const thumbWidth = mobileLayout
    ? "min(30vw, 132px)"
    : "min(38vw, 180px)";

  return (
    <div className="relative mt-8">
      <motion.div
        className="mb-3 flex items-center justify-between gap-3 px-1"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
          Toca una pantalla para verla arriba
        </p>
        <p className="font-mono text-[11px] tabular-nums text-zinc-600">
          {activeIndex + 1} / {items.length}
        </p>
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-6 left-0 z-10 w-8 bg-gradient-to-r from-[#030304] to-transparent sm:w-12"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-6 right-0 z-10 w-8 bg-gradient-to-l from-[#030304] to-transparent sm:w-12"
      />

      <div
        ref={railRef}
        className="project-rail -mx-1 flex gap-3 overflow-x-auto overscroll-x-contain px-1 pb-3 pt-1 sm:gap-4"
      >
        {items.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={`${item.src}-${item.title}`}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              type="button"
              aria-label={`Ver pantalla: ${item.title}`}
              aria-pressed={isActive}
              onClick={() => handleSelect(i)}
              className={`relative shrink-0 snap-center overflow-hidden rounded-3xl border text-left transition-[border-color,box-shadow,opacity,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400/60 active:scale-[0.98] ${
                isActive
                  ? "border-sky-400/50 opacity-100 shadow-[0_0_40px_rgba(56,189,248,0.2)] ring-2 ring-sky-400/30"
                  : "border-white/10 opacity-70 hover:border-white/25 hover:opacity-100"
              }`}
              style={{ width: thumbWidth }}
            >
              <motion.div
                className="relative aspect-[9/16] overflow-hidden rounded-[1.35rem] bg-[#0a0a0c]"
                animate={{ scale: isActive ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  loading="lazy"
                  quality={55}
                  sizes={mobileLayout ? "132px" : "180px"}
                  className="object-contain object-center p-0.5"
                  draggable={false}
                />
                <motion.div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"
                />
                <p className="pointer-events-none absolute inset-x-0 bottom-0 px-2.5 py-2 text-[10px] font-medium leading-tight text-zinc-200 sm:text-[11px]">
                  {item.title}
                </p>
              </motion.div>
              {isActive ? (
                <motion.span
                  layoutId={`${layoutIdPrefix}-glow`}
                  className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-sky-300/40"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
