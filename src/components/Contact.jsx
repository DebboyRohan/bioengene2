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

const inputVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  focus: { borderColor: "#00bc72", scale: 1.02, transition: { duration: 0.3 } },
};

function Contact() {
  return (
    <div className="bg-white text-[#004746] overflow-hidden">
      {/* Hero Section with Molecular Animations */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="relative pt-12 pb-8 sm:pt-16 sm:pb-10 md:pt-20 md:pb-12 lg:pt-24 lg:pb-16 xl:pt-28 min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] flex items-center justify-center px-4 sm:px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto text-center z-10 w-full">
          <motion.h1
            variants={textFadeIn}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-primary mb-4 sm:mb-6 tracking-tight relative inline-block"
          >
            Contact Us
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              className="absolute bottom-0 left-0 w-full h-1 sm:h-2 bg-[#00bc72]/30 rounded-full transform origin-left"
            />
          </motion.h1>
          <motion.p
            variants={textFadeIn}
            className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-[#727272] max-w-3xl mx-auto"
          >
            Get in touch with BioEnGene to collaborate, inquire, or join our
            mission in biotechnology innovation.
          </motion.p>
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
              variants={lineVariants}
              d="M10% 40% L40% 20% L70% 50% M40% 20% L50% 60% M70% 50% L30% 70%"
              strokeOpacity="0.3"
            />
            <motion.circle
              variants={nodeVariants}
              cx="10%"
              cy="40%"
              r="4 sm:r-6"
              fill="#00bc72"
              opacity="0.5"
            />
            <motion.circle
              variants={nodeVariants}
              cx="40%"
              cy="20%"
              r="6 sm:r-8"
              fill="#00bc72"
              opacity="0.5"
            />
            <motion.circle
              variants={nodeVariants}
              cx="70%"
              cy="50%"
              r="4 sm:r-6"
              fill="#00bc72"
              opacity="0.5"
            />
            <motion.circle
              variants={nodeVariants}
              cx="50%"
              cy="60%"
              r="5 sm:r-7"
              fill="#00bc72"
              opacity="0.5"
            />
            <motion.circle
              variants={nodeVariants}
              cx="30%"
              cy="70%"
              r="4 sm:r-6"
              fill="#00bc72"
              opacity="0.5"
            />
          </svg>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6 sm:mb-8 md:mb-10 tracking-tight text-center"
        >
          Reach Out
        </motion.h2>
        <motion.div
          variants={staggerChildren}
          className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-[#004746]/10 max-w-full sm:max-w-xl md:max-w-2xl mx-auto"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          <form className="space-y-4 sm:space-y-6">
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
                className="w-full p-2 sm:p-3 rounded-lg border border-[#004746]/20 text-[#727272] 
                  text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00bc72] transition-all duration-300"
                placeholder="Your Name"
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
                className="w-full p-2 sm:p-3 rounded-lg border border-[#004746]/20 text-[#727272] 
                  text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00bc72] transition-all duration-300"
                placeholder="Your Email"
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
                className="w-full p-2 sm:p-3 rounded-lg border border-[#004746]/20 text-[#727272] 
                  text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00bc72] transition-all duration-300"
                placeholder="Your Message"
              />
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <button
                type="submit"
                className="inline-block py-2 px-6 sm:py-3 sm:px-8 text-base sm:text-lg font-medium text-white bg-[#00bc72] 
                  rounded-full shadow-lg hover:bg-[#0a5958] transition-all duration-300"
              >
                Send Message
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default Contact;
