import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const categoryUrl = "http://127.0.0.1:8000/api/category/";
const courseUrl = "http://127.0.0.1:8000/api/course/";

function AddCourses() {
  const [courseData, setCourseData] = useState({
    category: "",
    title: "",
    description: "",
    featured_img: null,
    techs: "",
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // ✅ Get dynamic teacherId from localStorage
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    axios.get(categoryUrl)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setCourseData({
      ...courseData,
      featured_img: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!courseData.category || !courseData.title || !courseData.description || !courseData.techs) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("category", courseData.category);
    formData.append("teacher", teacherId);  // ✅ Now dynamic
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    if (courseData.featured_img) {
      formData.append("featured_img", courseData.featured_img);
    }
    formData.append("techs", courseData.techs);

    axios
      .post(courseUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log("Course added:", res.data);
        navigate("/teacher-dashboard");
      })
      .catch((err) => {
        console.error("Error submitting course:", err);
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <h5 className="card-header">Add New Course</h5>
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
                    Add Course
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

export default AddCourses;
