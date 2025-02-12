'use client'

import React, { useState, useRef } from 'react'
import { Portal } from '@/components/Portal/Portal'
import styles from './ConfigPopup.module.css'
import pannelliFotovoltaici from '@/data/pannelliFotovoltaici'
import ConfigMap from '../ConfigMap/ConfigMap'
import { FaTimes } from 'react-icons/fa'
import type { Panel, ConfigMapHandle } from '@/types/configurator'

interface ConfigPopupProps {
  isOpen: boolean
  onCloseAction: () => void
}

export default function ConfigPopup({ isOpen, onCloseAction }: ConfigPopupProps) {
  const [panels, setPanels] = useState<Panel[]>([])
  const [selectedPannello] = useState(pannelliFotovoltaici[0])
  const mapRef = useRef<ConfigMapHandle>(null)

  if (!isOpen) return null

  const handlePanelAdd = (panel: Panel) => {
    setPanels(prev => [...prev, panel])
  }

  const handlePanelSelect = (panel: Panel) => {
    console.log('Panel selected:', panel)
  }

  const handlePanelRotate = (panel: Panel, angle: number) => {
    setPanels(prev => prev.map(p => 
      p.id === panel.id ? { ...p, rotation: angle } : p
    ))
  }

  const handleExport = async () => {
    try {
      if (!mapRef.current) return
      
      const image = await mapRef.current.captureImage()
      if (!image) {
        console.error('Errore durante la cattura dell\'immagine')
        return
      }

      console.log('Configurazione da esportare:', {
        panels,
        image
      })
    } catch (error) {
      console.error('Errore durante l\'esportazione:', error)
    }
  }

  return (
    <Portal>
      <div className={styles.popupOverlay}>
        <div className={styles.popupContent}>
          <button className={styles.closeButton} onClick={onCloseAction}>
            <FaTimes />
          </button>
          
          <div className={styles.mapContainer}>
            <ConfigMap
              ref={mapRef}
              selectedPannello={selectedPannello}
              onPanelAdd={handlePanelAdd}
              onPanelSelect={handlePanelSelect}
              onPanelRotate={handlePanelRotate}
              panels={panels}
            />
          </div>

          <div className={styles.controls}>
            <button onClick={handleExport} className={styles.exportButton}>
              Esporta Configurazione
            </button>
          </div>
        </div>
      </div>
    </Portal>
  )
}