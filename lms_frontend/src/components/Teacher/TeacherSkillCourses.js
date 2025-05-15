import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const baseURL = "http://127.0.0.1:8000/api";

function TeacherSkillCourses() {
  const [courseData, setCourseData] = useState([]);
  const { skill_name, teacher_id } = useParams();

  useEffect(() => {
    axios
      .get(`${baseURL}/course/?skill=${skill_name}&teacher=${teacher_id}`)
      .then((res) => setCourseData(res.data))
      .catch((error) =>
        console.error("Error fetching courses by skill and teacher:", error)
      );
  }, [skill_name, teacher_id]);

  return (
    <div className="container mt-3">
      <h1 className="pb-1 mb-4 text-capitalize">{skill_name} Courses</h1>

      <div className="row mb-4">
        {courseData.length === 0 ? (
          <p className="text-center">No courses found for this skill and teacher.</p>
        ) : (
          courseData.map((course, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card h-100">
                <Link to={`/detail/${course.id}`}>
                  <img
                    src={course.featured_img}
                    className="card-img-top"
                    alt={course.title}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/detail/${course.id}`}>{course.title}</Link>
                  </h5>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination (Optional – static for now) */}
      <nav aria-label="Page navigation example" className="mt-5">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <Link className="page-link" to="#">Previous</Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="#">1</Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="#">2</Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="#">Next</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default TeacherSkillCourses;
