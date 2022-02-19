//Global setting renderer
// window.ipcRenderer = require('electron').ipcRenderer;
const { ipcRenderer, contextBridge } = require('electron');
const validChannels = ['tracking', 'close'];

contextBridge.exposeInMainWorld(
    'ipc',
    {
        send:(channel, data) => { console.log('inside send', {channel, data})
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data)
            }
        },
        sendSync:(channel, data) => {
            if (validChannels.includes(channel)) {
                ipcRenderer.sendSync(channel, data)
            }
        },
        on: (channel, callback) => {
            if (validChannels.includes(channel)) {
                const newCallback = (_, data) => callback(data);
                ipcRenderer.on(channel, newCallback)
            }
        },
        invoke: (channel, data) => {
            if (validChannels.includes(channel)){
                ipcRenderer.invoke(channel, data)
            }
        },
        removeAllListeners: (channel) => {
            ipcRenderer.removeAllListeners(channel)
        }
    }
);