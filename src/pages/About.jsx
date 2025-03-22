import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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

const contentReveal = {
  hidden: { opacity: 0, height: 0, y: 20 },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: {
    y: -10,
    scale: 1.05,
    boxShadow: "0 10px 20px rgba(0, 188, 114, 0.2)",
    transition: { duration: 0.3 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.5 },
  },
  hover: {
    scale: 1.2,
    transition: { duration: 0.3, yoyo: Infinity },
  },
};

const particleVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: [0, 1, 0],
    scale: [0, 1, 0],
    x: "100%",
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 0.5,
    },
  },
};

const clickTextVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.6 },
  },
  hover: {
    y: [0, -5, 0],
    transition: { duration: 0.5, repeat: Infinity },
  },
};

function About() {
  const [openSection, setOpenSection] = useState(null);
  const [linePosition, setLinePosition] = useState({ startX: 0, endX: 0 });
  const cardRefs = useRef([]);
  const contentRef = useRef(null);

  // Set the first section as open by default when the component mounts
  useEffect(() => {
    setOpenSection(sections[0].id);
  }, []);

  // Update the line position whenever the open section changes
  useEffect(() => {
    if (openSection && cardRefs.current.length > 0 && contentRef.current) {
      const sectionIndex = sections.findIndex((s) => s.id === openSection);
      const cardElement = cardRefs.current[sectionIndex];
      const contentElement = contentRef.current;

      if (cardElement && contentElement) {
        const cardRect = cardElement.getBoundingClientRect();
        const contentRect = contentElement.getBoundingClientRect();

        // Calculate the start and end points for the line
        const startX = cardRect.left + cardRect.width / 2;
        const endX = contentRect.left + contentRect.width / 2;

        setLinePosition({ startX, endX });
      }
    }
  }, [openSection]);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: "who-we-are",
      title: "Who We Are",
      icon: "🧬",
      content:
        "At BioEnGene, we bring together a multidisciplinary team of undergraduate project scholars, student researchers, and top faculties, committed to addressing global challenges in energy, healthcare, and the environment. Our work spans diverse fields like bioprocess engineering, environmental biotechnology, genetic research, and bio-inspired materials. We’re passionate about exploring new ideas, sharing knowledge, and making a meaningful impact through our research.",
    },
    {
      id: "our-vision",
      title: "Our Vision",
      icon: "🔭",
      content:
        "With rapid growth, development, and availability of ample opportunities in Bio-Engineering, government and private sectors have started exploring this uncharted territory. We believe in a future where bio-based solutions will solve fundamental challenges globally and locally.",
    },
    {
      id: "our-mission",
      title: "Our Mission",
      icon: "🩺",
      content:
        "Rapid prototyping in healthcare, Med-tech, and diagnostics. We focus on solving immediate societal challenges and exploring Bio-Engineering applications in various domains.",
    },
    {
      id: "our-strength",
      title: "Our Strength",
      icon: "💡",
      content:
        "Our team comprises proactive members with deep expertise, energetic to serve the nation. Strong leadership, expert advisors, and a collaborative work culture set us apart.",
    },
    {
      id: "our-working-style",
      title: "Our Working Style",
      icon: "⚙️",
      content:
        "We employ rigorous cross-questioning, structured research methodologies, and theoretical validation before execution. Our approach minimizes failure and ensures optimal utilization of national resources.",
    },
  ];

  return (
    <div className="bg-white text-[#004746] overflow-hidden">
      {/* Unique Technical Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="relative px-6 md:px-12 bg-white flex items-center justify-center min-h-[1vh]"
      >
        <div className="max-w-7xl mx-auto text-center z-10">
          <motion.h1
            variants={textFadeIn}
            className="text-5xl md:text-6xl font-medium text-primary mb-3 tracking-tight relative inline-block"
          >
            About <span className="text-accent">Us</span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              className="absolute bottom-0 left-0 w-full h-2 bg-[#00bc72]/30 rounded-full transform origin-left"
            />
          </motion.h1>
        </div>

        {/* Animated Molecular Network Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="w-full h-full"
            fill="none"
            stroke="#00bc72"
            strokeWidth="1"
          >
            <motion.path
              variants={nodeVariants}
              d="M20% 30% L50% 20% L80% 40% M50% 20% L50% 60% M80% 40% L60% 70%"
              strokeOpacity="0.3"
            />
            <motion.circle
              variants={nodeVariants}
              cx="20%"
              cy="30%"
              r="6"
              fill="#00bc72"
              opacity="0.5"
            />
            <motion.circle
              variants={nodeVariants}
              cx="50%"
              cy="20%"
              r="8"
              fill="#00bc72"
              opacity="0.5"
            />
            <motion.circle
              variants={nodeVariants}
              cx="80%"
              cy="40%"
              r="6"
              fill="#00bc72"
              opacity="0.5"
            />
            <motion.circle
              variants={nodeVariants}
              cx="50%"
              cy="60%"
              r="7"
              fill="#00bc72"
              opacity="0.5"
            />
            <motion.circle
              variants={nodeVariants}
              cx="60%"
              cy="70%"
              r="6"
              fill="#00bc72"
              opacity="0.5"
            />
          </svg>
        </div>
      </motion.section>

      {/* Main Content - Horizontal Map */}
      <div
        id="content"
        className="relative px-6 md:px-12 max-w-7xl mx-auto bg-white"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="relative"
        >
          {/* Horizontal Map Container */}
          <div className="relative flex items-center justify-between overflow-x-auto py-10">
            {/* Map Points */}
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className="relative flex flex-col items-center mx-4 shadow-md p-5 rounded-xl bg-white border border-[#00bc72]/20 cursor-pointer group"
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => toggleSection(section.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && toggleSection(section.id)
                }
              >
                {/* Glowing Border on Hover */}
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-transparent"
                  initial={{ borderColor: "rgba(0, 188, 114, 0)" }}
                  whileHover={{
                    borderColor: "rgba(0, 188, 114, 0.5)",
                    transition: { duration: 0.3 },
                  }}
                />

                {/* Dot and Icon with Glow */}
                <motion.div
                  className="relative z-10"
                  variants={dotVariants}
                  whileHover="hover"
                >
                  <div className="w-12 h-12 rounded-full bg-[#00bc72]/20 flex items-center justify-center text-2xl relative">
                    {section.icon}
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#00bc72]/30 blur-md"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h3
                  variants={textFadeIn}
                  className="mt-4 text-lg md:text-xl font-bold text-primary text-center"
                >
                  {section.title}
                </motion.h3>

                {/* Click to Read Indicator */}
                <motion.p
                  className="mt-2 text-sm text-[#727272] flex items-center gap-1"
                  variants={clickTextVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  Click to Read
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.p>

                {/* Particle Flow Animation Between Points */}
                {index < sections.length - 1 && (
                  <div className="absolute top-1/2 left-1/2 w-[calc(100%+2rem)] h-6 transform -translate-y-1/2 pointer-events-none overflow-hidden">
                    <motion.div
                      className="absolute w-3 h-3 rounded-full bg-[#00bc72] opacity-50"
                      variants={particleVariants}
                      initial="hidden"
                      animate="visible"
                      style={{ left: 0 }}
                    />
                    <motion.div
                      className="absolute w-2 h-2 rounded-full bg-[#00bc72] opacity-30"
                      variants={particleVariants}
                      initial="hidden"
                      animate="visible"
                      style={{ left: 0, transitionDelay: "0.2s" }}
                    />
                    <motion.div
                      className="absolute w-4 h-4 rounded-full bg-[#00bc72] opacity-40"
                      variants={particleVariants}
                      initial="hidden"
                      animate="visible"
                      style={{ left: 0, transitionDelay: "0.4s" }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Background Line Connecting Card to Content */}

          {/* Content Reveal */}
          <div className="mt-8 relative">
            <AnimatePresence>
              {openSection && (
                <motion.div
                  ref={contentRef}
                  variants={contentReveal}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="bg-[#00bc72]/5 p-6 rounded-lg shadow-lg text-center max-w-3xl mx-auto"
                >
                  {sections.map(
                    (section) =>
                      section.id === openSection && (
                        <div key={section.id}>
                          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                            {section.title}
                          </h3>
                          <p className="text-lg leading-relaxed text-[#727272]">
                            {section.content}
                          </p>
                        </div>
                      )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
