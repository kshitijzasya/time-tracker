import React, { useEffect, useState } from 'react';
import {
    Row,
    ListGroup,
    Spinner
} from 'react-bootstrap';
import Calls from "../../../helpers/apicalls";
import { AuthLayout } from '../../components/layouts/basic';
import { Link, useNavigate } from 'react-router-dom';
import authentication from '../../../helpers/authentication';
import Storage from '../../../helpers/storage';

const noDecorations = { textDecoration: 'none' };

const Projects = _ => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    var navigate = useNavigate();

    //Selecting project
    function selectProject(id) {
        //Navigate to project
        Storage.project = projects.find(p => p.project_id === id);
        navigate(`/process/project/${id}`);
    }

    useEffect(async _ => {
        if (!projects.length) {
            let id = authentication.userId || 77;
            let response = await Calls.GET(`projects?user_id=${id}`);
            if (response.status){
                setProjects(response.projects);                
            }
        } else {
            setLoading(false);
        }
    }, [projects]);
    
    if (loading) { 
        return (
            <div className="flex h-screen px-4">
                <div className="m-auto rounded border-slate-300 min-w-[50%] text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="flex h-screen px-4">
                <div className="m-auto rounded border-slate-300 min-w-[70%]">
                    <h3 className="text-center">Projects</h3>
                    <Row>
                        <ListGroup>
                            {
                                projects.length ?
                                    projects.map(project => {
                                        return (
                                            // <Link to={`/projects/${project.project_id}`} key={project.project_id} style={noDecorations}>
                                                <ListGroup.Item key={project.project_id} onClick={_ => selectProject(project.project_id)}>{project.project_name}</ListGroup.Item>
                                            // </Link>
                                        )
                                    })
                                    :
                                    <p>No project available</p>
                            }

                        </ListGroup>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default AuthLayout(Projects);