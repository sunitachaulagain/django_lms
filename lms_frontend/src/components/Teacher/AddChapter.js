import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherSidebar from "./TeacherSidebar";
import { useParams } from 'react-router-dom';

const baseURL = "http://127.0.0.1:8000/api";

function AddChapter() {
  const { course_id } = useParams();
  const [chapters, setChapters] = useState([]);
  const [newChapter, setNewChapter] = useState({
    title: "",
    description: "",
    video: null,
    remarks: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch chapters for the specific course
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get(`${baseURL}/course-chapters/${course_id}/`);
        setChapters(response.data);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    if (course_id) {
      fetchChapters();
    }
  }, [course_id, successMessage]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewChapter(prev => ({
      ...prev,
      [name]: name === "video" ? files[0] : value,
    }));
  };

  const handleAddChapter = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("course", course_id);
    formData.append("title", newChapter.title);
    formData.append("video", newChapter.video);
    formData.append("remarks", newChapter.remarks);

    formData.append("description", newChapter.description);
    // Append other fields as needed

    const response = await axios.post(`${baseURL}/chapter/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.status === 201) { // 201 Created
      window.location.href = `/all-chapters/${course_id}`;
    }
  } catch (error) {
    console.error("Error adding chapter:", error);
    alert(error.response?.data?.detail || "Failed to add chapter");
  }
};

  return (
    <div className="container mt-4">
      <h4>Manage Course Chapters (Course ID: {course_id})</h4>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleAddChapter}>
        <div className="card mb-4">
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Chapter Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={newChapter.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Chapter Description</label>
              <textarea
                className="form-control"
                name="description"
                rows="3"
                value={newChapter.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Upload Video</label>
              <input
                type="file"
                className="form-control"
                name="video"
                onChange={handleChange}
                accept="video/*"
                required
              />
              <small className="form-text text-muted">
                Upload a video file (e.g., .mp4, .mov)
              </small>
            </div>

            <div className="mb-3">
              <label className="form-label">Remarks</label>
              <input
                type="text"
                className="form-control"
                name="remarks"
                value={newChapter.remarks}
                onChange={handleChange}
              />
            </div>

            <div className="text-end">
              <button 
                type="submit" 
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Chapter'}
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="card">
        <div className="card-header">Existing Chapters</div>
        <ul className="list-group list-group-flush">
          {chapters.length === 0 ? (
            <li className="list-group-item text-muted">
              No chapters added yet for this course.
            </li>
          ) : (
            chapters.map((chapter) => (
              <li key={chapter.id} className="list-group-item">
                <div className="d-flex justify-content-between">
                  <div>
                    <strong>{chapter.title}</strong>
                    <p className="mb-1">{chapter.description}</p>
                    <small>{chapter.remarks}</small>
                  </div>
                  {chapter.video && (
                    <a 
                      href={chapter.video} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-primary"
                    >
                      View Video
                    </a>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default AddChapter;