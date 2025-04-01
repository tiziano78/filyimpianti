import { NextResponse } from 'next/server'
import { Resend } from 'resend'

interface ConfiguratoreFormData {
  name: string
  surname: string
  phone: string
  address: string
  stats: {
    totalPanels: number
    totalPower: number
    totalArea: number
    annualProduction: number
    totalStorage?: number
  }
}

// Validazione dei dati in ingresso
function validateInput(data: any): data is ConfiguratoreFormData {
  return (
    typeof data.name === 'string' &&
    typeof data.surname === 'string' &&
    typeof data.phone === 'string' &&
    typeof data.address === 'string' &&
    typeof data.stats === 'object' &&
    typeof data.stats.totalPanels === 'number' &&
    typeof data.stats.totalPower === 'number' &&
    typeof data.stats.totalArea === 'number' &&
    typeof data.stats.annualProduction === 'number' &&
    data.name.length > 0 &&
    data.surname.length > 0 &&
    data.phone.length > 0
  )
}

// Genera il template HTML per l'email
function generateEmailHTML(data: ConfiguratoreFormData) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { padding: 20px; }
          .header { background: #003399; color: white; padding: 20px; }
          .content { padding: 20px; }
          .section { margin-bottom: 20px; }
          .footer { font-size: 12px; color: #666; padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          table, th, td { border: 1px solid #ddd; }
          th, td { padding: 10px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Nuovo Cliente dal Configuratore FILY</h2>
          </div>
          <div class="content">
            <div class="section">
              <h3>Dati Cliente</h3>
              <table>
                <tr>
                  <th>Nome</th>
                  <td>${data.name}</td>
                </tr>
                <tr>
                  <th>Cognome</th>
                  <td>${data.surname}</td>
                </tr>
                <tr>
                  <th>Telefono</th>
                  <td>${data.phone}</td>
                </tr>
              </table>
            </div>
            
            <div class="section">
              <h3>Indirizzo Installazione</h3>
              <p>${data.address}</p>
            </div>
            
            <div class="section">
              <h3>Statistiche Configurazione</h3>
              <table>
                <tr>
                  <th>Pannelli Totali</th>
                  <td>${data.stats.totalPanels} unità</td>
                </tr>
                <tr>
                  <th>Potenza Totale</th>
                  <td>${data.stats.totalPower.toFixed(2)} kWp</td>
                </tr>
                <tr>
                  <th>Area Totale</th>
                  <td>${data.stats.totalArea.toFixed(2)} m²</td>
                </tr>
                <tr>
                  <th>Produzione Annua</th>
                  <td>${data.stats.annualProduction.toFixed(3)} kWh</td>
                </tr>
                ${data.stats.totalStorage ? `
                <tr>
                  <th>Capacità Storage</th>
                  <td>${data.stats.totalStorage.toFixed(2)} kWh</td>
                </tr>
                ` : ''}
              </table>
            </div>
          </div>
          <div class="footer">
            <p>Questa email è stata inviata automaticamente dal configuratore di Fily Impianti.</p>
            <p>Data: ${new Date().toLocaleDateString('it-IT')}</p>
          </div>
        </div>
      </body>
    </html>
  `
}

// Genera il template HTML per l'email di conferma al cliente
function generateConfirmationHTML(data: ConfiguratoreFormData) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { padding: 20px; }
          .header { background: #003399; color: white; padding: 20px; }
          .content { padding: 20px; }
          .section { margin-bottom: 20px; }
          .footer { font-size: 12px; color: #666; padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          table, th, td { border: 1px solid #ddd; }
          th, td { padding: 10px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Grazie per aver utilizzato il Configuratore FILY</h2>
          </div>
          <div class="content">
            <p>Gentile ${data.name} ${data.surname},</p>
            <p>Grazie per aver utilizzato il nostro configuratore. Un nostro consulente ti contatterà presto per discutere la tua configurazione.</p>
            
            <div class="section">
              <h3>Riepilogo della tua configurazione</h3>
              <table>
                <tr>
                  <th>Pannelli Totali</th>
                  <td>${data.stats.totalPanels} unità</td>
                </tr>
                <tr>
                  <th>Potenza Totale</th>
                  <td>${data.stats.totalPower.toFixed(2)} kWp</td>
                </tr>
                <tr>
                  <th>Produzione Annua</th>
                  <td>${data.stats.annualProduction.toFixed(3)} kWh</td>
                </tr>
              </table>
            </div>
            
            <p>Cordiali saluti,<br>Team Fily Impianti</p>
          </div>
          <div class="footer">
            <p>Questa email è stata inviata automaticamente dal configuratore di Fily Impianti.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export async function POST(req: Request) {
  console.log('🔄 API del configuratore chiamata')
  
  try {
    const data = await req.json()
    console.log('📝 Dati ricevuti:', JSON.stringify(data))

    // Validazione dei dati
    if (!validateInput(data)) {
      console.error('❌ Validazione fallita:', JSON.stringify(data))
      return NextResponse.json(
        { error: 'Dati non validi' },
        { status: 400 }
      )
    }
    console.log('✅ Validazione dati completata')

    // Determina l'email del destinatario in base all'ambiente
    const recipientEmail = process.env.VERCEL_ENV === 'preview' 
      ? process.env.TEST_EMAIL
      : (process.env.RECIPIENT_EMAIL || process.env.DESTINATARIO_EMAIL || 'filyimpianti.mail@gmail.com')

    console.log('📧 Email destinatario:', recipientEmail)
    
    if (!recipientEmail) {
      console.error('❌ Email destinatario non configurata')
      throw new Error('Email destinatario non configurata')
    }

    // Verifica la chiave API di Resend
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error('❌ Chiave API Resend non configurata')
      throw new Error('Chiave API Resend non configurata')
    }

    // Inizializzazione di Resend
    console.log('🔄 Inizializzazione Resend...')
    const resend = new Resend(resendApiKey)

    // Invio dell'email al destinatario
    console.log('📤 Invio email al destinatario in corso...')
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Configuratore FILY <onboarding@resend.dev>',
      to: [recipientEmail],
      subject: process.env.VERCEL_ENV === 'preview'
        ? '[TEST] Nuovo Cliente dal Configuratore FILY'
        : 'Nuovo Cliente dal Configuratore FILY',
      html: generateEmailHTML(data),
    })

    if (emailError) {
      console.error('❌ Errore nell\'invio dell\'email al destinatario:', emailError)
      throw new Error(`Errore nell'invio dell'email: ${emailError.message}`)
    }

    console.log('✅ Email inviata con successo al destinatario:', emailData)
    
    // Invio dell'email di conferma al cliente
    try {
      console.log('📤 Invio email di conferma al cliente in corso...')
      const { data: confirmationData, error: confirmationError } = await resend.emails.send({
        from: 'Configuratore FILY <onboarding@resend.dev>',
        to: [`${data.name} ${data.surname} <${data.phone}@sms.filyimpianti.it>`], // Utilizziamo un formato che può essere facilmente filtrato
        subject: 'Grazie per aver utilizzato il Configuratore FILY',
        html: generateConfirmationHTML(data),
      })

      if (confirmationError) {
        console.error('❌ Errore nell\'invio dell\'email di conferma al cliente:', confirmationError)
        // Non blocchiamo il processo se fallisce l'email di conferma
      } else {
        console.log('✅ Email di conferma inviata con successo al cliente:', confirmationData)
      }
    } catch (confirmationError) {
      console.error('❌ Errore durante l\'invio dell\'email di conferma:', confirmationError)
      // Non blocchiamo il processo se fallisce l'email di conferma
    }

    console.log('✅ Processo completato con successo')
    return NextResponse.json(
      { message: 'Email inviata con successo' },
      { status: 200 }
    )
  } catch (error) {
    console.error('❌ Errore durante l\'elaborazione della richiesta:', error)
    return NextResponse.json(
      { 
        error: 'Errore interno del server',
        details: error instanceof Error ? error.message : 'Errore sconosciuto'
      },
      { status: 500 }
    )
  }
}
