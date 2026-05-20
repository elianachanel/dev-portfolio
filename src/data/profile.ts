export const profile = {
  email: "elianachannelbat@gmail.com",
  github: "https://github.com/elianachanel",
  linkedin: "https://linkedin.com/in/elianachanel",
};

export const cvFilePath = "/cv/Eliana-Batista-CV.pdf";

/** Gallery assets only — copy lives in i18n/translations */
export const projectGalleries = [
  {
    galleryDevice: "mobile" as const,
    gallery: [
      { src: "/projects/lunahair/calendar.png", title: "Home · weekly lunar calendar" },
      { src: "/projects/lunahair/calendar%202.png", title: "Monthly lunar calendar" },
      { src: "/projects/lunahair/login.png", title: "Login · Entrar al Ritual" },
      { src: "/projects/lunahair/verificar_cuenta.png", title: "Email verification" },
      { src: "/projects/lunahair/stepper_1.png", title: "Onboarding · hair type" },
      { src: "/projects/lunahair/stepeer_2.png", title: "Onboarding · hair thickness" },
      {
        src: "/projects/lunahair/details%20account.png",
        title: "Profile · hair details & lunar history",
      },
    ],
  },
  {
    galleryDevice: "mixed" as const,
    gallery: [
      {
        src: "/projects/Captura de pantalla 2026-02-16 a las 10.50.39 p. m..png",
        title: "Mobile app UI",
      },
      {
        src: "/projects/Captura de pantalla 2026-02-16 a las 10.56.02 p. m..png",
        title: "Booking flow",
      },
      {
        src: "/projects/Captura de pantalla 2026-02-16 a las 10.56.45 p. m..png",
        title: "Restaurant discovery",
      },
      {
        src: "/projects/Captura de pantalla 2026-02-16 a las 10.57.31 p. m..png",
        title: "Customer web",
        frame: "browser" as const,
      },
      {
        src: "/projects/Captura de pantalla 2026-02-16 a las 10.57.57 p. m..png",
        title: "Admin dashboard",
        frame: "browser" as const,
      },
    ],
  },
  {
    galleryDevice: "mobile" as const,
    gallery: [
      {
        src: "/projects/Humano.jpg",
        title: "Home",
        disclaimer:
          "UI representation created for portfolio purposes. Does not reflect real user data.",
      },
    ],
  },
] as const;
