import { NextResponse } from 'next/server'
import { Resend } from 'resend'

interface NewsletterFormData {
  email: string
}

// Validazione dei dati in ingresso
function validateInput(data: any): data is NewsletterFormData {
  return (
    typeof data.email === 'string' &&
    data.email.includes('@') &&
    data.email.length > 0
  )
}

// Genera il template HTML per l'email
function generateEmailHTML(data: NewsletterFormData) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { padding: 20px; }
          .header { background: #0096C7; color: white; padding: 20px; }
          .content { padding: 20px; }
          .footer { font-size: 12px; color: #666; padding: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Nuova Iscrizione Newsletter Fily Impianti</h2>
          </div>
          <div class="content">
            <p><strong>Email:</strong> ${data.email}</p>
          </div>
          <div class="footer">
            <p>Questa email è stata inviata automaticamente dal form di iscrizione alla newsletter di Fily Impianti.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

// Genera il template HTML per l'email di conferma
function generateConfirmationHTML(email: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { padding: 20px; }
          .header { background: #0096C7; color: white; padding: 20px; }
          .content { padding: 20px; }
          .footer { font-size: 12px; color: #666; padding: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Benvenuto nella Newsletter di Fily Impianti</h2>
          </div>
          <div class="content">
            <p>Grazie per esserti iscritto alla nostra newsletter!</p>
            <p>Ti terremo aggiornato sulle ultime novità, offerte speciali e consigli sul mondo del fotovoltaico.</p>
            <p>Se hai domande, non esitare a contattarci.</p>
          </div>
          <div class="footer">
            <p>Questa email è stata inviata a ${email} perché ti sei iscritto alla newsletter di Fily Impianti.</p>
            <p>Se non desideri più ricevere le nostre comunicazioni, puoi annullare l'iscrizione in qualsiasi momento.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export async function POST(req: Request) {
  console.log('🔄 API della newsletter chiamata')
  
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

    // Invio dell'email di notifica
    console.log('📤 Invio email di notifica in corso...')
    const { error: notificationError } = await resend.emails.send({
      from: 'Newsletter FILY <newsletter@filyimpianti.it>',
      to: [recipientEmail],
      subject: 'Nuova Iscrizione alla Newsletter FILY',
      html: generateEmailHTML(data),
    })

    if (notificationError) {
      console.error('❌ Errore nell\'invio dell\'email di notifica:', notificationError)
      return NextResponse.json(
        { error: 'Errore nell\'invio dell\'email di notifica' },
        { status: 500 }
      )
    }

    // Invio dell'email di conferma all'utente
    console.log('📤 Invio email di conferma in corso...')
    const { error: confirmationError } = await resend.emails.send({
      from: 'Newsletter FILY <newsletter@filyimpianti.it>',
      to: [data.email],
      subject: 'Benvenuto nella Newsletter di Fily Impianti',
      html: generateConfirmationHTML(data.email),
    })

    if (confirmationError) {
      console.error('❌ Errore nell\'invio dell\'email di conferma:', confirmationError)
      // Continuiamo comunque perché l'email di notifica è stata inviata
      console.log('⚠️ L\'email di conferma non è stata inviata, ma la notifica è stata inviata con successo')
    }

    console.log('✅ Email inviate con successo')
    return NextResponse.json(
      { message: 'Iscrizione completata con successo' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Errore durante l\'elaborazione della richiesta:', error)
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    )
  }
}
