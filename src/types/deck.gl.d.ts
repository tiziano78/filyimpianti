import React from 'react'

declare module '@deck.gl/core' {
    export interface ViewState {
        longitude: number
        latitude: number
        zoom: number
        pitch: number
        bearing: number
    }

    export const MapView: any;
}

declare module '@deck.gl/layers' {
    export interface PolygonLayerProps {
        id: string
        data: any[]
        pickable?: boolean
        stroked?: boolean
        filled?: boolean
        wireframe?: boolean
        lineWidthMinPixels?: number
        getPolygon: (d: any) => number[][]
        getFillColor: number[] | ((d: any) => number[])
        getLineColor: number[] | ((d: any) => number[])
        getLineWidth: number | ((d: any) => number)
        onClick?: (info: any, event: any) => void
        [key: string]: any
    }

    export class PolygonLayer {
        constructor(props: PolygonLayerProps)
    }
}

declare module '@deck.gl/react' {
    export interface DeckGLProps {
        ref?: React.RefObject<any>
        initialViewState?: any
        viewState?: any
        controller?: boolean | object
        layers: any[]
        onViewStateChange?: (evt: { viewState: any }) => void
        onClick?: (info: any) => void
        onWebGLInitialized?: () => void
        children?: React.ReactNode
        [key: string]: any
    }

    export class DeckGL extends React.Component<DeckGLProps> {}
}

export interface DeckGLInstance {
    deck?: {
        setProps: (props: Record<string, unknown>) => void
        _destroy: () => void
    }
}