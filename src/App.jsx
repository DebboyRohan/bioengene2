import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Research from "./pages/Research";
import Achievement from "./pages/Achievement";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/research" element={<Research />} />
          <Route path="/achievement" element={<Achievement />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/team" element={<Team />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
