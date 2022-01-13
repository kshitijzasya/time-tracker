const { app, BrowserWindow } = require('electron');

function createWindow() {
    //Create browser window
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreference: {
            nodeIntegration: true
        }
    })

    //Load the index.html from a url
    win.loadURL('http://localhost:3000');

    //open dev tools
    win.webContents.openDevTools(); 
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

//quit on all windows are close
app.on('window-all-closed', ()=> {
    if(process.platform !== 'darwin') {
        app.quit()
    }   
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if(BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})
