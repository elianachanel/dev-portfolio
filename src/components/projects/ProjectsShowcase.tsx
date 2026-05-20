"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FeaturedProjectBlock } from "@/components/projects/FeaturedProjectBlock";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/context/LocaleProvider";

export function ProjectsShowcase() {
  const reduceMotion = useReducedMotion();
  const { content } = useLocale();
  const { sections, cv } = content;

  return (
    <section
      id="projects"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:scroll-mt-28 sm:py-20 lg:py-28"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-32 h-[480px] w-[min(100%,900px)] -translate-x-1/2 rounded-full bg-indigo-500/[0.07] blur-[120px]"
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <SectionHeader
        label={sections.projects.label}
        title={sections.projects.title}
        align="center"
      />

      <div className="relative mt-12 min-w-0 space-y-6 sm:mt-20 sm:space-y-8 lg:mt-24">
        {cv.featuredProjects.map((project, index) => (
          <FeaturedProjectBlock
            key={project.title}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
