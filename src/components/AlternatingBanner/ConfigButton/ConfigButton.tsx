'use client'

import React, { useState } from 'react'
import styles from './ConfigButton.module.css'
import { FiSettings } from 'react-icons/fi'
import ConfigPopup from '@/components/maps/ConfigPopup/ConfigPopup'

interface ConfigButtonProps {
  onConfigOpen?: () => void
  onConfigClose?: () => void
}

export default function ConfigButton({ onConfigOpen, onConfigClose }: ConfigButtonProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handleOpenConfig = () => {
    setIsPopupOpen(true)
    onConfigOpen?.()
  }

  const handleCloseConfig = () => {
    setIsPopupOpen(false)
    onConfigClose?.()
  }

  return (
    <>
      <button 
        className={styles.configButton}
        onClick={handleOpenConfig}
        aria-label="Apri configuratore"
      >
        <FiSettings className={styles.icon} />
        Configura Impianto
      </button>

      {isPopupOpen && (
        <ConfigPopup 
          isOpen={isPopupOpen} 
          onCloseAction={handleCloseConfig}
        />
      )}
    </>
  )
}
