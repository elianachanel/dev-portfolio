"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const visuals = [
  { src: "/mobile-ui.svg", title: "Mobile app UI" },
  { src: "/web-client.svg", title: "Web client (restaurant discovery)" },
  { src: "/admin-dashboard.svg", title: "Admin dashboard" },
];

const features = [
  "Multi-user architecture (clients & restaurants)",
  "Real-time reservation system",
  "Restaurant discovery with filters and location",
  "Admin dashboard for operational management",
];

export function FeaturedProject() {
  return (
    <section
      id="featured-project"
      className="mx-auto w-full max-w-6xl px-6 pb-24 sm:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="rounded-3xl border border-white/10 bg-surface/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-10"
      >
        <p className="text-xs tracking-[0.22em] text-muted uppercase">
          Featured Project
        </p>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Restaurant Booking Platform
        </h3>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
          End-to-end platform (mobile + web) with multi-role architecture,
          enabling real-time reservations, restaurant discovery, and operational
          management.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["iOS", "Android", "Web", "Admin"].map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs tracking-wide text-zinc-300"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {visuals.map((visual) => (
            <motion.article
              key={visual.title}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f10] shadow-[0_14px_40px_rgba(0,0,0,0.35)] transition-shadow hover:shadow-[0_20px_46px_rgba(0,0,0,0.45)]"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.035 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full w-full"
                >
                  <Image
                    src={visual.src}
                    alt={visual.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 opacity-80" />
              </div>
              <p className="px-4 py-3 text-sm text-zinc-300">{visual.title}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h4 className="text-sm font-medium tracking-wide text-zinc-100 uppercase">
            Key features
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-zinc-300 sm:text-base">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
