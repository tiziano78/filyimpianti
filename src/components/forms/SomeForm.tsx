'use client'

import { useEffect, useState } from 'react'
import { getCsrfToken } from '@/middleware/csrf'

export default function SomeForm() {
  const [csrfToken, setCsrfTokenState] = useState('')

  useEffect(() => {
    setCsrfTokenState(getCsrfToken())
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const data = new FormData()
    data.append('_csrf', csrfToken)
    
    const response = await fetch('/api/some-endpoint', {
      method: 'POST',
      body: data
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="_csrf" value={csrfToken} />
      {/* altri campi del form */}
    </form>
  )
} 