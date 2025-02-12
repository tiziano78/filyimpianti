'use client'

import { useState } from 'react'
import styles from './Navbarbus.module.css'
import HamburgerMenubus from './components/HamburgerMenubus/HamburgerMenubus'
import Logobus from './components/Logobus/Logobus'
import NavMenubus from './components/NavMenubus/NavMenubus'

export default function Navbarbus() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_container}>
        <Logobus />
        <HamburgerMenubus isOpen={isOpen} toggleMenu={toggleMenu} />
        <NavMenubus isOpen={isOpen} />
      </div>
    </nav>
  )
}