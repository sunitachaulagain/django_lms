import { Link } from 'react-router-dom';
import Sidebar from './TeacherSidebar'; // Correct Teacher Sidebar import

function ViewStudents() {
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar Section */}
        <aside className="col-md-3">
          <Sidebar />
        </aside>

        {/* Main Content Section */}
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Students</h5>
            <div className="card-body">
              {/* Students List */}
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Enrolled Courses</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Example student */}
                    <tr>
                      <td>John Doe</td>
                      <td>john@example.com</td>
                      <td>React, Python</td>
                      <td>
                        <Link to="/view-student/1" className="btn btn-sm btn-info">View</Link>
                      </td>
                    </tr>
                    {/* More rows dynamically */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ViewStudents;
