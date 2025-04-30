import { Link } from "react-router-dom";

function CategoryCourses() {
  return (
    <div className="container mt-3">
      {/* Latest courses */}
      <h3 className="pb-1 mb-4">Web Development Courses</h3>

      {/* All cards in a single row */}
      <div className="row">
        {/* Cards */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/detail/1">
              <img src="/python-logo.png" className="card-img-top" alt="Course 1" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">Course Title 1</Link>
              </h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/detail/2">
              <img src="/python-logo.png" className="card-img-top" alt="Course 2" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/2">Course Title 2</Link>
              </h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/detail/3">
              <img src="/python-logo.png" className="card-img-top" alt="Course 3" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/3">Course Title 3</Link>
              </h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/detail/4">
              <img src="/python-logo.png" className="card-img-top" alt="Course 4" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/4">Course Title 4</Link>
              </h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/detail/5">
              <img src="/python-logo.png" className="card-img-top" alt="Course 5" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/5">Course Title 5</Link>
              </h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/detail/6">
              <img src="/python-logo.png" className="card-img-top" alt="Course 6" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/6">Course Title 6</Link>
              </h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/detail/7">
              <img src="/python-logo.png" className="card-img-top" alt="Course 7" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/7">Course Title 7</Link>
              </h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/detail/8">
              <img src="/python-logo.png" className="card-img-top" alt="Course 8" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/8">Course Title 8</Link>
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* Start Pagination */}
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
            <Link className="page-link" to="#">3</Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="#">Next</Link>
          </li>
        </ul>
      </nav>
      {/* End Pagination */}
    </div>
  );
}

export default CategoryCourses;
