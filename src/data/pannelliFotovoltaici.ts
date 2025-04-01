export interface PannelloFotovoltaico {
  modello: string;
  efficienza: string;
  categoria: 'pannello standard' | 'colorato per paesaggistica' | 'trasparente'| 'soluzione copertura'|'lamina senza cornice';
  taglia: 'taglia media' | 'extra large';
  brand: string;
  power: string; // Potenza nominale in Watt (stringa)
  potenza: number; // Potenza nominale in Watt (numero)
  width: number;
  height: number;
}

export const pannelliFotovoltaici: PannelloFotovoltaico[] = [
  {
    modello: 'BISOL Supreme BDO',
    efficienza: ' 21,3% €€€',
    categoria: 'pannello standard',
    taglia: 'taglia media',
    brand: 'Bisol',
    power: '420 Wp',
    potenza: 420,
    width: 1722,
    height: 1134,

  },
  {
    modello: 'BISOL Duplex BDO',
    efficienza: ' 22,7% €€',
    categoria: 'pannello standard',
    taglia: 'taglia media',
    brand: 'Bisol',
    power: '440 Wp',
    potenza: 440,
    width: 1722,
    height: 1134,

  },
  {
    modello: 'BISOL Duplex BBO',
    efficienza: ' 22,7% €€',
    categoria: 'pannello standard',
    taglia: 'extra large',
    brand: 'Bisol',
    power: '540 Wp',
    potenza: 540,
    width: 2094,
    height: 1134,

  },
  {
    modello: 'BISOL Laminate BDO',
    efficienza: '22,7% €€',
    categoria: 'lamina senza cornice',
    taglia: 'taglia media',
    brand: 'Bisol',
    power: '440 Wp',
    potenza: 440,
    width: 1715,
    height: 1128,

  },
  {
    modello: 'BISOL Laminate BBO',
    efficienza: '22,7% €€',
    categoria: 'lamina senza cornice',
    taglia: 'extra large',
    brand: 'Bisol',
    power: '540 Wp',
    potenza: 540,
    width: 2087,
    height: 1128,

  },
  {
    modello: 'BISOL BIPV BSO',
    efficienza: '22,5% €€',
    categoria: 'soluzione copertura',
    taglia: 'taglia media',
    brand: 'Bisol',
    power: '440 Wp',
    potenza: 440,
    width: 1780,
    height: 1050,

  },
  //quadro di prova
  {
    modello: 'quadro',
    efficienza: '22,5% €€',
    categoria: 'pannello standard',
    taglia: 'taglia media',
    brand: 'Bisol',
    power: '440 Wp',
    potenza: 440,
    width: 2000,
    height: 2000,

  },
  {
    modello: 'BISOL Spectrum',
    efficienza: '22,1% €€',
    categoria: 'colorato per paesaggistica',
    taglia: 'taglia media',
    brand: 'Bisol',
    power: '430 Wp',
    potenza: 430,
    width: 1722,
    height: 1134,

  },
  {
    modello: 'BISOL Bifacial BDO',
    efficienza: '22,7% €€',
    categoria: 'trasparente',
    taglia: 'taglia media',
    brand: 'Bisol',
    power: '430 Wp',
    potenza: 430,
    width: 1722,
    height: 1134,

  },
  {
    modello: 'BISOL Bifacial BBO',
    efficienza: '22,7% €€',
    categoria: 'trasparente',
    taglia: 'extra large',
    brand: 'Bisol',
    power: '530 Wp',
    potenza: 530,
    width: 2094,
    height: 1134,

  },
  {
    modello: 'BISOL Lumina BDO',
    efficienza: '21,7% €€',
    categoria: 'trasparente',
    taglia: 'taglia media',
    brand: 'Bisol',
    power: '380 Wp',
    potenza: 380,
    width: 1785,
    height: 1040,

  },
  {
    modello: 'BISOL Lumina BBO',
    efficienza: '18,7% €€',
    categoria: 'trasparente',
    taglia: 'extra large',
    brand: 'Bisol',
    power: '430 Wp',
    potenza: 430,
    width: 2087,
    height: 1128,

  },
  {
    modello: 'Maxeon 6',
    efficienza: '22,3% €€€€',
    categoria: 'pannello standard',
    taglia: 'taglia media',
    brand: 'Maxeon',
    power: '450 Wp',
    potenza: 450,
    width: 1872,
    height: 1032,

  }
];

export default pannelliFotovoltaici;
