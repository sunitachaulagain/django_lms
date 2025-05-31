import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function StudentLogin() {
  const [studentLoginData, setStudentLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setStudentLoginData({
      ...studentLoginData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const studentFormData = new FormData();
    studentFormData.append("email", studentLoginData.email);
    studentFormData.append("password", studentLoginData.password);

    axios
      .post(baseUrl + "/student-login/", studentFormData)
      .then((res) => {
        setLoading(false);
        if (res.data.bool === true) {
          localStorage.setItem("studentLoginStatus", "true");
          localStorage.setItem("studentId", res.data.student_id);
          window.location.href = "/student-dashboard";
        } else {
          if (res.data.error === "email") {
            alert("User does not exist");
          } else {
            alert("Password is incorrect");
          }
          // Better UX: just clear fields instead of reloading whole page
          setStudentLoginData({ email: "", password: "" });
        }
      })
      .catch((error) => {
        setLoading(false);
        alert("Login error. Please try again.");
        console.error(error); // helpful for debugging
      });
  };

  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    if (studentLoginStatus === "true") {
      window.location.href = "/student-dashboard";
    }

  useEffect(() => {
    document.title = "Student Login";
    
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">Student Login</h5>
            <div className="card-body">
              <form onSubmit={submitForm}>
                <div className="mb-3">
                  <label htmlFor="studentEmail" className="form-label">
                    Email
                  </label>
                  <input
                    name="email"
                    value={studentLoginData.email}
                    onChange={handleChange}
                    type="email"
                    className="form-control"
                    id="studentEmail"
                    required
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="studentPassword" className="form-label">
                    Password
                  </label>
                  <input
                    name="password"
                    value={studentLoginData.password}
                    onChange={handleChange}
                    type="password"
                    className="form-control"
                    id="studentPassword"
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
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
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

export default StudentLogin;
