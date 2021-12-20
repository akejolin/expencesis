// Native
import { join } from 'path'
import { format } from 'url'

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent } from 'electron'
import isDev from 'electron-is-dev'
import prepareNext from 'electron-next'

import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';


import readFileRowsInArray from './utils/file.read.array'


let mainWindow:BrowserWindow

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  installExtension(REDUX_DEVTOOLS)
  .then(() => null)
  .catch((err) => console.log('Redux extension installation error: ', err));

  // Render Next app
  await prepareNext('./renderer')

  // Create app window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: join(__dirname, 'preload.js'),
    },
  })

  // Open devtools
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  const url = isDev
    ? 'http://localhost:8000/'
    : format({
        pathname: join(__dirname, '../renderer/out/index.html'),
        protocol: 'file:',
        slashes: true,
      })

  mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  console.log(message)
  setTimeout(() => event.sender.send('message', 'hi from electron'), 500)
})


// Open devtools
ipcMain.on('OPEN_DEV_TOOLS', () => {
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }
})


ipcMain.on('REQUEST_DATA', async (event: IpcMainEvent, dataSource:string) => {

  const filePath = `/Users/jonaslinde/data/expenses/${dataSource.toLowerCase().replace(/_/g, '-')}.txt`

  try {
    let rows:Array<string> = await readFileRowsInArray(`${filePath}`)
    let result:Array<Array<number>> = rows.map((row:String) => {
      let _arr = row.split(';').filter(r => r !== '')
      let arr = _arr.map(str => Number(str))
      return arr
    }).filter(r => r.length > 0)

    event.sender.send(`DATA_RESPONSE_${dataSource}`, result)

  } catch(error) {
    throw new Error(`error reading db file: ${filePath}, ${error}`)
  }


})
