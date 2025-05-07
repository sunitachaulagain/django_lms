import { Link } from 'react-router-dom';

function TeacherSidebar() {
  return (
    <div className="card">
      <div className="list-group list-group-flush">
        <Link to="/teacher-dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
        <Link to="/teacher-courses" className="list-group-item list-group-item-action">Manage Courses</Link>
        <Link to="/view-assignments" className="list-group-item list-group-item-action">Assignments</Link>
        <Link to="/view-students" className="list-group-item list-group-item-action">View Students</Link>
        <Link to="/teacher-profile-setting" className="list-group-item list-group-item-action">Profile Settings</Link>
        <Link to="/teacher-change-password" className="list-group-item list-group-item-action">Change Password</Link>
        <Link to="/teacher-login" className="list-group-item list-group-item-action text-danger">Log Out</Link>
      </div>
    </div>
  );
}

export default TeacherSidebar;
