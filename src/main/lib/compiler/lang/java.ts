import fs from 'fs'
import { exec } from 'child_process'
import { options as default_options, pLimit } from '..'
import { basename, dirname } from 'path'

import type { Options } from '../lang/cpp'
import type { ExecutionResult } from '../../../../shared/types/code'

export async function compile(code: string, options: Options): Promise<ExecutionResult[]> {
  const dir = `${default_options.outDir}/${options.fileName}`
  const path = `${dir}/Main.java`
  const out = `${dir}/Main.class`

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(path, code)

  if (default_options.stats) {
    console.log(`Code saved to ${path}`)
  }

  await compileJavaCode(path)

  if (default_options.stats) {
    console.log(`Code compiled successfully`)
  }

  // Create a concurrency limiter with a limit of 3
  const limit = pLimit(3)

  // Map each testcase to a promise that resolves to the result of executing the code with that testcase
  const promises = options.testcases.map((testcase) => limit(() => executeJavaCode(testcase, out)))

  // Wait for all promises to resolve
  const results = await Promise.all(promises)

  if (default_options.stats) {
    console.log('Code executed successfully')
  }

  return results
}

function compileJavaCode(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`javac "${path}"`, (error, stdout, stderr) => {
      if (error) {
        reject(`Compilation error: ${error.message}\n${stderr}`)
      } else if (stderr) {
        reject(`Compilation error: ${stderr}`)
      } else {
        resolve(stdout)
      }
    })
  })
}

function executeJavaCode(input: string, path: string): Promise<ExecutionResult> {
  return new Promise((resolve, reject) => {
    const start = new Date()
    let errMsg = ''
    const child = exec(
      `cd ${dirname(path)} & java "${basename(path).replace('.class', '')}"`,
      (error, stdout, stderr) => {
        if (
          (error && error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1) ||
          stderr ||
          stdout.length > 1_00_000
        ) {
          errMsg = 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.'
        }

        resolve({
          output: stdout,
          error: errMsg,
          timing: new Date().getTime() - start.getTime()
        })
      }
    )

    // Set a timeout for the execution
    const timeout = setTimeout(() => {
      child.kill() // This will terminate the process
      killJavaCode()
      reject('Execution timed out')
    }, default_options.timeout)

    child.on('exit', () => {
      clearTimeout(timeout) // Clear the timeout if the process exits before the timeout
    })

    child.stdin?.write(input)
    child.stdin?.end()
  })
}

function killJavaCode(): void {
  const command = `taskkill /im java.exe /f > nul`

  console.log('EXEC:', command)

  exec(command, (error, _stdout, stderr) => {
    if (error || stderr) {
      console.error(`Error killing process: ${error || stderr}`)
    }
  })
}
