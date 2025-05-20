import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TeacherSidebar from "./TeacherSidebar";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherDashboard() {
  const [dashboardData, setDashboardData] = useState({});
  const teacher_id = localStorage.getItem("teacherId");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/teacher/dashboard/${teacher_id}`);
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
    document.title = "Teacher Dashboard";
  }, [teacher_id]); // Run only on mount or if teacher_id changes

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="row">
            <div className="col-md-4">
              <div className="card border-primary shadow-sm">
                <h5 className="card-header bg-primary text-white">Total Courses</h5>
                <div className="card-body">
                  <h3>
                    <Link to="/teacher-courses">
                      {dashboardData.total_teacher_courses ?? 0}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            {/* Add more dashboard cards here as needed */}
            <div className="col-md-4">
              <div className="card border-primary shadow-sm">
                <h5 className="card-header bg-primary text-white">Total students</h5>
                <div className="card-body">
                  <h3>
                    <Link to="/view-students">
                      {dashboardData.total_teacher_students ?? 0}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-primary shadow-sm">
                <h5 className="card-header bg-primary text-white">Total Chapters</h5>
                <div className="card-body">
                  <h3>
                    <Link to="/teacher-courses">
                      {dashboardData.total_teacher_chapters ?? 0}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherDashboard;
