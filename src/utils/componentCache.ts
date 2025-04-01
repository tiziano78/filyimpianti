import { PannelloFotovoltaico } from '@/data/pannelliFotovoltaici';
import { BatteriaFotovoltaica } from '@/data/batterieFotovoltaiche';

interface ComponentCache {
  selectedPannello: PannelloFotovoltaico | null;
  selectedBatteria: BatteriaFotovoltaica | null;
  lastUpdate: number;
}

// Cache singleton con timestamp
let cache: ComponentCache = {
  selectedPannello: null,
  selectedBatteria: null,
  lastUpdate: Date.now()
};

// Timeout di 30 minuti
const CACHE_TIMEOUT = 30 * 60 * 1000;

// Funzione per verificare se la cache è scaduta
export const isCacheExpired = (): boolean => {
  return Date.now() - cache.lastUpdate > CACHE_TIMEOUT;
};

// Funzioni per gestire la cache
export const setSelectedPannello = (pannello: PannelloFotovoltaico | null) => {
  cache.selectedPannello = pannello;
  cache.lastUpdate = Date.now();
  if (process.env.NODE_ENV === 'development') {
    console.log('Cache Pannello:', cache.selectedPannello);
  }
};

export const setSelectedBatteria = (batteria: BatteriaFotovoltaica | null) => {
  cache.selectedBatteria = batteria;
  cache.lastUpdate = Date.now();
  if (process.env.NODE_ENV === 'development') {
    console.log('Cache Batteria:', cache.selectedBatteria);
  }
};

export const getSelectedPannello = (): PannelloFotovoltaico | null => {
  if (isCacheExpired()) {
    clearCache();
    return null;
  }
  return cache.selectedPannello;
};

export const getSelectedBatteria = (): BatteriaFotovoltaica | null => {
  if (isCacheExpired()) {
    clearCache();
    return null;
  }
  return cache.selectedBatteria;
};

export const clearCache = () => {
  cache = {
    selectedPannello: null,
    selectedBatteria: null,
    lastUpdate: Date.now()
  };
  if (process.env.NODE_ENV === 'development') {
    console.log('Cache pulita');
  }
}; 