import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api";

function AllCourses() {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseURL}/course/`);
        console.log("Response Data:", res); // Check the response data
        setCourseData(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Error fetching courses");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-3">
      <h3 className="pb-1 mb-4">Latest Courses</h3>

      <div className="row">
        {courseData.map((course) => (
          <div className="col-md-3 mb-4" key={course.id}>
            <div className="card" style={{ width: "18rem" }}>
              <Link to={`/detail/${course.id}`}>
                <img
                  src={course.featured_img}
                  className="card-img-top course_img"
                  alt={course.title || "Course Image"}
                  style={{ width: "100%", height: "180px", objectFit: "cover" }}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/detail/${course.id}`}>{course.title}</Link>
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav aria-label="Page navigation example mt-5">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#">Previous</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">1</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">2</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">3</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AllCourses;
