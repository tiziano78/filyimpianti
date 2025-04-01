import { Feature, Polygon, Point, BBox } from 'geojson';
import * as turf from '@turf/turf';

interface GridCell {
  x: number;
  y: number;
  width: number;
  height: number;
  isInside: boolean;
  rotation?: number;
}

interface PanelSpecs {
  width: number;
  height: number;
  power: number;
  efficiency: number;
}

export function createPanelLayout(
  polygon: Feature<Polygon>, 
  panelSpecs: PanelSpecs,
  rotation: number = 0
): Feature<Polygon>[] {
  // 1. Calcola il bounding box del poligono
  const bbox = turf.bbox(polygon);
  
  // 2. Crea una griglia basata sulle dimensioni del pannello
  const grid = createGrid(bbox, panelSpecs, rotation);
  
  // 3. Verifica quali celle sono completamente dentro il poligono
  const validCells = grid.filter(cell => {
    const corners = getCorners(cell);
    return corners.every(corner => turf.booleanPointInPolygon(
      turf.point(corner),
      polygon.geometry
    ));
  });

  // 4. Ottimizza il layout
  const optimizedCells = optimizeLayout(validCells, polygon);
  
  // 5. Converti le celle valide in features dei pannelli
  return optimizedCells.map(cell => createPanelFeature(cell));
}

function createGrid(bbox: BBox, panelSpecs: PanelSpecs, rotation: number): GridCell[] {
  const cells: GridCell[] = [];
  const [minX, minY, maxX, maxY] = bbox;
  
  // Calcola le dimensioni effettive considerando la rotazione
  const effectiveWidth = Math.abs(panelSpecs.width * Math.cos(rotation)) + 
                        Math.abs(panelSpecs.height * Math.sin(rotation));
  const effectiveHeight = Math.abs(panelSpecs.width * Math.sin(rotation)) + 
                         Math.abs(panelSpecs.height * Math.cos(rotation));

  for (let y = minY; y < maxY; y += effectiveHeight) {
    for (let x = minX; x < maxX; x += effectiveWidth) {
      cells.push({
        x,
        y,
        width: panelSpecs.width,
        height: panelSpecs.height,
        isInside: false,
        rotation
      });
    }
  }
  
  return cells;
}

function getCorners(cell: GridCell): [number, number][] {
  const cos = Math.cos(cell.rotation || 0);
  const sin = Math.sin(cell.rotation || 0);
  
  // Calcola i punti del rettangolo ruotato
  const points: [number, number][] = [
    [cell.x, cell.y],
    [cell.x + cell.width * cos, cell.y + cell.width * sin],
    [
      cell.x + cell.width * cos - cell.height * sin,
      cell.y + cell.width * sin + cell.height * cos
    ],
    [
      cell.x - cell.height * sin,
      cell.y + cell.height * cos
    ]
  ];
  
  return points;
}

function createPanelFeature(cell: GridCell): Feature<Polygon> {
  const corners = getCorners(cell);
  
  return {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        ...corners,
        corners[0] // Chiude il poligono
      ]]
    },
    properties: {
      type: 'panel',
      width: cell.width,
      height: cell.height,
      rotation: cell.rotation || 0
    }
  };
}

function optimizeLayout(cells: GridCell[], polygon: Feature<Polygon>): GridCell[] {
  const center = turf.center(polygon);
  
  // Ordina le celle per distanza dal centro
  return cells.sort((a, b) => {
    const cellCenterA = turf.point([
      a.x + a.width/2,
      a.y + a.height/2
    ]);
    const cellCenterB = turf.point([
      b.x + b.width/2,
      b.y + b.height/2
    ]);
    
    const distA = turf.distance(cellCenterA, center);
    const distB = turf.distance(cellCenterB, center);
    
    return distA - distB;
  });
}

export function calculateOptimalRotation(polygon: Feature<Polygon>): number {
  // Calcola l'angolo del lato più lungo del poligono
  const coordinates = polygon.geometry.coordinates[0];
  let maxLength = 0;
  let optimalAngle = 0;
  
  for (let i = 0; i < coordinates.length - 1; i++) {
    const start = coordinates[i];
    const end = coordinates[i + 1];
    const length = turf.distance(
      turf.point(start),
      turf.point(end),
      { units: 'meters' }
    );
    
    if (length > maxLength) {
      maxLength = length;
      optimalAngle = Math.atan2(
        end[1] - start[1],
        end[0] - start[0]
      );
    }
  }
  
  return optimalAngle;
}

export function calculatePanelStats(panels: Feature<Polygon>[], panelSpecs: PanelSpecs) {
  const totalPanels = panels.length;
  const totalPower = totalPanels * panelSpecs.power;
  const totalArea = totalPanels * (panelSpecs.width * panelSpecs.height);
  
  return {
    totalPanels,
    totalPower,
    totalArea,
    efficiency: panelSpecs.efficiency
  };
} 