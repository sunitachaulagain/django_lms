import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const siteURL = "http://127.0.0.1:8000/";
const baseURL = "http://127.0.0.1:8000/api";

function CourseDetail() {
  const [courseData, setCourseData] = useState({});
  const [chapterData, setChapterData] = useState([]);
  const [teacherData, setTeacherData] = useState(null);
  const [relatedCourseData, setRelatedCourseData] = useState([]);
  const [techListData, setTechListData] = useState([]);
  const [studentLoginStatus, setStudentLoginStatus] = useState(false);
  const [enrollStatus, setEnrollStatus] = useState(false);
  const [ratingInput, setRatingInput] = useState({ rating: "", review: "" });
  const [ratingStatus, setRatingStatus] = useState();
  const[averageRating, setAverageRating]=useState(0);

  const { course_id } = useParams();
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await axios.get(`${baseURL}/course/${course_id}/`);
        const data = res.data;
        setCourseData(data);
        setTeacherData(data.teacher || null);
        setChapterData(data.course_chapters || []);
        console.log("Chapter data:", JSON.stringify(data.course_chapters, null, 2));
        setRelatedCourseData(JSON.parse(data.related_videos || "[]"));
        setTechListData(data.tech_list || []);
        if(res.data.course_rating != '' && res.data.course_rating != null){
          setAverageRating(res.data.course_rating )
        }
      
      } catch (error) {
        console.error("Error fetching course data:", error);
      }

      const isLoggedIn = localStorage.getItem("studentLoginStatus") === "true";
      setStudentLoginStatus(isLoggedIn);

      if (isLoggedIn && studentId) {
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
    };

    fetchCourseData();
  }, [course_id, studentId]);

  useEffect(() => {
    if (studentId) {
      axios
        .get(`${baseURL}/fetch-rating-status/${studentId}/${course_id}/`)
        .then((res) => {
          if (res.data.bool === true) {
            setRatingStatus("Success");
          }
        })
        .catch((error) => {
          console.error("Error fetching rating status:", error);
        });
    }
  }, [course_id, studentId]);

  const enrollCourse = async () => {
    if (!studentId) {
      return Swal.fire({ icon: "error", title: "Please log in first." });
    }

    const payload = {
      student: parseInt(studentId, 10),
      course: parseInt(course_id, 10),
    };

    try {
      await axios.post(`${baseURL}/student-enroll-course/`, payload, {
        headers: { "Content-Type": "application/json" },
      });

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

  const handleChange = (e) => {
    setRatingInput({ ...ratingInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId) {
      return Swal.fire({ icon: "error", title: "Please log in first." });
    }

    if (!ratingInput.rating ) {
      return Swal.fire({
        icon: "warning",
        title: "Incomplete Input",
        text: "Please provide both a rating and a review.",
      });
    }

    const payload = {
      student: parseInt(studentId, 10),
      course: parseInt(course_id, 10),
      rating: parseInt(ratingInput.rating, 10),
      review: ratingInput.review.trim(),
    };

    try {
      await axios.post(`${baseURL}/course-rating/${course_id}/`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      Swal.fire({
        icon: "success",
        title: "Thank you!",
        text: "Your rating has been submitted.",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
      });
      
      setRatingInput({ rating: "", review: "" });
      setRatingStatus("Success");
      window.location.reload();
    } catch (error) {
      console.error(
        "Error submitting rating:",
        error.response?.data || error.message
      );
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an error submitting your review. Please try again.",
      });
    }
  };


  return (
    <div className="container mt-3" style={{ fontFamily: "Arial, sans-serif" }}>
      <div className="row">
        <div className="col-4">
          <img
            src={courseData.featured_img}
            className="img-fluid rounded shadow"
            alt={courseData.title}
          />
        </div>
        <div className="col-md-8">
          <h3 className="fw-bold">{courseData.title}</h3>
          <p>{courseData.description}</p>
          <p className="fw-bold">
            Course By:{" "}
            {courseData.teacher_detail?.full_name ? (
              <Link to={`/teacher-detail/${courseData.teacher_detail.id}`}>
                {courseData.teacher_detail.full_name}
              </Link>
            ) : (
              "N/A"
            )}
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
          <p className="fw-bold">
            Total Enrolled: {courseData.total_enrolled_students} student(s)
          </p>

          
         <p className="fw-bold">
            Rating: {averageRating.rating__avg ? averageRating.rating__avg.toFixed(1) : 'No rating yet'}  
            {studentLoginStatus && enrollStatus && (
              <div>
                {ratingStatus !== "Success" &&(
                <button
                  className="btn btn-success btn-sm ms-2"
                  data-bs-toggle="modal"
                  data-bs-target="#ratingModal"

                >
                  Rate This Course
                </button>
                )
                }
                {ratingStatus === "Success" &&(
                  <small className="badge bg-warning text-dark ms-2">You already rated this code</small>
                )}
                

                <div
                  className="modal fade"
                  id="ratingModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  onClick={(e) => e.currentTarget.blur()} // ✅ removes focus

                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Rate for {courseData.title}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                        ></button>
                      </div>

                      <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label htmlFor="ratingSelect" className="form-label">
                              Rating
                            </label>
                            <select
                              id="ratingSelect"
                              name="rating"
                              value={ratingInput.rating}
                              onChange={handleChange}
                              className="form-control"
                            >
                              <option value="">Select Rating</option>
                              <option value="1">⭐</option>
                              <option value="2">⭐⭐</option>
                              <option value="3">⭐⭐⭐</option>
                              <option value="4">⭐⭐⭐⭐</option>
                              <option value="5">⭐⭐⭐⭐⭐</option>
                            </select>
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="reviewTextarea"
                              className="form-label"
                            >
                              Review
                            </label>
                            <textarea
                              id="reviewTextarea"
                              name="review"
                              rows="4"
                              className="form-control"
                              onChange={handleChange}
                              value={ratingInput.review}
                            ></textarea>
                          </div>

                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )} 
          </p>

          {studentLoginStatus ? (
            enrollStatus ? (
              <button className="btn btn-secondary mt-2" disabled>
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
                  <Link
                    to={`/detail/${rc.pk}`}
                    className="text-decoration-none"
                  >
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
