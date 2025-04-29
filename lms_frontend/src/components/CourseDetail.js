import { useParams, Link } from "react-router-dom";

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
            Lorem ipsum dolor sit amet consectetur adipisicing elit...
          </p>
          <p className="fw-bold">
            Course By: <Link to="/teacher-detail/1">Teacher 1</Link>
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
              <button
                className="btn btn-sm btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#videoModalIntro"
              >
                <i className="bi bi-youtube"></i>
              </button>
            </span>
          </li>

          <li className="list-group-item">
            Setup Project
            <span className="float-end">
              <span className="me-5">45 minutes</span>
              <button
                className="btn btn-sm btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#videoModalSetup"
              >
                <i className="bi bi-youtube"></i>
              </button>
            </span>
          </li>

          <li className="list-group-item">
            Start with Functional Component
            <span className="float-end">
              <span className="me-5">1 hour 10 minutes</span>
              <button
                className="btn btn-sm btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#videoModal1"
              >
                <i className="bi bi-youtube"></i>
              </button>
            </span>
          </li>
        </ul>
      </div>

      {/* Modal for Introduction */}
      <div
        className="modal fade"
        id="videoModalIntro"
        tabIndex="-1"
        aria-labelledby="videoModalIntroLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="videoModalIntroLabel">
                Introduction
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="ratio ratio-16x9">
                <iframe
                  src="https://www.youtube.com/embed/VIDEO_ID_1"
                  title="Introduction Video"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Setup Project */}
      <div
        className="modal fade"
        id="videoModalSetup"
        tabIndex="-1"
        aria-labelledby="videoModalSetupLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="videoModalSetupLabel">
                Setup Project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="ratio ratio-16x9">
                <iframe
                  src="https://www.youtube.com/embed/VIDEO_ID_2"
                  title="Setup Project Video"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Functional Component (existing) */}
      <div
        className="modal fade"
        id="videoModal1"
        tabIndex="-1"
        aria-labelledby="videoModal1Label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="videoModal1Label">
                Video 1
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="ratio ratio-16x9">
                <iframe
                  src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
                  title="YouTube video"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
}

export default CourseDetail;
