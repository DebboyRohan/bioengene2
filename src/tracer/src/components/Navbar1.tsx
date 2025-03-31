import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useTheme } from "../context/ThemeContext";

const Navbar1: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrollY, setScrollY] = useState(0); // Track scroll position
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Effect to track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine logo sources based on scroll position
  const bioengeneLogoSrc =
    scrollY <= 0
      ? "/assets/images/BioengeneDark.png"
      : "/assets/images/Bioengene.png";

  // Determine mobile menu button color based on scroll position
  const menuButtonColor = scrollY <= 0 ? "text-black" : "text-white";

  // Function to handle navigation and scroll to top
  const navigateToTop = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-transparent backdrop-blur-md bg-opacity-70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            {/* Bioengene Logo - Clickable to bioengene.iitkgp.ac.in */}
            <a
              href="https://bioengene.iitkgp.ac.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={bioengeneLogoSrc}
                alt="Bioengene Logo"
                className="h-14 mt-4 sm:h-12 md:h-14 mr-4 transition-opacity duration-300 ease-in-out"
              />
            </a>
            {/* Tracer Logo and Text - Clickable to /home */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigateToTop("/tracer/home")}
            >
              <Logo
                size="sm"
                variant={theme === "dark" ? "light" : "light"}
                animated={true} // Ensures rotation on hover
                scrollY={scrollY} // Pass scrollY to Logo component
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <div
              className={`flex items-center space-x-6 lg:space-x-8 rounded-full px-4 py-2 shadow-lg transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-black/80 to-[#1A3C34]/80"
                  : "bg-gradient-to-r from-blue-400/80 to-teal-500/80"
              }`}
            >
              {["Home", "Research", "Team", "Sponsors", "Contact"].map(
                (item) => (
                  <div
                    key={item}
                    onClick={() =>
                      navigateToTop(`/tracer/${item.toLowerCase()}`)
                    }
                    className={`cursor-pointer hover:text-red-600 transition-colors text-sm lg:text-base ${
                      theme === "dark"
                        ? `text-white ${
                            window.location.pathname ===
                            `/tracer/${item.toLowerCase()}`
                              ? "font-semibold text-red-600"
                              : ""
                          }`
                        : `text-white ${
                            window.location.pathname ===
                            `/tracer/${item.toLowerCase()}`
                              ? "font-semibold text-red-500"
                              : ""
                          }`
                    }`}
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`hover:text-red-600 transition-colors mr-3 ${menuButtonColor}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            className={`md:hidden rounded-lg shadow-lg mt-2 transition-all duration-300 ${
              theme === "dark"
                ? "bg-gradient-to-b from-black/90 to-[#1A3C34]/90"
                : "bg-gradient-to-b from-blue-400/90 to-teal-500/90"
            }`}
          >
            <div className="pt-2 pb-3 space-y-1">
              {["Home", "Research", "Team", "Sponsors", "Contact"].map(
                (item) => (
                  <div
                    key={item}
                    onClick={() =>
                      navigateToTop(`/tracer/${item.toLowerCase()}`)
                    }
                    className={`block px-3 py-2 text-base font-medium cursor-pointer ${
                      theme === "dark"
                        ? `text-white ${
                            window.location.pathname ===
                            `/tracer/${item.toLowerCase()}`
                              ? "bg-[#1A3C34] text-red-600"
                              : "hover:bg-[#1A3C34] hover:text-red-600"
                          }`
                        : `text-white ${
                            window.location.pathname ===
                            `/tracer/${item.toLowerCase()}`
                              ? "bg-teal-600 text-red-500"
                              : "hover:bg-teal-600 hover:text-red-500"
                          }`
                    } transition-colors`}
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar1;
