import { motion } from "framer-motion";
import { useState } from "react";
import { tracerScreenshots } from "../assets/asset.js";
// Dummy screenshot data (replace URLs with actual Tracer site pages)

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: { scale: 1.05, boxShadow: "0 15px 40px rgba(0, 188, 114, 0.25)" },
};

const overlayVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

const waveVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 0.4,
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

function Tracer() {
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  return (
    <div className="bg-white text-[#004746] overflow-hidden">
      {/* New Hero Section with Waveform Animation */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="relative py-10 px-6 md:px-12 bg-white flex items-center justify-center min-h-[30vh]"
      >
        <div className="max-w-7xl mx-auto text-center z-10">
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold text-primary mb-6 
              tracking-tight relative inline-block"
          >
            Tracer
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              className="absolute bottom-0 left-0 w-full h-2 bg-[#00bc72]/30 rounded-full transform origin-left"
            />
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl leading-relaxed text-[#727272] max-w-3xl mx-auto"
          >
            Explore Tracer: Precision biotechnology in action. Click the
            screenshots below to interact with live demos.
          </motion.p>
        </div>

        {/* Animated Waveform Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="w-full h-full"
            fill="none"
            stroke="#00bc72"
            strokeWidth="1.5"
          >
            {/* Waveform Lines */}
            <motion.path
              variants={waveVariants}
              d="M0 30% Q25% 20%, 50% 30% T100% 30%"
              strokeOpacity="0.4"
            />
            <motion.path
              variants={waveVariants}
              d="M0 50% Q25% 60%, 50% 50% T100% 50%"
              strokeOpacity="0.4"
              transition={{ delay: 0.2 }}
            />
            <motion.path
              variants={waveVariants}
              d="M0 70% Q25% 60%, 50% 70% T100% 70%"
              strokeOpacity="0.4"
              transition={{ delay: 0.4 }}
            />
          </svg>
        </div>
      </motion.section>

      {/* Screenshots Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="py-20 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {tracerScreenshots.map((screenshot) => (
            <motion.div
              key={screenshot.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              onClick={() => setSelectedScreenshot(screenshot)}
              className="relative bg-white rounded-2xl shadow-md border border-[#004746]/10 
                hover:border-[#00bc72]/30 transition-all duration-300 cursor-pointer overflow-hidden 
                group"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              <img
                src={screenshot.screenshot}
                alt={screenshot.title}
                className="w-full h-48 object-cover transition-transform duration-300 
                  group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#004746]/50 to-transparent 
                opacity-0 group-hover:opacity-70 transition-opacity duration-300"
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-4 text-white 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <p className="text-sm font-medium">{screenshot.title}</p>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6 }}
                className="absolute bottom-0 left-0 w-full h-1 bg-[#00bc72]/50"
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Dialog Box with Live Site */}
      {selectedScreenshot && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-500 p-6"
          onClick={() => setSelectedScreenshot(null)}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[80vh] overflow-hidden 
              relative border border-[#00bc72]/20"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            style={{ fontFamily: "var(--font-primary)" }}
          >
            <button
              onClick={() => setSelectedScreenshot(null)}
              className="absolute top-4 right-4 text-[#727272] hover:text-accent 
                transition-colors duration-300 z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <iframe
              src={selectedScreenshot.liveUrl}
              title={selectedScreenshot.title}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Tracer;
