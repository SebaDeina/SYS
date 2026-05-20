/* =================================================================
   site-data.js — rutas, servicios, casos, carreras, nosotros
================================================================= */

const HOW_WE_WORK = {
  es: {
    tag: "Cómo trabajamos",
    title: "Un proceso claro, sin sorpresas.",
    lead: "Mismo método en todos los servicios: entendemos, diseñamos, construimos y optimizamos con vos al centro.",
    steps: [
      { num: "01", title: "Descubrimiento", desc: "Brief, objetivos, audiencia y stack. Definimos qué éxito significa en números y en negocio." },
      { num: "02", title: "Estrategia & arquitectura", desc: "Mapa de flujos, wireframes o automatizaciones. Aprobás antes de que arranque producción." },
      { num: "03", title: "Producción iterativa", desc: "Entregas por sprints con revisiones cortas. Ves avances reales, no solo promesas." },
      { num: "04", title: "Lanzamiento & handoff", desc: "Deploy, documentación y capacitación. Tu equipo queda autónomo donde tiene sentido." },
      { num: "05", title: "Mejora continua", desc: "Métricas, A/B tests y optimización. El proyecto no termina el día del launch.", loop: true },
    ],
    loopNote: "Proceso iterativo — volvemos al paso 01 con lo aprendido",
  },
  en: {
    tag: "How we work",
    title: "A clear process, no surprises.",
    lead: "Same method across services: we discover, design, build and optimize with you at the center.",
    steps: [
      { num: "01", title: "Discovery", desc: "Brief, goals, audience and stack. We define what success means in numbers and business terms." },
      { num: "02", title: "Strategy & architecture", desc: "Flow maps, wireframes or automations. You approve before production starts." },
      { num: "03", title: "Iterative production", desc: "Sprint deliveries with short reviews. You see real progress, not just promises." },
      { num: "04", title: "Launch & handoff", desc: "Deploy, docs and training. Your team stays autonomous where it makes sense." },
      { num: "05", title: "Continuous improvement", desc: "Metrics, A/B tests and optimization. The project doesn't end on launch day.", loop: true },
    ],
    loopNote: "Iterative process — we return to step 01 with what we learned",
  },
};

