import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const siteURL = "http://127.0.0.1:8000/";
const baseURL = "http://127.0.0.1:8000/api";

function CourseDetail() {
  const [courseData, setCourseData] = useState({});
  const [chapterData, setChapterData] = useState([]);
  const [teacherData, setTeacherData] = useState({});
  const [relatedCourseData, setRelatedCourseData] = useState([]);
  const [techListData, setTechListData] = useState([]);
  const [studentLoginStatus, setStudentLoginStatus] = useState(false);
  const [enrollStatus, setEnrollStatus] = useState(false);

  const { course_id } = useParams();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/course/${course_id}/`);
        setCourseData(data);
        setTeacherData(data.teacher || {});
        setChapterData(data.course_chapters || []);
        setRelatedCourseData(JSON.parse(data.related_videos || "[]"));
        setTechListData(data.tech_list || []);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }

      const isLoggedIn = localStorage.getItem("studentLoginStatus") === "true";
      setStudentLoginStatus(isLoggedIn);

      if (isLoggedIn) {
        const studentId = localStorage.getItem("studentId");
        if (studentId) {
          try {
            const response = await axios.get(
              `${baseURL}/student-enroll-status/${studentId}/${course_id}/`
            );
            if (response.data.bool === true) {
              setEnrollStatus(true);
            }
          } catch (error) {
            console.error("Error fetching enroll status:", error);
          }
        }
      }
    };

    fetchCourseData();
  }, [course_id]);

  const enrollCourse = async () => {
    const studentIdRaw = localStorage.getItem("studentId");
    if (!studentIdRaw) {
      return Swal.fire({ icon: "error", title: "Please log in first." });
    }

    const payload = {
      student: parseInt(studentIdRaw, 10),
      course: parseInt(course_id, 10),
    };

    try {
      const { data } = await axios.post(
        `${baseURL}/student-enroll-course/`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Enrollment successful:", data);
      setEnrollStatus(true);
      Swal.fire({
        title: "Enrolled!",
        text: "You have successfully enrolled in this course.",
        icon: "success",
        toast: true,
        position: "top-end",
        timer: 1500,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error(
        "Error enrolling in course:",
        error.response?.data || error.message
      );
      const msg =
        error.response?.data?.non_field_errors?.[0] ||
        error.response?.data?.detail ||
        "An error occurred while enrolling.";
      Swal.fire({ icon: "error", title: "Enrollment Failed", text: msg });
    }
  };

  return (
    <div className="container mt-4" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Course Info */}
      <div className="row mb-4">
        <div className="col-md-4">
          <img
            src={courseData.featured_img}
            className="img-fluid rounded shadow"
            alt="Course"
          />
        </div>
        <div className="col-md-8">
          <h2 className="fw-bold">{courseData.title}</h2>
          <p>{courseData.description}</p>
          <p className="fw-bold">
            Course By:{" "}
            <Link to={`/teacher-detail/${teacherData.id}`}>
              {teacherData.full_name}
            </Link>
          </p>
          <p className="fw-bold">
            Techs:{" "}
            {techListData.map((tech, i) => (
              <Link
                to={`/category/${tech.trim()}`}
                key={i}
                className="badge bg-warning text-dark me-1"
              >
                {tech}
              </Link>
            ))}
          </p>
          <p className="fw-bold">Duration: 3h 30m</p>
          <p className="fw-bold">Total Enrolled: 456+ Students</p>
          <p className="fw-bold">Rating: 4.5/5</p>

          {studentLoginStatus ? (
            enrollStatus ? (
              <button className="btn btn-secondary" disabled>
                Already Enrolled
              </button>
            ) : (
              <button onClick={enrollCourse} className="btn btn-success">
                Enroll in this course
              </button>
            )
          ) : (
            <Link to="/student-login" className="btn btn-primary">
              Login to Enroll
            </Link>
          )}
        </div>
      </div>

      {/* Chapters */}
      <div className="card mt-4 shadow-sm">
        <h5 className="card-header bg-primary text-white">In this Course:</h5>
        <ul className="list-group list-group-flush">
          {chapterData.map((ch, i) => (
            <li
              key={i}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {ch.title}
              <span>
                <small className="text-muted me-3">
                  {ch.duration || "Duration n/a"}
                </small>
                <button
                  className="btn btn-sm btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target={`#videoModal${i}`}
                >
                  <i className="bi bi-youtube"></i>
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Modals */}
      {chapterData.map((ch, i) => (
        <div
          key={i}
          className="modal fade"
          id={`videoModal${i}`}
          tabIndex="-1"
          aria-labelledby={`videoModalLabel${i}`}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`videoModalLabel${i}`}>
                  {ch.title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="ratio ratio-16x9">
                  <video controls style={{ width: "100%" }}>
                    <source src={ch.video} type="video/mp4" />
                    Your browser does not support video.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Related Courses */}
      <h3 className="mt-5 mb-4">Related Courses</h3>
      <div className="row">
        {relatedCourseData.map((rc, i) => (
          <div className="col-md-3 mb-3" key={i}>
            <div className="card shadow-sm">
              <Link to={`/detail/${rc.pk}`}>
                <img
                  src={`${siteURL}media/${rc.fields.featured_img}`}
                  className="card-img-top"
                  alt={rc.fields.title}
                  style={{ height: 200, objectFit: "cover" }}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/detail/${rc.pk}`} className="text-decoration-none">
                    {rc.fields.title}
                  </Link>
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseDetail;
