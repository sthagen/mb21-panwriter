import { BrowserWindow, ipcMain } from 'electron'
import { Result } from '../../src/result'

export const showModalWindow = <T>(parent: BrowserWindow): Promise<Result<T>> => {
  const modal = new BrowserWindow({
    height: 280
  , modal: true
  , parent
  , resizable: false
  , show: false
  , width: 300
  , webPreferences: {
      preload: __dirname + '/../preload.js'
    , sandbox: true
    }
  })
  if (!!process.env.ELECTRON_IS_DEV) {
    modal.loadURL('http://localhost:3000/index.html?modal=chooseFormat')
  } else {
    modal.loadURL(`file://${__dirname}/index.html?modal=chooseFormat`)
  }

  return new Promise<Result<T>>(resolve => {
    modal.once('ready-to-show', () => {
      modal.show()
      ipcMain.on('chooseFormat', (_event, format: T) => {
        resolve(format)
      })
    })
    modal.once('closed', () => {
      resolve({ error: 'window was closed' })
    })
  })
}
