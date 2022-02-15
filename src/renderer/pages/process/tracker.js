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
import Storage from '../../../helpers/storage';

//Renderer
const renderer = window.ipc;

//Update api screenshot
const updateIntervalOnApi = async (params) => {
  let response = await Calls.POST('update-screenshot', params);
  if (response.status) {
    return response
  }
  throw Error('Not valid data')
}

//Handling time interval
const sortTime = time => {
  let result;
  time = typeof time === 'string' ? parseInt(time) : time;
  if (time > 60) {
    result = (Math.floor(time / 60) >= 10 ? Math.floor(time / 60) : `0${Math.floor(time / 60)}`) + ':' + (time % 60 >= 10 ? time % 60 : `0${time % 60}`)
  } else {
    result = `00:${time >= 10 ? time : `0${time}`}`
  }
  return result;
}

const startRecordingProcess = async _ => {
  //Invoking an event -- return  a promise
  let reply = await renderer.invoke('tracking', 'start')
  console.log('reply', reply)
}

const stopRecordingProcess = async _ => {
  //Invoking an event -- return  a promise
  await renderer.invoke('tracking', 'stop');
  // await renderer.removeAllListeners('tracking')
}

const Recorder = React.memo(() => { 
  //Project-Id
  var id = useParams().id;
  var projectId = id || 3;
  var userId = authentication.userId || 77;
  var project = Storage.project;
  const [isRecording, setIsRecording] = useState(Storage.tracker);
  const [screenshot, setScreenShot] = useState({ url: 'Screeenshot-1644390239599.png', time: 0 });
  const [timeRecord, setTimeRecord] = useState({ today: '00', total: '00' });

  function startRecording() {
    startRecordingProcess()
    setIsRecording(true)
  }

  function stopRecording() {
    stopRecordingProcess();
    setIsRecording(false);
  }
  //Handling event
  useEffect(_ => { 
    //Set effects for the interval
    renderer.on('tracking', (event, arg) => { console.log('on updarte', arg)
      if (arg.type === 'update') {
        let { name } = arg;
        // updateIntervalOnApi({ ...arg, projectId, userId })
        //   .then(res => {
        //     setTimeRecord(res.time)
        //   })
        //   .catch(err => console.log('error', err))
        // setScreenShot({ url: name, time: arg.interval });
      }
    })
  }, []);

  useEffect(_ => {
    updateIntervalOnApi({ projectId, userId })
      .then(res => {
        setTimeRecord(res.time)
        setScreenShot({ url: res.name, time: 0 })
      })
      .catch(err => console.log('error', err))
  }, []);

  //Setting recording related data
  useEffect(_ => {
    Storage.tracker = isRecording ?? false;
  }, [isRecording]);
  
  //Returning the jsx
  return (
    <>
      <Row className="text-center">
        <h2>{project.project_name}</h2>
      </Row>
      <Row>
        <Col xs={4} md={4} className="text-left py-2">
          <Link to="/projects"><i className="fa fa-angle-left fa-2x" aria-hidden="true"></i></Link>
        </Col>
        <Col xs={8} md={8} className="text-right py-2">
          {
            isRecording
              ?
              <Button variant="light" data-toggle="buttons" onClick={stopRecording}><i className="fa fa-stop fa-2x" aria-hidden="true"></i></Button>
              :
              <Button variant="light" className="float-right" data-toggle="buttons" onClick={startRecording}><i className="fa fa-play fa-2x" aria-hidden="true"></i></Button>
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
          <h5>Content area</h5>
          <Image src={`./screenshots/${screenshot.url}`} fluid />
          <h6 className="text-center py-2">{screenshot.time} minutes ago</h6>
        </Col>
        <Col>
          <Row className="text-center">
            <h4>Today ({['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][(new Date).getDay()].substring(0, 3)})</h4>
            <h4>{sortTime(timeRecord.today)}</h4>
          </Row>
          <Row className="text-center">
            <h4>This Week</h4>
            <h4>{sortTime(timeRecord.total)}</h4>
          </Row>
        </Col>
      </Row>
    </>
  );
});

export default AuthLayout(Recorder);
