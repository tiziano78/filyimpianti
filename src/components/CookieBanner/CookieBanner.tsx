'use client'

import { useState, useEffect } from 'react'
import styles from './CookieBanner.module.css'
import PolicyModal from '@/components/modals/PolicyModal/PolicyModal'
import { setConsent, hasConsent } from '@/utils/consent'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [policyType, setPolicyType] = useState<'cookie' | 'privacy' | null>(null)

  useEffect(() => {
    const checkConsent = async () => {
      try {
        const hasExistingConsent = hasConsent()
        if (!hasExistingConsent) {
          setTimeout(() => setIsVisible(true), 500)
        }
      } catch (error) {
        console.error('[COOKIE_BANNER] Errore nel controllo consenso:', error)
      }
    }
    checkConsent()
  }, [])

  const handleAcceptAll = () => {
    setConsent('accepted', {
      necessaryCookies: true,
      functionalCookies: true,
      analyticalCookies: true,
      marketingCookies: true
    })
    setIsVisible(false)
  }

  const handleReject = () => {
    setConsent('rejected', {
      necessaryCookies: true,
      functionalCookies: false,
      analyticalCookies: false,
      marketingCookies: false
    })
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <p>
          Utilizziamo i cookie e risorse locali (come font) per migliorare la tua esperienza sul nostro sito.
          Per maggiori informazioni, consulta la nostra{' '}
          <button onClick={() => setPolicyType('cookie')} className={styles.policyButton}>
            Cookie Policy
          </button>{' '}
          e la nostra{' '}
          <button onClick={() => setPolicyType('privacy')} className={styles.policyButton}>
            Privacy Policy
          </button>
        </p>

        <div className={styles.buttons}>
          <button onClick={handleAcceptAll} className={styles.acceptButton}>
            Accetta tutti
          </button>
          <button onClick={handleReject} className={styles.rejectButton}>
            Rifiuta
          </button>
        </div>
      </div>

      <PolicyModal
        isOpen={!!policyType}
        onCloseAction={() => setPolicyType(null)}
        type={policyType || 'cookie'}
      />
    </div>
  )
}
