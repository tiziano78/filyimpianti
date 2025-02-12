import React from 'react'
import styles from './Banner.module.css'

export interface BannerProps {
  title?: string
  subtitle?: string
  ctaText?: string
  onCtaClick?: () => void
}

export default function Banner({ 
  title = 'Energia Pulita per il Tuo Futuro',
  subtitle = 'Soluzioni innovative per il risparmio energetico',
  ctaText = 'Scopri di Più',
  onCtaClick
}: BannerProps) {
  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <h1>{title}</h1>
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