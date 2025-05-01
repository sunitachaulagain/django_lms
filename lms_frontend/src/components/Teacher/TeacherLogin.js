import { Link } from "react-router-dom";
import { useEffect } from "react";
function Login() {
  useEffect(()=>{
    document.title='Teacher Login';
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">Teacher Login</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="teacherEmail" className="form-label">
                    Username
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="teacherEmail"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="teacherPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="teacherPassword"
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="teacherRemember"
                  />
                  <label className="form-check-label" htmlFor="teacherRemember">
                    Remember Me!
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
