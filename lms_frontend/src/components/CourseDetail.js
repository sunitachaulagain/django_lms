import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function CourseDetail() {
  let { course_id } = useParams();

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img src="/logo512.png" className="card-img-top" alt="Course" />
        </div>
        <div className="col-8">
          <h1>Course Title</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora, quos.
          </p>
          <p className="fw-bold">
            Course By: <a href="#">Teacher 1</a>
          </p>
          <p className="fw-bold">Duration: 3 Hours 30 Minutes</p>
          <p className="fw-bold">Total Enrolled: 456+ Students</p>
          <p className="fw-bold">Rating: 4.5/5</p>
        </div>
      </div>

      {/* Course Videos */}
      <div className="card mt-4">
        <h5 className="card-header">Course Videos</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Introduction
            <span className="float-end">
              <span className="me-5">1 hour 30 minutes</span>
              <button className="btn btn-sm btn-danger">
                <i className="bi bi-youtube"></i>
              </button>
            </span>
          </li>

          <li className="list-group-item">
            Setup Project
            <span className="float-end">
              <span className="me-5">45 minutes</span>
              <button className="btn btn-sm btn-danger">
                <i className="bi bi-youtube"></i>
              </button>
            </span>
          </li>

          <li className="list-group-item">
            Start with Functional Component
            <span className="float-end">
              <span className="me-5">1 hour 10 minutes</span>
              <button className="btn btn-sm btn-danger">
                <i className="bi bi-youtube"></i>
              </button>
            </span>
          </li>

          {/* Add more videos similarly if needed */}
        </ul>
      </div>
      {/* End Course Videos */}

      {/* Related Courses */}
      <h3 className="pb-1 mb-4 mt-5">Related Courses</h3>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card" style={{ width: "18rem" }}>
            <Link to="/detail/1">
              <img src="/logo512.png" className="card-img-top" alt="Course 1" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">Course Title 1</Link>
              </h5>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card" style={{ width: "18rem" }}>
            <Link to="/detail/2">
              <img src="/logo512.png" className="card-img-top" alt="Course 2" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/2">Course Title 2</Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
      {/* End Related Courses */}
    </div>
  );
}

export default CourseDetail;
