'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'
import { metadata } from './metadata'
import { trackEvent } from '@/utils/analytics'
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'


interface Article {
  id: string
  title: string
  description: string
  image: string
  blurDataUrl: string
  date: string
  category: string
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
  url: string
}

const articles: Article[] = [
  {
    id: 'fotovoltaico-con-accumulo',
    title: 'Impianti Fotovoltaici con Batterie di Accumulo',
    description: 'Guida completa ai sistemi di accumulo per il fotovoltaico: funzionamento, vantaggi e costi',
    image: '/images/blog/Impianti Fotovoltaici con Batterie di AccumuloFotovoltaico1.webp',
    blurDataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...', // placeholder per l'effetto blur
    date: '15 Gennaio 2024',
    category: 'Fotovoltaico',
    readTime: '8 min',
    schema: {
      "@type": "BlogPosting",
      "headline": "Impianti Fotovoltaici con Batterie di Accumulo",
      "description": "Guida completa ai sistemi di accumulo per il fotovoltaico: funzionamento, vantaggi e costi",
      "image": "https://www.filyimpianti.it/images/blog/Impianti Fotovoltaici con Batterie di AccumuloFotovoltaico1.webp",
      "datePublished": "2024-01-15",
      "author": {
        "@type": "Organization",
        "name": "FILY Impianti"
      }
    },
    url: '/blog/fotovoltaico-con-accumulo'
  },
  {
    id: 'pompe-di-calore',
    title: 'Pompe di Calore: La Guida Completa',
    description: 'Tutto quello che devi sapere sulle pompe di calore: tipologie, efficienza e risparmio',
    image: '/images/blog/pdc2.webp',
    blurDataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...', // placeholder per l'effetto blur
    date: '15 Gennaio 2024',
    category: 'Climatizzazione',
    schema: {
      "@type": "BlogPosting",
      "headline": "Pompe di Calore: La Guida Completa",
      "description": "Tutto quello che devi sapere sulle pompe di calore: tipologie, efficienza e risparmio",
      "image": "https://www.filyimpianti.it/images/blog/pdc2.webp",
      "datePublished": "2024-01-15",
      "author": {
        "@type": "Organization",
        "name": "FILY Impianti"
      }
    },
    url: '/blog/pompe-di-calore'
  },
  {
    id: 'solare-termico',
    title: 'Solare Termico: Riscaldare l\'Acqua con il Sole',
    description: 'Come funziona il solare termico e perché è una scelta vincente per l\'acqua calda',
    image: '/images/blog/Solare Termico Riscaldare l\'Acqua con il SoleSolare Termico1.webp',
    blurDataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...', // placeholder per l'effetto blur
    date: '15 Gennaio 2024',
    category: 'Solare Termico',
    schema: {
      "@type": "BlogPosting",
      "headline": "Solare Termico: Riscaldare l'Acqua con il Sole",
      "description": "Come funziona il solare termico e perché è una scelta vincente per l'acqua calda",
      "image": "https://www.filyimpianti.it/images/blog/Solare Termico Riscaldare l'Acqua con il SoleSolare Termico1.webp",
      "datePublished": "2024-01-15",
      "author": {
        "@type": "Organization",
        "name": "FILY Impianti"
      }
    },
    url: '/blog/solare-termico'
  },
  {
    id: 'costo-impianto-fotovoltaico',
    title: 'Quanto Costa un Impianto Fotovoltaico?',
    description: 'Analisi dettagliata dei costi, incentivi e tempo di rientro dell\'investimento',
    image: '/images/blog/Quanto Costa un Impianto FotovoltaicoFotovoltaico1.webp',
    blurDataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...',
    date: '15 Gennaio 2024',
    category: 'Fotovoltaico',
    schema: {
      "@type": "BlogPosting",
      "headline": "Quanto Costa un Impianto Fotovoltaico?",
      "description": "Analisi dettagliata dei costi, incentivi e tempo di rientro dell'investimento",
      "image": "https://www.filyimpianti.it/images/blog/Quanto Costa un Impianto FotovoltaicoFotovoltaico1.webp",
      "datePublished": "2024-01-15",
      "author": {
        "@type": "Organization",
        "name": "FILY Impianti"
      }
    },
    url: '/blog/costo-impianto-fotovoltaico'
  },
  {
    id: 'comunita-energetiche',
    title: 'Comunità Energetiche Rinnovabili (CER)',
    description: 'Guida alle comunità energetiche: cosa sono, come funzionano e come partecipare',
    image: '/images/blog/Comunità Energetiche Rinnovabili (CER)Energia Rinnovabile1.webp',
    blurDataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...', // placeholder per l'effetto blur
    date: '15 Gennaio 2024',
    category: 'Energia Rinnovabile',
    schema: {
      "@type": "BlogPosting",
      "headline": "Comunità Energetiche Rinnovabili (CER)",
      "description": "Guida alle comunità energetiche: cosa sono, come funzionano e come partecipare",
      "image": "https://www.filyimpianti.it/images/blog/Comunità Energetiche Rinnovabili (CER)Energia Rinnovabile1.webp",
      "datePublished": "2024-01-15",
      "author": {
        "@type": "Organization",
        "name": "FILY Impianti"
      }
    },
    url: '/blog/comunita-energetiche'
  },
  {
    id: 'pannelli-endotermici',
    title: 'Pannelli Endotermici: L\'Innovazione nel Riscaldamento Sostenibile',
    description: 'Scopri come i pannelli endotermici stanno rivoluzionando il settore del riscaldamento sostenibile',
    image: '/images/blog/pannelli endotermici radianti a muro casa interni (1).webp',
    blurDataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...', // placeholder per l'effetto blur
    date: '20 Marzo 2024',
    category: 'Riscaldamento Sostenibile',
    readTime: '10 min',
    schema: {
      "@type": "BlogPosting",
      "headline": "Pannelli Endotermici: L'Innovazione nel Riscaldamento Sostenibile",
      "description": "Scopri come i pannelli endotermici stanno rivoluzionando il settore del riscaldamento sostenibile",
      "image": "https://www.filyimpianti.it/images/blog/pannelli endotermici radianti a muro casa interni (1).webp",
      "datePublished": "2024-03-20",
      "author": {
        "@type": "Organization",
        "name": "FILY Impianti"
      }
    },
    url: '/blog/pannelli-endotermici'
  }
]

