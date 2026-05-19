"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export type GalleryItem = {
  src: string;
  title: string;
  disclaimer?: string;
};

type Props = {
  items: GalleryItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  layoutIdPrefix: string;
};

export function ProjectGalleryRail({
  items,
  activeIndex,
  onSelect,
  layoutIdPrefix,
}: Props) {
  const reduceMotion = useReducedMotion();

  if (items.length <= 1) return null;

  return (
    <div className="relative mt-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#030304] to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#030304] to-transparent sm:w-16" />
      <div className="project-rail flex gap-4 overflow-x-auto pb-2 pt-1 pl-1">
        {items.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.button
              key={`${item.src}-${item.title}`}
              type="button"
              onClick={() => onSelect(i)}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              whileTap={{ scale: 0.97 }}
              className={`group relative shrink-0 snap-center overflow-hidden rounded-2xl border text-left transition-[border-color,box-shadow] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400/60 ${
                isActive
                  ? "border-sky-400/50 shadow-[0_0_40px_rgba(56,189,248,0.2)] ring-2 ring-sky-400/30"
                  : "border-white/10 opacity-70 hover:border-white/20 hover:opacity-100"
              }`}
              style={{ width: "min(42vw, 200px)" }}
            >
              <motion.div
                animate={{ scale: isActive ? 1.02 : 1 }}
                className="relative aspect-[9/16] bg-[#0a0a0c]"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="200px"
                  className="object-contain object-center p-0.5"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <p className="absolute inset-x-0 bottom-0 px-2.5 py-2 text-[11px] font-medium text-zinc-200">
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
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

