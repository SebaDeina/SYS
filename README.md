# SYS Digital

Sitio estático con React 18 (CDN + Babel). Sin build: cada `.html` es una entrada independiente.

## Estructura

```
SYS/
├── index.html              # Home
├── contacto.html
├── nosotros.html
├── carreras.html
├── casos.html              # Listado de casos
├── assets/                 # Íconos e imágenes
│   ├── favicon.svg
│   └── logo.svg
├── css/
│   └── styles.css          # Estilos globales
├── js/
│   ├── app.jsx             # Router por data-page + mount
│   ├── components.jsx      # Logo, Reveal, LangProvider, etc.
│   ├── data/
│   │   └── site-data.js    # Servicios, casos, textos, pageUrl()
│   ├── layout/
│   │   └── layout.jsx      # Nav, PageHero, PageCTA, HowWeWork
│   ├── pages/
│   │   └── pages.jsx       # About, Service, Cases, Careers, Contact
│   └── sections/
│       └── sections.jsx    # Hero, Services, FAQ, Contact, Footer
├── casos/                  # Detalle por proyecto (*.html)
└── servicios/              # Página por servicio (*.html)
```

## Cómo funciona

1. Cada HTML define `data-page`, `data-base` y opcionalmente `data-slug` en `<body>`.
2. `data-base` es `""` en la raíz o `"../"` en subcarpetas (para links con `pageUrl()`).
3. Los scripts se cargan en orden: datos → componentes → secciones → layout → páginas → app.

## Agregar una página

1. Crear `mi-pagina.html` en la raíz (copiar `nosotros.html` como plantilla).
2. Ajustar `data-page="miPagina"` y registrar el case en `js/app.jsx`.
3. Implementar el componente en `js/pages/pages.jsx`.

## Desarrollo local

Servir la carpeta con cualquier servidor estático, por ejemplo:

```bash
python3 -m http.server 8080
```

Abrir `http://localhost:8080/index.html`.

## Formulario de contacto (Resend)

El envío no puede hacerse desde el navegador (la API key quedaría expuesta). Hay un endpoint serverless en `api/contact.js` para Vercel.

### Configuración

1. Instalar dependencias: `npm install`
2. Copiar `.env.example` → `.env.local` y completar:
   - `RESEND_API_KEY` — clave desde [Resend](https://resend.com/api-keys) (**no commitear**)
   - `RESEND_FROM` — `onboarding@resend.dev` en pruebas; con dominio verificado usá `contacto@tudominio.com`
   - `CONTACT_TO_EMAIL` — `sys.incorporate@gmail.com`
3. Desarrollo local con API: `npx vercel dev` (no uses solo `python -m http.server` para probar el envío)
4. En Vercel → **Settings → Environment Variables**, agregá las mismas variables y redeploy.

### Seguridad

Si la API key se compartió en un chat o repo, **revocala y creá una nueva** en el panel de Resend.
