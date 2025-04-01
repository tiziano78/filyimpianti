'use client'

import React, { useState, useEffect } from 'react'
import styles from './ConfigSidebar.module.css'
import ConfigSelector from './ConfigSelector'
import type { PannelloFotovoltaico } from '@/data/pannelliFotovoltaici'
import pannelliFotovoltaici from '@/data/pannelliFotovoltaici'
import type { Feature, Polygon } from 'geojson'
import type { BatteriaFotovoltaica } from '@/data/batterieFotovoltaiche'
import batterieFotovoltaiche from '@/data/batterieFotovoltaiche'
import { setSelectedPannello, setSelectedBatteria } from '@/utils/componentCache'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'

interface ConfigSidebarProps {
  selectedPannello: PannelloFotovoltaico | null
  onPannelloSelectAction: (pannello: PannelloFotovoltaico | null) => void
  selectedBatteria: BatteriaFotovoltaica | null
  onBatteriaSelectAction: (batteria: BatteriaFotovoltaica | null) => void
  currentLayout: Feature<Polygon> | null
  onCalculateLayoutAction: (layout: Feature<Polygon>) => void
  showBatterySelector: boolean
  onStorageUpdate?: (totalStorage: number) => void
  onBatteryConfirm?: () => void
}

export default function ConfigSidebar({
  selectedPannello,
  onPannelloSelectAction,
  selectedBatteria,
  onBatteriaSelectAction,
  currentLayout,
  onCalculateLayoutAction,
  showBatterySelector,
  onStorageUpdate,
  onBatteryConfirm
}: ConfigSidebarProps) {
  const [batteryCount, setBatteryCount] = useState(1)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Rileva se il dispositivo è mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    // Controlla all'inizio
    checkIfMobile()
    
    // Aggiungi event listener per il resize
    window.addEventListener('resize', checkIfMobile)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  const handleBatteryCountChange = (count: number) => {
    setBatteryCount(count)
    if (selectedBatteria) {
      const totalStorage = selectedBatteria.capacita * count
      onStorageUpdate?.(totalStorage)
    }
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const panelOptions = pannelliFotovoltaici.map(pannello => ({
    id: pannello.modello,
    name: pannello.modello,
    description: `${pannello.potenza}W - ${pannello.width}x${pannello.height}mm`,
    category: pannello.categoria,
    specs: {
      'Potenza': `${pannello.potenza}W`,
      'Dimensioni': `${pannello.width}x${pannello.height}mm`,
      'Efficienza': pannello.efficienza,
      'Categoria': pannello.categoria
    }
  }))

  const batterieOptions = batterieFotovoltaiche.map(batteria => ({
    id: batteria.modello,
    name: batteria.modello,
    description: `${batteria.capacita}kWh - ${batteria.qualita}`,
    category: batteria.qualita,
    specs: {
      'Capacità': `${batteria.capacita}kWh`,
      'Efficienza': `${batteria.efficienza}%`,
      'Garanzia': batteria.garanzia,
      'Qualità': batteria.qualita
    }
  }))

  return (
    <div className={`${styles.sidebar} ${isMobile ? (isExpanded ? styles.expanded : styles.collapsed) : ''}`}>
      {isMobile && (
        <div className={styles.toggleBar} onClick={toggleExpand} data-sidebar-toggle>
          <div className={styles.toggleHandle}>
            {isExpanded ? <FaChevronDown /> : <FaChevronUp />}
          </div>
          <div className={styles.toggleTitle}>
            {selectedPannello ? `${selectedPannello.modello} (${selectedPannello.potenza}W)` : 'Seleziona Pannello'}
          </div>
        </div>
      )}
      
      <div className={styles.sidebarContent}>
        <ConfigSelector
          title="Configurazione Pannelli"
          options={panelOptions}
          selectedId={selectedPannello?.modello}
          onSelectAction={(id) => {
            const pannello = pannelliFotovoltaici.find(p => p.modello === id)
            onPannelloSelectAction(pannello || null)
            setSelectedPannello(pannello || null)
            if (pannello && currentLayout) {
              onCalculateLayoutAction(currentLayout)
            }
            
            // Chiudi la sidebar su mobile
            if (isMobile) {
              setIsExpanded(false)
            }
          }}
          isFirstSelector={true}
          readOnly={!currentLayout}
        />

        {showBatterySelector && (
          <ConfigSelector
            title="Configurazione Batterie"
            options={batterieOptions}
            selectedId={selectedBatteria?.modello}
            onSelectAction={(id) => {
              const batteria = batterieFotovoltaiche.find(b => b.modello === id)
              onBatteriaSelectAction(batteria || null)
              setSelectedBatteria(batteria || null)
              if (batteria) {
                setBatteryCount(1)
                onStorageUpdate?.(batteria.capacita)
                
                // Su mobile, mantieni la sidebar aperta dopo la selezione della batteria
                if (isMobile) {
                  setIsExpanded(true)
                }
              } else {
                onStorageUpdate?.(0)
              }
            }}
            isFirstSelector={false}
            readOnly={false}
            isBatterySelector={true}
            onBatteryCountChange={handleBatteryCountChange}
            onBatteryConfirm={() => {
              // Chiudi la sidebar su mobile
              if (isMobile) {
                setIsExpanded(false)
              }
              // Passa l'evento al componente padre
              onBatteryConfirm?.()
            }}
          />
        )}
      </div>
    </div>
  )
}