"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useCallback, useState } from "react";
import { ExperienceShowcase } from "@/components/ExperienceShowcase";
import { ProjectShowcaseCard } from "@/components/ProjectShowcaseCard";
import { SpaceshipAmbient } from "@/components/SpaceshipAmbient";
import { WelcomeIntro } from "@/components/WelcomeIntro";
import { cv, profile } from "@/data/profile";

const cvFilePath = "/cv/Eliana-Batista-CV.pdf";

const flatSkills = cv.skillGroups.flatMap((g) => g.items);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

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
    <div id="top" className="relative min-h-screen bg-background">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-accent"
      />
      <motion.div
        animate={{ opacity: [0.8, 1, 0.85] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" as const }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(56,189,248,0.09),transparent_38%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.05),transparent_32%)]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_0%,transparent_14%,transparent_86%,rgba(255,255,255,0.02)_100%)]" />
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <WelcomeIntro
            key="welcome"
            reduceMotion={reduceMotion}
            onComplete={dismissWelcome}
          />
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 mx-auto w-full max-w-7xl px-6 py-14 sm:px-8 sm:py-20"
          >
            <motion.section
              initial="hidden"
              animate="show"
              variants={container}
              className="rounded-[2rem] border border-white/10 bg-[#101012]/85 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10 lg:p-14"
            >
              <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                <motion.div variants={item} className="text-center lg:text-left">
                  <motion.h1
                    variants={item}
                    className="text-5xl leading-[1.02] font-semibold tracking-tight text-foreground sm:text-7xl lg:text-8xl"
                  >
                    {cv.displayName}
                  </motion.h1>
                  <motion.p
                    variants={item}
                    className="mt-6 text-base font-medium tracking-wide text-accent sm:text-xl"
                  >
                    {cv.title}
                  </motion.p>
                  <motion.p variants={item} className="mt-7 max-w-2xl text-zinc-300">
                    {cv.summary}
                  </motion.p>
                  <motion.div variants={item} className="mt-7">
                    <a
                      href={cvFilePath}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm text-zinc-100 transition hover:bg-white/[0.12]"
                    >
                      Download CV
                    </a>
                  </motion.div>
                  <motion.div
                    variants={item}
                    className="mt-8 grid gap-3 sm:grid-cols-3"
                  >
                    {cv.impactHighlights.map((highlight) => (
                      <div
                        key={highlight.value}
                        className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left"
                      >
                        <p className="text-lg font-semibold text-zinc-100">
                          {highlight.value}
                        </p>
                        <p className="text-xs text-zinc-400">{highlight.label}</p>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={item}
                  whileHover={{ y: -5 }}
                  className="mx-auto w-full max-w-sm rounded-3xl border border-white/10 bg-black/25 p-5 shadow-[0_18px_44px_rgba(0,0,0,0.42)]"
                >
                  <p className="text-xs tracking-[0.2em] text-muted uppercase">Profile</p>
                  <motion.div
                    className="relative mt-6 flex justify-center pb-1 [perspective:1000px]"
                    animate={
                      reduceMotion
                        ? undefined
                        : { y: [0, -7, 0], rotateY: [0, 2.5, 0] }
                    }
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut" as const,
                    }}
                  >
                    <motion.div
                      className="relative grid size-[min(300px,88vw)] place-items-center [transform-style:preserve-3d]"
                      initial={{ opacity: 0, scale: 0.88, rotateX: 16 }}
                      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 210,
                        damping: 22,
                        delay: 0.18,
                      }}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              rotateY: -10,
                              rotateX: 8,
                              scale: 1.04,
                              transition: {
                                type: "spring",
                                stiffness: 280,
                                damping: 18,
                              },
                            }
                      }
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 flex items-center justify-center"
                      >
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <span
                              className={
                                reduceMotion
                                  ? "aspect-square w-[68%] rounded-full border border-accent/12 opacity-25"
                                  : "avatar-wave-ring aspect-square w-[74%] rounded-full border border-accent/45"
                              }
                              style={
                                reduceMotion
                                  ? undefined
                                  : { animationDelay: `${i * 0.82}s` }
                              }
                            />
                          </span>
                        ))}
                      </div>
                      <div className="avatar-face-glow relative z-[1] size-[236px] shrink-0 overflow-hidden rounded-full border border-white/[0.14] bg-[#141416] ring-2 ring-accent/35 ring-offset-2 ring-offset-[#0e0e10] sm:size-[268px]">
                        <Image
                          src={cv.profilePhotoSrc}
                          alt="Eliana Batista profile photo"
                          fill
                          sizes="(max-width:640px) 236px, 268px"
                          className="object-cover object-[center_20%] scale-[0.9]"
                          priority
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                  <p className="mt-4 text-sm text-zinc-200">{cv.profileCardName}</p>
                  <p className="mt-1 text-xs text-zinc-400">{cv.location}</p>
                  <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                    <a className="block hover:text-zinc-300" href={`mailto:${profile.email}`}>
                      {profile.email}
                    </a>
                    <a className="mt-1 block hover:text-zinc-300" href={`tel:${cv.phoneTel}`}>
                      {cv.phoneDisplay}
                    </a>
                  </p>
                </motion.div>
              </section>

              <motion.section
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={container}
                className="mt-14"
              >
                <motion.p
                  variants={item}
                  className="text-xs tracking-[0.22em] text-muted uppercase"
                >
                  Strengths
                </motion.p>
                <motion.h2
                  variants={item}
                  className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
                >
                  How I work
                </motion.h2>
                <motion.p variants={item} className="mt-4 max-w-3xl text-zinc-300">
                  End-to-end ownership across architecture, implementation, quality,
                  and long-term maintainability—especially in regulated domains like
                  banking and insurance.
                </motion.p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {cv.whatIDo.map((card, index) => (
                    <motion.div
                      key={card}
                      variants={item}
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.25, delay: index * 0.03 }}
                      className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-zinc-300"
                    >
                      {card}
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              <motion.section
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.12 }}
                variants={container}
                className="mt-14"
              >
                <motion.p
                  variants={item}
                  className="text-xs tracking-[0.22em] text-muted uppercase"
                >
                  Experience
                </motion.p>
                <motion.h2
                  variants={item}
                  className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
                >
                  Career
                </motion.h2>
                <ExperienceShowcase jobs={cv.experience} />
              </motion.section>

              <motion.section
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={container}
                className="mt-14"
              >
                <motion.p
                  variants={item}
                  className="text-xs tracking-[0.22em] text-muted uppercase"
                >
                  Projects
                </motion.p>
                {cv.featuredProjects.map((project, projectIndex) => (
                  <div
                    key={project.title}
                    className={
                      projectIndex > 0
                        ? "mt-16 border-t border-white/[0.08] pt-16"
                        : "mt-3"
                    }
                  >
                    <motion.h3
                      variants={item}
                      className="text-3xl font-semibold tracking-tight sm:text-4xl"
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      variants={item}
                      className="mt-2 text-sm font-medium text-accent"
                    >
                      {project.subtitle}
                    </motion.p>
                    <motion.p variants={item} className="mt-4 max-w-3xl text-zinc-300">
                      {project.intro}
                    </motion.p>
                    <motion.ul
                      variants={item}
                      className="mt-4 max-w-3xl list-inside list-disc space-y-2 text-sm text-zinc-400 marker:text-accent md:list-outside"
                    >
                      {project.bullets.map((b) => (
                        <li key={b} className="pl-1">
                          {b}
                        </li>
                      ))}
                    </motion.ul>
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                      {project.gallery.map((visual, galleryIndex) => (
                        <ProjectShowcaseCard
                          key={`${project.title}-${visual.title}`}
                          src={visual.src}
                          title={visual.title}
                          disclaimer={"disclaimer" in visual ? visual.disclaimer : undefined}
                          index={projectIndex * 12 + galleryIndex}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.section>

              <motion.section
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={container}
                className="mt-14"
              >
                <motion.div
                  variants={item}
                  className="rounded-3xl border border-white/10 bg-surface/70 p-6"
                >
                  <h3 className="text-xs tracking-[0.22em] text-muted uppercase">
                    Technical skills
                  </h3>
                  <div className="mt-6 space-y-6">
                    {cv.skillGroups.map((group) => (
                      <div key={group.label}>
                        <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                          {group.label}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2.5">
                          {group.items.map((skill) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, y: 8 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, amount: 0.6 }}
                              transition={{
                                duration: 0.3,
                                delay: flatSkills.indexOf(skill) * 0.02,
                              }}
                              whileHover={{ y: -2 }}
                              className="rounded-full border border-white/10 bg-[#111] px-4 py-2 text-sm text-zinc-200"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs tracking-[0.2em] text-muted uppercase">
                      Technologies
                    </p>
                    <img
                      src="https://skillicons.dev/icons?i=react,nextjs,ts,js,firebase,nodejs,git,jest"
                      alt="Programming technology icons"
                      className="mt-3 h-auto w-full"
                    />
                  </div>
                </motion.div>
              </motion.section>

              <motion.section
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={container}
                className="mt-14"
              >
                <motion.p
                  variants={item}
                  className="text-xs tracking-[0.22em] text-muted uppercase"
                >
                  Education & Certifications
                </motion.p>
                <motion.h3
                  variants={item}
                  className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
                >
                  Learning
                </motion.h3>
                <motion.ul
                  variants={item}
                  className="mt-6 max-w-3xl list-inside list-disc space-y-2.5 text-sm leading-relaxed text-zinc-300 marker:text-accent md:list-outside"
                >
                  {cv.education.map((line) => (
                    <li key={line} className="pl-1">
                      {line}
                    </li>
                  ))}
                </motion.ul>
              </motion.section>

              <motion.section
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={container}
                className="mt-14 grid gap-6 lg:grid-cols-3"
              >
                <motion.div
                  variants={item}
                  className="rounded-3xl border border-white/10 bg-surface/70 p-6"
                >
                  <h3 className="text-xs tracking-[0.22em] text-muted uppercase">
                    Contact
                  </h3>
                  <div className="mt-4 space-y-2 text-sm text-zinc-300">
                    <p>{cv.location}</p>
                    <a className="block hover:text-zinc-100" href={`mailto:${profile.email}`}>
                      {profile.email}
                    </a>
                    <a className="block hover:text-zinc-100" href={`tel:${cv.phoneTel}`}>
                      {cv.phoneDisplay}
                    </a>
                    <a
                      className="inline-flex w-fit rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs text-zinc-100 transition hover:bg-white/[0.12]"
                      href={cvFilePath}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download CV
                    </a>
                    <a
                      className="block hover:text-zinc-100"
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {profile.github.replace("https://", "")}
                    </a>
                    <a
                      className="block hover:text-zinc-100"
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {profile.linkedin.replace("https://", "")}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  variants={item}
                  className="rounded-3xl border border-white/10 bg-black/20 p-6 lg:text-left"
                >
                  <motion.p
                    variants={item}
                    className="text-xs tracking-[0.22em] text-muted uppercase"
                  >
                    Languages
                  </motion.p>
                  <motion.div
                    variants={item}
                    className="mt-4 flex flex-wrap justify-center gap-2.5 lg:justify-start"
                  >
                    {cv.languages.map((language) => (
                      <span
                        key={language}
                        className="rounded-full border border-white/10 bg-[#111] px-4 py-2 text-sm text-zinc-200"
                      >
                        {language}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={item}
                  className="rounded-3xl border border-white/10 bg-black/20 p-6"
                >
                  <motion.p
                    variants={item}
                    className="text-xs tracking-[0.22em] text-muted uppercase"
                  >
                    Beyond code
                  </motion.p>
                  <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-zinc-300 marker:text-accent">
                    {cv.additional.map((line) => (
                      <li key={line} className="pl-1">
                        {line}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.section>
            </motion.section>
          </motion.main>
        )}
      </AnimatePresence>
      {!showWelcome ? <SpaceshipAmbient reduceMotion={reduceMotion} /> : null}
    </div>
  );
}
