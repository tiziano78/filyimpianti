
### Procedura Deploy Produzione

#### 1. Pre-deploy
   - **Verifica variabili d'ambiente**:
     - Controllare che tutte le variabili necessarie siano configurate correttamente su Vercel.
     - Confermare che le chiavi API abbiano restrizioni di dominio/IP adeguate.
   - **Test su staging**:
     - Eseguire il deploy su un ambiente di staging per verificare eventuali problemi.
     - Testare nuove credenziali (SMTP, API, ecc.) direttamente su staging.

#### 2. Deploy
   - **Eseguire il comando di deploy**:
     ```bash
     vercel --prod
     ```
     - Assicurarsi che venga utilizzato il branch corretto (es. `main` o `production`).
   - **Verifica dei log**:
     - Controllare i log durante e dopo il deploy con:
       ```bash
       vercel logs <deployment-id>
       ```
     - Identificare eventuali errori di build o runtime.

#### 3. Post-deploy
   - **Verifica funzionamento email**:
     - Inviare una email di test e controllare che venga ricevuta correttamente.
   - **Verifica Google Maps**:
     - Confermare che le mappe si carichino correttamente e siano funzionali.
   - **Monitoraggio degli errori**:
     - Monitorare errori e performance usando strumenti come:
       - **Sentry**: Per tracciare errori runtime.
       - **Vercel Analytics**: Per analizzare i Core Web Vitals.
     - Continuare a monitorare per le prime 24 ore dopo il deploy.
