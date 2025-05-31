import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './TeacherSidebar';
import axios from 'axios';

const baseURL = 'http://127.0.1:8000/api/';

function ViewStudents() {
  const [studentData, setStudentData] = useState([]);
  const teacherId = localStorage.getItem('teacherId');

  useEffect(() => {
    axios.get(`${baseURL}fetch-all-enrolled-students/${teacherId}/`)
      .then((response) => {
        setStudentData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  }, [teacherId]);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>

        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Enrolled Students</h5>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Interested Categories</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center">No students enrolled yet.</td>
                      </tr>
                    ) : (
                      studentData.map((student) => (
                        <tr key={student.id}>
                          <td>{student.full_name}</td>
                          <td>{student.email}</td>
                          <td>{student.username}</td>
                          <td>{student.interested_categories}</td>
                          <td>
                            <Link to={`/show-assignment/${teacherId}/${student.id}`} className="btn btn-sm btn-warning">Assignments</Link>
                            <Link
                              to={`/add-assignment/${teacherId}/${student.id}`}
                              className="btn btn-sm btn-success ms-2"
                            >
                              Add Assignment
                            </Link>
                          </td>
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

export default ViewStudents;
