import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Microscope, BarChart, Handshake } from 'lucide-react'; // Import Lucide icons
import { useTheme } from '../context/ThemeContext'; // Adjust the path based on your project structure

const Sponsors1: React.FC = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();

    // Define theme-specific styles to match Home1.tsx for dark theme, replacing blue with neonRed
    const themeStyles = {
        dark: {
            sectionBg: 'bg-gradient-to-b from-black to-[#2A0000]', // Match Home1 dark background
            textPrimary: 'text-white', // Match Home1 primary text
            textSecondary: 'text-gray-400', // Match Home1 secondary text
            cardBg: 'bg-black/50', // Match Home1 card background
            cardBorder: 'border-gray-700', // Match Home1 border
            cardHoverShadow: 'hover:shadow-neonRed/50', // Match Home1 neon shadow
            iconColor: 'text-neonRed', // Match Home1 neon accent
            buttonBg: 'bg-neonRed', // Changed from bg-blue-600 to bg-neonRed
            buttonHoverBg: 'hover:bg-neonRed/80', // Changed from hover:bg-blue-700 to a slightly darker neonRed
            buttonText: 'text-white',
        },
        light: {
            sectionBg: 'bg-gray-50',
            textPrimary: 'text-gray-900',
            textSecondary: 'text-gray-600',
            cardBg: 'bg-white',
            cardBorder: 'border-gray-200',
            cardHoverShadow: 'hover:shadow-gray-400',
            iconColor: 'text-blue-600', // Light theme remains unchanged
            buttonBg: 'bg-blue-600', // Light theme remains unchanged
            buttonHoverBg: 'hover:bg-blue-700',
            buttonText: 'text-white',
        },
    };

    const currentTheme = themeStyles[theme as keyof typeof themeStyles];

    const reasons = [
        {
            title: 'Support Cutting-Edge Research',
            description: 'Your sponsorship helps fund groundbreaking research in cancer treatment, leading to innovative solutions and better patient outcomes.',
            icon: <Microscope className={`w-16 h-16 ${currentTheme.iconColor}`} />, // Replaced 🔬 with Microscope icon
        },
        {
            title: 'Enhance Your Brand Visibility',
            description: 'Partnering with us provides your brand with significant exposure in the medical and scientific communities, highlighting your dedication to impactful social contributions.',
            icon: <BarChart className={`w-16 h-16 ${currentTheme.iconColor}`} />, // Replaced 📈 with BarChart icon
        },
        {
            title: 'Make a Lasting Impact',
            description: 'Your support is crucial in our mission to fight cancer. By sponsoring us, you help empower the next generation of researchers and innovators at IIT Kharagpur to make a real difference.',
            icon: <Handshake className={`w-16 h-16 ${currentTheme.iconColor}`} />, // Replaced 🤝 with Handshake icon
        },
    ];

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
                        Why Sponsor Us?
                    </h1>
                    <p className={`text-xl ${currentTheme.textSecondary} max-w-3xl mx-auto`}>
                        Discover the benefits of sponsoring our mission to revolutionize cancer treatment. Here are three compelling reasons to join us.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={`${currentTheme.cardBg} rounded-xl p-8 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl border ${currentTheme.cardBorder} ${currentTheme.cardHoverShadow}`}
                        >
                            <div className="mb-4 flex justify-center">{reason.icon}</div>
                            <h3 className={`text-2xl font-bold ${currentTheme.textPrimary} mb-4 text-center`}>{reason.title}</h3>
                            <p className={`${currentTheme.textSecondary} text-center`}>{reason.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <h2 className={`text-4xl font-bold ${currentTheme.textPrimary} mb-4`}>
                        Become a Sponsor
                    </h2>
                    <p className={`${currentTheme.textSecondary} mb-8 max-w-2xl mx-auto`}>
                        Join us in our mission to revolutionize cancer treatment. Your support can make a difference in advancing medical research and saving lives.
                    </p>
                    <button
                        onClick={() => navigate('/contact')}
                        className={`${currentTheme.buttonBg} ${currentTheme.buttonHoverBg} ${currentTheme.buttonText} px-6 py-3 rounded-full transition-colors`}
                    >
                        Contact Us
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Sponsors1;