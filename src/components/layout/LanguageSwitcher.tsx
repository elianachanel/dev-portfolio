"use client";

import { useLocale } from "@/context/LocaleProvider";
import type { Locale } from "@/i18n/locales";

const options: { id: Locale; label: string }[] = [
  { id: "en", label: "EN" },
  { id: "es", label: "ES" },
];

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex rounded-full border border-white/10 bg-black/30 p-0.5 ${className}`}
    >
      {options.map((opt) => {
        const active = locale === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => {
              if (!active) setLocale(opt.id);
            }}
            className={`focus-ring rounded-full px-2.5 py-1.5 font-mono text-[11px] font-semibold tracking-wide transition sm:px-3 ${
              active
                ? "bg-sky-500/20 text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
            aria-pressed={active}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
