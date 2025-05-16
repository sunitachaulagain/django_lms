import { useEffect } from 'react';

function StudentLogout() {
    useEffect(() => {
        localStorage.removeItem('studentLoginStatus');
        localStorage.removeItem("studentId"); // if you want to clear student id too
        window.location.href = '/student-login';
    }, []);

    return null; // or <></> if you prefer
}

export default StudentLogout;
