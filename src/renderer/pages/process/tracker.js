import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Col
} from "react-bootstrap";
import { AuthLayout } from '../../components/layouts/basic';
import { Link, useParams } from "react-router-dom";

//Renderer
const renderer = window.ipcRenderer;

const Recorder = () => {
  //Project-Id
  var id = useParams().id;
  const [ isRecording, setIsRecording ] = useState(false);

  function startRecording(){
    console.log('----- starting recording -----')
    renderer.send('tracking:start', 'startRecording');
    setIsRecording(true)
  }

  function stopRecording(){
    console.log('----- stoping recording -----')
    renderer.send('tracking:stop', '');
    setIsRecording(false)
  }
  useEffect(_ => {
    console.log('----- inside useEffect -----', isRecording)
    console.log('project id: ', id)
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
