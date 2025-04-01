'use client'

import { useState, useEffect, FormEvent } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import styles from './InfoFormPopup.module.css'

const POPUP_EVENT = 'closeOtherPopups'

export default function InfoFormPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const popupId = Math.random().toString(36).substring(7)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    const handleCloseRequest = (event: CustomEvent) => {
      if (event.detail?.sourceId !== popupId) {
        setIsOpen(false)
      }
    }

    window.addEventListener(POPUP_EVENT, handleCloseRequest as EventListener)
    return () => {
      window.removeEventListener(POPUP_EVENT, handleCloseRequest as EventListener)
    }
  }, [popupId])

  const handleOpen = () => {
    window.dispatchEvent(
      new CustomEvent(POPUP_EVENT, { 
        detail: { sourceId: popupId } 
      })
    )
    setIsOpen(true)
  }

  const handleClose = () => setIsOpen(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

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

      // Chiudi il popup dopo l'invio riuscito
      handleClose()
      
    } catch (err) {
      console.error('Errore invio form:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <button onClick={handleOpen} className={styles.infoButton}>
        RICHIEDI INFORMAZIONI
      </button>

      {isOpen && mounted && createPortal(
        <form 
          className={styles.popup}
          onSubmit={handleSubmit}
        >
          <button 
            type="button"
            className={styles.closeButton} 
            onClick={handleClose}
          >
            Chiudi
          </button>
          
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className={styles.logo}
            priority
          />
          
          <h3 className={styles.title}>Compila il form per ricevere informazioni</h3>
          
          <input 
            type="text" 
            name="name" 
            id="popup-name" 
            placeholder="Nome e Cognome" 
            required 
            className={styles.input}
            disabled={isSubmitting}
          />
          <input 
            type="email" 
            name="email" 
            id="popup-email" 
            placeholder="Email" 
            required 
            className={styles.input}
            disabled={isSubmitting}
          />
          <input 
            type="tel" 
            name="phone" 
            id="popup-phone" 
            placeholder="Telefono" 
            required 
            className={styles.input}
            disabled={isSubmitting}
          />
          
          <div className={styles.privacyConsent}>
            <input 
              type="checkbox" 
              id="popup-privacy-consent" 
              name="privacy-consent" 
              required 
              disabled={isSubmitting}
            />
            <label htmlFor="popup-privacy-consent">
              Ho letto e accetto la <a 
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
            <p>I tuoi dati saranno trattati da Fily Impianti (P.IVA: 02496320066) per rispondere alla tua richiesta e conservati per 36 mesi. Non saranno ceduti a terzi. Puoi esercitare i tuoi diritti scrivendo a filyimpianti@pec.it</p>
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Invio in corso...' : 'Invia'}
          </button>
        </form>,
        document.body
      )}
    </>
  )
} 