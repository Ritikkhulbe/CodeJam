import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import CustomizeProfile from '@/components/CustomizeProfile'

const Login: React.FC = () => {
  const [data, setData] = useState({
    username: ''
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { id, value } = e.target
    setData((prev) => ({ ...prev, [id]: value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-semibold leading-9 tracking-tight text-primary">
          Clash of Code Account Setup
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <CustomizeProfile />

          <div>
            <Label htmlFor="name">Profile Name</Label>
            <div className="mt-2">
              <Input
                id="username"
                type="text"
                required
                value={data.username}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Let&apos;s Code
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          &copy; 2024{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Blank-09"
            className="text-primary font-semibold hover:underline"
          >
            Blank-09
          </a>
          . All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Login
