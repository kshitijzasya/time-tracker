import {
    Button
} from 'react-bootstrap';
import Authentication from '../../../helpers/authentication';
import { useNavigate } from 'react-router-dom';

export default function(props) {
    let { float = 'none' } = props;
    let navigate = useNavigate();
    function logout() {
        Authentication.logout();
        // navigate('/login');
    }
    //Renderer
    return (
        <Button className={`pb-2`} size="sm" variant='light' onClick={logout}><i className="fa fa-sign-out" aria-hidden="true"></i></Button>
    )
}