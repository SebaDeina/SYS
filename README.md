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
