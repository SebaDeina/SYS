/* =================================================================
   js/components.jsx — utilities & primitives
   Exposes to window: Cursor, Reveal, Counter, Logo, useLang, T
================================================================= */

const { useEffect, useState, useRef, useCallback, createContext, useContext } = React;

/* ----------------- Language context ----------------- */

const LangCtx = createContext({ lang: "es", setLang: () => {} });

function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("sysd_lang") || "es"; } catch (e) { return "es"; }
  });
  useEffect(() => {
    try { localStorage.setItem("sysd_lang", lang); } catch (e) {}
    document.documentElement.lang = lang;
  }, [lang]);
  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

function useLang() { return useContext(LangCtx); }

// Translation helper — pass an object {es: "...", en: "..."}
function T({ es, en }) {
  const { lang } = useLang();
  return <>{lang === "en" ? en : es}</>;
}

function t(obj, lang) { return obj[lang] || obj.es; }

/* ----------------- Custom cursor ----------------- */

function Cursor() {
  return null;
}

/* ----------------- Reveal on scroll ----------------- */

function Reveal({ children, delay = 0, as = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${seen ? "in" : ""} ${className}`}
      data-delay={delay}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ----------------- Animated counter ----------------- */

function Counter({ to, duration = 1800, suffix = "", prefix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const elapsed = now - start;
          const p = Math.min(1, elapsed / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>{prefix}{val}{suffix}</span>
  );
}

/* ----------------- Logo SVG ----------------- */

function Logo() {
  return (
    <svg viewBox="0 0 1875.34 1000.37" xmlns="http://www.w3.org/2000/svg" aria-label="Sys Digital logo" style={{ display: "block", width: "100%", height: "100%", fill: "currentColor" }}>
      <g>
        <path d="M1057.54,237.97C1087.99,201.11,1256.7,4.05,1520.51.06c96.52-1.45,175.96,23.36,229.94,46.57-97.24-9.39-193.56-18.09-232.76,15.34,15.23-1.01,163.55,33.84,239.97,141.84,80.93,166.49,29.16,377.7-101.84,472.2-38.75,27.95-120.36,55.87-122.22,52.17-.97-1.94,19.94-12.33,36.94-24.21,65.22-45.72,103.53-135.07,103.65-217.33.16-85.8-37.63-149.73-58.21-173.58-17.97-20.83-75.9-78.43-184.22-59.86-134.38,23.04-247.58,123.99-264.14,135.31l-110.09-150.54Z" />
        <path d="M1757.7,203.85c30.21,38.55,77.71,109.49,102.12,209.83,35.45,145.63.28,262.61-8.46,289.84-58.81,182.81-203.31,273.32-243.83,296.85,19.38-15.15,47.81-41.21,71.42-81.17,18.21-30.82,27.51-59.66,32.51-80.77-17.16,18.81-48.5,48.34-95.95,69.48-2.98,1.33-48.82,21.31-104.9,24.57-140.07,8.18-260.71-92.89-277.55-107.39-134.63-115.73-156.42-275.94-160.85-318.93,26.83,33.2,79.96,91.97,177.05,160.9,58.01,41.17,158.56,89.27,275.58,63.32,144.78-32.1,214.31-163.47,230.18-196.3,75.73-156.62,12.89-306.92,2.7-330.24Z" />
        <path d="M1510.6,932.46c-21.11,9.3-266.19-15.15-442.71-194.53-121.29-123.27-223.69-223.17-273.44-307.44-5.72-18.78-14.18-43.43-26.59-71.43-7.41-16.68-29.73-66.51-65.18-113.03-17.53-22.96-78.11-97.77-174.06-148.44C360.52,8.8,190.08,45.9,142.42,57.95c108.77-30.57,343.09-78.15,539.07,37.86,93.42,55.31,178.17,147.84,232.55,207.22,58.97,64.37,81.05,117.83,158.15,203.03,54.95,60.71,105.46,105.38,139.7,133.78,15.95,61.23,46.21,134.51,108.2,194.01,85.84,82.46,190.86,98.45,190.5,98.61Z" />
        <path d="M820.51,751.42c-29.57,37.55-193.72,238.44-457.38,248.51-96.48,3.67-176.44-19.3-230.94-41.29,97.44,7.17,193.92,13.66,232.35-20.7-15.22,1.33-164.31-30.09-243.19-136.28-84.76-164.6-37.83-376.93,90.96-474.42,38.07-28.84,119.08-58.65,120.97-54.98,1.01,1.93-19.66,12.77-36.38,25.06-64.13,47.21-100.39,137.41-98.61,219.66,1.81,85.8,41.05,148.85,62.2,172.21,18.45,20.38,77.66,76.66,185.54,55.59,133.82-26.1,244.68-129.67,260.95-141.35l113.52,148Z" />
        <path d="M811.48,515.52c-5.84-48.66-22.35-132.37-76.01-220.63-77.83-128.1-185.34-186.03-210.77-199.12C353.91,7.99,187.7,46.06,142.42,58.02c24.41-2.98,62.96-4.59,107.88,6.97,34.68,8.94,61.63,22.76,80.08,34.16-25.42-1.21-68.48.08-116.98,18.65-3.02,1.17-49.63,19.42-91.6,56.72C16.9,267.74,2.96,424.48,1.27,446.64c-13.49,177.01,84.31,305.75,111.54,339.35-13.17-32.27-47.41-128.34-16.8-244.8,8.62-32.83,47.05-161.02,178.66-233.65,138.57-76.49,274.73-33.11,301.6-23.77,164.2,57.24,225.95,208.02,235.21,231.75Z" />
      </g>
    </svg>
  );
}

/* ----------------- WhatsApp icon (official mark) ----------------- */

function WhatsAppIcon() {
  return (
    <svg className="wa-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

/* ----------------- Magnetic wrapper ----------------- */

function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onLeave = () => { el.style.transform = "translate(0,0)"; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return <span ref={ref} style={{ display: "inline-flex", transition: "transform 320ms cubic-bezier(0.2,0.8,0.2,1)" }}>{children}</span>;
}

/* ----------------- Export to window ----------------- */

Object.assign(window, {
  LangProvider, useLang, T, t,
  Cursor, Reveal, Counter, Logo, WhatsAppIcon, Magnetic,
});
