'use client'

import Image from 'next/image'
import styles from './WhatsAppButton.module.css'

export default function WhatsAppButton() {
  const phoneNumber = '393470087833'
  
  return (
    <a 
      href={`https://wa.me/${phoneNumber}`}
      className={styles.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contattaci su WhatsApp"
      role="button"
    >
      <Image 
        src="/images/webp/whatsapp.navbar.webp"
        alt=""
        width={70}
        height={70}
        className={styles.whatsapp__image}
        loading="eager"
      />
    </a>
  )
}