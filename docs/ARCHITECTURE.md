# Architettura del Progetto

## Struttura delle Directory

```
filyimpianti/
├── src/
│   ├── app/                    # Directory principale Next.js App Router
│   │   ├── blog/              # Pagine del blog
│   │   ├── actions.ts         # Server Actions
│   │   ├── layout.tsx         # Layout principale
│   │   └── page.tsx           # Homepage
│   ├── components/            # Componenti React riutilizzabili
│   │   ├── Banner/           # Banner e CTA
│   │   ├── layout/           # Componenti del layout (navbar, footer)
│   │   ├── maps/             # Componenti per la mappa e configuratore
│   │   ├── forms/            # Form e componenti correlati
│   │   ├── modals/           # Finestre modali
│   │   └── widgets/          # Widget riutilizzabili
│   ├── data/                 # Dati statici
│   │   ├── batterieFotovoltaiche.ts
│   │   ├── inverterFotovoltaici.ts
│   │   └── pannelliFotovoltaici.ts
│   ├── lib/                  # Utility e funzioni di libreria
│   │   └── images.ts         # Gestione e ottimizzazione immagini
│   ├── styles/               # Stili globali e variabili CSS
│   ├── types/                # Definizioni TypeScript
│   └── utils/                # Utility functions
├── public/                   # Asset statici
└── docs/                     # Documentazione
```

## Tecnologie Principali

- **Framework**: Next.js 14+ con App Router
- **Linguaggio**: TypeScript
- **Stili**: CSS Modules + TailwindCSS
- **Mappe**: Mapbox GL JS + DeckGL
- **State Management**: React Hooks + Context
- **Testing**: Jest + React Testing Library + Cypress

## Componenti Chiave

### Configuratore Fotovoltaico
- `ConfigPopup`: Interfaccia principale del configuratore
- `ConfigMap`: Visualizzazione e interazione con la mappa
- Integrazione con DeckGL per il rendering dei pannelli

### Sistema di Layout
- `Navbar`: Menu di navigazione responsive
- `Footer`: Footer con informazioni di contatto e link legali
- `Banner`: Componenti per sezioni promozionali

### Widgets
- `GuaranteeWidget`: Mostra le garanzie aziendali
- `SolarBenefitsWidget`: Visualizza i benefici del fotovoltaico

### Forms
- `InfoFormPopup`: Form di richiesta informazioni
- Validazione e gestione dello stato dei form

## Ottimizzazioni

### Performance
- Ottimizzazione immagini con Sharp e Plaiceholder
- Code splitting automatico
- Caching delle risorse statiche

### SEO
- Metadata dinamici per ogni pagina
- Schema.org markup per rich snippets
- Ottimizzazione per social media

### Sicurezza
- Sanitizzazione input utente
- Rate limiting per le API
- Protezione CSRF

## Integrations

### Analytics
- Google Analytics 4
- Eventi personalizzati per tracking conversioni

### Mappe
- Mapbox GL JS per il rendering base
- DeckGL per layer interattivi
- Calcolo ombre in tempo reale

### Storage
- Cache locale per configurazioni
- Gestione stato persistente

## Testing

### Unit Testing
- Jest per test unitari
- React Testing Library per component testing

### E2E Testing
- Cypress per test end-to-end
- Test automatizzati del configuratore

## CI/CD

- Vercel per deployment automatico
- GitHub Actions per CI
- Controlli di qualità automatizzati

## Best Practices

### Sviluppo
- Componenti atomici e riutilizzabili
- Type safety con TypeScript
- Gestione errori centralizzata

### Performance
- Lazy loading dei componenti pesanti
- Ottimizzazione bundle size
- Caching aggressivo

### Accessibilità
- ARIA labels
- Supporto tastiera
- Contrasto colori ottimizzato

## Roadmap Futura

- [ ] Implementazione PWA
- [ ] Miglioramenti calcolo ombre
- [ ] Integrazione CMS per blog
- [ ] Sistema di notifiche push
- [ ] Ottimizzazione rendering 3D 