'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import styles from './HeroTestimonial.module.css'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/autoplay'

const images = Array.from({ length: 20 }, (_, i) => {
  const baseIndex = i % 10
  const isCopy = i >= 10
  return `${baseIndex}${isCopy ? ' - Copia' : ''}.webp`
})

export default function HeroTestimonial() {
  const [isClient, setIsClient] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className={styles.heroTestimonial}>
      <h4 className={styles.testimonialTitle}>
        LE SCELTE DEI NOSTRI CLIENTI, IL NOSTRO ORGOGLIO!
      </h4>

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        spaceBetween={30}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false,
          scale: 0.8
        }}
        breakpoints={{
          320: {
            slidesPerView: 'auto',
            spaceBetween: 15,
            coverflowEffect: {
              depth: 100,
              scale: 0.75,
              modifier: 1
            }
          },
          768: {
            slidesPerView: 'auto',
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 'auto',
            spaceBetween: 30
          }
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        modules={[Autoplay, EffectCoverflow]}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        className={styles.swiperContainer}
        dir="ltr"
      >
        {images.map((image, index) => (
          <SwiperSlide 
            key={image} 
            className={`${styles.swiperSlide} ${index === activeIndex ? styles.active : ''}`}
          >
            <div 
              className={styles.slideWrapper}
            >
              <Image
                src={`/images/hero/carousel/${image}`}
                alt={`Testimonial ${index + 1}`}
                width={400}
                height={400}
                priority={index < 5}
                className={styles.testimonialImage}
                loading={index < 5 ? 'eager' : 'lazy'}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
} 