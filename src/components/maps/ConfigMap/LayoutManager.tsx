import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import type { Feature, Polygon } from 'geojson';
import styles from './LayoutManager.module.css';
import { FaBatteryThreeQuarters, FaFileDownload, FaChevronDown, FaChevronUp, FaCheck, FaPlus, FaSolarPanel } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import UserDataForm from './UserDataForm';
import pannelliFotovoltaici, { type PannelloFotovoltaico } from '@/data/pannelliFotovoltaici';
import batterieFotovoltaiche, { type BatteriaFotovoltaica } from '@/data/batterieFotovoltaiche';
import { getSelectedPannello, getSelectedBatteria, clearCache } from '@/utils/componentCache';
import { useCacheCleanup } from '@/hooks/useCacheCleanup';
import { calcolaOttimizzatoriNecessari } from '@/data/ottimizzatori';

interface LayoutData {
  polygon: Feature<Polygon>;
  stats: {
    totalPanels: number;
    totalPower: number;
    totalArea: number;
    orientation: number;
    isConfirmed: boolean;
    yearlyProduction?: number;
  };
  layoutConfirmed: boolean;
}

interface LayoutManagerProps {
  layouts: LayoutData[];
  setLayouts: (layouts: LayoutData[] | ((prev: LayoutData[]) => LayoutData[])) => void;
  onLayoutSelect: (index: number | null) => void;
  onLayoutConfirm: (index: number) => void;
  onOrientationChange: (index: number, orientation: number, isAutoDetected?: boolean) => void;
  onOrientationConfirm: (index: number) => void;
  onProjectConfirm: () => void;
  onStartDrawing: () => void;
  currentLayoutIndex: number | null;
  setCurrentLayoutIndex: (index: number | null) => void;
  onSystemTypeSelect: (type: 'panels' | 'batteries') => void;
  drawInstance?: { current: any } | null;
  mapInstance?: { current: mapboxgl.Map | null };
  removeOrientationArrow: () => void;
  totalStorage: number;
  currentAddress: string;
  calculateRoofSlope?: (polygon: Feature<Polygon>) => Promise<number>;
  isSoloPannelli?: boolean;
}

interface LayoutManagerRef {
  handleBatteryConfirm: () => void;
  handleGeneratePDF: () => void;
}

interface LayoutManagerState {
  showTypeSelection: boolean;
  isProjectConfirmed: boolean;
  isBatteryMode: boolean;
  isExpanded: boolean;
  isMobile: boolean;
  showUserDataForm: boolean;
  userData: {
    name: string;
    surname: string;
    phone: string;
  } | null;
  pendingPdfGeneration: boolean;
}

