import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { Pencil1Icon, ReloadIcon } from '@radix-ui/react-icons'
import { MinidenticonImg } from './MinidenticonImg'

type Data = {
  background: string
  gradientLeft: string
  gradientRight: string
  degree: number[]
  saturation: number[]
  lightness: number[]
  seed: number
}

const CustomizeProfile: React.FC = () => {
  const [data, setData] = useState<Data>({
    background: '#ffffff',
    gradientLeft: '#ff0080',
    gradientRight: '#8400ff',
    degree: [145],
    saturation: [95],
    lightness: [45],
    seed: 4527285729
  })

  // const [data, setData] = useState({
  //   background: '#0d1117',
  //   gradientLeft: '#2090d5',
  //   gradientRight: '#00ff6e',
  //   degree: [145],
  //   saturation: [96],
  //   lightness: [74],
  //   seed: 818875041
  // })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { id, value } = e.target
    setData((prev) => ({ ...prev, [id]: value }))
  }

  function reloadProfileImage(): void {
    setData((prev) => ({ ...prev, seed: Math.floor(Math.random() * 1_000_000_000) }))
  }

  return (
    <div>
      <div className="flex items-end">
        <div
          className="mx-auto w-auto rounded-full p-[6px]"
          style={{
            background: `linear-gradient(${data.degree}deg, ${data.gradientLeft}, ${data.gradientRight})`
          }}
        >
          <Label htmlFor="profile-img" className="cursor-pointer relative">
            <div className="bg-background rounded-full overflow-hidden relative ring-4 ring-background">
              <MinidenticonImg
                className="mx-auto h-24 w-24 object-cover object-center"
                style={{ background: data.background }}
                seed={data.seed.toString()}
                saturation={data.saturation[0]}
                lightness={data.lightness[0]}
              />
            </div>
          </Label>
        </div>

        <div className="flex flex-col space-y-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Pencil1Icon />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-80 bg-background">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Palette</h4>
                  <p className="text-sm text-muted-foreground">Customize your profile.</p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="background">Background</Label>
                    <Input
                      id="background"
                      type="color"
                      className="col-span-2 h-8"
                      value={data.background}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label>Border</Label>
                    <Input
                      id="gradientLeft"
                      type="color"
                      className="col-span-1 h-8"
                      value={data.gradientLeft}
                      onChange={handleChange}
                    />
                    <Input
                      id="gradientRight"
                      type="color"
                      className="col-span-1 h-8"
                      value={data.gradientRight}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4 h-8">
                    <Label htmlFor="height">Angle</Label>
                    <Slider
                      id="height"
                      min={0}
                      max={360}
                      step={1}
                      value={data.degree}
                      onValueChange={(value) => setData((prev) => ({ ...prev, degree: value }))}
                      className="col-span-2"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4 h-8">
                    <Label htmlFor="maxWidth">Saturation</Label>
                    <Slider
                      id="maxWidth"
                      min={0}
                      max={100}
                      step={1}
                      value={data.saturation}
                      onValueChange={(value) => setData((prev) => ({ ...prev, saturation: value }))}
                      className="col-span-2"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4 h-8">
                    <Label htmlFor="height">Lightness</Label>
                    <Slider
                      id="height"
                      min={0}
                      max={100}
                      step={1}
                      value={data.lightness}
                      onValueChange={(value) => setData((prev) => ({ ...prev, lightness: value }))}
                      className="col-span-2"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button size="icon" variant="outline" type="button" onClick={reloadProfileImage}>
            <ReloadIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CustomizeProfile
