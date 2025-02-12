'use client'

import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Errore nel configuratore:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h3>Ops! Qualcosa è andato storto.</h3>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{ 
              padding: '8px 16px',
              marginTop: '10px',
              borderRadius: '4px',
              border: 'none',
              background: '#007bff',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Riprova
          </button>
        </div>
      )
    }

    return this.props.children
  }
} 