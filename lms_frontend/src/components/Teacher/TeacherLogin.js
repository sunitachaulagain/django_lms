import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function Login() {
  const [teacherLoginData, setTeacherLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setTeacherLoginData({
      ...teacherLoginData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
  
    const teacherFormData = new FormData();
    teacherFormData.append("email", teacherLoginData.email);
    teacherFormData.append("password", teacherLoginData.password);
  
    axios
      .post(baseUrl + "/teacher-login/", teacherFormData)
      .then((res) => {
        setLoading(false);
        if (res.data.bool === true) {
          localStorage.setItem("teacherLoginStatus", "true");
          localStorage.setItem("teacherId", res.data.teacher_id);
          window.location.href = "/teacher-dashboard";
        } else {
          if (res.data.error === "email") {
            alert("User does not exist");
          } else {
            alert("Password is incorrect");
          }
          window.location.reload(); // Refresh after showing alert
        }
      })
      .catch((error) => {
        setLoading(false);
        alert("Login error. Please try again.");
        window.location.reload();
      });
  };

  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");

  useEffect(() => {
    document.title = "Teacher Login";
    if (teacherLoginStatus === "true") {
      window.location.href = "/teacher-dashboard";
    }
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">Teacher Login</h5>
            <div className="card-body">
              <form onSubmit={submitForm}>
                <div className="mb-3">
                  <label htmlFor="teacherEmail" className="form-label">
                    Email
                  </label>
                  <input
                    name="email"
                    value={teacherLoginData.email}
                    onChange={handleChange}
                    type="email"
                    className="form-control"
                    id="teacherEmail"
                    required
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="teacherPassword" className="form-label">
                    Password
                  </label>
                  <input
                    name="password"
                    value={teacherLoginData.password}
                    onChange={handleChange}
                    type="password"
                    className="form-control"
                    id="teacherPassword"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Logging In...
                    </>
                  ) : (
                    "Login"
                  )}
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