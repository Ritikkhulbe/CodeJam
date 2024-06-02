import * as React from 'react'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GearIcon, CodeIcon, TokensIcon, KeyboardIcon, RocketIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { EditorSettingsType, setEditorSettings } from '@/features/editor/editorSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { initialState } from '@/features/editor/editorSlice'

const EditorSettings: React.FC = () => {
  const [data, setData] = React.useState<EditorSettingsType>(initialState.settings)

  const [open, setOpen] = React.useState(false)
  const editor = useAppSelector((state) => state.editor.settings)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    setData(editor)
  }, [editor])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    dispatch(setEditorSettings(data))
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <GearIcon />
        </Button>
      </DialogTrigger>
      <DialogContent
        // @ts-ignore: `--background` is css variable
        style={{ '--background': '0 0% 3.9%' }}
        className="p-0 max-w-screen-md h-[450px]"
      >
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="appearance" orientation="vertical" className="flex h-full">
            <DialogHeader className="px-4 py-6 w-56 shrink-0 border-r bg-neutral-900">
              <DialogTitle className="mb-4">Settings</DialogTitle>

              <TabsList className="bg-transparent h-auto px-0 flex flex-col gap-3">
                <TabsTrigger value="appearance" asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <TokensIcon className="mr-2" />
                    Appearance
                  </Button>
                </TabsTrigger>
                <TabsTrigger value="editor" asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <CodeIcon className="mr-2" />
                    Code Editor
                  </Button>
                </TabsTrigger>
                <TabsTrigger value="shotcuts" asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <KeyboardIcon className="mr-2" />
                    Shotcuts
                  </Button>
                </TabsTrigger>
                <TabsTrigger value="advanced" asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <RocketIcon className="mr-2" />
                    Advanced
                  </Button>
                </TabsTrigger>
              </TabsList>
            </DialogHeader>

            <TabsContent value="appearance" asChild className="mt-0">
              <div className="flex flex-col gap-4 p-6 pt-16 h-full w-full">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={data.theme}
                    onValueChange={(value) => setData({ ...data, theme: value })}
                  >
                    <SelectTrigger id="theme" className="col-span-3">
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="default">default</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="editor" asChild className="mt-0">
              <div className="flex flex-col gap-4 p-6 pt-16 h-full w-full">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="font-size">Font size</Label>
                  <Input
                    id="font-size"
                    className="col-span-3"
                    type="number"
                    value={data.fontSize}
                    min={12}
                    max={24}
                    onChange={(e) => setData({ ...data, fontSize: parseInt(e.target.value) })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tab-size">Tab size</Label>
                  <Select
                    value={data.tabSize.toString()}
                    onValueChange={(value) => setData({ ...data, tabSize: parseInt(value) })}
                  >
                    <SelectTrigger id="tab-size" className="col-span-3">
                      <SelectValue placeholder="Select Tab size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="2">2 spaces</SelectItem>
                        <SelectItem value="4">4 spaces</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="minimap">Minimap</Label>
                  <Switch
                    id="minimap"
                    checked={data.minimap}
                    onCheckedChange={(value) => setData({ ...data, minimap: value })}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="absolute bottom-6 right-6">
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditorSettings
