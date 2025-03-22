import { motion } from "framer-motion";
import biotechdept from "../assets/images/biotechdept.jpg";
import { NavLink } from "react-router-dom";

function Login() {
  // Define animation variants for cleaner code
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
      <section
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${biotechdept})` }}
      >
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" />

        <div className="relative flex items-center justify-center min-h-screen px-4">
          {/* Subtle animated glow effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] 
              bg-emerald-400/20 rounded-full blur-3xl animate-pulse"
            />
          </div>

          {/* Form Container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 w-full max-w-md p-8 bg-white/95 
              backdrop-blur-md rounded-2xl shadow-xl border border-emerald-100/50"
          >
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl font-bold text-emerald-900 text-center mb-8 tracking-tight"
            >
              Welcome Back
            </motion.h2>

            {/* Form */}
            <motion.form
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-4 pr-12 rounded-full bg-gray-50 
                    border border-gray-200 text-gray-800 placeholder-gray-400 
                    focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
                    transition-all duration-300 outline-none"
                />
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 
                  text-gray-400"
                >
                  ✉️
                </span>
              </div>

              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-4 pr-12 rounded-full bg-gray-50 
                    border border-gray-200 text-gray-800 placeholder-gray-400 
                    focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
                    transition-all duration-300 outline-none"
                />
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 
                  text-gray-400"
                >
                  🔒
                </span>
              </div>

              {/* Animated Button */}
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 8px 25px rgba(16, 185, 129, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3.5 px-6 text-lg font-medium text-white 
                  bg-emerald-600 rounded-full shadow-lg hover:bg-emerald-700 
                  transition-all duration-300"
              >
                Sign In
              </motion.button>

              {/* Additional Links */}
              <div className="text-center text-sm text-gray-600 space-y-2">
                <p>
                  <NavLink
                    to="/forgotPassword"
                    className="text-emerald-600 hover:underline"
                  >
                    Forgot Password?
                  </NavLink>
                </p>
                <p>
                  New here?{" "}
                  <NavLink
                    to="/signup"
                    className="text-emerald-600 hover:underline font-medium"
                  >
                    Create an Account
                  </NavLink>
                </p>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Login;
