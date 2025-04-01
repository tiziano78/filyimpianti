import React from 'react'
import styles from './Banner.module.css'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick()
    } else {
      router.push('/blog')
    }
  }

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {ctaText && (
          <button 
            className={styles.cta}
            onClick={handleCtaClick}
          >
            {ctaText}
          </button>
        )}
      </div>
    </div>
  )
} 