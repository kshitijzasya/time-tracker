const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const screenProcess = require('./process/screenshot');

var screenshotInterval = 1;

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Time Tracker",
    // frame: false, // remove the window frame
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      // enableRemoteModule:true,
      contextIsolation: false
    }
  })
  console.log('dirnme', path.join(__dirname, 'preload.js'))
  //load the index.html from a url
  win.loadURL('http://localhost:3000');

  // Open the DevTools.
  win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () { createWindow() })

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => { console.log('env', process.env.API_URL)
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


//Listener
ipcMain.on('tracking:start', (event, arg) => {
  console.log('first screenshto', screenshotInterval);
  startTrackProcess();
  event.reply('reply', 'pong')
});

async function startTrackProcess() {
  try {
    await screenProcess.startTakingScreenshots();
  } catch (e) {
    console.log('error in setimmediate', e)
  }
}

ipcMain.on('tracking:stop', (event, arg) => {
  console.log('stoping', arg);
  screenshotInterval = 0;
  event.returnValue = 'yes';
});


//Handle unhandled rejections
process.on('unhandledRejection', (reason, p) => {
  console.log('unhandled rejection: ', reason);
  //send in the calvary
  return
})