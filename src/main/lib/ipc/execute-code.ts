import { ipcMain as ipc } from 'electron'
import { init, cpp, java, python, javascript, typescript } from '../compiler'
import { ExecutionResult, SupportedLanguages } from '../../../shared/types/code'

init({ stats: true })

interface ExecuteCodeEvent {
  language: SupportedLanguages
  code: string
  testcases: string[]
}

async function executeCode(
  code: string,
  testcase: string[],
  language: SupportedLanguages
): Promise<ExecutionResult[]> {
  if (language === 'cpp') {
    return cpp.compile(code, {
      fileName: 'cppmain',
      testcases: testcase
    })
  }

  if (language === 'java') {
    return java.compile(code, {
      fileName: 'Main',
      testcases: testcase
    })
  }

  if (language === 'python') {
    return python.compile(code, {
      fileName: 'main',
      testcases: testcase
    })
  }

  if (language === 'javascript') {
    return javascript.compile(code, {
      fileName: 'main',
      testcases: testcase
    })
  }

  if (language === 'typescript') {
    return typescript.compile(code, {
      fileName: 'main',
      testcases: testcase
    })
  }

  return []
}

ipc.handle('execute-code', async (_event, args: ExecuteCodeEvent) => {
  return await executeCode(args.code, args.testcases, args.language)
})
