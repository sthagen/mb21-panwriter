import { contextBridge, ipcRenderer } from 'electron'

export type IpcApi = typeof ipcApi

const ipcApi = {
  sendFormat: (format: unknown) => {
    if (typeof format === 'string') {
      ipcRenderer.send('sendFormat', format)
    }
  }
}

contextBridge.exposeInMainWorld('ipcApi', ipcApi)
