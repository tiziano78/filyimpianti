export interface OGImage {
  url: string | URL
  width?: number
  height?: number
  alt?: string
  type?: string
  secureUrl?: string
}

export interface TwitterMetadata {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player'
  site?: string
  creator?: string
  title?: string
  description?: string
  images?: string[]
}

export interface OpenGraphMetadata {
  title?: string
  description?: string
  url?: string
  siteName?: string
  images?: OGImage[] | string[]
  locale?: string
  type?: string
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
}

export interface BlogMetadata {
  title?: string
  description?: string
  keywords?: string[]
  openGraph?: OpenGraphMetadata
  twitter?: TwitterMetadata
  alternates?: {
    canonical?: string
  }
} 