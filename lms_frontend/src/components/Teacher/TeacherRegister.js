import { Link, useNavigate } from "react-router-dom"; // ✅ Updated
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api/teacher/';

function Register() {
  const [TeacherData, setTeacherData] = useState({
    full_name: "",
    email: "",
    password: "",
    qualification: "",
    mobile_no: "",
    skills: "",
    status: "",
  });

  const navigate = useNavigate(); // ✅ Added

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTeacherData({
      ...TeacherData,
      [name]: value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    const teacherFormData = new FormData();
    teacherFormData.append("full_name", TeacherData.full_name);
    teacherFormData.append("email", TeacherData.email);
    teacherFormData.append("password", TeacherData.password);
    teacherFormData.append("qualification", TeacherData.qualification);
    teacherFormData.append("mobile_no", TeacherData.mobile_no);
    teacherFormData.append("skills", TeacherData.skills);
    teacherFormData.append("status", TeacherData.status);

    axios.post(baseUrl, teacherFormData)
      .then((response) => {
        setTeacherData({
          full_name: "",
          email: "",
          password: "",
          qualification: "",
          mobile_no: "",
          skills: "",
          status: "success",
        });

        // ✅ Redirect after successful registration
        navigate('/teacher-login');
      })
      .catch((error) => {
        if (error.response) {
          console.log("Validation error:", error.response.data);
          setTeacherData(prevData => ({
            ...prevData,
            status: "error"
          }));
        } else {
          console.log("Error:", error.message);
        }
      });
  };

  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
  if (teacherLoginStatus === 'true') {
    window.location.href = '/teacher-dashboard';
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          {TeacherData.status === 'success' && (
            <p className="text-success">Thanks For Your registration.</p>
          )}
          {TeacherData.status && TeacherData.status !== 'success' && (
            <p className="text-danger">Something went wrong!!!</p>
          )}

          <div className="card">
            <h5 className="card-header">Teacher Registration</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input
                    value={TeacherData.full_name}
                    name="full_name"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="fullName"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="teacherEmail" className="form-label">Email</label>
                  <input
                    value={TeacherData.email}
                    name="email"
                    onChange={handleChange}
                    type="email"
                    className="form-control"
                    id="teacherEmail"
                    aria-describedby="emailHelp"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    value={TeacherData.password}
                    name="password"
                    onChange={handleChange}
                    type="password"
                    className="form-control"
                    id="password"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="qualification" className="form-label">Qualification</label>
                  <input
                    value={TeacherData.qualification}
                    name="qualification"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="qualification"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">Mobile Number</label>
                  <input
                    value={TeacherData.mobile_no}
                    name="mobile_no"
                    onChange={handleChange}
                    type="tel"
                    className="form-control"
                    id="mobile"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="skills" className="form-label">Skills</label>
                  <textarea
                    value={TeacherData.skills}
                    name="skills"
                    onChange={handleChange}
                    className="form-control"
                    id="skills"
                    rows="3"
                    placeholder="e.g., HTML, CSS, JavaScript, PHP"
                  ></textarea>
                </div>

                <button
                  onClick={submitForm}
                  type="submit"
                  className="btn btn-primary"
                >
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
