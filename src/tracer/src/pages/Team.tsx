import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Linkedin, Mail, User } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string; // Keeping image prop for future use, but we'll ignore it
  bio: string;
  social: {
    linkedin?: string;
    email?: string;
  };
}

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:shadow-gray-400 max-w-xs mx-auto"
    >
      <div className="p-6 flex flex-col items-center">
        <div className="w-48 h-48 bg-gray-200 rounded-t-lg flex items-center justify-center mb-4">
          <User className="w-24 h-24 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{member.name}</h3>
        <p className="text-blue-600 mb-2 text-center">{member.role}</p>
        <p className="text-gray-700 mb-4 line-clamp-3 text-center">{member.bio}</p>
        <div className="flex gap-4 justify-center">
          {member.social.linkedin && (
            <a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          )}
          {member.social.email && (
            <a
              href={`mailto:${member.social.email}`}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Team: React.FC = () => {
  const teamMembers: { [key: string]: TeamMember[] } = {
    'Our Advisors': [
      {
        name: 'Prof. Agneyo Ganguly',
        role: 'Personal Investigator',
        image: '', // Placeholder image prop, ignored
        bio: 'Developing and maintaining the TRACER website with a focus on user experience and functioning.',
        social: {
          linkedin: 'https://www.linkedin.com/in/jitendra-bhati123iitkgp?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAD5ZtggBw-l6NNzhkD6HQLRAeYQlZPNTOV0&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3ByGmXULXtQEy6V8z8ek8tmA%3D%3D',
          email: 'bhatijitendra2022@gmail.com',
        },
      },
      {
        name: 'Rohan',
        role: 'Web Dev Member',
        image: '', // Placeholder image prop, ignored
        bio: 'Contributing to the TRACER website’s design and functionality enhancements.',
        social: {
          linkedin: 'https://www.linkedin.com/in/rohan2311?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAD2vlxUBKYJblXc9HsX87kW7MloZnzxq4bo&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BS6c%2B6so8S8uCSio4i48xpA%3D%3D',
          email: 'rohankumarpandey234@gmail.com',
        },
      },
      {
        name: 'Jishnu Manglam',
        role: 'Core Research Member',
        image: '', // Placeholder image prop, ignored
        bio: 'Leading the TRACER project with expertise in synthetic biology and cancer research, driving innovative solutions.',
        social: {
          linkedin: 'https://www.linkedin.com/in/jishnumanglam?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADGi6bQBFhMtyac2Err-8Jq8JjUbqx04JO0&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B7NrKvtQjQjSZ%2BCOYAxoRmQ%3D%3D',
          email: 'jishnu.manglam@gmail.com',
        },
      },
    ],
    'Core Research Team': [
      {
        name: 'Jishnu Manglam',
        role: 'Core Research Member',
        image: '', // Placeholder image prop, ignored
        bio: 'Leading the TRACER project with expertise in synthetic biology and cancer research, driving innovative solutions.',
        social: {
          linkedin: 'https://www.linkedin.com/in/jishnumanglam?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADGi6bQBFhMtyac2Err-8Jq8JjUbqx04JO0&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B7NrKvtQjQjSZ%2BCOYAxoRmQ%3D%3D',
          email: 'jishnu.manglam@gmail.com',
        },
      },
      {
        name: 'Kairav Barua',
        role: 'Core Research Member',
        image: '', // Placeholder image prop, ignored
        bio: 'Specializing in biomarker detection and therapeutic delivery systems, advancing TRACER’s diagnostic capabilities.',
        social: {
          linkedin: 'https://www.linkedin.com/in/kairav-barua-9332b8283?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAETr_jcBSqRWwhPSDCd3kl9GvCHQqHPxueY&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3Bl8ElbN1RQLCiep%2FEUnyYkw%3D%3D',
          email: 'kairav.barua@gmail.com',
        },
      },
      {
        name: 'Afeerah Naseem',
        role: 'Core Research Member',
        image: '', // Placeholder image prop, ignored
        bio: 'Expert in modeling cellular interactions and drug response predictions, enhancing TRACER’s computational framework.',
        social: {
          linkedin: 'https://www.linkedin.com/in/afeerah-naseem?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAEGcYr4B_VYlIXF7QwqFHw5BNgaU8nkjh3E&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B1%2FhrXdCfRZmbI25MDyhT1w%3D%3D',
          email: 'afeerahnaseem@gmail.com',
        },
      },
      {
        name: 'Snehansh Sen',
        role: 'Core Research Member',
        image: '', // Placeholder image prop, ignored
        bio: 'Contributing to TRACER with research in biological characterization and molecular biology applications.',
        social: {
          linkedin: 'https://www.linkedin.com/in/snehansh-sen-3961a4265?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAED9YyIBx0coD6LmJcToOvMuVcr4ZFU-aMY&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BqwXv8Rz4TaeMd3xTZ%2FHtsQ%3D%3D',
          email: 'sensnehansh20@gmail.com',
        },
      },
      {
        name: 'Ayush Munshi',
        role: 'Core Research Member',
        image: '', // Placeholder image prop, ignored
        bio: 'Focusing on innovative materials and additive manufacturing techniques for TRACER’s therapeutic advancements.',
        social: {
          linkedin: 'https://www.linkedin.com/in/ayush-munshi-a7181a301/',
          email: 'ayushmunshi78@gmail.com',
        },
      },
      {
        name: 'Akshara Sankranthi',
        role: 'Core Research Member',
        image: '', // Placeholder image prop, ignored
        bio: 'Contributing expertise in materials science to support TRACER’s research objectives.',
        social: {
          linkedin: 'https://www.linkedin.com/in/akshara-sankranthi-796243307/',
          email: 'aksharasankranthi@kgpian.iitkgp.ac.in',
        },
      },
      {
        name: 'Bhanvi Kumar',
        role: 'Core Research Member',
        image: '', // Placeholder image prop, ignored
        bio: 'Engaged in developing sustainable solutions and graphene-based materials for TRACER.',
        social: {
          linkedin: 'https://www.linkedin.com/in/bhanvi-kumar-575297303?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAE12U2kBTELPbmA8crw7Qyhp1ow8RpiDTM8&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BnXnhxKtVTwifLxu1xMHvSg%3D%3D',
          email: 'kumarbhanvi@gmail.com',
        },
      },
      {
        name: 'Krishna Kant',
        role: 'Core Research Member',
        image: '', // Placeholder image prop, ignored
        bio: 'Applying electrical and optical property research to enhance TRACER’s diagnostic tools.',
        social: {
          linkedin: 'https://www.linkedin.com/in/krishna-kant-86164a240/',
          email: 'Kant4285@gmail.com',
        },
      },
      {
        name: 'Shreya Mohanty',
        role: 'Core Research Member',
        image: '', // Placeholder image prop, ignored
        bio: 'Contributing to TRACER with insights into antimicrobial studies and molecular biology.',
        social: {
          linkedin: 'https://www.linkedin.com/in/shreya-mohanty-b3b8a4297/',
          email: 'everything.ineed05@gmail.com',
        },
      },
    ],
    'Sponsor & Outreach Team': [
      {
        name: 'Bhumika Marmat',
        role: 'Spons Lead',
        image: '', // Placeholder image prop, ignored
        bio: 'Leading sponsorship efforts and outreach initiatives to promote TRACER’s mission.',
        social: {
          linkedin: 'https://www.linkedin.com/in/bhumikamarmat?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADFh_qYB5lQTEcA86RPo0FJ3-ZKOIpX9ldA&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BLa59MDU2RrazTqTS7D%2BY9w%3D%3D',
          email: 'bhumikamarmat@kgpian.iitkgp.ac.in',
        },
      },
      {
        name: 'Vihar Davuluri',
        role: 'Spons Lead',
        image: '', // Placeholder image prop, ignored
        bio: 'Driving sponsorship strategies and outreach campaigns to support TRACER’s goals.',
        social: {
          linkedin: 'https://www.linkedin.com/in/vihar-davuluri-40254326a?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAEHudoIBJiMXn5GckMX3xf5u92HcHkpjukY&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BHjvwiEboQUKbhjThpmawOw%3D%3D',
          email: 'vihardavuluri@gmail.com',
        },
      },
    ],
    'Web Development Team': [
      {
        name: 'Jitendra Bhati',
        role: 'Full Stack Developer',
        image: '', // Placeholder image prop, ignored
        bio: 'Developing and maintaining the TRACER website with a focus on user experience and functioning.',
        social: {
          linkedin: 'https://www.linkedin.com/in/jitendra-bhati123iitkgp?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAD5ZtggBw-l6NNzhkD6HQLRAeYQlZPNTOV0&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3ByGmXULXtQEy6V8z8ek8tmA%3D%3D',
          email: 'bhatijitendra2022@gmail.com',
        },
      },
      {
        name: 'Rohan',
        role: 'Web Dev Member',
        image: '', // Placeholder image prop, ignored
        bio: 'Contributing to the TRACER website’s design and functionality enhancements.',
        social: {
          linkedin: 'https://www.linkedin.com/in/rohan2311?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAD2vlxUBKYJblXc9HsX87kW7MloZnzxq4bo&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BS6c%2B6so8S8uCSio4i48xpA%3D%3D',
          email: 'rohankumarpandey234@gmail.com',
        },
      },
    ],

  };

  const [selectedTeam, setSelectedTeam] = useState(Object.keys(teamMembers)[0]);

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dedicated researchers, sponsors, and developers working together to
            revolutionize cancer treatment through the TRACER project.
          </p>
        </motion.div>

        {/* Team Segregation Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {Object.keys(teamMembers).map((team) => (
            <button
              key={team}
              onClick={() => setSelectedTeam(team)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${selectedTeam === team
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors shadow-none hover:shadow-lg hover:shadow-gray-400`}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers[selectedTeam].map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;