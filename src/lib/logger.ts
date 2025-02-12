import pino from 'pino'
import { BlogError } from './errors'

// Configurazione del logger
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname'
    }
  }
})

// Logger per gli errori
export function logError(error: Error | BlogError, context?: Record<string, any>) {
  if (error instanceof BlogError) {
    logger.error({
      err: error,
      code: error.code,
      statusCode: error.statusCode,
      context: { ...error.context, ...context },
      stack: error.stack
    }, error.message)
  } else {
    logger.error({
      err: error,
      context,
      stack: error.stack
    }, error.message)
  }
}

// Logger per le performance
export function logPerformance(
  operation: string,
  durationMs: number,
  metadata?: Record<string, any>
) {
  logger.info({
    type: 'performance',
    operation,
    durationMs,
    ...metadata
  }, `${operation} completed in ${durationMs}ms`)
}

// Logger per gli eventi di business
export function logBusinessEvent(
  event: string,
  data: Record<string, any>
) {
  logger.info({
    type: 'business',
    event,
    data
  }, `Business event: ${event}`)
}

// Logger per le richieste HTTP
export function logRequest(
  method: string,
  url: string,
  statusCode: number,
  durationMs: number,
  metadata?: Record<string, any>
) {
  const level = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info'
  
  logger[level]({
    type: 'request',
    method,
    url,
    statusCode,
    durationMs,
    ...metadata
  }, `${method} ${url} ${statusCode} - ${durationMs}ms`)
}

// Logger per il monitoraggio della cache
export function logCacheOperation(
  operation: 'hit' | 'miss' | 'set' | 'invalidate',
  key: string,
  durationMs?: number,
  metadata?: Record<string, any>
) {
  logger.debug({
    type: 'cache',
    operation,
    key,
    durationMs,
    ...metadata
  }, `Cache ${operation}: ${key}`)
}

// Logger per le operazioni del CMS
export function logCMSOperation(
  operation: string,
  success: boolean,
  durationMs: number,
  metadata?: Record<string, any>
) {
  const level = success ? 'info' : 'error'
  
  logger[level]({
    type: 'cms',
    operation,
    success,
    durationMs,
    ...metadata
  }, `CMS ${operation} ${success ? 'succeeded' : 'failed'} in ${durationMs}ms`)
}

// Logger per il monitoraggio delle risorse
export function logResourceUsage() {
  const usage = process.memoryUsage()
  
  logger.info({
    type: 'resource',
    memory: {
      heapTotal: Math.round(usage.heapTotal / 1024 / 1024),
      heapUsed: Math.round(usage.heapUsed / 1024 / 1024),
      rss: Math.round(usage.rss / 1024 / 1024)
    }
  }, 'Resource usage stats')
}

// Esporta l'istanza del logger per usi avanzati
export { logger } 