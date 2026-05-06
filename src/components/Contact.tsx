"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

const contacts = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    label: "GitHub",
    value: profile.github.replace("https://", ""),
    href: profile.github,
  },
  {
    label: "LinkedIn",
    value: profile.linkedin.replace("https://", ""),
    href: profile.linkedin,
  },
];

export function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 pb-20 text-center sm:px-8"
    >
      <h3 className="text-sm tracking-[0.22em] text-muted uppercase">Contact</h3>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
        Open to impactful product roles and collaborations in mobile and web.
      </p>
      <div className="mt-8 flex w-full flex-col gap-3">
        {contacts.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
            className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-zinc-100"
          >
            <span className="mr-2 text-muted">{item.label}:</span>
            <span>{item.value}</span>
          </a>
        ))}
      </div>
    </motion.section>
  );
}
