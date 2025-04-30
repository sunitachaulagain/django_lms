import { Link } from "react-router-dom";

function PopularTeacher() {
  return (
    <div className="container mt-3">
      {/* Popular Teachers */}
      <h3 className="pb-1 mb-4">Popular Teachers</h3>

      {/* All cards in a single row */}
      <div className="row">
        {/* Cards */}
        <div className="col-md-3 mb-4">
          <div className="card" style={{ width: "18rem" }}>
            <Link to="/teacher-detail/1">
              <img src="/teacher-avatar.png" className="card-img-top" alt="Teacher 1" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/1">Teacher Name 1</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card" style={{ width: "18rem" }}>
            <Link to="/teacher-detail/2">
              <img src="/teacher-avatar.png" className="card-img-top" alt="Teacher 2" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/2">Teacher Name 2</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card" style={{ width: "18rem" }}>
            <Link to="/teacher-detail/3">
              <img src="/teacher-avatar.png" className="card-img-top" alt="Teacher 3" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/3">Teacher Name 3</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card" style={{ width: "18rem" }}>
            <Link to="/teacher-detail/4">
              <img src="/teacher-avatar.png" className="card-img-top" alt="Teacher 4" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/4">Teacher Name 4</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card" style={{ width: "18rem" }}>
            <Link to="/teacher-detail/5">
              <img src="/teacher-avatar.png" className="card-img-top" alt="Teacher 5" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/5">Teacher Name 5</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card" style={{ width: "18rem" }}>
            <Link to="/teacher-detail/6">
              <img src="/teacher-avatar.png" className="card-img-top" alt="Teacher 6" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/6">Teacher Name 6</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card" style={{ width: "18rem" }}>
            <Link to="/teacher-detail/7">
              <img src="/teacher-avatar.png" className="card-img-top" alt="Teacher 7" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/7">Teacher Name 7</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card" style={{ width: "18rem" }}>
            <Link to="/teacher-detail/8">
              <img src="/teacher-avatar.png" className="card-img-top" alt="Teacher 8" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/8">Teacher Name 8</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Pagination */}
      <nav aria-label="Page navigation example mt-5 ">
        <ul className="pagination justify-content-center">
          <li className="page-item"><a className="page-link" href="#">Previous</a></li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item"><a className="page-link" href="#">Next</a></li>
        </ul>
      </nav>
      {/* End Pagination */}
    </div>
  );
}

export default PopularTeacher;
