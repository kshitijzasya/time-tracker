import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
// const { ipcRenderer } = window.require('electron')

const sendMessage = _ => { console.log(window.ipcRenderer)
  window.ipcRenderer.send('tracking:start',(event, arg) => {
    console.log('event: ', event)
  })
}

const Recorder = () => {
  useEffect(_ => {
    console.log('ipc', window.ipcRenderer);
    console.log('require',window.require("electron"))
  },[])
  return (
    <>
      <div className="container">
        <div className="">
          <p>Recorder</p>
          <Button variant="primary" onClick={sendMessage}>Primary</Button>
          <button className="btn px-4 py-4">Click me to take screenshot</button>
        </div>
      </div>
    </>
  );
};

export default Recorder;
