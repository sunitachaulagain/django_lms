import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Footer from "./Footer";
import CourseDetail from "./CourseDetail";

import { Routes as Switch, Route } from "react-router-dom";

function Main() {
  return (
    <div className="App">
      <Header></Header>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:course_id" element={<CourseDetail />} />

      </Switch>

      <Footer></Footer>
    </div>
  );
}

export default Main;
