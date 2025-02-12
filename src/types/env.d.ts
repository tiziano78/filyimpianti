/// <reference types="react" />

declare module '@deck.gl/core' {
  export interface ViewState {
    longitude: number
    latitude: number
    zoom: number
    pitch: number
    bearing: number
  }
}

declare module '@deck.gl/layers' {
  export class PolygonLayer {
    constructor(props: any)
  }
}

declare module '@deck.gl/react' {
  import { Component } from 'react'
  
  export interface DeckGLProps {
    ref?: React.RefObject<any>
    initialViewState?: any
    controller?: boolean
    layers: any[]
    onViewStateChange?: (evt: { viewState: any }) => void
    onClick?: (info: any) => void
    onWebGLInitialized?: () => void
    children?: React.ReactNode
  }

  export class DeckGL extends Component<DeckGLProps> {}
} 