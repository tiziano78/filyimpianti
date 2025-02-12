import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Costanti per la configurazione
export const CSRF_HEADER_NAME = 'X-CSRF-Token'
export const CSRF_COOKIE_NAME = 'csrf-token'
export const CSRF_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/'
}

// Funzioni di utilità
export async function generateToken(): Promise<string> {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function verifyToken(token: string, storedToken: string): Promise<boolean> {
  if (!token || !storedToken) {
    return false
  }
  
  try {
    return await timingSafeEqual(token, storedToken)
  } catch {
    return false
  }
}

async function timingSafeEqual(a: string, b: string): Promise<boolean> {
  if (a.length !== b.length) {
    return false
  }

  const encoder = new TextEncoder()
  const aBuffer = encoder.encode(a)
  const bBuffer = encoder.encode(b)

  // Usa Web Crypto API per una comparazione time-safe
  const key = await crypto.subtle.generateKey(
    { name: 'HMAC', hash: 'SHA-256' },
    true,
    ['sign']
  )

  const aSignature = await crypto.subtle.sign('HMAC', key, aBuffer)
  const bSignature = await crypto.subtle.sign('HMAC', key, bBuffer)

  if (aSignature.byteLength !== bSignature.byteLength) {
    return false
  }

  const aArray = new Uint8Array(aSignature)
  const bArray = new Uint8Array(bSignature)

  let result = 0
  for (let i = 0; i < aArray.length; i++) {
    result |= aArray[i] ^ bArray[i]
  }
  return result === 0
}

export function getCsrfToken(): string {
  if (typeof document === 'undefined') return ''
  return document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || ''
}

// Middleware
export async function csrfMiddleware(request: NextRequest) {
  // Ignora le richieste non-mutative
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    return NextResponse.next()
  }

  try {
    // Verifica il token CSRF
    const csrfToken = request.headers.get(CSRF_HEADER_NAME)
    const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value

    if (!csrfToken || !cookieToken || !await verifyToken(csrfToken, cookieToken)) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      )
    }

    // Genera un nuovo token per la prossima richiesta
    const newToken = await generateToken()
    const response = NextResponse.next()

    // Imposta il nuovo token nel cookie
    response.cookies.set(CSRF_COOKIE_NAME, newToken, CSRF_COOKIE_OPTIONS)

    return response
  } catch (error) {
    console.error('CSRF validation error:', error)
    return NextResponse.json(
      { error: 'CSRF validation failed' },
      { status: 403 }
    )
  }
}