import { motion } from "framer-motion";
import { useState } from "react";
import { pastProjects } from "../assets/asset.js";
// Dummy data for past research projects

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

function Research() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="bg-white text-[#004746] overflow-hidden">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="relative py-24 px-6 md:px-12 bg-white flex items-center justify-center min-h-[80vh]"
      >
        <div className="max-w-7xl mx-auto text-center z-10">
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold text-primary mb-6 
              tracking-tight relative inline-block"
          >
            Our Research
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
            Exploring groundbreaking solutions in biotechnology and genetic
            engineering.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute w-72 h-72 bg-[#00bc72]/10 rounded-full top-1/4 left-1/4 
            transform -translate-x-1/2 -translate-y-1/2 blur-xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          className="absolute w-56 h-56 bg-[#004746]/10 rounded-full bottom-1/4 right-1/4 
            transform translate-x-1/2 translate-y-1/2 blur-xl"
        />
      </motion.section>

      {/* Current Project: Tracer */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="py-20 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold text-primary mb-10 tracking-tight text-center"
        >
          Current Project: Tracer
        </motion.h2>
        <motion.div
          variants={fadeInUp}
          className="bg-gradient-to-r from-[#004746]/5 to-[#00bc72]/5 p-8 rounded-2xl shadow-lg 
            border border-[#00bc72]/20"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          <h3 className="text-2xl font-semibold text-primary mb-4">
            Tracer: Precision Biotechnology
          </h3>
          <p className="text-[#727272] text-lg leading-relaxed mb-6">
            Tracer is our flagship project aimed at revolutionizing precision
            biotechnology. By leveraging advanced genetic tracing techniques,
            we’re developing tools to monitor and manipulate biological systems
            with unprecedented accuracy. This project has applications in
            healthcare, environmental monitoring, and industrial bioprocessing.
          </p>
          <div className="flex justify-center">
            <a
              href="#past-projects"
              className="inline-block py-3 px-8 text-lg font-medium text-white bg-[#00bc72] 
                rounded-full shadow-lg hover:bg-[#0a5958] transition-all duration-300"
            >
              Explore Past Projects
            </a>
          </div>
        </motion.div>
      </motion.section>

      {/* Past Research Projects */}
      <motion.section
        id="past-projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="py-20 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold text-primary mb-10 tracking-tight text-center"
        >
          Past Research Projects
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {pastProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              onClick={() => setSelectedProject(project)}
              className="relative bg-white rounded-2xl shadow-md border border-[#004746]/10 
                hover:border-[#00bc72]/30 transition-all duration-300 cursor-pointer overflow-hidden"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {project.title}
                </h3>
                <p className="text-[#727272] text-sm line-clamp-2">
                  {project.description}
                </p>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6 }}
                className="absolute bottom-0 left-0 w-full h-1 bg-[#00bc72]/30"
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Project Overlay */}
      {selectedProject && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-500 p-6"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] overflow-y-auto 
              p-8 relative border border-[#00bc72]/20"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            style={{ fontFamily: "var(--font-primary)" }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-[#727272] hover:text-accent 
                transition-colors duration-300"
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
            <img
              src={selectedProject.image_url}
              alt={selectedProject.title}
              className="w-full h-64 object-cover rounded-xl mb-6"
            />
            <h2 className="text-3xl font-bold text-primary mb-4">
              {selectedProject.title}
            </h2>
            <p className="text-[#727272] text-lg leading-relaxed mb-6">
              {selectedProject.details}
            </p>

            {/* Add more content here if needed */}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Research;
