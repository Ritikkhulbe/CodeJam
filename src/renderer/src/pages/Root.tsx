import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import React from 'react'

const Root: React.FC = () => {
  return (
    <div className="grid place-items-center h-full">
      <div>
        <Button asChild size="lg" className="w-32 mr-2">
          <Link to="/start">Start</Link>
        </Button>
      </div>
    </div>
  )
}

export default Root
