import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherSidebar from "./TeacherSidebar";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";  // Import SweetAlert2

const baseURL = "http://127.0.0.1:8000/api";

function EditChapter() {
  const { chapter_id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    course: "",
    title: "",
    description: "",
    video: null,
    remarks: ""
  });

  const { course_id } = useParams();
  const [existingVideo, setExistingVideo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/chapter/${chapter_id}/`)
      .then(response => {
        console.log("API response data:", response.data);
        const chapterData = response.data;
        setFormData({
          course: chapterData.course || "",  // Assuming 'course' is fetched from the backend
          title: chapterData.title,
          description: chapterData.description,
          remarks: chapterData.remarks || "",
          video: null
        });
        setExistingVideo(chapterData.video || "");
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching chapter:", error);
        setError("Failed to load chapter data. Please try again.");
        setLoading(false);
      });
  }, [chapter_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVideoChange = (e) => {
    setFormData(prev => ({
      ...prev,
      video: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.description) {
      Swal.fire({
        icon: "error",
        title: "Validation Failed",
        text: "Title and Description are required fields.",
        confirmButtonText: "OK"
      });
      return;
    }

    const data = new FormData();
    data.append("course", formData.course);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("remarks", formData.remarks);
    if (formData.video) {
      data.append("video", formData.video);
    }

    try {
      await axios.put(`${baseURL}/chapter/${chapter_id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      // Display success message using SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Chapter Updated!",
        text: "Your chapter has been successfully updated.",
        confirmButtonText: "OK"
      });
      // Optionally navigate after success
      navigate(`/all-chapters/${formData.course}`);

    } catch (error) {
      console.error("Error updating chapter:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.detail || "There was an issue updating the chapter. Please try again.",
        confirmButtonText: "OK"
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <TeacherSidebar />
        </div>
        <div className="col-9">
          <div className="card">
            <h3 className="card-header">Edit Chapter</h3>
            <div className="card-body">
              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="remarks" className="form-label">Remarks</label>
                  <input
                    type="text"
                    className="form-control"
                    id="remarks"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="video" className="form-label">Video File</label>
                  <input
                    type="file"
                    className="form-control"
                    id="video"
                    name="video"
                    accept="video/*"
                    onChange={handleVideoChange}
                  />
                  {existingVideo && (
                    <video width="100%" controls className="mt-2">
                      <source src={existingVideo} type="video/mp4" />
                      <source src={existingVideo} type="video/webm" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>

                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditChapter;
