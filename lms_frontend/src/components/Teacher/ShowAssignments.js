import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const baseURL = 'http://127.0.0.1:8000/api';

function ShowAssignments() {
const { teacherId, studentId } = useParams();
  const [assignmentData, setAssignmentData] = useState([]);
  const [totalResult, setTotalResult] = useState(0);

  useEffect(() => {
    axios.get(`${baseURL}/student-assignment/${teacherId}/${studentId}/`)
      .then((response) => {
        setAssignmentData(response.data);
        setTotalResult(response.data.length);
      })
      .catch((error) => {
        console.error('Error fetching assignments:', error);
      });
  }, [teacherId, studentId]);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          {/* Sidebar component can be added here */}
        </aside>

        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">
              All Assignments ({totalResult})
              <Link 
                className="btn btn-success btn-sm float-end" 
                to={`/add-assignment/${teacherId}/${studentId}`}
              >
                Add Assignment
              </Link>
            </h5>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignmentData.length === 0 ? (
                      <tr>
                        <td colSpan="2" className="text-center">No assignments found.</td>
                      </tr>
                    ) : (
                      assignmentData.map((assignment) => (
                        <tr key={assignment.id}>
                          <td>{assignment.title}</td>
                          <td>{assignment.detail}</td>
                        </tr>
                      ))
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

export default ShowAssignments;
