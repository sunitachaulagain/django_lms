import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const siteURL = "http://127.0.0.1:8000/";

const baseURL = "http://127.0.0.1:8000/api";

function CourseDetail() {
  const [courseData, setCourseData] = useState({});
  const [chapterData, setChapterData] = useState([]);
  const [teacherData, setTeacherData] = useState({});
  const [relatedCourseData, setRelatedCourseData] = useState([]);

  const { course_id } = useParams();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${baseURL}/course/${course_id}`);
        const data = response.data;

        setCourseData(data);
        setTeacherData(data.teacher || {});
        setChapterData(data.course_chapters || []);
        setRelatedCourseData(JSON.parse(data.related_videos));
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [course_id]);

  return (
    <div className="container mt-4" style={{ fontFamily: "Arial, sans-serif" }}>
      <div className="row mb-4">
        <div className="col-md-4">
          <img
            src={courseData.featured_img}
            className="img-fluid rounded shadow"
            alt="Course"
          />
        </div>

        <div className="col-md-8">
          <h2 style={{ fontWeight: "bold" }}>{courseData.title}</h2>
          <p>{courseData.description}</p>
          <p className="fw-bold">
            Course By:{" "}
            <Link to={`/teacher-detail/${teacherData.id}`}>
              {teacherData.full_name}
            </Link>
          </p>
          <p className="fw-bold">Technologies: {courseData.techs}</p>
          <p className="fw-bold">Duration: 3 Hours 30 Minutes</p>
          <p className="fw-bold">Total Enrolled: 456+ Students</p>
          <p className="fw-bold">Rating: 4.5/5</p>
        </div>
      </div>

      {/* Course Videos */}
      <div className="card mt-4 shadow-sm">
        <h5 className="card-header bg-primary text-white">In this Course:</h5>
        <ul className="list-group list-group-flush">
          {chapterData.map((chapter, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {chapter.title}
              <span>
                <span className="me-4 text-muted">
                  {chapter.duration || "Duration not set"}
                </span>
                <button
                  className="btn btn-sm btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target={`#videoModal${index}`}
                >
                  <i className="bi bi-youtube"></i>
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Video Modals */}
      {chapterData.map((chapter, index) => (
        <div
          key={index}
          className="modal fade"
          id={`videoModal${index}`}
          tabIndex="-1"
          aria-labelledby={`videoModalLabel${index}`}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`videoModalLabel${index}`}>
                  {chapter.title}
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
                  <video width="100%" height="auto" controls>
                    <source src={chapter.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Related Courses */}
      <h3 className="pb-1 mb-4 mt-5">Related Courses</h3>
      <div className="row mb-4">
        {relatedCourseData.map((rcourse, index) => (
          <div className="col-md-3 mb-3" key={index}>
            <div className="card shadow-sm">
              <Link to={`/detail/${rcourse.pk}`}>
                <img
                  target = "_blank"
                  style={{ height: "200px", objectFit: "cover" }}
                  src={`${siteURL}media/${rcourse.fields.featured_img}`}
                  className="card-img-top"
                  alt={rcourse.fields.title}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link
                    to={`/detail/${rcourse.pk}`}
                    className="text-decoration-none"
                  >
                    {rcourse.fields.title}
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
