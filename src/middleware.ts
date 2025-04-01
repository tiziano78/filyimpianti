import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { csrfMiddleware } from './middleware/csrf'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Applica il middleware CSRF solo alle route API
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return csrfMiddleware(request)
  }

  // Imposta gli header di sicurezza
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  )

  // Imposta la Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google-analytics.com *.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: *.tile.openstreetmap.org *.google-analytics.com *.googletagmanager.com; font-src 'self' data: blob:; connect-src 'self' *.google-analytics.com *.googletagmanager.com api.mapbox.com events.mapbox.com; worker-src 'self' blob:; base-uri 'self'; form-action 'self';"
  )

  // Imposta gli header di cache
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|gif|png|webp|svg|css|js)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  } else {
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, must-revalidate'
    )
  }

  // Imposta gli header di compressione
  response.headers.set('Accept-Encoding', 'br, gzip')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 