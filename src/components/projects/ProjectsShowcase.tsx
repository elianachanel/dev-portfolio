"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FeaturedProjectBlock } from "@/components/projects/FeaturedProjectBlock";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cv } from "@/data/profile";

export function ProjectsShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="projects" className="relative scroll-mt-28 py-20 sm:py-28">
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
        label="Selected work"
        title="Products I've shipped"
        description="Toca cada miniatura o usa las flechas para explorar pantallas del producto."
        align="center"
      />

      <div className="relative mt-20 space-y-4 sm:mt-24">
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
