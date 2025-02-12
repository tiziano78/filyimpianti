import type { ReactNode } from 'react'
import { StarlinkProvider } from '@/context/StarlinkContext'
import ClientLayout from '@/components/layout/ClientLayout'
import { roboto, orbitron } from './fonts'
import './globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="it" className={`${roboto.variable} ${orbitron.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.mapbox.com" />
      </head>
      <body>
        <StarlinkProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </StarlinkProvider>
      </body>
    </html>
  )
}