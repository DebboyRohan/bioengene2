import { motion } from "framer-motion";
import { cardsData, defaultpic, biotechdept } from "../assets/asset.js";

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: {
    scale: 1.03,
    boxShadow: "0 20px 50px rgba(0, 188, 114, 0.3)",
    transition: { duration: 0.3 },
  },
};

function Team() {
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
        className="relative py-24 px-6 md:px-12 bg-white flex items-center justify-center min-h-[80vh]"
      >
        <div className="max-w-7xl mx-auto text-center z-10">
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold text-primary mb-6 
              tracking-tight relative inline-block"
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
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex justify-center gap-6"
          >
            <motion.a
              href="#team-content"
              whileHover={{ scale: 1.1 }}
              className="inline-block py-3 px-8 text-lg font-medium text-white bg-[#00bc72] 
                rounded-full shadow-lg hover:bg-[#0a5958] transition-all duration-300"
            >
              Meet the Team
            </motion.a>
          </motion.div>
        </div>
        {/* Subtle Animated Background Elements */}
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

      {/* Team Sections */}
      <div
        id="team-content"
        className="py-20 px-6 md:px-12 max-w-7xl mx-auto bg-white"
      >
        {Object.entries(teams).map(([teamName, members]) => (
          <motion.section
            key={teamName}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-primary mb-10 tracking-tight 
                text-center relative"
            >
              {teamName}
              <span
                className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 
                w-16 h-1 bg-[#00bc72]/50 rounded-full"
              />
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {members.map((member) => (
                <motion.div
                  key={member.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  className="relative bg-white rounded-2xl shadow-lg overflow-hidden 
                    border border-[#004746]/10 transition-all duration-300 group"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {/* Profile Image */}
                  <div className="relative">
                    <motion.img
                      src={member.image_url}
                      alt={member.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-48 md:h-56 object-cover"
                    />
                    {/* Gradient Overlay on Hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.8 }}
                      className="absolute inset-0 bg-gradient-to-t from-[#004746]/70 to-transparent"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 text-center relative z-10">
                    <h3
                      className="text-xl font-semibold text-primary mb-2 group-hover:text-accent 
                      transition-colors duration-300"
                    >
                      {member.name}
                    </h3>
                    <p className="text-[#727272] text-sm mb-3">
                      {member.designation}
                    </p>
                    <div className="flex justify-center gap-4">
                      {/* Email Icon */}
                      <a
                        href={`mailto:${member.email}`}
                        className="text-[#727272] hover:text-accent transition-colors duration-300"
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
                      </a>
                      {/* LinkedIn Icon */}
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#727272] hover:text-accent transition-colors duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-1.337-.027-3.063-1.867-3.063-1.867 0-2.154 1.459-2.154 2.966v5.701h-3v-11h2.879v1.508h.041c.401-.758 1.379-1.558 2.837-1.558 3.037 0 3.604 2 3.604 4.604v6.446z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Animated Accent Line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00bc72]/50 to-[#0a5958]/50"
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}

export default Team;
