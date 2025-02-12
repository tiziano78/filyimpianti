import { Redis, RedisOptions } from 'ioredis'
import logger from './logger'

// Configurazione Redis
const redisConfig: RedisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD,
  retryStrategy: (times: number): number => {
    const delay = Math.min(times * 50, 2000)
    return delay
  }
}

const redis = new Redis(redisConfig)

redis.on('error', (error: Error) => {
  logger.error('Redis connection error:', error)
})

export interface CacheOptions {
  ttl?: number // Time to live in seconds
  prefix?: string
}

export class Cache {
  private prefix: string

  constructor(options: CacheOptions = {}) {
    this.prefix = options.prefix || 'cache:'
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(this.getKey(key))
      return data ? JSON.parse(data) : null
    } catch (error: unknown) {
      logger.error('Cache get error:', error instanceof Error ? error.message : error)
      return null
    }
  }

  async set(key: string, value: unknown, ttl?: number): Promise<void> {
    try {
      const serialized = JSON.stringify(value)
      if (ttl) {
        await redis.setex(this.getKey(key), ttl, serialized)
      } else {
        await redis.set(this.getKey(key), serialized)
      }
    } catch (error: unknown) {
      logger.error('Cache set error:', error instanceof Error ? error.message : error)
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await redis.del(this.getKey(key))
    } catch (error: unknown) {
      logger.error('Cache delete error:', error instanceof Error ? error.message : error)
    }
  }

  async flush(): Promise<void> {
    try {
      const keys = await redis.keys(`${this.prefix}*`)
      if (keys.length > 0) {
        await redis.del(...keys)
      }
    } catch (error: unknown) {
      logger.error('Cache flush error:', error instanceof Error ? error.message : error)
    }
  }
}

export default new Cache() 