import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";

const baseUrl = "http://127.0.0.1:8000/api";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({});
  const student_id = localStorage.getItem("studentId");
  const teacher_id = localStorage.getItem("teacherId"); // In case needed

  useEffect(() => {
    axios
      .get(`${baseUrl}/student/dashboard/${student_id}`)
      .then((response) => {
        setDashboardData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, [student_id]); // Make sure to add dependency array to avoid repeated API calls

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <SideBar />
        </aside>
        <section className="col-md-9">
          <div className="row">
            <div className="col-md-4">
              <div className="card border-primary shadow-sm">
                <h5 className="card-header bg-primary text-white">
                  Enrolled Courses
                </h5>
                <div className="card-body">
                  <h3>
                    <Link to="/my-courses">
                      {dashboardData.enrolled_courses ?? 0}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-primary shadow-sm">
                <h5 className="card-header bg-primary text-white">
                  Favorite Courses
                </h5>
                <div className="card-body">
                  <h3>
                    <Link to="/favourite-courses">
                      {dashboardData.favorite_courses ?? 0}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-primary shadow-sm">
                <h5 className="card-header bg-primary text-white">
                  Assignments
                </h5>
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to="/my-assignments">
                      Completed: {dashboardData.completed_assignments ?? 0}{" "}
                      
                      Pending: {dashboardData.pending_assignments ?? 0}
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
