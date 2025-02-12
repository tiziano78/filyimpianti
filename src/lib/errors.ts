export class BlogError extends Error {
  public statusCode: number
  public code: string
  public context?: Record<string, any>

  constructor(message: string, statusCode = 500, code = 'INTERNAL_ERROR', context?: Record<string, any>) {
    super(message)
    this.name = 'BlogError'
    this.statusCode = statusCode
    this.code = code
    this.context = context
  }
}

export class ArticleNotFoundError extends BlogError {
  constructor(slug: string) {
    super(
      `Articolo non trovato: ${slug}`,
      404,
      'ARTICLE_NOT_FOUND',
      { slug }
    )
    this.name = 'ArticleNotFoundError'
  }
}

export class CMSConnectionError extends BlogError {
  constructor(originalError: Error) {
    super(
      'Errore di connessione al CMS',
      503,
      'CMS_CONNECTION_ERROR',
      { originalError: originalError.message }
    )
    this.name = 'CMSConnectionError'
  }
}

export class ImageProcessingError extends BlogError {
  constructor(imagePath: string, originalError: Error) {
    super(
      `Errore durante l'elaborazione dell'immagine: ${imagePath}`,
      500,
      'IMAGE_PROCESSING_ERROR',
      { 
        imagePath,
        originalError: originalError.message 
      }
    )
    this.name = 'ImageProcessingError'
  }
}

export class ValidationError extends BlogError {
  constructor(field: string, message: string) {
    super(
      `Errore di validazione: ${message}`,
      400,
      'VALIDATION_ERROR',
      { field }
    )
    this.name = 'ValidationError'
  }
}

export function handleError(error: Error): BlogError {
  if (error instanceof BlogError) {
    return error
  }

  // Converti errori noti in BlogError
  if (error.message.includes('ECONNREFUSED')) {
    return new CMSConnectionError(error)
  }

  if (error.message.includes('not found')) {
    return new ArticleNotFoundError(error.message)
  }

  // Errore generico
  return new BlogError(
    'Si è verificato un errore imprevisto',
    500,
    'INTERNAL_ERROR',
    { originalError: error.message }
  )
}

export function isOperationalError(error: Error): boolean {
  if (error instanceof BlogError) {
    // Errori operazionali sono quelli che ci aspettiamo possano accadere
    return [404, 400, 403].includes(error.statusCode)
  }
  return false
}

// Validatori
export function validateArticle(data: any): void {
  if (!data.title) {
    throw new ValidationError('title', 'Il titolo è obbligatorio')
  }
  if (!data.content) {
    throw new ValidationError('content', 'Il contenuto è obbligatorio')
  }
  if (!data.category) {
    throw new ValidationError('category', 'La categoria è obbligatoria')
  }
}

export function validateComment(data: any): void {
  if (!data.author?.trim()) {
    throw new ValidationError('author', 'Il nome dell\'autore è obbligatorio')
  }
  if (!data.content?.trim()) {
    throw new ValidationError('content', 'Il contenuto del commento è obbligatorio')
  }
  if (data.content.length > 1000) {
    throw new ValidationError('content', 'Il commento non può superare i 1000 caratteri')
  }
} 