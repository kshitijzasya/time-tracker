import React, { useState, useEffect } from 'react';
import {
    Col,
    Button
} from 'react-bootstrap';

//Renderer
const renderer = window.ipc;

const startRecordingProcess = async _ => {
    //Invoking an event -- return  a promise
    let reply = await renderer.invoke('tracking', { type: 'start' })
}

const stopRecordingProcess = async _ => {
    //Invoking an event -- return  a promise
    await renderer.invoke('tracking', { type: 'stop' });
    // await renderer.removeAllListeners('tracking')
}

export default ({isRecording, setIsRecording}) => {

    function startRecording() {
        startRecordingProcess()
        setIsRecording(true)
    }

    function stopRecording() {
        stopRecordingProcess();
        setIsRecording(false);
    }

    return (
        <Col xs={8} md={8} className="text-right py-2">
            {
                isRecording
                    ?
                    <Button variant="light" data-toggle="buttons" onClick={stopRecording}><i className="fa fa-stop fa-2x" aria-hidden="true"></i></Button>
                    :
                    <Button variant="light" className="float-right" data-toggle="buttons" onClick={startRecording}><i className="fa fa-play fa-2x" aria-hidden="true"></i></Button>
            }

        </Col>
    )
}