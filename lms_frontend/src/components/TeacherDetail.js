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
            Skills: <Link to="/teacher-detail/1">PHP</Link>,  
            <Link to="/teacher-detail/1">Python</Link>,
            <Link to="/teacher-detail/1">JavaScript</Link>
          </p>
          <p className="fw-bold">Recent Courses: <Link to="/teacher-detail/1">React JS</Link>,
          </p>
          <p className="fw-bold">Rating: 4.5/5</p>
        </div>
      </div>

      {/* Course Videos */}
      <div className="card mt-4">
        <h5 className="card-header">
            Course List
        </h5>
        <ul className="list-group list-group-flush">
          <Link to="/detail/1" className="list-group-item list-group-item-action"> PHP Course 1</Link>
          <Link to="/detail/1" className="list-group-item list-group-item-action"> PHP Course 2</Link>
          <Link to="/detail/1" className="list-group-item list-group-item-action"> Python Course 1</Link>
          <Link to="/detail/1" className="list-group-item list-group-item-action"> Python Course 2</Link>
          <Link to="/detail/1" className="list-group-item list-group-item-action"> JavaScript Course 1</Link>
          <Link to="/detail/1" className="list-group-item list-group-item-action"> JavaScript Course 2</Link>


        </ul>
      </div>
    </div>
  );
}
export default TeacherDetail;
