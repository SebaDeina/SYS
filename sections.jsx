/* =================================================================
   sections.jsx — Nav, Hero, Stats, Marquee, Services, Portfolio,
   Testimonials, FAQ, Contact, Footer, WhatsApp floating
================================================================= */

const { useState: _useState, useEffect: _useEffect, useRef: _useRef } = React;

/* ----------------- NAV ----------------- */

function Nav() {
  const [onCyan, setOnCyan] = _useState(true);
  const { lang, setLang } = useLang();

  _useEffect(() => {
    const compute = () => {
      const hero = document.querySelector(".hero");
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setOnCyan(heroBottom > 84);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  const links = [
    { href: "#services", es: "Servicios", en: "Services" },
    { href: "#work", es: "Casos", en: "Work" },
    { href: "#testimonials", es: "Reseñas", en: "Voices" },
    { href: "#faq", es: "FAQ", en: "FAQ" },
  ];

  return (
    <nav className={`nav ${onCyan ? "on-cyan" : ""}`}>
      <a className="nav-brand" href="#top">
        <span className="lg"><Logo /></span>
        <span>Sys Digital<span className="dot" /></span>
      </a>
      <div className="nav-links">
        {links.map((l) => (
          <a key={l.href} href={l.href}>{lang === "en" ? l.en : l.es}</a>
        ))}
      </div>
      <div className="nav-right">
        <div className="lang-switch" role="group" aria-label="Language">
          <button className={lang === "es" ? "active" : ""} onClick={() => setLang("es")}>ES</button>
          <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
        <a className="btn btn-ghost btn-sm" href="#contact">
          <T es="Contactanos" en="Contact us" />
        </a>
      </div>
    </nav>
  );
}

/* ----------------- HERO ----------------- */

function HeroDecor() {
  // Code snippets + shapes scattered across the hero
  const codeSnippets = [
    { cls: "f-1", txt: "</>", },
    { cls: "f-4", txt: "npm i" },
    { cls: "f-5", txt: "const" },
    { cls: "f-9", txt: "return" },
    { cls: "f-12", txt: "async" },
  ];
  const shapes = [
    { cls: "f-2", shape: "circle" },
    { cls: "f-3", shape: "hash" },
    { cls: "f-6", shape: "triangle" },
    { cls: "f-7", shape: "plus" },
    { cls: "f-8", shape: "diamond" },
    { cls: "f-10", shape: "hexagon" },
    { cls: "f-11", shape: "square" },
    { cls: "f-13", shape: "play" },
    { cls: "f-14", shape: "pen" },
  ];

  const Shape = ({ kind }) => {
    switch (kind) {
      case "circle":   return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>;
      case "triangle": return <svg viewBox="0 0 24 24"><path d="M12 3 L22 21 L2 21 Z"/></svg>;
      case "plus":     return <svg viewBox="0 0 24 24"><path d="M12 4v16M4 12h16"/></svg>;
      case "diamond":  return <svg viewBox="0 0 24 24"><path d="M12 2 L22 12 L12 22 L2 12 Z"/></svg>;
      case "square":   return <svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/></svg>;
      case "hexagon":  return <svg viewBox="0 0 24 24"><path d="M12 2 L21 7 L21 17 L12 22 L3 17 L3 7 Z"/></svg>;
      case "hash":     return <svg viewBox="0 0 24 24"><path d="M9 3l-2 18M17 3l-2 18M3 9h18M3 15h18"/></svg>;
      case "play":     return <svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z"/></svg>;
      case "pen":      return <svg viewBox="0 0 24 24"><path d="M3 21l4-1L20 7l-3-3L4 17l-1 4z"/></svg>;
      default: return null;
    }
  };

  return (
    <div className="hero-decor" aria-hidden="true">
      {codeSnippets.map((c, i) => <div key={"c"+i} className={`fl ${c.cls}`}>{c.txt}</div>)}
      {shapes.map((s, i) => <div key={"s"+i} className={`fl ${s.cls}`}><Shape kind={s.shape} /></div>)}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-watermark" aria-hidden="true"><Logo /></div>
      <HeroDecor />

      <div className="container hero-inner">
        <Reveal as="div">
          <div className="hero-eyebrow">
            <span className="pulse" />
            <T es="Agencia de Marketing & Automatizaciones" en="Marketing & Automation Studio" />
          </div>
        </Reveal>

        <h1 className="hero-title">
          <span className="ln"><span className="word" style={{animationDelay:"0.05s"}}><T es="Más que agencia," en="More than an agency," /></span></span>
          <span className="ln"><span className="word" style={{animationDelay:"0.20s"}}><T es="tu" en="your" /></span>{" "}<em className="word" style={{animationDelay:"0.32s"}}><T es="aliado" en="strategic" /></em>{" "}<span className="word" style={{animationDelay:"0.44s"}}><T es="digital." en="ally." /></span></span>
        </h1>

        <Reveal as="div" delay={3}>
          <div className="hero-divider" />
        </Reveal>

        <Reveal as="p" className="hero-sub" delay={3}>
          <span className="mono">/</span>{" "}
          <T
            es="Diseñamos, automatizamos y escalamos lo digital de tu marca. Webs, apps, marketing y procesos que funcionan."
            en="We design, automate and scale the digital side of your brand. Web, apps, marketing and processes that work."
          />
        </Reveal>

        <Reveal as="div" className="hero-ctas" delay={4}>
          <a href="#services" className="btn btn-white">
            <T es="Ver servicios" en="Our services" />
            <span className="arr">→</span>
          </a>
          <a href="#contact" className="btn btn-outline-white">
            <T es="Contactanos" en="Contact us" />
          </a>
        </Reveal>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span>SCROLL</span>
        <span className="line" />
      </div>
    </section>
  );
}

/* ----------------- MARQUEE ----------------- */

function Marquee() {
  const items = [
    "Automatizaciones", "Data & IA", "n8n / Make", "Webs a medida",
    "Apps", "Branding", "SEO / SEM", "Meta Ads", "Google Ads",
    "Community", "Analytics", "Scraping ético",
  ];
  return (
    <div className="marquee">
      <div className="marquee-track">
        <span>
          {items.map((i, k) => <React.Fragment key={k}><span>{i}</span><span className="star">✦</span></React.Fragment>)}
        </span>
        <span aria-hidden>
          {items.map((i, k) => <React.Fragment key={k}><span>{i}</span><span className="star">✦</span></React.Fragment>)}
        </span>
      </div>
    </div>
  );
}

/* ----------------- STATS ----------------- */

function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <Reveal as="div" className="stats-grid">
          <div>
            <div className="stat-num">+<Counter to={40} /></div>
            <div className="stat-label"><T es="Proyectos entregados" en="Projects shipped" /></div>
          </div>
          <div>
            <div className="stat-num"><Counter to={98} /><span className="suf">%</span></div>
            <div className="stat-label"><T es="Retención de clientes" en="Client retention" /></div>
          </div>
          <div>
            <div className="stat-num"><Counter to={4} /></div>
            <div className="stat-label"><T es="Áreas integradas" en="Integrated areas" /></div>
          </div>
          <div>
            <div className="stat-num">&lt;<Counter to={24} /><span className="suf">h</span></div>
            <div className="stat-label"><T es="Respuesta promedio" en="Avg. response" /></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------- SERVICES ----------------- */

const SERVICES = [
  {
    num: "01",
    es: { title: "Automatizaciones, Data & IA",
          desc: "Conectamos sistemas, eliminamos trabajo manual y dejamos que la data tome decisiones por vos.",
          items: ["Automatización de flujos (n8n / Make)", "Integraciones de APIs y CRMs", "Marketing Analytics & dashboards", "Scraping ético + IA aplicada"] },
    en: { title: "Automation, Data & AI",
          desc: "We wire systems together, remove manual work, and let data make the call.",
          items: ["Workflow automation (n8n / Make)", "API & CRM integrations", "Marketing analytics & dashboards", "Ethical scraping + applied AI"] },
    icon: (<svg viewBox="0 0 24 24"><path d="M4 6h6M14 6h6M4 12h16M4 18h6M14 18h6M10 4v4M14 10v4M10 16v4"/></svg>),
  },
  {
    num: "02",
    es: { title: "Diseño gráfico & multimedia",
          desc: "Identidad y piezas que se ven hechas con criterio. Lo visual también vende.",
          items: ["Branding (logo, paleta, tipos)", "Contenido para redes", "Fotografía + retoque", "Ilustración, vectores, packaging", "Páginas web"] },
    en: { title: "Design & multimedia",
          desc: "Identity and assets built with intent. Visuals close the sale too.",
          items: ["Full branding (logo, palette, type)", "Social-first content", "Photography + retouching", "Illustration, vectors, packaging", "Websites"] },
    icon: (<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 14l5-5 5 5M14 11l3-3 4 4"/><circle cx="8" cy="8" r="1.5"/></svg>),
  },
  {
    num: "03",
    es: { title: "Marketing digital",
          desc: "Estrategia, performance y crecimiento medible. No es magia, es método.",
          items: ["Consultoría digital", "Estrategia en META y Google", "SEO / SEM", "Investigación de público objetivo"] },
    en: { title: "Digital marketing",
          desc: "Strategy, performance, and measurable growth. Not magic — method.",
          items: ["Digital consulting", "META & Google strategy", "SEO / SEM", "Target audience research"] },
    icon: (<svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8M14 7h7v7"/></svg>),
  },
  {
    num: "04",
    es: { title: "Community management",
          desc: "Tu marca viva en redes. Conversación real, contenido pensado y tendencias bien usadas.",
          items: ["Gestión de comunidad y mensajes", "Grabación + producción de contenido", "Ideación y nuevos formatos", "Investigación de tendencias"] },
    en: { title: "Community management",
          desc: "Your brand alive on social. Real conversation, considered content, trends used well.",
          items: ["Community + DM management", "Content shooting & production", "Ideation & new formats", "Trend research"] },
    icon: (<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 21c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="6" r="2"/><path d="M14 14c2-1 4-1 6 0 1.5.7 2 2 2 3"/></svg>),
  },
];

function Services() {
  const { lang } = useLang();
  return (
    <section id="services" className="services-section">
      <div className="container">
        <Reveal as="div" className="section-tag">
          <T es="Servicios" en="Services" />
        </Reveal>
        <Reveal as="h2" className="section-title" delay={1}>
          <T
            es={<>Cuatro áreas, <em>un solo equipo trabajando para vos.</em></>}
            en={<>Four areas, <em>one team working for you.</em></>}
          />
        </Reveal>
        <Reveal as="p" className="section-lead" delay={2}>
          <T
            es="Trabajamos como aliados, no como proveedores. Te acompañamos punta a punta: del primer brief al sistema funcionando."
            en="We work as allies, not vendors. We're with you end-to-end — from brief to a system that runs."
          />
        </Reveal>

        <div className="services-grid">
          {SERVICES.map((s, i) => {
            const c = lang === "en" ? s.en : s.es;
            return (
              <Reveal as="article" className="service-card" key={s.num} delay={(i % 2) + 1}>
                <div className="service-icon">{s.icon}</div>
                <div className="service-num">{s.num} / 04</div>
                <h3 className="service-title">{c.title}</h3>
                <p className="service-desc">{c.desc}</p>
                <ul className="service-list">
                  {c.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------- PORTFOLIO ----------------- */

const WORK = [
  { cat: "Web & Branding", es: "E-commerce vinícola", en: "Wine e-commerce", grad: "gradient-1", span: "span-4" },
  { cat: "Automation", es: "Pipeline de leads · n8n", en: "Lead pipeline · n8n", grad: "gradient-2", span: "span-2" },
  { cat: "App", es: "App de gestión interna", en: "Internal ops app", grad: "gradient-6", span: "span-3" },
  { cat: "Performance", es: "Meta Ads · D2C", en: "Meta Ads · D2C", grad: "gradient-4", span: "span-3" },
  { cat: "Branding", es: "Rebrand SaaS", en: "SaaS rebrand", grad: "gradient-3", span: "span-2" },
  { cat: "Community", es: "Cuenta lifestyle", en: "Lifestyle account", grad: "gradient-5", span: "span-4" },
];

function Portfolio() {
  const { lang } = useLang();
  return (
    <section id="work" className="portfolio-section">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 64 }}>
          <div>
            <Reveal as="div" className="section-tag">
              <T es="Portfolio" en="Selected work" />
            </Reveal>
            <Reveal as="h2" className="section-title" delay={1} style={{ marginBottom: 0 }}>
              <T
                es={<>Trabajos que <em>mueven aguja.</em></>}
                en={<>Work that <em>moved the needle.</em></>}
              />
            </Reveal>
          </div>
          <Reveal as="a" href="#contact" className="btn btn-ghost btn-sm" delay={2}>
            <T es="Ver más casos" en="See more" />
            <span className="arr">→</span>
          </Reveal>
        </div>

        <div className="portfolio-grid">
          {WORK.map((w, i) => (
            <Reveal as="article" className={`work-card ${w.span}`} key={i} delay={(i % 3) + 1}>
              <div className={`work-thumb ${w.grad}`}>
                <div className="work-mock">[ {lang === "en" ? w.en : w.es} ]</div>
              </div>
              <div className="work-meta">
                <div>
                  <div className="work-cat">{w.cat}</div>
                  <h3 className="work-title">{lang === "en" ? w.en : w.es}</h3>
                </div>
                <div className="work-arrow">
                  <svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------- TESTIMONIALS ----------------- */

const TESTIMONIALS = [
  {
    es: "Pasamos de tener todo en planillas a un sistema que corre solo. La diferencia operativa fue inmediata.",
    en: "We went from spreadsheets to a system that runs itself. The operational change was immediate.",
    name: "M. Castellanos",
    role: { es: "Fundadora · Estudio CC", en: "Founder · Estudio CC" },
    initials: "MC",
  },
  {
    es: "Lo más raro: no parecen una agencia, parecen parte del equipo. Eso cambia todo.",
    en: "The weird part: they don't feel like an agency, they feel like part of the team. That changes everything.",
    name: "J. Ferraro",
    role: { es: "CMO · Brand DTC", en: "CMO · DTC Brand" },
    initials: "JF",
  },
  {
    es: "Diseño, ads y automatización en la misma mesa. Por fin todo conversa.",
    en: "Design, ads and automation at the same table. Finally everything talks to each other.",
    name: "L. Romero",
    role: { es: "Director · LR Group", en: "Director · LR Group" },
    initials: "LR",
  },
];

function Testimonials() {
  const { lang } = useLang();
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <Reveal as="div" className="section-tag"><T es="Reseñas" en="Client voices" /></Reveal>
        <Reveal as="h2" className="section-title" delay={1}>
          <T
            es={<>Lo que dicen <em>quienes nos eligen.</em></>}
            en={<>What our <em>clients say.</em></>}
          />
        </Reveal>

        <div className="testimonials-grid" style={{ marginTop: 24 }}>
          {TESTIMONIALS.map((tst, i) => (
            <Reveal as="article" className="testimonial" key={i} delay={(i % 3) + 1}>
              <div className="quote-mark">"</div>
              <p>{lang === "en" ? tst.en : tst.es}</p>
              <div className="person">
                <div className="avatar">{tst.initials}</div>
                <div className="person-info">
                  <div className="nm">{tst.name}</div>
                  <div className="rl">{lang === "en" ? tst.role.en : tst.role.es}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------- FAQ ----------------- */

const FAQ_ITEMS = [
  {
    q: { es: "¿Cómo arrancamos un proyecto juntos?", en: "How do we kick off a project?" },
    a: { es: "Empezamos con una llamada de 30 min sin costo. Te escuchamos, entendemos el contexto y mandamos una propuesta concreta — con alcance, plazos y precio cerrado.",
         en: "We start with a free 30-min call. We listen, understand the context, and send a concrete proposal — scope, timeline, fixed price." },
  },
  {
    q: { es: "¿Hacen proyectos one-shot o solo retainer?", en: "Do you do one-offs or only retainers?" },
    a: { es: "Las dos. Hay marcas que nos llaman por un proyecto puntual (una web, una automatización, un rebrand) y otras que prefieren un retainer mensual con varias áreas trabajando en paralelo.",
         en: "Both. Some brands hire us for one project (a site, an automation, a rebrand); others prefer a monthly retainer with several areas working in parallel." },
  },
  {
    q: { es: "¿Trabajan con clientes fuera de Argentina?", en: "Do you work outside Argentina?" },
    a: { es: "Sí. Tenemos clientes en LATAM, España y US. Trabajamos en español e inglés, y nos adaptamos a tu zona horaria.",
         en: "Yes. We work with clients across LATAM, Spain and US, in Spanish and English, and adapt to your timezone." },
  },
  {
    q: { es: "¿Cuánto tarda una web a medida?", en: "How long does a custom site take?" },
    a: { es: "Una landing entre 2 y 4 semanas. Un sitio institucional con CMS, 4–8 semanas. Apps a medida arrancan en 8 semanas y dependen del alcance.",
         en: "A landing page in 2–4 weeks. A CMS-driven institutional site, 4–8 weeks. Custom apps start at 8 weeks and scale with scope." },
  },
  {
    q: { es: "¿Qué stack usan?", en: "What's your stack?" },
    a: { es: "Para web: React/Next, Astro, WebFlow. Para automatizaciones: n8n, Make, Zapier, y código a medida cuando se justifica. Para datos: Supabase, Postgres, BigQuery.",
         en: "Web: React/Next, Astro, WebFlow. Automation: n8n, Make, Zapier, plus custom code when it makes sense. Data: Supabase, Postgres, BigQuery." },
  },
  {
    q: { es: "¿Firman NDA?", en: "Do you sign NDAs?" },
    a: { es: "Por supuesto. Toda la información del proyecto queda bajo confidencialidad estricta, antes y después de firmar contrato.",
         en: "Of course. All project information stays under strict confidentiality, before and after contract signing." },
  },
];

function FAQ() {
  const [open, setOpen] = _useState(0);
  const { lang } = useLang();
  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="faq-wrap">
          <div>
            <Reveal as="div" className="section-tag"><T es="Preguntas frecuentes" en="FAQ" /></Reveal>
            <Reveal as="h2" className="section-title" delay={1}>
              <T es={<>Lo que <em>todos preguntan.</em></>}
                 en={<>What <em>everyone asks.</em></>} />
            </Reveal>
            <Reveal as="p" className="section-lead" delay={2} style={{ marginBottom: 0 }}>
              <T es="¿Tu duda no está acá? Escribinos por WhatsApp y te respondemos en el día."
                 en="Question not here? Ping us on WhatsApp — we reply same day." />
            </Reveal>
          </div>
          <Reveal as="div" className="faq-list" delay={2}>
            {FAQ_ITEMS.map((it, i) => (
              <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
                <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  <span>{lang === "en" ? it.q.en : it.q.es}</span>
                  <span className="faq-icon" aria-hidden />
                </button>
                <div className="faq-a">{lang === "en" ? it.a.en : it.a.es}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------- CONTACT ----------------- */

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <Reveal as="div" className="contact-card">
          <div className="contact-card-deco" aria-hidden="true">
            <div className="lg-mark"><Logo /></div>
          </div>
          <div className="contact-grid">
            <div>
              <div className="contact-tag">
                <T es="Hablemos" en="Let's talk" />
              </div>
              <h2 className="contact-title">
                <T es={<>Una llamada de <em>30 minutos</em> puede cambiar tu proceso.</>}
                   en={<>A <em>30-min call</em> can change your process.</>} />
              </h2>
              <p className="contact-lead">
                <T es="Reservá un horario en nuestro calendario o escribinos directo por WhatsApp. Te respondemos en menos de 24 hs hábiles."
                   en="Grab a slot on our calendar or ping us on WhatsApp. We reply within 24 business hours." />
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a className="btn btn-white" href="#agenda" target="_blank" rel="noreferrer">
                  <T es="Agendar en Google Calendar" en="Book on Google Calendar" />
                  <span className="arr">→</span>
                </a>
              </div>
            </div>

            <div className="contact-channels">
              <a className="channel" href="#agenda">
                <div className="channel-icon">
                  <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/><circle cx="12" cy="14" r="1.5" fill="currentColor" stroke="none"/></svg>
                </div>
                <div className="channel-text">
                  <div className="channel-label"><T es="Agenda" en="Schedule" /></div>
                  <div className="channel-value"><T es="Reservá tu llamada" en="Pick a time slot" /></div>
                </div>
                <span className="channel-arr">→</span>
              </a>

              <a className="channel" href="https://wa.me/" target="_blank" rel="noreferrer">
                <div className="channel-icon">
                  <svg viewBox="0 0 24 24"><path d="M21 11.5a8.5 8.5 0 11-3.4-6.8L21 4l-1.3 3.4A8.4 8.4 0 0121 11.5z"/><path d="M8 10c0 3 2 5 5 5l1-1.5-2-1-1 .5c-1 0-2-1-2-2l.5-1-1-2L8 10z"/></svg>
                </div>
                <div className="channel-text">
                  <div className="channel-label">WhatsApp</div>
                  <div className="channel-value"><T es="Escribinos ahora" en="Message us now" /></div>
                </div>
                <span className="channel-arr">→</span>
              </a>

              <a className="channel" href="mailto:hola@sysdigital.com">
                <div className="channel-icon">
                  <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/></svg>
                </div>
                <div className="channel-text">
                  <div className="channel-label">Email</div>
                  <div className="channel-value">hola@sysdigital.com</div>
                </div>
                <span className="channel-arr">→</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------- FOOTER ----------------- */

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-watermark" aria-hidden="true"><Logo /></div>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="nav-brand" href="#top">
              <span className="lg" style={{ width: 36, height: 22, color: "#fff" }}><Logo /></span>
              <span>Sys Digital<span className="dot" /></span>
            </a>
            <p className="tag">
              <T es="Tu aliado estratégico para diseñar, automatizar y escalar lo digital."
                 en="Your strategic ally to design, automate and scale the digital side." />
            </p>
          </div>
          <div className="footer-col">
            <h4><T es="Servicios" en="Services" /></h4>
            <ul>
              <li><a href="#services"><T es="Automatizaciones" en="Automation" /></a></li>
              <li><a href="#services"><T es="Diseño & multimedia" en="Design & multimedia" /></a></li>
              <li><a href="#services"><T es="Marketing digital" en="Digital marketing" /></a></li>
              <li><a href="#services"><T es="Community" en="Community" /></a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4><T es="Compañía" en="Company" /></h4>
            <ul>
              <li><a href="#work"><T es="Casos" en="Work" /></a></li>
              <li><a href="#testimonials"><T es="Reseñas" en="Voices" /></a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact"><T es="Contacto" en="Contact" /></a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4><T es="Conectá" en="Connect" /></h4>
            <ul>
              <li><a href="https://wa.me/" target="_blank" rel="noreferrer">WhatsApp</a></li>
              <li><a href="mailto:hola@sysdigital.com">Email</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Sys Digital</span>
          <span><T es="Hecho con criterio en Buenos Aires" en="Built with care in Buenos Aires" /></span>
        </div>
      </div>
    </footer>
  );
}

/* ----------------- WHATSAPP FLOAT ----------------- */

function WhatsAppFloat() {
  return (
    <a href="https://wa.me/" target="_blank" rel="noreferrer" className="wa-float" aria-label="WhatsApp">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 3C9.4 3 4 8.4 4 15c0 2.4.7 4.6 1.9 6.5L4 29l7.7-2c1.8 1 3.9 1.6 6.3 1.6 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-2 0-3.9-.6-5.5-1.5l-.4-.2-4 1 1-3.9-.3-.4C5.7 18.7 5.2 16.9 5.2 15c0-6 4.8-10.8 10.8-10.8s10.8 4.8 10.8 10.8-4.8 10.6-10.8 10.6zm6.3-8c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-2-1.8-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.7-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4 0-.7.3-.2.3-.9.9-.9 2.2 0 1.3 1 2.6 1.1 2.7.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.5-.4z"/>
      </svg>
    </a>
  );
}

/* ----------------- Export ----------------- */

Object.assign(window, {
  Nav, Hero, Stats, Marquee, Services, Portfolio, Testimonials, FAQ, Contact, Footer, WhatsAppFloat,
});
