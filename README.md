# Galidar Studio Docs (EN, full with Showcase)

- Multi-docs (Legacy/NextGen/Riverology), blog, community (with Discord widget), showcase populated with all plugins & environment packs.
- Animated landing with product & environment cards and video embeds.
- Local search configured; NextGen is the `default` docs instance; `docsPluginIdForPreferredVersion: 'legacy'`.

## Dev

```bash
npm install
npm start
```

## Build

```bash
npm run build
npm run serve
```

## Deploy a GitHub Pages

1. Habilita Pages en el repositorio `GalidarStudio`:
   - Settings → Pages → Build and deployment → Source: **GitHub Actions**.
2. Asegúrate de que `url` y `baseUrl` estén configurados para GitHub Pages:
   - `url: 'https://galidar.github.io'`
   - `baseUrl: '/GalidarStudio/'`
3. Empuja a `main`. El workflow `.github/workflows/deploy.yml` construye y publica automáticamente a Pages.
4. La URL pública quedará en: `https://galidar.github.io/GalidarStudio/`.

## CI local

```bash
# Node recomendado
nvm use 20  # o instala Node 20.x
npm ci
npm run build
npm run serve
```

## Mantenimiento

- Contenido: edita `oceanology-legacy`, `oceanology-nextgen`, `riverology`, `blog`, `src/pages`.
- No subas `build/` ni `.docusaurus/` ni `node_modules/` (protegido por `.gitignore`).
- Si migras a dominio propio, cambia `url` y `baseUrl` y crea `static/CNAME` con tu dominio.
