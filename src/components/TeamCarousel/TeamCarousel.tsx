'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import styles from './TeamCarousel.module.css'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

const teamMembers = [
  { name: 'Antonio', alt: 'Antonio - Team Filyimpianti', desc: 'Esperto in energie rinnovabili.' },
  { name: 'Antonella', alt: 'Antonella - Team Filyimpianti', desc: 'Specialista in consulenza energetica.' },
  { name: 'Gianni', alt: 'Gianni - Team Filyimpianti', desc: 'Ingegnere fotovoltaico.' },
  { name: 'Katia', alt: 'Katia - Team Filyimpianti', desc: 'Consulente per l\'efficienza energetica.' },
  { name: 'Luca', alt: 'Luca - Team Filyimpianti', desc: 'Tecnico installatore.' },
  { name: 'Massimo', alt: 'Massimo - Team Filyimpianti', desc: 'Progettista di impianti.' },
  { name: 'Renzo', alt: 'Renzo - Team Filyimpianti', desc: 'Manager di progetto.' },
  { name: 'Tiziano', alt: 'Tiziano - Team Filyimpianti', desc: 'Analista di sistemi energetici.' }
]

export default function TeamCarousel() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <section className={styles.teamCarouselSection}>
      <div className={styles.container}>
        <h2 className={styles.teamSectionTitle}>IL NOSTRO TEAM</h2>
        
        <div className={styles.teamSlider}>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: '.prev-button',
              nextEl: '.next-button'
            }}
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 15
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20
              },
              992: {
                slidesPerView: 5,
                spaceBetween: 20
              },
              1200: {
                slidesPerView: 6,
                spaceBetween: 25
              }
            }}
            loop={true}
            className={styles.teamSlides}
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={member.name} className={styles.teamSlide}>
                <Image
                  src={`/images/team/${member.name.toUpperCase()}.webp`}
                  alt={member.alt}
                  width={160}
                  height={160}
                  className={styles.memberImage}
                />
                <div className={styles.memberInfo}>
                  <h3>{member.name}</h3>
                  <p>{member.desc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <button className={`${styles.navButton} ${styles.prev} prev-button`}>
            <i className="fas fa-chevron-left" />
          </button>
          <button className={`${styles.navButton} ${styles.next} next-button`}>
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>
    </section>
  )
} 