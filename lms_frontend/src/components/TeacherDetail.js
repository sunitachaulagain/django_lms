import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const baseURL = "http://127.0.1:8000/api";

function TeacherDetail() {
  const [teacherData, setTeacherData] = useState({});
  const [courseData, setCourseData] = useState([]);

  const { teacher_id } = useParams();

  useEffect(() => {
    try {
      axios.get(`${baseURL}/teacher/${teacher_id}`).then((response) => {
        console.log(response.data);
        setCourseData(response.data.teacher_courses);
        setTeacherData(response.data);
      });
    } catch (error) {
      console.error("Error fetching teacher data:", error);
    }
  }, []);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img src="/logo512.png" className="card-img-top" alt="Teacher Image" />
        </div>

        <div className="col-8">
          <h1>{teacherData.full_name}</h1>
          <p>{teacherData.detail}</p>
          <p className="fw-bold">
            Skills: <Link to="/category/php">PHP</Link>,{" "}
            <Link to="/category/python">Python</Link>,{" "}
            <Link to="/category/javascript">JavaScript</Link>
          </p>
          <p className="fw-bold">
            Recent Courses: <Link to="/teacher-detail/1">React JS</Link>
          </p>
          <p className="fw-bold">Rating: 4.5/5</p>
        </div>
      </div>

      {/* Course Videos */}
      <div className="card mt-4">
        <h5 className="card-header">Course List</h5>
        <div className="list-group list-group-flush">
          {courseData.map((course, index) => (
            <Link
              key={index}
              to={`/detail/${course.id}`}
              className="list-group-item list-group-item-action text-decoration-none"
            >
              {course.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherDetail;
