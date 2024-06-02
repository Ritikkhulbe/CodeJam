import { ElectronAPI } from '@electron-toolkit/preload'
import * as execute from './api/execute-code'

declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof execute
  }
}
