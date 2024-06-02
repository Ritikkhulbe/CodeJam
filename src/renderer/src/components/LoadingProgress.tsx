import * as React from 'react'

import { Progress } from '@/components/ui/progress'

export default function LoadingProgress(): JSX.Element {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <span className="mb-3">
        Loading
        <span className="animate-pulse duration-700">.</span>
        <span className="animate-pulse duration-700 delay-100">.</span>
        <span className="animate-pulse duration-700 delay-200">.</span>
      </span>
      <Progress value={progress} className="w-[60%] max-w-screen-sm" />
    </div>
  )
}
