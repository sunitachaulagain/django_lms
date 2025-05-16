import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TeacherLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('teacherLoginStatus');
    navigate('/teacher-login');
  }, [navigate]);

  return null; // no UI needed
}

export default TeacherLogout;
