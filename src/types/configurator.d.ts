import { Feature, Polygon } from 'geojson'
import { PannelloFotovoltaico } from '@/data/pannelliFotovoltaici'
import { InverterFotovoltaico } from '@/data/inverterFotovoltaici'
import { BatteriaFotovoltaica } from '@/data/batterieFotovoltaiche'
import { RefObject } from 'react'

export interface Panel {
  id: string;
  coordinates: Array<Array<[number, number]>>;
  center: [number, number];
  rotation: number;
  elevation: number;
  power: number;
  pannello: PannelloFotovoltaico;
}

export interface ConfigMapHandle {
  panelRotate: (panel: Panel, angle: number) => void;
  captureImage: () => Promise<string>;
}

export interface ConfigMapProps {
  selectedPannello: PannelloFotovoltaico;
  onPanelAdd: (panel: Panel) => void;
  onPanelSelect: (panel: Panel) => void;
  onPanelRotate: (panel: Panel, angle: number) => void;
  panels: Panel[];
  forwardedRef?: RefObject<ConfigMapHandle>;
}

export interface ConfiguratorData {
  panels: Panel[]
  drawingPoints: Array<[number, number]>
  selectedPannello: PannelloFotovoltaico
  selectedInverter: InverterFotovoltaico
  selectedBatteria: BatteriaFotovoltaica
}

export interface ActionResponse {
  success: boolean
  error?: string
  data?: any
}

export interface ConfiguratorState {
  selectedPannello: PannelloFotovoltaico | null
  selectedInverter: InverterFotovoltaico | null
  selectedBatteria: BatteriaFotovoltaica | null
  panels: Panel[]
  drawingMode: boolean
  showShadows: boolean
  selectedPanelId: string | null
}

export interface ViewState {
  longitude: number
  latitude: number
  zoom: number
  pitch: number
  bearing: number
}

export interface SearchResult {
  place_name: string
  center: [number, number]
}

export interface ConfiguratorAction {
  type: 
    | 'SET_SELECTED_PANNELLO' 
    | 'SET_SELECTED_INVERTER'
    | 'SET_SELECTED_BATTERIA'
    | 'ADD_PANEL'
    | 'REMOVE_PANEL'
    | 'UPDATE_PANEL'
    | 'SET_DRAWING_MODE'
    | 'SET_SHOW_SHADOWS'
    | 'SET_SELECTED_PANEL_ID'
  payload: any
}

export interface ConfiguratorContext {
  state: ConfiguratorState
  dispatch: React.Dispatch<ConfiguratorAction>
}

export interface ExportData {
  panels: Panel[]
  inverter: InverterFotovoltaico | null
  batteria: BatteriaFotovoltaica | null
  potenzaTotale: number
} 