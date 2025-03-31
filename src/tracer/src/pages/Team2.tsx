import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Linkedin, Mail, User, ExternalLink } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string; // Made bio optional since Advisors won't have it
  social: {
    linkedin?: string;
    email?: string;
    profile?: string; // Added profile link for Advisors
  };
}

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { theme } = useTheme();
  const [imageError, setImageError] = useState(false);

  const themeStyles = {
    dark: {
      cardBg: "bg-black/50",
      textPrimary: "text-white",
      textSecondary: "text-gray-400",
      roleText: "text-neonRed",
      border: "border-gray-700",
      hoverShadow: "hover:shadow-var(--color-neonRed)/50",
      placeholderBg: "bg-gray-800",
      placeholderIcon: "text-gray-500",
      socialIcon: "text-gray-400",
      socialIconHover: "hover:var(--color-neonRed)",
    },
    light: {
      cardBg: "bg-white",
      textPrimary: "text-gray-900",
      textSecondary: "text-gray-700",
      roleText: "text-blue-600",
      border: "border-gray-200",
      hoverShadow: "hover:shadow-gray-400",
      placeholderBg: "bg-gray-200",
      placeholderIcon: "text-gray-400",
      socialIcon: "text-gray-600",
      socialIconHover: "hover:text-blue-600",
    },
  };

  const currentTheme = themeStyles[theme as keyof typeof themeStyles];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`${currentTheme.cardBg} rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg ${currentTheme.hoverShadow} max-w-xs mx-auto border ${currentTheme.border}`}
    >
      <div className="p-4 sm:p-6 flex flex-col items-center">
        <div
          className={`w-40 h-40 sm:w-48 sm:h-48 rounded-t-lg flex items-center justify-center mb-4 overflow-hidden`}
        >
          {member.image && !imageError ? (
            <img
              src={member.image}
              alt={`${member.name}'s profile`}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div
              className={`${currentTheme.placeholderBg} w-full h-full flex items-center justify-center`}
            >
              <User
                className={`w-20 h-20 sm:w-24 sm:h-24 ${currentTheme.placeholderIcon}`}
              />
            </div>
          )}
        </div>
        <h3
          className={`text-lg sm:text-xl font-bold ${currentTheme.textPrimary} mb-2 text-center`}
        >
          {member.name}
        </h3>
        <p
          className={`${currentTheme.roleText} mb-2 text-center text-sm sm:text-base`}
        >
          {member.role}
        </p>
        <div className="flex gap-3 sm:gap-4 justify-center">
          {member.social.profile && (
            <a
              href={member.social.profile}
              target="_blank"
              rel="noopener noreferrer"
              className={`${currentTheme.socialIcon} ${currentTheme.socialIconHover} transition-colors`}
            >
              <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          )}
          {member.social.linkedin && (
            <a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${currentTheme.socialIcon} ${currentTheme.socialIconHover} transition-colors`}
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          )}
          {member.social.email && (
            <a
              href={`mailto:${member.social.email}`}
              className={`${currentTheme.socialIcon} ${currentTheme.socialIconHover} transition-colors`}
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Team2: React.FC = () => {
  const { theme } = useTheme();

  const themeStyles = {
    dark: {
      sectionBg: "bg-gradient-to-b from-black to-[#2A0000]",
      textPrimary: "text-white",
      textSecondary: "text-gray-400",
      tabActiveBg: "bg-[#ff4040]",
      tabActiveText: "text-white",
      tabInactiveBg: "bg-gray-800",
      tabInactiveText: "text-gray-400",
      tabHoverBg: "hover:bg-gray-700",
      tabHoverShadow: "hover:shadow-neonRed/50",
    },
    light: {
      sectionBg: "bg-white",
      textPrimary: "text-gray-900",
      textSecondary: "text-gray-600",
      tabActiveBg: "bg-blue-600",
      tabActiveText: "text-white",
      tabInactiveBg: "bg-gray-200",
      tabInactiveText: "text-gray-700",
      tabHoverBg: "hover:bg-gray-300",
      tabHoverShadow: "hover:shadow-gray-400",
    },
  };

  const currentTheme = themeStyles[theme as keyof typeof themeStyles];

  const teamMembers: { [key: string]: TeamMember[] } = {
    "Our Advisors": [
      {
        name: "Prof. Agneyo Ganguly",
        role: "PI, TRACER",
        image: "/assets/images/Agneyo.jpg",
        social: {
          email: "agneyo@iitkgp.ac.in",
          profile: "https://www.iitkgp.ac.in/department/BT/faculty/bt-agneyo",
        },
      },
      {
        name: "Prof. Vinay Patel",
        role: "Faculty Advisor",
        image: "/assets/images/Vinay.png",
        social: {
          linkedin: "https://www.linkedin.com/in/vinaypatel2482",
          email: "vinaypatel@bt.iitkgp.ac.in",
          profile:
            "https://www.iitkgp.ac.in/department/BT/faculty/bt-vinaypatel",
        },
      },
      {
        name: "Prof. Ritesh Ghosh",
        role: "Faculty Advisor",
        image: "/assets/images/Ritesh.png",
        social: {
          linkedin: "https://www.linkedin.com/in/ritesh-ghosh-7b96523a",
          email: "ritesh.ghosh@bt.iitkgp.ac.in",
          profile:
            "https://www.iitkgp.ac.in/department/BT/faculty/bt-ritesh.ghosh",
        },
      },
      {
        name: "Prof. Mainak Bose",
        role: "Faculty Advisor",
        image: "/assets/images/Mainak.jpeg",
        social: {
          linkedin: "https://www.linkedin.com/in/mainak-bose-938a48276",
          email: "mainak29@iitkgp.ac.in",
          profile: "https://www.iitkgp.ac.in/department/BT/faculty/bt-mainak29",
        },
      },
    ],
    "Core Research Team": [
      {
        name: "Jishnu Manglam",
        role: "Team Lead",
        image: "/assets/images/Jishnu.jpeg",
        bio: "Leading the TRACER project with expertise in synthetic biology and cancer research, driving innovative solutions.",
        social: {
          linkedin:
            "https://www.linkedin.com/in/jishnumanglam?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADGi6bQBFhMtyac2Err-8Jq8JjUbqx04JO0&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B7NrKvtQjQjSZ%2BCOYAxoRmQ%3D%3D",
          email: "jishnu.manglam@gmail.com",
        },
      },
      {
        name: "Kairav Barua",
        role: "Research Lead",
        image: "/assets/images/Kairav.jpeg",
        bio: "Leading research efforts for TRACER, specializing in biomarker detection and therapeutic delivery systems.",
        social: {
          linkedin:
            "https://www.linkedin.com/in/kairav-barua-9332b8283?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAETr_jcBSqRWwhPSDCd3kl9GvCHQqHPxueY&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3Bl8ElbN1RQLCiep%2FEUnyYkw%3D%3D",
          email: "kairav.barua@gmail.com",
        },
      },
      {
        name: "Afeerah Naseem",
        role: "Senior Member",
        image: "/assets/images/Afeerah.jpg",
        bio: "Senior member contributing to TRACER with expertise in modeling cellular interactions and drug response predictions.",
        social: {
          linkedin:
            "https://www.linkedin.com/in/afeerah-naseem?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAEGcYr4B_VYlIXF7QwqFHw5BNgaU8nkjh3E&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B1%2FhrXdCfRZmbI25MDyhT1w%3D%3D",
          email: "afeerahnaseem@gmail.com",
        },
      },
      {
        name: "Snehansh Sen",
        role: "Senior Member",
        image: "/assets/images/Snehansh.jpeg",
        bio: "Senior member contributing to TRACER with research in biological characterization and molecular biology applications.",
        social: {
          linkedin:
            "https://www.linkedin.com/in/snehansh-sen-3961a4265?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAED9YyIBx0coD6LmJcToOvMuVcr4ZFU-aMY&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BqwXv8Rz4TaeMd3xTZ%2FHtsQ%3D%3D",
          email: "sensnehansh20@gmail.com",
        },
      },
      {
        name: "Ayush Munshi",
        role: "Core Member",
        image: "/assets/images/Ayush.jpg",
        bio: "Core member focusing on innovative materials and additive manufacturing techniques for TRACER’s therapeutic advancements.",
        social: {
          linkedin: "https://www.linkedin.com/in/ayush-munshi-a7181a301/",
          email: "ayushmunshi78@gmail.com",
        },
      },
      {
        name: "Akshara Sankranthi",
        role: "Core Member",
        image: "/assets/images/Akshara.jpg",
        bio: "Core member contributing expertise in materials science to support TRACER’s research objectives.",
        social: {
          linkedin: "https://www.linkedin.com/in/akshara-sankranthi-796243307/",
          email: "aksharasankranthi@kgpian.iitkgp.ac.in",
        },
      },
      {
        name: "Bhanvi Kumar",
        role: "Core Member",
        image: "/assets/images/Bhanvi.jpeg",
        bio: "Core member engaged in developing sustainable solutions and graphene-based materials for TRACER.",
        social: {
          linkedin:
            "https://www.linkedin.com/in/bhanvi-kumar-575297303?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAE12U2kBTELPbmA8crw7Qyhp1ow8RpiDTM8&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BnXnhxKtVTwifLxu1xMHvSg%3D%3D",
          email: "kumarbhanvi@gmail.com",
        },
      },
      {
        name: "Krishna Kant",
        role: "Core Member",
        image: "/assets/images/Krishna.jpg",
        bio: "Core member applying electrical and optical property research to enhance TRACER’s diagnostic tools.",
        social: {
          linkedin: "https://www.linkedin.com/in/krishna-kant-86164a240/",
          email: "Kant4285@gmail.com",
        },
      },
      {
        name: "Shreya Mohanty",
        role: "Core Member",
        image: "/assets/images/Shreya.jpg",
        bio: "Core member contributing to TRACER with insights into antimicrobial studies and molecular biology.",
        social: {
          linkedin: "https://www.linkedin.com/in/shreya-mohanty-b3b8a4297/",
          email: "shreya.mohanty0805@kgpian.iitkgp.ac.in",
        },
      },
    ],
    "Web Development Team": [
      {
        name: "Jitendra Bhati",
        role: "Lead Developer",
        image: "/assets/images/Jitendra.jpeg",
        bio: "Lead Developer overseeing the development, design and maintenance of the TRACER website with a proper functionalities.",
        social: {
          linkedin:
            "https://www.linkedin.com/in/jitendra-bhati123iitkgp?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAD5ZtggBw-l6NNzhkD6HQLRAeYQlZPNTOV0&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3ByGmXULXtQEy6V8z8ek8tmA%3D%3D",
          email: "bhatijitendra2022@gmail.com",
        },
      },
      {
        name: "Rohan",
        role: "Lead Developer",
        image: "/assets/images/Rohan.jpeg",
        bio: "Lead Developer contributing to the TRACER website’s integration with Bioengene.",
        social: {
          linkedin:
            "https://www.linkedin.com/in/rohan2311?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAD2vlxUBKYJblXc9HsX87kW7MloZnzxq4bo&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BS6c%2B6so8S8uCSio4i48xpA%3D%3D",
          email: "rohankumarpandey234@gmail.com",
        },
      },
    ],
    "Sponsorship & Public Relations Team": [
      {
        name: "Bhumika Marmat",
        role: "Sponsorship Lead",
        image: "/assets/images/Bhumika.jpeg",
        bio: "Leading sponsorship efforts and outreach initiatives to promote TRACER’s mission.",
        social: {
          linkedin:
            "https://www.linkedin.com/in/bhumikamarmat?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADFh_qYB5lQTEcA86RPo0FJ3-ZKOIpX9ldA&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BLa59MDU2RrazTqTS7D%2BY9w%3D%3D",
          email: "bhumikamarmat@kgpian.iitkgp.ac.in",
        },
      },
      {
        name: "Vihar Davuluri",
        role: "Sponsorship Lead",
        image: "/assets/images/Vihar.jpeg",
        bio: "Driving sponsorship strategies and outreach campaigns to support TRACER’s goals.",
        social: {
          linkedin:
            "https://www.linkedin.com/in/vihar-davuluri-40254326a?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAEHudoIBJiMXn5GckMX3xf5u92HcHkpjukY&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BHjvwiEboQUKbhjThpmawOw%3D%3D",
          email: "vihardavuluri@gmail.com",
        },
      },
      {
        name: "Shreya Mohanty",
        role: "Sponsorship Lead",
        image: "/assets/images/Shreya.jpg",
        bio: "Handling the pitching and proper onboarding of partners to support Tracer",
        social: {
          linkedin: "https://www.linkedin.com/in/shreya-mohanty-b3b8a4297/",
          email: "everything.ineed05@gmail.com",
        },
      },
    ],
  };

  const [selectedTeam, setSelectedTeam] = useState(Object.keys(teamMembers)[0]);

  return (
    <div
      className={`min-h-screen ${currentTheme.sectionBg} pt-24 pb-16 font-inter transition-colors duration-500`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold ${currentTheme.textPrimary} mb-4`}
          >
            Meet Our Team
          </h1>
          <p
            className={`text-lg sm:text-xl ${currentTheme.textSecondary} max-w-3xl mx-auto`}
          >
            Dedicated researchers, sponsors, and developers working together to
            revolutionize cancer treatment through the TRACER project.
          </p>
        </motion.div>

        {/* Team Segregation Tabs */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-12">
          {Object.keys(teamMembers).map((team) => (
            <button
              key={team}
              onClick={() => setSelectedTeam(team)}
              className={`px-4 py-2 rounded-full text-sm sm:text-base font-semibold w-full sm:w-auto ${
                selectedTeam === team
                  ? `${currentTheme.tabActiveBg} ${currentTheme.tabActiveText}`
                  : `${currentTheme.tabInactiveBg} ${currentTheme.tabInactiveText} ${currentTheme.tabHoverBg}`
              } transition-colors shadow-none ${currentTheme.tabHoverShadow}`}
            >
              {team}
            </button>
          ))}
        </div>

        {/* Team Members Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers[selectedTeam].map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Team2;
