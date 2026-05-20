/* =================================================================
   sections.jsx — Nav, Hero, Stats, Marquee, Services, Portfolio,
   Testimonials, FAQ, HomeContactCTA, ContactPageBody, Footer, WhatsApp floating
================================================================= */

const { useState: _useState, useEffect: _useEffect, useRef: _useRef } = React;

/* ----------------- HERO ----------------- */

function useHeroParallax(heroRef) {
  const [offset, setOffset] = _useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = _useState(false);

  _useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const canInteract = () =>
      window.matchMedia("(hover: hover) and (min-width: 901px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sync = () => setEnabled(canInteract());
    sync();

    const mqHover = window.matchMedia("(hover: hover) and (min-width: 901px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    mqHover.addEventListener("change", sync);
    mqMotion.addEventListener("change", sync);

    const onMove = (e) => {
      if (!canInteract()) return;
      const r = hero.getBoundingClientRect();
      setOffset({
        x: ((e.clientX - r.left) / r.width - 0.5) * 2,
        y: ((e.clientY - r.top) / r.height - 0.5) * 2,
      });
    };
    const onLeave = () => setOffset({ x: 0, y: 0 });

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);

    return () => {
      mqHover.removeEventListener("change", sync);
      mqMotion.removeEventListener("change", sync);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, [heroRef]);

  return { offset, enabled };
}

function heroParallaxStyle(depth, offset, enabled) {
  if (!enabled) return undefined;
  return {
    transform: `translate(${offset.x * depth * 18}px, ${offset.y * depth * 14}px)`,
  };
}

function HeroDecor({ offset, enabled }) {
  const codeSnippets = [
    { cls: "f-1", txt: "</>", depth: 1.15 },
    { cls: "f-4", txt: "npm i", depth: 0.85 },
    { cls: "f-5", txt: "const", depth: 1.05 },
    { cls: "f-9", txt: "return", depth: 0.75 },
    { cls: "f-12", txt: "async", depth: 0.95 },
  ];
  const shapes = [
    { cls: "f-2", shape: "circle", depth: 1.2 },
    { cls: "f-3", shape: "hash", depth: 0.9 },
    { cls: "f-6", shape: "triangle", depth: 1.1 },
    { cls: "f-7", shape: "plus", depth: 0.8 },
    { cls: "f-8", shape: "diamond", depth: 1.25 },
    { cls: "f-10", shape: "hexagon", depth: 0.7 },
    { cls: "f-11", shape: "square", depth: 1.0 },
    { cls: "f-13", shape: "play", depth: 0.65 },
    { cls: "f-14", shape: "pen", depth: 1.15 },
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
    <div className={`hero-decor${enabled ? " hero-decor--interactive" : ""}`} aria-hidden="true">
      {codeSnippets.map((c, i) => (
        <div
          key={"c" + i}
          className={`fl-parallax ${c.cls}`}
          style={heroParallaxStyle(c.depth, offset, enabled)}
        >
          <div className="fl">{c.txt}</div>
        </div>
      ))}
      {shapes.map((s, i) => (
        <div
          key={"s" + i}
          className={`fl-parallax ${s.cls}`}
          style={heroParallaxStyle(s.depth, offset, enabled)}
        >
          <div className="fl"><Shape kind={s.shape} /></div>
        </div>
      ))}
    </div>
  );
}

function Hero() {
  const heroRef = _useRef(null);
  const { offset, enabled } = useHeroParallax(heroRef);

  return (
    <section ref={heroRef} className="hero" id="top">
      <div className="hero-watermark" aria-hidden="true"><Logo /></div>
      <HeroDecor offset={offset} enabled={enabled} />

      <div className="container hero-inner">
        <Reveal as="div">
          <div className="hero-eyebrow">
            <span className="pulse" />
            <T es="Marketing, automatización e IA" en="Marketing, automation & AI" />
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
          <a href={pageUrl("contacto.html")} className="btn btn-outline-white">
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
    slug: "automatizacion",
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
    slug: "diseno",
    num: "02",
    es: { title: "Diseño gráfico & multimedia",
          desc: "Identidad y piezas que se ven hechas con criterio. Lo visual también vende.",
          items: ["Branding (logo, paleta, tipos)", "Contenido para redes", "Fotografía + retoque", "Ilustración, vectores, packaging"] },
    en: { title: "Design & multimedia",
          desc: "Identity and assets built with intent. Visuals close the sale too.",
          items: ["Full branding (logo, palette, type)", "Social-first content", "Photography + retouching", "Illustration, vectors, packaging"] },
    icon: (<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 14l5-5 5 5M14 11l3-3 4 4"/><circle cx="8" cy="8" r="1.5"/></svg>),
  },
  {
    slug: "web",
    num: "03",
    es: { title: "Páginas web",
          desc: "Sitios rápidos, claros y pensados para convertir — no solo para verse bien.",
          items: ["Landings de conversión", "Sitios institucionales", "E-commerce", "Web apps & mantenimiento"] },
    en: { title: "Websites",
          desc: "Fast, clear sites built to convert — not just to look good.",
          items: ["Conversion landings", "Corporate sites", "E-commerce", "Web apps & maintenance"] },
    icon: (<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8h20M8 4v4"/></svg>),
  },
  {
    slug: "marketing",
    num: "04",
    es: { title: "Marketing digital",
          desc: "Estrategia, performance y crecimiento medible. No es magia, es método.",
          items: ["Consultoría digital", "Estrategia en META y Google", "SEO / SEM", "Investigación de público objetivo"] },
    en: { title: "Digital marketing",
          desc: "Strategy, performance, and measurable growth. Not magic — method.",
          items: ["Digital consulting", "META & Google strategy", "SEO / SEM", "Target audience research"] },
    icon: (<svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8M14 7h7v7"/></svg>),
  },
  {
    slug: "community",
    num: "05",
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
            es={<>Cinco áreas, <em>un solo equipo trabajando para vos.</em></>}
            en={<>Five areas, <em>one team working for you.</em></>}
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
              <Reveal as="div" className="service-card-wrap" key={s.slug} delay={(i % 2) + 1}>
                <a className="service-card service-card--link" href={pageUrl(`servicios/${s.slug}.html`)}>
                  <div className="service-icon">{s.icon}</div>
                  <div className="service-num">{s.num} / 05</div>
                  <h3 className="service-title">{c.title}</h3>
                  <p className="service-desc">{c.desc}</p>
                  <ul className="service-list">
                    {c.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                  <span className="service-more">
                    <T es="Ver servicio" en="View service" />
                    <span className="arr">→</span>
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------- TEAM ----------------- */

function TeamSection() {
  const { lang } = useLang();
  return (
    <section className="team-section">
      <div className="container">
        <Reveal as="div" className="section-tag">
          <T es="Equipo" en="Team" />
        </Reveal>
        <Reveal as="h2" className="section-title" delay={1}>
          <T es={<>Las personas detrás de <em>Sys Digital.</em></>} en={<>The people behind <em>Sys Digital.</em></>} />
        </Reveal>
        <div className="team-grid">
          {TEAM_MEMBERS.map((member, i) => {
            const m = lang === "en" ? member.en : member.es;
            return (
              <Reveal as="article" className="team-card" key={member.slug} delay={i + 1}>
                <div className="team-avatar" aria-hidden="true">{member.initials}</div>
                <h3 className="team-name">{m.name}</h3>
                <ul className="team-roles">
                  {m.roles.map((role) => <li key={role}>{role}</li>)}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------- PORTFOLIO / CASOS ----------------- */

function CasesGridFeatured() {
  const { lang } = useLang();
  const featured = FEATURED_CASE_SLUGS
    .map((slug) => CASE_STUDIES.find((c) => c.slug === slug))
    .filter(Boolean);

  return (
    <div className="portfolio-grid portfolio-grid--featured">
      {featured.map((w, i) => {
        const c = lang === "en" ? w.en : w.es;
        const cat = lang === "en" ? w.cat.en : w.cat.es;
        const span = FEATURED_CASE_SPANS[w.slug] || "span-3";
        return (
          <Reveal as="div" className="work-card-wrap" key={w.slug} delay={(i % 3) + 1}>
            <a className={`work-card ${span}`} href={pageUrl(`casos/${w.slug}.html`)}>
              <div className={`work-thumb ${w.grad}`}>
                <div className="work-mock">[ {c.title} ]</div>
              </div>
              <div className="work-meta">
                <div>
                  <div className="work-cat">{cat}</div>
                  <h3 className="work-title">{c.title}</h3>
                </div>
                <div className="work-arrow">
                  <svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                </div>
              </div>
            </a>
          </Reveal>
        );
      })}
    </div>
  );
}

function CasesGridAll() {
  const { lang } = useLang();
  return (
    <ul className="cases-list">
      {CASE_STUDIES.map((w, i) => {
        const c = lang === "en" ? w.en : w.es;
        const cat = lang === "en" ? w.cat.en : w.cat.es;
        return (
          <Reveal as="li" key={w.slug} delay={(i % 2) + 1}>
            <a className="case-list-card" href={pageUrl(`casos/${w.slug}.html`)}>
              <div className={`case-list-visual ${w.grad}`} aria-hidden="true">
                <span className="case-list-visual-label">{c.title}</span>
              </div>
              <div className="case-list-body">
                <span className="case-list-cat">{cat}</span>
                <h3 className="case-list-title">{c.title}</h3>
                <p className="case-list-summary">{c.summary}</p>
                <span className="case-list-cta">
                  <T es="Ver caso" en="View case" />
                  <span className="arr">→</span>
                </span>
              </div>
            </a>
          </Reveal>
        );
      })}
    </ul>
  );
}

function Portfolio() {
  return (
    <section id="work" className="portfolio-section">
      <div className="container">
        <div className="portfolio-header">
          <div>
            <Reveal as="div" className="section-tag">
              <T es="Portfolio" en="Selected work" />
            </Reveal>
            <Reveal as="h2" className="section-title" delay={1} style={{ marginBottom: 0 }}>
              <T
                es={<>Proyectos con <em>resultados reales.</em></>}
                en={<>Projects with <em>real results.</em></>}
              />
            </Reveal>
          </div>
          <Reveal as="a" href={pageUrl("casos.html")} className="btn btn-ghost btn-sm" delay={2}>
            <T es="Ver todos los casos" en="View all work" />
            <span className="arr">→</span>
          </Reveal>
        </div>
        <CasesGridFeatured />
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

function ContactChannels({ compact }) {
  return (
    <div className={`contact-channels${compact ? " contact-channels--compact" : ""}`}>
      <a className="channel" href="https://wa.me/" target="_blank" rel="noreferrer">
        <div className="channel-icon channel-icon--wa">
          <WhatsAppIcon />
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
      <a className="channel" href="#agenda" target="_blank" rel="noreferrer">
        <div className="channel-icon">
          <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/><circle cx="12" cy="14" r="1.5" fill="currentColor" stroke="none"/></svg>
        </div>
        <div className="channel-text">
          <div className="channel-label"><T es="Agenda" en="Schedule" /></div>
          <div className="channel-value"><T es="Reservá tu llamada" en="Pick a time slot" /></div>
        </div>
        <span className="channel-arr">→</span>
      </a>
    </div>
  );
}

function ContactForm() {
  const { lang } = useLang();
  const [done, setDone] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    const data = new FormData(e.currentTarget);
    const lines = [];
    for (const [k, v] of data.entries()) {
      if (String(v).trim()) lines.push(`${k}: ${v}`);
    }
    const subject = encodeURIComponent(lang === "en" ? "Contact — SYS Digital" : "Contacto — SYS Digital");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:hola@sysdigital.com?subject=${subject}&body=${body}`;
    setDone(true);
  };

  if (done) {
    return (
      <div className="contact-form-success">
        <p className="contact-form-success-title">
          <T es="¡Listo!" en="All set!" />
        </p>
        <p className="contact-form-success-text">
          <T
            es="Se abrió tu cliente de correo. Si no aparece, escribinos a hola@sysdigital.com o por WhatsApp."
            en="Your mail app should open. If not, email hola@sysdigital.com or WhatsApp us."
          />
        </p>
        <a href="https://wa.me/" target="_blank" rel="noreferrer" className="btn btn-white">
          WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <h3 className="contact-form-title">
        <T es="Tus datos" en="Your details" />
      </h3>
      <p className="contact-form-sub">
        <T es="Completá los campos y te respondemos a la brevedad." en="Fill in the fields and we'll get back to you soon." />
      </p>

      <div className="contact-form-grid contact-form-grid--fields">
        <label className="contact-field">
          <span><T es="Nombre completo *" en="Full name *" /></span>
          <input name="nombre" type="text" required placeholder={lang === "en" ? "Your name" : "Tu nombre"} />
        </label>
        <label className="contact-field">
          <span>Email *</span>
          <input name="email" type="email" required placeholder={lang === "en" ? "you@company.com" : "tu@empresa.com"} />
        </label>
        <label className="contact-field">
          <span><T es="Nombre de la empresa" en="Company name" /></span>
          <input name="empresa" type="text" placeholder={lang === "en" ? "Your company" : "Nombre de tu empresa"} />
        </label>
        <label className="contact-field">
          <span><T es="Teléfono" en="Phone" /></span>
          <input name="telefono" type="tel" placeholder="+54 11 1234 5678" />
        </label>
      </div>

      <div className="contact-form-actions">
        <button type="submit" className="btn btn-white contact-form-next">
          <T es="Enviar" en="Send" />
          <span className="arr">→</span>
        </button>
      </div>
    </form>
  );
}

function ContactPageBody() {
  const { lang } = useLang();
  const c = CONTACT_PAGE[lang];
  return (
    <section className="contact-section page-contact-main">
      <div className="container page-contact-shell">
        <Reveal as="div" className="contact-card contact-card--page">
          <div className="contact-card-deco" aria-hidden="true">
            <div className="lg-mark"><Logo /></div>
          </div>
          <div className="contact-grid contact-grid--page">
            <div className="contact-page-aside">
              <div className="contact-tag">{c.tag}</div>
              <h2 className="contact-title">
                {lang === "en" ? (
                  <>Let&apos;s start <em>building.</em></>
                ) : (
                  <>Empecemos a <em>construir.</em></>
                )}
              </h2>
              <p className="contact-lead">{c.lead}</p>
              <p className="contact-page-note">
                <T
                  es="Buenos Aires · Respuesta en menos de 24 hs hábiles"
                  en="Buenos Aires · Reply within 24 business hours"
                />
              </p>
              <ContactChannels />
            </div>
            <div className="contact-page-form">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HomeContactCTA() {
  return (
    <section className="contact-section home-contact-cta">
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
                <T
                  es="Completá el formulario en nuestra página de contacto o escribinos por WhatsApp. Te respondemos en menos de 24 hs hábiles."
                  en="Fill out the form on our contact page or message us on WhatsApp. We reply within 24 business hours."
                />
              </p>
              <div className="hero-ctas" style={{ marginTop: 0 }}>
                <a className="btn btn-white" href={pageUrl("contacto.html")}>
                  <T es="Ir a contacto" en="Go to contact" />
                  <span className="arr">→</span>
                </a>
                <a className="btn btn-outline-white" href="https://wa.me/" target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </div>
            </div>
            <ContactChannels />
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
            <a className="nav-brand" href={pageUrl("index.html")}>
              <span className="lg" style={{ width: 36, height: 22, color: "#fff" }}><Logo /></span>
              <span className="nav-brand-name">Sys&nbsp;Digital<span className="dot" /></span>
            </a>
            <p className="tag">
              <T es="Tu aliado estratégico para diseñar, automatizar y escalar lo digital."
                 en="Your strategic ally to design, automate and scale the digital side." />
            </p>
          </div>
          <div className="footer-col">
            <h4><T es="Servicios" en="Services" /></h4>
            <ul>
              <li><a href={pageUrl("servicios/automatizacion.html")}><T es="Automatizaciones" en="Automation" /></a></li>
              <li><a href={pageUrl("servicios/diseno.html")}><T es="Diseño & multimedia" en="Design & multimedia" /></a></li>
              <li><a href={pageUrl("servicios/web.html")}><T es="Páginas web" en="Websites" /></a></li>
              <li><a href={pageUrl("servicios/marketing.html")}><T es="Marketing digital" en="Digital marketing" /></a></li>
              <li><a href={pageUrl("servicios/community.html")}><T es="Community" en="Community" /></a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4><T es="Compañía" en="Company" /></h4>
            <ul>
              <li><a href={pageUrl("nosotros.html")}><T es="Nosotros" en="About" /></a></li>
              <li><a href={pageUrl("carreras.html")}><T es="Carreras" en="Careers" /></a></li>
              <li><a href={pageUrl("casos.html")}><T es="Casos" en="Work" /></a></li>
              <li><a href={pageUrl("index.html#faq")}>FAQ</a></li>
              <li><a href={pageUrl("contacto.html")}><T es="Contacto" en="Contact" /></a></li>
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
      <WhatsAppIcon />
    </a>
  );
}

/* ----------------- Export ----------------- */

Object.assign(window, {
  Hero, HeroDecor, useHeroParallax, heroParallaxStyle,
  Stats, Marquee, Services, TeamSection, CasesGridFeatured, CasesGridAll, Portfolio, Testimonials, FAQ,
  HomeContactCTA, ContactPageBody, Footer, WhatsAppFloat,
});