const SERVICE_PAGES = [
  {
    slug: "automatizacion",
    icon: "automation",
    es: {
      title: "Automatizaciones, Data & IA",
      heroLead: "Conectamos sistemas, eliminamos trabajo manual y dejamos que la data tome decisiones por vos.",
      intro: "Desde flujos en n8n hasta dashboards en tiempo real: automatizamos lo repetitivo para que tu equipo se enfoque en lo que importa.",
    },
    en: {
      title: "Automation, Data & AI",
      heroLead: "We connect systems, remove manual work, and let data drive decisions.",
      intro: "From n8n workflows to real-time dashboards — we automate the repetitive so your team focuses on what matters.",
    },
    offerings: [
      { es: { title: "Automatización de flujos (n8n / Make)", desc: "Leads, facturación, onboarding, alertas. Menos copy-paste, menos errores humanos.", tags: ["n8n", "Make", "Zapier"] }, en: { title: "Workflow automation (n8n / Make)", desc: "Leads, billing, onboarding, alerts. Less copy-paste, fewer human errors.", tags: ["n8n", "Make", "Zapier"] } },
      { es: { title: "Integraciones API & CRMs", desc: "HubSpot, Notion, Google Sheets, ERPs. Un solo flujo de datos entre herramientas.", tags: ["API", "CRM", "ETL"] }, en: { title: "API & CRM integrations", desc: "HubSpot, Notion, Google Sheets, ERPs. One data flow across your stack.", tags: ["API", "CRM", "ETL"] } },
      { es: { title: "Analytics & dashboards", desc: "Looker Studio, Metabase o custom. KPIs de marketing y operaciones en un solo lugar.", tags: ["BI", "KPIs", "Reporting"] }, en: { title: "Analytics & dashboards", desc: "Looker Studio, Metabase or custom. Marketing and ops KPIs in one place.", tags: ["BI", "KPIs", "Reporting"] } },
      { es: { title: "IA aplicada & scraping ético", desc: "Clasificación, resúmenes, enrichment de leads. Siempre con límites legales y de privacidad.", tags: ["AI", "LLM", "Data"] }, en: { title: "Applied AI & ethical scraping", desc: "Classification, summaries, lead enrichment. Always within legal and privacy bounds.", tags: ["AI", "LLM", "Data"] } },
    ],
  },
  {
    slug: "diseno",
    icon: "design",
    es: {
      title: "Diseño gráfico & multimedia",
      heroLead: "Identidad y piezas que se ven hechas con criterio. Lo visual también vende.",
      intro: "Branding, contenido para redes y piezas impresas o digitales con una línea visual coherente en todos los touchpoints.",
    },
    en: {
      title: "Design & multimedia",
      heroLead: "Identity and assets built with intent. Visuals close the sale too.",
      intro: "Branding, social content and print or digital pieces with one visual line across every touchpoint.",
    },
    offerings: [
      { es: { title: "Branding completo", desc: "Logo, paleta, tipografías, manual de marca y aplicaciones para redes y papelería.", tags: ["Logo", "Brand book"] }, en: { title: "Full branding", desc: "Logo, palette, type, brand guidelines and applications for social and print.", tags: ["Logo", "Brand book"] } },
      { es: { title: "Contenido para redes", desc: "Plantillas, carruseles, reels covers. Sistemas que tu equipo puede replicar.", tags: ["Social", "Templates"] }, en: { title: "Social content", desc: "Templates, carousels, reel covers. Systems your team can replicate.", tags: ["Social", "Templates"] } },
      { es: { title: "Foto & retoque", desc: "Producto, retrato corporativo, lifestyle. Edición consistente con tu marca.", tags: ["Photo", "Retouch"] }, en: { title: "Photo & retouch", desc: "Product, corporate portrait, lifestyle. Editing aligned with your brand.", tags: ["Photo", "Retouch"] } },
      { es: { title: "Packaging & ilustración", desc: "Etiquetas, cajas, iconografía custom. Diseño que funciona en shelf y en digital.", tags: ["Packaging", "Vector"] }, en: { title: "Packaging & illustration", desc: "Labels, boxes, custom iconography. Design that works on shelf and screen.", tags: ["Packaging", "Vector"] } },
    ],
  },
  {
    slug: "web",
    icon: "web",
    es: {
      title: "Páginas web",
      heroLead: "Sitios rápidos, claros y pensados para convertir — no solo para verse bien.",
      intro: "Cada tipo de web tiene objetivos distintos. Te ayudamos a elegir el formato correcto y lo construimos a medida.",
    },
    en: {
      title: "Websites",
      heroLead: "Fast, clear sites built to convert — not just to look good.",
      intro: "Each website type has different goals. We help you pick the right format and build it custom.",
    },
    offerings: [
      { es: { title: "Landing page", desc: "Un producto, una campaña, una conversión. Ideal para ads, lanzamientos o validación rápida.", tags: ["CRO", "Ads", "Launch"] }, en: { title: "Landing page", desc: "One product, one campaign, one conversion. Ideal for ads, launches or quick validation.", tags: ["CRO", "Ads", "Launch"] } },
      { es: { title: "Web institucional", desc: "Presencia sólida: servicios, equipo, casos, contacto. SEO técnico y contenido estructurado.", tags: ["SEO", "Corporate"] }, en: { title: "Corporate website", desc: "Solid presence: services, team, cases, contact. Technical SEO and structured content.", tags: ["SEO", "Corporate"] } },
      { es: { title: "E-commerce", desc: "Catálogo, checkout, integraciones de pago y envíos. UX de compra optimizada mobile-first.", tags: ["Shop", "Checkout"] }, en: { title: "E-commerce", desc: "Catalog, checkout, payment and shipping integrations. Mobile-first purchase UX.", tags: ["Shop", "Checkout"] } },
      { es: { title: "Web app / portal", desc: "Áreas privadas, dashboards de cliente, reservas. React o stack según complejidad.", tags: ["App", "Portal"] }, en: { title: "Web app / portal", desc: "Private areas, client dashboards, booking. React or stack based on complexity.", tags: ["App", "Portal"] } },
      { es: { title: "Mantenimiento & evolución", desc: "Updates, nuevas secciones, performance y seguridad. Tu web viva, no congelada.", tags: ["Support", "CMS"] }, en: { title: "Maintenance & evolution", desc: "Updates, new sections, performance and security. A living site, not frozen.", tags: ["Support", "CMS"] } },
    ],
  },
  {
    slug: "marketing",
    icon: "marketing",
    es: {
      title: "Marketing digital",
      heroLead: "Estrategia, performance y crecimiento medible. No es magia, es método.",
      intro: "Desde la auditoría inicial hasta la optimización de campañas: cada peso invertido con un objetivo claro.",
    },
    en: {
      title: "Digital marketing",
      heroLead: "Strategy, performance, and measurable growth. Not magic — method.",
      intro: "From initial audit to campaign optimization — every dollar invested with a clear objective.",
    },
    offerings: [
      { es: { title: "Consultoría digital", desc: "Auditoría de canales, funnel y competencia. Roadmap de 90 días con prioridades.", tags: ["Strategy", "Audit"] }, en: { title: "Digital consulting", desc: "Channel, funnel and competitor audit. 90-day roadmap with priorities.", tags: ["Strategy", "Audit"] } },
      { es: { title: "Meta & Google Ads", desc: "Estructura de campañas, creatividades, tracking y optimización semanal.", tags: ["Paid media", "ROAS"] }, en: { title: "Meta & Google Ads", desc: "Campaign structure, creatives, tracking and weekly optimization.", tags: ["Paid media", "ROAS"] } },
      { es: { title: "SEO & SEM", desc: "Posicionamiento orgánico + búsqueda pagada. Contenido y técnica alineados.", tags: ["SEO", "SEM"] }, en: { title: "SEO & SEM", desc: "Organic ranking + paid search. Content and technical SEO aligned.", tags: ["SEO", "SEM"] } },
      { es: { title: "Research de audiencia", desc: "Personas, pain points, mensajes que resuenan. Base para todo el plan de marketing.", tags: ["Research", "ICP"] }, en: { title: "Audience research", desc: "Personas, pain points, resonant messaging. Foundation for the full marketing plan.", tags: ["Research", "ICP"] } },
    ],
  },
  {
    slug: "community",
    icon: "community",
    es: {
      title: "Community management",
      heroLead: "Tu marca viva en redes. Conversación real, contenido pensado y tendencias bien usadas.",
      intro: "No solo posteamos: construimos comunidad, respondemos con criterio y medimos engagement que importa.",
    },
    en: {
      title: "Community management",
      heroLead: "Your brand alive on social. Real conversation, considered content, trends used well.",
      intro: "We don't just post — we build community, reply with judgment and measure engagement that matters.",
    },
    offerings: [
      { es: { title: "Gestión de comunidad", desc: "DMs, comentarios, crisis leves. Tono de marca consistente y tiempos de respuesta definidos.", tags: ["IG", "LinkedIn", "X"] }, en: { title: "Community management", desc: "DMs, comments, light crisis. Consistent brand voice and defined response times.", tags: ["IG", "LinkedIn", "X"] } },
      { es: { title: "Producción de contenido", desc: "Grabación, edición, subtítulos, formatos nativos por plataforma.", tags: ["Reels", "Video"] }, en: { title: "Content production", desc: "Shooting, editing, captions, native formats per platform.", tags: ["Reels", "Video"] } },
      { es: { title: "Calendario & ideación", desc: "Pilares de contenido, fechas clave, tendencias adaptadas a tu rubro.", tags: ["Planning", "Trends"] }, en: { title: "Calendar & ideation", desc: "Content pillars, key dates, trends adapted to your industry.", tags: ["Planning", "Trends"] } },
      { es: { title: "Reportes de performance", desc: "Reach, engagement, growth. Qué funcionó y qué iterar el mes siguiente.", tags: ["Analytics", "Reports"] }, en: { title: "Performance reports", desc: "Reach, engagement, growth. What worked and what to iterate next month.", tags: ["Analytics", "Reports"] } },
    ],
  },
];

