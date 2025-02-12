export interface InverterFotovoltaico {
  modello: string;
  potenzaNominale: number;
  efficienza: number;
  garanzia: string;
  categoria: '4000w' | '5000w'| '6000w'| '8000w';
  brand: string;
  tipo: 'stringa' | 'hybrid';
}

const inverterFotovoltaici: InverterFotovoltaico[] = [
  // Categoria 4000W
  {
    modello: 'Fronius Primo 4.0-1',
    potenzaNominale: 4000,
    categoria: '4000w',
    efficienza: 96.5,
    garanzia: '5 anni',
    brand: 'Fronius',
    tipo: 'stringa',
  },
  {
    modello: 'SolarEdge SE4000H',
    potenzaNominale: 4000,
    categoria: '4000w',
    efficienza: 99.2,
    garanzia: '12 anni',
    brand: 'SolarEdge',
    tipo: 'hybrid',
  },
  {
    modello: 'SMA Sunny Boy 4.0',
    potenzaNominale: 4000,
    categoria: '4000w',
    efficienza: 97.0,
    garanzia: '5 anni', 
    brand: 'SMA',
    tipo: 'stringa',
  },
  {
    modello: 'Huawei SUN2000-4KTL-M1',
    potenzaNominale: 4000,
    categoria: '4000w',
    efficienza: 98.1,
    garanzia: '10 anni',
    brand: 'Huawei',
    tipo: 'hybrid',
  },
  {
    modello: 'Growatt 4000TL3-S',
    potenzaNominale: 4000,
    categoria: '4000w',
    efficienza: 97.9,
    garanzia: '5 anni',
    brand: 'Growatt',
    tipo: 'stringa',
  },
  {
    modello: 'SAJ R5-4K-S2',
    potenzaNominale: 4000,
    categoria: '4000w',
    efficienza: 97.8,
    garanzia: '5 anni',
    brand: 'SAJ',
    tipo: 'stringa',
  },

  // Categoria 5000W
  {
    modello: 'Huawei SUN2000-5KTL-L1',
    potenzaNominale: 5000,
    categoria: '5000w',
    efficienza: 98.4,
    garanzia: '10 anni',
    brand: 'Huawei',
    tipo: 'hybrid',
  },
  {
    modello: 'Zucchetti ZCS Azzurro HYD 6000-ZSS',
    potenzaNominale: 5000,
    categoria: '5000w',
    efficienza: 97.6,
    garanzia: '10 anni',
    brand: 'Zucchetti',
    tipo: 'hybrid',
  },
  {
    modello: 'Growatt 5000TL3-S',
    potenzaNominale: 5000,
    categoria: '5000w',
    efficienza: 97.9,
    garanzia: '5 anni',
    brand: 'Growatt',
    tipo: 'stringa',
  },
  {
    modello: 'SAJ R5-5K-S2',
    potenzaNominale: 5000,
    categoria: '5000w',
    efficienza: 97.8,
    garanzia: '5 anni',
    brand: 'SAJ',
    tipo: 'stringa',
  },

  // Categoria 6000W
  {
    modello: 'Huawei SUN2000-6KTL-M1',
    potenzaNominale: 6000,
    categoria: '6000w',
    efficienza: 98.3,
    garanzia: '10 anni',
    brand: 'Huawei',
    tipo: 'hybrid',
  },
  {
    modello: 'Fronius Primo 6.0-1',
    potenzaNominale: 6000,
    categoria: '6000w',
    efficienza: 96.5,
    garanzia: '5 anni',
    brand: 'Fronius',
    tipo: 'stringa',
  },
  {
    modello: 'SAJ R5-6K-S2',
    potenzaNominale: 6000,
    categoria: '6000w',
    efficienza: 97.8,
    garanzia: '5 anni',
    brand: 'SAJ',
    tipo: 'stringa',
  },

  // Categoria 8000W
  {
    modello: 'Huawei SUN2000-8KTL-M1',
    potenzaNominale: 8000,
    categoria: '8000w',
    efficienza: 98.4,
    garanzia: '10 anni',
    brand: 'Huawei',
    tipo: 'hybrid',
  },
  {
    modello: 'Growatt 8000TL3-S',
    potenzaNominale: 8000,
    categoria: '8000w',
    efficienza: 97.9,
    garanzia: '5 anni',
    brand: 'Growatt',
    tipo: 'stringa',
  },
  {
    modello: 'SAJ R5-8K-S2',
    potenzaNominale: 8000,
    categoria: '8000w',
    efficienza: 97.8,
    garanzia: '5 anni',
    brand: 'SAJ',
    tipo: 'stringa',
  }
];

export default inverterFotovoltaici; 