'use client'

import React from 'react'
import { logError } from '@/utils/monitoring'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

/**
 * ErrorBoundary Component
 * Cattura e gestisce gli errori nell'applicazione React
 * 
 * Features:
 * - Cattura errori in componenti figli
 * - Mostra UI fallback user-friendly
 * - Logga errori al sistema di monitoraggio
 * - Supporta reset dello stato
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log dettagliato dell'errore
    logError('React Error Boundary Caught', {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      },
      componentStack: errorInfo.componentStack || undefined,
      timestamp: new Date().toISOString()
    })
  }

  private handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Qualcosa è andato storto
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Ci scusiamo per l'inconveniente. Il nostro team è stato notificato.
              </p>
            </div>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
              <button
                onClick={this.handleReset}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Riprova
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
} 