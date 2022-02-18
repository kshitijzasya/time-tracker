import React from 'react';
import {
    Col, 
    Row
} from 'react-bootstrap';

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

export default ({ timeRecord }) => {
    return (
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
    )
}