const LayoutManager = forwardRef<LayoutManagerRef, LayoutManagerProps>(({
  layouts,
  setLayouts,
  onLayoutSelect,
  onLayoutConfirm,
  onOrientationChange,
  onOrientationConfirm,
  onProjectConfirm,
  onStartDrawing,
  currentLayoutIndex,
  setCurrentLayoutIndex,
  onSystemTypeSelect,
  drawInstance,
  mapInstance,
  removeOrientationArrow,
  totalStorage,
  currentAddress,
  calculateRoofSlope,
  isSoloPannelli
}: LayoutManagerProps, ref) => {
  const [showTypeSelection, setShowTypeSelection] = useState(false);
  const [isProjectConfirmed, setIsProjectConfirmed] = useState(false);
  const [isBatteryMode, setIsBatteryMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showUserDataForm, setShowUserDataForm] = useState(false);
  const [userData, setUserData] = useState<LayoutManagerState['userData']>(null);
  const [pendingPdfGeneration, setPendingPdfGeneration] = useState(false);

  // Usa il hook per la pulizia automatica della cache
  useCacheCleanup();

  // Rileva se il dispositivo è mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Controlla all'inizio
    checkIfMobile();
    
    // Aggiungi event listener per il resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Pulisci la cache quando il componente viene smontato
  useEffect(() => {
    return () => {
      clearCache();
    };
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Funzione di utilità per calcolare la produzione annua
  const calculateYearlyProduction = (powerKWp: number, orientation: number): number => {
    // Normalizza l'orientamento tra 0 e 360 gradi
    const normalizedOrientation = (orientation + 360) % 360;
    
    // Produzione massima a Sud (180°)
    const maxProduction = 1200; // kWh/anno per kWp
    
    // Calcola la percentuale di efficienza in base all'orientamento
    let efficiency: number;
    
    if (normalizedOrientation === 180) {
      // Sud: 100%
      efficiency = 1;
    } else if (normalizedOrientation === 0 || normalizedOrientation === 360) {
      // Nord: 40%
      efficiency = 0.4;
    } else if (normalizedOrientation === 90 || normalizedOrientation === 270) {
      // Est/Ovest: 70%
      efficiency = 0.7;
    } else if (normalizedOrientation > 0 && normalizedOrientation < 90) {
      // Nord-Est: interpolazione tra Nord (40%) e Est (70%)
      efficiency = 0.4 + (0.3 * (normalizedOrientation / 90));
    } else if (normalizedOrientation > 90 && normalizedOrientation < 180) {
      // Sud-Est: interpolazione tra Est (70%) e Sud (100%)
      efficiency = 0.7 + (0.3 * ((normalizedOrientation - 90) / 90));
    } else if (normalizedOrientation > 180 && normalizedOrientation < 270) {
      // Sud-Ovest: interpolazione tra Sud (100%) e Ovest (70%)
      efficiency = 1 - (0.3 * ((normalizedOrientation - 180) / 90));
    } else {
      // Nord-Ovest: interpolazione tra Ovest (70%) e Nord (40%)
      efficiency = 0.7 - (0.3 * ((normalizedOrientation - 270) / 90));
    }

    return powerKWp * maxProduction * efficiency;
  };

  // Array fisso di 3 slot per i layout
  const fixedSlots = Array(3).fill(null);
  
  // Statistiche totali dai layout confermati
  const totalStats = layouts
    .filter(l => l.stats.isConfirmed)
    .reduce((acc, layout) => ({
      totalPanels: acc.totalPanels + layout.stats.totalPanels,
      totalPower: acc.totalPower + layout.stats.totalPower,
      totalArea: acc.totalArea + layout.stats.totalArea,
      totalYearlyProduction: acc.totalYearlyProduction + calculateYearlyProduction(
        layout.stats.totalPower / 1000,
        layout.stats.orientation
      )
    }), {
      totalPanels: 0,
      totalPower: 0,
      totalArea: 0,
      totalYearlyProduction: 0
    });

  // Gestisci la conferma dell'orientamento
  const handleOrientationConfirm = (index: number) => {
    // Imposta isConfirmed = true
    setLayouts((prev: LayoutData[]) => prev.map((l, i) => 
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
    const draw = drawInstance?.current;
    if (draw) {
      const features = draw.getAll();
      features.features.forEach((feature: any) => {
        if (feature.properties?.id === 'orientation-arrow') {
          draw.delete(feature.id as string);
        }
      });
    }
    removeOrientationArrow();

    // Resetta lo stato per permettere l'aggiunta di un nuovo layout
    setCurrentLayoutIndex(null);
  };

  // Gestisci la conferma del progetto
  const handleProjectConfirm = () => {
    setShowTypeSelection(true);
    onProjectConfirm();
    onLayoutSelect(null);
    
    const draw = drawInstance?.current;
    if (draw) {
      draw.deleteAll();
      draw.changeMode('simple_select');
    }
  };

  // Gestisci la selezione del tipo di sistema
  const handleSystemTypeSelect = (type: 'panels' | 'batteries') => {
    if (type === 'batteries') {
      setIsBatteryMode(true);
      // Notifica il componente padre della selezione del tipo di sistema
      onSystemTypeSelect?.(type);
    } else {
      // Solo pannelli
      setIsProjectConfirmed(true);
      // Notifica il componente padre della selezione del tipo di sistema
      onSystemTypeSelect?.(type);
    }
    setShowTypeSelection(false);
  };

  // Aggiungi una funzione per confermare il progetto con batterie
  const handleBatteryConfirm = () => {
    setIsProjectConfirmed(true);
  };

  const getStatsForDownload = () => {
    if (layouts.length === 0) return null;

    const totalStats = layouts.reduce((acc, layout) => {
      if (layout.stats.isConfirmed) {
        return {
          totalPanels: acc.totalPanels + layout.stats.totalPanels,
          totalPower: acc.totalPower + layout.stats.totalPower,
          totalArea: acc.totalArea + layout.stats.totalArea,
          orientation: layout.stats.orientation,
          yearlyProduction: (acc.yearlyProduction || 0) + (layout.stats.yearlyProduction || 0)
        };
      }
      return acc;
    }, {
      totalPanels: 0,
      totalPower: 0,
      totalArea: 0,
      orientation: 0,
      yearlyProduction: 0
    });

    return totalStats;
  };

  const getCurrentLayoutStats = () => {
    if (currentLayoutIndex !== null && layouts[currentLayoutIndex]) {
      const currentLayout = layouts[currentLayoutIndex];
      return {
        totalPanels: currentLayout.stats.totalPanels,
        totalPower: currentLayout.stats.totalPower,
        totalArea: currentLayout.stats.totalArea,
        orientation: currentLayout.stats.orientation,
        yearlyProduction: currentLayout.stats.yearlyProduction
      };
    }
    return null;
  };

  const handleScreenshot = async (): Promise<string> => {
    if (!mapInstance?.current) {
        console.error("❌ ERRORE: Istanza della mappa non trovata");
        throw new Error("Mappa non trovata");
    }
    
    const map = mapInstance.current;
    
    try {
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

        // ⏳ Aspetta 500ms per garantire che il rendering sia aggiornato
        await new Promise(resolve => setTimeout(resolve, 500));

        // ✅ Ottieni il canvas e verifica il supporto WebGL
        const canvas = map.getCanvas();
        
        // Prova prima con webgl2, poi con webgl
        let gl: WebGLRenderingContext | WebGL2RenderingContext | null = 
            (canvas.getContext("webgl2", { preserveDrawingBuffer: true }) as WebGL2RenderingContext) || 
            (canvas.getContext("webgl", { preserveDrawingBuffer: true }) as WebGLRenderingContext) || 
            (canvas.getContext("experimental-webgl", { preserveDrawingBuffer: true }) as WebGLRenderingContext);

        if (!gl) {
            console.warn("⚠️ WebGL non supportato, provo con il canvas 2D");
            // Fallback a canvas 2D
            const ctx = canvas.getContext("2d");
            if (!ctx) {
                throw new Error("Nessun contesto grafico supportato");
            }
            
            // Ottieni direttamente i dati dell'immagine dal canvas 2D
            const imgURL = canvas.toDataURL("image/png");
            
            // Scarica l'immagine
            const a = document.createElement("a");
            a.href = imgURL;
            a.download = "configurazione_impianto.png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            console.log("✅ Screenshot salvato con successo (usando canvas 2D)!");
            return imgURL;
        }

        // Se siamo qui, abbiamo un contesto WebGL
        const width = canvas.width;
        const height = canvas.height;
        const pixels = new Uint8Array(width * height * 4);

        // ✅ Leggi i pixel dal buffer WebGL
        gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

        // ✅ Crea un nuovo canvas per salvare l'immagine
        const imageCanvas = document.createElement("canvas");
        const ctx = imageCanvas.getContext("2d");
        if (!ctx) {
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
        a.download = "configurazione_impianto.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        console.log("✅ Screenshot salvato con successo!");
        return imgURL;
    } catch (error) {
        console.error("❌ Errore durante la cattura dell'immagine:", error);
        throw error;
    }
  };

  const generatePDF = async () => {
    try {
      // Ottieni i pannelli e le batterie selezionate
      const selectedPannello = getSelectedPannello();
      const selectedBatteria = getSelectedBatteria();

      // Cattura lo screenshot
      const screenshotUrl = await handleScreenshot();
      
      // Crea un nuovo documento PDF
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Funzione per controllare lo spazio e aggiungere una nuova pagina se necessario
      let currentY = 20; // Inizializza la variabile currentY
      function checkSpaceAndAddPage(minSpace: number) {
        const currentPage = doc.internal.getCurrentPageInfo().pageNumber;
        const pageHeight = doc.internal.pageSize.height;
        if (currentY + minSpace > pageHeight - 20) {
          doc.addPage();
          doc.setPage(currentPage + 1);
          currentY = 20;
        }
      }

      // Aggiungi intestazione
      doc.setFontSize(24);
      doc.setTextColor(0, 51, 153); // Blu scuro
      doc.text('Configurazione Impianto Fotovoltaico', 20, 20);

      // Aggiungi sottotitolo con indirizzo
      doc.setFontSize(14);
      doc.setTextColor(102, 102, 102); // Grigio
      doc.text(`Indirizzo: ${currentAddress || 'Non specificato'}`, 20, 30);

      // Aggiungi data generazione
      const today = new Date();
      const formattedDate = today.toLocaleDateString('it-IT');
      doc.setFontSize(12);
      doc.text(`Data configurazione: ${formattedDate}`, 20, 40);

      // Carica l'immagine dello screenshot
      const img = new Image();
      img.src = screenshotUrl;
      img.onload = () => {
          // Calcola le dimensioni dell'immagine mantenendo l'aspect ratio
          const pageWidth = 210; // Larghezza A4 in mm
          const maxWidth = pageWidth - 40; // Margini di 20mm su ogni lato
          const imgRatio = img.height / img.width;
          const imgWidth = maxWidth;
          const imgHeight = maxWidth * imgRatio;

          // Aggiungi l'immagine
          doc.addImage(img, 'PNG', 20, 55, imgWidth, imgHeight);

          // Aggiungi le statistiche
          const startY = 55 + imgHeight + 20;
          doc.setFontSize(18);
          doc.setTextColor(0, 51, 153); // Blu scuro
          doc.text('Statistiche Totali', 20, startY);

          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0); // Nero
          currentY = startY + 10;
          const lineHeight = 8;

          // Box per le statistiche
          doc.setDrawColor(0, 51, 153); // Blu scuro per il bordo
          doc.setFillColor(240, 240, 255); // Azzurro chiaro per lo sfondo
          doc.roundedRect(15, startY + 5, 180, 50, 3, 3, 'FD');

          // Aggiungi i dati delle statistiche con formattazione migliorata
          doc.text(`Pannelli Totali: ${totalStats.totalPanels} unità`, 20, currentY += lineHeight);
          doc.text(`Potenza Totale: ${(totalStats.totalPower / 1000).toFixed(2)} kWp`, 20, currentY += lineHeight);
          doc.text(`Area Totale: ${totalStats.totalArea.toFixed(2)} m²`, 20, currentY += lineHeight);
          doc.text(`Produzione Annua: ${new Intl.NumberFormat('it-IT').format(Math.round(totalStats.totalYearlyProduction))} kWh`, 20, currentY += lineHeight);

          // Aggiungi informazioni sullo storage se presente
          if (totalStorage && totalStorage > 0) {
              currentY += lineHeight;
              doc.text(`Capacità Storage: ${totalStorage.toFixed(2)} kWh`, 20, currentY);
          }

          // PAGINA 2: Caratteristiche Tecniche
          doc.addPage();

          // Titolo della seconda pagina
          doc.setFontSize(20);
          doc.setTextColor(0, 51, 153);
          doc.text('Caratteristiche Tecniche dei Componenti', 20, 20);

          // Sezione Pannelli
          currentY = 40;
          doc.setFontSize(16);
          doc.setTextColor(0, 51, 153);
          doc.text('Pannelli Fotovoltaici', 20, currentY);

          // Box per i pannelli
          doc.setDrawColor(0, 51, 153);
          doc.setFillColor(240, 240, 255);
          doc.roundedRect(15, currentY + 5, 180, 60, 3, 3, 'FD');

          // Dettagli pannelli
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          currentY += 15;
          if (selectedPannello) {
              doc.text(`Modello: ${selectedPannello.modello}`, 20, currentY += lineHeight);
              doc.text(`Brand: ${selectedPannello.brand}`, 20, currentY += lineHeight);
              doc.text(`Potenza: ${selectedPannello.power}`, 20, currentY += lineHeight);
              doc.text(`Dimensioni: ${selectedPannello.width}x${selectedPannello.height} mm`, 20, currentY += lineHeight);
              doc.text(`Efficienza: ${selectedPannello.efficienza}`, 20, currentY += lineHeight);
              doc.text(`Categoria: ${selectedPannello.categoria}`, 20, currentY += lineHeight);

              // Sezione Ottimizzatori
              checkSpaceAndAddPage(100); // Controlla se c'è abbastanza spazio per gli ottimizzatori
              currentY += 20;
              doc.setFontSize(16);
              doc.setTextColor(0, 51, 153);
              doc.text('Ottimizzatori', 20, currentY);

              // Box per gli ottimizzatori
              doc.setDrawColor(0, 51, 153);
              doc.setFillColor(240, 240, 255);
              doc.roundedRect(15, currentY + 5, 180, 60, 3, 3, 'FD');

              // Calcola gli ottimizzatori necessari
              const pannelliConAzimut = layouts
                  .filter(l => l.stats.isConfirmed)
                  .flatMap((layout, layoutIndex) => {
                      return Array(layout.stats.totalPanels).fill(null).map((_, panelIndex) => ({
                          id: layoutIndex * 1000 + panelIndex,
                          azimut: layout.stats.orientation
                      }));
                  });

              const configurazioneOttimizzatori = calcolaOttimizzatoriNecessari(
                  pannelliConAzimut,
                  selectedBatteria?.modello
              );
              
              // Dettagli ottimizzatori
              doc.setFontSize(12);
              doc.setTextColor(0, 0, 0);
              currentY += 15;
              doc.text(`Marca: ${configurazioneOttimizzatori.marca}`, 20, currentY += lineHeight);
              doc.text(`Numero totale: ${configurazioneOttimizzatori.numeroTotale}`, 20, currentY += lineHeight);
              doc.text(`Pannelli con ottimizzatore: ${configurazioneOttimizzatori.pannelliConOttimizzatore.length}`, 20, currentY += lineHeight);
              doc.text(`Pannelli senza ottimizzatore: ${configurazioneOttimizzatori.pannelliSenzaOttimizzatore.length}`, 20, currentY += lineHeight);
          } else {
              doc.text("Nessun pannello selezionato", 20, currentY += lineHeight);
          }

          // Sezione Batterie (se presenti)
          if (totalStorage && totalStorage > 0) {
              checkSpaceAndAddPage(100); // Controlla se c'è abbastanza spazio per il sistema di accumulo
              currentY += 40; // Aumentato da 20 a 40 per evitare sovrapposizioni
              doc.setFontSize(16);
              doc.setTextColor(0, 51, 153);
              doc.text('Sistema di Accumulo', 20, currentY);

              // Box per le batterie
              doc.setDrawColor(0, 51, 153);
              doc.setFillColor(240, 240, 255);
              doc.roundedRect(15, currentY + 5, 180, 60, 3, 3, 'FD');

              // Dettagli batterie
              doc.setFontSize(12);
              doc.setTextColor(0, 0, 0);
              currentY += 15;
              if (selectedBatteria) {
                  doc.text(`Modello: ${selectedBatteria.modello}`, 20, currentY += lineHeight);
                  doc.text(`Capacità: ${totalStorage.toFixed(2)}kWh`, 20, currentY += lineHeight);
                  doc.text(`Efficienza: ${selectedBatteria.efficienza}%`, 20, currentY += lineHeight);
                  doc.text(`Garanzia: ${selectedBatteria.garanzia}`, 20, currentY += lineHeight);
                  doc.text(`Qualità: ${selectedBatteria.qualita}`, 20, currentY += lineHeight);
              } else {
                  doc.text("Nessuna batteria selezionata", 20, currentY += lineHeight);
              }
          }

          // Footer con numero di pagina
          const pageCount = doc.internal.pages.length - 1;
          for (let i = 1; i <= pageCount; i++) {
              doc.setPage(i);
              doc.setFontSize(10);
              doc.setTextColor(128, 128, 128);
              doc.text(`Pagina ${i} di ${pageCount}`, doc.internal.pageSize.width / 2, 290, { align: 'center' });
          }

          // Salva il PDF
          doc.save('configurazione_impianto.pdf');
          console.log("✅ PDF generato con successo!");
          
          // Pulisci la cache dopo la generazione del PDF
          clearCache();
      };
    } catch (error) {
      console.error("❌ Errore durante la generazione del PDF:", error);
    }
  };

  // Funzione per inviare i dati via email
  const sendUserDataByEmail = async (userData: LayoutManagerState['userData'], totalStats: any) => {
    if (!userData) return;
    
    try {
      console.log("🔄 Invio dati via email...");
      
      // Prepara i dati da inviare
      const data = {
        name: userData.name,
        surname: userData.surname,
        phone: userData.phone,
        address: currentAddress,
        stats: {
          totalPanels: totalStats.totalPanels,
          totalPower: totalStats.totalPower,
          totalArea: totalStats.totalArea,
          annualProduction: totalStats.totalYearlyProduction,
          totalStorage: totalStorage
        }
      };
      
      // Invia i dati tramite API
      const response = await fetch('/api/configuratore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Errore nell'invio dell'email: ${errorData.error || 'Errore sconosciuto'}`);
      }
      
      console.log("✅ Email inviata con successo!");
    } catch (error) {
      console.error("❌ Errore durante l'invio dell'email:", error);
      alert("Si è verificato un errore durante l'invio dell'email. Riprova più tardi.");
    }
  };

  // Gestisci il cambio di orientamento
  const handleOrientationChange = (index: number, orientation: number, isAutoDetected: boolean = false) => {
    setLayouts((prev: LayoutData[]) => prev.map((l, i) => 
      i === index 
        ? { 
            ...l, 
            stats: { 
              ...l.stats, 
              orientation,
              yearlyProduction: calculateYearlyProduction(
                l.stats.totalPower / 1000,
                orientation
              ) 
            }
          }
        : l
    ));
    
    // Aggiungi la freccia di orientamento (solo se non è una rilevazione automatica)
    if (!isAutoDetected) {
      onOrientationChange(index, orientation);
    }
  };

  // Funzione per rilevare automaticamente l'inclinazione del tetto
  const detectRoofSlope = async (index: number) => {
    if (!calculateRoofSlope || currentLayoutIndex === null || !layouts[index]) {
      return;
    }

    try {
      // Mostra un'indicazione che il calcolo è in corso
      console.log('Calcolo automatico dell\'inclinazione in corso...');
      
      // Ottieni il poligono del layout corrente
      const polygon = layouts[index].polygon;
      
      // Calcola l'inclinazione utilizzando i dati di elevazione
      const slopeDegrees = await calculateRoofSlope(polygon);
      
      console.log(`Inclinazione calcolata: ${slopeDegrees}°`);
      
      // Aggiorna l'orientamento con il valore calcolato
      if (slopeDegrees >= 0) {
        handleOrientationChange(index, slopeDegrees, true);
        
        // Notifica all'utente che l'inclinazione è stata rilevata
        // Potremmo usare un toast o un altro metodo di notifica
        console.log(`✅ Inclinazione del tetto rilevata automaticamente: ${slopeDegrees}°`);
        return slopeDegrees;
      }
    } catch (error) {
      console.error('Errore nella rilevazione automatica dell\'inclinazione:', error);
    }
    
    return null;
  };

  // Gestisci la conferma del layout
  const handleLayoutConfirm = (index: number) => {
    // Imposta layoutConfirmed = true
    setLayouts((prev: LayoutData[]) => prev.map((l, i) => 
      i === index 
        ? { ...l, layoutConfirmed: true }
        : l
    ));
    
    // Seleziona il layout corrente per mostrare l'orientamento
    setCurrentLayoutIndex(index);
    
    onLayoutConfirm(index);
  };

  // Funzione per gestire la generazione del PDF
  const handleGeneratePDF = async () => {
    // Se non ci sono dati utente, mostra il form
    if (!userData) {
      if (!showUserDataForm) {
        setShowUserDataForm(true);
        setPendingPdfGeneration(true);
      }
      return;
    }

    // Generiamo il PDF
    try {
      await generatePDF();
    } catch (error) {
      console.error("Errore durante la generazione del PDF:", error);
    }
  };

  useImperativeHandle(ref, () => ({
    handleBatteryConfirm,
    handleGeneratePDF
  }));

  return (
    <>
      {/* Pulsante fluttuante per confermare il layout - SOLO SU MOBILE */}
      {isMobile && currentLayoutIndex !== null && layouts[currentLayoutIndex] && !layouts[currentLayoutIndex].layoutConfirmed && (
        <button 
          className={styles.floatingConfirmButton}
          onClick={() => handleLayoutConfirm(currentLayoutIndex)}
        >
          <FaCheck /> Conferma Layout
        </button>
      )}
      
      {/* Pulsante fluttuante per confermare l'orientamento - SOLO SU MOBILE */}
      {isMobile && currentLayoutIndex !== null && layouts[currentLayoutIndex] && layouts[currentLayoutIndex].layoutConfirmed && !layouts[currentLayoutIndex].stats.isConfirmed && (
        <button 
          className={styles.floatingConfirmButton}
          onClick={() => {
            onOrientationConfirm(currentLayoutIndex);
            onLayoutSelect(null);
          }}
        >
          <FaCheck /> Conferma Orientamento
        </button>
      )}
      
      {/* Pulsanti fluttuanti per confermare progetto o aggiungere layout - SOLO SU MOBILE */}
      {isMobile && !currentLayoutIndex && layouts.some(l => l.stats.isConfirmed) && !showTypeSelection && !isBatteryMode && getSelectedPannello() && !isProjectConfirmed && !isSoloPannelli && (
        <div className={styles.floatingActionButtons}>
          <button 
            className={`${styles.floatingConfirmButton} ${styles.confirmProjectButton}`}
            onClick={handleProjectConfirm}
          >
            <FaCheck /> Conferma Progetto
          </button>
          
          {layouts.length < 3 && (
            <button 
              className={`${styles.floatingConfirmButton} ${styles.addLayoutButton}`}
              onClick={() => {
                // Trova il prossimo indice disponibile
                const nextIndex = layouts.findIndex(l => !l) || layouts.length;
                if (nextIndex < 3) {
                  onLayoutSelect(nextIndex);
                  onStartDrawing();
                }
              }}
            >
              <FaPlus /> Aggiungi Layout
            </button>
          )}
        </div>
      )}
      
      {/* Pulsanti fluttuanti per selezionare il tipo di impianto - SOLO SU MOBILE */}
      {isMobile && (showTypeSelection || (layouts[2]?.stats.isConfirmed && !isBatteryMode && !isProjectConfirmed)) && (
        <div className={styles.floatingActionButtons}>
          <button 
            className={`${styles.floatingConfirmButton} ${styles.panelsOnlyButton}`}
            onClick={() => handleSystemTypeSelect('panels')}
          >
            <FaSolarPanel /> Solo Pannelli
          </button>
          
          <button 
            className={`${styles.floatingConfirmButton} ${styles.batterySystemButton}`}
            onClick={() => handleSystemTypeSelect('batteries')}
          >
            <FaBatteryThreeQuarters /> Impianto con Batterie
          </button>
        </div>
      )}
      
      <div className={`${styles.layoutManager} ${isMobile ? (isExpanded ? styles.expanded : styles.collapsed) : ''}`}>
        {isMobile && (
          <div className={styles.toggleBar} onClick={toggleExpand}>
            <div className={styles.toggleHandle}>
              {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={styles.toggleTitle}>
              {layouts.length > 0 
                ? `${layouts.length} layout${layouts.length !== 1 ? 's' : ''} - ${totalStats.totalPanels} pannelli`
                : 'Impostazioni Layout'}
            </div>
          </div>
        )}
        
        <div className={styles.layoutContent}>
          <h3 className={styles.layoutTitle}>Configurazione Layout</h3>
          {/* Selezione tipo impianto dopo conferma progetto o dopo conferma del terzo layout */}
          {(showTypeSelection || (layouts[2]?.stats.isConfirmed && !isBatteryMode && !isProjectConfirmed)) && (
            <div className={styles.systemTypeSelection}>
              <h3>Seleziona Tipo Impianto</h3>
              <div className={styles.systemTypeButtons}>
                <button
                  className={styles.systemTypeButton}
                  onClick={() => handleSystemTypeSelect('panels')}
                >
                  Solo Pannelli
                </button>
                <button
                  className={styles.systemTypeButton}
                  onClick={() => handleSystemTypeSelect('batteries')}
                >
                  Impianto con Batterie
                </button>
              </div>
            </div>
          )}

          {/* Statistiche Totali */}
          {layouts.some(l => l.stats.isConfirmed) && (
            <div className={styles.totalStats}>
              <h3>Statistiche Totali</h3>
              <div className={styles.statsContent}>
                <div className={styles.statsItem}>
                  <span>Pannelli Totali:</span> {totalStats.totalPanels}
                </div>
                <div className={styles.statsItem}>
                  <span>Potenza Totale:</span> {(totalStats.totalPower / 1000).toFixed(2)} kWp
                </div>
                <div className={styles.statsItem}>
                  <span>Area Totale:</span> {totalStats.totalArea.toFixed(2)} m²
                </div>
                <div className={styles.statsItem}>
                  <span>Produzione Annua:</span>
                  <span>
                    {new Intl.NumberFormat('it-IT').format(Math.round(totalStats.totalYearlyProduction))} kWh
                  </span>
                </div>
                {totalStorage && totalStorage > 0 && (
                  <div className={styles.storageItem}>
                    <FaBatteryThreeQuarters className={styles.storageIcon} />
                    <span>Capacità Storage:</span>
                    <span>{totalStorage.toFixed(2)} kWh</span>
                    {!isProjectConfirmed && (
                      <button
                        className={styles.confirmButton}
                        onClick={handleBatteryConfirm}
                      >
                        Conferma Configurazione
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Pulsante Download - mostrato solo dopo la conferma definitiva del progetto */}
          {isProjectConfirmed && (
            <div className={styles.downloadSection}>
              <button 
                onClick={() => handleGeneratePDF()}
                className={styles.downloadButton}
                disabled={!isProjectConfirmed}
              >
                <FaFileDownload /> Scarica PDF
              </button>
            </div>
          )}

          {/* Layout Slots */}
          <div className={styles.layoutSlots}>
            {fixedSlots.map((_, slotIndex) => {
              const layout = layouts[slotIndex];
              const previousLayout = slotIndex > 0 ? layouts[slotIndex - 1] : null;
              
              // Verifica se è stato selezionato un pannello
              const pannelloSelezionato = getSelectedPannello();

              // Mostra solo il primo slot finché non viene confermato l'orientamento
              if (slotIndex > 0 && !layouts[0]?.stats.isConfirmed) return null;

              // Non mostrare lo slot se il layout è confermato (isConfirmed è true)
              if (layout?.stats.isConfirmed) {
                return null;
              }

              return (
                <div
                  key={slotIndex}
                  className={`${styles.layoutSlot} ${
                    currentLayoutIndex === slotIndex ? styles.activeSlot : ''
                  } ${!layout ? styles.emptySlot : ''}`}
                >
                  {layout ? (
                    <div className={styles.statsWindow}>
                      <h3>Layout {slotIndex + 1}</h3>
                      <div className={styles.statsContent}>
                        <div className={styles.statsItem}>
                          <span>Pannelli:</span> {layout.stats.totalPanels}
                        </div>
                        <div className={styles.statsItem}>
                          <span>Potenza:</span> {(layout.stats.totalPower / 1000).toFixed(2)} kWp
                        </div>
                        <div className={styles.statsItem}>
                          <span>Area:</span> {layout.stats.totalArea.toFixed(2)} m²
                        </div>

                        {/* Mostra sempre l'orientamento se il layout è confermato */}
                        {layout.layoutConfirmed && (
                          <>
                            <div className={styles.statsItem}>
                              <span>Orientamento:</span>
                              {!layout.stats.isConfirmed ? (
                                <>
                                  <span>{layout.stats.orientation.toFixed(1)}°</span>
                                </>
                              ) : (
                                <span className={styles.fixedValue}>{layout.stats.orientation.toFixed(1)}°</span>
                              )}
                            </div>
                            {!layout.stats.isConfirmed && (
                              <div className={styles.orientationControl}>
                                <div className={styles.orientationButtons}>
                                  <button
                                    className={styles.orientationButton}
                                    onClick={() => {
                                      onOrientationConfirm(slotIndex);
                                      onLayoutSelect(null);
                                    }}
                                  >
                                    Conferma Orientamento
                                  </button>
                                </div>
                              </div>
                            )}
                            <div className={styles.statsItem}>
                              <span>kWh/anno generati:</span>
                              <span className={styles.productionValue}>
                                {calculateYearlyProduction(
                                  layout.stats.totalPower / 1000,
                                  layout.stats.orientation
                                ).toFixed(0)} kWh
                              </span>
                            </div>
                          </>
                        )}
                        
                        {/* Mostra il pulsante Conferma Layout solo se il layout non è stato confermato */}
                        {!layout.layoutConfirmed && (
                          <div className={styles.layoutActions}>
                            <button 
                              className={styles.confirmButton}
                              onClick={() => handleLayoutConfirm(slotIndex)}
                            >
                              Conferma Layout
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className={styles.emptySlotContent}>
                      <p>{currentLayoutIndex === slotIndex ? "DISEGNA AREA SULLA MAPPA" : "Slot disponibile per nuovo layout"}</p>
                      {/* Mostra i pulsanti solo se il layout precedente è confermato E non c'è un layout corrente in creazione E non è stato mostrato il selettore del tipo E è stato selezionato un pannello */}
                      {(previousLayout?.stats.isConfirmed || (slotIndex === 0 && layouts[2]?.stats.isConfirmed)) && 
                       !currentLayoutIndex && 
                       !showTypeSelection && 
                       !isBatteryMode && 
                       pannelloSelezionato &&
                       !isProjectConfirmed && (
                        <div className={styles.projectActions}>
                          <button 
                            className={styles.confirmProjectButton}
                            onClick={handleProjectConfirm}
                          >
                            Conferma Progetto
                          </button>
                          {slotIndex < 3 && (
                            <button 
                              className={styles.addLayoutButton}
                              onClick={() => {
                                onLayoutSelect(slotIndex);
                                onStartDrawing();
                              }}
                            >
                              Aggiungi Layout
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {showUserDataForm && (
        <UserDataForm 
          onSubmit={(data) => {
            setUserData(data);
            setShowUserDataForm(false);
            setPendingPdfGeneration(false);
            
            // Procedi con la generazione del PDF e l'invio dell'email
            setTimeout(async () => {
              // Prima inviami i dati via email
              sendUserDataByEmail(data, totalStats);
              // Poi generiamo il PDF
              await handleGeneratePDF();
            }, 100);
          }}
          onCancel={() => {
            setShowUserDataForm(false);
            setPendingPdfGeneration(false);
          }}
        />
      )}
    </>
  );
});

export default LayoutManager;
