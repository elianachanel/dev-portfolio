"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useState } from "react";
import { useLocale } from "@/context/LocaleProvider";
import { ProjectDeviceFrame } from "@/components/projects/ProjectDeviceFrame";
import {
  ProjectGalleryRail,
  type GalleryItem,
} from "@/components/projects/ProjectGalleryRail";
import {
  resolveGalleryFrame,
  type GalleryDevice,
} from "@/components/projects/resolveGalleryFrame";
import { useIsMobileLayout } from "@/hooks/useMediaQuery";
import { easeOutExpo } from "@/lib/motion";

export type FeaturedProject = {
  title: string;
  subtitle: string;
  highlight: string;
  tags: string[];
  intro: string;
  bullets: string[];
  gallery: GalleryItem[];
  galleryDevice?: GalleryDevice;
};

type Props = {
  project: FeaturedProject;
  index: number;
};

export function FeaturedProjectBlock({ project, index }: Props) {
  const { content } = useLocale();
  const { projects: projectUi } = content;
  const reduceMotion = useReducedMotion();
  const isMobileLayout = useIsMobileLayout();
  const [activeShot, setActiveShot] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const reversed = index % 2 === 1;

  const active = project.gallery[activeShot] ?? project.gallery[0];
  const frameVariant = resolveGalleryFrame(active, project.galleryDevice);
  const isMobileGallery = project.galleryDevice === "mobile";
  const hasMultipleShots = project.gallery.length > 1;
  const galleryLength = project.gallery.length;

  const selectShot = (shotIndex: number) => {
    setActiveShot(shotIndex);
  };

  const goToPrev = () => {
    setActiveShot((current) => Math.max(0, current - 1));
  };

  const goToNext = () => {
    setActiveShot((current) => Math.min(galleryLength - 1, current + 1));
  };

  return (
    <motion.article
      className="relative overflow-hidden py-10 sm:py-12 lg:py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.05 }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-4 right-0 max-w-full select-none overflow-hidden font-[family-name:var(--font-syne)] text-[clamp(2.5rem,14vw,11rem)] font-bold leading-none tracking-tighter text-white/[0.03] sm:-top-6"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        className={`grid min-w-0 grid-cols-1 items-start gap-8 sm:gap-10 lg:gap-14 xl:gap-20 ${
          reversed ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-[0.9fr_1.1fr]"
        }`}
      >
        <div
          className={`relative order-2 min-w-0 ${reversed ? "lg:order-2" : "lg:order-none"}`}
        >
          <div className="relative min-w-0">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-sky-500/15 via-transparent to-indigo-500/10 blur-2xl"
            />

            <div className="relative z-10">
              {hasMultipleShots ? (
                <div className="mx-auto flex w-full max-w-full items-center justify-center gap-1.5 px-0.5 sm:gap-3 lg:gap-4">
                  <button
                    type="button"
                    aria-label={projectUi.prev}
                    onClick={goToPrev}
                    aria-disabled={activeShot === 0}
                    className={`focus-ring relative z-30 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#0a0a0c]/90 text-lg text-zinc-200 shadow-lg backdrop-blur-md transition hover:border-sky-400/40 hover:text-white sm:h-11 sm:w-11 lg:h-12 lg:w-12 lg:text-xl ${
                      activeShot === 0
                        ? "pointer-events-none opacity-30"
                        : ""
                    }`}
                  >
                    ‹
                  </button>

                  <div className="min-w-0 flex-1">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active.src}
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ProjectDeviceFrame
                          src={active.src}
                          alt={active.title}
                          priority={index === 0 && activeShot === 0}
                          variant={frameVariant}
                          skipEntrance
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <button
                    type="button"
                    aria-label={projectUi.next}
                    onClick={goToNext}
                    aria-disabled={activeShot === project.gallery.length - 1}
                    className={`focus-ring relative z-30 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#0a0a0c]/90 text-lg text-zinc-200 shadow-lg backdrop-blur-md transition hover:border-sky-400/40 hover:text-white sm:h-11 sm:w-11 lg:h-12 lg:w-12 lg:text-xl ${
                      activeShot === project.gallery.length - 1
                        ? "pointer-events-none opacity-30"
                        : ""
                    }`}
                  >
                    ›
                  </button>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.src}
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProjectDeviceFrame
                      src={active.src}
                      alt={active.title}
                      priority={index === 0 && activeShot === 0}
                      variant={frameVariant}
                      skipEntrance
                    />
                  </motion.div>
                </AnimatePresence>
              )}

              {hasMultipleShots ? (
                <p className="mt-4 text-center font-mono text-xs tabular-nums text-zinc-500">
                  {activeShot + 1} / {project.gallery.length}
                </p>
              ) : null}
            </div>

            {active.disclaimer ? (
              <p className="mt-4 text-center text-[11px] leading-snug text-zinc-500">
                {active.disclaimer}
              </p>
            ) : null}
          </div>

          <ProjectGalleryRail
            items={project.gallery}
            activeIndex={activeShot}
            onSelect={selectShot}
            layoutIdPrefix={`project-rail-${index}`}
            mobileLayout={isMobileGallery}
          />
        </div>

        <div
          className={`order-1 min-w-0 lg:sticky lg:top-28 lg:self-start ${
            reversed ? "lg:order-1" : "lg:order-none"
          }`}
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: reversed ? 24 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: easeOutExpo }}
          >
            <p className="font-mono text-xs tracking-[0.2em] text-sky-400/90">
              {projectUi.label} · {String(index + 1).padStart(2, "0")}
            </p>

            <h3 className="mt-4 break-words-safe font-[family-name:var(--font-syne)] text-[clamp(1.75rem,6vw,3.25rem)] font-bold leading-[1.08] tracking-tight">
              <span className="gradient-text">{project.title}</span>
            </h3>

            <p className="mt-3 text-sm font-medium text-zinc-500">{project.subtitle}</p>

            <motion.p
              className="mt-6 text-base font-medium leading-snug text-zinc-200 sm:text-lg lg:text-xl"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              {project.highlight}
            </motion.p>

            <motion.div
              className="mt-6 flex flex-wrap gap-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05 } },
              }}
            >
              {project.tags.map((tag) => (
                <motion.span
                  key={tag}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    show: { opacity: 1, scale: 1 },
                  }}
                  whileHover={{ y: -2, scale: 1.04 }}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-zinc-300 backdrop-blur-sm"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              className="mt-8 max-w-md text-sm leading-relaxed text-zinc-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              {project.intro}
            </motion.p>

            <motion.button
              type="button"
              onClick={() => setDetailsOpen((v) => !v)}
              className="focus-ring mt-8 flex items-center gap-2 text-sm font-medium text-sky-400/90 transition hover:text-sky-300"
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                animate={{ rotate: detailsOpen ? 90 : 0 }}
                transition={{ duration: 0.25 }}
                className="inline-block text-lg leading-none"
              >
                →
              </motion.span>
              {detailsOpen ? projectUi.hideDetails : projectUi.showDetails}
            </motion.button>

            <AnimatePresence>
              {detailsOpen ? (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                  className="mt-4 space-y-3 overflow-hidden border-l border-sky-400/30 pl-4"
                >
                  {project.bullets.map((b, i) => (
                    <motion.li
                      key={b}
                      initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="text-sm leading-relaxed text-zinc-400"
                    >
                      {b}
                    </motion.li>
                  ))}
                </motion.ul>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
