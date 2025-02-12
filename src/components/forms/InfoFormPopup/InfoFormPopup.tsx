'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import styles from './InfoFormPopup.module.css'

const POPUP_EVENT = 'closeOtherPopups'

export default function InfoFormPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
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
  }, [])

  const handleOpen = () => {
    window.dispatchEvent(
      new CustomEvent(POPUP_EVENT, { 
        detail: { sourceId: popupId } 
      })
    )
    setIsOpen(true)
  }

  const handleClose = () => setIsOpen(false)

  return (
    <>
      <button onClick={handleOpen} className={styles.infoButton}>
        RICHIEDI INFORMAZIONI
      </button>

      {isOpen && mounted && createPortal(
        <form 
          className={styles.popup}
          action="https://formsubmit.co/info@filyimpianti.it"
          method="POST"
        >
          <button className={styles.closeButton} onClick={handleClose}>
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
          
          <input type="text" name="name" placeholder="Nome e Cognome" required className={styles.input} />
          <input type="email" name="email" placeholder="Email" required className={styles.input} />
          <input type="tel" name="phone" placeholder="Telefono" required className={styles.input} />
          
          <div className={styles.privacyConsent}>
            <input 
              type="checkbox" 
              id="privacy-consent" 
              name="privacy-consent" 
              required 
            />
            <label htmlFor="privacy-consent">
              Ho letto e accetto la <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  // Qui puoi aprire la privacy policy
                }}
                className={styles.policyLink}
              >
                Privacy Policy
              </button>
            </label>
          </div>

          <div className={styles.privacyNotice}>
            <p>I tuoi dati saranno trattati da Fily Impianti (P.IVA: 02496320066) per rispondere alla tua richiesta e conservati per 36 mesi. Non saranno ceduti a terzi. Puoi esercitare i tuoi diritti scrivendo a filyimpianti@pec.it</p>
          </div>

          <button type="submit" className={styles.submitButton}>Invia</button>
        </form>,
        document.body
      )}
    </>
  )
} 