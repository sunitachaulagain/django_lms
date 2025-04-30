import { Routes, Route } from "react-router-dom"; // Use Routes and Route from react-router-dom

// Student Components
import StudentLogin from "./Student/Login";
import StudentRegister from "./Student/Register";
import StudentDashboard from "./Student/Dashboard";
import MyCourses from "./Student/MyCourses";
import FavouriteCourses from "./Student/FavouriteCourses";
import RecommendedCourses from "./Student/RecommendedCourses";
import ProfileSetting from "./Student/ProfileSetting";
import ChangePassword from "./Student/ChangePassword";
import SideBar from "./Student/SideBar"; // <-- Student Sidebar

// Teacher Components
import TeacherLogin from "./Teacher/TeacherLogin";
import TeacherRegister from "./Teacher/TeacherRegister";
import TeacherDashboard from "./Teacher/TeacherDashboard";
import TeacherSidebar from "./Teacher/TeacherSidebar"; // <-- Teacher Sidebar
import TeacherProfileSetting from "./Teacher/TeacherProfileSetting";
import TeacherChangePassword from "./Teacher/TeacherChangePassword";
import ManageCourses from "./Teacher/ManageCourses"; // <-- Added
import ViewAssignments from "./Teacher/ViewAssignments"; // <-- Added
import ViewStudents from "./Teacher/ViewStudents"; // <-- Added
import TeacherDetail from "./TeacherDetail";

// Other Components
import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Footer from "./Footer";
import CourseDetail from "./CourseDetail";
import AllCourses  from "./AllCourses";
import PopularCourses from "./PopularCourses";
import PopularTeachers from "./PopularTeachers";
import CategoryCourses from "./CategoryCourses";

function Main() {
  return (
    <div className="App">
      <Header />
      <Routes> {/* Use Routes instead of Switch for React Router v6 */}
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:course_id" element={<CourseDetail />} />
        <Route path="/all-courses" element={<AllCourses/>}/>
        <Route path="/popular-courses" element={<PopularCourses/>}/>
        <Route path="/popular-teachers" element={<PopularTeachers/>}/>
        <Route path="/category/:categorySlug" element={<CategoryCourses/>}/>


        {/* Student Routes */}
        <Route path="/user-login" element={<StudentLogin />} />
        <Route path="/user-register" element={<StudentRegister />} />
        <Route path="/user-dashboard" element={<StudentDashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/favourite-courses" element={<FavouriteCourses />} />
        <Route path="/recommended-courses" element={<RecommendedCourses />} />
        <Route path="/profile-setting" element={<ProfileSetting />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/user-sidebar" element={<SideBar />} /> {/* Student Sidebar */}

        {/* Teacher Routes */}
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-profile-setting" element={<TeacherProfileSetting />} />
        <Route path="/teacher-change-password" element={<TeacherChangePassword />} />
        <Route path="/teacher-sidebar" element={<TeacherSidebar />} /> {/* Teacher Sidebar */}
        <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail />} />

        {/* Teacher Course Management */}
        <Route path="/manage-courses" element={<ManageCourses />} />
        <Route path="/view-assignments" element={<ViewAssignments />} />
        <Route path="/view-students" element={<ViewStudents />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Main;
