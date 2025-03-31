import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Research from "./pages/Research";
import Achievement from "./pages/Achievement";
import AchievementTemp from "./pages/AchievementTemp";
import GalleryTemp from "./pages/GalleryTemp";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import AdminPanel from "./pages/AdminPanel"; // New AdminPanel page

// Tracer Imports
import Home1 from "./tracer/src/pages/Home1.tsx";
import Research1 from "./tracer/src/pages/Research1.tsx";
import Team2 from "./tracer/src/pages/Team2.tsx";
import Sponsors1 from "./tracer/src/pages/Sponsors1.tsx";
import Contact1 from "./tracer/src/pages/Contact1.tsx";
import Navbar1 from "./tracer/src/components/Navbar1.tsx";
import Footer1 from "./tracer/src/components/Footer1.tsx";
import { ThemeProvider } from "./tracer/src/context/ThemeContext.tsx";
import CustomCursor from "./tracer/src/components/CustomCursor.tsx";
import FloatingCells from "./tracer/src/components/FloatingCells.tsx";
import Loader from "./tracer/src/components/Loader.tsx";
import TeamTemp from "./pages/TeamTemp.jsx";

const Layout = () => {
  const location = useLocation();
  const isTracerRoute = location.pathname.startsWith("/tracer");

  // State for Loader (from TracerApp.tsx)
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div>
      {/* Bioengene Layout */}
      {!isTracerRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/research" element={<Research />} />
        <Route path="/achievements" element={<Achievement />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/team" element={<Team />} />
        <Route path="/admin" element={<AdminPanel />} />{" "}
        {/* New Admin Panel Route */}
        {/* Redirect /tracer to /tracer/home */}
        <Route
          path="/tracer"
          element={<Navigate to="/tracer/home" replace />}
        />
      </Routes>
      {!isTracerRoute && <Footer />}

      {/* Tracer Layout */}
      {isTracerRoute && (
        <ThemeProvider>
          <CustomCursor />
          <FloatingCells />
          {isLoading && isReady ? (
            <>
              <Navbar1 />
              <main className="pt-16">
                <Routes>
                  <Route
                    path="/tracer"
                    element={<Navigate to="/tracer/home" replace />}
                  />
                  <Route path="/tracer/home" element={<Home1 />} />
                  <Route path="/tracer/research" element={<Research1 />} />
                  <Route path="/tracer/team" element={<Team2 />} />
                  <Route path="/tracer/sponsors" element={<Sponsors1 />} />
                  <Route path="/tracer/contact" element={<Contact1 />} />
                </Routes>
                <Footer1 />
              </main>
            </>
          ) : (
            <>
              <Navbar1 />
              <main className="pt-16">
                <Routes>
                  <Route path="/tracer/home" element={<Home1 />} />
                  <Route path="/tracer/research" element={<Research1 />} />
                  <Route path="/tracer/team" element={<Team2 />} />
                  <Route path="/tracer/sponsors" element={<Sponsors1 />} />
                  <Route path="/tracer/contact" element={<Contact1 />} />
                </Routes>
                <Footer1 />
              </main>
            </>
          )}
        </ThemeProvider>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
