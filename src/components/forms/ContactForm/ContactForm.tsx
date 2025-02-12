'use client'

import { useState, FormEvent } from 'react'
import styles from './ContactForm.module.css'

interface ContactFormProps {
  onSubmitSuccess?: () => void
}

export default function ContactForm({ onSubmitSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const isTestEnv = process.env.VERCEL_ENV === 'preview'

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        privacyConsent: formData.get('privacy-consent') === 'on'
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Errore nell\'invio del form')
      }

      setSuccess(true)
      e.currentTarget.reset()
      onSubmitSuccess?.()

    } catch (err) {
      setError('Si è verificato un errore. Riprova più tardi.')
      console.error('Errore form:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.formContainer}>
      <h3>Compila il form per ricevere informazioni</h3>
      
      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {success ? (
        <div className={styles.success}>
          Grazie per averci contattato! Ti risponderemo al più presto.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          {isTestEnv && (
            <div className="bg-yellow-100 p-2 mb-4 rounded">
              🧪 Ambiente di Test - Le email verranno inviate a {process.env.TEST_EMAIL}
            </div>
          )}
          <div className={styles.formGroup}>
            <input
              type="text"
              name="name"
              placeholder="Nome e Cognome"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="tel"
              name="phone"
              placeholder="Telefono"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.privacyConsent}>
            <input
              type="checkbox"
              id="privacy-consent"
              name="privacy-consent"
              required
              disabled={isSubmitting}
            />
            <label htmlFor="privacy-consent">
              Ho letto e accetto la{' '}
              <button
                type="button"
                onClick={() => {
                  // Apri la privacy policy
                }}
                className={styles.policyLink}
              >
                Privacy Policy
              </button>
            </label>
          </div>

          <div className={styles.privacyNotice}>
            <p>
              I tuoi dati saranno trattati da Fily Impianti (P.IVA: 02496320066) 
              per rispondere alla tua richiesta e conservati per 36 mesi. 
              Non saranno ceduti a terzi. Puoi esercitare i tuoi diritti 
              scrivendo a filyimpianti@pec.it
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Invio in corso...' : 'Invia'}
          </button>
        </form>
      )}
    </div>
  )
} 