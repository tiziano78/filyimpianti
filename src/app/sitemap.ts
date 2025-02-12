import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.filyimpianti.it'
  
  // Pagine principali
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'daily' as const,
      priority: 1
    },
    {
      url: `${baseUrl}/configuratore`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'daily' as const,
      priority: 1
    },
    {
      url: `${baseUrl}/cer`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.9
    },
    {
      url: `${baseUrl}/conto-termico`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.9
    }
  ]

  // Pagine realizzazioni
  const realizationPages = [
    '/realizzazioni/fotovoltaico',
    '/realizzazioni/solare-termico',
    '/realizzazioni/pompe-calore',
    '/realizzazioni/biomassa'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  // Pagine business
  const businessPages = [
    '/fotovoltaico-aziende'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: 0.9
  }))

  // Articoli del blog
  const blogPosts = [
    '/blog/fotovoltaico-con-accumulo',
    '/blog/pompe-di-calore',
    '/blog/solare-termico',
    '/blog/costo-impianto-fotovoltaico',
    '/blog/conto-termico'
  ].map((post) => ({
    url: `${baseUrl}${post}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }))

  // Pagina principale del blog
  const blogIndex = {
    url: `${baseUrl}/blog`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily' as const,
    priority: 0.8
  }

  return [
    ...mainPages,
    ...realizationPages,
    ...businessPages,
    blogIndex,
    ...blogPosts
  ]
} 