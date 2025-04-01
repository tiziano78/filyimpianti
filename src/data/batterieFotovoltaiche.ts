export interface BatteriaFotovoltaica {
  modello: string;
  capacita: number;
  efficienza: number;
  garanzia: string;
  qualita: 'standard' | 'premium';
  brand: string;
}

const batterieFotovoltaiche: BatteriaFotovoltaica[] = [
  // Categoria 5 kWh
  {
    modello: 'Zucchetti ZCS Azzurro 5KWh',
    capacita: 5,
    efficienza: 95,
    garanzia: '10 anni',
    qualita: 'standard',
    brand: 'Zucchetti',
  },


  // Categoria 5 kWh
  {
    modello: 'Huawei Luna2000-10-S0',
    capacita: 5,
    efficienza: 97,
    garanzia: '10 anni',
    qualita: 'standard',
    brand: 'Huawei',
  },
  {
    modello: 'Solaredge Energy Bank 10KWh',
    capacita: 10,
    efficienza: 96,
    garanzia: '10 anni',
    qualita: 'premium',
    brand: 'SolarEdge',
  },

  // Categoria 13 kWh
  {
    modello: 'Tesla Powerwall 2',
    capacita: 13.7,
    efficienza: 90,
    garanzia: '10 anni',
    qualita: 'premium',
    brand: 'Tesla',
  },
  {
    modello: 'LG RESU Prime 13.1',
    capacita: 13.1,
    efficienza: 95,
    garanzia: '10 anni',
    qualita: 'premium',
    brand: 'LG',
  },

];

export default batterieFotovoltaiche; 