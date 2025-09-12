import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import authService from '../../services/auth';
import LoadingScreen from '../LoadingScreen';

const ProjectRoute = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const navigate = useNavigate();
    const { projectId } = useParams();

    useEffect(() => {
        
        const checkAccess = async () => {
            try {
                
                const result = await authService.checkAccess(projectId);
                // console.log(result);
                setAuthorized(true);

            } catch (error) {
                setAuthorized(false);      
                navigate('/home')      
            } finally {
                setLoading(false);
            }
        };

        checkAccess();

    }, [projectId, navigate]);

    if(loading) return <LoadingScreen message='Checking Project Access...'/>
    if(!authorized) return null;
    return <>{children}</>
}

export default ProjectRoute