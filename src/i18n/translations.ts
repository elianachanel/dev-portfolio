import type { ExperienceJob } from "@/components/ExperienceShowcase";
import type { FeaturedProject } from "@/components/projects/FeaturedProjectBlock";
import type { Locale } from "@/i18n/locales";

type ProjectCopy = Omit<FeaturedProject, "gallery" | "galleryDevice">;

type CvCopy = {
  displayName: string;
  profileCardName: string;
  profilePhotoSrc: string;
  title: string;
  location: string;
  phoneDisplay: string;
  phoneTel: string;
  summary: string;
  impactHighlights: { value: string; label: string }[];
  whatIDo: string[];
  experience: ExperienceJob[];
  featuredProjects: ProjectCopy[];
  skillGroups: { label: string; items: string[] }[];
  education: string[];
  languages: string[];
  additional: string[];
};

export type LocaleContent = {
  nav: {
    about: string;
    work: string;
    experience: string;
    projects: string;
    skills: string;
    contact: string;
    cta: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: {
    viewWork: string;
    downloadCv: string;
    github: string;
    profile: string;
    scroll: string;
  };
  sections: {
    strengths: { label: string; title: string; description: string };
    experience: { label: string; title: string };
    projects: { label: string; title: string };
    skills: { label: string; title: string; ecosystem: string };
    education: { label: string; title: string };
    contact: {
      label: string;
      title: string;
      titleAccent: string;
      email: string;
      downloadCv: string;
      linkedin: string;
      location: string;
      languages: string;
      beyond: string;
    };
  };
  projects: {
    label: string;
    prev: string;
    next: string;
    showDetails: string;
    hideDetails: string;
  };
  cv: Omit<CvCopy, "featuredProjects"> & {
    featuredProjects: FeaturedProject[];
  };
  footer: string;
};

type LocaleContentSource = Omit<LocaleContent, "cv"> & {
  cv: CvCopy;
};

const enCv: CvCopy = {
  displayName: "Eliana Batista",
  profileCardName: "Eliana Batista",
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
  ],
  featuredProjects: [
    {
      title: "LunaHair",
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
    },
    {
      title: "Rezalia",
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
    },
    {
      title: "Mobile Application — Insurance Platform",
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
    "CS50's Mobile App Development with React Native — Harvard University",
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

const esCv: CvCopy = {
  ...enCv,
  title: "Ingeniera de Software",
  location: "República Dominicana",
  summary:
    "Ingeniera de Software con más de 5 años de experiencia construyendo aplicaciones móviles y web escalables con React Native y tecnologías modernas de JavaScript. Sólida trayectoria en sistemas bancarios y de seguros, con enfoque en rendimiento, experiencia de usuario y arquitectura limpia. Experiencia desarrollando productos end-to-end y lógica de negocio compleja.",
  impactHighlights: [
    { value: "5+ años", label: "entregando productos móvil y web" },
    { value: "Banca y seguros", label: "sistemas de nivel empresarial" },
    { value: "End-to-end", label: "de arquitectura a producción" },
  ],
  whatIDo: [
    "Apps React Native con arquitectura modular y limpia",
    "Experiencias web modernas con Next.js y TypeScript",
    "APIs REST, estado complejo y flujos con muchos datos",
    "Rendimiento, UX y mantenibilidad en todas las plataformas",
  ],
  experience: [
    {
      role: "Ingeniera de Software",
      company: "Humano Seguros",
      bullets: [
        "Desarrollo y mantenimiento de aplicaciones móviles con React Native",
        "Construcción y optimización de funciones clave en apps de seguros",
        "Mejora de flujos principales, usabilidad y rendimiento",
        "Integración de APIs REST y gestión de estado complejo",
        "Operaciones de mesa de servicio alineadas con estándares ITIL",
      ],
    },
    {
      role: "Subgerente de Inteligencia de Negocios",
      company: "Banco BHD",
      bullets: [
        "Gestión de flujos de datos y pipelines de reportes de BI",
        "Recolección, análisis y entrega de insights a stakeholders",
        "Apoyo a decisiones mediante análisis basado en datos",
      ],
    },
    {
      role: "Desarrolladora de Software",
      company: "Banco BDI",
      bullets: [
        "Desarrollo de procedimientos, funciones y soluciones PL/SQL",
        "Soporte técnico de tercer nivel y resolución de incidentes",
        "Herramientas internas y reportes con tecnologías Oracle",
        "Mantenimiento y optimización del rendimiento de bases de datos",
      ],
    },
  ],
  featuredProjects: [
    {
      title: "LunaHair",
      subtitle: "Cuidado capilar lunar · App móvil (UI / producto)",
      highlight: "Calendario premium que sincroniza rituales capilares con fases lunares reales",
      tags: ["React Native", "Expo", "TypeScript", "UI/UX", "SunCalc"],
      intro:
        "Experiencia móvil de bienestar para planificar cortes, hidratación, nutrición y rituales de crecimiento alineados con un calendario lunar astronómicamente preciso.",
      bullets: [
        "UI oscura con glassmorphism inspirada en apps premium de wellness",
        "Motor de fases lunares con recomendaciones día a día",
        "Flujos de inicio, calendario, rutinas y perfil de punta a punta",
        "Concepto que evolucionó de diseño UI a app completa en React Native + Expo",
      ],
    },
    {
      title: "Rezalia",
      subtitle: "Reservas de restaurantes · Móvil + Web",
      highlight: "Reservas en tiempo real en móvil, web y panel admin",
      tags: ["React Native", "Next.js", "Mapas", "Tiempo real", "Multi-tenant"],
      intro:
        "Plataforma multi-rol para reservas en restaurantes: app móvil, web de clientes y panel administrativo.",
      bullets: [
        "Plataforma end-to-end para reservas con varios roles de usuario",
        "App móvil, cliente web y dashboard administrativo",
        "Sistema de reservas en tiempo real y gestión de disponibilidad",
        "Integración de mapas y descubrimiento de restaurantes por ubicación",
        "Arquitectura para clientes y restaurantes en el mismo ecosistema",
      ],
    },
    {
      title: "Aplicación móvil — Plataforma de seguros",
      subtitle: "Humano Seguros · Móvil empresarial",
      highlight: "Flujos de seguros rediseñados para escala y claridad",
      tags: ["React Native", "APIs REST", "Rediseño", "Salud"],
      intro:
        "Contribución al rediseño y evolución de una aplicación móvil de seguros a gran escala, con foco en UX y funciones de negocio clave.",
      bullets: [
        "Implementación del flujo completo de compra de medicamentos",
        "Participación en el rediseño: usabilidad y consistencia de interfaz",
        "Desarrollo y optimización de funcionalidades core de la plataforma",
        "Integración de APIs REST y gestión de estado complejo",
      ],
    },
  ],
  skillGroups: [
    {
      label: "Frontend y móvil",
      items: ["React Native", "React.js", "Next.js", "JavaScript (ES6+)", "TypeScript"],
    },
    {
      label: "Backend y datos",
      items: ["APIs REST", "SQL", "PL/SQL", "Oracle"],
    },
    {
      label: "Testing y herramientas",
      items: ["Jest", "React Testing Library", "Git"],
    },
    {
      label: "Otros",
      items: ["Gestión de estado", "Integración de APIs", "Desarrollo móvil"],
    },
  ],
  education: [
    "Ingeniería en Sistemas y Computación (2021)",
    "CS50's Mobile App Development with React Native — Universidad de Harvard",
    "Master React Native — DevTalles",
    "React (Avanzado)",
    "JavaScript (Node, React)",
    "Jest y testing",
  ],
  languages: [
    "Español — Nativo",
    "Inglés — Competencia profesional",
    "Griego — Intermedio",
    "Portugués — Básico",
  ],
  additional: [
    "Jugadora de tenis",
    "Aprendizaje continuo en tecnologías móvil y web",
  ],
};

export const localeContent: Record<Locale, LocaleContentSource> = {
  en: {
    nav: {
      about: "About",
      work: "Work",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
      cta: "Let's talk",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },
    hero: {
      viewWork: "View work",
      downloadCv: "Download CV",
      github: "GitHub",
      profile: "Profile",
      scroll: "Scroll",
    },
    sections: {
      strengths: {
        label: "Strengths",
        title: "How I work",
        description:
          "End-to-end ownership across architecture, implementation, quality, and long-term maintainability—especially in regulated domains like banking and insurance.",
      },
      experience: { label: "Experience", title: "Career trajectory" },
      projects: {
        label: "Selected work",
        title: "Products I've shipped",
      },
      skills: { label: "Expertise", title: "Technical stack", ecosystem: "Ecosystem" },
      education: { label: "Education", title: "Learning & growth" },
      contact: {
        label: "Contact",
        title: "Let's build something",
        titleAccent: "exceptional",
        email: "Email me",
        downloadCv: "Download CV",
        linkedin: "LinkedIn",
        location: "Location",
        languages: "Languages",
        beyond: "Beyond code",
      },
    },
    projects: {
      label: "PROJECT",
      prev: "Previous screen",
      next: "Next screen",
      showDetails: "View impact details",
      hideDetails: "Hide impact details",
    },
    cv: enCv,
    footer: "Engineered with Next.js · Framer Motion",
  },
  es: {
    nav: {
      about: "Sobre mí",
      work: "Trabajo",
      experience: "Experiencia",
      projects: "Proyectos",
      skills: "Skills",
      contact: "Contacto",
      cta: "Hablemos",
      menuOpen: "Abrir menú",
      menuClose: "Cerrar menú",
    },
    hero: {
      viewWork: "Ver proyectos",
      downloadCv: "Descargar CV",
      github: "GitHub",
      profile: "Perfil",
      scroll: "Desplazar",
    },
    sections: {
      strengths: {
        label: "Fortalezas",
        title: "Cómo trabajo",
        description:
          "Ownership end-to-end en arquitectura, implementación, calidad y mantenibilidad — especialmente en dominios regulados como banca y seguros.",
      },
      experience: { label: "Experiencia", title: "Trayectoria profesional" },
      projects: {
        label: "Trabajo destacado",
        title: "Productos que he lanzado",
      },
      skills: {
        label: "Expertise",
        title: "Stack técnico",
        ecosystem: "Ecosistema",
      },
      education: { label: "Educación", title: "Aprendizaje y crecimiento" },
      contact: {
        label: "Contacto",
        title: "Construyamos algo",
        titleAccent: "excepcional",
        email: "Escríbeme",
        downloadCv: "Descargar CV",
        linkedin: "LinkedIn",
        location: "Ubicación",
        languages: "Idiomas",
        beyond: "Más allá del código",
      },
    },
    projects: {
      label: "PROYECTO",
      prev: "Pantalla anterior",
      next: "Pantalla siguiente",
      showDetails: "Ver detalles de impacto",
      hideDetails: "Ocultar detalles",
    },
    cv: esCv,
    footer: "Hecho con Next.js · Framer Motion",
  },
};
