'use client'

import React from 'react'
import clsx from 'clsx'
import styles from './HamburgerMenubus.module.css'

interface HamburgerMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function HamburgerMenubus({ isOpen, toggleMenu: action }: HamburgerMenuProps) {
  return (
    <button 
      className={clsx(styles.hamburger, {
        [styles['hamburger--active']]: isOpen
      })}
      onClick={action}
      aria-label="Menu di navigazione"
      aria-expanded={isOpen}
      aria-controls="main-menu"
    >
      <span className={styles.hamburger__line} aria-hidden="true"></span>
      <span className={styles.hamburger__line} aria-hidden="true"></span>
      <span className={styles.hamburger__line} aria-hidden="true"></span>
    </button>
  )
} 