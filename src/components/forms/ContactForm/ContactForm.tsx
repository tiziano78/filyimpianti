'use client'

import { useState, FormEvent } from 'react'
import styles from './ContactForm.module.css'

interface ContactFormProps {
  onSubmitSuccess?: () => void
  className?: string
}

export default function ContactForm({ onSubmitSuccess, className }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    privacyConsent: false
  })

  const isTestEnv = process.env.VERCEL_ENV === 'preview'

  const validateForm = () => {
    if (!formData.name.trim()) return 'Inserisci il tuo nome'
    if (!formData.email.trim()) return 'Inserisci la tua email'
    if (!formData.email.includes('@')) return 'Inserisci una email valida'
    if (!formData.phone.trim()) return 'Inserisci il tuo numero di telefono'
    if (!formData.privacyConsent) return 'Accetta la privacy policy per continuare'
    return null
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess(false)

    try {
      console.log('Invio dati form:', formData)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      console.log('Risposta API:', result)

      if (!response.ok) {
        throw new Error(result.details || result.error || 'Errore durante l\'invio del modulo')
      }

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        privacyConsent: false,
      })
      onSubmitSuccess?.()
    } catch (error) {
      console.error('Errore form:', error)
      setError(error instanceof Error ? error.message : 'Si è verificato un errore durante l\'invio del modulo')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Resetta l'errore quando l'utente inizia a digitare
    setError(null)
  }

  return (
    <div className={`${styles.formContainer} ${className || ''}`}>
      <h3>Compila il form per ricevere informazioni</h3>
      
      {error && (
        <div className={styles.error} role="alert">
          {error}
        </div>
      )}

      {success ? (
        <div className={styles.success} role="alert">
          <h4>Grazie per averci contattato!</h4>
          <p>Ti risponderemo al più presto.</p>
          <button 
            onClick={() => setSuccess(false)}
            className={styles.newMessageButton}
          >
            Invia un nuovo messaggio
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          {isTestEnv && (
            <div className={styles.testBanner} role="alert">
              🧪 Ambiente di Test - Le email verranno inviate a {process.env.TEST_EMAIL}
            </div>
          )}
          
          <div className={styles.formGroup}>
            <label htmlFor="contact-name" className={styles.visuallyHidden}>Nome e Cognome</label>
            <input
              type="text"
              name="name"
              id="contact-name"
              placeholder="Nome e Cognome"
              required
              disabled={isSubmitting}
              value={formData.name}
              onChange={handleInputChange}
              aria-required="true"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contact-email" className={styles.visuallyHidden}>Email</label>
            <input
              type="email"
              name="email"
              id="contact-email"
              placeholder="Email"
              required
              disabled={isSubmitting}
              value={formData.email}
              onChange={handleInputChange}
              aria-required="true"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contact-phone" className={styles.visuallyHidden}>Telefono</label>
            <input
              type="tel"
              name="phone"
              id="contact-phone"
              placeholder="Telefono"
              required
              disabled={isSubmitting}
              value={formData.phone}
              onChange={handleInputChange}
              aria-required="true"
            />
          </div>

          <div className={styles.privacyConsent}>
            <input
              type="checkbox"
              id="privacy-consent"
              name="privacyConsent"
              required
              disabled={isSubmitting}
              checked={formData.privacyConsent}
              onChange={handleInputChange}
              aria-required="true"
            />
            <label htmlFor="privacy-consent">
              Ho letto e accetto la{' '}
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.policyLink}
              >
                Privacy Policy
              </a>
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
            {isSubmitting ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Invio in corso...
              </>
            ) : (
              'Invia'
            )}
          </button>
        </form>
      )}
    </div>
  )
} 