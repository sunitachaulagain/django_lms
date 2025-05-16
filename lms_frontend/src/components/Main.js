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
import SideBar from "./Student/SideBar"; 
import StudentLogout from "./Student/StudentLogout"; // <-- Added

// Teacher Components
import TeacherLogin from "./Teacher/TeacherLogin";
import TeacherRegister from "./Teacher/TeacherRegister";
import TeacherDashboard from "./Teacher/TeacherDashboard";
import TeacherSidebar from "./Teacher/TeacherSidebar"; // <-- Teacher Sidebar
import TeacherProfileSetting from "./Teacher/TeacherProfileSetting";
import TeacherChangePassword from "./Teacher/TeacherChangePassword";
import TeacherCourses from "./Teacher/TeacherCourses"; // <-- Added
import ViewAssignments from "./Teacher/ViewAssignments"; // <-- Added
import ViewStudents from "./Teacher/ViewStudents"; // <-- Added
import TeacherDetail from "./TeacherDetail";
import TeacherLogout from "./Teacher/TeacherLogout";
import AddCourses from "./Teacher/AddCourses";
import AddChapter from "./Teacher/AddChapter";
import EditChapter from "./Teacher/EditChapter"; // <-- Added
import EditCourse from "./Teacher/EditCourse"; // <-- Added
import TeacherSkillCourses from "./Teacher/TeacherSkillCourses"; // <-- Added

// Other Components
import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Footer from "./Footer";
import CourseDetail from "./CourseDetail";
import PopularCourses from "./PopularCourses";
import PopularTeachers from "./PopularTeachers";
import CategoryCourses from "./CategoryCourses";
import CourseChapters from "./Teacher/CourseChapters";
import AllCourses from "./AllCourses";


function Main() {
  return (
    <div className="App">
      <Header />
      <Routes> 
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:course_id" element={<CourseDetail />} />
        <Route path="/all-courses" element={<AllCourses/>}/>
        <Route path="/popular-courses" element={<PopularCourses/>}/>
        <Route path="/popular-teachers" element={<PopularTeachers/>}/>
        <Route path="/category/:category_slug" element={<CategoryCourses/>}/>


        {/* Student Routes */}
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/favourite-courses" element={<FavouriteCourses />} />
        <Route path="/recommended-courses" element={<RecommendedCourses />} />
        <Route path="/profile-setting" element={<ProfileSetting />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/student-sidebar" element={<SideBar />} /> {/* Student Sidebar */}
        <Route path ="/student-logout" element={<StudentLogout />} />

        {/* Teacher Routes */}
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-profile-setting" element={<TeacherProfileSetting />} />
        <Route path="/teacher-change-password" element={<TeacherChangePassword />} />
        <Route path="/teacher-sidebar" element={<TeacherSidebar />} /> {/* Teacher Sidebar */}
        <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail />} />
        <Route path="/teacher-logout" element={<TeacherLogout/>}/>

        {/* Teacher Course Management */}
        <Route path="/teacher-courses" element={<TeacherCourses />} />
        <Route path="/view-assignments" element={<ViewAssignments />} />
        <Route path="/view-students" element={<ViewStudents />} />
        <Route path="/teacher-add-courses" element={<AddCourses/>}/>
        <Route path="/add-chapter/:course_id" element={<AddChapter/>}/>
        <Route path="/all-chapters/:course_id" element={<CourseChapters/>} />
        <Route path="/edit-chapter/:chapter_id" element={<EditChapter />} />
        <Route path="/edit-course/:course_id" element={<EditCourse />} />
        <Route path="/teacher-skill-courses/:skill_name/:teacher_id" element={<TeacherSkillCourses />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Main;
