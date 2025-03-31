import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { bioengenelogo } from "../assets/asset.js";
import { FaUserCircle } from "react-icons/fa"; // User icon

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // For user dropdown
  const [user, setUser] = useState(null); // To store user info (e.g., username)
  const [tokenChange, setTokenChange] = useState(0); // To trigger useEffect on token change
  const navigate = useNavigate();

  // Function to verify the token and set user state
  const verifyToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const response = await axios.get(
        "https://172.16.3.23:5000/api/auth/verify-token",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.valid) {
        setUser(response.data.user); // Set user data (id, username, role)
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }
    } catch (err) {
      console.error("Token verification failed:", err);
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  // Check if the user is logged in by verifying the token
  useEffect(() => {
    verifyToken();
  }, [tokenChange]);

  // Listen for storage changes (e.g., token set or removed)
  useEffect(() => {
    const handleStorageChange = () => {
      setTokenChange((prev) => prev + 1); // Trigger useEffect to re-verify token
    };

    // Listen for custom storageChange event (triggered by Login component)
    window.addEventListener("storageChange", handleStorageChange);

    // Listen for actual storage events (e.g., if token changes in another tab)
    window.addEventListener("storage", handleStorageChange);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("storageChange", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleClick = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // Clear role as well
    localStorage.removeItem("userName"); // Clear username
    setUser(null); // Reset user state
    setIsUserDropdownOpen(false); // Close the dropdown
    setIsOpen(false); // Close mobile menu if open
    setTokenChange((prev) => prev + 1); // Trigger useEffect to re-verify token
    window.dispatchEvent(new Event("storageChange")); // Notify other components
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <nav className="sticky bg-white flex justify-between items-center py-5 lg:px-20 md:px-8 px-5 top-0 z-100">
      {/* Left - Logo */}
      <NavLink
        to="/"
        className="text-xl sm:text-2xl font-bold tracking-tight text-primary"
        onClick={handleClick}
      >
        <img src={bioengenelogo} alt="BioEnGene" className="w-30" />
      </NavLink>

      {/* Center - Navigation Links (Hidden on small screens) */}
      <ul className="hidden md:flex flex-row space-x-6">
        {["Home", "Team", "Research", "Achievements", "Gallery"].map((item) => (
          <li key={item}>
            <NavLink
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `block text-primary text-lg font-medium py-2 md:py-0 hover:scale-110 transition-all duration-300 ease-in-out ${
                  isActive ? "text-accent" : ""
                }`
              }
              onClick={handleClick}
            >
              {item}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right - Admin Button or User Icon (Desktop) */}
      <div className="hidden md:block relative">
        {user ? (
          // Show user icon and username if logged in
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
          >
            <FaUserCircle className="text-primary text-2xl" />
            <span className="text-primary font-medium">{user.username}</span>
          </div>
        ) : (
          // Show Admin button if not logged in
          <NavLink to="/login" onClick={handleClick}>
            <div
              className="hover-text-fix hover:bg-[var(--color-elevated)]
               px-2 py-1 text-primary font-medium 
               md:border-2 md:border-primary md:rounded-full 
               md:px-4 md:py-2 transition-all"
            >
              Admin
            </div>
          </NavLink>
        )}

        {/* User Dropdown (Desktop) */}
        {user && isUserDropdownOpen && (
          <div className="absolute top-12 right-0 bg-white shadow-md rounded-md w-48">
            <ul className="flex flex-col py-2">
              <li>
                <NavLink
                  to="/admin"
                  className="block px-4 py-2 text-primary hover:bg-gray-100"
                  onClick={() => {
                    setIsUserDropdownOpen(false);
                    handleClick();
                  }}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <button
                  className="block w-full text-left px-4 py-2 text-primary hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Right - Hamburger Menu for Mobile */}
      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {["Home", "Team", "Research", "Achievements", "Gallery"].map(
              (item) => (
                <li key={item}>
                  <NavLink
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="block text-primary text-lg font-medium py-3"
                    onClick={() => {
                      setIsOpen(false);
                      handleClick();
                    }}
                  >
                    {item}
                  </NavLink>
                </li>
              )
            )}
            {/* Admin Button or User Options Inside Dropdown on Mobile */}
            <li>
              {user ? (
                // Show user options if logged in
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center space-x-2">
                    <FaUserCircle className="text-primary text-2xl" />
                    <span className="text-primary font-medium">
                      {user.username}
                    </span>
                  </div>
                  <NavLink
                    to="/admin"
                    className="block text-primary text-lg font-medium py-3"
                    onClick={() => {
                      setIsOpen(false);
                      handleClick();
                    }}
                  >
                    Dashboard
                  </NavLink>
                  <button
                    className="block text-primary text-lg font-medium py-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                // Show Admin button if not logged in
                <NavLink
                  to="/login"
                  onClick={() => {
                    setIsOpen(false);
                    handleClick();
                  }}
                >
                  <div
                    className="hover-text-fix hover:bg-[var(--color-elevated)]
                     px-2 py-1 text-primary font-medium 
                     border-2 border-primary rounded-full 
                     lg:px-4 lg:py-2 transition-all"
                  >
                    Admin
                  </div>
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
