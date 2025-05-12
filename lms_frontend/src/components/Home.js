import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api";

function Home() {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "LMS | Home page";

    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseURL}/course/`);
        setCourseData(res.data.slice(0, 4)); // Show only 4 latest courses
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Error loading courses");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      {/* Latest courses */}
      <h3 className="pb-1 mb-4">
        Latest Courses
        <Link to="/all-courses" className="float-end">
          See All
        </Link>
      </h3>

      <div className="row">
        {loading && <p>Loading courses...</p>}
        {error && <p>{error}</p>}
        {!loading &&
          !error &&
          courseData.map((course) => (
            <div className="card m-2" style={{ width: "18rem" }} key={course.id}>
              <Link to={`/detail/${course.id}`}>
                <img
                  src={course.featured_img}
                  className="card-img-top"
                  alt={course.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/detail/${course.id}`}>{course.title}</Link>
                </h5>
              </div>
            </div>
          ))}
      </div>

      {/* Popular Courses (static for now) */}
      <h3 className="pb-1 mb-4 mt-5">
        Popular Courses
        <Link to="/popular-courses" className="float-end">
          See All
        </Link>
      </h3>
      <div className="row">
        {/* You can replace this section with dynamic data too later */}
        <div className="card m-2" style={{ width: "18rem" }}>
          <Link to="#">
            <img src="logo512.png" className="card-img-top" alt="Popular Course 1" />
          </Link>
          <div className="card-body">
            <h5 className="card-title">
              <Link to="#">Popular Course 1</Link>
            </h5>
          </div>
          <div className="card-footer">
            <span>Rating: 4.5/5</span>
            <span className="float-end">Views: 7877</span>
          </div>
        </div>
        {/* Add more static or dynamic cards as needed */}
      </div>

      {/* Popular Teachers (static for now) */}
      <h3 className="pb-1 mb-4 mt-5">
        Popular Teachers
        <Link to="/popular-teachers" className="float-end">
          See All
        </Link>
      </h3>
      <div className="row">
        <div className="card m-2" style={{ width: "18rem" }}>
          <Link to="#">
            <img src="logo512.png" className="card-img-top" alt="Teacher 1" />
          </Link>
          <div className="card-body">
            <h5 className="card-title">
              <Link to="/teacher-detail/1">Teacher Name</Link>
            </h5>
          </div>
        </div>
        {/* Add more teacher cards statically or dynamically */}
      </div>
    </div>
  );
}

export default Home;
