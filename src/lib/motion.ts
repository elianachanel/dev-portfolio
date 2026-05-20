export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeInOutSmooth = [0.45, 0, 0.55, 1] as const;

/** Snappy scroll-linked springs (robot, progress bar) */
export const scrollSpring = {
  stiffness: 220,
  damping: 28,
  mass: 0.18,
} as const;

/** Reliable whileInView on mobile — parent must not stay at opacity 0 */
export const inViewOnce = {
  once: true,
  amount: 0.06,
  margin: "0px 0px -48px 0px",
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: easeOutExpo },
  },
};

/** Parent orchestrates children only — never hide the whole block */
export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

export const fadeUpItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: easeOutExpo },
  },
};

export const fadeUpItemReduced = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.34, ease: easeOutExpo },
  },
};
