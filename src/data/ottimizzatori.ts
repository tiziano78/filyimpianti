// Definizione delle interfacce
export interface Ottimizzatore {
  marca: 'Tigo' | 'Huawei' | 'SolarEdge';
  modello: string;
  potenza: number;
  prezzo: number;
}

export interface ConfigurazioneOttimizzatori {
  marca: Ottimizzatore['marca'];
  numeroTotale: number;
  pannelliConOttimizzatore: {
    id: number;
    azimut: number;
  }[];
  pannelliSenzaOttimizzatore: {
    id: number;
    azimut: number;
  }[];
  costoTotale: number;
}

// Catalogo ottimizzatori disponibili
export const catalogoOttimizzatori: Record<Ottimizzatore['marca'], Ottimizzatore> = {
  Tigo: {
    marca: 'Tigo',
    modello: 'TS4-A-O',
    potenza: 375,
    prezzo: 80
  },
  Huawei: {
    marca: 'Huawei',
    modello: 'SUN2000-450W-P',
    potenza: 450,
    prezzo: 85
  },
  SolarEdge: {
    marca: 'SolarEdge',
    modello: 'P401',
    potenza: 400,
    prezzo: 90
  }
};

/**
 * Determina la marca degli ottimizzatori in base al tipo di batteria
 */
export function determinaMarcaOttimizzatori(tipoBatteria?: string): Ottimizzatore['marca'] {
  if (!tipoBatteria) return 'Tigo';
  
  switch (tipoBatteria.toLowerCase()) {
    case 'zucchetti':
      return 'Tigo';
    case 'huawei':
      return 'Huawei';
    case 'solaredge':
    case 'lg':
    case 'tesla':
      return 'SolarEdge';
    default:
      return 'Tigo';
  }
}

/**
 * Verifica se un pannello necessita di ottimizzatore in base all'azimut
 */
export function necessitaOttimizzatore(azimut: number): boolean {
  // Normalizza l'azimut tra 0 e 360 gradi
  const azimutNormalizzato = ((azimut % 360) + 360) % 360;
  
  // Pannelli orientati tra 240° e 120° (passando per Nord) necessitano di ottimizzatore
  return azimutNormalizzato > 240 || azimutNormalizzato < 120;
}

/**
 * Calcola la configurazione degli ottimizzatori necessari per l'impianto
 */
export function calcolaOttimizzatoriNecessari(
  pannelli: { id: number; azimut: number }[],
  tipoBatteria?: string
): ConfigurazioneOttimizzatori {
  const marca = determinaMarcaOttimizzatori(tipoBatteria);
  const ottimizzatore = catalogoOttimizzatori[marca];
  
  const pannelliConOttimizzatore = pannelli.filter(p => necessitaOttimizzatore(p.azimut));
  const pannelliSenzaOttimizzatore = pannelli.filter(p => !necessitaOttimizzatore(p.azimut));
  
  return {
    marca,
    numeroTotale: pannelliConOttimizzatore.length,
    pannelliConOttimizzatore,
    pannelliSenzaOttimizzatore,
    costoTotale: pannelliConOttimizzatore.length * ottimizzatore.prezzo
  };
}

/**
 * Genera il report degli ottimizzatori per il PDF
 */
export function generaReportOttimizzatori(
  configurazione: ConfigurazioneOttimizzatori
): string {
  const ottimizzatore = catalogoOttimizzatori[configurazione.marca];
  
  let report = '=== REPORT OTTIMIZZATORI ===\n\n';
  
  report += 'Dettaglio pannelli con ottimizzatore:\n';
  configurazione.pannelliConOttimizzatore.forEach(p => {
    report += `- Pannello ID ${p.id}: Azimut ${p.azimut}°\n`;
  });
  
  report += '\nDettaglio pannelli senza ottimizzatore:\n';
  configurazione.pannelliSenzaOttimizzatore.forEach(p => {
    report += `- Pannello ID ${p.id}: Azimut ${p.azimut}°\n`;
  });
  
  report += '\nRiepilogo:\n';
  report += `- Marca ottimizzatori: ${configurazione.marca}\n`;
  report += `- Modello: ${ottimizzatore.modello}\n`;
  report += `- Numero totale ottimizzatori: ${configurazione.numeroTotale}\n`;
  report += `- Pannelli con ottimizzatore: ${configurazione.pannelliConOttimizzatore.length}\n`;
  report += `- Pannelli senza ottimizzatore: ${configurazione.pannelliSenzaOttimizzatore.length}\n`;
  report += `- Costo totale ottimizzatori: €${configurazione.costoTotale.toFixed(2)}\n`;
  
  return report;
} 