const categories = ['Tutti', 'Fotovoltaico', 'Climatizzazione', 'Solare Termico', 'Energia Rinnovabile', 'Riscaldamento Sostenibile']
const ARTICLES_PER_PAGE = 6

// Funzione per condividere sui social
const shareArticle = (platform: string, article: Article) => {
  const url = `https://www.filyimpianti.it${article.url}`
  const text = `${article.title} - ${article.description}`

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(article.title)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
    email: `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`${text} ${url}`)}`
  }

  window.open(shareUrls[platform as keyof typeof shareUrls], '_blank')
  trackEvent('article_share', { platform, article_id: article.id })
}

// Newsletter signup component
const NewsletterSignup = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore durante l\'iscrizione');
      }
      
      setStatus('success')
      setEmail('')
      trackEvent('newsletter_signup', { location: 'blog' })
    } catch (error) {
      console.error('Errore iscrizione newsletter:', error)
      setStatus('error')
    }
  }

  return (
    <div className={styles.newsletter}>
      <h3>📬 Resta Aggiornato</h3>
      <p>Iscriviti alla nostra newsletter per ricevere le ultime novità</p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="newsletter-email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="La tua email"
          required
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Iscrizione in corso...' : 'Iscriviti'}
        </button>
      </form>
      
      {status === 'success' && (
        <p className={styles.success}>Grazie per l'iscrizione!</p>
      )}
      {status === 'error' && (
        <p className={styles.error}>Si è verificato un errore. Riprova più tardi.</p>
      )}
    </div>
  )
}

// Funzione per trovare articoli correlati
const getRelatedArticles = (article: Article, allArticles: Article[]): Article[] => {
  return allArticles.filter(a => 
    a.id !== article.id && 
    a.category === article.category
  ).slice(0, 3)
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tutti')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  // Tracking della visualizzazione della pagina
  useEffect(() => {
    trackEvent('blog_view', {
      page_number: currentPage,
      category: selectedCategory,
      has_search: !!searchQuery
    })
  }, [currentPage, selectedCategory, searchQuery])

  // Gestione del loading
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [selectedCategory, searchQuery])

  const filteredArticles = useMemo(() => {
    let filtered = articles

    if (selectedCategory !== 'Tutti') {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [selectedCategory, searchQuery])

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE)

  const currentArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
    return filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE)
  }, [filteredArticles, currentPage])

  const handleCategoryChange = (category: string) => {
    trackEvent('category_filter', { category })
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    trackEvent('search_query', { query: value })
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handleArticleClick = (articleId: string) => {
    trackEvent('article_click', { 
      article_id: articleId,
      from_category: selectedCategory,
      from_search: !!searchQuery
    })
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Blog FILYIMPIANTI',
        page_path: '/blog'
      })
    }
  }, [])

  return (
    <div className={styles.blogContainer}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Blog FILY Impianti",
            "description": "Guide complete e approfondimenti sul mondo delle energie rinnovabili",
            "publisher": {
              "@type": "Organization",
              "name": "FILY Impianti",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.filyimpianti.it/logo.webp"
              }
            },
            "blogPost": articles.map(article => article.schema)
          })
        }}
      />

      <header className={styles.header}>
        <h1>📚 Blog FILY Impianti</h1>
        <p>Scopri le ultime novità sul mondo dell'energia sostenibile</p>
      </header>

      <nav className={styles.categories}>
        <ul>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </ul>
      </nav>

      <div className={styles.searchBar}>
        <input
          type="text"
          id="blog-search"
          name="blog-search"
          placeholder="🔍 Cerca articoli..."
          value={searchQuery}
          onChange={handleSearch}
          className={styles.searchInput}
          role="searchbox"
          aria-label="Cerca articoli nel blog"
        />
      </div>

      <div className={`${styles.blogGrid} ${isLoading ? styles.loading : ''}`}>
        {currentArticles.map((article) => (
          <Link 
            href={article.url} 
            key={article.id}
            className={styles.article}
            onClick={() => handleArticleClick(article.id)}
          >
            <div className={styles.imageContainer}>
              <Image
                src={article.image}
                alt={article.title}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <span className={styles.category}>{article.category}</span>
            </div>
            <div className={styles.content}>
              <h2 className={styles.title}>{article.title}</h2>
              <p className={styles.excerpt}>{article.description}</p>
              <div className={styles.meta}>
                <time>📅 {article.date}</time>
                <span className={styles.readTime}>⏱️ {article.readTime} min</span>
              </div>
              <span className={styles.readMore}>
                Leggi di più ➜
              </span>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? styles.active : ''}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            ▶
          </button>
        </div>
      )}

      <NewsletterSignup />
    </div>
  )
}