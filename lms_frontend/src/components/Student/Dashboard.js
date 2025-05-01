import {Link} from 'react-router-dom';
import Sidebar from './SideBar';
import { useEffect } from 'react';

function Dashboard(){
  useEffect(()=>{
    document.title='Student Dashboard';
  });
  return(
    <div class="container mt-4">
      <div class="row">
        <aside className='col-md-3'>
          <Sidebar/>
        </aside>
        <section className='col-mnd-9'>
          Dashboard
        </section>
      </div>
    </div>
  );
}

export default Dashboard;