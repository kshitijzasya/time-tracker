import React from 'react';
import {
    Image,
    Col,
} from "react-bootstrap";

export default ({screenshot}) => {
    return (
        <Col>
            <h5>Content area</h5>
            <Image src={`./screenshots/${screenshot.url}`} fluid />
            <h6 className="text-center py-2">{screenshot.time} minutes ago</h6>
        </Col>
    )
}
