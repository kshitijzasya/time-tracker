import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
//Renderer
const renderer = window.ipcRenderer;
//setting value for interval
var recorder;

const startRecording = _ => {
  console.log('startRecording');
  // recorder = setInterval(_ => {
  //   console.log('start interval')
  //   let time = new Date();
  //   console.log('time', time.getTime())
  // }, 1000)
  renderer.send('tracking:start', 'startRecording');
}

const stopRecording = _ => {
  console.log('stopRecording');
  // console.log(clearInterval(recorder));
  renderer.send('tracking:stop', 'stopRecording');
}

const Recorder = () => {
  // const [recorder, setRecorder] = useState(0);
  // const [interval, updateInterval] = useState(0);

  useEffect(_ => {
    //Set effects for the interval
  }, [])
  return (
    <>
      <div className="container">
        <div className="">
          <p>Screen Capturer</p>
          <Button variant="primary" onClick={startRecording}>Primary</Button>
          <Button variant="danger" onClick={stopRecording}>Primary</Button>
        </div>
      </div>
    </>
  );
};

export default Recorder;
