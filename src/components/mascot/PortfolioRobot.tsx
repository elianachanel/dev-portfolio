"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  IDLE_MASCOT_LOOK,
  PortfolioRobotCharacter,
  type MascotLook,
} from "@/components/mascot/PortfolioRobotCharacter";
import { scrollSpring } from "@/lib/motion";

export function PortfolioRobot() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [look, setLook] = useState<MascotLook>(IDLE_MASCOT_LOOK);
  const [visible, setVisible] = useState(false);
  const [greeting, setGreeting] = useState(true);

  const { scrollYProgress, scrollY } = useScroll();
  const topPercent = useTransform(scrollYProgress, [0, 1], ["8%", "72%"]);
  const springTop = useSpring(topPercent, {
    ...scrollSpring,
    stiffness: reduceMotion ? 300 : scrollSpring.stiffness,
  });

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 200);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const end = window.setTimeout(() => setGreeting(false), 4500);
    return () => window.clearTimeout(end);
  }, [visible]);

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => {
      if (y > 60) setGreeting(false);
    });
    return () => unsub();
  }, [scrollY]);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setMouse({ x: t.clientX, y: t.clientY });
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchstart", onTouch);
    };
  }, []);

  const updateLook = useCallback(() => {
    const el = containerRef.current;
    if (!el || reduceMotion) {
      setLook(IDLE_MASCOT_LOOK);
      return;
    }

    const rect = el.getBoundingClientRect();
    const headX = rect.left + rect.width * 0.5;
    const headY = rect.top + rect.height * 0.28;
    const dx = mouse.x - headX;
    const dy = mouse.y - headY;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const head = Math.max(-14, Math.min(14, angle * 0.22));
    const dist = Math.min(1, Math.hypot(dx, dy) / 320);
    const norm = Math.hypot(dx, dy) || 1;
    const eyeX = (dx / norm) * 6 * dist;
    const eyeY = (dy / norm) * 5 * dist;

    setLook({ head, eyeX, eyeY });
  }, [mouse.x, mouse.y, reduceMotion]);

  useEffect(() => {
    updateLook();
  }, [updateLook, springTop]);

  if (!visible) return null;

  return (
    <motion.div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed right-1 z-[12] block select-none sm:right-3 md:right-5 lg:right-6 xl:right-8"
      style={{ top: springTop }}
      initial={{ opacity: 0, x: 24, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <PortfolioRobotCharacter
        size="floating"
        greeting={greeting}
        look={look}
      />
    </motion.div>
  );
}
