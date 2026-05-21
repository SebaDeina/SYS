const { Resend } = require("resend");

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label, value) {
  const v = value && String(value).trim() ? esc(value) : "—";
  return `<tr><td style="padding:8px 12px 8px 0;color:#64748b;font-size:13px;vertical-align:top;width:140px">${esc(label)}</td><td style="padding:8px 0;font-size:14px;color:#0f172a">${v}</td></tr>`;
}

function buildHtml(body, lang) {
  const isEn = lang === "en";
  const h = (t) => `<h2 style="margin:24px 0 8px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#0d9488">${esc(t)}</h2>`;
  return `
<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;line-height:1.5;background:#f8fafc;padding:24px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:28px">
    <p style="margin:0 0 8px;font-size:18px;font-weight:600;color:#0f172a">${isEn ? "New contact inquiry" : "Nueva consulta de contacto"}</p>
    <p style="margin:0 0 20px;font-size:13px;color:#64748b">SYS Digital · ${new Date().toLocaleString(isEn ? "en-US" : "es-AR")}</p>
    ${h(isEn ? "Your details" : "Tus datos")}
    <table style="width:100%;border-collapse:collapse">${row(isEn ? "Name" : "Nombre", body.nombre)}${row("Email", body.email)}${row(isEn ? "Company" : "Empresa", body.empresa)}${row(isEn ? "Role" : "Cargo", body.cargo)}${row(isEn ? "Phone" : "Teléfono", body.telefono)}</table>
    ${h(isEn ? "Project" : "Proyecto")}
    <table style="width:100%;border-collapse:collapse">${row(isEn ? "Service" : "Servicio", body.servicioLabel || body.servicio)}${row(isEn ? "Stage" : "Etapa", body.etapaLabel || body.etapa)}</table>
    <p style="margin:12px 0 4px;font-size:13px;color:#64748b">${isEn ? "What they need" : "Necesidad"}</p>
    <p style="margin:0;padding:12px;background:#f1f5f9;border-radius:8px;font-size:14px;white-space:pre-wrap">${esc(body.necesidad)}</p>
    ${h(isEn ? "Details" : "Detalles")}
    <table style="width:100%;border-collapse:collapse">${row(isEn ? "Budget" : "Presupuesto", body.presupuestoLabel || body.presupuesto)}${row(isEn ? "Timeline" : "Plazo", body.plazoLabel || body.plazo)}${row(isEn ? "Source" : "Origen", body.origenLabel || body.origen)}${row(isEn ? "Website" : "Sitio web", body.sitio)}</table>
    ${body.notas ? `<p style="margin:12px 0 4px;font-size:13px;color:#64748b">${isEn ? "Notes" : "Notas"}</p><p style="margin:0;padding:12px;background:#f1f5f9;border-radius:8px;font-size:14px;white-space:pre-wrap">${esc(body.notas)}</p>` : ""}
  </div>
</body>
</html>`;
}

module.exports = async (req, res) => {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "sys.incorporate@gmail.com";
  const from = process.env.RESEND_FROM || "onboarding@resend.dev";

  if (!apiKey) {
    return res.status(500).json({ error: "RESEND_API_KEY no configurada en el servidor" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "JSON inválido" });
    }
  }

  if (!body || typeof body !== "object") {
    return res.status(400).json({ error: "Cuerpo inválido" });
  }

  if (body._gotcha) {
    return res.status(200).json({ ok: true });
  }

  const required = ["nombre", "email", "empresa", "telefono", "servicio", "etapa", "necesidad", "presupuesto", "plazo", "origen"];
  for (const key of required) {
    if (!String(body[key] ?? "").trim()) {
      return res.status(400).json({ error: `Falta el campo: ${key}` });
    }
  }

  const email = String(body.email).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  const lang = body.lang === "en" ? "en" : "es";
  const servicio = body.servicioLabel || body.servicio;
  const subject =
    lang === "en"
      ? `New inquiry — ${body.nombre} (${servicio})`
      : `Nueva consulta — ${body.nombre} (${servicio})`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject,
      html: buildHtml(body, lang),
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(502).json({ error: error.message || "Error al enviar el email" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact API:", err);
    return res.status(500).json({ error: "Error interno al enviar" });
  }
};
