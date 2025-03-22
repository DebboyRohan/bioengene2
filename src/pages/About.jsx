import { motion } from "framer-motion";

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

function About() {
  return (
    <div className="bg-white text-[#004746] overflow-hidden">
      {/* Unique Technical Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="relative py-24 px-6 md:px-12 bg-white flex items-center justify-center min-h-[80vh]"
      >
        <div className="max-w-7xl mx-auto text-center z-10">
          <motion.h1
            variants={textFadeIn}
            className="text-5xl md:text-7xl font-extrabold text-primary mb-6 
              tracking-tight relative inline-block"
          >
            BioEnGene
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              className="absolute bottom-0 left-0 w-full h-2 bg-[#00bc72]/30 rounded-full transform origin-left"
            />
          </motion.h1>
          <motion.p
            variants={textFadeIn}
            className="text-xl md:text-2xl leading-relaxed text-[#727272] max-w-3xl mx-auto"
          >
            Pioneering the future of biotechnology and genetic engineering
            through innovation, collaboration, and impactful research.
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-8">
            <a
              href="#content"
              className="inline-block py-3 px-8 text-lg font-medium text-white bg-[#00bc72] 
                rounded-full shadow-lg hover:bg-[#0a5958] transition-all duration-300"
            >
              Discover More
            </a>
          </motion.div>
        </div>

        {/* Animated Molecular Network Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="w-full h-full"
            fill="none"
            stroke="#00bc72"
            strokeWidth="1"
          >
            {/* Connecting Lines */}
            <motion.path
              variants={lineVariants}
              d="M20% 30% L50% 20% L80% 40% M50% 20% L50% 60% M80% 40% L60% 70%"
              strokeOpacity="0.3"
            />
            {/* Animated Nodes */}
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

      {/* Main Content */}
      <div
        id="content"
        className="relative py-20 px-6 md:px-12 max-w-7xl mx-auto bg-white"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="space-y-24 md:space-y-32"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {/* Who We Are */}
          <motion.section
            variants={fadeInUp}
            className="relative md:flex md:items-center md:justify-between"
          >
            <div className="md:w-2/3">
              <motion.h2
                variants={textFadeIn}
                className="text-4xl md:text-5xl font-extrabold text-primary mb-6 tracking-tight"
              >
                Who We Are
              </motion.h2>
              <motion.p
                variants={textFadeIn}
                className="text-lg md:text-xl leading-relaxed text-[#727272] max-w-2xl"
              >
                At BioEnGene, we bring together a multidisciplinary team of
                undergraduate project scholars, student researchers, and top
                faculties, committed to addressing global challenges in energy,
                healthcare, and the environment. Our work spans diverse fields
                like bioprocess engineering, environmental biotechnology,
                genetic research, and bio-inspired materials. We’re passionate
                about exploring new ideas, sharing knowledge, and making a
                meaningful impact through our research.
              </motion.p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 
                bg-[#00bc72]/20 rounded-full items-center justify-center text-accent text-2xl md:visible md:flex hidden"
            >
              🌍
            </motion.div>
          </motion.section>

          {/* Our Vision */}
          <motion.section
            variants={fadeInUp}
            className="relative md:flex md:flex-row-reverse md:items-center md:justify-between"
          >
            <div className="md:w-1/2 md:ml-auto">
              <motion.h2
                variants={textFadeIn}
                className="text-3xl md:text-4xl font-bold text-primary mb-4 tracking-tight"
              >
                Our Vision
              </motion.h2>
              <motion.p
                variants={textFadeIn}
                className="text-lg leading-relaxed text-[#727272] max-w-md"
              >
                With rapid growth, development, and availability of ample
                opportunities in Bio-Engineering, government and private sectors
                have started exploring this uncharted territory. We believe in a
                future where bio-based solutions will solve fundamental
                challenges globally and locally.
              </motion.p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: -10 }}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 
                bg-[#004746]/20 rounded-full  items-center justify-center text-primary text-2xl md:visible md:flex hidden"
            >
              🔮
            </motion.div>
          </motion.section>

          {/* Our Mission */}
          <motion.section
            variants={fadeInUp}
            className="relative md:flex md:items-center md:justify-between"
          >
            <div className="md:w-1/2">
              <motion.h2
                variants={textFadeIn}
                className="text-3xl md:text-4xl font-bold text-primary mb-4 tracking-tight"
              >
                Our Mission
              </motion.h2>
              <motion.p
                variants={textFadeIn}
                className="text-lg leading-relaxed text-[#727272] max-w-md"
              >
                Rapid prototyping in healthcare, Med-tech, and diagnostics. We
                focus on solving immediate societal challenges and exploring
                Bio-Engineering applications in various domains.
              </motion.p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 
                bg-[#00bc72]/20 rounded-full  items-center justify-center text-accent text-2xl md:visible md:flex hidden"
            >
              🩺
            </motion.div>
          </motion.section>

          {/* Our Strength */}
          <motion.section
            variants={fadeInUp}
            className="relative md:flex md:flex-row-reverse md:items-center md:justify-between"
          >
            <div className="md:w-1/2 md:ml-auto">
              <motion.h2
                variants={textFadeIn}
                className="text-3xl md:text-4xl font-bold text-primary mb-4 tracking-tight"
              >
                Our Strength
              </motion.h2>
              <motion.p
                variants={textFadeIn}
                className="text-lg leading-relaxed text-[#727272] max-w-md"
              >
                Our team comprises proactive members with deep expertise,
                energetic to serve the nation. Strong leadership, expert
                advisors, and a collaborative work culture set us apart.
              </motion.p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: -10 }}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 
                bg-[#004746]/20 rounded-full  items-center justify-center text-primary text-2xl md:visible md:flex hidden"
            >
              💪
            </motion.div>
          </motion.section>

          {/* Our Working Style */}
          <motion.section
            variants={fadeInUp}
            className="relative md:flex md:items-center md:justify-between"
          >
            <div className="md:w-2/3">
              <motion.h2
                variants={textFadeIn}
                className="text-3xl md:text-4xl font-bold text-primary mb-4 tracking-tight"
              >
                Our Working Style
              </motion.h2>
              <motion.p
                variants={textFadeIn}
                className="text-lg leading-relaxed text-[#727272] max-w-2xl"
              >
                We employ rigorous cross-questioning, structured research
                methodologies, and theoretical validation before execution. Our
                approach minimizes failure and ensures optimal utilization of
                national resources.
              </motion.p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 
                bg-[#00bc72]/20 rounded-full  items-center justify-center text-accent text-2xl md:visible md:flex hidden"
            >
              ⚙️
            </motion.div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
