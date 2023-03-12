'use strict'

import { app, ipcMain, protocol, BrowserWindow } from 'electron'
import {
  createProtocol
  // installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
// import path from 'path'
// import fs from 'fs'
// import Datastore from 'nedb'
const isDevelopment = process.env.NODE_ENV !== 'production'

// const timerDb = new Datastore({
//   filename: path.join(app.getPath("userData"), "timer.db"),
//   autoload: true,
//   timerstampData: true,
// })
// const globalAny: any = global;
// globalAny.db = timerDb;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// using cpu is better, without artifacts/burn-ins and is faster
app.disableHardwareAcceleration()

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      secure: true,
      standard: true
    }
  }
])

async function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
      // spellcheck: true
    },
    transparent: true,
    frame: false,
    acceptFirstMouse: true,
    hasShadow: false
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      // await installVueDevtools()
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  // createWindow()
  setTimeout(function () {
    createWindow()
  }, 10)
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// https://www.electronjs.org/docs/api/browser-window#winsetalwaysontopflag-level-relativelevel
// https://www.electronjs.org/docs/api/ipc-main
// const {
//   ipcMain
// } = require('electron')
ipcMain.on('resize', (event, arg) => {
  if (arg) {
    win.setSize(1000, 800)
    win.setAlwaysOnTop(false)
  } else {
    win.setSize(300, 185)
    // win.setSize(300, 150)
    win.setAlwaysOnTop(true)
  }
})
