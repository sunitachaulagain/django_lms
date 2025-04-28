import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Footer from "./Footer";
import CourseDetail from "./CourseDetail";
import Login from "./User/Login";
import Register from "./User/Register";
import Dashboard  from "./User/Dashboard";
import MyCourses from "./User/MyCourses";
import FavoriteCourses from "./User/FavouriteCourses";
import RecommendedCourses from "./User/RecommendedCourses";
import ProfileSetting from './User/ProfileSetting'; 
import ChangePassword from "./User/ChangePassword";


import { Routes as Switch, Route } from "react-router-dom";

function Main() {
  return (
    <div className="App">
      <Header></Header>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:course_id" element={<CourseDetail />} />
        <Route path="/user-login" element={<Login />} />
        <Route path="/user-register" element={<Register />} />
        <Route path="/user-dashboard" element={<Dashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/favourite-courses" element={<FavoriteCourses />} />
        <Route path="/recommended-courses" element={<RecommendedCourses />} />
        <Route path="/profile-setting" element={<ProfileSetting />} /> 
        <Route path="/change-password" element={<ChangePassword />} /> 




      </Switch>

      <Footer></Footer>
    </div>
  );
}

export default Main;
