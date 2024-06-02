import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Question } from '../../../../shared/types/questions'
import { User } from 'src/shared/types/code'

export type EditorSettingsType = {
  theme: string
  fontSize: number
  tabSize: number
  autoComplete: boolean
  minimap: boolean
}

// Define a type for the slice state
export interface EditorState {
  code: string
  custom_input: boolean
  question: Question
  testcases: Array<string>
  settings: EditorSettingsType
  users: Record<string, User>
  output: Array<{
    sample: string
    result: string
  }>
}

// Define the initial state using that type
export const initialState: EditorState = {
  code: '',
  testcases: [''],
  output: [],
  users: {},
  custom_input: false,
  question: {
    input_format: '',
    output_format: '',
    question: '',
    sample_io: [],
    testcases: [],
    solution: []
  },
  settings: {
    theme: 'default',
    fontSize: 16,
    tabSize: 4,
    autoComplete: true,
    minimap: false
  }
}

export const editorSlice = createSlice({
  name: 'editor',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload
    },
    setTestcases: (state, action: PayloadAction<Array<string>>) => {
      state.testcases = action.payload
    },
    setOutput: (state, action: PayloadAction<Array<{ sample: string; result: string }>>) => {
      state.output = action.payload
    },
    setUsers: (state, action: PayloadAction<Record<string, User>>) => {
      state.users = { ...state.users, ...action.payload }
    },
    setEditorSettings: (state, action: PayloadAction<Partial<EditorSettingsType>>) => {
      state.settings = { ...state.settings, ...action.payload }
    },
    setQuestion: (state, action: PayloadAction<Question>) => {
      state.question = action.payload
      state.testcases = action.payload.sample_io.map((t) => t.input)
    }
  }
})

export const { setCode, setQuestion, setTestcases, setOutput, setEditorSettings, setUsers } =
  editorSlice.actions

export default editorSlice.reducer
