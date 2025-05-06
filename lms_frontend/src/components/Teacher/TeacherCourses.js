import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TeacherSidebar from "../Teacher/TeacherSidebar";


const baseURL = "http://127.0.0.1:8000/api";
function TeacherCourses() {
  const [courseData, setCourseData] = useState([]);

  const teacherId = localStorage.getItem("teacherId");
  //console.log("teacherId from localStorage:", teacherId);

  //Fetch courses when page load
  useEffect(() => {
    document.title = "teacher Courses";
    try {
      axios.get(baseURL + "/teacher-courses/" + teacherId).then((res) => {
        //console.log(res.data);
        setCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []); // Added the empty array to prevent it from running on every render
  

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
      {/* Main Content Section */}
      <section className="col-md-9">
        <div className="card">
          <h5 className="card-header">My Courses</h5>
          <div className="card-body">
            {/* Add Course Button */}
            <div className="mb-3 text-end">
              <Link to="/teacher-add-courses" className="btn btn-success">
                Add New Course
              </Link>
            </div>

            {/* Course List Table */}
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Course Name</th>
                    <th>Images</th>
                    <th>Total Enrolled</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  
                    {courseData.map((course,index) => 
                      <tr>
                        <td>{course.title}</td>
                        <td>
                          <img
                            src={course.featured_img}
                            width={80}
                            className="rounded"
                            alt={course.title}
                          />
                        </td>
                        <td>222</td>
                        <td>
                          <Link
                            to="/add-chapter"
                            className="btn btn-sm btn-primary me-2"
                          >
                            Add Chapter
                          </Link>
                          <button className="btn btn-sm btn-danger">
                            Delete
                          </button>
                        </td>
                      </tr>
                    )};
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
