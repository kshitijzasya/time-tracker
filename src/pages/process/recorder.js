import React, { useEffect } from "react";
import { Button } from "react-bootstrap";

const renderer = window.ipcRenderer;

const sendMessage = _ => { 
  let data = renderer.send('tracking','start');
  console.log('data', data);
}

const Recorder = () => {
  useEffect(_ => {
    // console.log('ipc', window.ipcRenderer);
    // console.log('require',window.require("electron"))
    renderer.on('tracking:response',(event, arg) => {
      console.log('response for tracking')
    })
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
