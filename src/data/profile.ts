export const profile = {
  email: "elianachannelbat@gmail.com",
  github: "https://github.com/elianachanel",
  linkedin: "https://linkedin.com/in/elianachanel",
};

export const cv = {
  displayName: "Eliana Batista",
  profileCardName: "Eliana Batista",
  /** Avatar (`public/profile-avatar.png`) */
  profilePhotoSrc: "/profile-avatar.png",
  title: "Software Engineer",
  location: "Dominican Republic",
  phoneDisplay: "+1 (829) 610-2666",
  phoneTel: "+18296102666",
  summary:
    "Software Engineer with 5+ years of experience building scalable mobile and web applications using React Native and modern JavaScript technologies. Strong background in banking and insurance systems, with focus on performance, user experience, and clean architecture. Experienced in developing end-to-end products and handling complex business logic.",
  impactHighlights: [
    { value: "5+ years", label: "shipping mobile & web products" },
    { value: "Banking & insurance", label: "enterprise-grade systems" },
    { value: "End-to-end", label: "from architecture to release" },
  ],
  whatIDo: [
    "React Native apps with clean modular architecture",
    "Modern web experiences with Next.js and TypeScript",
    "REST APIs, complex state, and data-heavy workflows",
    "Performance, UX, and maintainability across platforms",
  ],
  experience: [
    {
      role: "Software Engineer",
      company: "Humano Seguros",
      bullets: [
        "Developed and maintained mobile applications using React Native",
        "Built and optimized key features for client-facing insurance applications",
        "Improved core user flows, enhancing usability and performance",
        "Integrated REST APIs and managed complex application state",
        "Handled service desk operations aligned with ITIL standards",
      ],
    },
    {
      role: "Business Intelligence Assistant Manager",
      company: "Banco BHD",
      bullets: [
        "Managed business intelligence data flow and reporting pipelines",
        "Collected, analyzed, and delivered insights to stakeholders",
        "Supported decision-making through data-driven analysis",
      ],
    },
    {
      role: "Software Developer",
      company: "Banco BDI",
      bullets: [
        "Developed PL/SQL procedures, functions, and database solutions",
        "Provided third-level technical support and incident resolution",
        "Built internal tools and reports using Oracle technologies",
        "Maintained and optimized database performance",
      ],
    },
    {
      role: "Software Teacher Assistant",
      company: "Universidad O&M",
      bullets: [
        "Assisted in teaching software and operating systems",
        "Installed and configured GNU/Linux environments",
        "Supported students in technical learning processes",
      ],
    },
  ],
  featuredProjects: [
    {
      title: "LunaHair",
      galleryDevice: "mobile" as const,
      subtitle: "Lunar hair care · Mobile app (UI / product)",
      highlight: "Premium calendar that syncs hair rituals with real moon phases",
      tags: ["React Native", "Expo", "TypeScript", "UI/UX", "SunCalc"],
      intro:
        "Wellness mobile experience for planning cuts, hydration, nutrition, and growth rituals aligned with an astronomically accurate lunar calendar.",
      bullets: [
        "Designed dark, glassmorphism UI inspired by premium wellness apps",
        "Built lunar phase engine with exact day-by-day recommendations",
        "Home, calendar, routines, and profile flows for end-to-end hair care",
        "Concept evolved from UI design into a full React Native + Expo application",
      ],
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
      title: "Rezalia",
      galleryDevice: "mixed" as const,
      subtitle: "Restaurant booking · Mobile + Web",
      highlight: "Real-time reservations across mobile, web & admin",
      tags: ["React Native", "Next.js", "Maps", "Real-time", "Multi-tenant"],
      intro:
        "End-to-end multi-role platform for restaurant reservations across mobile app, web client, and admin dashboard.",
      bullets: [
        "Built an end-to-end multi-role platform for restaurant reservations",
        "Developed mobile app, web client, and admin dashboard",
        "Implemented real-time booking system and availability management",
        "Integrated maps and location-based restaurant discovery",
        "Designed architecture to support multiple user roles (clients & restaurants)",
      ],
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
      title: "Mobile Application — Insurance Platform",
      galleryDevice: "mobile" as const,
      subtitle: "Humano Seguros · Enterprise mobile",
      highlight: "Insurance flows redesigned for scale & clarity",
      tags: ["React Native", "REST APIs", "Redesign", "Healthcare"],
      intro:
        "Contributed to the redesign and evolution of a large-scale mobile insurance application, focusing on user experience improvements and development of key business features.",
      bullets: [
        "Led the implementation of the end-to-end medication purchase flow within the application",
        "Participated in the application redesign, enhancing usability and interface consistency",
        "Developed and optimized core functionalities across the platform",
        "Integrated REST APIs and managed complex application state",
      ],
      gallery: [
        {
          src: "/projects/Humano.jpg",
          title: "Home",
          disclaimer:
            "UI representation created for portfolio purposes. Does not reflect real user data.",
        },
      ],
    },
  ],
  skillGroups: [
    {
      label: "Frontend & Mobile",
      items: ["React Native", "React.js", "Next.js", "JavaScript (ES6+)", "TypeScript"],
    },
    {
      label: "Backend & Data",
      items: ["REST APIs", "SQL", "PL/SQL", "Oracle"],
    },
    {
      label: "Testing & Tools",
      items: ["Jest", "React Testing Library", "Git"],
    },
    {
      label: "Other",
      items: ["State Management", "API Integration", "Mobile App Development"],
    },
  ],
  education: [
    "Systems and Computer Engineering (2021)",
    "CS50’s Mobile App Development with React Native — Harvard University",
    "Master React Native — DevTalles",
    "React (Advanced)",
    "JavaScript (Node, React)",
    "Jest & Testing",
  ],
  languages: [
    "Spanish — Native",
    "English — Professional Working Proficiency",
    "Greek — Intermediate",
    "Portuguese — Basic",
  ],
  additional: ["Tennis player", "Continuous learning in mobile and web technologies"],
};
