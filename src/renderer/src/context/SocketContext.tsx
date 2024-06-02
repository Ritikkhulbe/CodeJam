import { useAppDispatch } from '@/app/hooks'
import { setUsers } from '@/features/editor/editorSlice'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { User } from 'src/shared/types/code'

type SocketContextOptions = {
  url: string
  roomId: string
  query: Record<string, string> | undefined
}

type SocketContextType = {
  socket: Socket | null
  setOptions: React.Dispatch<React.SetStateAction<SocketContextOptions>>
}

// Create a context to hold the socket instance
const SocketContext = createContext<SocketContextType>({
  socket: null,
  setOptions: () => {}
})

// Custom hook to access the socket instance from the context
const useSocket = (): SocketContextType => useContext(SocketContext)

type Props = {
  children: React.ReactNode
}

// SocketProvider component to manage the socket instance and provide it through context
const SocketProvider: React.FC<Props> = ({ children }) => {
  // State to store the socket instance
  const [socket, setSocket] = useState<Socket | null>(null)
  const [options, setOptions] = useState({
    url: '',
    roomId: '',
    query: {} as Record<string, string> | undefined
  })

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!socket) {
      return
    }

    socket.on('results', (user: User) => {
      console.log('results', user)
      dispatch(setUsers({ [user.id]: user }))
    })
  }, [socket])

  // Set up the socket connection when the url changes
  useEffect(() => {
    if (socket) {
      socket.disconnect()
    }

    if (options.url !== '') {
      setSocket(io(options.url, { query: options.query }))
    }

    // Clean up the socket connection when the component is unmounted
    return () => {
      socket?.disconnect()
    }
  }, [options])

  return (
    // Provide the socket instance through context to its children
    <SocketContext.Provider value={{ socket, setOptions }}>{children}</SocketContext.Provider>
  )
}

// Export the SocketProvider component and the useSocket hook for other components to use
export { SocketProvider, useSocket }
