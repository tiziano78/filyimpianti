import type { Metadata as NextMetadata, OpenGraph as NextOpenGraph } from 'next'

export interface OGImage {
  url: string | URL
  width?: number
  height?: number
  alt?: string
  type?: string
  secureUrl?: string
}

declare module 'next' {
  interface OpenGraph extends Omit<NextOpenGraph, 'images'> {
    publishedTime?: string
    modifiedTime?: string
    authors?: string[]
    tags?: string[]
    images?: OGImage[] | string[]
  }

  interface Metadata extends Omit<NextMetadata, 'openGraph'> {
    openGraph?: OpenGraph
  }
} 