'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import styles from './NavMenubus.module.css'
import navbarStyles from '../../Navbarbus.module.css'

interface NavMenuProps {
  isOpen: boolean;
  variant?: 'business' | 'default';
}

export default function NavMenu({ isOpen, variant = 'default' }: NavMenuProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleDropdownClick = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div 
      ref={dropdownRef} 
      className={clsx(styles.navbar_menu, {
        [styles['navbar_menu--active']]: isOpen
      })}
    >
      <ul className={clsx(styles.menu_items, {
        [styles['menu_items--business']]: variant === 'business'
      })}>
        <li className={styles.menu_item}>
          <Link href="/" className={styles.menu_link}>HOME</Link>
        </li>
        <li className={styles.menu_item}>
          <Link href="/cer" className={styles.menu_link}>CER</Link>
        </li>
        <li className={styles.menu_item}>
          <Link href="/conto-termico" className={styles.menu_link}>CONTO TERMICO 3.0</Link>
        </li>
        
        {/* Dropdown Aziende */}
        <li className={clsx(styles.menu_item, styles.dropdown)}>
          <button 
            onClick={() => handleDropdownClick('aziende')}
            className={clsx(styles.dropdown_toggle, navbarStyles.bold_link)}
          >
            AZIENDE
          </button>
          <ul className={clsx(styles.dropdown_menu, {
            [styles['dropdown_menu--active']]: activeDropdown === 'aziende'
          })}>
            <li>
              <Link href="/fotovoltaico-aziende" className={styles.dropdown_link}>
                Fotovoltaico per Aziende
              </Link>
            </li>
          </ul>
        </li>

        {/* Dropdown Realizzazioni */}
        <li className={clsx(styles.menu_item, styles.dropdown)}>
          <button 
            onClick={() => handleDropdownClick('realizzazioni')}
            className={clsx(styles.dropdown_toggle, navbarStyles.bold_link)}
          >
            REALIZZAZIONI
          </button>
          <ul className={clsx(styles.dropdown_menu, {
            [styles['dropdown_menu--active']]: activeDropdown === 'realizzazioni'
          })}>
            <li>
              <Link href="/realizzazioni/fotovoltaico" className={styles.dropdown_link}>
                Fotovoltaico
              </Link>
            </li>
            <li>
              <Link href="/realizzazioni/solare-termico" className={styles.dropdown_link}>
                Solare Termico
              </Link>
            </li>
            <li>
              <Link href="/realizzazioni/pompe-calore" className={styles.dropdown_link}>
                Pompe di Calore
              </Link>
            </li>
            <li>
              <Link href="/realizzazioni/biomassa" className={styles.dropdown_link}>
                Biomassa
              </Link>
            </li>
          </ul>
        </li>

        <li className={styles.menu_item}>
          <Link href="/blog" className={styles.menu_link}>BLOG</Link>
        </li>
      </ul>
    </div>
  )
} 