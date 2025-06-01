// StudentLogout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentLogout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('studentLoginStatus');
        localStorage.removeItem('studentId');
        // optional: clear state/context
        navigate('/student-login');
    }, [navigate]);

    return null;
}

export default StudentLogout;