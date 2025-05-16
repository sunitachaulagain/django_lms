import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const baseURL = "http://127.0.0.1:8000/api/student/";

function Register() {
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    full_name: "",
    email: "",
    username: "",
    password: "",
    interested_categories: "",
  });

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  const SubmitForm = (e) => {
    e.preventDefault();

    const studentFormData = new FormData();
    studentFormData.append("full_name", studentData.full_name);
    studentFormData.append("email", studentData.email);
    studentFormData.append("username", studentData.username);
    studentFormData.append("password", studentData.password);
    studentFormData.append("interested_categories", studentData.interested_categories);

    axios
      .post(baseURL, studentFormData)
      .then((response) => {
        setStudentData({
          full_name: "",
          email: "",
          username: "",
          password: "",
          interested_categories: "",
          status: "success",
        });

        // SweetAlert success
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "User has been created successfully!",
          confirmButtonText: "Go to Login",
        }).then(() => {
          navigate("/student-login");
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setStudentData({ ...studentData, status: "error" });

        // SweetAlert error
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "There was a problem creating the user.",
        });
      });
  };

  useEffect(() => {
    document.title = "LMS | Student Register";
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">User Register</h5>
            <div className="card-body">
              <form onSubmit={SubmitForm}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="full_name"
                    value={studentData.full_name}
                    onChange={handleChange}
                    required
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
                    name="email"
                    value={studentData.email}
                    onChange={handleChange}
                    required
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
                    name="username"
                    value={studentData.username}
                    onChange={handleChange}
                    required
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
                    name="password"
                    value={studentData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="interest" className="form-label">
                    Interested Categories
                  </label>
                  <textarea
                    className="form-control"
                    name="interested_categories"
                    id="interest"
                    rows="3"
                    value={studentData.interested_categories}
                    onChange={handleChange}
                    placeholder="Java, Python, PHP..."
                  ></textarea>
                  <div id="InterestHelp" className="form-text">
                    E.g., Java, Python, PHP, etc.
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </form>
              <p className="mt-3">
                Already have an account? <Link to="/student-login">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
