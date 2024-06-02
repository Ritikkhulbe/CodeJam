export type SupportedLanguages = 'cpp' | 'java' | 'python' | 'javascript' | 'typescript'
export type TestcaseStatus = 'success' | 'failed' | 'pending'
export type TestcaseModes = 'sample' | 'custom' | 'hidden'

export type TestcaseMessage = {
  id: number
  message: string
  status: TestcaseStatus
  timing: string
}

export type ExecutionResult = {
  output: string
  error: string
  timing: number
}

export type User = {
  id: string
  username: string
  score: number
  startTime: number
  endTime: number
}