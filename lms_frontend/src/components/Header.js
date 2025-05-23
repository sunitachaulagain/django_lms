import { Link } from 'react-router-dom';

function Header() {
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
  const studentLoginStatus = localStorage.getItem('studentLoginStatus');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">LearnBook</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" aria-current="page">Home</Link>
            </li>

            <li className="nav-item">
              <Link to="/all-courses" className="nav-link">Courses</Link>
            </li>

            {/* Teachers Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="teacherDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Teachers
              </a>
              <ul className="dropdown-menu" aria-labelledby="teacherDropdown">
                {teacherLoginStatus !== 'true' && (
                  <>
                    <li><Link to="/teacher-login" className="dropdown-item">Login</Link></li>
                    <li><Link to="/teacher-register" className="dropdown-item">Register</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                  </>
                )}
                {teacherLoginStatus === 'true' && (
                  <>
                    <li><Link to="/teacher-dashboard" className="dropdown-item">Dashboard</Link></li>
                    <li><Link to="/teacher-logout" className="dropdown-item">Logout</Link></li>
                  </>
                )}
              </ul>
            </li>

            {/* Students Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="studentDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Student
              </a>
              <ul className="dropdown-menu" aria-labelledby="studentDropdown">
                {studentLoginStatus !== 'true' && (
                  <>
                    <li><Link to="/student-register" className="dropdown-item">Register</Link></li>
                    <li><Link to="/student-login" className="dropdown-item">Login</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                  </>
                )}
                {studentLoginStatus === 'true' && (
                  <>
                    <li><Link to="/student-dashboard" className="dropdown-item">Dashboard</Link></li>
                    <li><Link to="/student-logout" className="dropdown-item">Logout</Link></li>
                  </>
                )}
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
