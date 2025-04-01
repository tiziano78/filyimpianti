'use client'

import { useState, Suspense } from 'react'
import ConfigMap from '@/components/maps/ConfigMap/ConfigMap'
import type { Panel } from '@/types/configurator'
import type { PannelloFotovoltaico } from '@/data/pannelliFotovoltaici'

export default function MappaPage() {
  const [selectedPannello, setSelectedPannello] = useState<PannelloFotovoltaico | null>(null)
  const [panels, setPanels] = useState<Panel[]>([])

  const handlePanelAdd = (panel: Panel) => {
    setPanels(prev => [...prev, panel])
  }

  const handlePanelSelect = (panel: Panel | null) => {
    // Gestione selezione pannello
    console.log('Pannello selezionato:', panel)
  }

  const handlePanelRotate = (panel: Panel) => {
    // Gestione rotazione pannello
    console.log('Rotazione pannello:', panel)
  }

  return (
    <main className="flex min-h-screen flex-col relative">
      <Suspense fallback={
        <div className="flex items-center justify-center w-full h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }>
        <ConfigMap 
          selectedPannello={selectedPannello}
          onPannelloSelect={setSelectedPannello}
          onPanelAdd={handlePanelAdd}
          onPanelSelect={handlePanelSelect}
          onPanelRotate={handlePanelRotate}
          panels={panels}
        />
      </Suspense>
    </main>
  )
}