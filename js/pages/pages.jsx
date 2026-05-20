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
          <h2 className="careers-steps-title">
            {lang === "en" ? "Hiring process" : "Proceso de selección"}
          </h2>
          <ol className="careers-steps-list">
            {c.process.map((step, i) => (
              <li key={i}>
                <span className="careers-step-num">{String(i + 1).padStart(2, "0")}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
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

Object.assign(window, {
  ServicePage, CasesIndexPage, CasePage, AboutPage, CareersPage, ContactPage,
});
