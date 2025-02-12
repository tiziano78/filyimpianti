'use client'

import { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'
import CookieBanner from '../CookieBanner/CookieBanner'

interface ClientLayoutProps {
  children: ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname() ?? '' // Evita errori se undefined
  const isBusinessPage = pathname.includes('fotovoltaico-aziende')
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    // Verifica se i font sono caricati
    document.fonts.ready.then(() => {
      setFontsLoaded(true)
    })
  }, [])

  return (
    <div className={`layout-container ${fontsLoaded ? 'fonts-loaded' : 'font-loading'}`}>
      {!isBusinessPage && <Navbar />}
      <main>{children}</main>
      <Footer />
      <CookieBanner />
    </div>
  )
}
