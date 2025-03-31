// Navbar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext'; // Import the useTheme hook

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme(); // Access theme and toggleTheme from context

  return (
    <nav className="fixed w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <Logo size="sm" />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8 bg-white rounded-full px-6 py-2 shadow-lg">
              {['Home', 'Research', 'Team', 'Sponsors', 'Contact'].map((item) => (
                <NavLink
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `text-gray-800 hover:text-blue-600 transition-colors ${isActive ? 'font-semibold' : ''
                    }`
                  }
                >
                  {item}
                </NavLink>
              ))}
            </div>
            {/* Toggle Button */}

            {/* </div> */}


            {/* <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={theme === 'light'}
                                onChange={toggleTheme}
                                className="sr-only"
                            />
                            <div
                                className={`w-24 h-8 rounded-full transition-all duration-300 flex items-center justify-between px-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-500'
                                    }`}
                            > */}
            {/* Dark Text and Moon Icon (Left Side) */}
            {/* <div
                                    className={`flex items-center gap-1 transition-opacity duration-300 ${theme === 'light' ? 'opacity-100' : 'opacity-50'
                                        }`}
                                > */}
            {/* <Moon className="w-4 h-4 text-gray-300" /> */}
            {/* <span className="text-xs font-medium text-gray-300">Dark</span> */}
          </div>
          {/* Light Text and Sun Icon (Right Side) */}
          {/* <div
                                    className={`flex items-center gap-1 transition-opacity duration-300 ${theme === 'dark' ? 'opacity-100' : 'opacity-50'
                                        }`}
                                > */}
          {/* <span className="text-xs font-medium text-yellow-200">Light</span> */}
          {/* <Sun className="w-4 h-4 text-yellow-200" />
                                </div> */}
          {/* Sliding Knob */}
          {/* <div
                                    className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform duration-300 ${theme === 'light' ? 'translate-x-[75px]' : 'translate-x-1'
                                        }`}
                                /> */}
          {/* </div>
                        </label> */}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-lg mt-2">
            <div className="pt-2 pb-3 space-y-1">
              {['Home', 'Research', 'Team', 'Sponsors', 'Contact'].map((item) => (
                <NavLink
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `block px-3 py-2 text-base font-medium text-gray-800 ${isActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-600 hover:text-white'
                    } transition-colors`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </NavLink>
              ))}
              {/* Toggle Button for Mobile */}
              {/* <div className="px-3 py-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={theme === 'light'}
                    onChange={toggleTheme}
                    className="sr-only"
                  />
                  <div
                    className={`w-24 h-8 rounded-full transition-all duration-300 flex items-center justify-between px-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-500'
                      }`}
                  >
                    <div
                      className={`flex items-center gap-1 transition-opacity duration-300 ${theme === 'light' ? 'opacity-100' : 'opacity-50'
                        }`}
                    >
                      <Moon className="w-4 h-4 text-gray-300" />
                      <span className="text-xs font-medium text-gray-300">Dark</span>
                    </div>
                    <div
                      className={`flex items-center gap-1 transition-opacity duration-300 ${theme === 'dark' ? 'opacity-100' : 'opacity-50'
                        }`}
                    >
                      <span className="text-xs font-medium text-yellow-200">Light</span>
                      <Sun className="w-4 h-4 text-yellow-200" />
                    </div>
                    <div
                      className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform duration-300 ${theme === 'light' ? 'translate-x-[72px]' : 'translate-x-1'
                        }`}
                    />
                  </div>
                </label>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </nav >
  );
};

export default Navbar;