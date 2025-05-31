import { Link } from "react-router-dom";
import Sidebar from "./SideBar";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function MyAssignments() {
  const [assignmentData, setAssignmentData] = useState([]);
  const [assignmentStatus, setAssignmentStatus] = useState({});
  const student_id = localStorage.getItem("studentId");

  useEffect(() => {
    axios
      .get(`${baseUrl}/my-assignments/${student_id}`)
      .then((res) => {
        setAssignmentData(res.data);
        const statusMap = {};
        res.data.forEach((a) => {
          statusMap[a.id] = a.student_status || false; // Assuming backend gives this
        });
        setAssignmentStatus(statusMap);
      })
      .catch((error) => {
        console.log("Error fetching assignments:", error);
      });
  }, [student_id]);

  const markAsDone = (assignment_id, title, detail, student, teacher) => {
  const formData = new FormData();
  formData.append("student_status", true);  // ✅ Corrected field name
  formData.append("title", title);
  formData.append("detail", detail);
  formData.append("student", student);      // ✅ should be an ID
  formData.append("teacher", teacher);      // ✅ should be an ID

  axios
    .put(`${baseUrl}/update-assignments/${assignment_id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Congrats on completing the task!",
          icon: "success",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
        setAssignmentStatus((prevStatus) => ({
          ...prevStatus,
          [assignment_id]: true,
        }));
      }
    })
    .catch((error) => {
      console.error("Error updating assignment:", error);
    });
};


  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">My Assignments</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Detail</th>
                    <th>Created By</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignmentData.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No assignments found.
                      </td>
                    </tr>
                  ) : (
                    assignmentData.map((row) => (
                      <tr key={row.id}>
                        <td>{row.title}</td>
                        <td>{row.detail}</td>
                        <td>
                          {row.teacher ? (
                            <Link to={`/teacher-detail/${row.teacher.id}`}>
                              {row.teacher.full_name}
                            </Link>
                          ) : (
                            "Unknown"
                          )}
                        </td>
                        <td>
                          {!assignmentStatus[row.id] ? (
                            <button
                              onClick={() =>
                                markAsDone(
                                  row.id,
                                  row.title,
                                  row.detail,
                                  row.student,
                                  row.teacher?.id || ""
                                )
                              }
                              className="btn btn-success btn-sm"
                            >
                              Mark as Done
                            </button>
                          ) : (
                            <span className="btn btn-primary btn-sm disabled">
                              Completed
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyAssignments;

