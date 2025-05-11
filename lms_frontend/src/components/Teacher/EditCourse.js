import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const categoryUrl = "http://127.0.0.1:8000/api/category/";
const baseURL = "http://127.0.0.1:8000/api";

function EditCourse() {
  const [courseData, setCourseData] = useState({
    category: "",
    title: "",
    description: "",
    featured_img: null,
    techs: "",
  });

  const [categories, setCategories] = useState([]);
  const [existingImage, setExistingImage] = useState("");
  const navigate = useNavigate();
  const { course_id } = useParams();
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    axios
      .get(categoryUrl)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));

    axios
      .get(`${baseURL}/teacher-course-detail/${course_id}/`)
      .then((response) => {
        const course = response.data;
        setCourseData({
          category: course.category,
          title: course.title,
          description: course.description,
          featured_img: null,
          techs: course.techs,
        });
        setExistingImage(course.featured_img);
      })
      .catch((error) => {
        console.error("Error fetching course:", error);
      });
  }, [course_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setCourseData((prev) => ({
      ...prev,
      featured_img: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", courseData.category);
    formData.append("teacher", teacherId);
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    if (courseData.featured_img) {
      formData.append("featured_img", courseData.featured_img);
    }
    formData.append("techs", courseData.techs);

    axios
      .put(`${baseURL}/teacher-course-detail/${course_id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        Swal.fire({
          title: "Success!",
          text: "Course updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/teacher-courses");
        });
      })
      .catch((err) => {
        console.error("Error updating course:", err);
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <h5 className="card-header">Edit Course</h5>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Select Category</label>
                  <select
                    name="category"
                    className="form-control"
                    value={courseData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Course Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={courseData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Course Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="4"
                    value={courseData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Featured Image</label>
                  {existingImage && (
                    <div className="mb-2">
                      <img src={existingImage} alt="Current" width="200" />
                    </div>
                  )}
                  <input
                    type="file"
                    className="form-control"
                    name="featured_img"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Technologies</label>
                  <input
                    type="text"
                    className="form-control"
                    name="techs"
                    value={courseData.techs}
                    onChange={handleChange}
                    required
                  />
                  <small className="form-text text-muted">
                    Separate technologies with commas (e.g., React, Django)
                  </small>
                </div>

                <div className="mb-3 text-end">
                  <button type="submit" className="btn btn-primary">
                    Update Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
