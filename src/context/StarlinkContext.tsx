'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface StarlinkContextType {
  isOpen: boolean
  openStarlinkPopup: () => void
  closeStarlinkPopup: () => void
}

const StarlinkContext = createContext<StarlinkContextType | null>(null)

export function StarlinkProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openStarlinkPopup = () => {
    console.log('Opening popup from context')
    setIsOpen(true)
  }

  const closeStarlinkPopup = () => {
    setIsOpen(false)
  }

  return (
    <StarlinkContext.Provider value={{ isOpen, openStarlinkPopup, closeStarlinkPopup }}>
      {children}
    </StarlinkContext.Provider>
  )
}

export function useStarlink() {
  const context = useContext(StarlinkContext)
  if (!context) {
    throw new Error('useStarlink must be used within a StarlinkProvider')
  }
  return context
} 