import * as React from 'react'

import { useNavigate } from 'react-router-dom'
import { CopyIcon } from '@radix-ui/react-icons'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import { useAppDispatch } from '@/app/hooks'
import { setQuestion, setUsers } from '@/features/editor/editorSlice'
import { useSocket } from '@/context/SocketContext'

import type { Question } from '../../../shared/types/questions'
import { User } from 'src/shared/types/code'

type Participant = {
  username: string
  msg: string
}

const Create: React.FC = () => {
  const [link, setLink] = React.useState('')
  const [participants, setParticipants] = React.useState([] as Participant[])
  const { socket, setOptions: setSocketOptions } = useSocket()

  const dispatch = useAppDispatch()
  const navigator = useNavigate()

  const copyToClipboard = (): void => {
    window.navigator.clipboard.writeText(link)
  }

  function startChallenge(): void {
    socket?.emit('start')
  }

  React.useEffect(() => {
    const roomId = 'room'

    window.electron.ipcRenderer //
      .invoke('get-ip')
      .then((ip: string) => {
        const obj = { ip: ip, room: roomId }
        setLink(`coc://invite/${btoa(JSON.stringify(obj))}`)
      })

    if (!socket) {
      setSocketOptions({
        url: 'http://localhost:3000',
        roomId: roomId,
        query: { username: 'Admin' }
      })
    }
  }, [])

  React.useEffect(() => {
    socket?.once('start', (question: Question, users: Record<string, User>) => {
      dispatch(setQuestion(question))
      dispatch(setUsers(users))
      navigator('/coding')
    })

    socket?.on('join', (data) => {
      setParticipants((prev) => [...prev, data])
    })

    return () => {
      socket?.off('join')
    }
  }, [socket])

  return (
    <div className="h-full grid place-items-center">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold mb-8">Create a Challenge</h1>

        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link">Invite Link</Label>
            <Input id="link" value={link} readOnly />
          </div>
          <Button type="submit" size="icon" className="mt-auto" onClick={copyToClipboard}>
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-3 text-end space-x-2">
          <Button className="w-20" variant="secondary" onClick={() => history.back()}>
            Back
          </Button>
          <Button className="w-20" onClick={startChallenge}>
            Start
          </Button>
        </div>

        <div className="mt-8">
          <h3 className="font-bold mb-4">Participants</h3>
          {participants.map((participant, index) => (
            <p key={index}>{participant.username}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Create
