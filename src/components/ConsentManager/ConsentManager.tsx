'use client'

import { useState } from 'react'
import styles from './ConsentManager.module.css'
import { setConsent, type ConsentOptions } from '@/utils/consent'
import type { ConsentType } from '@/types/consent'

export function ConsentManager() {
  const [isVisible, setIsVisible] = useState(true)

  const handleConsent = (type: ConsentType) => {
    const options: ConsentOptions = {
      necessaryCookies: true,
      functionalCookies: type === 'accepted',
      analyticalCookies: type === 'accepted',
      marketingCookies: type === 'accepted'
    }

    setConsent(type, options)
    setIsVisible(false)
  }

  return isVisible ? (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Consenso Cookie</h2>
        <p>
          Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito.
          Per favore, accetta o rifiuta l'uso dei cookie.
        </p>
        <div className={styles.buttons}>
          <button
            onClick={() => handleConsent('accepted')}
            className={styles.acceptButton}
          >
            Accetta
          </button>
          <button
            onClick={() => handleConsent('rejected')}
            className={styles.rejectButton}
          >
            Rifiuta
          </button>
        </div>
      </div>
    </div>
  ) : null
}