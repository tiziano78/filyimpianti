
# Checklist Pre-Produzione

## Sicurezza
- [ ] Rigenerare tutte le credenziali esposte:
  - [ ] Nuova password SMTP.
  - [ ] Nuova Google Maps API Key con restrizioni.
  - [ ] Nuovo Google Place ID se necessario.
- [ ] Verificare **Content Security Policy (CSP)**:
  - [ ] Controllare regole per script, immagini, font e altre risorse.
- [ ] Controllare **CORS Policy**:
  - [ ] Consentire solo i domini richiesti.
- [ ] Verificare protezione **CSRF**:
  - [ ] Implementare token CSRF per API e form.
  - [ ] Verificare header di sicurezza.

## Configurazione su Vercel
- [ ] Configurare le **variabili d'ambiente**:
  - [ ] `SMTP_HOST`
  - [ ] `SMTP_PORT`
  - [ ] `SMTP_USER`
  - [ ] `SMTP_PASSWORD` (nuova).
  - [ ] `RECIPIENT_EMAIL`
  - [ ] `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (nuova).
  - [ ] `NEXT_PUBLIC_GOOGLE_PLACE_ID`
- [ ] Verificare regole di protezione dei branch:
  - [ ] Assicurarsi che solo branch approvati possano essere deployati.
- [ ] Configurare **domini personalizzati**:
  - [ ] Impostare il dominio principale.
  - [ ] Configurare eventuali sottodomini.
- [ ] Impostare redirect **HTTPS**:
  - [ ] Forzare HTTPS su tutti i percorsi.

## Restrizioni API
- [ ] Limitare Google Maps API Key:
  - [ ] Consentire solo il dominio di produzione.
  - [ ] Configurare IP whitelist se necessario.
  - [ ] Impostare limiti di quota appropriati.
- [ ] Abilitare solo i servizi necessari:
  - [ ] Disabilitare servizi API non utilizzati.

## Test
- [ ] **Verifica funzionamento email in produzione**:
  - [ ] Assicurati che le notifiche email siano inviate correttamente.
  - [ ] Testa scenari come errori SMTP e messaggi in coda.
- [ ] **Verifica Google Maps in produzione**:
  - [ ] Controlla che le mappe siano visibili e correttamente interattive.
  - [ ] Conferma che le API restituiscano dati previsti (es. geocodifica, autocompletamento).
- [ ] **Verifica tutti i form di contatto**:
  - [ ] Testa validazione dei campi (incluso obbligatori e formattazione).
  - [ ] Simula errori lato server (es. API non disponibile) e verifica i messaggi di errore all'utente.

## Sicurezza API
- [x] Rigenerare Google Maps API Key.
- [ ] Configurare restrizioni per dominio:
  - [ ] Assicurati che le chiavi API siano limitate ai domini specifici.
- [ ] Configurare quote limiti:
  - [ ] Imposta limiti di utilizzo per evitare sovraccarichi.
- [ ] Abilitare solo i servizi necessari:
  - [ ] Disabilita qualsiasi API o servizio che non venga utilizzato attivamente per ridurre il rischio di abuso.
