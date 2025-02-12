export interface Panel {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  angle: number;
  dimensions: {
    width: number;
    height: number;
  };
}

export interface PannelloFotovoltaico {
  id: string;
  nome: string;
  potenza: number;
  dimensioni: {
    larghezza: number;
    altezza: number;
  };
}