/** Proyectos destacados en el home (mosaico) */
const FEATURED_CASE_SLUGS = [
  "ecommerce-vinicola",
  "pipeline-n8n",
  "meta-ads-d2c",
  "rebrand-saas",
];

const FEATURED_CASE_SPANS = {
  "ecommerce-vinicola": "span-4",
  "pipeline-n8n": "span-2",
  "meta-ads-d2c": "span-3",
  "rebrand-saas": "span-3",
};

const CASES_INDEX_CONTENT = {
  es: {
    tag: "Casos",
    title: "Proyectos que realizamos.",
    lead: "Todos nuestros trabajos en un solo lugar. En el inicio ves los destacados; acá está el listado completo.",
  },
  en: {
    tag: "Work",
    title: "Projects we've delivered.",
    lead: "All our work in one place. The homepage shows highlights; here is the full list.",
  },
};

const CASE_STUDIES = [
  {
    slug: "ecommerce-vinicola",
    grad: "gradient-1",
    cat: { es: "Web & Branding", en: "Web & Branding" },
    es: { title: "E-commerce vinícola", summary: "Tienda online con catálogo, checkout y branding alineado al posicionamiento premium.", challenge: "Lanzar venta online sin perder la percepción premium de la bodega.", solution: "UX mobile-first, fotografía de producto y flujo de compra en 3 pasos.", results: ["+42% conversión mobile vs. diseño anterior", "Tiempo de carga < 2.5s", "Integración con logística local"] },
    en: { title: "Wine e-commerce", summary: "Online store with catalog, checkout and branding aligned to premium positioning.", challenge: "Launch online sales without losing the winery's premium perception.", solution: "Mobile-first UX, product photography and 3-step purchase flow.", results: ["+42% mobile conversion vs. previous design", "Load time < 2.5s", "Local logistics integration"] },
  },
  {
    slug: "pipeline-n8n",
    grad: "gradient-2",
    cat: { es: "Automation", en: "Automation" },
    es: { title: "Pipeline de leads · n8n", summary: "Automatización de captación, scoring y derivación a ventas en CRM.", challenge: "Leads perdidos entre formulario web y HubSpot por carga manual.", solution: "Flujo n8n con enrichment, scoring y asignación automática por región.", results: ["-6h/semana de trabajo manual", "100% leads registrados en < 2 min", "Alertas Slack al equipo comercial"] },
    en: { title: "Lead pipeline · n8n", summary: "Automation for capture, scoring and sales routing in CRM.", challenge: "Leads lost between web form and HubSpot due to manual entry.", solution: "n8n flow with enrichment, scoring and auto-assignment by region.", results: ["-6h/week manual work", "100% leads logged in < 2 min", "Slack alerts to sales team"] },
  },
  {
    slug: "app-gestion-interna",
    grad: "gradient-6",
    cat: { es: "App", en: "App" },
    es: { title: "App de gestión interna", summary: "Panel operativo para seguimiento de pedidos y equipos en tiempo real.", challenge: "Planillas dispersas y sin visibilidad del estado de órdenes.", solution: "Web app con roles, estados custom y notificaciones automáticas.", results: ["Visibilidad en tiempo real", "-30% errores de despacho", "Onboarding de usuarios en 1 día"] },
    en: { title: "Internal ops app", summary: "Operations panel for order and team tracking in real time.", challenge: "Scattered spreadsheets with no order status visibility.", solution: "Web app with roles, custom states and automatic notifications.", results: ["Real-time visibility", "-30% dispatch errors", "User onboarding in 1 day"] },
  },
  {
    slug: "meta-ads-d2c",
    grad: "gradient-4",
    cat: { es: "Performance", en: "Performance" },
    es: { title: "Meta Ads · D2C", summary: "Campañas de performance para marca D2C con optimización semanal.", challenge: "CAC alto y creatividades fatigadas en 3 semanas.", solution: "Testing estructurado de ángulos, UGC y landing dedicada por producto.", results: ["ROAS 3.2x en 60 días", "-28% CAC", "12 variantes creativas/mes"] },
    en: { title: "Meta Ads · D2C", summary: "Performance campaigns for D2C brand with weekly optimization.", challenge: "High CAC and creative fatigue within 3 weeks.", solution: "Structured angle testing, UGC and dedicated landing per product.", results: ["3.2x ROAS in 60 days", "-28% CAC", "12 creative variants/month"] },
  },
  {
    slug: "rebrand-saas",
    grad: "gradient-3",
    cat: { es: "Branding", en: "Branding" },
    es: { title: "Rebrand SaaS", summary: "Nueva identidad visual y aplicación en producto, web y sales deck.", challenge: "Marca genérica que no transmitía confianza B2B.", solution: "Sistema visual modular, ilustración custom y guía para el equipo.", results: ["NPS de percepción de marca +18 pts", "Kit aplicado en 2 semanas", "Web y deck alineados"] },
    en: { title: "SaaS rebrand", summary: "New visual identity applied to product, web and sales deck.", challenge: "Generic brand that didn't convey B2B trust.", solution: "Modular visual system, custom illustration and team guidelines.", results: ["Brand perception NPS +18 pts", "Kit applied in 2 weeks", "Web and deck aligned"] },
  },
  {
    slug: "cuenta-lifestyle",
    grad: "gradient-5",
    cat: { es: "Community", en: "Community" },
    es: { title: "Cuenta lifestyle", summary: "Estrategia de contenido y community para marca de lifestyle en IG + TikTok.", challenge: "Engagement bajo y contenido sin hilo conductor.", solution: "Pilares editoriales, calendario mensual y producción batch.", results: ["+85% engagement rate", "2.1x reach orgánico", "Tiempo de respuesta DMs < 2h"] },
    en: { title: "Lifestyle account", summary: "Content strategy and community for lifestyle brand on IG + TikTok.", challenge: "Low engagement and content without a clear thread.", solution: "Editorial pillars, monthly calendar and batch production.", results: ["+85% engagement rate", "2.1x organic reach", "DM response time < 2h"] },
  },
];

