// Funzione di utilità per ottenere variabili d'ambiente
function getEnvVar(key: string): string {
  const value = process.env[key]
  if (!value) {
    // Valori di fallback per development
    const fallbackValues: Record<string, string> = {
      NEXT_PUBLIC_GOOGLE_ANALYTICS: 'G-XC5QMSHZKQ',
      NEXT_PUBLIC_GOOGLE_MAPS_ID: '5af6c7812c55ed29',
      NEXT_PUBLIC_API_URL: 'http://localhost:3000',
      NODE_ENV: 'development'
    }

    if (key in fallbackValues) {
      return fallbackValues[key]
    }

    throw new Error(`Environment variable ${key} is not defined`)
  }
  return value
}

export { getEnvVar }

const MAPBOX_STYLE = 'mapbox://styles/mapbox/satellite-streets-v12'

export const config = {
  env: {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test'
  },
  api: {
    baseUrl: getEnvVar('NEXT_PUBLIC_API_URL')
  },
  mapbox: {
    token: getEnvVar('NEXT_PUBLIC_MAPBOX_TOKEN'),
    style: MAPBOX_STYLE
  },
  googleMaps: {
    id: getEnvVar('NEXT_PUBLIC_GOOGLE_MAPS_ID')
  },
  analytics: {
    googleAnalyticsId: getEnvVar('NEXT_PUBLIC_GOOGLE_ANALYTICS')
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
    user: process.env.SMTP_USER,
    recipientEmail: process.env.RECIPIENT_EMAIL
  }
} as const

export const mapboxConfig = {
  token: getEnvVar('NEXT_PUBLIC_MAPBOX_TOKEN'),
  style: MAPBOX_STYLE
}