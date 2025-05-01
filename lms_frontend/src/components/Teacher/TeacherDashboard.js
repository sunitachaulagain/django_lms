import { Link } from 'react-router-dom';
import Sidebar from './TeacherSidebar'; // Teacher Sidebar
import { useEffect } from 'react';

function TeacherDashboard() {
  useEffect(()=>{
    document.title='Teacher Dashboard';
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <h2>Welcome to Your Teacher Dashboard</h2>
          <p>Manage your courses, assignments, and students here.</p>
          
          <div className="card mt-4">
            <div className="card-header">
              <h5>Your Courses</h5>
            </div>
            <div className="card-body">
              <p>View and manage your courses here. You can add new courses, update course content, and track student progress.</p>
              <Link to="/manage-courses" className="btn btn-primary">
                Manage Courses
              </Link>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header">
              <h5>Assignments</h5>
            </div>
            <div className="card-body">
              <p>View and grade student assignments, upload feedback, and manage deadlines.</p>
              <Link to="/view-assignments" className="btn btn-primary">
                View Assignments
              </Link>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header">
              <h5>Student List</h5>
            </div>
            <div className="card-body">
              <p>View the list of students enrolled in your courses.</p>
              <Link to="/view-students" className="btn btn-primary">
                View Students
              </Link>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}

export default TeacherDashboard;
