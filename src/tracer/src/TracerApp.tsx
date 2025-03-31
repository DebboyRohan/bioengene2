import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar1 from "./components/Navbar1";
import CustomCursor from "./components/CustomCursor";
import FloatingCells from "./components/FloatingCells";
import Home1 from "./pages/Home1";
import Research1 from "./pages/Research1";
import Team2 from "./pages/Team2";
import Sponsors1 from "./pages/Sponsors1";
import Contact1 from "./pages/Contact1";
import Footer1 from "./components/Footer1";
// import Loader from "./components/Loader";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <ThemeProvider>
      <CustomCursor />
      <FloatingCells />
      {isLoading && isReady ? (
        // "<Loader onLoadingComplete={() => setIsLoading(false)} />"
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
              {/* Default route redirects to /home */}
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
      )}
    </ThemeProvider>
  );
}

export default App;
