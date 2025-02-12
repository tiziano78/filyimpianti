import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import type { TransportOptions } from 'nodemailer'

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Validazione dei dati in ingresso
function validateInput(data: any): data is ContactFormData {
  return (
    typeof data.name === 'string' &&
    typeof data.email === 'string' &&
    typeof data.message === 'string' &&
    data.name.length > 0 &&
    data.email.includes('@') &&
    data.message.length > 0
  )
}

// Modifica la route per supportare test
export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // In ambiente preview, usa email di test
    const recipientEmail = process.env.VERCEL_ENV === 'preview' 
      ? 'test@tuoemail.com'  // email per i test
      : process.env.RECIPIENT_EMAIL

    // Configura nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })

    // Invia email di test
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: recipientEmail,
      subject: `[TEST] Nuovo messaggio da ${body.name}`,
      text: body.message,
      html: `<p>Test message from preview environment</p>`
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json({ error: 'Test failed' }, { status: 500 })
  }
} 