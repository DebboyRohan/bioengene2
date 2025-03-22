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
        className="relative py-10 px-6 md:px-12 bg-white flex items-center justify-center min-h-[20vh]"
      >
        <div className="max-w-7xl mx-auto text-center z-10">
          <motion.h1
            variants={textFadeIn}
            className="text-5xl md:text-7xl font-extrabold text-primary mb-6 
              tracking-tight relative inline-block"
          >
            Contact Us
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
            {/* Connecting Lines */}
            <motion.path
              variants={lineVariants}
              d="M10% 40% L40% 20% L70% 50% M40% 20% L50% 60% M70% 50% L30% 70%"
              strokeOpacity="0.3"
            />
            {/* Animated Nodes */}
            <motion.circle
              variants={nodeVariants}
              cx="10%"
              cy="40%"
              r="6"
              fill="#00bc72"
              opacity="0.5"
            />
            <motion.circle
              variants={nodeVariants}
              cx="40%"
              cy="20%"
              r="8"
              fill="#00bc72"
              opacity="0.5"
            />
            <motion.circle
              variants={nodeVariants}
              cx="70%"
              cy="50%"
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
              cx="30%"
              cy="70%"
              r="6"
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
        className="py-20 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold text-primary mb-10 tracking-tight text-center"
        >
          Reach Out
        </motion.h2>
        <motion.div
          variants={staggerChildren}
          className="bg-white p-8 rounded-2xl shadow-lg border border-[#004746]/10 
            max-w-2xl mx-auto"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          <form className="space-y-6">
            <motion.div variants={inputVariants}>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#727272] mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 rounded-lg border border-[#004746]/20 text-[#727272] 
                  focus:outline-none focus:ring-2 focus:ring-[#00bc72] transition-all duration-300"
                placeholder="Your Name"
              />
            </motion.div>
            <motion.div variants={inputVariants}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#727272] mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded-lg border border-[#004746]/20 text-[#727272] 
                  focus:outline-none focus:ring-2 focus:ring-[#00bc72] transition-all duration-300"
                placeholder="Your Email"
              />
            </motion.div>
            <motion.div variants={inputVariants}>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-[#727272] mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full p-3 rounded-lg border border-[#004746]/20 text-[#727272] 
                  focus:outline-none focus:ring-2 focus:ring-[#00bc72] transition-all duration-300"
                placeholder="Your Message"
              />
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <button
                type="submit"
                className="inline-block py-3 px-8 text-lg font-medium text-white bg-[#00bc72] 
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
