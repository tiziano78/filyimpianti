'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import html2canvas from 'html2canvas'
import styles from './ConfigMap.module.css'
import ConfigSelector from '../ConfigPopup/components/ConfigSelector'
import { getEnvVar } from '@/config/env'
import type { ConfigMapHandle, Panel, ConfigMapProps } from '@/types/configurator'
import type { PannelloFotovoltaico } from '@/data/pannelliFotovoltaici'

// ...existing SAMPLE_PANELS, SAMPLE_INVERTERS, SAMPLE_BATTERIES...

const ConfigMap = forwardRef<ConfigMapHandle, ConfigMapProps>((
  {
    selectedPannello,
    onPanelAdd,
    onPanelSelect,
    onPanelRotate,
    panels
  }, 
  ref
) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<mapboxgl.Map | null>(null)

  // ...existing useState and useRef declarations...
  
  // ...existing useEffect and map initialization...

  // Converto i pannelli nel formato richiesto da ConfigSelector
  const configOptions = panels.map(panel => ({
    id: panel.id,
    name: panel.pannello.modello,
    description: `${panel.pannello.potenza}W - ${panel.pannello.width}x${panel.pannello.height}mm`,
    specs: {
      'Potenza': `${panel.pannello.potenza}W`,
      'Dimensioni': `${panel.pannello.width}x${panel.pannello.height}mm`,
      'Efficienza': panel.pannello.efficienza,
      'Garanzia': panel.pannello.garanzia,
      'Angolo': `${panel.rotation}°`
    }
  }))

  const handlePanelSelect = (id: string) => {
    const selectedPanel = panels.find(p => p.id === id)
    if (selectedPanel) {
      onPanelSelect(selectedPanel)
    }
  }

  // Trova il pannello corrispondente al selectedPannello
  const selectedPanelId = panels.find(p => p.pannello.modello === selectedPannello?.modello)?.id

  const captureImage = async (): Promise<string> => {
    if (!mapContainer.current) {
      throw new Error('Mappa non trovata')
    }

    try {
      const canvas = await html2canvas(mapContainer.current, {
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: mapContainer.current.offsetWidth,
        height: mapContainer.current.offsetHeight
      })
      
      return canvas.toDataURL('image/png')
    } catch (error) {
      console.error('Errore durante la cattura della mappa:', error)
      throw new Error('Impossibile catturare l\'immagine della mappa')
    }
  }

  // Esponiamo i metodi tramite ref
  useImperativeHandle(ref, () => ({
    panelRotate: onPanelRotate,
    captureImage
  }))

  return (
    <div className={styles.configContainer}>
      <div ref={mapContainer} className={styles.mapContainer}>
        {/* ... existing map content ... */}
      </div>
      <ConfigSelector
        title="Seleziona Pannello"
        options={configOptions}
        selectedId={selectedPanelId}
        onSelectAction={handlePanelSelect}
      />
    </div>
  )
})

ConfigMap.displayName = 'ConfigMap'

export default ConfigMap