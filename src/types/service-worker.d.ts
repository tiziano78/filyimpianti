/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope

interface FetchEvent extends ExtendableEvent {
  request: Request
  respondWith(response: Promise<Response> | Response): void
}

interface ExtendableEvent extends Event {
  waitUntil(fn: Promise<any>): void
}

interface CacheStorage {
  default: Cache
}

interface ServiceWorkerGlobalScope extends WorkerGlobalScope {
  clients: Clients
  registration: ServiceWorkerRegistration
  addEventListener(type: 'fetch', listener: (event: FetchEvent) => void): void
  addEventListener(type: 'install', listener: (event: ExtendableEvent) => void): void
  addEventListener(type: 'activate', listener: (event: ExtendableEvent) => void): void
  addEventListener(type: 'push', listener: (event: PushEvent) => void): void
  addEventListener(type: 'sync', listener: (event: SyncEvent) => void): void
  addEventListener(type: 'message', listener: (event: ExtendableMessageEvent) => void): void
  skipWaiting(): Promise<void>
}

interface PushEvent extends ExtendableEvent {
  data: PushMessageData
}

interface PushMessageData {
  arrayBuffer(): ArrayBuffer
  blob(): Blob
  json(): any
  text(): string
}

interface SyncEvent extends ExtendableEvent {
  tag: string
  lastChance: boolean
}

interface ExtendableMessageEvent extends ExtendableEvent {
  data: any
  source: Client | ServiceWorker | MessagePort | null
  ports: ReadonlyArray<MessagePort>
} 