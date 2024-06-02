import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import { useAppDispatch } from '@/app/hooks'
import { setQuestion, setUsers } from '@/features/editor/editorSlice'
import { useSocket } from '@/context/SocketContext'

import { Question } from '../../../shared/types/questions'
import { User } from 'src/shared/types/code'

const Join: React.FC = () => {
  const [inviteLink, setInviteLink] = React.useState('' as string)
  const [username, setUsername] = React.useState('' as string)
  const { socket, setOptions: setSocketOptions } = useSocket()

  const dispatch = useAppDispatch()
  const navigator = useNavigate()

  React.useEffect(() => {
    if (socket) {
      socket.once('start', (question: Question, users: Record<string, User>) => {
        dispatch(setQuestion(question))
        dispatch(setUsers(users))
        navigator('/coding')
      })
    }
  }, [socket])

  function joinChallenge(): void {
    const data = JSON.parse(atob(inviteLink.split('/').pop()!)) as { ip: string; room: string }

    if (!socket) {
      setSocketOptions({
        url: data.ip,
        roomId: data.room,
        query: { username }
      })
    }
  }

  return (
    <div className="h-full grid place-items-center">
      <div className="max-w-md w-full space-y-4">
        <h1 className="text-4xl font-bold mb-8">Join a Challenge</h1>

        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="invite-link">Invite Link</Label>
          <Input
            id="invite-link"
            type="text"
            placeholder="coc://invite/XXXXXXXXXXXXXXXX"
            value={inviteLink}
            onChange={(e) => setInviteLink(e.target.value)}
          />
        </div>

        <div className="mt-3 text-end space-x-2">
          <Button className="w-20" variant="secondary" onClick={() => history.back()}>
            Back
          </Button>
          <Button className="w-20" onClick={joinChallenge}>
            Join
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Join
