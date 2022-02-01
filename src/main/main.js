const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const screenProcess = require('./process/screenshot');

var screenshotInterval = 1;
var screenCounter = 0;
var counter;
var intervalObject;
var next_counter_interval = 0;

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
  screenshotInterval = 1; 
  runningCounter();
  event.reply('reply', 'pong')
});

function runningCounter() {
  if (screenshotInterval) {
    console.log('starting the process ----', interval)
    startTrackProcess(next_counter_interval);
    next_counter_interval = Math.floor(Math.random() * 10) + 1;
    console.log('next counter interval', next_counter_interval)
    // setTimeout(runningCounter, next_counter_interval * 1000);
    console.log('inside running counter');
  } else {
    console.log('---- stopping the screenshot process ----')
  }  
}

function startTrackProcess(interval = 0) {
  try {
    screenProcess.startTakingScreenshots()
    .then(dataStream => { 
      screenProcess.handleStream(dataStream, interval)
    });
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