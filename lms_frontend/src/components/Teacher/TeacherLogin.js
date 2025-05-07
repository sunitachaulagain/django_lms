import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function Login() {
  const [teacherLoginData, setTeacherLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);  // For loading state

  const handleChange = (event) => {
    setTeacherLoginData({
      ...teacherLoginData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log("Submitting login with", teacherLoginData);  // Log the data being sent
    setLoading(true);  // Start loading indicator
  
    const teacherFormData = new FormData();
    teacherFormData.append("email", teacherLoginData.email);
    teacherFormData.append("password", teacherLoginData.password);
  
    axios
      .post(baseUrl + "/teacher-login/", teacherFormData)
      .then((res) => {
        //setLoading(false);
        if (res.data.bool === true) {
          localStorage.setItem("teacherLoginStatus", "true");
          localStorage.setItem("teacherId", res.data.teacher_id);

          window.location.href = "/teacher-dashboard"; // Redirect after successful login
        } else {
          alert("Invalid login details");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response ? error.response.data : error.message);
        alert(error.response ? error.response.data.message : "Error during login. Please try again.");
      });
  };
  

const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");

  useEffect(() => {
    document.title = "Teacher Login";
    if (teacherLoginStatus === "true") {
      window.location.href = "/teacher-dashboard"; // Redirect if already logged in
    }
  }, []);  // Empty dependency array means it runs only once, on mount

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
                {/* <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="teacherRemember"
                  />
                  <label className="form-check-label" htmlFor="teacherRemember">
                    Remember Me!
                  </label>
                </div> */}
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Logging In..." : "Login"}
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