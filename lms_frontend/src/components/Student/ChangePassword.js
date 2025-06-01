import { Link } from 'react-router-dom';
import SideBar from './SideBar'; 
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const baseUrl = 'http://127.0.0.1:8000/api';

function ChangePassword() {
  const [StudentData, setStudentData] = useState({
    password: '',
  });

  const studentId = localStorage.getItem('studentId');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudentData({
      ...StudentData,
      [name]: value,
    });
  };

  const submitForm = (event) => {
    event.preventDefault(); // Prevent default form submission

    const studentFormData = new FormData();
    studentFormData.append('password', StudentData.password);

    axios
      .post(`${baseUrl}/student-change-password/${studentId}/`, studentFormData)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            title: 'Password changed successfully!',
            icon: 'success',
            toast: true,
            timer: 3000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
          });
          navigate('/student-logout');
        }
        else{
          alert("opps!some error ocured!!")
        }
      })
      .catch((error) => {
        console.error('Password change error:', error);
        Swal.fire({
          title: 'Error changing password',
          text: 'Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <SideBar />
        </aside>

        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Change Password</h5>
            <div className="card-body">
              <form onSubmit={submitForm}>
                <div className="mb-3 row">
                  <label htmlFor="password" className="col-sm-3 col-form-label">
                    New Password
                  </label>
                  <div className="col-sm-9">
                    <input
                      value={StudentData.password}
                      name="password"
                      onChange={handleChange}
                      type="password"
                      className="form-control"
                      id="password"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <div className="col-sm-9 offset-sm-3">
                    <button type="submit" className="btn btn-primary">
                      Change Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ChangePassword;
