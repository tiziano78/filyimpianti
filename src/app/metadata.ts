import { Metadata } from 'next'

const defaultMetadata: Metadata = {
  title: {
    default: 'FILYIMPIANTI - Soluzioni Fotovoltaiche per Aziende nel Nord Ovest',
    template: '%s | FILYIMPIANTI'
  },
  description: 'Leader nelle soluzioni fotovoltaiche per aziende in Piemonte, Lombardia, Liguria e Valle d\'Aosta. Massimizza il risparmio energetico con incentivi statali e regionali.',
  keywords: [
    'fotovoltaico aziendale',
    'impianti industriali',
    'energia solare business',
    'incentivi fotovoltaico',
    'risparmio energetico aziende',
    'Piemonte',
    'Lombardia',
    'Liguria',
    'Valle d\'Aosta'
  ],
  authors: [{ name: 'FILYIMPIANTI' }],
  creator: 'FILYIMPIANTI',
  publisher: 'FILYIMPIANTI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://filyimpianti.it'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'FILYIMPIANTI - Soluzioni Fotovoltaiche per Aziende',
    description: 'Massimizza il risparmio energetico della tua azienda con soluzioni fotovoltaiche personalizzate e incentivi statali.',
    url: 'https://filyimpianti.it',
    siteName: 'FILYIMPIANTI',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FILYIMPIANTI - Soluzioni Fotovoltaiche per Aziende',
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FILYIMPIANTI - Soluzioni Fotovoltaiche per Aziende',
    description: 'Massimizza il risparmio energetico della tua azienda con soluzioni fotovoltaiche personalizzate e incentivi statali.',
    images: ['/images/twitter-image.jpg'],
    creator: '@filyimpianti',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
  category: 'energia solare',
}

export default defaultMetadata 