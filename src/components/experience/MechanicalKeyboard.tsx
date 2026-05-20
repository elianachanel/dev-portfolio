"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
const ROWS: string[][] = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
  ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
];

const KEY_TO_CHAR: Record<string, string> = {
  ";": ";",
  "'": "'",
  ",": ",",
  ".": ".",
  "/": "/",
  "[": "[",
  "]": "]",
  "-": "-",
  "=": "=",
  "`": "`",
};

function charForKey(key: string) {
  if (KEY_TO_CHAR[key]) return KEY_TO_CHAR[key];
  if (key.length === 1 && /[a-z]/i.test(key)) return key.toLowerCase();
  return key;
}

/** Always English — matches dev workflow regardless of site locale */
const KEYBOARD_PROMPT = "building portfolio…";
const KEYBOARD_CODE_SNIPPETS = [
  "const ship = async () => {",
  "  await deploy();",
  "  return 'live';",
  "};",
  "export default Portfolio;",
  "// React Native + Next.js",
] as const;

export function MechanicalKeyboard({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  const fullText = useMemo(() => KEYBOARD_CODE_SNIPPETS.join("\n"), []);
  const [typed, setTyped] = useState("");
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    setTyped("");
    setLineIndex(0);
    setActiveKey(null);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setTyped(fullText);
      return;
    }

    let index = 0;
    let timeout: number;

    const typeNext = () => {
      if (index >= fullText.length) {
        timeout = window.setTimeout(() => {
          setTyped("");
          setLineIndex(0);
          setActiveKey(null);
          index = 0;
          typeNext();
        }, 900);
        return;
      }

      const char = fullText[index];
      if (char === "\n") {
        setLineIndex((l) => l + 1);
        setActiveKey("Enter");
      } else if (char === " ") {
        setActiveKey("Space");
      } else {
        const match = ROWS.flat().find(
          (k) => charForKey(k) === char || k.toLowerCase() === char,
        );
        setActiveKey(match ?? null);
      }

      setTyped(fullText.slice(0, index + 1));
      index += 1;
      timeout = window.setTimeout(typeNext, char === "\n" ? 90 : 22 + Math.random() * 18);
    };

    timeout = window.setTimeout(typeNext, 280);
    return () => window.clearTimeout(timeout);
  }, [fullText, reduceMotion]);

  const displayLines = typed.split("\n");

  return (
    <div
      className={`flex flex-col items-center ${className}`}
      aria-hidden
    >
      <div className="glass-panel w-full max-w-[280px] rounded-2xl border border-white/10 p-4 shadow-[0_20px_60px_rgba(56,189,248,0.12)]">
        <div className="mb-3 flex items-center gap-2 border-b border-white/[0.06] pb-2">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-amber-400/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
          <span className="ml-auto font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
            {KEYBOARD_PROMPT}
          </span>
        </div>
        <pre className="min-h-[5.5rem] font-mono text-[10px] leading-relaxed text-sky-300/90 sm:text-[11px]">
          {displayLines.map((line, i) => (
            <span key={`${i}-${line}`} className="block">
              {line}
              {i === lineIndex && !reduceMotion ? (
                <motion.span
                  className="ml-0.5 inline-block h-[1em] w-[6px] bg-cyan-400 align-middle"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              ) : null}
            </span>
          ))}
        </pre>
      </div>

      <div className="mt-4 w-full max-w-[300px] rounded-2xl bg-[#0c0d10] p-3 ring-1 ring-white/[0.08]">
        <div className="space-y-1.5">
          {ROWS.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-center gap-1"
              style={{ paddingLeft: rowIndex * 6 }}
            >
              {row.map((key) => {
                const isActive = activeKey === key;
                return (
                  <motion.span
                    key={key}
                    className={`flex h-7 min-w-[1.35rem] items-center justify-center rounded-md border px-1 font-mono text-[9px] font-medium sm:h-8 sm:min-w-[1.5rem] sm:text-[10px] ${
                      isActive
                        ? "border-sky-400/60 bg-sky-500/25 text-sky-100 shadow-[0_0_16px_rgba(56,189,248,0.45)]"
                        : "border-white/[0.08] bg-[#15171c] text-zinc-500"
                    }`}
                    animate={
                      isActive && !reduceMotion
                        ? { y: 2, scale: 0.96 }
                        : { y: 0, scale: 1 }
                    }
                    transition={{ duration: 0.06 }}
                  >
                    {key}
                  </motion.span>
                );
              })}
            </div>
          ))}
          <div className="flex justify-center gap-1 pt-0.5">
            <motion.span
              className={`h-7 flex-1 max-w-[4.5rem] rounded-md border font-mono text-[9px] ${
                activeKey === "Tab"
                  ? "border-sky-400/50 bg-sky-500/20 text-sky-200"
                  : "border-white/[0.08] bg-[#15171c] text-zinc-600"
              }`}
            >
              Tab
            </motion.span>
            <motion.span
              animate={
                activeKey === "Space" && !reduceMotion
                  ? { y: 2, scale: 0.98 }
                  : { y: 0, scale: 1 }
              }
              className={`flex h-7 flex-[2.2] items-center justify-center rounded-md border font-mono text-[9px] ${
                activeKey === "Space"
                  ? "border-sky-400/60 bg-sky-500/25 text-sky-200"
                  : "border-white/[0.08] bg-[#15171c] text-zinc-600"
              }`}
            >
              space
            </motion.span>
            <motion.span
              animate={
                activeKey === "Enter" && !reduceMotion
                  ? { y: 2, scale: 0.96 }
                  : { y: 0, scale: 1 }
              }
              className={`flex h-7 flex-1 max-w-[3.5rem] items-center justify-center rounded-md border font-mono text-[9px] ${
                activeKey === "Enter"
                  ? "border-sky-400/60 bg-sky-500/25 text-sky-200"
                  : "border-white/[0.08] bg-[#15171c] text-zinc-600"
              }`}
            >
              ↵
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );
}
