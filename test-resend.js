// Script di test per verificare la configurazione di Resend
// Esegui questo script con: node test-resend.js

// Importa dotenv per caricare le variabili d'ambiente dal file .env.local
require('dotenv').config({ path: '.env.local' });

// Importa Resend
const { Resend } = require('resend');

// Funzione principale
async function main() {
  console.log('🔄 Test di invio email con Resend');
  
  // Verifica la presenza della chiave API
  const resendApiKey = process.env.RESEND_API_KEY;
  console.log('API Key trovata:', resendApiKey ? '✅ Sì' : '❌ No');
  
  if (!resendApiKey) {
    console.error('❌ Errore: RESEND_API_KEY non trovata nelle variabili d\'ambiente');
    console.log('Assicurati di aver creato un file .env.local con la chiave API di Resend');
    
    // Prova a caricare manualmente la chiave API per il test
    const manualApiKey = 're_HCDPuoxW_NFE9PwyHpJRexcymeDtX3UbZ';
    console.log('🔄 Utilizzo della chiave API inserita manualmente per il test...');
    
    // Continua con la chiave API manuale
    return runTest(manualApiKey);
  }
  
  return runTest(resendApiKey);
}

// Funzione per eseguire il test
async function runTest(apiKey) {
  // Verifica la presenza dell'email del destinatario
  const recipientEmail = process.env.RECIPIENT_EMAIL || process.env.DESTINATARIO_EMAIL || process.env.TEST_EMAIL;
  console.log('Email destinatario trovata:', recipientEmail ? '✅ Sì' : '❌ No');
  
  if (!recipientEmail) {
    console.error('❌ Errore: Email del destinatario non trovata nelle variabili d\'ambiente');
    console.log('Assicurati di aver configurato RECIPIENT_EMAIL, DESTINATARIO_EMAIL o TEST_EMAIL');
    
    // Usa un'email di test predefinita
    const testEmail = 'filyimpianti.mail@gmail.com';
    console.log(`🔄 Utilizzo dell'email di test predefinita: ${testEmail}`);
    return sendTestEmail(apiKey, testEmail);
  }
  
  return sendTestEmail(apiKey, recipientEmail);
}

// Funzione per inviare l'email di test
async function sendTestEmail(apiKey, recipientEmail) {
  console.log(`📧 Email destinatario: ${recipientEmail}`);
  
  try {
    // Inizializza Resend
    console.log('🔄 Inizializzazione Resend...');
    const resend = new Resend(apiKey);
    
    // Invia un'email di test
    console.log('🔄 Invio email di test...');
    const { data, error } = await resend.emails.send({
      from: 'Test Fily <onboarding@resend.dev>', // Usa onboarding@resend.dev per i test iniziali
      to: [recipientEmail],
      subject: 'Test di configurazione Resend',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #0096C7;">Test di configurazione Resend</h2>
          <p>Questa è un'email di test per verificare la corretta configurazione di Resend.</p>
          <p>Se stai ricevendo questa email, significa che la configurazione è corretta!</p>
          <p>Data e ora del test: ${new Date().toLocaleString('it-IT')}</p>
        </div>
      `,
    });
    
    if (error) {
      console.error('❌ Errore nell\'invio dell\'email:', error);
    } else {
      console.log('✅ Email inviata con successo!');
      console.log('📝 Dettagli:', data);
    }
  } catch (error) {
    console.error('❌ Errore durante l\'esecuzione del test:', error);
  }
}

// Esegui la funzione principale
main().catch(console.error);
