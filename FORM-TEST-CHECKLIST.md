
## Checklist Test Form Contatti

### 1. **Validazione Campi**
- [ ] Tutti i campi richiesti mostrano un messaggio di errore se lasciati vuoti.
- [ ] Formati accettabili (es. email, numeri di telefono) vengono validati correttamente.
- [ ] Campi opzionali non causano errori se lasciati vuoti.
- [ ] Lunghezza massima dei campi è rispettata.

### 2. **Invio Email**
- [ ] L'email viene inviata correttamente con dati validi.
- [ ] Il server SMTP risponde senza errori.
- [ ] L'email arriva al destinatario corretto.
- [ ] L'email contiene tutte le informazioni richieste (es. nome, messaggio, ecc.).

### 3. **Risposta API**
- [ ] L'API restituisce un codice di stato HTTP 200 per le richieste valide.
- [ ] Errori dell'API restituiscono messaggi chiari con il corretto codice di stato (es. 400 per input non valido, 429 per rate limiting).
- [ ] I tempi di risposta dell'API sono accettabili (< 500ms).

### 4. **Gestione Errori**
- [ ] Errori di rete o del server mostrano un messaggio chiaro all'utente.
- [ ] Errori di validazione sono evidenziati accanto al campo corrispondente.
- [ ] L'utente non può inviare il modulo più volte durante un errore.

### 5. **Feedback Utente**
- [ ] Un messaggio di conferma è visibile all'utente dopo un invio riuscito.
- [ ] I messaggi di errore sono chiari e specifici.
- [ ] Animazioni o indicatori di caricamento sono presenti durante il processo di invio.

### 6. **Rate Limiting**
- [ ] Gli utenti non possono inviare più di X richieste in un tempo specifico (es. 5 richieste ogni 15 minuti).
- [ ] L'API restituisce un messaggio chiaro in caso di superamento dei limiti.
- [ ] Il rate limiting non blocca richieste legittime dopo un reset del limite.

### 7. **Sanitizzazione Input**
- [ ] Input dannosi (es. script, SQL injection) vengono eliminati o gestiti correttamente.
- [ ] Tutti i campi vengono sanitizzati lato server e lato client.
- [ ] Caratteri non validi (es. <, >, &) vengono codificati.
