
### Deploy Checklist

#### 1. Pre-Deploy
- [ ] Esegui `next build`:
  - Verifica il **bundle size** e ottimizza se necessario.
  - Analizza il report con strumenti come [Webpack Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer).
- [ ] Controlla il report di **Lighthouse**:
  - Fai un'analisi per prestazioni, accessibilità, SEO e Best Practices.
- [ ] Verifica **Core Web Vitals**:
  - Usa strumenti come [PageSpeed Insights](https://pagespeed.web.dev/) o [Vercel Analytics](https://vercel.com/analytics).
- [ ] Ottimizzazione immagini:
  - Assicurati che tutte le immagini siano in formato ottimizzato (`webp`, `avif`).
  - Usa il supporto **Next.js Image Optimization**.
- [ ] Verifica compressione:
  - Controlla che **gzip** e **brotli** siano abilitati sul server.
- [ ] Controlla **caching headers**:
  - Configura correttamente i tempi di cache per asset statici.

#### 2. Performance
- [ ] Verifica **First Contentful Paint (FCP)**:
  - Deve essere inferiore a **1.8s**.
- [ ] Verifica **Time to Interactive (TTI)**:
  - Deve essere inferiore a **3.8s**.
- [ ] Controlla **Cumulative Layout Shift (CLS)**:
  - Deve essere inferiore a **0.1**.
- [ ] Verifica **First Input Delay (FID)**:
  - Deve essere inferiore a **100ms**.
- [ ] Test responsività:
  - Usa viewport diversi per verificare layout e performance su mobile, tablet e desktop.

#### 3. SEO
- [ ] **Meta tags** corretti:
  - Verifica che ogni pagina abbia meta tag **title** e **description** unici.
- [ ] Genera **sitemap.xml**:
  - Assicurati che la sitemap sia aggiornata e accessibile.
- [ ] Configura **robots.txt**:
  - Controlla che i percorsi sensibili siano esclusi.
- [ ] Implementa **Schema.org markup**:
  - Usa [Google Structured Data Testing Tool](https://search.google.com/test/rich-results) per verificare il markup.
