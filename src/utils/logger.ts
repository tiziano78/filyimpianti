import winston from 'winston'
import { Logtail } from '@logtail/node'
import { LogtailTransport } from '@logtail/winston'

// Configurazione Logtail per ambienti di produzione
const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN || '')

// Formato personalizzato per i log
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
  winston.format.prettyPrint()
)

// Configurazione logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports: [
    // Log su file in ambiente di produzione
    ...(process.env.NODE_ENV === 'production' 
      ? [
          new winston.transports.File({ 
            filename: 'logs/error.log', 
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
          }),
          new winston.transports.File({ 
            filename: 'logs/combined.log',
            maxsize: 5242880,
            maxFiles: 5,
          }),
          new LogtailTransport(logtail)
        ]
      : [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.simple()
            )
          })
        ]
    )
  ]
})

// Middleware per logging delle richieste HTTP
export const requestLogger = (req: any, res: any, next: any) => {
  const start = Date.now()
  
  res.on('finish', () => {
    const duration = Date.now() - start
    logger.info('HTTP Request', {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration,
      userAgent: req.headers['user-agent']
    })
  })
  
  next()
}

export default logger 