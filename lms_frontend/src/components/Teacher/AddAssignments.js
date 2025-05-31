import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherSidebar from "./TeacherSidebar";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const baseURL = "http://127.0.0.1:8000/api";

function AddAssignments() {
  const { studentId, teacherId } = useParams();
  const [assignmentData, setAssignmentData] = useState({
    title: "",
    detail: "",
  });
  // const [courses, setCourses] = useState([]);

  // // Fetch teacher's courses
  // useEffect(() => {
  //   axios.get(`${baseURL}/teacher-courses/`)
  //     .then(response => setCourses(response.data))
  //     .catch(error => console.error("Error loading courses:", error));
  // }, []);

  const handleChange = (event) => {
    setAssignmentData({
      ...assignmentData,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", assignmentData.title);
    formData.append("detail", assignmentData.detail);
    //  formData.append("student_id", studentId);
    //  formData.append("teacher_id", teacherId);

    axios.post(`${baseURL}/student-assignment/${teacherId}/${studentId}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log("Assignment submitted:", response.data);
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Assignment added successfully!",
          icon: "success",
          timer: 3000,
          showConfirmButton: false
        });
        window.location.reload(); // Refresh to show latest state
        
      }
    })
    .catch(error => {
      console.error("Submission error:", error);
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>

        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Add Assignment for Student #{studentId}</h5>
            <div className="card-body">
              <form onSubmit={formSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={assignmentData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Detail</label>
                  <textarea
                    className="form-control"
                    name="detail"
                    rows="3"
                    value={assignmentData.detail}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-success">
                  Add Assignment
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AddAssignments;
