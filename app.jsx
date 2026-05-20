/* =================================================================
   app.jsx — root mount + routing por data-page
================================================================= */

function useScrollToHash() {
  React.useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const tryScroll = () => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      tryScroll();
      requestAnimationFrame(tryScroll);
      setTimeout(tryScroll, 120);
      setTimeout(tryScroll, 400);
    };
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);
}

function HomePage() {
  useScrollToHash();
  return (
    <>
      <Hero />
      <Marquee />
      <Stats />
      <Services />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <HomeContactCTA />
    </>
  );
}

function App() {
  const page = document.body.dataset.page || "home";
  const slug = document.body.dataset.slug || "";

  let inner = null;
  switch (page) {
    case "about":
      inner = <AboutPage />;
      break;
    case "service":
      inner = <ServicePage slug={slug} />;
      break;
    case "cases":
      inner = <CasesIndexPage />;
      break;
    case "case":
      inner = <CasePage slug={slug} />;
      break;
    case "careers":
      inner = <CareersPage />;
      break;
    case "contact":
      inner = <ContactPage />;
      break;
    default:
      inner = <HomePage />;
  }

  if (page === "home") {
    return (
      <LangProvider>
        <Cursor />
        <SiteNav />
        <main>{inner}</main>
        <Footer />
        <WhatsAppFloat />
      </LangProvider>
    );
  }

  return (
    <LangProvider>
      <Cursor />
      <SiteShell>{inner}</SiteShell>
    </LangProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
