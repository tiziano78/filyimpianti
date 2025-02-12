'use client'

import { useEffect } from 'react'
import styles from './error.module.css'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log client-side error to console in development
    console.error(error)
  }, [error])

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h1>Oops! Qualcosa è andato storto</h1>
        <p>
          Si è verificato un errore imprevisto. 
          Riprova o torna alla home.
        </p>
        <div className={styles.buttonGroup}>
          <button 
            onClick={() => reset()}
            className={styles.button}
          >
            Riprova
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className={`${styles.button} ${styles.secondary}`}
          >
            Torna alla home
          </button>
        </div>
        <div className={styles.support}>
          <p>
            Se il problema persiste, contattaci a{' '}
            <a href="mailto:support@filyimpianti.it">
              support@filyimpianti.it
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 