import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  return (
    <nav className="sticky bg-white flex justify-between items-center py-5 lg:px-20  md:px-8 px-5 top-0 z-100">
      {/* Left - Logo */}
      <NavLink
        to="/"
        className="text-xl sm:text-2xl font-bold tracking-tight text-primary"
        onClick={handleClick}
      >
        Bio<span className="text-accent">EnGene</span>
      </NavLink>

      {/* Center - Navigation Links (Hidden on small screens) */}
      <ul className="hidden md:flex flex-row space-x-6">
        {["Home", "Team", "Research", "Achievement", "Gallery"].map((item) => (
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

      {/* Right - Admin Button (Visible only on large screens) */}
      <div className="hidden md:block">
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
            {["Home", "Team", "Research", "Achievement", "Gallery"].map(
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
            {/* Admin Button Inside Dropdown on Mobile */}
            <li>
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
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
