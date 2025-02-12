'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import styles from './ConfigMap.module.css'
import ConfigSelector from './components/ConfigSelector'
import { getEnvVar } from '@/config/env'

console.log('1. Inizio caricamento componente')

// Dati di esempio - questi verranno sostituiti con dati reali dal backend
const SAMPLE_PANELS = [
  {
    id: 'panel1',
    name: 'SunPower Maxeon 3',
    description: 'Pannello solare ad alta efficienza con tecnologia Maxeon',
    specs: {
      potenza: '400W',
      efficienza: '22.6%',
      dimensioni: '1690x1046mm'
    }
  },
  {
    id: 'panel2',
    name: 'LG NeON 2',
    description: 'Pannello bifacciale con tecnologia CELLO',
    specs: {
      potenza: '380W',
      efficienza: '21.8%',
      dimensioni: '1686x1016mm'
    }
  }
]

const SAMPLE_INVERTERS = [
  {
    id: 'inv1',
    name: 'SolarEdge HD-Wave',
    description: 'Inverter monofase con tecnologia HD-Wave',
    specs: {
      potenza: '6kW',
      efficienza: '99%',
      fasi: 'Monofase'
    }
  },
  {
    id: 'inv2',
    name: 'Huawei SUN2000',
    description: 'Inverter trifase con batteria integrata',
    specs: {
      potenza: '10kW',
      efficienza: '98.6%',
      fasi: 'Trifase'
    }
  }
]

const SAMPLE_BATTERIES = [
  {
    id: 'bat1',
    name: 'Tesla Powerwall',
    description: 'Batteria al litio con backup integrato',
    specs: {
      capacità: '13.5kWh',
      potenza: '7kW',
      cicli: '10000'
    }
  },
  {
    id: 'bat2',
    name: 'LG RESU',
    description: 'Sistema di accumulo compatto e modulare',
    specs: {
      capacità: '9.8kWh',
      potenza: '5kW',
      cicli: '8000'
    }
  }
]

// Importiamo il geocoder solo lato client
const MapboxGeocoder = typeof window !== 'undefined' 
  ? require('@mapbox/mapbox-gl-geocoder') 
  : null

console.log('2. Stato MapboxGeocoder:', MapboxGeocoder ? 'Caricato' : 'Non caricato')

if (typeof window !== 'undefined') {
  require('@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css')
  console.log('3. CSS del geocoder caricato')
}

export default function ConfigMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<mapboxgl.Map | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPanel, setSelectedPanel] = useState<string>()
  const [selectedInverter, setSelectedInverter] = useState<string>()
  const [selectedBattery, setSelectedBattery] = useState<string>()

  useEffect(() => {
    if (!mapContainer.current) return

    const initializeMap = async () => {
      try {
        const mapboxToken = getEnvVar('NEXT_PUBLIC_MAPBOX_TOKEN')
        mapboxgl.accessToken = mapboxToken

        if (!mapContainer.current) return

        const map = new mapboxgl.Map({
          container: mapContainer.current as HTMLElement,
          style: 'mapbox://styles/mapbox/satellite-streets-v12',
          center: [7.6869, 45.0703], // Torino
          zoom: 19
        })

        map.on('load', () => {
          setLoading(false)
        })

        mapInstance.current = map

        // Aggiungiamo il geocoder se disponibile
        if (MapboxGeocoder) {
          const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            placeholder: 'Cerca indirizzo...',
            language: 'it',
            marker: true
          })

          mapInstance.current.addControl(geocoder)

          geocoder.on('result', (event: { result: { center: [number, number] } }) => {
            const [lng, lat] = event.result.center
            mapInstance.current?.flyTo({
              center: [lng, lat],
              zoom: 19,
              essential: true
            })
          })
        }

      } catch (error) {
        console.error('Errore inizializzazione mappa:', error)
        setLoading(false)
      }
    }

    initializeMap()

    // Cleanup function
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [])

  return (
    <div className={styles.configContainer}>
      <div className={styles.sidebarContainer}>
        <h3 className="text-lg font-semibold mb-4">Configurazione Impianto</h3>
        <div className="space-y-4">
          <ConfigSelector
            title="Pannelli Solari"
            options={SAMPLE_PANELS}
            selectedId={selectedPanel}
            onSelectAction={setSelectedPanel}
          />
          <ConfigSelector
            title="Inverter"
            options={SAMPLE_INVERTERS}
            selectedId={selectedInverter}
            onSelectAction={setSelectedInverter}
          />
          <ConfigSelector
            title="Batterie"
            options={SAMPLE_BATTERIES}
            selectedId={selectedBattery}
            onSelectAction={setSelectedBattery}
          />
        </div>
      </div>
      
      <div className={styles.mapContainer} ref={mapContainer}>
        {loading && (
          <div className={styles.loading}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        )}
      </div>
    </div>
  )
}