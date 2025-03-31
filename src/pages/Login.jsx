import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import biotechdept from "../assets/images/biotechdept.jpg";
import { FiUser, FiLock, FiLoader, FiAlertCircle } from "react-icons/fi";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const API_URL = "https://172.16.3.23:5000";

  const handleClick = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        { username, password },
        { timeout: 10000 } // 10 second timeout
      );

      const { token, role, username: userName } = response.data;

      // Store auth data
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userName", userName);

      // Notify other components
      window.dispatchEvent(new Event("storageChange"));

      // Show success feedback
      setSuccess(true);
      setTimeout(() => {
        navigate("/admin");
        handleClick();
      }, 1000);
    } catch (err) {
      let errorMessage = "Login failed. Please try again.";

      if (err.response) {
        // Server responded with error status
        errorMessage = err.response.data?.message || errorMessage;
      } else if (err.request) {
        // Request was made but no response
        errorMessage = "Network error - server not responding";
      } else {
        // Other errors
        errorMessage = err.message || errorMessage;
      }

      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

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
        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" />

        <div className="relative flex items-center justify-center min-h-screen px-4">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] 
              bg-emerald-400/20 rounded-full blur-3xl animate-pulse"
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 w-full max-w-md p-8 bg-white/95 
              backdrop-blur-md rounded-2xl shadow-xl border border-emerald-100/50"
          >
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl font-bold text-emerald-900 text-center mb-8 tracking-tight"
            >
              Welcome Back
            </motion.h2>

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3 bg-emerald-100 text-emerald-800 rounded-lg 
                  flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Login successful! Redirecting...
              </motion.div>
            )}

            <motion.form
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-4 pr-12 rounded-full bg-gray-50 
                      border border-gray-200 text-gray-800 placeholder-gray-400 
                      focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
                      transition-all duration-300 outline-none"
                    disabled={loading || success}
                    required
                  />
                  <FiUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                <div className="relative">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 pr-12 rounded-full bg-gray-50 
                      border border-gray-200 text-gray-800 placeholder-gray-400 
                      focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
                      transition-all duration-300 outline-none"
                    disabled={loading || success}
                    required
                  />
                  <FiLock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2"
                >
                  <FiAlertCircle className="flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <motion.button
                whileHover={{
                  scale: loading || success ? 1 : 1.03,
                  boxShadow:
                    loading || success
                      ? "none"
                      : "0 8px 25px rgba(16, 185, 129, 0.2)",
                }}
                whileTap={{ scale: loading || success ? 1 : 0.98 }}
                type="submit"
                className={`w-full py-3.5 px-6 text-lg font-medium text-white 
                  rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2
                  ${
                    loading || success
                      ? "bg-emerald-400 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                disabled={loading || success}
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin" />
                    Signing In...
                  </>
                ) : success ? (
                  "Success!"
                ) : (
                  "Sign In"
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Login;
