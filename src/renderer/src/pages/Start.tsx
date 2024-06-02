import * as React from 'react'

import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Start: React.FC = () => {
  return (
    <div className="h-full grid place-items-center">
      <div>
        <h1 className="text-4xl font-bold mb-8">Who you want to be?</h1>

        <div className="flex justify-around">
          <Button className="w-32" size="lg" asChild>
            <Link to="/create">Create</Link>
          </Button>
          <Button className="w-32" size="lg" asChild>
            <Link to="/join">Join</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Start