const CONTACT_PAGE = {
  es: {
    tag: "Contacto",
    title: "Empecemos a construir.",
    lead: "Contanos el desafío. Sin humo: si hay fit, armamos el plan y arrancamos.",
  },
  en: {
    tag: "Contact",
    title: "Let's start building.",
    lead: "Tell us the challenge. No fluff — if it's a fit, we plan and start.",
  },
};

const TEAM_MEMBERS = [
  {
    slug: "sol-bogner",
    initials: "SB",
    es: {
      name: "Sol Bogner",
      roles: [
        "Lic. en Diseño multimedia e interacción",
        "Lic. en Diseño gráfico",
      ],
    },
    en: {
      name: "Sol Bogner",
      roles: [
        "Multimedia & interaction design",
        "Graphic design",
      ],
    },
  },
  {
    slug: "sebastian-deina",
    initials: "SD",
    es: {
      name: "Sebastian Deina",
      roles: [
        "Programador",
        "Data analytics",
        "Lic. en Negocios digitales",
      ],
    },
    en: {
      name: "Sebastian Deina",
      roles: [
        "Developer",
        "Data analytics",
        "Digital business",
      ],
    },
  },
];

const ABOUT_CONTENT = {
  es: {
    tag: "Nosotros",
    title: "Somos tu equipo digital, no una agencia lejana.",
    lead: "Sys Digital nació para acompañar marcas que quieren crecer con marketing, diseño, webs y automatización — sin fricción ni humo.",
    blocks: [
      { title: "Aliados, no proveedores", desc: "Entramos a tu negocio como partners. Hablamos claro, priorizamos impacto y no desaparecemos post-launch." },
      { title: "Cinco áreas, un equipo", desc: "Automatización, diseño, web, marketing y community bajo el mismo techo. Menos coordinación, más velocidad." },
      { title: "Basados en Argentina, mindset global", desc: "Trabajamos remoto con clientes locales e internacionales. Procesos documentados y comunicación async-friendly." },
    ],
    values: ["Transparencia", "Iteración rápida", "Datos > opiniones", "Diseño con propósito"],
  },
  en: {
    tag: "About us",
    title: "We're your digital team, not a distant agency.",
    lead: "Sys Digital was built to support brands growing through marketing, design, web and automation — without friction or fluff.",
    blocks: [
      { title: "Allies, not vendors", desc: "We embed as partners. Clear talk, impact-first priorities, and we don't vanish after launch." },
      { title: "Five areas, one team", desc: "Automation, design, web, marketing and community under one roof. Less coordination, more speed." },
      { title: "Based in Argentina, global mindset", desc: "Remote work with local and international clients. Documented processes and async-friendly comms." },
    ],
    values: ["Transparency", "Fast iteration", "Data > opinions", "Design with purpose"],
  },
};

