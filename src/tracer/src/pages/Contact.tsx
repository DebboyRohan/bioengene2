import React from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Users } from 'lucide-react';
import { useTheme } from '../context/ThemeContext'; // Adjust the path based on your project structure

const Contact1: React.FC = () => {
  const { theme } = useTheme();

  // Define theme-specific styles to match Home1.tsx for dark theme, replacing blue with neonRed
  const themeStyles = {
    dark: {
      sectionBg: 'bg-gradient-to-b from-black to-[#2A0000]', // Match Home1 dark background
      textPrimary: 'text-white', // Match Home1 primary text
      textSecondary: 'text-gray-400', // Match Home1 secondary text
      cardBg: 'bg-black/50', // Match Home1 card background
      cardBorder: 'border-gray-700', // Match Home1 border
      iconColor: 'text-neonRed', // Match Home1 neon accent
      linkHover: 'hover:text-neonRed', // Match Home1 accent for hover effects
    },
    light: {
      sectionBg: 'bg-gray-50',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      cardBg: 'bg-white',
      cardBorder: 'border-gray-200',
      iconColor: 'text-blue-600', // Light theme remains unchanged
      linkHover: 'hover:text-blue-600', // Light theme remains unchanged
    },
  };

  const currentTheme = themeStyles[theme as keyof typeof themeStyles];

  return (
    <div className={`min-h-screen ${currentTheme.sectionBg} pt-24 pb-16 font-inter transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className={`text-4xl md:text-5xl font-bold ${currentTheme.textPrimary} mb-4`}>
            Contact Us
          </h1>
          <p className={`text-xl ${currentTheme.textSecondary} max-w-3xl mx-auto mb-8`}>
            Get in touch to learn more about TRACER and explore collaboration opportunities.
          </p>
        </motion.div>

        <div className={`${currentTheme.cardBg} shadow-md rounded-lg p-8 border ${currentTheme.cardBorder}`}>
          <h2 className={`text-3xl font-bold ${currentTheme.textPrimary} mb-6 text-center`}>
            Our Contact Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Advisor: Prof. A Ganguly */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <User className={`w-12 h-12 ${currentTheme.iconColor} mb-4`} />
              <h3 className={`text-xl font-semibold ${currentTheme.textPrimary} mb-2`}>
                Advisor: Prof. A Ganguly
              </h3>
              <a
                href="mailto:aganguly@bt.iitkgp.ac.in"
                className={`flex items-center gap-2 ${currentTheme.textSecondary} ${currentTheme.linkHover} transition-colors`}
              >
                <Mail className="w-5 h-5" />
                aganguly@bt.iitkgp.ac.in
              </a>
            </motion.div>

            {/* Project Lead: Jishnu Mangalam */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <User className={`w-12 h-12 ${currentTheme.iconColor} mb-4`} />
              <h3 className={`text-xl font-semibold ${currentTheme.textPrimary} mb-2`}>
                Project Lead: Jishnu Mangalam
              </h3>
              <a
                href="mailto:jishnu.manglam@gmail.com"
                className={`flex items-center gap-2 ${currentTheme.textSecondary} ${currentTheme.linkHover} transition-colors`}
              >
                <Mail className="w-5 h-5" />
                jishnu.manglam@gmail.com
              </a>
            </motion.div>

            {/* Sponsorship Leads: Bhumika Marmat and Vihar Davuluri */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <Users className={`w-12 h-12 ${currentTheme.iconColor} mb-4`} />
              <h3 className={`text-xl font-semibold ${currentTheme.textPrimary} mb-2`}>
                Sponsorship Leads
              </h3>
              <p className={`text-lg ${currentTheme.textPrimary}`}>
                Bhumika Marmat
              </p>
              <a
                href="mailto:bhumikamarmat@kgpian.iitkgp.ac.in"
                className={`flex items-center gap-2 ${currentTheme.textSecondary} ${currentTheme.linkHover} transition-colors mb-2`}
              >
                <Mail className="w-5 h-5" />
                bhumikamarmat@kgpian.iitkgp.ac.in
              </a>
              <p className={`text-lg ${currentTheme.textPrimary}`}>
                Vihar Davuluri
              </p>
              <a
                href="mailto:vihardavuluri@gmail.com"
                className={`flex items-center gap-2 ${currentTheme.textSecondary} ${currentTheme.linkHover} transition-colors`}
              >
                <Mail className="w-5 h-5" />
                vihardavuluri@gmail.com
              </a>
            </motion.div>
          </div>

          {/* Bioengineering Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-col items-center"
          >
            <h3 className={`text-xl font-semibold ${currentTheme.textPrimary} mb-2`}>
              Bioengineering Department
            </h3>
            <a
              href="mailto:bioeng@iitkgp.ac.in"
              className={`flex items-center gap-2 ${currentTheme.textSecondary} ${currentTheme.linkHover} transition-colors`}
            >
              <Mail className="w-5 h-5" />
              bioeng@iitkgp.ac.in
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact1;