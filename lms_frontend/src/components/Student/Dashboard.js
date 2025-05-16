import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './SideBar';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Student Dashboard';

    // Check student login status on mount
    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    if (studentLoginStatus !== 'true') {
      // If not logged in, redirect to student login page
      navigate('/student-login');
    }
  }, [navigate]);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className='col-md-3'>
          <Sidebar />
        </aside>
        <section className='col-md-9'>
          Dashboard
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
