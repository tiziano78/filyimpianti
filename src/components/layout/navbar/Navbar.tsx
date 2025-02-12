'use client'

import { useState } from 'react'
import clsx from 'clsx'
import styles from './Navbar.module.css'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu'
import NavMenu from './components/NavMenu/NavMenu'
import Image from 'next/image'
import Link from 'next/link'

interface NavbarProps {
  variant?: 'business' | 'default';
}

export default function Navbar({ variant = 'default' }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav 
      className={clsx(styles.navbar, {
        [styles['navbar--business']]: variant === 'business'
      })}
    >
      <div className={styles.navbar_container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/logo.png"
            alt="Fily Impianti Logo"
            width={80}
            height={60}
            loading="eager"
            className={styles.logo_img}
          />
        </Link>
        <WhatsAppButton />
        <HamburgerMenu 
          isOpen={isMenuOpen} 
          onClickAction={toggleMenu}
        />
        <NavMenu isOpen={isMenuOpen} variant={variant} />
      </div>
    </nav>
  )
}