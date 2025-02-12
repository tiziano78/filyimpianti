import { unstable_cache } from 'next/cache'
import { Article } from '@/types/blog'

const CACHE_TAG_ARTICLES = 'articles'
const CACHE_TAG_ARTICLE = 'article'
const CACHE_REVALIDATE_TIME = 3600 // 1 ora

// Cache per la lista degli articoli
export async function getCachedArticles() {
  return unstable_cache(
    async () => {
      // TODO: Implementa la chiamata al CMS
      return [] as Article[]
    },
    ['articles-list'],
    {
      tags: [CACHE_TAG_ARTICLES],
      revalidate: CACHE_REVALIDATE_TIME
    }
  )()
}

// Cache per un singolo articolo
export async function getCachedArticle(slug: string) {
  return unstable_cache(
    async () => {
      // TODO: Implementa la chiamata al CMS
      return null as Article | null
    },
    [`article-${slug}`],
    {
      tags: [CACHE_TAG_ARTICLE, `article-${slug}`],
      revalidate: CACHE_REVALIDATE_TIME
    }
  )()
}

// Cache per i tag
export async function getCachedTags() {
  return unstable_cache(
    async () => {
      const articles = await getCachedArticles()
      const tags = new Set<string>()
      
      articles.forEach(article => {
        article.tags?.forEach(tag => tags.add(tag))
      })
      
      return Array.from(tags).sort()
    },
    ['tags-list'],
    {
      tags: [CACHE_TAG_ARTICLES],
      revalidate: CACHE_REVALIDATE_TIME
    }
  )()
}

// Cache per le categorie
export async function getCachedCategories() {
  return unstable_cache(
    async () => {
      const articles = await getCachedArticles()
      const categories = new Set<string>()
      
      articles.forEach(article => {
        categories.add(article.category)
      })
      
      return Array.from(categories).sort()
    },
    ['categories-list'],
    {
      tags: [CACHE_TAG_ARTICLES],
      revalidate: CACHE_REVALIDATE_TIME
    }
  )()
}

// Cache per gli articoli correlati
export async function getCachedRelatedArticles(articleId: string, limit = 3) {
  return unstable_cache(
    async () => {
      const articles = await getCachedArticles()
      const currentArticle = articles.find(a => a.id === articleId)
      
      if (!currentArticle) return []

      const relatedByCategory = articles.filter(a => 
        a.id !== articleId && 
        a.category === currentArticle.category
      )

      const relatedByTags = articles.filter(a => 
        a.id !== articleId && 
        a.tags && currentArticle.tags &&
        a.tags.some(tag => currentArticle.tags?.includes(tag))
      )

      const combined = [...new Set([...relatedByCategory, ...relatedByTags])]
      return combined.slice(0, limit)
    },
    [`related-${articleId}`],
    {
      tags: [CACHE_TAG_ARTICLES, CACHE_TAG_ARTICLE],
      revalidate: CACHE_REVALIDATE_TIME
    }
  )()
} 