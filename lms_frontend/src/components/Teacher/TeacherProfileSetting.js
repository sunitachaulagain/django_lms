import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherProfileSetting() {
  const [TeacherData, setTeacherData] = useState({
    full_name: "",
    detail: "",
    email: "",
    qualification: "",
    mobile_no: "",
    skills: "",
    prev_img: "",
    f_img: "",
    status: "",
  });

  const teacher_id = localStorage.getItem("teacherId");

  useEffect(() => {
    try {
      axios.get(`${baseUrl}/teacher/${teacher_id}`).then((res) => {
        setTeacherData({
          full_name: res.data.full_name,
          detail: res.data.detail,
          email: res.data.email,
          qualification: res.data.qualification,
          mobile_no: res.data.mobile_no,
          skills: res.data.skills,
          prev_img: res.data.profile_img,
          f_img: "",
          status: "",
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [teacher_id]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files && files.length > 0) {
      setTeacherData({ ...TeacherData, f_img: files[0] });
    } else {
      setTeacherData({ ...TeacherData, [name]: value });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    const teacherFormData = new FormData();
    teacherFormData.append("full_name", TeacherData.full_name);
    teacherFormData.append("detail", TeacherData.detail);
    teacherFormData.append("email", TeacherData.email);
    teacherFormData.append("qualification", TeacherData.qualification);
    teacherFormData.append("mobile_no", TeacherData.mobile_no);
    teacherFormData.append("skills", TeacherData.skills);
    teacherFormData.append("status", TeacherData.status);
    if (TeacherData.f_img !== "") {
      teacherFormData.append("profile_img", TeacherData.f_img);
    }

    axios
      .patch(`${baseUrl}/teacher/${teacher_id}/`, teacherFormData)

      .then(() => {
        setTeacherData((prev) => ({
          ...prev,
          f_img: "", // clear file input only
          status: "success",
        }));
        window.location.reload();
      })

      .catch((error) => {
        if (error.response) {
          console.log("Validation error:", error.response.data);
          setTeacherData((prevData) => ({
            ...prevData,
            status: "error",
          }));
        } else {
          console.log("Error:", error.message);
        }
      });
  };

  useEffect(() => {
    document.title = "Teacher Profile";
  }, []);

  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus !== "true") {
    window.location.href = "/teacher-login";
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Profile Settings</h5>
            <div className="card-body">
              <form onSubmit={submitForm}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    value={TeacherData.full_name || ""}
                    name="full_name"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="fullName"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="detail" className="form-label">
                    Detail
                  </label>
                  <input
                    value={TeacherData.detail || ""}
                    name="detail"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="detail"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="teacherEmail" className="form-label">
                    Email
                  </label>
                  <input
                    value={TeacherData.email || ""}
                    name="email"
                    onChange={handleChange}
                    type="email"
                    className="form-control"
                    id="teacherEmail"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Profile Image</label>
                  {TeacherData.prev_img && (
                    <div className="mb-2">
                      <img
                        src={TeacherData.prev_img}
                        alt="Current"
                        width="200"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    className="form-control"
                    name="profile_photo"
                    alt={TeacherData.full_name}
                    onChange={handleChange} // use the general handler
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="qualification" className="form-label">
                    Qualification
                  </label>
                  <input
                    value={TeacherData.qualification || ""}
                    name="qualification"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="qualification"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    value={TeacherData.mobile_no || ""}
                    name="mobile_no"
                    onChange={handleChange}
                    type="tel"
                    className="form-control"
                    id="mobile"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="skills" className="form-label">
                    Skills
                  </label>
                  <textarea
                    value={TeacherData.skills || ""}
                    name="skills"
                    onChange={handleChange}
                    className="form-control"
                    id="skills"
                    rows="3"
                    placeholder="e.g., HTML, CSS, JavaScript, PHP"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherProfileSetting;
