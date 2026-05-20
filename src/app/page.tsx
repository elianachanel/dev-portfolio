"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { ExperienceShowcase } from "@/components/ExperienceShowcase";
import { SiteNav } from "@/components/layout/SiteNav";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { WelcomeIntro } from "@/components/WelcomeIntro";
import { useLocale } from "@/context/LocaleProvider";
import { cvFilePath, profile } from "@/data/profile";
import {
  fadeUpItem,
  fadeUpItemReduced,
  inViewOnce,
  scrollSpring,
  staggerContainer,
} from "@/lib/motion";

const AmbientBackground = dynamic(
  () =>
    import("@/components/layout/AmbientBackground").then((m) => ({
      default: m.AmbientBackground,
    })),
  { ssr: false },
);

const PortfolioRobot = dynamic(
  () =>
    import("@/components/mascot/PortfolioRobot").then((m) => ({
      default: m.PortfolioRobot,
    })),
  { ssr: false },
);

const ProjectsShowcase = dynamic(
  () =>
    import("@/components/projects/ProjectsShowcase").then((m) => ({
      default: m.ProjectsShowcase,
    })),
  { ssr: false, loading: () => <div className="min-h-[40vh]" aria-hidden /> },
);

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const dismissWelcome = useCallback(() => setShowWelcome(false), []);
  const reduceMotion = useReducedMotion();
  const motionItem = reduceMotion ? fadeUpItemReduced : fadeUpItem;
  const { content } = useLocale();
  const { cv, sections, footer } = content;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, scrollSpring);

  return (
    <motion.div id="top" className="relative min-h-screen bg-background">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-400"
      />

      <AnimatePresence mode="wait">
        {showWelcome ? (
          <WelcomeIntro
            key="welcome"
            reduceMotion={reduceMotion}
            onComplete={dismissWelcome}
          />
        ) : null}
      </AnimatePresence>

      {!showWelcome ? (
        <>
          <AmbientBackground />
          <PortfolioRobot />
          <SiteNav />

          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.32 }}
            className="page-shell relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
          >
            <HeroSection />

            <section id="work" className="scroll-mt-24 py-16 sm:scroll-mt-28 sm:py-20 lg:py-24">
              <SectionHeader
                label={sections.strengths.label}
                title={sections.strengths.title}
                description={sections.strengths.description}
              />
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={inViewOnce}
                className="mt-12 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4"
              >
                {cv.whatIDo.map((card) => (
                  <motion.div
                    key={card}
                    variants={motionItem}
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    className="glass-panel group rounded-2xl p-6 text-sm leading-relaxed text-zinc-400 transition hover:border-white/14 hover:text-zinc-200"
                  >
                    <span
                      aria-hidden
                      className="mb-4 block h-px w-8 bg-gradient-to-r from-sky-400 to-transparent transition-all group-hover:w-12"
                    />
                    {card}
                  </motion.div>
                ))}
              </motion.div>
            </section>

            <section id="experience" className="scroll-mt-24 py-16 sm:scroll-mt-28 sm:py-20 lg:py-24">
              <SectionHeader
                label={sections.experience.label}
                title={sections.experience.title}
              />
              <ExperienceShowcase jobs={cv.experience} />
            </section>

            <ProjectsShowcase />

            <section id="skills" className="scroll-mt-24 py-16 sm:scroll-mt-28 sm:py-20 lg:py-24">
              <SectionHeader
                label={sections.skills.label}
                title={sections.skills.title}
              />
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={inViewOnce}
                className="glass-panel-strong mt-12 rounded-[2rem] p-6 sm:p-10"
              >
                <motion.div className="space-y-10" variants={staggerContainer}>
                  {cv.skillGroups.map((group) => (
                    <motion.div key={group.label} variants={motionItem}>
                      <p className="section-label">{group.label}</p>
                      <div className="mt-4 flex flex-wrap gap-2.5">
                        {group.items.map((skill) => (
                          <motion.span
                            key={skill}
                            whileHover={{ y: -3, scale: 1.02 }}
                            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 transition hover:border-sky-400/30 hover:text-zinc-100"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  variants={motionItem}
                  className="mt-10 rounded-2xl border border-white/[0.06] bg-black/30 p-5"
                >
                  <p className="section-label">{sections.skills.ecosystem}</p>
                  <img
                    src="https://skillicons.dev/icons?i=react,nextjs,ts,js,firebase,nodejs,git,jest"
                    alt="Technology stack icons"
                    className="mt-4 h-auto w-full max-w-2xl opacity-90"
                    loading="lazy"
                  />
                </motion.div>
              </motion.div>
            </section>

            <section className="scroll-mt-24 py-16 sm:scroll-mt-28 sm:py-20 lg:py-24">
              <SectionHeader
                label={sections.education.label}
                title={sections.education.title}
              />
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={inViewOnce}
                className="mt-10 max-w-3xl space-y-4"
              >
                {cv.education.map((line) => (
                  <motion.li
                    key={line}
                    variants={motionItem}
                    className="glass-panel flex gap-4 rounded-2xl px-5 py-4 text-sm leading-relaxed text-zinc-400"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400"
                      aria-hidden
                    />
                    {line}
                  </motion.li>
                ))}
              </motion.ul>
            </section>

            <section id="contact" className="scroll-mt-28 pb-24 pt-8 sm:pb-32">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel-strong relative overflow-hidden rounded-2xl p-6 sm:rounded-[2rem] sm:p-10 lg:p-14"
              >
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-500/15 blur-3xl"
                  animate={
                    reduceMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }
                  }
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <p className="section-label">{sections.contact.label}</p>
                <h2 className="mt-4 max-w-xl break-words-safe font-[family-name:var(--font-syne)] text-[clamp(1.65rem,6vw,3rem)] font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  {sections.contact.title}{" "}
                  <span className="gradient-text">{sections.contact.titleAccent}</span>
                </h2>
                <p className="mt-5 max-w-lg text-zinc-400">{sections.contact.description}</p>

                <div className="mt-10 flex flex-wrap gap-3">
                  <Button href={`mailto:${profile.email}`} variant="primary">
                    {sections.contact.email}
                  </Button>
                  <Button href={cvFilePath} variant="outline">
                    {sections.contact.downloadCv}
                  </Button>
                  <Button href={profile.linkedin} variant="ghost">
                    {sections.contact.linkedin}
                  </Button>
                </div>

                <div className="mt-10 grid gap-6 border-t border-white/[0.06] pt-8 sm:mt-14 sm:pt-12 lg:grid-cols-3">
                  <div>
                    <p className="section-label">{sections.contact.location}</p>
                    <p className="mt-2 text-zinc-300">{cv.location}</p>
                    <a
                      href={`tel:${cv.phoneTel}`}
                      className="mt-2 block text-sm text-zinc-500 transition hover:text-sky-300"
                    >
                      {cv.phoneDisplay}
                    </a>
                  </div>
                  <div>
                    <p className="section-label">{sections.contact.languages}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {cv.languages.map((language) => (
                        <span
                          key={language}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-400"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                  <motion.div>
                    <p className="section-label">{sections.contact.beyond}</p>
                    <ul className="mt-3 space-y-2 text-sm text-zinc-500">
                      {cv.additional.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>

              <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-center text-xs text-zinc-600 sm:flex-row sm:text-left">
                <p>
                  © {new Date().getFullYear()} {cv.displayName}
                </p>
                <p className="font-mono tracking-wider">{footer}</p>
              </footer>
            </section>
          </motion.main>
        </>
      ) : null}
    </motion.div>
  );
}
