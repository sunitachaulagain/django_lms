import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const baseURL = "http://127.0.0.1:8000/api";

function CategoryCourses() {
  const [courseData, setCourseData] = useState([]);
  const { category_slug } = useParams();

  useEffect(() => {
    axios
      .get(`${baseURL}/course/?category=${category_slug}`)
      .then((res) => {
        setCourseData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  }, [category_slug]);  

  
  

  return (
    <div className="container mt-3">
      {/* Latest courses */}
      <h1 className="pb-1 mb-4">{category_slug}</h1>

      {/* All cards in a single row */}
      <div className="row mb-4">
      {courseData.length === 0 ? (
          <p className="text-center">No courses found in this category.</p>
        ) : (
          courseData.map((course, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card">
                <Link to={`/detail/${course.id}`}>
                  <img
                    src={course.featured_img}
                    className="card-img-top"
                    alt={course.title}
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
          ))
        )}
      </div>

      {/* Start Pagination */}
      <nav aria-label="Page navigation example" className="mt-5">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <Link className="page-link" to="#">
              Previous
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="#">
              1
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="#">
              2
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="#">
              3
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="#">
              Next
            </Link>
          </li>
        </ul>
      </nav>
      {/* End Pagination */}
    </div>
  );
}

export default CategoryCourses;