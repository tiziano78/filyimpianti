import type { ConsentType } from '@/types/consent'

export interface ConsentOptions {
  necessaryCookies: boolean;
  functionalCookies: boolean;
  analyticalCookies: boolean;
  marketingCookies: boolean;
}

interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CONSENT_KEY = 'cookie-consent'

/**
 * Salva il consenso dei cookie sia in localStorage che nei cookie
 */
export const setConsent = (
  consent: ConsentType,
  options: ConsentOptions
): void => {
  console.log('[CONSENT] Tentativo di salvare il consenso:', consent)
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      consent,
      options,
      timestamp: new Date().toISOString()
    }))
    console.log('[CONSENT] Salvato in localStorage')
    
    // Salva come cookie
    const expiryDate = new Date()
    expiryDate.setFullYear(expiryDate.getFullYear() + 1)
    document.cookie = `${CONSENT_KEY}=${JSON.stringify({ consent, options })};expires=${expiryDate.toUTCString()};path=/`
    console.log('[CONSENT] Salvato come cookie con scadenza:', expiryDate)
    
    // Log del consenso per analytics
    logConsent(consent)
  } catch (error) {
    console.error('[CONSENT] Errore nel salvare il consenso:', error)
  }
}

/**
 * Registra il consenso per analytics
 */
export const logConsent = (type: 'accepted' | 'rejected'): void => {
  console.log('[CONSENT] Tentativo di log analytics:', type)
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': type === 'accepted' ? 'granted' : 'denied'
      })
      console.log('[CONSENT] Analytics aggiornato')
    } else {
      console.log('[CONSENT] Analytics non disponibile')
    }
  } catch (error) {
    console.error('[CONSENT] Errore nel log analytics:', error)
  }
}

/**
 * Verifica se il consenso è già stato dato
 */
export const hasConsent = (): boolean => {
  console.log('[CONSENT] Verifica consenso...')
  try {
    const consent = localStorage.getItem(CONSENT_KEY)
    if (!consent) return false
    
    const { status, timestamp } = JSON.parse(consent)
    const consentDate = new Date(timestamp)
    const now = new Date()
    
    // Il consenso scade dopo 6 mesi
    const sixMonthsInMs = 180 * 24 * 60 * 60 * 1000
    if (now.getTime() - consentDate.getTime() > sixMonthsInMs) {
      localStorage.removeItem(CONSENT_KEY)
      return false
    }
    
    return status === 'accepted'
  } catch (error) {
    console.error('[CONSENT] Errore nel controllo consenso:', error)
    return false
  }
}

export const getConsentOptions = (): ConsentOptions | null => {
  try {
    const consent = localStorage.getItem(CONSENT_KEY)
    if (!consent) return null
    
    const { options } = JSON.parse(consent)
    return options
  } catch (error) {
    console.error('[CONSENT] Errore nel recupero delle opzioni di consenso:', error)
    return null
  }
}

export const clearConsent = (): void => {
  try {
    localStorage.removeItem(CONSENT_KEY)
  } catch (error) {
    console.error('[CONSENT] Errore nella rimozione del consenso:', error)
  }
}

export function getConsent(): ConsentPreferences | null {
  try {
    const consent = localStorage.getItem(CONSENT_KEY);
    return consent ? JSON.parse(consent) : null;
  } catch (error) {
    console.error('[CONSENT] Errore nel recupero del consenso:', error);
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  const consent = getConsent();
  return !!consent?.analytics;
}

export function hasMarketingConsent(): boolean {
  const consent = getConsent();
  return !!consent?.marketing;
}

// Funzione per verificare se è necessario mostrare il banner
export function shouldShowBanner(): boolean {
  return !getConsent();
}

// Funzione per inizializzare i servizi in base al consenso
export function initializeServices(): void {
  const consent = getConsent();
  
  if (consent?.analytics) {
    // Inizializza servizi analytics (es. Google Analytics)
    initializeAnalytics();
  }
  
  if (consent?.marketing) {
    // Inizializza servizi marketing (es. Facebook Pixel)
    initializeMarketing();
  }
}

function initializeAnalytics(): void {
  // Implementa l'inizializzazione di Google Analytics
  // window.gtag('config', 'GA-ID', { anonymize_ip: true });
}

function initializeMarketing(): void {
  // Implementa l'inizializzazione di servizi marketing
  // es. Facebook Pixel, LinkedIn Insight Tag, etc.
}