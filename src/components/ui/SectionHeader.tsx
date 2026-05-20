"use client";

import { motion } from "framer-motion";
import { fadeUpItem, staggerContainer } from "@/lib/motion";

type Props = {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
}: Props) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.header
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className={`max-w-3xl break-words-safe ${alignClass}`}
    >
      <motion.p variants={fadeUpItem} className="section-label">
        {label}
      </motion.p>
      <motion.h2
        variants={fadeUpItem}
        className="mt-4 font-[family-name:var(--font-syne)] text-[clamp(1.65rem,6vw,2.75rem)] font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={fadeUpItem}
          className="mt-5 text-[0.9375rem] leading-relaxed text-zinc-400 sm:text-base sm:text-lg"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.header>
  );
}
