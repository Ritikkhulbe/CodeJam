import fs from 'fs'
import { exec } from 'child_process'
import { options as default_options, pLimit } from '..'
import type { Options } from '../lang/cpp'
import { ExecutionResult } from '../../../../shared/types/code'

export async function compile(code: string, options: Options): Promise<ExecutionResult[]> {
  const filename = options.fileName
  const path = `${default_options.outDir}/${filename}.js`

  fs.writeFileSync(path, code)

  if (default_options.stats) {
    console.log(`Code saved to ${path}`)
  }

  // Create a concurrency limiter with a limit of 3
  const limit = pLimit(3)

  // Map each testcase to a promise that resolves to the result of executing the code with that testcase
  const promises = options.testcases.map((testcase) =>
    limit(() => executeJavascriptCode(testcase, path))
  )

  // Wait for all promises to resolve
  const results = await Promise.all(promises)

  if (default_options.stats) {
    console.log('Code executed successfully')
  }

  return results
}

function executeJavascriptCode(input: string, path: string = 'main.js'): Promise<ExecutionResult> {
  return new Promise((resolve, reject) => {
    const start = new Date()
    let errMsg = ''

    const child = exec(`node "${path}"`, (error, stdout, stderr) => {
      if (
        (error && error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1) ||
        stdout.length > 1_00_000
      ) {
        killJavascriptCode()
        errMsg = 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.'
      }

      if (stderr) {
        return reject(stderr)
      }

      resolve({
        output: stdout,
        error: errMsg,
        timing: new Date().getTime() - start.getTime()
      })
    })

    // Set a timeout for the execution
    const timeout = setTimeout(() => {
      child.kill() // This will terminate the process
      killJavascriptCode()
      reject('Execution timed out')
    }, default_options.timeout)

    child.on('exit', () => {
      clearTimeout(timeout)
    })

    child.stdin?.write(input)
    child.stdin?.end()
  })
}

function killJavascriptCode(): void {
  const command = `taskkill /im node.exe /f > nul`

  console.log('EXEC:', command)

  exec(command, (error, _stdout, stderr) => {
    if (error || stderr) {
      console.error(`Error killing process: ${error || stderr}`)
    }
  })
}
