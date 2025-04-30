import { Link } from "react-router-dom";

function TeacherDetail() {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img src="/logo512.png" className="card-img-top" alt="Teacher Image" />
        </div>

        <div className="col-8">
          <h1>John Doe</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At dicta
            illum ipsum veritatis, doloribus neque culpa numquam suscipit sed
            beatae nisi saepe, dolor vitae nostrum esse eligendi quae nam. Quae
            quidem quaerat aliquam, nemo nobis atque provident maxime
            repellendus rem odio illum numquam ratione, vel illo ipsum amet!
            Tenetur, obcaecati.
          </p>
          <p className="fw-bold">
            Skills:{" "}
            <Link to="/category/php">PHP</Link>,{" "}
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
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link to="/detail/101" className="text-decoration-none">PHP Course 1</Link>
          </li>
          <li className="list-group-item">
            <Link to="/detail/102" className="text-decoration-none">PHP Course 2</Link>
          </li>
          <li className="list-group-item">
            <Link to="/detail/103" className="text-decoration-none">Python Course 1</Link>
          </li>
          <li className="list-group-item">
            <Link to="/detail/104" className="text-decoration-none">Python Course 2</Link>
          </li>
          <li className="list-group-item">
            <Link to="/detail/105" className="text-decoration-none">JavaScript Course 1</Link>
          </li>
          <li className="list-group-item">
            <Link to="/detail/106" className="text-decoration-none">JavaScript Course 2</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TeacherDetail;
