'use client'

import { useEffect, useState } from 'react'
import styles from './Hero.module.css'
import HeroCTA from './HeroCTA/HeroCTA'
import HeroTestimonial from './HeroTestimonial/HeroTestimonial'
import StarlinkPopup from '@/components/StarlinkPopup/StarlinkPopup'
import { useStarlink } from '@/context/StarlinkContext'

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)
  const { openStarlinkPopup } = useStarlink()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 830)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className={styles.hero}>
      <h1 className={styles.hero_title}>
        RISPARMIA SUI COSTI ENERGETICI
      </h1>
      
      <h2 className={styles.hero_subtitle}>
        Installiamo in 30 giorni, o è{' '}
        <span className={styles.rotate_text}>GRATIS!</span>
      </h2>
      
      <h3 
        className={`${styles.hero_starlink} hero-starlink`}
        onClick={() => {
          openStarlinkPopup()
        }}
      >
        STARLINK IN OMAGGIO AFFRETTATI!
      </h3>

      <HeroCTA />
      
      <div className={styles.testimonialContainer}>
        <HeroTestimonial />
      </div>
      <StarlinkPopup />
    </section>
  )
}
