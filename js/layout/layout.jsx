/* =================================================================
   js/layout/layout.jsx — Nav, footer helpers, page shells
================================================================= */

const { useState: _useState, useEffect: _useEffect, useRef: _useRef } = React;

const NAV_SERVICES = [
  { slug: "automatizacion", es: "Automatización & IA", en: "Automation & AI" },
  { slug: "diseno", es: "Diseño & multimedia", en: "Design & multimedia" },
  { slug: "web", es: "Páginas web", en: "Websites" },
  { slug: "marketing", es: "Marketing digital", en: "Digital marketing" },
  { slug: "community", es: "Community management", en: "Community" },
];

const SERVICE_ICONS = {
  automatizacion: (<svg viewBox="0 0 24 24"><path d="M4 6h6M14 6h6M4 12h16M4 18h6M14 18h6M10 4v4M14 10v4M10 16v4"/></svg>),
  diseno: (<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 14l5-5 5 5M14 11l3-3 4 4"/><circle cx="8" cy="8" r="1.5"/></svg>),
  web: (<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8h20M8 4v4"/></svg>),
  marketing: (<svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8M14 7h7v7"/></svg>),
  community: (<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 21c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="6" r="2"/><path d="M14 14c2-1 4-1 6 0 1.5.7 2 2 2 3"/></svg>),
};

function SiteNav() {
  const [onCyan, setOnCyan] = _useState(false);
  const [menuOpen, setMenuOpen] = _useState(false);
  const [servicesOpen, setServicesOpen] = _useState(false);
  const { lang, setLang } = useLang();
  const dropdownRef = _useRef(null);
  const isHome = !document.body.dataset.page || document.body.dataset.page === "home";

  _useEffect(() => {
    const compute = () => {
      const hero = document.querySelector(".hero");
      if (!hero) {
        setOnCyan(false);
        return;
      }
      setOnCyan(hero.getBoundingClientRect().bottom > 84);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  _useEffect(() => {
    const close = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    if (servicesOpen) {
      document.addEventListener("click", close);
      return () => document.removeEventListener("click", close);
    }
  }, [servicesOpen]);

  _useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const mainLinks = [
    { href: pageUrl("nosotros.html"), es: "Nosotros", en: "About" },
    { href: pageUrl("carreras.html"), es: "Carreras", en: "Careers" },
    { href: pageUrl("casos.html"), es: "Casos", en: "Work" },
    { href: pageUrl("index.html#faq"), es: "FAQ", en: "FAQ" },
  ];

  const renderServiceLinks = () => NAV_SERVICES.map((s) => (
    <a
      key={s.slug}
      href={pageUrl(`servicios/${s.slug}.html`)}
      className="nav-service-link"
      onClick={() => { setServicesOpen(false); setMenuOpen(false); }}
    >
      {lang === "en" ? s.en : s.es}
    </a>
  ));

  return (
    <nav className={`nav ${onCyan ? "on-cyan" : ""} ${menuOpen ? "nav--open" : ""}`}>
      <a className="nav-brand nav-brand--logo-only" href={pageUrl("index.html")} aria-label="Sys Digital">
        <span className="lg"><Logo /></span>
        <span className="nav-brand-name">Sys&nbsp;Digital<span className="dot" /></span>
      </a>

      <button
        type="button"
        className="nav-burger"
        aria-label="Menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>

      <div className="nav-links">
        <div
          className={`nav-dropdown nav-dropdown--desktop${servicesOpen ? " is-open" : ""}`}
          ref={dropdownRef}
        >
          <button
            type="button"
            className="nav-dropdown-trigger"
            aria-expanded={servicesOpen}
            aria-haspopup="true"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setServicesOpen((v) => !v);
            }}
          >
            <T es="Servicios" en="Services" />
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
          </button>
          <div className="nav-dropdown-panel" role="menu">
            <div className="nav-dropdown-panel-inner">
              {renderServiceLinks()}
            </div>
          </div>
        </div>

        <div className="nav-services-mobile">
          <span className="nav-mobile-group-label"><T es="Servicios" en="Services" /></span>
          <div className="nav-mobile-group-list">
            {renderServiceLinks()}
          </div>
        </div>

        <div className="nav-pages-mobile">
          <span className="nav-mobile-group-label"><T es="Sitio" en="Site" /></span>
          <div className="nav-mobile-group-list">
            {mainLinks.map((l) => (
              <a key={l.href} href={l.href} className="nav-page-link" onClick={() => setMenuOpen(false)}>
                {lang === "en" ? l.en : l.es}
              </a>
            ))}
          </div>
        </div>

        <a
          className="btn btn-primary nav-contact-mobile"
          href={pageUrl("contacto.html")}
          onClick={() => setMenuOpen(false)}
        >
          <T es="Contactanos" en="Contact us" />
          <span className="arr">→</span>
        </a>
      </div>

      <div className="nav-right">
        <div className="lang-switch" role="group" aria-label="Language">
          <button type="button" className={lang === "es" ? "active" : ""} onClick={() => setLang("es")}>ES</button>
          <button type="button" className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
        <a className="btn btn-ghost btn-sm nav-contact-desktop" href={pageUrl("contacto.html")} onClick={() => setMenuOpen(false)}>
          <T es="Contactanos" en="Contact us" />
        </a>
      </div>
    </nav>
  );
}

function PageMarquee({ items }) {
  const list = items && items.length ? items : ["Sys Digital", "Marketing", "Automatización", "Webs", "Diseño"];
  return (
    <div className="marquee">
      <div className="marquee-track">
        <span>
          {list.map((i, k) => <React.Fragment key={k}><span>{i}</span><span className="star">✦</span></React.Fragment>)}
        </span>
        <span aria-hidden>
          {list.map((i, k) => <React.Fragment key={"d" + k}><span>{i}</span><span className="star">✦</span></React.Fragment>)}
        </span>
      </div>
    </div>
  );
}

function PageHero({ tag, title, lead, children, breadcrumbs, variant = "default" }) {
  const heroRef = _useRef(null);
  const useDecor = variant === "default" || variant === "service";
  const { offset, enabled } = useDecor && typeof useHeroParallax === "function"
    ? useHeroParallax(heroRef)
    : { offset: { x: 0, y: 0 }, enabled: false };

  return (
    <section ref={heroRef} className={`hero hero--page hero--${variant}`}>
      <div className="hero-watermark" aria-hidden="true"><Logo /></div>
      {useDecor && typeof HeroDecor === "function" && <HeroDecor offset={offset} enabled={enabled} />}

      <div className="container hero-inner">
        {breadcrumbs}
        <Reveal as="div">
          <div className="hero-eyebrow">
            <span className="pulse" />
            <span>{tag}</span>
          </div>
        </Reveal>
        <h1 className="hero-title hero-title--page">{title}</h1>
        <Reveal as="div" delay={2}>
          <div className="hero-divider" />
        </Reveal>
        {lead && (
          <Reveal as="p" className="hero-sub" delay={3}>{lead}</Reveal>
        )}
        {children && (
          <Reveal as="div" className="hero-ctas" delay={4}>{children}</Reveal>
        )}
      </div>
    </section>
  );
}

function Breadcrumbs({ items }) {
  const { lang } = useLang();
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <a href={pageUrl("index.html")}>{lang === "en" ? "Home" : "Inicio"}</a>
      {items.map((it, i) => (
        <span key={i}>
          <span className="bc-sep">/</span>
          {it.href ? <a href={it.href}>{it.label}</a> : <span className="bc-current">{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}

/** Ícono Streamline sync — assets/icon-sync.svg */
function TimelineSyncIcon({ className = "timeline-sync-icon" }) {
  const stroke = {
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
  };
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <g transform="scale(-1, 1) translate(-14, 0)">
        <path d="M11 9L13 8.5L13.5 10.5" {...stroke} />
        <path
          d="M13 8.5C12.5558 9.75861 11.749 10.8576 10.6813 11.6584C9.61353 12.4592 8.33262 12.926 6.99999 13C5.7681 13.0002 4.566 12.6213 3.55697 11.9146C2.54794 11.2079 1.78088 10.2078 1.35999 9.05"
          {...stroke}
        />
        <path d="M3 5L1 5.5L0.5 3.5" {...stroke} />
        <path
          d="M1 5.5C1.84 3.2 4.42 1 7 1C8.23789 1.00348 9.4444 1.38976 10.4541 2.10588C11.4639 2.822 12.2274 3.8329 12.64 5"
          {...stroke}
        />
      </g>
    </svg>
  );
}

function TimelineLoopBanner({ steps, loopNote }) {
  const bannerRef = _useRef(null);
  const [inView, setInView] = _useState(false);
  const [activeIdx, setActiveIdx] = _useState(-1);
  const totalChips = steps.length + 1;

  _useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  _useEffect(() => {
    if (!inView) {
      setActiveIdx(-1);
      return;
    }
    setActiveIdx(0);
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % totalChips);
    }, 1100);
    return () => clearInterval(id);
  }, [inView, totalChips]);

  return (
    <div
      ref={bannerRef}
      className={`timeline-loop-banner${inView ? " is-animating" : ""}`}
    >
      <div className="timeline-loop-banner-icon" aria-hidden="true">
        <TimelineSyncIcon className="timeline-sync-icon timeline-loop-svg" />
      </div>
      <div className="timeline-loop-banner-text">
        <p className="timeline-loop-banner-title">
          <T es="Proceso iterativo" en="Iterative process" />
        </p>
        <p className="timeline-loop-banner-desc">{loopNote}</p>
        <div className="timeline-loop-chips" aria-hidden="true">
          {steps.map((s, i) => (
            <span
              key={s.num}
              className={`timeline-loop-chip${activeIdx === i ? " is-active" : ""}${activeIdx > i ? " is-done" : ""}`}
            >
              {s.num}
            </span>
          ))}
          <span className={`timeline-loop-chip timeline-loop-chip--back${activeIdx === steps.length ? " is-active" : ""}`}>
            01
          </span>
        </div>
        <div className="timeline-loop-progress" aria-hidden="true">
          <div
            className="timeline-loop-progress-fill"
            style={{ width: inView && activeIdx >= 0 ? `${((activeIdx + 1) / totalChips) * 100}%` : "0%" }}
          />
        </div>
      </div>
    </div>
  );
}

function HowWeWork() {
  const { lang } = useLang();
  const c = HOW_WE_WORK[lang];
  const sectionRef = _useRef(null);
  const trackRef = _useRef(null);
  const stepRefs = _useRef([]);
  const [activeIndex, setActiveIndex] = _useState(0);
  const [lineProgress, setLineProgress] = _useState(0);

  _useEffect(() => {
    stepRefs.current = stepRefs.current.slice(0, c.steps.length);
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const measureRail = () => {
      const firstStep = stepRefs.current[0];
      const lastStep = stepRefs.current[c.steps.length - 1];
      if (!firstStep || !lastStep) return;

      const firstDot = firstStep.querySelector(".timeline-dot");
      const lastDot = lastStep.querySelector(".timeline-dot");
      if (!firstDot || !lastDot) return;

      const trackRect = track.getBoundingClientRect();
      const firstRect = firstDot.getBoundingClientRect();
      const lastRect = lastDot.getBoundingClientRect();
      const railTop = firstRect.top + firstRect.height / 2 - trackRect.top;
      const railEnd = lastRect.top + lastRect.height / 2 - trackRect.top;
      const railLeft = firstRect.left + firstRect.width / 2 - trackRect.left;

      track.style.setProperty("--rail-top", `${railTop}px`);
      track.style.setProperty("--rail-height", `${Math.max(0, railEnd - railTop)}px`);
      track.style.setProperty("--rail-left", `${railLeft}px`);
    };

    const update = () => {
      measureRail();

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionTop = rect.top + window.scrollY;
      const scrollable = Math.max(section.offsetHeight - vh * 0.5, 1);
      const scrolled = window.scrollY - sectionTop + vh * 0.25;
      setLineProgress(Math.min(100, Math.max(0, (scrolled / scrollable) * 100)));

      let active = 0;
      stepRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < vh * 0.52) active = i;
      });
      setActiveIndex(active);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [lang, c.steps.length]);

  return (
    <section className="timeline-section" ref={sectionRef}>
      <div className="container">
        <Reveal as="div" className="section-tag">{c.tag}</Reveal>
        <Reveal as="h2" className="section-title" delay={1}>{c.title}</Reveal>
        <Reveal as="p" className="section-lead timeline-lead" delay={2}>{c.lead}</Reveal>

        <div className="timeline">
          <div className="timeline-track" ref={trackRef}>
            <div className="timeline-rail" aria-hidden="true">
              <div className="timeline-line" />
              <div className="timeline-line-fill" style={{ height: `${lineProgress}%` }} />
            </div>
            <div className="timeline-steps">
            {c.steps.map((step, i) => {
              const isLast = i === c.steps.length - 1;
              const state = i < activeIndex ? "is-past" : i === activeIndex ? "is-active" : "";
              return (
                <article
                  key={step.num}
                  ref={(el) => { stepRefs.current[i] = el; }}
                  className={`timeline-step ${state}${isLast ? " timeline-step--loop" : ""}`.trim()}
                >
                  <div className="timeline-marker">
                    {isLast ? (
                      <span className="timeline-dot timeline-dot--loop" title={c.loopNote}>
                        <TimelineSyncIcon />
                      </span>
                    ) : (
                      <span className="timeline-dot" />
                    )}
                    <span className="timeline-step-num">{step.num}</span>
                  </div>
                  <div className="timeline-body">
                    <h3 className="timeline-title">{step.title}</h3>
                    <p className="timeline-desc">{step.desc}</p>
                  </div>
                </article>
              );
            })}
            </div>
          </div>
          <TimelineLoopBanner steps={c.steps} loopNote={c.loopNote} />
        </div>
      </div>
    </section>
  );
}

function PageCTA() {
  return (
    <section className="contact-section page-cta-section">
      <div className="container">
        <Reveal as="div" className="contact-card">
          <div className="contact-card-deco" aria-hidden="true">
            <div className="lg-mark"><Logo /></div>
          </div>
          <div className="contact-grid">
            <div>
              <div className="section-tag" style={{ color: "rgba(255,255,255,0.7)" }}>
                <T es="Contacto" en="Contact" />
              </div>
              <h2 className="contact-title">
                <T es={<>¿Arrancamos <em>juntos</em>?</>} en={<>Ready to start <em>together</em>?</>} />
              </h2>
              <p className="contact-lead">
                <T es="Contanos tu proyecto y te respondemos en menos de 24 hs hábiles." en="Tell us about your project — we reply within 24 business hours." />
              </p>
              <div className="hero-ctas" style={{ marginTop: 24 }}>
                <a href={pageUrl("contacto.html")} className="btn btn-white">
                  <T es="Contactanos" en="Contact us" />
                  <span className="arr">→</span>
                </a>
                <a href="https://wa.me/" target="_blank" rel="noreferrer" className="btn btn-outline-white">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SiteShell({ children }) {
  const page = document.body.dataset.page || "home";
  return (
    <>
      <SiteNav />
      <main className={`site-main site-main--${page}`}>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

Object.assign(window, {
  SiteNav, PageHero, PageMarquee, Breadcrumbs, TimelineLoopBanner, HowWeWork, PageCTA, SiteShell, NAV_SERVICES, SERVICE_ICONS,
});
