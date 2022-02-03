import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Col
} from "react-bootstrap";
import { AuthLayout } from '../../components/layouts/basic';
import authentication from '../../../helpers/authentication'; 
import { Link, useParams } from "react-router-dom";

//Renderer
const renderer = window.ipcRenderer;

const Recorder = () => {
  //Project-Id
  var id = useParams().id;
  const [ isRecording, setIsRecording ] = useState(false);

  async function startRecording(){
    //Invoking an event -- return  a promise
    renderer.invoke('tracking:start', 'startRecording')
    .then(r => console.log('response', r))
    .catch(err => console.log('err', err))
   
    setIsRecording(true);
    
  }
  renderer.on('tracking:reply', (event, arg) => {
    console.log('---- inside reply the event ----', arg)
  })

  async function stopRecording(){
    await renderer.invoke('tracking:stop', '');
    setIsRecording(false)
  }
  useEffect(_ => {
    console.log('----- inside useEffect -----', isRecording)
    console.log('project id: ', id || 3);
    console.log('customer id: ', authentication.userId || 77);
    //Set effects for the interval
  }, [])
  return (
    <>
        <Row className="text-center">
          <p>Screen Capturer</p>
        </Row>
        <Row>
          <Col xs={4} md={4} className="text-center py-2">
            <Link to="/projects"><i className="fa fa-angle-left fa-3x" aria-hidden="true"></i></Link>
          </Col>
          <Col xs={8} md={8} className="text-right py-2">
            {
              isRecording 
              ? 
              <Button variant="danger" data-toggle="buttons" onClick={stopRecording}>Stop</Button>              
              :
              <Button variant="primary" className="float-right" data-toggle="buttons" onClick={startRecording}>Start</Button>
            }           
            
          </Col>
        </Row>
        <Row className="px-4 py-4">
          <p>Working On:</p>
        </Row>
        <Row className="py-4">
          <Col>
            <p>Content area</p>
          </Col>
          <Col>
            <Row>
              <p>Today Time:</p>
            </Row>
            <Row>
              <p>Total Week:</p>
            </Row>
          </Col>
        </Row>
    </>
  );
};

export default AuthLayout(Recorder);
