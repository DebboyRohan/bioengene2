import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

const timelineItemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function AchievementTemp() {
  // Define static achievements data
  const achievements = [
    {
      id: 1,
      year: "",
      title: "TSG Annual Award",
      description:
        "Awarded in Technology Students Gymkhana annual award ceremony with prize money.",
      attachment: "",
    },
    {
      id: 2,
      year: "",
      title: "SIH ",
      description: "SIH : Secured 2nd position",
      attachment: "",
    },
    {
      id: 3,
      year: "",
      title: "Warwick Internship Opportunity",
      description:
        "Our member got offer for an Internship in University of Warwick",
      attachment: "",
    },
    {
      id: 4,
      year: "",
      title: "Inter IIT Gold Medal Win",
      description: "Inter IIT Gold Medal",
      attachment: "/assets/files/achievement/interiitgold.pdf",
    },
  ];

  return (
    <div className="bg-white text-[#004746] overflow-hidden">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="relative pt-10 px-6 md:px-12 bg-white flex items-center justify-center min-h-[10vh]"
      >
        <div className="max-w-7xl mx-auto text-center z-10">
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold text-primary mb-6 
              tracking-tight relative inline-block"
          >
            Our Achievements
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
            A journey of innovation, impact, and excellence in biotechnology.
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-10 relative">
            <svg
              className="w-24 h-24 mx-auto text-[#00bc72]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.2, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                w-32 h-32 bg-[#00bc72]/20 rounded-full blur-xl"
            />
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="py-5 px-6 md:px-12 max-w-7xl mx-auto relative"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold text-primary mb-12 tracking-tight text-center"
        >
          Our Milestones
        </motion.h2>
        {achievements.length === 0 ? (
          <p className="text-center text-lg text-gray-500">
            No achievements available.
          </p>
        ) : (
          <div className="relative">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b 
                from-[#004746]/20 to-[#00bc72]/50 rounded-full"
              style={{ top: 0, zIndex: 0 }}
            />

            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                variants={timelineItemVariants}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
                style={{ fontFamily: "var(--font-primary)" }}
              >
                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0
                      ? "pr-8 md:pr-12 text-right"
                      : "pl-8 md:pl-12 text-left"
                  }`}
                >
                  <div
                    className="relative bg-white p-6 rounded-xl shadow-md border border-[#004746]/10 
                    hover:border-[#00bc72]/30 transition-all duration-300 group"
                  >
                    <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent">
                      {achievement.title}
                    </h3>
                    <p className="text-[#727272] text-sm mb-2">
                      {achievement.description}
                    </p>
                    <span className="text-[#00bc72] font-medium">
                      {achievement.attachment ? (
                        <a
                          href={achievement.attachment}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-[#004746] transition-all duration-300"
                        >
                          View Attachment
                        </a>
                      ) : (
                        " "
                      )}
                    </span>

                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#00bc72] 
                        rounded-full ${
                          index % 2 === 0
                            ? "right-[-2rem] md:right-[-3rem]"
                            : "left-[-2rem] md:left-[-3rem]"
                        }`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
}

export default AchievementTemp;
