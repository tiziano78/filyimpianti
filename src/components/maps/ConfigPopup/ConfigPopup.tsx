'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Portal } from '@/components/Portal/Portal'
import styles from './ConfigPopup.module.css'
import pannelliFotovoltaici, { PannelloFotovoltaico } from '@/data/pannelliFotovoltaici'
import ConfigMap from '../ConfigMap/ConfigMap'
import { FaTimes } from 'react-icons/fa'
import type { Panel, ConfigMapHandle } from '@/types/configurator'

interface ConfigPopupProps {
  isOpen: boolean
  onCloseAction: () => void
}

export default function ConfigPopup({ isOpen, onCloseAction }: ConfigPopupProps) {
  const [panels, setPanels] = useState<Panel[]>([])
  const [selectedPannello, setSelectedPannello] = useState<PannelloFotovoltaico | null>(null)
  const mapRef = useRef<ConfigMapHandle>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isOpen) return null

  const handlePanelAdd = (panel: Panel) => {
    setPanels(prev => [...prev, panel])
  }

  const handlePanelSelect = (panel: Panel) => {
    console.log('Panel selected:', panel)
  }

  const handlePannelloSelect = (id: string) => {
    const pannello = pannelliFotovoltaici.find(p => p.modello === id)
    console.log('Pannello selezionato:', pannello)
    setSelectedPannello(pannello || null)
  }

  const handlePanelRotate = (panel: Panel, angle: number) => {
    setPanels(prev => prev.map(p => 
      p.id === panel.id ? { ...p, rotation: angle } : p
    ))
  }

  return (
    <Portal>
      <div className={styles.popupOverlay}>
        <div className={styles.popupContent}>
          <button className={styles.closeButton} onClick={onCloseAction}>
            {isMobile ? 'Chiudi' : <FaTimes />}
          </button>
          
          <div className={styles.mapContainer}>
            <ConfigMap
              ref={mapRef}
              selectedPannello={selectedPannello}
              onPannelloSelect={setSelectedPannello}
              onPanelAdd={handlePanelAdd}
              onPanelSelect={handlePanelSelect}
              onPanelRotate={handlePanelRotate}
              panels={panels}
            />
          </div>
        </div>
      </div>
    </Portal>
  )
}