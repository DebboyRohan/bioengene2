import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import biotechdept from "../assets/images/biotechdept.jpg";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://172.16.3.23:5000/api/auth/login",
        {
          username,
          password,
        }
      );
      const { token, role, username: userName } = response.data; // Extract username from response
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userName", userName); // Store username for Navbar to use

      // Dispatch a custom event to notify other components (e.g., Navbar) of the token change
      window.dispatchEvent(new Event("storageChange"));

      setError("");
      navigate("/admin"); // Redirect to admin panel after successful login
      handleClick();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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

            <motion.form
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
              onSubmit={handleSubmit}
            >
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
                />
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 
                  text-gray-400"
                >
                  👤
                </span>
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
                />
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 
                  text-gray-400"
                >
                  🔒
                </span>
              </div>

              {error && <p className="text-red-500 text-center">{error}</p>}

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
            </motion.form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Login;
