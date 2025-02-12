'use client'

import type { ReactNode } from 'react'
import { StarlinkProvider } from '@/context/StarlinkContext'
import Navbarbus from './Navbarbus'

interface BusinessLayoutProps {
  children: ReactNode
}

export default function BusinessLayout({ children }: BusinessLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbarbus />
      <main className="flex-grow">{children}</main>
    </div>
  )
} 