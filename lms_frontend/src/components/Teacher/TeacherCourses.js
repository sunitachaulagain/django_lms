import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import TeacherSidebar from "../Teacher/TeacherSidebar";

const baseURL = "http://127.0.0.1:8000/api";

function TeacherCourses() {
  const [courseData, setCourseData] = useState([]);
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    document.title = "Teacher Courses";
    if (teacherId) {
      fetchCourses();
    }
  }, [teacherId]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${baseURL}/teacher-courses/${teacherId}`);
      setCourseData(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleDelete = (courseId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This course will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${baseURL}/course/${courseId}`);
          Swal.fire("Deleted!", "Course has been deleted.", "success");
          setCourseData((prevData) =>
            prevData.filter((course) => course.id !== courseId)
          );
        } catch (error) {
          Swal.fire("Error!", "Could not delete course.", "error");
          console.error("Delete error:", error);
        }
      }
    });
  };

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
                            <Link
                              to={`/all-chapters/${course.id}`}
                              className="text-decoration-none"
                            >
                              {course.title}
                            </Link>
                          </td>
                          <td>
                            <img
                              src={course.featured_img || "/placeholder.jpg"}
                              width={80}
                              className="rounded"
                              alt={course.title || "Course Image"}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/placeholder.jpg";
                              }}
                            />
                          </td>
                          <td>
                            <Link to={`/enrolled-students/${course.id}`}>
                              {course.total_enrolled_students}
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={`/edit-course/${course.id}`}
                              className="btn btn-info btn-sm me-2"
                            >
                              Edit
                            </Link>
                            <Link
                              to={`/add-chapter/${course.id}`}
                              className="btn btn-primary btn-sm me-2"
                            >
                              Add Chapter
                            </Link>
                            <button
                              onClick={() => handleDelete(course.id)}
                              className="btn btn-danger btn-sm"
                            >
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
