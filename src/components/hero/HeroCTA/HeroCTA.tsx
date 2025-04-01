'use client'

import { useState } from 'react'
import styles from './HeroCTA.module.css'

export default function HeroCTA() {
  const [contact, setContact] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!contact) return
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Richiesta dalla Home',
          email: contact.includes('@') ? contact : 'noemail@example.com',
          phone: contact.includes('@') ? '0000000000' : contact,
          privacyConsent: true
        }),
      })
      
      if (response.ok) {
        setSubmitStatus('success')
        setContact('')
      } else {
        setSubmitStatus('error')
        console.error('Errore invio form:', await response.text())
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Errore invio form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.hero_cta_container}>
      <div className={styles.whatsapp_section}>
        <a 
          href="https://wa.me/3470087833"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img 
            src="/images/hero/WhatsappButton.png"
            alt="WhatsApp CTA"
            className={styles.whatsapp_cta}
          />
        </a>
      </div>

      <div className={styles.info_text}>
        <p>Compila il form per essere ricontattato</p>
      </div>

      <form 
        className={styles.contact_form}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          id="hero-contact"
          name="contact"
          placeholder="Email o Numero di Telefono"
          required
          autoComplete="on"
          aria-label="Email o numero di telefono"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <button 
          type="submit" 
          className={styles.cta_button}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'INVIO...' : 'RICHIEDI INFORMAZIONI'}
        </button>
        
        {submitStatus === 'success' && (
          <div className={styles.success_message}>
            Grazie! Ti contatteremo presto.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className={styles.error_message}>
            Si è verificato un errore. Riprova o contattaci su WhatsApp.
          </div>
        )}
      </form>
    </div>
  )
}