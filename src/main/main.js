const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const screenProcess = require('./process/screenshot');

var screenshotInterval = 1;
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
      contextIsolation: true
    }
  })
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

app.on('activate', () => { 
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


//Listener
ipcMain.handle('tracking', (event, arg) => {
  if ( arg === 'start' ) {
    screenshotInterval = 1; 
    runningCounter(event);
  } else if( arg === 'stop' ) {
    console.log(`---- Stop process ----`)
    screenshotInterval = 0;
  }
  return "reply"
});

function runningCounter(event) {
  if (screenshotInterval) {
    //Starting the track process
    startTrackProcess(event, next_counter_interval);
    next_counter_interval = Math.floor(Math.random() * 10) + 1;
    //Starting tracking loop untill stopped
    setTimeout(runningCounter, next_counter_interval * 1000, event);
  } else {
    //handling the stop event
  }  
}

function startTrackProcess(event, interval = 0) {
  try {
    //Starting the screenshot process
    screenProcess.startTakingScreenshots()
    .then(dataStream => { 
      //handle data stram to create image and upload to aws
      screenProcess.handleStream(dataStream, interval)
      .then(response => {  
        //Send location and interval to the main process
        event.sender.send('tracking', {...response, type: 'update'});
      })
    })
    .catch(err => {
      throw new Error('Error in screenshot process')
    });
  } catch (e) {
    console.log('error in setimmediate', e)
  }
}


//Handle unhandled rejections
process.on('unhandledRejection', (reason, p) => {
  console.log('unhandled rejection: ', reason);
  //send in the calvary
  return
})