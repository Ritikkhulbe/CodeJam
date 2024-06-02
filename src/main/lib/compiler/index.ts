import fs from 'fs'
import p from 'p-limit'

export let pLimit: typeof p = null!
;(async (): Promise<void> => {
  pLimit = (await import('p-limit')).default
})()

export type CompilerOptions = {
  stats: boolean
  outDir: string
  timeout: number
}

export let options: CompilerOptions = {
  stats: false,
  timeout: 30_000,
  outDir: './tmp'
}

export function init(custom_options: Partial<CompilerOptions>): void {
  //
  options = { ...options, ...custom_options }

  if (!fs.existsSync(options.outDir)) {
    fs.mkdirSync(options.outDir)
  }
}

export * as cpp from './lang/cpp'
export * as java from './lang/java'
export * as python from './lang/python'
export * as javascript from './lang/javascript'
export * as typescript from './lang/typescript'
