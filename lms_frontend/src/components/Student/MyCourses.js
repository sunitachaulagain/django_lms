import {Link} from 'react-router-dom';
import Sidebar from './SideBar';
import { useState,useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function MyCourses(){
  const[courseData, setCourseData] = useState([]);
  const student_id = localStorage.getItem('studentId')


  useEffect(()=>{
    document.title='LMS| Student Register Page';
  });
  return(
    <div class="container mt-4">
      <div class="row">
        <aside className='col-md-3'>
          <Sidebar/>

        </aside>
        <section className='col-md-9'>
          <div class="card">'
            <h5 className='card-header'>My Courses</h5>
            <div class="card-body">
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Created By</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <td>PHP Development</td>
                  <td><Link to="/">Sunita Chaulagain</Link></td>
                  <td>
                    <button className='btn btn-danger btn-sm active'>Delete</button>
                  </td>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyCourses;