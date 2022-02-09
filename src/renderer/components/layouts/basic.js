import React from 'react';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';
import LogoutBtn from '../elements/logoutBtn';
import Authentication from '../../../helpers/authentication';

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

const AuthLayout = WrappedComponent => { 
    return class extends React.Component {
        render() {
            return (
                <Container className="px-4 py-4">
                    <Row>
                        <Col>
                            <WrappedComponent {...this.props} />
                        </Col>
                    </Row>
                    {/* Footer */}
                    <Row className="fixed bottom-0 w-full">
                        <hr className="m-0"/>
                        <Col xs={10} sm={8} className="text-left">
                            <span>{Authentication.userName}</span>
                        </Col>
                        <Col xs={2} sm={4} className="border border-l-slate-300">
                            <LogoutBtn float={'right'} />
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

export {
    BasicLayout,
    AuthLayout
}