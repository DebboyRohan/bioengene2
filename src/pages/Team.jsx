import { motion, AnimatePresence } from "framer-motion";
import { cardsData, defaultpic, biotechdept } from "../assets/asset.js";
import { useState } from "react";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: {
    y: -10,
    boxShadow: "0 10px 30px rgba(0, 71, 70, 0.1)",
    transition: { duration: 0.3 },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};

const textFade = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } },
};

const designationFade = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.3 } },
};

const iconFade = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.4 } },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "#00bc72",
    color: "#ffffff",
    transition: { duration: 0.3 },
  },
};

function Team() {
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Group team members by category
  const teams = {
    "PI Team": [
      {
        id: "pi1",
        name: "TBD",
        email: "Coming Soon",
        designation: "Principal Investigator",
        image_url: defaultpic,
      },
      {
        id: "pi2",
        name: "TBD",
        email: "Coming Soon",
        designation: "Principal Investigator",
        image_url: defaultpic,
      },
      {
        id: "pi3",
        name: "TBD",
        email: "Coming Soon",
        designation: "Principal Investigator",
        image_url: biotechdept,
      },
    ],
    "Core Team": cardsData.filter((member) => member.team === "Core Team"),
    "Spons Team": cardsData.filter((member) => member.team === "Spons Team"),
    "Web Dev Team": cardsData.filter(
      (member) => member.team === "Web Dev Team"
    ),
  };

  return (
    <div className="bg-white text-[#004746] overflow-hidden">
      {/* Enhanced Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="relative py-10 px-6 md:px-12 bg-white flex items-center justify-center min-h-[20vh]"
      >
        <div className="max-w-7xl mx-auto text-center z-10">
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold text-primary mb-6 tracking-tight relative inline-block"
          >
            Our Team
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
            Discover the talented individuals powering BioEnGene’s mission in
            biotechnology and innovation.
          </motion.p>
        </div>
        {/* Subtle Animated Background Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute w-72 h-72 bg-[#00bc72]/10 rounded-full top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 blur-xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          className="absolute w-56 h-56 bg-[#004746]/10 rounded-full bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 blur-xl"
        />
      </motion.section>

      {/* Team Sections with Buttons */}
      <div
        id="team-content"
        className="py-20 px-6 md:px-12 max-w-7xl mx-auto bg-white"
      >
        {/* Team Selection Buttons */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {Object.keys(teams).map((teamName) => (
            <motion.button
              key={teamName}
              variants={buttonVariants}
              whileHover="hover"
              onClick={() => setSelectedTeam(teamName)}
              className={`py-2 px-6 text-lg font-medium rounded-full border border-[#004746] transition-all duration-300 ${
                selectedTeam === teamName
                  ? "bg-[#004746] text-white"
                  : "bg-white text-primary hover:bg-[#004746] hover:text-white"
              }`}
            >
              {teamName}
            </motion.button>
          ))}
        </motion.div>

        {/* Team Members Display */}
        <AnimatePresence>
          {selectedTeam && (
            <motion.section
              key={selectedTeam}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={staggerChildren}
              className="mb-16"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-primary mb-10 tracking-tight text-center relative"
              >
                {selectedTeam}
                <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#00bc72]/50 rounded-full" />
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {teams[selectedTeam].map((member) => (
                  <motion.div
                    key={member.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="relative bg-white rounded-xl shadow-md group overflow-hidden"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    {/* Glowing Border on Hover */}
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 border-transparent"
                      initial={{ borderColor: "rgba(0, 188, 114, 0)" }}
                      whileHover={{
                        borderColor: "rgba(0, 188, 114, 0.3)",
                        transition: { duration: 0.3 },
                      }}
                    />

                    {/* Subtle Background Gradient on Hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-[#00bc72]/5 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Card Content */}
                    <div className="p-6 text-center relative z-10">
                      {/* Circular Image */}
                      <motion.div
                        className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-[#00bc72]/20"
                        variants={imageVariants}
                        whileHover="hover"
                      >
                        <motion.img
                          src={member.image_url}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>

                      {/* Name */}
                      <motion.h3
                        variants={textFade}
                        className="text-xl font-semibold text-primary mb-2 group-hover:text-[#00bc72] transition-colors duration-300"
                      >
                        {member.name}
                      </motion.h3>

                      {/* Designation */}
                      <motion.p
                        variants={designationFade}
                        className="text-[#727272] text-sm mb-4 group-hover:text-[#0a5958] transition-colors duration-300"
                      >
                        {member.designation}
                      </motion.p>

                      {/* Social Icons */}
                      <motion.div
                        className="flex justify-center gap-4"
                        variants={staggerChildren}
                      >
                        {/* Email Icon */}
                        <motion.a
                          href={`mailto:${member.email}`}
                          variants={iconFade}
                          className="text-[#727272] group-hover:text-[#00bc72] transition-colors duration-300"
                          title={member.email}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l9-6 9 6v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l9 6 9-6"
                            />
                          </svg>
                        </motion.a>
                        {/* LinkedIn Icon */}
                        <motion.a
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          variants={iconFade}
                          className="text-[#727272] group-hover:text-[#00bc72] transition-colors duration-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-1.337-.027-3.063-1.867-3.063-1.867 0-2.154 1.459-2.154 2.966v5.701h-3v-11h2.879v1.508h.041c.401-.758 1.379-1.558 2.837-1.558 3.037 0 3.604 2 3.604 4.604v6.446z" />
                          </svg>
                        </motion.a>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Team;
