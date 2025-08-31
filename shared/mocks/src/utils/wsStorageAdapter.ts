import { type StorageAdapter } from './persist'

const WS_ENDPOINT = 'ws://localhost:8080'

type WsMessage = {
  type: string
  payload: {
    key: string
    value?: unknown
  }
}

/**
 * An adapter that uses a WebSocket connection to synchronize the mock DB state.
 * Both the browser and server MSW instances will use this to communicate with
 * the central WebSocket server.
 */
export const createWebSocketStorage = (): StorageAdapter => {
  let ws: WebSocket | null = null
  let isConnecting = false
  const requestQueue: Array<() => void> = []
  const pendingRequests = new Map<string, (value: string | null) => void>()

  const connect = (): Promise<WebSocket> => {
    return new Promise((resolve) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        return resolve(ws)
      }

      if (isConnecting) {
        requestQueue.push(() => resolve(ws!))
        return
      }

      isConnecting = true

      const WebSocketImpl = (typeof window !== 'undefined' ? window.WebSocket : require('ws')) as typeof WebSocket
      const newWs = new WebSocketImpl(WS_ENDPOINT)

      newWs.onopen = () => {
        ws = newWs
        isConnecting = false
        resolve(ws)
        requestQueue.forEach(cb => cb())
        requestQueue.length = 0
      }

      newWs.onmessage = (event) => {
        const { type, payload } = JSON.parse(event.data.toString()) as WsMessage
        const { key, value } = payload

        if (type === 'GET_ITEM_SUCCESS') {
          const resolveFunc = pendingRequests.get(key)
          if (resolveFunc) {
            if (typeof resolveFunc === 'function') {
              resolveFunc(value ? JSON.stringify(value) : null)
            }
            else {
              console.warn(`Expected pendingRequests entry for key "${key}" to be a function, got:`, resolveFunc)
            }
            pendingRequests.delete(key)
          }
        }
      }

      newWs.onerror = (err) => {
        console.error('Mock WebSocket connection error:', err)
        isConnecting = false
      }
    })
  }

  return {
    async getItem(key: string): Promise<string | null> {
      const socket = await connect()
      return new Promise((resolve) => {
        pendingRequests.set(key, resolve)
        socket.send(JSON.stringify({ type: 'GET_ITEM', payload: { key } }))
      })
    },
    async setItem(key: string, value: string): Promise<void> {
      const socket = await connect()
      socket.send(
        JSON.stringify({
          type: 'SET_ITEM',
          payload: { key, value: JSON.parse(value) },
        }),
      )
    },
  }
}
