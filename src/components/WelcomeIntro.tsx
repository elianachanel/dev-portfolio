"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

/** Mensaje principal — misma idea (bienvenida), ejecución más contundente */
const TITLE = "Welcome — this is my engineering portfolio.";

/** Tiempo total visible del intro (ms) */
const INTRO_DURATION_MS = 7000;

type Props = {
  reduceMotion: boolean | null;
  onComplete: () => void;
};

export function WelcomeIntro({ reduceMotion, onComplete }: Props) {
  const [titleShown, setTitleShown] = useState("");
  const [emailShown, setEmailShown] = useState("");
  const [titleDone, setTitleDone] = useState(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const clearTimers = () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };

    if (reduceMotion === true) {
      setTitleShown(TITLE);
      setEmailShown(profile.email);
      setTitleDone(true);
      const id = window.setTimeout(onComplete, INTRO_DURATION_MS);
      timersRef.current.push(id);
      return clearTimers;
    }

    let cancelled = false;
    let dismissed = false;
    const mountAt = Date.now();

    const finishIntro = () => {
      if (cancelled || dismissed) return;
      dismissed = true;
      onComplete();
    };

    const q = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timersRef.current.push(id);
    };

    /** Cierra el intro en el instante que cumpla INTRO_DURATION_MS desde el montaje */
    const scheduleDismissAfterFullDuration = () => {
      const elapsed = Date.now() - mountAt;
      const remaining = Math.max(0, INTRO_DURATION_MS - elapsed);
      q(finishIntro, remaining);
    };

    const hardCapId = window.setTimeout(finishIntro, INTRO_DURATION_MS);
    timersRef.current.push(hardCapId);

    let ti = 0;
    const typeTitle = () => {
      if (cancelled) return;
      ti += 1;
      setTitleShown(TITLE.slice(0, ti));
      if (ti < TITLE.length) {
        const burst = TITLE[ti - 1] === " " ? 55 : 22 + Math.random() * 38;
        q(typeTitle, burst);
      } else {
        setTitleDone(true);
        q(startEmail, 280);
      }
    };

    let ei = 0;
    const startEmail = () => {
      const typeEmail = () => {
        if (cancelled) return;
        ei += 1;
        setEmailShown(profile.email.slice(0, ei));
        if (ei < profile.email.length) {
          q(typeEmail, 18 + Math.random() * 28);
        } else {
          scheduleDismissAfterFullDuration();
        }
      };
      typeEmail();
    };

    q(typeTitle, 140);

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [reduceMotion, onComplete]);

  const titleTyping = titleShown.length < TITLE.length;
  const emailTyping = titleDone && emailShown.length < profile.email.length;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-40 flex min-h-0 flex-col items-center justify-center overflow-hidden bg-[#010203]"
    >
      {/* Negro puro + viñeta dura + azul cortante */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-30%,rgba(14,165,233,0.35),transparent_55%),radial-gradient(ellipse_80%_50%_at_100%_80%,rgba(56,189,248,0.08),transparent_50%),linear-gradient(180deg,#000_0%,#050a12_55%,#000_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.45] [background-image:linear-gradient(rgba(56,189,248,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.08)_1px,transparent_1px)] [background-size:32px_32px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.65)_100%)]"
      />

      {!reduceMotion && (
        <>
          <div
            aria-hidden
            className="welcome-scanlines pointer-events-none absolute inset-0 opacity-[0.11]"
          />
          <motion.div
            aria-hidden
            animate={{ top: ["-5%", "105%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent shadow-[0_0_20px_rgba(56,189,248,0.9)]"
          />
        </>
      )}

      <div className="relative z-10 flex max-w-[min(94vw,760px)] flex-col items-stretch px-5">
        <motion.div
          initial={{ opacity: 0, x: reduceMotion ? 0 : -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
          className="relative border-l-2 border-cyan-400 pl-4 sm:pl-5"
        >
          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] tracking-[0.14em] text-cyan-500/90 uppercase sm:text-[11px]">
            <span className="text-emerald-400/90">● ONLINE</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">
              <span className="text-cyan-400">$</span> ./portfolio —cold-boot
            </span>
          </div>

          {!reduceMotion && (
            <motion.span
              aria-hidden
              animate={{ opacity: [1, 0.35, 1], x: [0, -3, 2, 0] }}
              transition={{ duration: 0.12, repeat: 3, repeatDelay: 2.8 }}
              className="pointer-events-none absolute -left-[2px] top-8 bottom-1 w-[2px] bg-gradient-to-b from-cyan-400 via-cyan-400/40 to-transparent opacity-80"
            />
          )}

          <motion.h1
            className="font-mono text-[clamp(0.95rem,3.8vw,1.65rem)] leading-[1.45] font-semibold tracking-[-0.02em] text-zinc-50 sm:text-[clamp(1.1rem,3.2vw,1.95rem)]"
            animate={
              reduceMotion
                ? undefined
                : {
                    textShadow: [
                      "0 0 20px rgba(56,189,248,0.35)",
                      "0 0 28px rgba(56,189,248,0.55), 0 0 2px rgba(255,255,255,0.08)",
                      "0 0 20px rgba(56,189,248,0.35)",
                    ],
                  }
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-cyan-400/95">&gt;_ </span>
            <span className="text-sky-100">{titleShown}</span>
            {titleTyping ? (
              <span
                aria-hidden
                className="welcome-caret ml-0.5 inline-block h-[1.15em] w-[4px] translate-y-[0.06em] bg-cyan-300 align-middle shadow-[0_0_14px_rgba(103,232,249,1)]"
              />
            ) : null}
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{
            opacity: titleDone ? 1 : 0,
            scale: titleDone ? 1 : 0.97,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.28,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="mt-14 flex justify-center"
        >
          <div className="relative rounded-full border-2 border-cyan-400/55 bg-[rgba(2,8,18,0.55)] px-8 py-5 shadow-[0_0_0_1px_rgba(6,182,212,0.35)_inset,0_0_48px_rgba(56,189,248,0.22),0_16px_64px_rgba(0,0,0,0.85)] backdrop-blur-md sm:px-11 sm:py-6">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.22),transparent_55%)]"
            />

            <p className="relative z-[1] font-mono text-[0.78rem] tracking-[0.06em] text-cyan-100 sm:text-[0.92rem]">
              <span className="font-bold text-sky-500">MAIL</span>
              <span className="text-zinc-600"> :: </span>
              {emailTyping || emailShown.length < profile.email.length ? (
                <span className="break-all text-cyan-50">{emailShown}</span>
              ) : (
                <a
                  href={`mailto:${profile.email}`}
                  className="break-all text-cyan-50 underline decoration-cyan-500/50 underline-offset-[5px] transition hover:text-white hover:decoration-cyan-300"
                >
                  {emailShown}
                </a>
              )}
              {emailTyping ? (
                <span
                  aria-hidden
                  className="welcome-caret ml-1 inline-block h-[1.05em] w-[3px] bg-cyan-300 align-middle shadow-[0_0_10px_rgba(103,232,249,1)]"
                />
              ) : null}
            </p>
          </div>
        </motion.div>

        {!reduceMotion && (
          <motion.div
            aria-hidden
            animate={{ opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 0.85, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
            className="mt-12 text-center font-mono text-[10px] tracking-[0.32em] text-cyan-600 uppercase sm:text-[11px]"
          >
            [ HANDSHAKE ] SECURE_CHANNEL · BUFFER_FLUSH
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
