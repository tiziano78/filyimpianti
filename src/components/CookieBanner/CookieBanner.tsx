'use client'

import { useState, useEffect } from 'react'
import styles from './CookieBanner.module.css'

const cookieCategories = [
  {
    id: 'necessary',
    label: 'Necessari',
    description: 'Cookie essenziali per il funzionamento del sito',
    required: true
  },
  {
    id: 'analytics',
    label: 'Analitici',
    description: 'Ci aiutano a capire come utilizzi il sito',
    required: false
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'Utilizzati per personalizzare la tua esperienza',
    required: false
  }
]

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  })

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: true
    }
    setPreferences(newPreferences)
    localStorage.setItem('cookie-consent', JSON.stringify(newPreferences))
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    setIsVisible(false)
  }

  const handleTogglePreference = (category: string) => {
    if (category === 'necessary') return // Non permettere la modifica dei cookie necessari
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category as keyof typeof prev]
    }))
  }

  if (!isVisible) return null

  return (
    <div className={styles.cookieBanner}>
      <div className={styles.content}>
        <h3>La tua privacy è importante</h3>
        <p>
          Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. 
          Alcuni cookie sono essenziali per il funzionamento del sito, mentre altri 
          ci aiutano a migliorare le prestazioni e l'esperienza utente.
        </p>

        {showDetails && (
          <div className={styles.preferences}>
            {cookieCategories.map(category => (
              <div key={category.id} className={styles.category}>
                <div className={styles.categoryHeader}>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={preferences[category.id as keyof typeof preferences]}
                      onChange={() => handleTogglePreference(category.id)}
                      disabled={category.required}
                    />
                    <span className={styles.slider}></span>
                  </label>
                  <span className={styles.categoryLabel}>{category.label}</span>
                  {category.required && (
                    <span className={styles.required}>(Richiesto)</span>
                  )}
                </div>
                <p className={styles.categoryDescription}>
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className={styles.actions}>
          <button 
            className={styles.detailsButton}
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Nascondi Dettagli' : 'Personalizza'}
          </button>
          
          <div className={styles.mainActions}>
            <button 
              className={styles.acceptButton}
              onClick={handleAcceptAll}
            >
              Accetta Tutti
            </button>
            {showDetails && (
              <button 
                className={styles.saveButton}
                onClick={handleSavePreferences}
              >
                Salva Preferenze
              </button>
            )}
          </div>
        </div>

        <div className={styles.privacyLinks}>
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          <span className={styles.separator}>|</span>
          <a href="/cookie-policy" target="_blank" rel="noopener noreferrer">
            Cookie Policy
          </a>
        </div>
      </div>
    </div>
  )
}
