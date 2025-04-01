'use client'

import React, { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react'
import mapboxgl, { LngLat, LngLatLike } from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import type { Result } from '@mapbox/mapbox-gl-geocoder'
import { Feature, Polygon, Position, LineString } from 'geojson'
import * as turf from '@turf/turf'
import html2canvas from 'html2canvas'
import styles from './ConfigMap.module.css'
import ConfigSidebar from '../ConfigPopup/components/ConfigSidebar'
import LayoutManager from './LayoutManager'
import { getEnvVar } from '@/config/env'
import type { ConfigMapHandle, Panel, ConfigMapProps } from '@/types/configurator'
import type { PannelloFotovoltaico } from '@/data/pannelliFotovoltaici'
import type { BatteriaFotovoltaica } from '@/data/batterieFotovoltaiche'
import pannelliFotovoltaici from '@/data/pannelliFotovoltaici'
import batterieFotovoltaiche from '@/data/batterieFotovoltaiche'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { createPanelLayout, calculateOptimalRotation, calculatePanelStats } from '@/utils/panelLayout'
import selectorStyles from '../ConfigPopup/components/ConfigSidebar.module.css'
import layoutStyles from './LayoutManager.module.css'
import { FaCheck } from 'react-icons/fa'
import { FaFileDownload } from 'react-icons/fa'

// Aggiungi uno stile globale per Mapbox
const baseStyles = `
  .mapboxgl-ctrl-group {
    composes: ${styles.mapboxglCtrlGroup};
  }
  .mapboxgl-ctrl-group button {
    composes: ${styles.mapboxglCtrlButton};
  }
  .mapboxgl-ctrl-geocoder {
    composes: ${styles.mapboxglCtrlGeocoder};
  }
  .mapboxgl-ctrl-geocoder--input {
    composes: ${styles.mapboxglCtrlGeocoderInput};
  }
  .mapboxgl-ctrl-geocoder--icon {
    composes: ${styles.mapboxglCtrlGeocoderIcon};
  }
  .mapboxgl-ctrl-geocoder--button {
    composes: ${styles.mapboxglCtrlGeocoderButton};
  }
  .mapboxgl-popup-content {
    composes: ${styles.mapboxglPopupContent};
  }
  .mapboxgl-popup-close-button {
    composes: ${styles.mapboxglPopupCloseButton};
  }

  .help-popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.75);
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
    pointer-events: none;
    transition: opacity 0.3s ease;
    border-left: 4px solid #FF6B6B;
  }

  @keyframes fadeInOut {
    0% { opacity: 0; }
    10% { opacity: 1; }
    80% { opacity: 1; }
    100% { opacity: 0; }
  }
`

interface MeasurementInfo {
  area: number;
  perimeter: number;
  sideLengths: number[];
}

interface LayoutData {
  polygon: Feature<Polygon>;
  stats: {
    totalPanels: number;
    totalPower: number;
    totalArea: number;
    orientation: number;
    isConfirmed: boolean;
  };
  layoutConfirmed: boolean;
}

interface PanelLayoutResult {
  stats: {
    totalPanels: number;
    totalPower: number;
    totalArea: number;
  };
  panels: Feature<Polygon>[];
}

const ConfigMap = forwardRef<ConfigMapHandle, ConfigMapProps>((
  {
    selectedPannello,
    onPannelloSelect,
    onPanelAdd,
    onPanelSelect,
    onPanelRotate,
    panels
  }, 
  ref
) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<mapboxgl.Map | null>(null)
  const drawInstance = useRef<MapboxDraw | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [measurements, setMeasurements] = useState<MeasurementInfo>({
    area: 0,
    perimeter: 0,
    sideLengths: []
  })
  // Stato per memorizzare i vertici originali del poligono
  const [originalVertices, setOriginalVertices] = useState<Position[]>([])
  const selectedPanelId = panels.find(p => p.pannello.modello === selectedPannello?.modello)?.id || undefined
  const [selectedBatteria, setSelectedBatteria] = useState<BatteriaFotovoltaica | null>(null)
  const [webGLSupported, setWebGLSupported] = useState(true)
  const [currentLayout, setCurrentLayout] = useState<Feature<Polygon> | null>(null)
  const [currentStats, setCurrentStats] = useState<{
    totalPanels: number;
    totalPower: number;
    totalArea: number;
  } | null>(null)
  const [showTypeSelection, setShowTypeSelection] = useState(false)
  const [selectedType, setSelectedType] = useState<'panels' | 'batteries' | null>(null)
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(true)
  const [layouts, setLayouts] = useState<LayoutData[]>([])
  const [currentLayoutIndex, setCurrentLayoutIndex] = useState<number | null>(null)
  const [orientationArrowSource, setOrientationArrowSource] = useState<mapboxgl.GeoJSONSource | null>(null)
  const [showBatterySelector, setShowBatterySelector] = useState(false)
  const [showHelpPopup, setShowHelpPopup] = useState(false)
  const [showArrowPopup, setShowArrowPopup] = useState(false)
  const [totalStorage, setTotalStorage] = useState<number>(0)
  const [currentAddress, setCurrentAddress] = useState<string>('')
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isProjectConfirmed, setIsProjectConfirmed] = useState<boolean>(false);
  const [isSoloPannelli, setIsSoloPannelli] = useState<boolean>(false);

  // Riferimento al componente LayoutManager
  const layoutManagerRef = useRef<any>(null);

  // Imposta il token Mapbox all'inizio
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (token) {
      mapboxgl.accessToken = token
    } else {
      setError('Token Mapbox non trovato nelle variabili di ambiente')
    }
  }, [])

  // Funzione per calcolare le misure
  const calculateMeasurements = () => {
    if (!drawInstance.current) return
    
    const data = drawInstance.current.getAll()
    if (data.features.length > 0) {
      try {
        const polygon = data.features[0] as Feature<Polygon>
        if (!polygon.geometry || !polygon.geometry.coordinates || !polygon.geometry.coordinates[0]) {
          console.warn('Geometria del poligono non valida')
          return
        }
        
        // Calcola l'area
        const area = turf.area(polygon)
        
        // Calcola il perimetro e le lunghezze dei lati
        const coordinates = polygon.geometry.coordinates[0]
        let perimeter = 0
        const sideLengths: number[] = []
        
        for (let i = 0; i < coordinates.length - 1; i++) {
          const from = coordinates[i]
          const to = coordinates[i + 1]
          
          // Verifica che le coordinate siano array validi di numeri
          if (!Array.isArray(from) || !Array.isArray(to) || from.length < 2 || to.length < 2) {
            console.warn('Coordinate non valide:', { from, to })
            continue
          }
          
          try {
            const fromPoint = turf.point([from[0], from[1]])
            const toPoint = turf.point([to[0], to[1]])
            
            const distance = turf.distance(fromPoint, toPoint, { units: 'meters' })
            perimeter += distance
            sideLengths.push(Math.round(distance * 100) / 100)
          } catch (error) {
            console.warn('Errore nel calcolo della distanza:', error)
          }
        }

        setMeasurements({
          area: Math.round(area * 100) / 100,
          perimeter: Math.round(perimeter * 100) / 100,
          sideLengths
        })
      } catch (error) {
        console.warn('Errore nel calcolo delle misure:', error)
        setMeasurements({
          area: 0,
          perimeter: 0,
          sideLengths: []
        })
      }
    }
  }

  // Funzione per ottenere l'indirizzo dalle coordinate
  const getAddressFromCoordinates = async (coordinates: [number, number]) => {
    try {
      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${token}&language=it&types=address`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        return data.features[0].place_name;
      }
      return 'Indirizzo non trovato';
    } catch (error) {
      console.error('Errore nel recupero dell\'indirizzo:', error);
      return 'Errore nel recupero dell\'indirizzo';
    }
  };

  const calculatePanelLayoutForPolygon = async (polygon: Feature<Polygon>): Promise<PanelLayoutResult | null> => {
    if (!selectedPannello) {
      console.log('Nessun pannello selezionato');
      return null;
    }

    try {
      // Converti le dimensioni da millimetri a metri
      const panelWidth = selectedPannello.width / 1000; // mm -> m
      const panelHeight = selectedPannello.height / 1000; // mm -> m
      
      console.log('Dimensioni convertite in metri:', {
        width: panelWidth,
        height: panelHeight
      });

      const response = await fetch('/api/grid-calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          polygon,
          panelWidth,
          panelHeight,
          spacing: 0.04 // 4cm di spazio tra i pannelli
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Errore nella risposta del server:', errorText);
        return null;
      }

      const data = await response.json();
      console.log('Risposta dal server:', data);
      
      if (!data.panels || !data.stats) {
        console.error('Dati mancanti nella risposta:', data);
        return null;
      }

      return {
        panels: data.panels,
        stats: {
          totalPanels: data.stats.totalPanels,
          totalPower: data.stats.totalPanels * selectedPannello.potenza,
          totalArea: data.stats.totalArea
        }
      };

    } catch (error) {
      console.error('Errore nel calcolo del layout:', error);
      return null;
    }
  };

  const handleLayoutCreation = async (polygon: Feature<Polygon>) => {
    if (!selectedPannello) {
      console.log('Nessun pannello selezionato')
      return
    }

    // Trova il primo slot vuoto disponibile
    const nextSlotIndex = layouts.length;
    if (nextSlotIndex >= 3) {
      console.log('Tutti gli slot sono occupati');
      return;
    }

    // Calcola il centro del poligono e ottieni l'indirizzo
    const center = turf.center(polygon);
    const coordinates = center.geometry.coordinates as [number, number];
    const address = await getAddressFromCoordinates(coordinates);
    setCurrentAddress(address);

    setCurrentLayout(polygon)
    const result = await calculatePanelLayoutForPolygon(polygon)
    
    if (result) {
      const { stats, panels } = result
      const map = mapInstance.current;
      if (!map) return;

      // Usa l'indice dello slot come ID del layout
      const layoutId = `layout-${nextSlotIndex}`;

      // Rimuovi eventuali layer esistenti per questo slot
      if (map.getLayer(`${layoutId}-fill`)) map.removeLayer(`${layoutId}-fill`);
      if (map.getLayer(`${layoutId}-outline`)) map.removeLayer(`${layoutId}-outline`);
      if (map.getSource(layoutId)) map.removeSource(layoutId);

      // Aggiungi la nuova source
      map.addSource(layoutId, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: panels
        }
      });

      // Aggiungi i layer per i pannelli
      map.addLayer({
        id: `${layoutId}-fill`,
        type: 'fill',
        source: layoutId,
        paint: {
          'fill-color': '#191970',
          'fill-opacity': 0.8
        }
      });

      map.addLayer({
        id: `${layoutId}-outline`,
        type: 'line',
        source: layoutId,
        paint: {
          'line-color': '#D3D3D3',
          'line-width': 1
        }
      });

      // Aggiorna le statistiche correnti
      setCurrentStats({
        totalPanels: stats.totalPanels,
        totalPower: stats.totalPower,
        totalArea: stats.totalArea
      });

      // Aggiungi il nuovo layout
      const newLayout: LayoutData = {
        polygon,
        stats: {
          ...stats,
          orientation: 0,
          isConfirmed: false
        },
        layoutConfirmed: false
      };
      
      setLayouts(prev => {
        const newLayouts = [...prev];
        newLayouts[nextSlotIndex] = newLayout;
        return newLayouts;
      });
      setCurrentLayoutIndex(nextSlotIndex);
    }
  };

  useEffect(() => {
    const map = mapInstance.current;
    const draw = drawInstance.current;
    if (!map || !draw) return;

    const handleCreate = (e: { features: Feature<Polygon>[] }) => {
      if (e.features && e.features.length > 0) {
        const polygon = e.features[0];
        
        // Memorizza i vertici originali (escluso l'ultimo che è uguale al primo in un poligono chiuso)
        const coordinates = polygon.geometry.coordinates[0];
        setOriginalVertices(coordinates.slice(0, -1));
        
        calculateMeasurements();
        handleLayoutCreation(polygon);

        // Mostra il popup solo se è il primo layout
        if (layouts.length === 0) {
          setShowHelpPopup(true);
          setTimeout(() => {
            setShowHelpPopup(false);
          }, 4000);
        }
      }
    };

    const handleUpdate = async (e: { features: Feature<Polygon>[] }) => {
      if (e.features && e.features.length > 0) {
        const polygon = e.features[0];
        const draw = drawInstance.current;
        
        // Ottieni le coordinate attuali
        const currentCoordinates = polygon.geometry.coordinates[0];
        
        // Se il numero di vertici è diverso da quello originale (escluso l'ultimo punto duplicato)
        if (originalVertices.length > 0 && currentCoordinates.length - 1 !== originalVertices.length) {
          console.log('Rilevati vertici aggiuntivi, ripristino forma originale');
          
          // Crea un nuovo poligono con solo i vertici originali
          const simplifiedPolygon = {
            ...polygon,
            geometry: {
              ...polygon.geometry,
              coordinates: [[
                ...originalVertices,
                originalVertices[0] // Chiudi il poligono duplicando il primo punto
              ]]
            }
          };
          
          // Aggiorna il poligono nel draw
          if (draw) {
            // Sostituisci il poligono attuale con quello semplificato
            if (typeof polygon.id === 'string' || typeof polygon.id === 'number') {
              draw.delete(polygon.id.toString());
              const newId = draw.add(simplifiedPolygon);
              
              // Seleziona il nuovo poligono
              if (typeof newId === 'string') {
                draw.changeMode('simple_select', { featureIds: [newId] });
              }
            }
          }
          
          // Usa il poligono semplificato per il resto della logica
          calculateMeasurements();
          
          // Se il layout non è ancora confermato, aggiorna il layout
          if (currentLayoutIndex !== null && !layouts[currentLayoutIndex]?.stats.isConfirmed) {
            const result = await calculatePanelLayoutForPolygon(simplifiedPolygon);
            if (result) {
              const { stats, panels } = result;
              const layoutId = `layout-${currentLayoutIndex}`;
              
              // Aggiorna la source del layout
              const source = map.getSource(layoutId);
              if (source && 'setData' in source) {
                (source as mapboxgl.GeoJSONSource).setData({
                  type: 'FeatureCollection',
                  features: panels
                });
              }
              
              // Aggiorna le statistiche
              setCurrentStats({
                totalPanels: stats.totalPanels,
                totalPower: stats.totalPower,
                totalArea: stats.totalArea
              });
              
              // Aggiorna il layout nello stato
              setLayouts(prev => prev.map((layout, i) => 
                i === currentLayoutIndex 
                  ? {
                      polygon: simplifiedPolygon as Feature<Polygon>,
                      stats: {
                        ...stats,
                        orientation: layout.stats.orientation,
                        isConfirmed: false
                      },
                      layoutConfirmed: layout.layoutConfirmed
                    }
                  : layout
              ));
            }
          }
          
          return; // Esci dalla funzione per evitare di eseguire il resto della logica
        }
        
        calculateMeasurements();
        
        // Se il layout non è ancora confermato, aggiorna il layout
        if (currentLayoutIndex !== null && !layouts[currentLayoutIndex]?.stats.isConfirmed) {
          const result = await calculatePanelLayoutForPolygon(polygon);
          if (result) {
            const { stats, panels } = result;
            const layoutId = `layout-${currentLayoutIndex}`;
            
            // Aggiorna la source del layout
            const source = map.getSource(layoutId);
            if (source && 'setData' in source) {
              (source as mapboxgl.GeoJSONSource).setData({
                type: 'FeatureCollection',
                features: panels
              });
            }
            
            // Aggiorna le statistiche
            setCurrentStats({
              totalPanels: stats.totalPanels,
              totalPower: stats.totalPower,
              totalArea: stats.totalArea
            });
            
            // Aggiorna il layout nello stato
            setLayouts(prev => prev.map((layout, i) => 
              i === currentLayoutIndex 
                ? {
                    ...layout,
                    stats: {
                      ...stats,
                      orientation: layout.stats.orientation,
                      isConfirmed: false
                    }
                  }
                : layout
            ));
          }
        }
      }
    };

    map.on('draw.create', handleCreate);
    map.on('draw.update', handleUpdate);

    return () => {
      map.off('draw.create', handleCreate);
      map.off('draw.update', handleUpdate);
    };
  }, [currentLayoutIndex, layouts, calculatePanelLayoutForPolygon]);

  useEffect(() => {
    const container = mapContainer.current
    if (!container) return

    const initializeMap = async () => {
      try {
        // Verifica il supporto WebGL
        if (!mapboxgl.supported()) {
          setWebGLSupported(false)
          setError('Il tuo browser non supporta WebGL. Per favore, usa un browser compatibile.')
          setLoading(false)
          return
        }

        // Imposta il token Mapbox
        const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
        if (!token) {
          throw new Error('Token Mapbox non trovato')
        }
        mapboxgl.accessToken = token

        // Configurazione ottimizzata per risoluzione ottimale
        const map = new mapboxgl.Map({
          container: container,
          style: 'mapbox://styles/mapbox/satellite-v9', // Immagini satellitari pure per massima risoluzione
          center: [7.6869, 45.0703],
          zoom: 19,
          pitch: 0,
          bearing: 0,
          antialias: true,
          preserveDrawingBuffer: true,
          maxPitch: 0,
          minZoom: 15,     
          maxZoom: 21,  // Livello ottimale per dati ad alta risoluzione in Europa
          interactive: true,
          touchZoomRotate: true,
          touchPitch: false,
          cooperativeGestures: false,
          renderWorldCopies: false,
          localIdeographFontFamily: 'auto', // Migliora rendering caratteri
          fadeDuration: 0 // Rimuove fade effect per immagini più nitide
        })

        // Gestione errori WebGL
        const canvas = map.getCanvas()
        const gl = canvas.getContext('webgl') as WebGLRenderingContext
        if (gl) {
          // Configura i parametri WebGL
          gl.clearColor(0.0, 0.0, 0.0, 0.0)
          gl.enable(gl.DEPTH_TEST)
          gl.depthFunc(gl.LEQUAL)
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

          // Forza un reset del contesto se necessario
          const ext = gl.getExtension('WEBGL_lose_context')
          if (ext) {
            ext.loseContext()
            setTimeout(() => {
              ext.restoreContext()
              map.triggerRepaint()
            }, 100)
          }
        }

        // Gestione ottimizzata del rendering
        let renderTimeout: NodeJS.Timeout
        map.on('render', () => {
          if (!map.loaded()) return
          if (!map.isStyleLoaded()) return
          
          clearTimeout(renderTimeout)
          renderTimeout = setTimeout(() => {
            if (!map.areTilesLoaded()) {
              map.once('idle', () => {
                map.triggerRepaint()
              })
            }
          }, 100)
        })

        // Gestione semplice degli errori della mappa
        map.on('error', (e) => {
          console.error('Errore Mapbox:', e)
        })

        // Attendi che la mappa sia caricata prima di aggiungere controlli
        map.on('load', () => {
          console.log("✅ Mappa caricata e assegnata a `mapInstance.current`:", mapInstance.current);
          setLoading(false)
          
          // Configura il rendering
          map.triggerRepaint()
          
          // Aggiungi opzioni per le immagini satellitari ad alta risoluzione
          try {
            // Migliora la qualità delle immagini satellitari
            map.setPaintProperty('satellite', 'raster-resampling', 'linear');
            map.setPaintProperty('satellite', 'raster-fade-duration', 0);
            map.setPaintProperty('satellite', 'raster-saturation', 0.05);
            map.setPaintProperty('satellite', 'raster-contrast', 0.1);
            
            // Se disponibile, forza il caricamento di immagini in alta risoluzione
            if (map.getLayer('satellite')) {
              const source = map.getSource('satellite') as mapboxgl.RasterTileSource;
              if (source && source.setTiles) {
                // Imposta direttamente i tiles ad alta risoluzione usando il protocollo Mapbox standard
                // Le URL specifiche possono variare in base alla configurazione di Mapbox
                source.setTiles([
                  'https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.webp?access_token=' + token
                ]);
              }
            }
          } catch (err) {
            console.warn('Impossibile applicare modifiche alle immagini satellitari:', err);
          }
          
          // Configura lo zoom con la rotella
          map.scrollZoom.setWheelZoomRate(1/200)    
          map.scrollZoom.setZoomRate(1/200)         
          map.scrollZoom.enable()                   

          // Disabilita la rotazione della mappa
          map.dragRotate.disable()
          map.touchZoomRotate.disableRotation()

          // Inizializza MapboxDraw senza controlli visibili
          const draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
              polygon: false,
              trash: false
            },
            defaultMode: 'simple_select'
          })

          map.addControl(draw)
          drawInstance.current = draw

          // Aggiungi solo il geocoder
          const geocoder = new MapboxGeocoder({
            accessToken: token,
            mapboxgl: (mapboxgl as unknown) as typeof import('mapbox-gl'),
            placeholder: 'Cerca indirizzo...',
            language: 'it',
            countries: 'it',
            marker: false,
            zoom: 20, // Livello di zoom ottimale per alta risoluzione
            flyTo: {
              speed: 1.2, // Velocità di spostamento della mappa
              curve: 1, // Curva di accelerazione
              essential: true, // Animazione essenziale
              padding: 30 // Padding attorno alla destinazione
            }
          })

          map.addControl(geocoder, 'top')

          // Gestione eventi del geocoder
          geocoder.on('load', () => {
            const geocoderInput = document.querySelector('.mapboxgl-ctrl-geocoder--input')
            if (geocoderInput) {
              geocoderInput.setAttribute('id', 'address-search')
              geocoderInput.setAttribute('name', 'address-search')
            }
          })

          geocoder.on('result', (event: { result: Result }) => {
            const { result } = event
            if (result.center) {
              const [lng, lat] = result.center
              
              // Imposta zoom ottimale per alta risoluzione
              const targetZoom = 20;
              
              map.flyTo({
                center: [lng, lat] as [number, number],
                zoom: targetZoom,
                speed: 1.2,
                essential: true
              });
              
              // Dopo che la mappa ha finito di muoversi, forza un repaint per migliorare la qualità
              map.once('moveend', () => {
                setTimeout(() => {
                  map.triggerRepaint();
                }, 500);
              });
            }
          })
        })

        mapInstance.current = map
      } catch (err) {
        console.error('Errore inizializzazione mappa:', err)
        setError(err instanceof Error ? err.message : 'Errore sconosciuto')
        setLoading(false)
      }
    }

    initializeMap()

    return () => {
        if (mapInstance.current) {
            try {
                mapInstance.current.remove();
            } catch (error) {
                console.error("❌ ERRORE: impossibile rimuovere la mappa", error);
            }
            mapInstance.current = null;
        }
    }
  }, [])

  useEffect(() => {
    const map = mapInstance.current;
    if (!map || !map.loaded() || !currentLayout) return;

    try {
        // Rimuovi eventuali layer e source esistenti
        if (map.getLayer('panels-fill')) map.removeLayer('panels-fill');
        if (map.getLayer('panels-outline')) map.removeLayer('panels-outline');
        if (map.getSource('panels')) map.removeSource('panels');

        // Aggiungi i nuovi layer solo se ci sono pannelli
        map.addSource('panels', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: []
            }
        });

        map.addLayer({
            id: 'panels-fill',
            type: 'fill',
            source: 'panels',
            paint: {
                'fill-color': '#0096C7',
                'fill-opacity': 0.6
            }
        });

        map.addLayer({
            id: 'panels-outline',
            type: 'line',
            source: 'panels',
            paint: {
                'line-color': '#0096C7',
                'line-width': 1
            }
        });
    } catch (error) {
        console.error('❌ Errore nell\'aggiunta dei layer:', error);
    }
  }, [currentLayout]);

  // Aggiorna i pannelli sulla mappa quando cambia l'array panels
  useEffect(() => {
    const map = mapInstance.current
    if (!map) return

    // Rimuovi i layer esistenti
    panels.forEach(panel => {
      const layerId = `panel-${panel.id}`
      if (map.getLayer(layerId)) map.removeLayer(layerId)
      if (map.getSource(layerId)) map.removeSource(layerId)
    })

    // Aggiungi i nuovi layer
    panels.forEach(panel => {
      const layerId = `panel-${panel.id}`
      
      map.addSource(layerId, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: panel.coordinates
          },
          properties: {
            id: panel.id,
            power: panel.power,
            rotation: panel.rotation
          }
        }
      })

      map.addLayer({
        id: layerId,
        type: 'fill',
        source: layerId,
        paint: {
          'fill-color': '#0096C7',
          'fill-opacity': 0.6
        }
      })
    })
  }, [panels, selectedPanelId])

  useEffect(() => {
    // Aggiungi gli stili globali
    const styleElement = document.createElement('style')
    styleElement.textContent = baseStyles
    document.head.appendChild(styleElement)

    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Controlla immediatamente
    checkIfMobile();
    
    // Aggiungi event listener per il ridimensionamento
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

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

  const handlePanelSelect = useCallback((id: string) => {
    const selectedPanel = panels.find(p => p.id === id);
    if (selectedPanel) {
      onPanelSelect(selectedPanel);
      
      // Centra la mappa sul pannello selezionato
      if (mapInstance.current) {
        mapInstance.current.flyTo({
          center: selectedPanel.center,
          zoom: 19,
          duration: 1000
        });
      }
    }
  }, [panels, onPanelSelect]);

  const handleScreenshot = async (): Promise<string> => {
    if (!mapInstance.current) {
        console.error("❌ ERRORE: mapInstance.current è null o non definito!");
        throw new Error("Mappa non trovata");
    }

    const map = mapInstance.current;

    // 🔄 Aspetta che la mappa sia completamente caricata (max 7.5 secondi)
    let retries = 15;
    while ((!map.loaded() || !map.isStyleLoaded()) && retries > 0) {
        console.warn(`⚠️ La mappa non è ancora completamente caricata. Tentativo: ${15 - retries}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        retries--;
    }

    if (!map.loaded() || !map.isStyleLoaded()) {
        console.error("❌ ERRORE: La mappa non è ancora completamente pronta dopo 7.5 secondi.");
        throw new Error("Mappa non pronta dopo il timeout");
    }

    console.log("✅ La mappa è pronta, procedo con lo screenshot...");

    // ⏳ Aspetta 500ms per garantire che il rendering sia aggiornato
    await new Promise(resolve => setTimeout(resolve, 500));

    // ✅ Ottieni il canvas e il contesto WebGL
    const canvas = map.getCanvas();
    const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });

    if (!gl) {
        console.error("❌ ERRORE: WebGL non supportato!");
        throw new Error("WebGL non supportato");
    }

    const width = canvas.width;
    const height = canvas.height;
    const pixels = new Uint8Array(width * height * 4);

    // ✅ Leggi i pixel dal buffer WebGL
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

    // ✅ Crea un nuovo canvas per salvare l'immagine
    const imageCanvas = document.createElement("canvas");
    const ctx = imageCanvas.getContext("2d");
    if (!ctx) {
        console.error("❌ ERRORE: Canvas 2D non supportato!");
        throw new Error("Canvas 2D non supportato");
    }

    imageCanvas.width = width;
    imageCanvas.height = height;
    const imageData = ctx.createImageData(width, height);

    // ✅ Inverti i pixel (WebGL li salva capovolti)
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const srcIndex = ((height - y - 1) * width + x) * 4;
            const destIndex = (y * width + x) * 4;
            imageData.data[destIndex] = pixels[srcIndex];       // R
            imageData.data[destIndex + 1] = pixels[srcIndex + 1]; // G
            imageData.data[destIndex + 2] = pixels[srcIndex + 2]; // B
            imageData.data[destIndex + 3] = pixels[srcIndex + 3]; // A
        }
    }

    ctx.putImageData(imageData, 0, 0);
    const imgURL = imageCanvas.toDataURL("image/png");

    // ✅ Scarica automaticamente l'immagine
    const a = document.createElement("a");
    a.href = imgURL;
    a.download = "mapbox_screenshot.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    console.log("✅ Screenshot salvato con successo!");
    return imgURL;
  };

  // Funzione di utilità per verificare se ci sono features
  const hasActiveFeatures = (): boolean => {
    const draw = drawInstance.current;
    if (!draw) return false;
    const allFeatures = draw.getAll();
    return allFeatures?.features?.length > 0;
  };

  // Funzione per gestire l'aggiunta di un nuovo layout
  const handleAddLayout = () => {
    // Riabilita il disegno
    if (drawInstance.current) {
      drawInstance.current.changeMode('draw_polygon');
    }
  };

  // Funzione per gestire la selezione del tipo
  const handleTypeSelection = (type: 'panels' | 'batteries') => {
    setSelectedType(type);
  };

  // Funzioni per il LayoutManager
  const handleLayoutSelect = (index: number | null) => {
    setCurrentLayoutIndex(index)
    if (index !== null) {
      const layout = layouts[index]
      // Centra la mappa sul layout selezionato
      if (mapInstance.current && layout) {
        const bbox = turf.bbox(layout.polygon)
        mapInstance.current.fitBounds([
          [bbox[0], bbox[1]],
          [bbox[2], bbox[3]]
        ], { padding: 50 })
      }
    }
  }

  const handleLayoutDelete = (index: number) => {
    const map = mapInstance.current
    if (!map) return

    // Rimuovi i layer associati al layout
    const layout = layouts[index]
    if (layout) {
      const layerId = `layout-${index}`
      if (map.getLayer(layerId)) map.removeLayer(layerId)
      if (map.getSource(layerId)) map.removeSource(layerId)
    }

    // Rimuovi il layout dallo stato
    setLayouts(prev => prev.filter((_, i) => i !== index))
    if (currentLayoutIndex === index) {
      setCurrentLayoutIndex(null)
    }
  }

  // Aggiungi la funzione handleOrientationChange
  const handleOrientationChange = (index: number, orientation: number) => {
    setLayouts(prev => prev.map((l, i) => 
      i === index 
        ? {
            ...l,
            stats: {
              ...l.stats,
              orientation
            }
          }
        : l
    ));
  };

  // Funzione per aggiungere la freccia di orientamento
  const addOrientationArrow = useCallback((layout: LayoutData) => {
    const map = mapInstance.current;
    const draw = drawInstance.current;
    if (!map || !draw) return;

    // Rimuovi la freccia esistente se presente
    if (map.getLayer('orientation-arrow')) map.removeLayer('orientation-arrow');
    if (map.getSource('orientation-arrow')) map.removeSource('orientation-arrow');

    // Calcola la lunghezza del lato più lungo del poligono e il suo angolo
    const coordinates = layout.polygon.geometry.coordinates[0];
    let maxSideLength = 0;
    let maxSideStart: number[] = [];
    let maxSideEnd: number[] = [];
    
    for (let i = 0; i < coordinates.length - 1; i++) {
      const from = coordinates[i];
      const to = coordinates[i + 1];
      const distance = turf.distance(
        turf.point(from),
        turf.point(to),
        { units: 'kilometers' }
      );
      
      if (distance > maxSideLength) {
        maxSideLength = distance;
        maxSideStart = from;
        maxSideEnd = to;
      }
    }

    // Calcola il punto medio del lato più lungo
    const midPoint = [
      (maxSideStart[0] + maxSideEnd[0]) / 2,
      (maxSideStart[1] + maxSideEnd[1]) / 2
    ];

    // Calcola il centro del poligono
    const center = turf.center(layout.polygon);
    const centerCoords = center.geometry.coordinates;

    // Calcola il punto di partenza a metà strada tra il centro e il punto medio del lato più lungo
    const startPoint = [
      (centerCoords[0] + midPoint[0]) / 2,
      (centerCoords[1] + midPoint[1]) / 2
    ];

    // Calcola l'angolo del lato più lungo
    const maxSideAngle = turf.bearing(
      turf.point(maxSideStart),
      turf.point(maxSideEnd)
    );
    
    // Calcola l'angolo perpendicolare (90 gradi in più)
    let perpendicularAngle = (maxSideAngle + 90) % 360;
    
    // Crea un punto di test nella direzione perpendicolare
    const testDistance = maxSideLength / 4;
    const testPoint = turf.destination(turf.point(startPoint), testDistance, perpendicularAngle, { units: 'kilometers' });
    
    // Verifica se il punto di test è all'interno del poligono
    const isInside = turf.booleanPointInPolygon(testPoint, layout.polygon);
    
    // Se il punto è all'interno, ruota l'angolo di 180 gradi
    if (isInside) {
      perpendicularAngle = (perpendicularAngle + 180) % 360;
    }
    
    // Usa la lunghezza del lato più lungo per la freccia
    const arrowLength = maxSideLength;  // Rimosso il /2 per usare l'intera lunghezza
    const endPoint = turf.destination(
      turf.point(startPoint),
      arrowLength,
      perpendicularAngle,
      { units: 'kilometers' }
    );

    // Crea una feature LineString per la freccia
    const arrowFeature: Feature<LineString> = {
      type: 'Feature',
      properties: {
        id: 'orientation-arrow',
        startPoint: startPoint,
        dragMode: 'drag_anywhere'  // Nuova proprietà per identificare il modo di drag
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          startPoint,
          endPoint.geometry.coordinates
        ]
      }
    };

    // Aggiungi la freccia come feature di Draw
    const featureIds = draw.add(arrowFeature);
    
    // Imposta la modalità di modifica diretta
    if (featureIds.length > 0) {
      draw.changeMode('direct_select', { featureId: featureIds[0] });

      // Aggiorna l'orientamento nel layout con il valore iniziale calcolato
      if (currentLayoutIndex !== null) {
        const normalizedBearing = (perpendicularAngle + 360) % 360;
        setLayouts(prev => {
          const newLayouts = [...prev];
          if (newLayouts[currentLayoutIndex] && !newLayouts[currentLayoutIndex].stats.isConfirmed) {
            newLayouts[currentLayoutIndex] = {
              ...newLayouts[currentLayoutIndex],
              stats: {
                ...newLayouts[currentLayoutIndex].stats,
                orientation: normalizedBearing
              }
            };
          }
          return newLayouts;
        });
      }

      // Assicurati che il layer della freccia sia sopra gli altri
      const mapStyle = map.getStyle();
      if (mapStyle?.layers) {
        const drawLayers = ['gl-draw-line-static', 'gl-draw-line-active', 'gl-draw-line'];
        drawLayers.forEach(layerId => {
          if (map.getLayer(layerId)) {
            map.moveLayer(layerId);
          }
        });
      }
    }

    let isDragging = false;
    let lastValidCoords: number[][] | null = null;

    // Gestisci il drag della freccia
    const mouseMoveHandler = (e: mapboxgl.MapMouseEvent & { features?: any[] }) => {
      if (!isDragging || !lastValidCoords) return;
      
      const feature = draw.get(featureIds[0]);
      if (!feature || !feature.properties?.startPoint) return;

      const startPoint = feature.properties.startPoint as number[];
      const mousePoint = [e.lngLat.lng, e.lngLat.lat];
      
      // Calcola il nuovo bearing basato sulla posizione del mouse
      const bearing = turf.bearing(
        turf.point(startPoint),
        turf.point(mousePoint)
      );
      
      // Crea il nuovo punto finale mantenendo la lunghezza originale
      const newEndPoint = turf.destination(
        turf.point(startPoint),
        arrowLength,
        bearing,
        { units: 'kilometers' }
      );

      // Aggiorna la feature con le nuove coordinate
      if (feature.geometry.type === 'LineString') {
        feature.geometry.coordinates = [startPoint, newEndPoint.geometry.coordinates];
        draw.add(feature);
      }

      // Aggiorna l'orientamento nel layout
      if (currentLayoutIndex !== null) {
        const normalizedBearing = (bearing + 360) % 360;
        setLayouts(prev => {
          const newLayouts = [...prev];
          if (newLayouts[currentLayoutIndex] && !newLayouts[currentLayoutIndex].stats.isConfirmed) {
            newLayouts[currentLayoutIndex] = {
              ...newLayouts[currentLayoutIndex],
              stats: {
                ...newLayouts[currentLayoutIndex].stats,
                orientation: normalizedBearing
              }
            };
          }
          return newLayouts;
        });
      }
    };

    // Gestisci l'inizio del drag
    const mouseDownHandler = (e: mapboxgl.MapMouseEvent & { features?: any[] }) => {
      const features = draw.getFeatureIdsAt(e.point);
      if (features.includes(featureIds[0])) {
        const feature = draw.get(featureIds[0]);
        if (feature && feature.geometry.type === 'LineString') {
          isDragging = true;
          lastValidCoords = feature.geometry.coordinates;
          map.getCanvas().style.cursor = 'grab';
        }
      }
    };

    // Gestisci la fine del drag
    const mouseUpHandler = () => {
      isDragging = false;
      lastValidCoords = null;
      map.getCanvas().style.cursor = '';
    };

    // Aggiungi gli event listener
    map.on('mousemove', mouseMoveHandler);
    map.on('mousedown', mouseDownHandler);
    map.on('mouseup', mouseUpHandler);

    // Aggiungi un listener per l'aggiornamento dell'orientamento quando la freccia viene modificata
    const updateHandler = (e: { features: Feature<LineString>[] }) => {
      const features = e.features;
      if (features && features[0] && features[0].properties?.id === 'orientation-arrow') {
        const coords = features[0].geometry.coordinates;
        if (coords && coords.length >= 2) {
          // Ripristina il punto di partenza originale
          const originalStart = features[0].properties?.startPoint;
          if (originalStart) {
            coords[0] = originalStart;
            features[0].geometry.coordinates = [originalStart, coords[coords.length - 1]];
          }

          const bearing = turf.bearing(
            turf.point(coords[0]),
            turf.point(coords[coords.length - 1])
          );
          
          if (currentLayoutIndex !== null) {
            const normalizedBearing = (bearing + 360) % 360;
            setLayouts(prev => {
              const newLayouts = [...prev];
              if (newLayouts[currentLayoutIndex] && !newLayouts[currentLayoutIndex].stats.isConfirmed) {
                newLayouts[currentLayoutIndex] = {
                  ...newLayouts[currentLayoutIndex],
                  stats: {
                    ...newLayouts[currentLayoutIndex].stats,
                    orientation: normalizedBearing
                  }
                };
              }
              return newLayouts;
            });

            // Aggiorna la feature mantenendo solo i punti di inizio e fine
            draw.setFeatureProperty(features[0].id as string, 'startPoint', originalStart);
            features[0].geometry.coordinates = [originalStart, coords[coords.length - 1]];
            draw.add(features[0]);
          }
        }
      }
    };

    map.on('draw.update', updateHandler);

    return () => {
      map.off('mousemove', mouseMoveHandler);
      map.off('mousedown', mouseDownHandler);
      map.off('mouseup', mouseUpHandler);
      map.off('draw.update', updateHandler);
    };
  }, [currentLayoutIndex]);

  // Funzione per rimuovere la freccia di orientamento
  const removeOrientationArrow = useCallback(() => {
    const map = mapInstance.current;
    if (!map) return;

    if (map.getLayer('orientation-arrow')) map.removeLayer('orientation-arrow');
    if (map.getSource('orientation-arrow')) map.removeSource('orientation-arrow');
    setOrientationArrowSource(null);
  }, []);

  // Gestisci la conferma del layout
  const handleLayoutConfirm = (index: number) => {
    if (!layouts[index]) {
        console.warn(`⚠️ Layout con indice ${index} non trovato.`);
        return;
    }

    setLayouts(prev => prev.map((l, i) => 
        i === index 
            ? {
                ...l,
                layoutConfirmed: true,
                stats: {
                    ...l.stats,
                    isConfirmed: false
                }
            }
            : l
    ));
    
    // Mostra la freccia di orientamento e il messaggio
    const layout = layouts[index];
    if (layout) {
        addOrientationArrow(layout);
        setShowArrowPopup(true);
        setTimeout(() => {
            setShowArrowPopup(false);
        }, 4000);
    }

    // Rimuovi tutte le altre feature di disegno tranne la freccia
    const draw = drawInstance.current;
    if (draw) {
        const features = draw.getAll();
        features.features.forEach(feature => {
            if (feature.properties?.id !== 'orientation-arrow') {
                draw.delete(feature.id as string);
            }
        });
    }
  };

  // Gestisci la conferma dell'orientamento
  const handleOrientationConfirm = (index: number) => {
    // Imposta isConfirmed = true
    setLayouts(prev => prev.map((l, i) => 
      i === index 
        ? {
            ...l,
            stats: {
              ...l.stats,
              isConfirmed: true
            }
          }
        : l
    ));

    // Rimuovi la freccia quando l'orientamento viene confermato
    const draw = drawInstance.current;
    if (draw) {
      const features = draw.getAll();
      features.features.forEach(feature => {
        if (feature.properties?.id === 'orientation-arrow') {
          draw.delete(feature.id as string);
        }
      });
    }
    removeOrientationArrow();

    // Se è il terzo layout (index === 2), conferma automaticamente il progetto
    if (index === 2) {
      handleProjectConfirm();
    }
  };

  // Gestisci la conferma del progetto
  const handleProjectConfirm = () => {
    // Disabilita tutte le interazioni con la mappa
    const draw = drawInstance.current;
    if (draw) {
      draw.deleteAll();
      draw.changeMode('simple_select');
    }
    setShowTypeSelection(true);
    // setIsProjectConfirmed(true);
  };

  // Gestisci la selezione del tipo di sistema
  const handleSystemTypeSelect = (type: 'panels' | 'batteries') => {
    setSelectedType(type);
    if (type === 'batteries') {
      // Mostra il selettore delle batterie
      setShowBatterySelector(true);
      setIsSoloPannelli(false);
      
      // Assicurati che il pannello sia già selezionato
      if (!selectedPannello && pannelliFotovoltaici.length > 0) {
        const defaultPannello = pannelliFotovoltaici[0];
        onPannelloSelect(defaultPannello);
      }
      
      // Forza l'apertura della sidebar su mobile
      if (window.innerWidth <= 768) {
        // Trova il riferimento alla sidebar e la apre
        const sidebarToggle = document.querySelector('[data-sidebar-toggle]');
        if (sidebarToggle && sidebarToggle instanceof HTMLElement) {
          sidebarToggle.click();
        }
      }
    } else {
      // Solo pannelli
      setShowBatterySelector(false);
      setSelectedBatteria(null);
      setIsSoloPannelli(true);
      setIsProjectConfirmed(true);
    }
  };

  // Aggiungi la funzione per gestire l'aggiornamento dello storage
  const handleStorageUpdate = (storage: number) => {
    setTotalStorage(storage)
    console.log('Storage totale aggiornato:', storage)
  }

  useImperativeHandle(ref, () => ({
    panelRotate: onPanelRotate,
    captureImage: handleScreenshot
  }))

  // Funzione per calcolare l'inclinazione del tetto usando i dati di elevazione
  const calculateRoofSlope = async (polygon: Feature<Polygon>): Promise<number> => {
    const map = mapInstance.current;
    if (!map) return 0;

    try {
      // Estrai le coordinate del poligono
      const coordinates = polygon.geometry.coordinates[0]; // Usa il primo anello del poligono
      if (coordinates.length < 4) return 0; // Deve essere almeno un quadrilatero

      // Trova i due punti più distanti per calcolare l'inclinazione
      let maxDistance = 0;
      let point1Index = 0;
      let point2Index = 0;

      // Trova i due punti più distanti nel poligono
      for (let i = 0; i < coordinates.length - 1; i++) {
        for (let j = i + 1; j < coordinates.length - 1; j++) {
          const p1 = coordinates[i];
          const p2 = coordinates[j];
          const distance = turf.distance(
            turf.point([p1[0], p1[1]]),
            turf.point([p2[0], p2[1]]),
            { units: 'meters' }
          );
          
          if (distance > maxDistance) {
            maxDistance = distance;
            point1Index = i;
            point2Index = j;
          }
        }
      }

      // Usa i punti identificati per calcolare la differenza di elevazione
      const point1 = coordinates[point1Index];
      const point2 = coordinates[point2Index];
      
      // Ottieni le elevazioni dei due punti usando l'API Mapbox
      const elevation1 = map.queryTerrainElevation([point1[0], point1[1]]) || 0;
      const elevation2 = map.queryTerrainElevation([point2[0], point2[1]]) || 0;
      
      // Calcola la differenza di elevazione (in metri)
      const elevationDiff = Math.abs(elevation1 - elevation2);
      
      // Calcola l'inclinazione in gradi usando la formula arctan(Δz/Δx)
      // Dove Δz è la differenza di elevazione e Δx è la distanza orizzontale
      const slopeRadians = Math.atan(elevationDiff / maxDistance);
      const slopeDegrees = slopeRadians * (180 / Math.PI);
      
      console.log('Calcolo inclinazione tetto:', {
        punto1: point1,
        punto2: point2,
        elevazione1: elevation1, 
        elevazione2: elevation2,
        differenzaElevazione: elevationDiff,
        distanzaOrizzontale: maxDistance,
        inclinazioneGradi: slopeDegrees
      });
      
      // Controlla i valori anomali - le inclinazioni dei tetti residenziali sono tipicamente comprese tra 15° e 45°
      if (slopeDegrees < 0.5) {
        console.log('Inclinazione calcolata troppo bassa, probabilmente un tetto piatto');
        return 0; // Considera come tetto piatto
      } else if (slopeDegrees > 60) {
        console.log('Inclinazione calcolata troppo alta, limitata a 45°');
        return 45; // Limita ai valori realistici
      }
      
      // Arrotonda al numero intero più vicino
      return Math.round(slopeDegrees);
    } catch (error) {
      console.error('Errore nel calcolo dell\'inclinazione del tetto:', error);
      return 0; // Restituisce zero in caso di errore
    }
  };

  return (
    <div className={styles.configContainer}>
      {showHelpPopup && (
        <div className="help-popup" style={{
          maxWidth: '280px',
          fontSize: '14px',
          padding: '12px 20px'
        }}>
          Clicca sui vertici per modificare l'area di layout
        </div>
      )}
      {showArrowPopup && (
        <div className="help-popup" style={{ 
          top: '60%',
          maxWidth: '280px',
          fontSize: '14px',
          padding: '12px 20px'
        }}>
          RUOTA LA FRECCIA NELLA DIREZIONE IN CUI È ORIENTATA LA FALDA
        </div>
      )}
      
      <ConfigSidebar
        selectedPannello={selectedPannello}
        onPannelloSelectAction={(pannello) => {
          onPannelloSelect(pannello)
          if (pannello && drawInstance.current) {
            drawInstance.current.deleteAll()
            drawInstance.current.changeMode('draw_polygon')
          }
        }}
        selectedBatteria={selectedBatteria}
        onBatteriaSelectAction={setSelectedBatteria}
        currentLayout={currentLayout}
        onCalculateLayoutAction={calculatePanelLayoutForPolygon}
        showBatterySelector={showBatterySelector}
        onStorageUpdate={handleStorageUpdate}
        onBatteryConfirm={() => {
          setShowBatterySelector(false)
        }}
      />

      <div className={styles.mapContainer}>
        {!webGLSupported ? (
          <div className={styles.error}>
            Il tuo browser non supporta WebGL. Per favore, usa un browser compatibile.
          </div>
        ) : (
          <div ref={mapContainer} className={styles.mapboxContainer}>
          </div>
        )}
      </div>

      {measurements && (
        <div className={styles.measurementsInfo}>
          <div className={styles.measurementItem}>
            <span>Area:</span> {measurements.area} m²
          </div>
          <div className={styles.measurementItem}>
            <span>Perimetro:</span> {measurements.perimeter} m
          </div>
          <div className={styles.measurementItem}>
            <span>Lati:</span>
            <ul>
              {measurements.sideLengths.map((length, index) => (
                <li key={index}>Lato {index + 1}: {length} m</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/* Bottone di conferma configurazione - Visibile solo su mobile dopo la conferma dello storage e prima della conferma del progetto, e solo se NON è in modalità "solo pannelli" */}
      {isMobile && selectedPannello && currentLayout && currentStats && totalStorage > 0 && !isProjectConfirmed && !isSoloPannelli && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          textAlign: 'center'
        }}>
          <button 
            className={layoutStyles.confirmButton}
            onClick={() => {
              // Chiama la funzione handleBatteryConfirm del LayoutManager
              if (layoutManagerRef.current) {
                layoutManagerRef.current.handleBatteryConfirm();
                // Imposta isProjectConfirmed a true per far sparire il bottone
                setIsProjectConfirmed(true);
              }
            }}
          >
            Conferma Configurazione
          </button>
        </div>
      )}
      
      {/* Bottone Scarica PDF - Visibile solo su mobile dopo la conferma del progetto o in modalità "solo pannelli" */}
      {isMobile && ((isProjectConfirmed && selectedPannello && currentLayout && currentStats && totalStorage > 0) || isSoloPannelli) && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          textAlign: 'center'
        }}>
          <button 
            className={layoutStyles.downloadButton}
            onClick={() => {
              // Chiama la funzione handleGeneratePDF del LayoutManager
              if (layoutManagerRef.current) {
                layoutManagerRef.current.handleGeneratePDF();
              }
            }}
          >
            <FaFileDownload /> Scarica PDF
          </button>
        </div>
      )}
      
      <LayoutManager
        ref={layoutManagerRef}
        layouts={layouts}
        setLayouts={setLayouts}
        onLayoutSelect={handleLayoutSelect}
        onLayoutConfirm={handleLayoutConfirm}
        onOrientationChange={handleOrientationChange}
        onOrientationConfirm={handleOrientationConfirm}
        onProjectConfirm={handleProjectConfirm}
        onStartDrawing={handleAddLayout}
        currentLayoutIndex={currentLayoutIndex}
        setCurrentLayoutIndex={setCurrentLayoutIndex}
        onSystemTypeSelect={handleSystemTypeSelect}
        drawInstance={drawInstance}
        mapInstance={mapInstance}
        removeOrientationArrow={removeOrientationArrow}
        totalStorage={totalStorage}
        currentAddress={currentAddress}
        calculateRoofSlope={calculateRoofSlope}
        isSoloPannelli={isSoloPannelli}
      />
    </div>
  )
})

ConfigMap.displayName = 'ConfigMap'

export default ConfigMap