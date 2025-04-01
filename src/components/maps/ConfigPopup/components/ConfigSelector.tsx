'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './ConfigSelector.module.css'
import React from 'react'
import Image from 'next/image'

// Componente per l'icona del pannello solare
const SolarPanelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M4,2H20A2,2 0 0,1 22,4V14A2,2 0 0,1 20,16H15V20H18V22H13V16H11V22H6V20H9V16H4A2,2 0 0,1 2,14V4A2,2 0 0,1 4,2M4,4V8H20V4H4M4,10V14H20V10H4Z"/>
  </svg>
)

// Funzione per determinare il percorso della bandiera
const getFlagPath = (brand: string): string | null => {
  if (brand.toLowerCase().includes('bisol')) {
    return '/images/icone/eu.png'
  } else if (brand.toLowerCase().includes('maxeon')) {
    return '/images/icone/usa.png'
  }
  return null
}

interface ConfigOption {
  id: string
  name: string
  description: string
  category?: string
  specs?: {
    [key: string]: string | number
  }
}

interface ConfigSelectorProps {
  title: string
  options: ConfigOption[]
  selectedId?: string
  onSelectAction: (id: string) => void
  isFirstSelector?: boolean
  readOnly?: boolean
  isBatterySelector?: boolean
  onBatteryCountChange?: (count: number) => void
  onBatteryConfirm?: () => void
}

