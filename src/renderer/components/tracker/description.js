import {
    Form
} from 'react-bootstrap';

export default ({ taskDescription, setTaskDescription }) => {
    return (
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Working On:</Form.Label>
            <Form.Control as="textarea" rows={2} onChange={e => setTaskDescription(e.target.value)} value={taskDescription}/>
        </Form.Group>
    )
}
