import { Link } from "react-router-dom";
import Sidebar from "./SideBar";
import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function MyCourses() {
  const [courseData, setCourseData] = useState([]);
  const student_id = localStorage.getItem("studentId");

  //fetch student here
  useEffect(() => {
    try {
      axios
        .get(baseUrl + "/fetch-enrolled-courses/" + student_id)
        .then((res) => {
          setCourseData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div class="container mt-4">
      <div class="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div class="card">
            '<h5 className="card-header">My Courses</h5>
            <div class="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Created By</th>
                  </tr>
                </thead>
                <tbody>
                  {courseData.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <Link to={`/detail/${row.course?.id}`}>
                          {row.course?.title}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/teacher-detail/${row.course?.teacher?.id}`}>
                          {row.course?.teacher?.full_name}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyCourses;
