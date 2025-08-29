import { WebSocketServer, WebSocket } from 'ws'
import { promises as fs } from 'fs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'mock-db.json')
const wss = new WebSocketServer({
  port: 8080,
  // Disable per-message deflate compression. This prevents the server from
  // trying to use native addons like `bufferutil`, which can cause crashes
  // in some development environments like the one in Next.js.
  perMessageDeflate: false,
})

let dbState: Record<string, unknown> = {}

// Read the initial state from the file system.
const loadInitialState = async () => {
  try {
    const data = await fs.readFile(dbPath, 'utf-8')
    dbState = JSON.parse(data)
    console.log('✅ Mock DB state loaded from', dbPath)
  }
  catch (error) {
    const nodeError = error as NodeJS.ErrnoException
    if (nodeError.code === 'ENOENT') {
      console.log('ℹ️ No mock DB file found, starting with empty state.')
    }
    else {
      console.error('❌ Failed to read mock DB file:', error)
    }
  }
}

const persistState = async () => {
  try {
    await fs.writeFile(dbPath, JSON.stringify(dbState, null, 2))
  }
  catch (error) {
    console.error('❌ Failed to write mock DB file:', error)
  }
}

wss.on('connection', (ws) => {
  console.log('🔌 Mock DB client connected')

  ws.on('message', (message) => {
    const { type, payload } = JSON.parse(message.toString())

    switch (type) {
      case 'GET_ITEM': {
        const { key } = payload
        const value = dbState[key]
        ws.send(
          JSON.stringify({
            type: 'GET_ITEM_SUCCESS',
            payload: { key, value },
          }),
        )
        break
      }
      case 'SET_ITEM': {
        const { key, value } = payload
        dbState[key] = value
        persistState()

        // Broadcast the update to all other connected clients
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: 'STATE_UPDATED',
                payload: { key, value },
              }),
            )
          }
        })

        ws.send(JSON.stringify({ type: 'SET_ITEM_SUCCESS', payload: { key } }))
        break
      }
    }
  })

  ws.on('close', () => {
    console.log('🔌 Mock DB client disconnected')
  })
})

loadInitialState().then(() => {
  console.log('🚀 Mock WebSocket server listening on ws://localhost:8080')
})
