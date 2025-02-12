'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Logobus.module.css'

export default function Logobus() {
  return (
    <Link href="/fotovoltaico-aziende" className={styles.logo}>
      <Image
        src="/images/BUSINESS.png"
        alt="Fily Impianti Business Logo"
        width={170}
        height={100}
        loading="eager"
        className={styles.logo_img}
      />
    </Link>
  )
} 