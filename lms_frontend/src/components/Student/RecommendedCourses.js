import { Link } from "react-router-dom";
import Sidebar from "./SideBar";
import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function RecommendedCourses() {
  const [courseData, setCourseData] = useState([]);
  const student_id = localStorage.getItem("studentId");

  //fetch student here
  useEffect(() => {
    try {
      axios
        .get(baseUrl + "/recommended-courses/" + student_id)
        .then((res) => {
          setCourseData(res.data);

        });
        console.log("Received course data:", courseData);

    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            '<h5 className="card-header">Recommended Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Technologies</th>
                  </tr>
                </thead>
                <tbody>
                  {courseData.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <Link to={`/detail/${row.id}`}>
                          {row.title}
                        </Link>
                      </td>
                      <td>
                          {row.techs}
                     
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

export default RecommendedCourses;
