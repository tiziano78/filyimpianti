import { NextResponse } from 'next/server';
import * as turf from '@turf/turf';
import type { Feature, Polygon, Position } from 'geojson';

interface GridRequest {
  polygon: Feature<Polygon>;
  panelWidth: number;
  panelHeight: number;
  spacing: number;
  alternativeOrientation?: boolean; // Parametro per l'orientamento alternativo
}

export async function POST(request: Request) {
  try {
    console.log('Richiesta ricevuta dal server');
    const body = await request.json() as GridRequest;
    
    // Valida i dati in ingresso
    if (!body.polygon || !body.panelWidth || !body.panelHeight || body.spacing === undefined) {
      console.error('Dati mancanti nella richiesta:', body);
      return new NextResponse(JSON.stringify({ error: 'Dati mancanti nella richiesta' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { polygon, panelWidth, panelHeight, spacing, alternativeOrientation } = body;
    console.log('Parametri ricevuti:', { 
      polygonType: polygon.type,
      coordinates: polygon.geometry.coordinates,
      panelWidth, 
      panelHeight, 
      spacing,
      alternativeOrientation
    });

    // Calcola l'orientamento ottimale
    const optimalAngle = calculateOptimalRotation(polygon, alternativeOrientation);
    console.log('Angolo ottimale calcolato:', optimalAngle);

    // Calcola il bounding box del poligono
    const bbox = turf.bbox(polygon);
    console.log('Bounding box calcolato:', bbox);
    
    // Calcola la griglia
    console.log('Inizio calcolo griglia...');
    const grid = calculateGrid(bbox, polygon, panelWidth, panelHeight, spacing, optimalAngle);
    console.log('Griglia calcolata, numero pannelli:', grid.length);
    
    // Filtra i pannelli validi
    console.log('Filtro pannelli validi...');
    const validPanels = grid.filter(panel => turf.booleanContains(polygon, panel));
    console.log('Pannelli validi trovati:', validPanels.length);

    // Calcola le statistiche
    const stats = {
      totalPanels: validPanels.length,
      totalArea: validPanels.length * (panelWidth * panelHeight),
      coverage: (validPanels.length * (panelWidth * panelHeight)) / turf.area(polygon)
    };
    console.log('Statistiche calcolate:', stats);

    return new NextResponse(JSON.stringify({ 
      panels: validPanels, 
      stats 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Errore nel server:', error);
    return new NextResponse(JSON.stringify({ error: 'Errore interno del server' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

function calculateOptimalRotation(polygon: Feature<Polygon>, alternativeOrientation?: boolean): number {
  try {
    if (!polygon.geometry || !polygon.geometry.coordinates || !polygon.geometry.coordinates[0]) {
      console.warn('Geometria del poligono non valida');
      return 0;
    }

    const coordinates = polygon.geometry.coordinates[0];
    let maxLength = 0;
    let optimalAngle = 0;

    // Calcola la lunghezza e l'angolo di ogni lato
    for (let i = 0; i < coordinates.length - 1; i++) {
      const start = coordinates[i];
      const end = coordinates[i + 1];

      // Verifica che le coordinate siano array validi di numeri
      if (!Array.isArray(start) || !Array.isArray(end) || start.length < 2 || end.length < 2) {
        console.warn('Coordinate non valide:', { start, end });
        continue;
      }

      try {
        const startPoint = turf.point([start[0], start[1]]);
        const endPoint = turf.point([end[0], end[1]]);

        const length = turf.distance(startPoint, endPoint, { units: 'meters' });

        if (length > maxLength) {
          maxLength = length;
          // Calcola l'angolo in gradi
          const bearing = turf.bearing(startPoint, endPoint);
          optimalAngle = bearing * Math.PI / 180; // converti in radianti
        }
      } catch (error) {
        console.warn('Errore nel calcolo della distanza:', error);
      }
    }

    // Se è richiesto l'orientamento alternativo, ruota di 90 gradi
    if (alternativeOrientation) {
      optimalAngle += Math.PI / 2;
    }

    return optimalAngle;
  } catch (error) {
    console.error('Errore nel calcolo dell\'orientamento ottimale:', error);
    return 0;
  }
}

function calculateGrid(
  bbox: number[], 
  polygon: Feature<Polygon>,
  width: number,
  height: number,
  spacing: number,
  rotation: number
): Feature<Polygon>[] {
  console.log('Inizio calcolo griglia con parametri:', { bbox, width, height, spacing, rotation });
  
  // Crea un bounding box ruotato
  const [minX, minY, maxX, maxY] = bbox;
  const center = turf.center(polygon);
  const centerCoord = center.geometry.coordinates;
  
  // Ruota il poligono per allinearlo a nord
  const rotatedPolygon = turf.transformRotate(polygon, -rotation * 180 / Math.PI, { pivot: centerCoord });
  const rotatedBbox = turf.bbox(rotatedPolygon);
  
  const panels: Feature<Polygon>[] = [];
  let panelCount = 0;

  // Calcola le dimensioni effettive in metri
  const effectiveWidth = width + spacing;
  const effectiveHeight = height + spacing;

  // Crea una griglia regolare nel sistema ruotato
  const [rMinX, rMinY, rMaxX, rMaxY] = rotatedBbox;
  const origin = turf.point([rMinX, rMinY]);

  for (let y = 0; y < turf.distance([rMinX, rMinY], [rMinX, rMaxY], {units: 'meters'}); y += effectiveHeight) {
    for (let x = 0; x < turf.distance([rMinX, rMinY], [rMaxX, rMinY], {units: 'meters'}); x += effectiveWidth) {
      // Crea il pannello nel sistema ruotato
      const basePoint = turf.destination(
        turf.destination(origin, x, 90, {units: 'meters'}),
        y, 0, {units: 'meters'}
      );

      const panel = createPanel(
        basePoint.geometry.coordinates,
        width,
        height,
        { units: 'meters' }
      );

      // Ruota il pannello indietro nel sistema originale
      const rotatedPanel = turf.transformRotate(panel, rotation * 180 / Math.PI, { pivot: centerCoord });
      
      panels.push(rotatedPanel);
      panelCount++;
      
      if (panelCount <= 3) {
        console.log(`Pannello ${panelCount} creato`);
      }
    }
  }
  
  console.log('Griglia completata, totale pannelli creati:', panelCount);
  return panels;
}

function createPanel(
  basePoint: Position,
  width: number,
  height: number,
  options: { units: 'meters' }
): Feature<Polygon> {
  // Crea un pannello rettangolare non ruotato
  const corner1 = turf.destination(
    turf.point(basePoint),
    width,
    90,
    options
  );
  
  const corner2 = turf.destination(
    turf.point(basePoint),
    height,
    0,
    options
  );
  
  const corner3 = turf.destination(
    corner2,
    width,
    90,
    options
  );
  
  return turf.polygon([[
    basePoint,
    corner1.geometry.coordinates,
    corner3.geometry.coordinates,
    corner2.geometry.coordinates,
    basePoint
  ]], {
    type: 'panel',
    width,
    height
  });
} 