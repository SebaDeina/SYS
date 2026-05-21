/* =================================================================
   js/pages/pages.jsx — páginas internas (cada una con identidad propia)
================================================================= */

function ServicePage({ slug }) {
  const { lang } = useLang();
  const service = getServiceBySlug(slug);
  if (!service) return <div className="container" style={{ padding: 120 }}>404</div>;

  const c = lang === "en" ? service.en : service.es;
  const marqueeItems = service.offerings.flatMap((o) => {
    const item = lang === "en" ? o.en : o.es;
    return item.tags;
  });

  return (
    <div className="page-service">
      <PageHero
        variant="service"
        tag={lang === "en" ? "Service" : "Servicio"}
        title={c.title}
        lead={c.heroLead}
        breadcrumbs={
          <Breadcrumbs items={[
            { href: pageUrl("index.html#services"), label: lang === "en" ? "Services" : "Servicios" },
            { label: c.title },
          ]} />
        }
      >
        <a href={pageUrl("contacto.html")} className="btn btn-white">
          <T es="Pedir presupuesto" en="Get a quote" />
          <span className="arr">→</span>
        </a>
      </PageHero>
      <PageMarquee items={marqueeItems} />
      <section className="services-section page-offerings">
        <div className="container">
          <Reveal as="div" className="section-tag">
            <T es="Qué incluye" en="What's included" />
          </Reveal>
          <Reveal as="h2" className="section-title" delay={1}>
            <T es={<>Modalidades y <em>entregables.</em></>} en={<>Formats and <em>deliverables.</em></>} />
          </Reveal>
          <Reveal as="p" className="section-lead" delay={2}>{c.intro}</Reveal>
          <div className="services-grid offerings-as-services">
            {service.offerings.map((o, i) => {
              const item = lang === "en" ? o.en : o.es;
              const num = String(i + 1).padStart(2, "0");
              return (
                <Reveal as="article" className="service-card offering-card" key={i} delay={(i % 2) + 1}>
                  <div className="service-icon">{SERVICE_ICONS[slug] || SERVICE_ICONS.web}</div>
                  <div className="service-num">{num} / {String(service.offerings.length).padStart(2, "0")}</div>
                  <h3 className="service-title">{item.title}</h3>
                  <p className="service-desc">{item.desc}</p>
                  <ul className="service-list offering-tags-list">
                    {item.tags.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <HowWeWork />
      <PageCTA />
    </div>
  );
}

function CasesIndexPage() {
  const { lang } = useLang();
  const c = CASES_INDEX_CONTENT[lang];

  return (
    <div className="page-cases">
      <PageHero variant="service" tag={c.tag} title={c.title} lead={c.lead} />
      <section className="cases-index-section">
        <div className="container">
          <Reveal as="p" className="cases-index-count" delay={1}>
            <T
              es={<>{CASE_STUDIES.length} proyectos · elegí uno para ver el detalle</>}
              en={<>{CASE_STUDIES.length} projects · pick one to read the full story</>}
            />
          </Reveal>
          <CasesGridAll />
        </div>
      </section>
      <PageCTA />
    </div>
  );
}

function CasePage({ slug }) {
  const { lang } = useLang();
  const project = getCaseBySlug(slug);
  if (!project) return null;

  const c = lang === "en" ? project.en : project.es;
  const cat = lang === "en" ? project.cat.en : project.cat.es;

  return (
    <div className="page-case">
      <section className={`case-hero-full ${project.grad}`}>
        <div className="hero-watermark" aria-hidden="true"><Logo /></div>
        <div className="container case-hero-full-inner">
          <Breadcrumbs items={[
            { href: pageUrl("casos.html"), label: lang === "en" ? "Work" : "Casos" },
            { label: c.title },
          ]} />
          <Reveal as="div">
            <div className="hero-eyebrow">
              <span className="pulse" />
              <span>{cat}</span>
            </div>
          </Reveal>
          <h1 className="hero-title hero-title--page hero-title--light">{c.title}</h1>
          <Reveal as="p" className="hero-sub hero-sub--light" delay={2}>{c.summary}</Reveal>
        </div>
      </section>
      <PageMarquee items={[cat, ...c.results.slice(0, 4)]} />
      <section className="case-story-section">
        <div className="container case-story">
          <Reveal as="article" className="case-story-block">
            <span className="case-story-label">{lang === "en" ? "Challenge" : "Desafío"}</span>
            <p>{c.challenge}</p>
          </Reveal>
          <Reveal as="article" className="case-story-block case-story-block--accent" delay={1}>
            <span className="case-story-label">{lang === "en" ? "Solution" : "Solución"}</span>
            <p>{c.solution}</p>
          </Reveal>
        </div>
      </section>
      <section className="case-results-section">
        <div className="container">
          <h2 className="section-title">
            <T es={<>Impacto <em>medible.</em></>} en={<>Measurable <em>impact.</em></>} />
          </h2>
          <ul className="case-results">
            {c.results.map((r, i) => (
              <Reveal as="li" key={r} delay={(i % 3) + 1}>{r}</Reveal>
            ))}
          </ul>
        </div>
      </section>
      <PageCTA />
    </div>
  );
}

function AboutPage() {
  const { lang } = useLang();
  const c = ABOUT_CONTENT[lang];

  return (
    <div className="page-about">
      <PageHero variant="about" tag={c.tag} title={c.title} lead={c.lead} />
      <section className="about-editorial">
        <div className="container">
          <Reveal as="div" className="section-tag">
            <T es="Quiénes somos" en="Who we are" />
          </Reveal>
          <Reveal as="h2" className="section-title" delay={1}>
            <T es={<>Un equipo, <em>varias disciplinas.</em></>} en={<>One team, <em>many disciplines.</em></>} />
          </Reveal>
          <div className="about-cards-grid">
            {c.blocks.map((b, i) => (
              <Reveal as="article" className="about-card" key={i} delay={(i % 3) + 1}>
                <div className="about-card-num">
                  {String(i + 1).padStart(2, "0")} / {String(c.blocks.length).padStart(2, "0")}
                </div>
                <h3 className="about-card-title">{b.title}</h3>
                <p className="about-card-desc">{b.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <TeamSection />
      <section className="about-values-band">
        <div className="container">
          <p className="about-values-label">
            {lang === "en" ? "What we stand for" : "Lo que nos importa"}
          </p>
          <div className="values-row">
            {c.values.map((v) => (
              <span className="value-pill" key={v}>{v}</span>
            ))}
          </div>
        </div>
      </section>
      <HowWeWork />
      <PageCTA />
    </div>
  );
}

function CareersHiringProcess({ steps }) {
  const trackRef = React.useRef(null);
  const targetProgress = React.useRef(0);
  const smoothProgress = React.useRef(0);
  const [progress, setProgress] = React.useState(0);
  const rafRef = React.useRef(null);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      targetProgress.current = Math.min(
        1,
        Math.max(0, (vh * 0.58 - rect.top) / Math.max(rect.height * 0.75, 1))
      );
    };

    const tick = () => {
      const prev = smoothProgress.current;
      const next = prev + (targetProgress.current - prev) * 0.06;
      const settled = Math.abs(targetProgress.current - next) < 0.002;
      smoothProgress.current = settled ? targetProgress.current : next;
      setProgress(smoothProgress.current);
      if (!settled) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    const onScroll = () => {
      measure();
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    measure();
    smoothProgress.current = targetProgress.current;
    setProgress(targetProgress.current);
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [steps.length]);

  const position = progress * Math.max(steps.length - 1, 1);

  return (
    <div className="careers-process-scroll">
      <div className="careers-process-track" ref={trackRef}>
        <div className="careers-process-line" aria-hidden="true">
          <span className="careers-process-line-dash" />
          <span
            className="careers-process-line-fill"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <ol className="careers-process-steps">
          {steps.map((step, i) => {
            const focus = Math.max(0, 1 - Math.abs(position - i) * 0.85);
            const reach = Math.min(1, Math.max(0, position - i + 0.55));
            return (
              <li
                key={i}
                className="careers-process-step"
                style={{ "--focus": focus, "--reach": reach }}
              >
                <span className="careers-process-marker">{String(i + 1).padStart(2, "0")}</span>
                <p className="careers-process-text">{step}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function CareersPage() {
  const { lang } = useLang();
  const c = CAREERS_CONTENT[lang];
  const mailSubject = lang === "en" ? "Application" : "Postulación";
  const mailHref = `mailto:hola@sysdigital.com?subject=${encodeURIComponent(mailSubject)}`;

  return (
    <div className="page-careers">
      <PageHero variant="careers" tag={c.tag} title={c.title} lead={c.lead}>
        <a href={mailHref} className="btn btn-white">
          <T es="Enviá tu CV" en="Send your CV" />
          <span className="arr">→</span>
        </a>
        <a href="#roles" className="btn btn-outline-white">
          <T es="Ver posiciones" en="View open roles" />
        </a>
      </PageHero>

      <section className="careers-perks">
        <div className="container careers-perks-grid">
          {c.culture.map((item, i) => (
            <Reveal as="article" className="careers-perk" key={i} delay={(i % 3) + 1}>
              <span className="careers-perk-icon" aria-hidden="true">{["◆", "◇", "○"][i % 3]}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="careers-apply-banner">
        <div className="container careers-apply-inner">
          <div>
            <h2>
              <T es={<>Tu CV, <em>directo al equipo.</em></>} en={<>Your CV, <em>straight to the team.</em></>} />
            </h2>
            <p>
              <T
                es="No hace falta que el rol esté publicado. Si sentís que podés sumar, escribinos con tu portfolio o GitHub."
                en="The role doesn't have to be listed. If you think you'd be a fit, reach out with your portfolio or GitHub."
              />
            </p>
          </div>
          <a href={mailHref} className="btn btn-white">
            hola@sysdigital.com
            <span className="arr">→</span>
          </a>
        </div>
      </section>

      <section className="careers-steps">
        <div className="container">
          <Reveal as="h2" className="careers-steps-title">
            {lang === "en" ? "Hiring process" : "Proceso de selección"}
          </Reveal>
          <CareersHiringProcess steps={c.process} />
        </div>
      </section>

      <section id="roles" className="careers-roles">
        <div className="container">
          <h2 className="careers-roles-title">
            {lang === "en" ? "Open roles" : "Posiciones abiertas"}
          </h2>
          <div className="careers-roles-grid">
            {OPEN_ROLES.map((role, i) => {
              const r = lang === "en" ? role.en : role.es;
              return (
                <Reveal as="article" className="careers-role-card" key={role.slug} delay={(i % 2) + 1}>
                  <div className="careers-role-meta">
                    <span>{role.type.replace("-", " ")}</span>
                    <span>{r.location}</span>
                  </div>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                  <a href={`${mailHref}&body=${encodeURIComponent(r.title)}`} className="btn btn-primary btn-sm">
                    {lang === "en" ? "Apply" : "Postularme"}
                    <span className="arr">→</span>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="page-contact">
      <ContactPageBody />
    </div>
  );
}

function TermsPage() {
  const { lang } = useLang();
  const c = TERMS_LEGAL[lang];

  React.useEffect(() => {
    const hash = window.location.hash?.slice(1);
    if (!hash) return;
    const scroll = () => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    scroll();
    requestAnimationFrame(scroll);
    setTimeout(scroll, 200);
  }, []);

  return (
    <div className="page-legal">
      <PageHero
        variant="default"
        tag={c.tag}
        title={c.title}
        lead={c.lead}
        breadcrumbs={
          <Breadcrumbs items={[{ label: c.title }]} />
        }
      />
      <section className="legal-section">
        <div className="container legal-layout">
          <aside className="legal-toc" aria-label={c.tocTitle}>
            <p className="legal-toc-label">{c.tocTitle}</p>
            <nav>
              <ul>
                {c.sections.map((sec) => (
                  <li key={sec.id}>
                    <a href={`#${sec.id}`}>{sec.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="legal-updated">
              <T es="Última actualización:" en="Last updated:" /> {c.updated}
            </p>
          </aside>
          <div className="legal-prose">
            {c.sections.map((sec) => (
              <article key={sec.id} id={sec.id} className="legal-block">
                <h2 className="legal-block-title">{sec.title}</h2>
                {sec.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {sec.list && (
                  <dl className="legal-cookie-list">
                    {sec.list.map((item) => (
                      <React.Fragment key={item.name}>
                        <dt>{item.name}</dt>
                        <dd>{item.desc}</dd>
                      </React.Fragment>
                    ))}
                  </dl>
                )}
                {sec.afterList?.map((p, i) => (
                  <p key={`after-${i}`}>{p}</p>
                ))}
              </article>
            ))}
            <div className="legal-actions">
              <button type="button" className="btn btn-primary" onClick={() => openCookiePreferences()}>
                <T es="Gestionar cookies" en="Manage cookies" />
              </button>
              <a href={pageUrl("contacto.html")} className="btn btn-ghost">
                <T es="Contacto" en="Contact" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, {
  ServicePage, CasesIndexPage, CasePage, AboutPage, CareersPage, ContactPage, TermsPage,
});
