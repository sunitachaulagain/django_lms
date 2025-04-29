import { Link } from 'react-router-dom';
import Sidebar from './TeacherSidebar'; // Correct Teacher Sidebar import

function ViewAssignments() {
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
            <h5 className="card-header">Assignments</h5>
            <div className="card-body">
              {/* Assignments List */}
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Course</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Example assignment */}
                    <tr>
                      <td>Assignment 1</td>
                      <td>Python Basics</td>
                      <td>2025-05-15</td>
                      <td><span className="badge bg-warning">Pending</span></td>
                      <td>
                        <Link to="/edit-assignment/1" className="btn btn-sm btn-primary me-2">Edit</Link>
                        <button className="btn btn-sm btn-danger">Delete</button>
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

export default ViewAssignments;
