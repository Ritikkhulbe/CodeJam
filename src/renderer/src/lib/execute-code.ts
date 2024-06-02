import { ExecutionResult } from 'src/shared/types/code'

function runSampleCode(
  code: string,
  testcases: string[],
  language: string
): Promise<ExecutionResult[]> {
  return window.api.execute({ code, testcases, language })
}

function validateTestcase(
  //
  user_output: string,
  sample_output: string
): boolean {
  user_output = user_output.trim()
  sample_output = sample_output.trim()

  console.log('user_output', [user_output])
  console.log('sample_output', [sample_output])

  if (user_output === sample_output) {
    return true
  }

  const regex = /[\n\r]/g
  const custom_filter = (line: string): boolean => line.trim() !== ''

  const arr1 = user_output.split(regex).filter(custom_filter)
  const arr2 = sample_output.split(regex).filter(custom_filter)

  if (arr1.length !== arr2.length) {
    return false
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].trim() !== arr2[i].trim()) {
      return false
    }
  }

  return true
}

export { runSampleCode, validateTestcase }
