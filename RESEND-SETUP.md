# Configurazione di Resend per l'invio di email

Questo documento fornisce istruzioni dettagliate per configurare Resend per l'invio di email nel progetto Fily Impianti.

## Cos'è Resend

Resend è un servizio moderno di invio email API-first che offre:
- Elevata consegnabilità
- Analisi dettagliate
- Facilità d'uso tramite API
- Supporto per domini personalizzati

## Prerequisiti

1. Un account Resend (registrati su [resend.com](https://resend.com))
2. Accesso al pannello di amministrazione di Vercel
3. Accesso al pannello di amministrazione DNS del dominio filyimpianti.it (se si desidera utilizzare un dominio personalizzato)

## Passi per la configurazione

### 1. Ottenere una chiave API di Resend

1. Accedi al tuo account Resend
2. Vai su "API Keys" nel menu laterale
3. Clicca su "Create API Key"
4. Assegna un nome alla chiave (es. "Fily Impianti Website")
5. Copia la chiave API generata (inizia con `re_`)

### 2. Verificare il dominio (opzionale ma consigliato)

Per utilizzare un indirizzo email con il dominio filyimpianti.it come mittente:

1. In Resend, vai su "Domains" nel menu laterale
2. Clicca su "Add Domain"
3. Inserisci il dominio (es. filyimpianti.it)
4. Segui le istruzioni per aggiungere i record DNS necessari:
   - Record TXT per la verifica del dominio
   - Record MX per la gestione delle email
   - Record DKIM per migliorare la consegnabilità

### 3. Configurare le variabili d'ambiente su Vercel

1. Accedi al pannello di controllo di Vercel
2. Seleziona il progetto Fily Impianti
3. Vai su "Settings" > "Environment Variables"
4. Aggiungi le seguenti variabili:
   - `RESEND_API_KEY`: La chiave API ottenuta da Resend
   - `RECIPIENT_EMAIL`: L'indirizzo email a cui inviare le richieste (es. filyimpianti.mail@gmail.com)
   - `TEST_EMAIL`: L'indirizzo email per i test in ambiente di sviluppo

### 4. Eseguire un nuovo deployment

Dopo aver configurato le variabili d'ambiente, esegui un nuovo deployment del sito:

```bash
vercel --prod
```

## Verifica del funzionamento

Per verificare che tutto funzioni correttamente:

1. Vai sul sito web di Fily Impianti
2. Compila e invia il form di contatto nella sezione Hero
3. Compila e invia il form nel configuratore
4. Controlla che le email vengano ricevute all'indirizzo specificato in `RECIPIENT_EMAIL`

## Troubleshooting

Se le email non vengono inviate correttamente:

1. **Controlla i log su Vercel**:
   - Vai su "Deployments" > seleziona l'ultimo deployment > "Functions" > cerca le funzioni `/api/contact` e `/api/configuratore`
   - Esamina i log per eventuali errori

2. **Verifica la chiave API**:
   - Assicurati che la chiave API di Resend sia corretta
   - Verifica che la chiave non sia scaduta o revocata

3. **Controlla lo stato del dominio**:
   - Se stai utilizzando un dominio personalizzato, verifica che sia correttamente verificato su Resend

4. **Soluzione temporanea**:
   - Se il dominio non è ancora verificato, modifica temporaneamente l'indirizzo del mittente in `onboarding@resend.dev` nei file:
     - `src/app/api/contact/route.ts`
     - `src/app/api/configuratore/route.ts`

## Supporto

Per ulteriore assistenza:
- Consulta la [documentazione di Resend](https://resend.com/docs)
- Contatta il supporto di Resend all'indirizzo support@resend.com
