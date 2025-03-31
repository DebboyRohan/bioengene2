import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function About() {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    setCurrentSection(0); // Start with first section
  }, []);

  const sections = [
    {
      id: "our-approach",
      title: "Our Approach",
      icon: "🔭",
      content: `At BioEnGene, we place people and society at the heart of our research. We believe that scientific advancements should directly address real-world challenges, driving meaningful progress in healthcare, energy, and the environment.\nThrough collaboration, diverse expertise, and interdisciplinary innovation, we strive to make our work both impactful and accessible. By bridging the gap between research and application, we aim to develop solutions that create lasting benefits for society.`,
    },
    {
      id: "our-vision",
      title: "Our Vision",
      icon: "🩺",
      content:
        "We envision a future where biological engineering transforms industries, improves lives, and drives sustainable innovation. By bridging the gap between scientific exploration and practical application, we strive to build a community that nurtures curiosity, interdisciplinary collaboration, and breakthrough discoveries. Through our efforts, we aim to create solutions that are not only scientifically rigorous but also accessible and impactful on a global scale.",
    },
    {
      id: "our-strength",
      title: "Our Strength",
      icon: "💡",
      content:
        "Being part of IIT Kharagpur provides BioEnGene with a rich ecosystem of talented students, leading faculty, and advanced research facilities. With access to expertise across engineering, biology, and medical sciences, we thrive in an environment that encourages interdisciplinary collaboration and innovation.Our work is supported by cutting-edge laboratories and computational resources, allowing us to explore new frontiers in biological engineering and develop impactful solutions for global challenges.",
    },
    {
      id: "our-working-style",
      title: "Our Working Style",
      icon: "⚙️",
      content:
        "At BioEnGene, we foster a collaborative and open research environment, where contributions are encouraged from students and researchers across science, engineering, and medical disciplines. With no rigid hierarchy, we value diverse perspectives and innovation, making the most of collective expertise to drive meaningful advancements.",
    },
  ];

  const handleNext = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length);
  };

  const handlePrev = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  return (
    <div className="bg-white text-[#004746] overflow-hidden">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="relative px-4 sm:px-6 md:px-12 bg-white flex items-center justify-center py-5"
      >
        <div className="max-w-7xl mx-auto text-center z-10">
          <motion.h1
            variants={textFadeIn}
            className="text-4xl sm:text-5xl md:text-6xl font-medium text-primary mb-3 tracking-tight relative inline-block"
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

        {/*Animated Molecular Network Background*/}
        {/* <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
        </div> */}
      </motion.section>

      {/* Content Section */}
      <div className="relative px-4 sm:px-6 md:px-12 max-w-7xl mx-auto py-8 sm:py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="relative"
        >
          {/* Content Display with Navigation */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                variants={contentReveal}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="bg-[#00bc72]/5 p-6 sm:p-8 rounded-lg shadow-lg max-w-3xl mx-auto relative"
              >
                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-4 sm:mb-6 flex items-center justify-center gap-3">
                    <span className="text-3xl">
                      {sections[currentSection].icon}
                    </span>
                    {sections[currentSection].title}
                  </h3>
                  <p className="text-base sm:text-lg leading-relaxed text-[#727272] whitespace-pre-line">
                    {sections[currentSection].content}
                  </p>
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={handlePrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 sm:-translate-x-3/4 bg-[#00bc72] text-white p-2 sm:p-3 rounded-full hover:bg-[#00bc72]/80 transition-colors duration-300"
                  aria-label="Previous section"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 sm:translate-x-3/4 bg-[#00bc72] text-white p-2 sm:p-3 rounded-full hover:bg-[#00bc72]/80 transition-colors duration-300"
                  aria-label="Next section"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 sm:w-6 sm:h-6"
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
                </button>
              </motion.div>
            </AnimatePresence>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {sections.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSection
                      ? "bg-[#00bc72] scale-125"
                      : "bg-[#00bc72]/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
