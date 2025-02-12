import React from 'react'
import styles from './Banner2.module.css'

export interface Banner2Props {
  title?: string
  subtitle?: string
  ctaText?: string
  onCtaClick?: () => void
  variant?: 'primary' | 'secondary'
}

export default function Banner2({ 
  title = 'Richiedi una Consulenza Gratuita',
  subtitle = 'I nostri esperti sono a tua disposizione',
  ctaText = 'Contattaci Ora',
  onCtaClick,
  variant = 'primary'
}: Banner2Props) {
  return (
    <div className={`${styles.banner} ${styles[variant]}`}>
      <div className={styles.content}>
        <h2>{title}</h2>
        <p>{subtitle}</p>
        {ctaText && (
          <button 
            className={styles.cta}
            onClick={onCtaClick}
          >
            {ctaText}
          </button>
        )}
      </div>
    </div>
  )
} 