export default function ConfigSelector({ 
  title, 
  options, 
  selectedId, 
  onSelectAction,
  isFirstSelector = false,
  readOnly = false,
  isBatterySelector = false,
  onBatteryCountChange,
  onBatteryConfirm
}: ConfigSelectorProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedOption, setSelectedOption] = useState<ConfigOption | null>(null)
  const [batteryCount, setBatteryCount] = useState(1)
  const [isMobileView, setIsMobileView] = useState(false)
  const [showCategorySelector, setShowCategorySelector] = useState(true)
  const [isLandscape, setIsLandscape] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null)

  // Estrai le categorie uniche dalle opzioni
  const categories = Array.from(new Set(options.map(opt => opt.category || 'Altro')))

  // Filtra le opzioni in base alla categoria selezionata
  const filteredOptions = selectedCategory 
    ? options.filter(opt => opt.category === selectedCategory)
    : []

  // Funzione per determinare il numero di opzioni da mostrare
  const getDropdownSize = () => {
    if (isLandscape) {
      return 10; // Un numero adeguato per la modalità landscape
    } else if (isMobileView) {
      return 15; // Un numero adeguato per la modalità mobile verticale
    }
    return 1; // Modalità desktop (chiuso di default)
  };

  // Effetto per gestire il click esterno
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    
    // Aggiungi event listener solo se il dropdown è aperto
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  // Effetto per aggiornare l'opzione selezionata quando cambia selectedId
  useEffect(() => {
    if (selectedId) {
      const option = options.find(opt => opt.id === selectedId)
      if (option) {
        setSelectedOption(option)
        setSelectedCategory(option.category || '')
        setIsDropdownOpen(false)
      }
    }
  }, [selectedId, options])

  // Effetto per inizializzare il selettore delle batterie
  useEffect(() => {
    // Se è il selettore delle batterie e non c'è un'opzione selezionata, mostra le categorie
    if (isBatterySelector && !selectedOption) {
      // Non selezioniamo automaticamente la prima categoria
      // Mostriamo il selettore delle categorie
      setShowCategorySelector(true);
      // Resettiamo la categoria selezionata
      setSelectedCategory('');
      setIsDropdownOpen(false);
    }
  }, [isBatterySelector, selectedOption])

  // Effetto per chiudere il dropdown quando cambia showBatterySelector
  useEffect(() => {
    if (!isBatterySelector) {
      return;
    }
    
    // Se il selettore delle batterie viene nascosto, chiudi il dropdown
    setIsDropdownOpen(false);
  }, [isBatterySelector]);

  // Controlla se è un dispositivo mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileView(window.innerWidth <= 480)
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

  // Rileva se siamo in modalità landscape
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerHeight < window.innerWidth && window.innerHeight < 500);
    };
    
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Effetto per gestire lo scroll in modalità landscape
  useEffect(() => {
    if (isLandscape && selectedCategory) {
      // Assicuriamoci che la lista dei pannelli sia visibile e scrollabile
      const optionsList = document.querySelector(`.${styles.optionsList}`);
      if (optionsList) {
        // Imposta lo scroll all'inizio della lista
        optionsList.scrollTop = 0;
        
        // Aggiungi un evento touch per migliorare lo scrolling su dispositivi mobili
        const handleTouchStart = (e: Event) => {
          e.stopPropagation();
        };
        
        optionsList.addEventListener('touchstart', handleTouchStart as EventListener);
        
        return () => {
          optionsList.removeEventListener('touchstart', handleTouchStart as EventListener);
        };
      }
    }
  }, [isLandscape, selectedCategory, styles.optionsList]);

  const handleOptionSelect = (option: ConfigOption) => {
    setSelectedOption(option)
    setIsDropdownOpen(false)
    setSelectedCategory(option.category || '')
    setShowCategorySelector(false)
    onSelectAction(option.id)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setSelectedOption(null)
    
    // Assicuriamoci che la lista dei pannelli sia visibile dopo aver selezionato una categoria
    setTimeout(() => {
      if (isLandscape) {
        const optionsList = document.querySelector(`.${styles.optionsList}`);
        if (optionsList) {
          // Forza un reflow per assicurarsi che la lista sia visibile
          optionsList.scrollTop = 0;
          
          // Assicurati che l'elemento sia visibile
          (optionsList as HTMLElement).style.display = 'block';
          (optionsList as HTMLElement).style.visibility = 'visible';
        }
      }
    }, 100);
  }

  const handleDropdownOpen = () => {
    // Se il pannello è in sola lettura, non aprire il dropdown
    if (readOnly) {
      return;
    }
    
    // Se è il selettore dei pannelli e c'è già un pannello selezionato, non aprire il dropdown
    if (title === "Configurazione Pannelli" && selectedOption) {
      return;
    }
    
    setIsDropdownOpen(true)
    // Mostra nuovamente il selettore delle categorie
    setShowCategorySelector(true)
    // Se c'è un'opzione selezionata, pre-seleziona la sua categoria
    if (selectedOption && selectedOption.category) {
      setSelectedCategory(selectedOption.category)
    }
  }

  const selectorId = `${title.toLowerCase().replace(/\s+/g, '-')}-selector`

  return (
    <div className={styles.selector} ref={selectorRef}>
      {isFirstSelector && !isMobileView && !isLandscape && (
        <div className={styles.configuratorTitle}>
          <SolarPanelIcon />
          <span className={styles.configuratorText}>configuratore</span>
          <span className={styles.configuratorBrand}>FILY</span>
        </div>
      )}
      
      {isBatterySelector && selectedOption && (
        <div className={styles.floatingBatteryCounter}>
          <div className={styles.batteryCounterContainer}>
            <div className={styles.counterLabel}>
              Numero Batterie
            </div>
            <div className={styles.counterControls}>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  if (batteryCount > 1) {
                    setBatteryCount(batteryCount - 1)
                    onBatteryCountChange?.(batteryCount - 1)
                  }
                }}
                className={styles.counterButton}
                type="button"
                disabled={batteryCount <= 1}
              >
                -
              </button>
              <span className={styles.counterValue}>{batteryCount}</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setBatteryCount(batteryCount + 1)
                  onBatteryCountChange?.(batteryCount + 1)
                }}
                className={styles.counterButton}
                type="button"
              >
                +
              </button>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation()
                onBatteryConfirm?.()
                setIsDropdownOpen(false)
              }}
              className={styles.confirmButton}
              type="button"
            >
              Conferma Storage
            </button>
          </div>
        </div>
      )}
      
      <div className={styles.panelTitle}>
        {title}
      </div>
      
      {/* Mostra sempre l'opzione selezionata se esiste, mai il dropdown */}
      {selectedOption ? (
        <div 
          className={`${styles.option} ${styles.selected}`}
          onClick={undefined} // Disabilita completamente il click
          role="button"
          tabIndex={0}
          style={{ cursor: 'default' }}
          aria-label={`${title} selezionato: ${selectedOption.name}`}
        >
          <div className={styles.panelInfo}>
            {title === "Configurazione Pannelli" || readOnly ? (
              <div className={styles.panelValue} style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                {selectedOption.name}
                {getFlagPath(selectedOption.name) && (
                  <Image
                    src={getFlagPath(selectedOption.name)!}
                    alt="Bandiera"
                    width={20}
                    height={20}
                    style={{ marginLeft: '8px' }}
                  />
                )}
              </div>
            ) : (
              <>
                <div className={styles.panelLabel}>Modello:</div>
                <div className={styles.panelValue} style={{ display: 'flex', alignItems: 'center' }}>
                  {selectedOption.name}
                  {getFlagPath(selectedOption.name) && (
                    <Image
                      src={getFlagPath(selectedOption.name)!}
                      alt="Bandiera"
                      width={20}
                      height={20}
                      style={{ marginLeft: '8px' }}
                    />
                  )}
                </div>
                
                {selectedOption.specs && (
                  <>
                    <div className={styles.panelLabel}>Potenza:</div>
                    <div className={styles.panelValue}>{selectedOption.specs['Potenza']}</div>
                  </>
                )}
              </>
            )}
          </div>
          
          {selectedOption.category && !readOnly && title !== "Configurazione Pannelli" && (
            <div className={styles.panelCategory}>
              {selectedOption.category}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className={styles.categorySelector}>
            {isMobileView ? (
              // Versione mobile: lista semplice invece del dropdown
              showCategorySelector && (
                <div className={styles.mobileCategories}>
                  <div 
                    className={`${styles.mobileCategory} ${selectedCategory === '' ? styles.mobileSelected : ''}`}
                    onClick={() => handleCategorySelect('')}
                  >
                    Seleziona Categoria
                  </div>
                  {categories.map((category) => (
                    <div 
                      key={category}
                      className={`${styles.mobileCategory} ${selectedCategory === category ? styles.mobileSelected : ''}`}
                      onClick={() => handleCategorySelect(category)}
                      id={`${selectorId}-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                      data-category={category.toLowerCase().replace(/\s+/g, '-')}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              )
            ) : (
              // Versione desktop: dropdown standard
              showCategorySelector && (
                <select 
                  value={selectedCategory}
                  onChange={(e) => handleCategorySelect(e.target.value)}
                  className={`${styles.categoryDropdown} ${isLandscape ? styles.landscapeDropdown : ''}`}
                  id={`${selectorId}-category`}
                  name={`${selectorId}-category`}
                  aria-label={`Seleziona categoria ${title}`}
                  size={getDropdownSize()}
                >
                  <option 
                    value="" 
                    id={`${selectorId}-category-default`}
                    data-category="default"
                  >
                    Seleziona Categoria
                  </option>
                  {categories.map((category) => (
                    <option 
                      key={category} 
                      value={category}
                      id={`${selectorId}-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                      data-category={category.toLowerCase().replace(/\s+/g, '-')}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              )
            )}
          </div>

          {selectedCategory && (
            <div 
              className={styles.optionsList}
              role="listbox"
              aria-label={`Lista opzioni per ${title}`}
            >
              {filteredOptions.map((option) => (
                <div
                  key={option.id}
                  className={`${styles.option} ${selectedId === option.id ? styles.selected : ''}`}
                  onClick={() => handleOptionSelect(option)}
                  role="option"
                  aria-selected={selectedId === option.id}
                  tabIndex={0}
                  id={`${selectorId}-option-${option.id}`}
                >
                  <div className={styles.panelInfo}>
                    <div className={styles.panelLabel}>Modello:</div>
                    <div className={styles.panelValue} style={{ display: 'flex', alignItems: 'center' }}>
                      {option.name}
                      {getFlagPath(option.name) && (
                        <Image
                          src={getFlagPath(option.name)!}
                          alt="Bandiera"
                          width={20}
                          height={20}
                          style={{ marginLeft: '8px' }}
                        />
                      )}
                    </div>
                    
                    {option.specs && Object.entries(option.specs).map(([key, value]) => (
                      <React.Fragment key={key}>
                        <div className={styles.panelLabel}>{key}:</div>
                        <div className={styles.panelValue}>{value}</div>
                      </React.Fragment>
                    ))}
                  </div>
                  
                  {option.category && (
                    <div className={styles.panelCategory}>
                      {option.category}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
