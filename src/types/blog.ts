export interface Article {
  id: string
  title: string
  description: string
  content?: string
  image: string
  blurDataUrl: string
  date: string
  category: string
  tags?: string[]
  readTime?: string
  schema: {
    "@type": "BlogPosting"
    headline: string
    description: string
    image: string
    datePublished: string
    author: {
      "@type": "Organization"
      name: string
    }
  }
}

export interface Comment {
  id: string
  author: string
  content: string
  date: string
  replies?: Comment[]
} 