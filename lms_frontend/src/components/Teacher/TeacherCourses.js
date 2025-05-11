import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TeacherSidebar from "../Teacher/TeacherSidebar";

const baseURL = "http://127.0.0.1:8000/api";

function TeacherCourses() {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const teacherId = localStorage.getItem("teacherId");

  // Fetch courses when page loads
  useEffect(() => {
    document.title = "Teacher Courses";
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${baseURL}/teacher-courses/${teacherId}`);
        setCourseData(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [teacherId]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="row">
          <aside className="col-md-3">
            <TeacherSidebar />
          </aside>
          <section className="col-md-9">
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">My Courses</h5>
            <div className="card-body">
              <div className="mb-3 text-end">
                <Link to="/teacher-add-courses" className="btn btn-success">
                  Add New Course
                </Link>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Course Name</th>
                      <th>Image</th>
                      <th>Total Enrolled</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseData.length > 0 ? (
                      courseData.map((course) => (
                        <tr key={course.id}>
                          <td>
                            <Link to={`/all-chapters/${course.id}`} className="text-decoration-none">
                              {course.title}
                            </Link>
                          </td>
                          <td>
                            <img
                              src={course.featured_img || '/placeholder.jpg'}
                              width={80}
                              className="rounded"
                              alt={course.title}
                              onError={(e) => {
                                e.target.src = '/placeholder.jpg';
                              }}
                            />
                          </td>
                          <td>{course.total_enrolled || 0}</td>
                          <td>
                            <Link
                              to={`/edit-course/${course.id}`}
                              className="btn btn-info btn-sm me-2"
                            >   
                              Edit 
                            </Link>
                            <Link
                              to={`/add-chapter/${course.id}`}
                              className="btn btn-sm btn-primary me-2"
                            >
                              Add Chapter
                            </Link>
                            <button className="btn btn-sm btn-danger">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-3">
                          No courses found. Add your first course!
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

export default TeacherCourses;