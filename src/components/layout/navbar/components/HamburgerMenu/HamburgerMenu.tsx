'use client'

import clsx from 'clsx'
import styles from './HamburgerMenu.module.css'

interface HamburgerMenuProps {
  isOpen: boolean;
  onClickAction: () => void;
}

export default function HamburgerMenu({ isOpen, onClickAction }: HamburgerMenuProps) {
  return (
    <button 
      className={clsx(styles.hamburger, {
        [styles['hamburger--active']]: isOpen
      })}
      onClick={onClickAction}
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