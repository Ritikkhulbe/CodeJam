import { Server, Socket } from 'socket.io'
import questions from '../questions/01.json'
import { User } from '../../shared/types/code'

const users = new Map<string, User>()

function mapToObject(map: Map<string, User>): Record<string, User> {
  const entries = Array.from(map.entries())

  const obj = entries.reduce(
    (acc, [key, value]) => {
      acc[key] = value
      return acc
    },
    {} as Record<string, User>
  )

  return obj
}

export function connectUser(io: Server, socket: Socket): void {
  const username = socket.handshake.query.username as string
  console.log(`connect ${username} (${socket.id})`)
  io.emit('join', { username, msg: 'joined the challenge' })

  if (!users.has(socket.id)) {
    users.set(socket.id, {
      id: socket.id,
      username,
      score: 0,
      startTime: 0,
      endTime: 0
    })
  }

  socket.on('start', function () {
    users.forEach((user) => {
      user.score = 0
      user.startTime = Date.now()
      user.endTime = 0
    })

    const question = questions[Math.floor(Math.random() * questions.length)]
    io.emit('start', question, mapToObject(users))
  })

  socket.on('submit', (data) => {
    console.log('submit', socket.id, data)
    const user = users.get(socket.id)

    if (!user) {
      return console.log('[submit] user not found of id:', socket.id)
    }

    user.score = data.score
    user.endTime = Date.now()
    io.emit('results', user)
  })

  socket.on('disconnect', (reason) => {
    console.log(`disconnect ${username} (${socket.id}) due to ${reason}`)
  })
}
