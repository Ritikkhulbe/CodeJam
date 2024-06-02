import './execute-code'

import * as ip from '../ip'
import { ipcMain as ipc } from 'electron'

ipc.handle('get-ip', () => {
  const result = ip.get()

  if (!result.WiFi) {
    return new Error('No IP address found')
  }

  return `http://${result.WiFi}:3000`
})
