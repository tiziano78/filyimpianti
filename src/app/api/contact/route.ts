import { NextResponse } from 'next/server'
import { Resend } from 'resend'

interface ContactFormData {
  name: string
  email: string
  phone: string
  privacyConsent: boolean
}

// Validazione dei dati in ingresso
function validateInput(data: any): data is ContactFormData {
  return (
    typeof data.name === 'string' &&
    typeof data.email === 'string' &&
    typeof data.phone === 'string' &&
    typeof data.privacyConsent === 'boolean' &&
    data.name.length > 0 &&
    data.email.includes('@') &&
    data.phone.length > 0 &&
    data.privacyConsent === true
  )
}

// Genera il template HTML per l'email
function generateEmailHTML(data: ContactFormData) {
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
            <h2>Nuovo Contatto da Fily Impianti</h2>
          </div>
          <div class="content">
            <p><strong>Nome:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Telefono:</strong> ${data.phone}</p>
            <p><strong>Privacy:</strong> Accettata</p>
          </div>
          <div class="footer">
            <p>Questa email è stata inviata automaticamente dal form di contatto di Fily Impianti.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

// Genera il template HTML per l'email di conferma
function generateConfirmationHTML(name: string) {
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
            <h2>Grazie per averci contattato!</h2>
          </div>
          <div class="content">
            <p>Gentile ${name},</p>
            <p>Abbiamo ricevuto la tua richiesta e ti risponderemo il prima possibile.</p>
            <p>Cordiali saluti,<br>Team Fily Impianti</p>
          </div>
          <div class="footer">
            <p>Questa email è stata inviata automaticamente dal form di contatto di Fily Impianti.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export async function POST(req: Request) {
  console.log('🔄 API di contatto chiamata')
  
  try {
    const body = await req.json()
    console.log('📝 Dati ricevuti:', JSON.stringify(body))
    
    // Valida i dati in ingresso
    if (!validateInput(body)) {
      console.error('❌ Validazione fallita:', JSON.stringify(body))
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

    // Inizializza Resend
    console.log('🔄 Inizializzazione Resend...')
    const resend = new Resend(resendApiKey)

    // Prepara i template HTML
    const emailHTML = generateEmailHTML(body)
    const confirmationHTML = generateConfirmationHTML(body.name)

    // Invia l'email al destinatario
    console.log('🔄 Invio email al destinatario...')
    try {
      const { data, error } = await resend.emails.send({
        from: 'Fily Impianti <onboarding@resend.dev>',
        to: recipientEmail,
        subject: process.env.VERCEL_ENV === 'preview'
          ? `[TEST] Nuovo contatto da ${body.name}`
          : `Nuovo contatto da ${body.name}`,
        html: emailHTML,
      })
      
      if (error) {
        console.error('❌ Errore invio email al destinatario:', error)
        throw error
      }
      
      console.log('✅ Email inviata con successo:', data)
    } catch (sendError) {
      console.error('❌ Errore invio email al destinatario:', sendError)
      throw sendError
    }

    // Invia email di conferma al cliente solo se ha fornito un'email valida
    if (body.email && body.email.includes('@') && body.email !== 'noemail@example.com') {
      console.log('🔄 Invio email di conferma al cliente...')
      try {
        const { data, error } = await resend.emails.send({
          from: 'Fily Impianti <onboarding@resend.dev>',
          to: body.email,
          subject: 'Grazie per averci contattato',
          html: confirmationHTML,
        })
        
        if (error) {
          console.error('❌ Errore invio email di conferma:', error)
          // Non blocchiamo il processo se fallisce l'email di conferma
        } else {
          console.log('✅ Email di conferma inviata con successo:', data)
        }
      } catch (sendError) {
        console.error('❌ Errore invio email di conferma:', sendError)
        // Non blocchiamo il processo se fallisce l'email di conferma
      }
    } else {
      console.log('ℹ️ Nessuna email di conferma inviata (email non fornita o non valida)')
    }

    console.log('✅ Processo completato con successo')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Errore generale:', error)
    return NextResponse.json(
      { 
        error: 'Errore durante l\'invio dell\'email',
        details: error instanceof Error ? error.message : 'Errore sconosciuto'
      },
      { status: 500 }
    )
  }
}