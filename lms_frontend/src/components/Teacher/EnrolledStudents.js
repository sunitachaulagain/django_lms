import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TeacherSidebar from "../Teacher/TeacherSidebar";

const baseURL = "http://127.0.0.1:8000/api";

function EnrolledStudents() {
  const [studentData, setStudentData] = useState([]);
  const { courseId } = useParams(); // Correct destructuring

  useEffect(() => {
  const fetchEnrolledStudents = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/fetch-enrolled-students/${courseId}/` // ✅ Don't forget trailing slash
      );
      setStudentData(response.data);
      console.log("Fetched enrolled students data:", response.data);

      if (response.data.length > 0) {
        console.log("Sample student object:", response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching enrolled students:", error);
    }
  };

  // ✅ CALL THE FUNCTION
  fetchEnrolledStudents();
}, [courseId]);



  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Enrolled Students</h5>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.length > 0 ? (
                      studentData.map((row) => (
                        <tr key={row.student.id}>
                          <td>
                            <Link to={`/view-student/${row.student.id}`}>
                              {row.student.full_name}
                            </Link>
                          </td>
                          <td>{row.student.email}</td>
                          <td>{row.student.username}</td>
                          <td>
                            <Link
                              to={`/view-student/${row.student.id}`} // Optional: more semantic route
                              className="btn btn-info btn-sm"
                            >
                              View Student
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-3">
                          No enrolled students found.
                        </td>
                      </tr>
                    )}
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

export default EnrolledStudents;