const CAREERS_CONTENT = {
  es: {
    tag: "Carreras",
    title: "Trabajá con nosotros",
    lead: "Buscamos gente curiosa, responsable y con ganas de construir productos digitales que funcionen en el mundo real.",
    culture: [
      { title: "Remoto-first", desc: "Trabajá desde donde quieras en Argentina. Reuniones sync solo cuando suman." },
      { title: "Proyectos variados", desc: "E-commerce, SaaS, automatización, ads. No te aburrís en un solo rubro." },
      { title: "Crecimiento real", desc: "Feedback directo, ownership de módulos y espacio para proponer mejoras." },
    ],
    process: ["Aplicás con CV + portfolio o GitHub", "Entrevista de 30 min con el equipo", "Prueba técnica pagada (half-day)", "Onboarding con buddy la primera semana"],
  },
  en: {
    tag: "Careers",
    title: "Work with us",
    lead: "We're looking for curious, responsible people who want to build digital products that work in the real world.",
    culture: [
      { title: "Remote-first", desc: "Work from anywhere in Argentina. Sync meetings only when they add value." },
      { title: "Varied projects", desc: "E-commerce, SaaS, automation, ads. You won't get bored in one vertical." },
      { title: "Real growth", desc: "Direct feedback, module ownership and room to propose improvements." },
    ],
    process: ["Apply with CV + portfolio or GitHub", "30 min team interview", "Paid technical trial (half-day)", "Buddy onboarding in week one"],
  },
};

