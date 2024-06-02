import { ipcRenderer } from 'electron'
import type { ExecutionResult, TestcaseMessage } from '../../shared/types/code'
import type { Testcase } from '../../shared/types/questions'

export type Options = {
  language: 'cpp' | 'java' | string
  code: string
  testcases: string[]
}

export async function execute(options: Partial<Options>): Promise<ExecutionResult[]> {
  const r = await ipcRenderer.invoke('execute-code', options)
  console.log(r)
  return r
}

export type CustomTestcaseOptions = {
  solution: Omit<Options, 'testcases'>
  user_answer: Omit<Options, 'testcases'>
  testcases: string[]
}

export async function executeCustom(options: CustomTestcaseOptions): Promise<{
  sample_output: string[]
  user_output: string[]
}> {
  console.log(options)
  const soln = await execute({ ...options.solution, testcases: options.testcases })
  const user_soln = await execute({ ...options.user_answer, testcases: options.testcases })

  console.log(soln, user_soln)
  return {
    sample_output: soln.map((e) => e.output || e.error),
    user_output: user_soln.map((e) => e.output || e.error)
  }
}

type TestcaseOptions = {
  language: string
  code: string
  testcases: Testcase
}

// TODO: Implement
export async function runTestcases(
  options: Partial<TestcaseOptions>
): Promise<Array<TestcaseMessage>> {
  return await ipcRenderer.invoke('execute-testcase', options)
}
