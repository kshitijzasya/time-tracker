import React from 'react';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

const BasicLayout = WrappedComponent => {
    return class extends React.Component {
        render() {
            return (
                <Container>
                    <Row>
                        <Col>
                            <WrappedComponent {...this.props} />
                        </Col>
                    </Row>
                </Container>
            );
        }
    };
}

export {
    BasicLayout
}