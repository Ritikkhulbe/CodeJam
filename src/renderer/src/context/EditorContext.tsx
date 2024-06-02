import * as React from 'react'
import type { SupportedLanguages, TestcaseModes, User } from 'src/shared/types/code'

type EditorContextType = {
  mode: TestcaseModes
  language: SupportedLanguages
  setState: React.Dispatch<React.SetStateAction<EditorContextType>>
  users: Array<User>
  setEditorOptions: (options: Partial<EditorContextType>) => void
}

const initialState: EditorContextType = {
  mode: 'sample',
  language: localStorage.language || 'javascript',
  users: [],
  setState: () => {},
  setEditorOptions: () => {}
}

// Create a context to hold the code editor's states
const EditorContext = React.createContext<EditorContextType>(initialState)

// Custom hook to access the code editor's states from the context
const useEditor = (): EditorContextType => React.useContext(EditorContext)

type Props = {
  children: React.ReactNode
}

const EditorProvider: React.FC<Props> = ({ children }) => {
  const [state, setState] = React.useState<EditorContextType>(initialState)

  function setEditorOptions(options: Partial<EditorContextType>): void {
    setState((prev) => ({ ...prev, ...options }))
  }

  return (
    <EditorContext.Provider value={{ ...state, setState, setEditorOptions }}>
      {children}
    </EditorContext.Provider>
  )
}

// Export the EditorProvider component and the useEditor hook for other components to use
export { EditorProvider, useEditor }
