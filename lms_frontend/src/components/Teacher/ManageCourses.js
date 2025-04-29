import { Link } from 'react-router-dom';
import Sidebar from './TeacherSidebar'; // Correct Sidebar import for Teacher

function ManageCourses() {
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
            <h5 className="card-header">Manage Courses</h5>
            <div className="card-body">
              {/* Add Course Button */}
              <div className="mb-3 text-end">
                <Link to="/add-course" className="btn btn-success">
                  Add New Course
                </Link>
              </div>

              {/* Course List Table */}
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Course Name</th>
                      <th>Category</th>
                      <th>Students Enrolled</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Sample row */}
                    <tr>
                      <td>React for Beginners</td>
                      <td>Web Development</td>
                      <td>120</td>
                      <td><span className="badge bg-success">Active</span></td>
                      <td>
                        <Link to="/edit-course/1" className="btn btn-sm btn-primary me-2">Edit</Link>
                        <button className="btn btn-sm btn-danger">Delete</button>
                      </td>
                    </tr>
                    {/* More rows can be added dynamically later */}
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

export default ManageCourses;
