import express from 'express'
import http from 'http'

import { Server } from 'socket.io'
import { connectUser } from './socket/user'

const app = express()

// Socket.io
const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

export type IO = ReturnType<typeof io.of>

io.on('connection', (socket) => {
  // Registering socket events
  connectUser(io, socket)
})

// Routes
app.get('/', (_req, res) => {
  res.send('Server is running!')
})

app.post('/login', (req, res) => {
  const { username, password } = req.body

  console.log(username, password)
  res.send('Logged in!')
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})
