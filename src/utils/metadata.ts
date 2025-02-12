export const siteMetadata = {
  title: 'Fily Impianti - Configuratore Fotovoltaico',
  description: 'Configuratore online per impianti fotovoltaici. Calcola il tuo preventivo personalizzato per pannelli solari, pompe di calore e sistemi di accumulo.',
  siteUrl: 'https://www.filyimpianti.it',
  author: 'Fily Impianti',
  language: 'it',
  keywords: [
    'fotovoltaico',
    'pannelli solari',
    'pompe di calore',
    'energie rinnovabili',
    'impianti fotovoltaici',
    'configuratore solare',
    'preventivo fotovoltaico',
    'Piemonte',
    'Lombardia',
    'Valle d\'Aosta'
  ],
  social: {
    facebook: 'https://www.facebook.com/filyimpianti',
    instagram: 'https://www.instagram.com/filyimpianti',
    linkedin: 'https://www.linkedin.com/company/fily-impianti'
  }
}

// Definizione delle routes per la sitemap
export const routes = [
  {
    url: '/',
    changeFrequency: 'daily',
    priority: 1.0,
    lastModified: new Date().toISOString()
  },
  {
    url: '/fotovoltaico-aziende',
    changeFrequency: 'weekly',
    priority: 0.8,
    lastModified: new Date().toISOString()
  },
  {
    url: '/blog',
    changeFrequency: 'weekly',
    priority: 0.7,
    lastModified: new Date().toISOString()
  },
  {
    url: '/realizzazioni',
    changeFrequency: 'weekly',
    priority: 0.6,
    lastModified: new Date().toISOString()
  }
] as const 