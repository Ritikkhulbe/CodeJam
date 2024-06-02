import React from 'react'

import { useAppSelector } from '@/app/hooks'
import { Button } from '@/components/ui/button'

function msToTime(duration: number): string {
  const seconds = Math.floor((duration / 1000) % 60)
  const minutes = Math.floor((duration / (1000 * 60)) % 60)
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  const hoursDisplay = hours > 0 ? (hours < 10 ? '0' : '') + hours + ':' : ''
  const minutesDisplay = (minutes < 10 ? '0' : '') + minutes + ':'
  const secondsDisplay = (seconds < 10 ? '0' : '') + seconds

  return hoursDisplay + minutesDisplay + secondsDisplay
}

const Results: React.FC = () => {
  const users = Object.values(useAppSelector((state) => state.editor.users))
  console.log(users)

  return (
    <div className="h-full grid place-items-center">
      <div className="max-w-xl w-full min-h-96">
        <h1 className="text-4xl font-bold mb-8">Results</h1>

        <ul className="space-y-3">
          {users
            .filter((user) => user.endTime !== 0)
            .sort((a, b) => {
              if (a.score !== b.score) {
                return a.score - b.score
              }

              return a.endTime - a.startTime - (b.endTime - b.startTime)
            })
            .map((user, index) => (
              <li
                key={index}
                className="bg-primary/5 px-3 py-2 rounded border flex justify-between"
              >
                <div>
                  <b>#{index + 1} </b>
                  <span>{user.username}</span>
                </div>
                <div className="flex text-right">
                  <div className="w-16">{user.score}%</div>
                  <div className="w-16">{msToTime(user.endTime - user.startTime)}ms</div>
                </div>
              </li>
            ))}
        </ul>

        {/* Pending Participants */}

        <h5 className="text-lg font-semibold mt-8 mb-4">Pending Participants</h5>

        <ul className="space-y-3">
          {users
            .filter((user) => user.endTime === 0)
            .map((user, index) => (
              <li
                key={index}
                className="bg-primary/5 px-3 py-2 rounded border flex justify-between"
              >
                <div>
                  <b>-- </b>
                  <span>{user.username}</span>
                </div>
                <h5>Coding...</h5>
              </li>
            ))}
        </ul>

        <div className="ml-auto mt-3 w-min">
          <Button onClick={() => window.history.back()}>Go back</Button>
        </div>
      </div>
    </div>
  )
}

export default Results
