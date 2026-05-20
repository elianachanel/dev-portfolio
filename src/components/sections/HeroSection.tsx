"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/context/LocaleProvider";
import { cvFilePath, profile } from "@/data/profile";
import { fadeUpItem, staggerContainer } from "@/lib/motion";

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const { content } = useLocale();
  const { cv, hero } = content;

  return (
    <section
      id="about"
      className="relative min-h-[min(100dvh,920px)] scroll-mt-24 overflow-hidden pt-24 pb-12 sm:scroll-mt-28 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-20"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
      >
        <motion.div variants={fadeUpItem} className="text-center lg:text-left">
          <motion.h1
            variants={fadeUpItem}
            className="break-words-safe font-[family-name:var(--font-syne)] text-[clamp(2.25rem,10vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em]"
          >
            <span className="gradient-text block">{cv.displayName}</span>
          </motion.h1>

          <motion.p
            variants={fadeUpItem}
            className="mt-6 text-lg font-medium tracking-tight text-sky-400/90 sm:text-xl"
          >
            {cv.title}
          </motion.p>

          <motion.p
            variants={fadeUpItem}
            className="mx-auto mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-zinc-400 sm:text-base sm:text-lg lg:mx-0"
          >
            {cv.summary}
          </motion.p>

          <motion.div
            variants={fadeUpItem}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <Button href="#projects" variant="primary">
              {hero.viewWork}
            </Button>
            <Button href={cvFilePath} variant="outline">
              {hero.downloadCv}
            </Button>
            <Button href={profile.github} variant="ghost">
              {hero.github}
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUpItem}
            className="mt-12 grid gap-3 sm:grid-cols-3"
          >
            {cv.impactHighlights.map((highlight, i) => (
              <motion.div
                key={highlight.value}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 + i * 0.05, duration: 0.36 }}
                className="glass-panel group rounded-2xl p-4 text-left transition hover:border-white/15"
              >
                <p className="font-[family-name:var(--font-syne)] text-xl font-semibold text-zinc-50">
                  {highlight.value}
                </p>
                <p className="mt-1 text-xs leading-snug text-zinc-500">{highlight.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUpItem} className="relative mx-auto w-full max-w-md">
          <motion.div
            className="glass-panel-strong relative overflow-hidden rounded-[2rem] p-6 sm:p-8"
            whileHover={reduceMotion ? undefined : { y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-sky-500/20 blur-3xl"
            />
            <p className="section-label">{hero.profile}</p>

            <motion.div
              className="relative mt-8 flex justify-center [perspective:1000px]"
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative grid size-[min(280px,78vw)] place-items-center">
                {!reduceMotion &&
                  [0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="avatar-wave-ring pointer-events-none absolute aspect-square w-[76%] rounded-full border border-sky-400/40"
                      style={{ animationDelay: `${i * 0.85}s` }}
                      aria-hidden
                    />
                  ))}
                <motion.div
                  className="avatar-face-glow relative z-[1] size-[min(200px,52vw)] overflow-hidden rounded-full border border-white/15 bg-zinc-900 ring-2 ring-sky-400/30 ring-offset-2 ring-offset-[#0a0a0c] sm:size-[220px] sm:ring-offset-4 lg:size-[260px]"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.2 }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { scale: 1.03, rotateY: -6, rotateX: 4 }
                  }
                >
                  <Image
                    src={cv.profilePhotoSrc}
                    alt={cv.displayName}
                    fill
                    sizes="(max-width:640px) 220px, 260px"
                    className="object-cover object-[center_20%] scale-[0.9]"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>

            <div className="relative mt-6 text-center">
              <p className="font-[family-name:var(--font-syne)] text-lg font-semibold text-zinc-100">
                {cv.profileCardName}
              </p>
              <p className="mt-1 text-sm text-zinc-500">{cv.location}</p>
              <div className="mt-4 flex flex-col gap-1 text-sm text-zinc-400">
                <a
                  href={`mailto:${profile.email}`}
                  className="transition hover:text-sky-300"
                >
                  {profile.email}
                </a>
                <a href={`tel:${cv.phoneTel}`} className="transition hover:text-sky-300">
                  {cv.phoneDisplay}
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            aria-hidden
            className="absolute -bottom-4 -left-4 -z-10 h-32 w-32 rounded-full bg-indigo-500/15 blur-2xl"
            animate={reduceMotion ? undefined : { scale: [1, 1.15, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-zinc-600 lg:flex"
        aria-hidden
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">{hero.scroll}</span>
        <motion.span
          className="h-10 w-px bg-gradient-to-b from-zinc-500 to-transparent"
          animate={reduceMotion ? undefined : { scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </section>
  );
}
