"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getLocalizedContent } from "@/i18n/getLocalizedContent";
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  type Locale,
} from "@/i18n/locales";
import type { LocaleContent } from "@/i18n/translations";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: LocaleContent;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === "en" || stored === "es") return stored;
  return DEFAULT_LOCALE;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = readStoredLocale();
    setLocaleState(stored);
    document.documentElement.lang = stored;
  }, []);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
      window.location.reload();
    },
    [locale],
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      content: getLocalizedContent(locale),
    }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
