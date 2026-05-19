/* =================================================================
   app.jsx — root mount
================================================================= */

function App() {
  return (
    <LangProvider>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Services />
        <Portfolio />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </LangProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
