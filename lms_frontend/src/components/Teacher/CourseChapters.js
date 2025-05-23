import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TeacherSidebar from "../Teacher/TeacherSidebar";
import Swal from 'sweetalert2';

const baseURL = "http://127.0.0.1:8000/api";

function CourseChapters() {
  const { course_id } = useParams();
  const [chapters, setChapters] = useState([]);
  const [courseTitle, setCourseTitle] = useState(`Course ${course_id}`);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalResult, setTotalResult] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const chaptersResponse = await axios.get(
          `${baseURL}/course-chapters/${course_id}/`,
          { signal }
        );
        setChapters(chaptersResponse.data);
        setTotalResult(chaptersResponse.data.length);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching data:", error);
          setError("Failed to load chapters data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [course_id]);

  const getVideoType = (videoUrl) => {
    if (!videoUrl) return "video/mp4";
    const extension = videoUrl.split(".").pop().toLowerCase();
    const supportedTypes = {
      mp4: "video/mp4",
      webm: "video/webm",
      ogg: "video/ogg",
    };
    return supportedTypes[extension] || "video/mp4";
  };

  const getVideoUrl = (video) => {
    if (!video) return null;
    return video.startsWith("http") ? video : `${baseURL}${video}`;
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This chapter will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${baseURL}/chapter/${id}/`)
          .then((response) => {
            Swal.fire('Deleted!', 'Chapter has been deleted.', 'success');
            // Filter out the deleted chapter without reloading the page
            setChapters(prev => prev.filter(chap => chap.id !== id));
            setTotalResult(prev => prev - 1);
          })
          .catch((error) => {
            console.error('Delete error:', error);
            Swal.fire('Error', 'Failed to delete chapter.', 'error');
          });
      }
    });
  };
  
  if (loading) {
    return (
      <div className="container mt-4">
        <div className="row">
          <aside className="col-md-3">
            <TeacherSidebar />
          </aside>
          <section className="col-md-9">
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading chapters...</p>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="row">
          <aside className="col-md-3">
            <TeacherSidebar />
          </aside>
          <section className="col-md-9">
            <div className="alert alert-danger">
              {error}
              <button
                className="btn btn-warning mt-2"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">All Chapters ({totalResult})</h5>
            <div className="card-body">
              <div className="mb-3 text-end">
                <Link
                  to={`/add-chapter/${course_id}`}
                  className="btn btn-success"
                >
                  Add New Chapter
                </Link>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Chapter Title</th>
                      <th>Video</th>
                      <th>Remarks</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chapters.length > 0 ? (
                      chapters.map((chapter) => (
                        <tr key={chapter.id}>
                          <td>
                            <Link to={`/edit-chapter/${chapter.id}`}>
                              {chapter.title}
                            </Link>
                          </td>
                          <td>
                            {chapter.video ? (
                              <div className="video-container">
                                <video
                                  width="320"
                                  height="240"
                                  controls
                                  preload="metadata"
                                >
                                  <source
                                    src={getVideoUrl(chapter.video)}
                                    type={getVideoType(chapter.video)}
                                  />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            ) : (
                              <span className="text-muted">
                                No video available
                              </span>
                            )}
                          </td>
                          <td>{chapter.remarks || "No remarks"}</td>
                          <td>
                            <Link
                              to={`/edit-chapter/${chapter.id}`}
                              className="btn btn-sm btn-primary me-2"
                            >
                              <i className="bi bi-pencil-square me-1"></i> Edit
                            </Link>
                            <button
                              className="btn btn-sm btn-danger ms-1"
                              onClick={() => handleDelete(chapter.id)}
                            >
                              <i className="bi bi-trash me-1"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-3">
                          No chapters found for this course
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CourseChapters;
