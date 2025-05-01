import { Link } from "react-router-dom";
import { useEffect } from "react";   
function Register() {
  useEffect(()=>{
    document.title='LMS| Student Register Page';
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">User Register</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="interest" className="form-label">
                    Interest
                  </label>
                  <textarea
                    className="form-control"
                    id="interest"
                    rows="3"
                  ></textarea>
                      <div id="InterestHelp" class="form-text">Java, Python,php.....etc</div>

                </div>
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
