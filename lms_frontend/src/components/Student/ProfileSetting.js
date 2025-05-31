import { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import ChangePassword from "./ChangePassword";

const baseUrl = "http://127.0.0.1:8000/api";

function ProfileSetting() {
  const [studentData, setStudentData] = useState({
    full_name: "",
    email: "",
    username: "",
    interested_categories: "",
    profile_img: "",
    p_img: "", // image file for upload
  });

  const student_id = localStorage.getItem("studentId");

  useEffect(() => {
    if (!student_id) return;

    axios
      .get(`${baseUrl}/student-detail/${student_id}`)
      .then((res) => {
        setStudentData({
          full_name: res.data.full_name,
          email: res.data.email,
          username: res.data.username,
          interested_categories: res.data.interested_categories,
          profile_img: res.data.profile_img,
          p_img: "",
        });
      })
      .catch((error) => {
        console.log("Error fetching student data:", error);
      });
  }, [student_id]);

  // const handleChange = (event) => {
  //   setStudentData({
  //     ...studentData,
  //     [event.target.name]: event.target.value,
  //   });
  // };


  //handle Change

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files && files.length > 0) {
      setStudentData({ ...studentData, f_img: files[0] });
    } else {
      setStudentData({ ...studentData, [name]: value });
    }
  };
  // // //

  // const handleFileChange = (event) => {
  //   setStudentData({
  //     ...studentData,
  //     [event.target.name]: event.target.files[0] || "",
  //   });
  // };

  const submitForm = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("full_name", studentData.full_name);
    formData.append("email", studentData.email);
    formData.append("username", studentData.username);
    formData.append("interested_categories", studentData.interested_categories);

    if (studentData.p_img !== "") {
      formData.append("profile_img", studentData.p_img);
    }

    axios
      .patch(`${baseUrl}/student-detail/${student_id}/`, formData)
.then(() => {
  Swal.fire({
    icon: 'success',
    title: 'Profile Updated!',
    text: 'Your profile has been updated successfully.',
    confirmButtonText: 'OK',
  });
  // Optionally, update state or re-fetch data here instead of reload
})
      .catch((error) => {
        console.log(
          "Error updating profile:",
          error.response?.data || error.message
        );
      });
  };

  useEffect(() => {
    document.title = "Student Profile";
  }, []);

  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  if (studentLoginStatus !== "true") {
    window.location.href = "/student-login";
  }

  if (!student_id) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <SideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Profile Settings</h5>
            <div className="card-body">
              <form onSubmit={submitForm}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    value={studentData.full_name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={studentData.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={studentData.username}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Interested Categories</label>
                  <input
                    type="text"
                    name="interested_categories"
                    value={studentData.interested_categories}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Profile Image</label>
                  {studentData.profile_img && (
                    <div className="mb-2">
                      <img
                        src={`http://127.0.0.1:8000${studentData.profile_img}`}
                        alt="Profile"
                        width="200"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    name="p_img"
                    className="form-control"
                    alt={studentData.full_name}
                    onChange={handleChange}
                  />
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

export default ProfileSetting;
