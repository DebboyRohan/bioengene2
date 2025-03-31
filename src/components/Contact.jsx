import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

const textFadeIn = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const nodeVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: [1, 1.2, 1],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      delay: 0.5,
    },
  },
};

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 2, ease: "easeOut", delay: 0.8 },
  },
};

const inputVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  focus: { borderColor: "#00bc72", scale: 1.02, transition: { duration: 0.3 } },
};

function Contact() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(""); // Clear previous messages

    try {
      const response = await axios.post(
        "https://172.16.3.23:5000/api/contact/send",
        formData
      );
      setMessage(response.data.message);
      // Reset form on success
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-[#004746] overflow-hidden">
      {/* Contact Form Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="py-5 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6 sm:mb-8 md:mb-10 tracking-tight text-center"
        >
          Contact Us
        </motion.h2>
        <motion.div
          variants={staggerChildren}
          className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-[#004746]/10 max-w-full sm:max-w-xl md:max-w-2xl mx-auto"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {message && (
            <p
              className={`mb-6 text-center p-3 rounded-lg ${
                message.includes("successfully")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <motion.div variants={inputVariants}>
              <label
                htmlFor="name"
                className="block text-xs sm:text-sm font-medium text-[#727272] mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 rounded-lg border border-[#004746]/20 text-[#727272] 
                  text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00bc72] transition-all duration-300"
                placeholder="Your Name"
                required
              />
            </motion.div>
            <motion.div variants={inputVariants}>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium text-[#727272] mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 rounded-lg border border-[#004746]/20 text-[#727272] 
                  text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00bc72] transition-all duration-300"
                placeholder="Your Email"
                required
              />
            </motion.div>
            <motion.div variants={inputVariants}>
              <label
                htmlFor="message"
                className="block text-xs sm:text-sm font-medium text-[#727272] mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4 sm:rows-5"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 rounded-lg border border-[#004746]/20 text-[#727272] 
                  text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00bc72] transition-all duration-300"
                placeholder="Your Message"
                required
              />
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <button
                type="submit"
                className="inline-block py-2 px-6 sm:py-3 sm:px-8 text-base sm:text-lg font-medium text-white bg-[#00bc72] 
                  rounded-full shadow-lg hover:bg-[#0a5958] transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default Contact;
