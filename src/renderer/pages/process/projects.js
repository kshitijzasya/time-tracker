import React from 'react';
import {
    Row,
    ListGroup
} from 'react-bootstrap';
import { BasicLayout } from '../../components/layouts/basic';
import { Link } from 'react-router-dom';

const projectsData = [
    {
        id: 1,
        name: 'HRM',
        description: 'Human Resource Management',
    },
    {
        id: 2,
        name: 'Biramedia',
        description: 'Twilio call center for agents',
    },
    {
        id: 3,
        name: 'Deets',
        description: 'Call washing for customers'
    },
    {
        id: 4,
        name: 'AltDash',
        description: 'Crypto dashboard',
    }
];

const noDecorations = { textDecoration: 'none' };

const Projects = _ => {
    console.log('inside projects')
    return (
        <>
            <div className="flex h-screen px-4">
                <div className="m-auto rounded border-slate-300 min-w-[70%]">
                    <h3 className="text-center">Projects</h3>
                    <Row>
                        <ListGroup>
                            {
                                projectsData.map(project => {
                                    return (
                                        <Link to={`/projects/${project.id}`} key={project.id} style={noDecorations}>
                                            <ListGroup.Item key={project.id}>{project.name}</ListGroup.Item>
                                        </Link>
                                    )
                                })
                            }

                        </ListGroup>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default BasicLayout(Projects);