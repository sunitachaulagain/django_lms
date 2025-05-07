import React, { useState } from "react";
import axios from "axios";
import TeacherSidebar from "./TeacherSidebar";
import { useParams } from 'react-router-dom';

const baseURL = "http://127.0.0.1:8000/api"; // corrected baseURL

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setNewChapter((prev) => ({
      ...prev,
      [name]: name === "video" ? files[0] : value,
    }));
  };

  const handleAddChapter = async (e) => {

    e.preventDefault();

    if (!newChapter.title || !newChapter.description) return;

    const formData = new FormData();

    formData.append("course", course_id); // Use the course ID from the URL

    formData.append("title", newChapter.title);
    formData.append("description", newChapter.description);
    formData.append("video", newChapter.video);
    formData.append("remarks", newChapter.remarks);
    formData.append("course", 1); // Replace with dynamic course ID if needed

    try {
      const response = await axios.post(`${baseURL}/chapter/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setChapters([...chapters, response.data]);

      setNewChapter({
        title: "",
        description: "",
        video: null,
        remarks: "",
      });

      setSuccessMessage("Chapter added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding chapter:", error);
      alert("Failed to add chapter. See console for details.");
    }
  };

  return (
    <div className="container mt-4">
      <h4>Manage your course</h4>

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
              />
              <small className="form-text text-muted">
                Upload a video file (e.g., .mp4, .mov).
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
              <button type="submit" className="btn btn-success">
                Add Chapter
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="card">
        <div className="card-header">Chapters</div>
        <ul className="list-group list-group-flush">
          {chapters.length === 0 ? (
            <li className="list-group-item text-muted">
              No chapters added yet.
            </li>
          ) : (
            chapters.map((chapter, index) => (
              <li key={index} className="list-group-item">
                <strong>{chapter.title}</strong>
                <p className="mb-1">{chapter.description}</p>
                <small>{chapter.remarks}</small>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default AddChapter;
