import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
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
              <Link to="/" className="nav-link active" aria-current="page">Home</Link>
            </li>

            <li className="nav-item">
              <Link to="/courses" className="nav-link">Courses</Link>
            </li>

            <li className="nav-item">
              <Link to="/teachers" className="nav-link">Teachers</Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                User
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/user-register">Register</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/user-login">Login</Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/user-dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/">Logout</Link>
                </li>
              </ul>
            </li>

            {/* <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li> */}

            {/* <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown link
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
