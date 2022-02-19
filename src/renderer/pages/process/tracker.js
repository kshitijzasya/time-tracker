import React, { useEffect, useState } from "react";
import {
  Row,
  Col
} from "react-bootstrap";
import Calls from "../../../helpers/apicalls";
import { AuthLayout } from '../../components/layouts/basic';
import authentication from '../../../helpers/authentication';
import { Link, useParams } from "react-router-dom";
import Storage from '../../../helpers/storage';
import { db } from '../../../config/firebase';
import { collection, addDoc, query, orderBy, Timestamp } from "firebase/firestore"
import { Screenshot, Time, Description, Toggle } from '../../components/tracker';

//Renderer
const renderer = window.ipc;

//Update api screenshot
const updateIntervalOnApi = async (params) => { 
  // let result = await addDoc(collection(db, 'screenshots'), {
  //   created_at: Timestamp.now(),
  //   interval: params.interval,
  //   project_member_id: params.project_member_id,
  //   screenshot_link: params.name,
  // })
  let res = await renderer.invoke('tracking', {
    type:'screenshot',
    name: params.name,
  })
  return {time: { today: '00', total: '00' }};
}

const Recorder = () => {
  //Project-Id
  const id = useParams().id;
  var projectId = id || 3;
  var userId = authentication.userId || 77;
  var project = Storage.project;

  const [screenshot, setScreenShot] = useState({ url: 'Screeenshot-1644390239599.png', time: 0 });
  const [taskDescription, setTaskDescription] = useState('');
  const [timeRecord, setTimeRecord] = useState({ today: '00', total: '00' });
  const [isRecording, setIsRecording] = useState(Storage.tracker);

  //Handling event
  useEffect(_ => {
    //Set effects for the interval
    renderer.on('tracking', arg => {
      console.log('on updarte', arg)
      if (arg.type === 'update') {
        let { name } = arg;
        updateIntervalOnApi({ ...arg, projectId, userId, name })
          .then(res => { console.log('res', res) 
            setTimeRecord(res.time)
          })
          .catch(err => console.log('error', err))
        setScreenShot({ url: name, time: arg.interval });
      }
    });
    renderer.on('close', arg => {
      console.log('remove everything')
      renderer.removeAllListeners('tracking')
    })
  }, []);

  useEffect(_ => {
    updateIntervalOnApi({ projectId, userId, name:'' })
      .then(res => { 
        setTimeRecord(res ? res.time : { today: '00', total: '00' })
        setScreenShot({ url: res?.name, time: 0 })
      })
      .catch(err => console.log('error', err))
  }, []);


  useEffect(_ => {
    console.log('screenshot changed', screenshot)
  }, [screenshot])

  useEffect(_ => {
    Storage.tracker = isRecording ?? false;
    console.log('isRecording changed', {storage: Storage.tracker, isRecording})
  }, [isRecording]);
  //Returning the jsx
  return (
    <>
      <Row className="text-center">
        <h2>{project.project_name}</h2>
      </Row>
      <Row>
        <Col xs={4} md={4} className="text-left py-2">
          {
            isRecording ?
              ''
              :
              <Link to="/projects"><i className="fa fa-angle-left fa-2x" aria-hidden="true"></i></Link>
          }
        </Col>
        <Toggle isRecording={isRecording} setIsRecording={setIsRecording} />
      </Row>
      <Row className="px-4 py-4">
        <Description taskDescription={taskDescription} setTaskDescription={setTaskDescription} />
      </Row>
      <Row className="py-4">
        <Screenshot screenshot={screenshot} />
        <Time timeRecord={timeRecord} />
      </Row>
    </>
  );
};

export default AuthLayout(React.memo(Recorder))
