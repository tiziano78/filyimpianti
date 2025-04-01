# Checklist Pre-Produzione

## Configurazione Ambiente
- [x] Verifica presenza di `.env.production` con le variabili d'ambiente corrette
- [x] Verifica presenza di `vercel.json` con la configurazione corretta
- [x] Verifica che il token Mapbox sia configurato correttamente
- [ ] Verifica che tutte le API keys siano configurate in Vercel

## Performance e Ottimizzazioni
- [ ] Esegui `npm run build` localmente per verificare eventuali errori
- [ ] Verifica che le immagini siano ottimizzate
- [ ] Controlla che il bundle size sia ottimizzato (usa `npm run analyze`)
- [ ] Verifica che il lazy loading sia implementato correttamente
- [ ] Controlla che i Core Web Vitals siano nella norma

## SEO e Metadata
- [ ] Verifica che tutti i meta tags siano presenti
- [ ] Controlla che il robots.txt sia configurato correttamente
- [ ] Verifica che sitemap.xml sia generato correttamente
- [ ] Controlla che i title e le description siano ottimizzati

## Sicurezza
- [ ] Verifica che non ci siano token o chiavi sensibili nel codice
- [ ] Controlla che gli headers di sicurezza siano configurati
- [ ] Verifica che CORS sia configurato correttamente
- [ ] Controlla che le API routes siano protette appropriatamente

## Testing
- [ ] Esegui i test automatizzati
- [ ] Verifica la responsività su diversi dispositivi
- [ ] Testa le funzionalità principali
- [ ] Verifica che i form funzionino correttamente
- [ ] Testa le integrazioni con Mapbox

## Monitoraggio
- [ ] Configura il logging in produzione
- [ ] Imposta gli alert per errori critici
- [ ] Verifica che Analytics sia configurato correttamente

## Post-Deploy
- [ ] Verifica che il dominio sia configurato correttamente
- [ ] Controlla che SSL/HTTPS sia attivo
- [ ] Verifica che il caching sia configurato correttamente
- [ ] Testa le performance in produzione

## Note Aggiuntive
- Ricorda di verificare la compatibilità cross-browser
- Testa la velocità di caricamento su connessioni lente
- Verifica che tutte le funzionalità di Mapbox funzionino in produzione
