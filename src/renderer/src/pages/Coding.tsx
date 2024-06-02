import React from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import Markdown from '@/components/Editor/Markdown'
import CodeEditor from '@/components/Editor/CodeEditor'
import Testcase from '@/components/Editor/Testcase'
import { EditorProvider } from '@/context/EditorContext'

const Coding: React.FC = () => {
  return (
    <EditorProvider>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={40}>
          <Markdown />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70}>
              <CodeEditor />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={30}>
              <Testcase />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </EditorProvider>
  )
}

export default Coding