const OPEN_ROLES = [
  {
    slug: "dev-frontend",
    type: "full-time",
    es: { title: "Desarrollador/a Frontend", location: "Remoto · Argentina", desc: "React, HTML semántico, performance. Experiencia con landings y e-commerce." },
    en: { title: "Frontend Developer", location: "Remote · Argentina", desc: "React, semantic HTML, performance. Experience with landings and e-commerce." },
  },
  {
    slug: "automation-specialist",
    type: "full-time",
    es: { title: "Especialista en automatización", location: "Remoto · Argentina", desc: "n8n, Make, APIs REST. Que te guste debuggear flujos hasta que funcionen solos." },
    en: { title: "Automation Specialist", location: "Remote · Argentina", desc: "n8n, Make, REST APIs. You enjoy debugging flows until they run themselves." },
  },
  {
    slug: "paid-media",
    type: "part-time",
    es: { title: "Paid Media (Meta / Google)", location: "Remoto · Part-time", desc: "Gestión de campañas, reporting y tests creativos. Certificación Meta preferida." },
    en: { title: "Paid Media (Meta / Google)", location: "Remote · Part-time", desc: "Campaign management, reporting and creative tests. Meta certified preferred." },
  },
  {
    slug: "designer",
    type: "freelance",
    es: { title: "Diseñador/a gráfico freelance", location: "Remoto · Por proyecto", desc: "Branding, social, piezas print. Dominio de Figma y criterio tipográfico." },
    en: { title: "Freelance Graphic Designer", location: "Remote · Project-based", desc: "Branding, social, print. Figma proficiency and typographic judgment." },
  },
];

function getServiceBySlug(slug) {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}

function getCaseBySlug(slug) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

function pageUrl(path) {
  const base = document.body.dataset.base || "";
  return base + path;
}

Object.assign(window, {
  HOW_WE_WORK,
  SERVICE_PAGES,
  FEATURED_CASE_SLUGS,
  FEATURED_CASE_SPANS,
  CASES_INDEX_CONTENT,
  CASE_STUDIES,
  CONTACT_PAGE,
  TEAM_MEMBERS,
  ABOUT_CONTENT,
  CAREERS_CONTENT,
  OPEN_ROLES,
  getServiceBySlug,
  getCaseBySlug,
  pageUrl,
});
