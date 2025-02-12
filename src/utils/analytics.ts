export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Inizializza Google Analytics
export const initGA = (): void => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('js', new Date().toISOString(), { send_page_view: true })
    window.gtag('config', GA_TRACKING_ID, {
      page_path: window.location.pathname,
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    })
  }
}

// Traccia visualizzazione pagina
export const pageview = (url: string): void => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

type EventParams = {
  [key: string]: string | number | boolean
}

export const trackEvent = (eventName: string, params: EventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', eventName, {
      ...params,
      send_to: GA_TRACKING_ID
    })
  }
} 