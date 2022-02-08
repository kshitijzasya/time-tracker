import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Col,
  Form,
  Image,
  Badge
} from "react-bootstrap";
import Calls from "../../../helpers/apicalls";
import { AuthLayout } from '../../components/layouts/basic';
import authentication from '../../../helpers/authentication';
import { Link, useParams } from "react-router-dom";
// import Im from './screenshots/Screeenshot-1644314344074.png';

//Renderer
const renderer = window.ipcRenderer;

//Update api screenshot
const updateIntervalOnApi = async (params) => {
  let response = await Calls.POST('update-screenshot', params);
  if (response.status) {
    return response.time
  }
  throw Error('Not valid data')
}

const startRecordingProcess = async _ => {
  //Invoking an event -- return  a promise
  await renderer.invoke('tracking:start', 'startRecording')
    .then(r => console.log('response', r))
    .catch(err => console.log('err', err))
}

const Recorder = React.memo(() => {
  //Project-Id
  var id = useParams().id;
  var projectId = id || 3;
  var userId = authentication.userId || 77;
  const [isRecording, setIsRecording] = useState(false);
  const [screenshot, setScreenShot] = useState('Screeenshot-1644314344074.png');
  const [timeRecord, setTimeRecord] = useState({ today: 0, total: 0 });

  function startRecording() {
    startRecordingProcess()
    setIsRecording(true)
  }

  async function stopRecording() {
    await renderer.invoke('tracking:stop', '');
    setIsRecording(false)
  }
  //Handling event
  useEffect(_ => {
    console.log('----- inside useEffect -----', isRecording)
    console.log('project id: ', projectId);
    console.log('customer id: ', userId);
    //Set effects for the interval
    renderer.on('tracking:update', (event, arg) => {
      let { location, interval, name } = arg;
      updateIntervalOnApi({ ...arg, projectId, userId })
        .then(time => setTimeRecord(time))
        .catch(err => console.log('error', err))
      setScreenShot(name);
      console.log('---- inside start the event ----', arg)
    })
  }, []);

  useEffect(_ => {
    updateIntervalOnApi({ projectId, userId })
      .then(time => setTimeRecord(time))
      .catch(err => console.log('error', err))
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
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Working On:</Form.Label>
          <Form.Control as="textarea" rows={2} />
        </Form.Group>
      </Row>
      <Row className="py-4">
        <Col>
          <p>Content area</p>
          <Image src={`./screenshots/${screenshot}`} fluid />
        </Col>
        <Col>
          <Row>
            <h3>Today: &nbsp;&nbsp;<Badge>00:{timeRecord.today}</Badge></h3>
          </Row>
          <Row>
            <h3>Total:&nbsp;&nbsp;&nbsp;&nbsp;<Badge>00:{timeRecord.total}</Badge></h3>
          </Row>
        </Col>
      </Row>
    </>
  );
});

export default AuthLayout(Recorder);
