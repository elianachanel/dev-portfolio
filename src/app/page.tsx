"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useCallback, useState } from "react";
import { ExperienceShowcase } from "@/components/ExperienceShowcase";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { SiteNav } from "@/components/layout/SiteNav";
import { ProjectsShowcase } from "@/components/projects/ProjectsShowcase";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { WelcomeIntro } from "@/components/WelcomeIntro";
import { fadeUpItem, staggerContainer } from "@/lib/motion";
import { cv, profile } from "@/data/profile";

const cvFilePath = "/cv/Eliana-Batista-CV.pdf";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const dismissWelcome = useCallback(() => setShowWelcome(false), []);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

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
          <SiteNav />

          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8"
          >
            <HeroSection />

            <section id="work" className="scroll-mt-28 py-20 sm:py-24">
              <SectionHeader
                label="Strengths"
                title="How I work"
                description="End-to-end ownership across architecture, implementation, quality, and long-term maintainability—especially in regulated domains like banking and insurance."
              />
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              >
                {cv.whatIDo.map((card) => (
                  <motion.div
                    key={card}
                    variants={fadeUpItem}
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

            <section id="experience" className="scroll-mt-28 py-20 sm:py-24">
              <SectionHeader label="Experience" title="Career trajectory" />
              <ExperienceShowcase jobs={cv.experience} />
            </section>

            <ProjectsShowcase />

            <section id="skills" className="scroll-mt-28 py-20 sm:py-24">
              <SectionHeader label="Expertise" title="Technical stack" />
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="glass-panel-strong mt-12 rounded-[2rem] p-6 sm:p-10"
              >
                <motion.div className="space-y-10" variants={staggerContainer}>
                  {cv.skillGroups.map((group) => (
                    <motion.div key={group.label} variants={fadeUpItem}>
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
                  variants={fadeUpItem}
                  className="mt-10 rounded-2xl border border-white/[0.06] bg-black/30 p-5"
                >
                  <p className="section-label">Ecosystem</p>
                  <img
                    src="https://skillicons.dev/icons?i=react,nextjs,ts,js,firebase,nodejs,git,jest"
                    alt="Technology stack icons"
                    className="mt-4 h-auto w-full max-w-2xl opacity-90"
                    loading="lazy"
                  />
                </motion.div>
              </motion.div>
            </section>

            <section className="scroll-mt-28 py-20 sm:py-24">
              <SectionHeader label="Education" title="Learning & growth" />
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="mt-10 max-w-3xl space-y-4"
              >
                {cv.education.map((line) => (
                  <motion.li
                    key={line}
                    variants={fadeUpItem}
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
                className="glass-panel-strong relative overflow-hidden rounded-[2rem] p-8 sm:p-12 lg:p-14"
              >
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-500/15 blur-3xl"
                  animate={
                    reduceMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }
                  }
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <p className="section-label">Contact</p>
                <h2 className="mt-4 max-w-xl font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  Let&apos;s build something{" "}
                  <span className="gradient-text">exceptional</span>
                </h2>
                <p className="mt-5 max-w-lg text-zinc-400">
                  Open to senior engineering roles and impactful product collaborations.
                </p>

                <div className="mt-10 flex flex-wrap gap-3">
                  <Button href={`mailto:${profile.email}`} variant="primary">
                    Email me
                  </Button>
                  <Button href={cvFilePath} variant="outline">
                    Download CV
                  </Button>
                  <Button href={profile.linkedin} variant="ghost">
                    LinkedIn
                  </Button>
                </div>

                <div className="mt-14 grid gap-6 border-t border-white/[0.06] pt-12 lg:grid-cols-3">
                  <div>
                    <p className="section-label">Location</p>
                    <p className="mt-2 text-zinc-300">{cv.location}</p>
                    <a
                      href={`tel:${cv.phoneTel}`}
                      className="mt-2 block text-sm text-zinc-500 transition hover:text-sky-300"
                    >
                      {cv.phoneDisplay}
                    </a>
                  </div>
                  <div>
                    <p className="section-label">Languages</p>
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
                    <p className="section-label">Beyond code</p>
                    <ul className="mt-3 space-y-2 text-sm text-zinc-500">
                      {cv.additional.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>

              <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-center text-xs text-zinc-600 sm:flex-row sm:text-left">
                <p>© {new Date().getFullYear()} {cv.displayName}</p>
                <p className="font-mono tracking-wider">Engineered with Next.js · Framer Motion</p>
              </footer>
            </section>
          </motion.main>
        </>
      ) : null}
    </motion.div>
  );
}
