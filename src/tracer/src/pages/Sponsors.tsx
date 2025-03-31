import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Sponsors: React.FC = () => {
  const navigate = useNavigate();

  const reasons = [
    {
      title: 'Support Cutting-Edge Research',
      description: 'Your sponsorship helps fund groundbreaking research in cancer treatment, leading to innovative solutions and better patient outcomes.',
      icon: '🔬',
    },
    {
      title: 'Enhance Your Brand Visibility',
      description: 'Partnering with us provides your brand with significant exposure in the medical and scientific communities, showcasing your commitment to social responsibility.',
      icon: '📈',
    },
    {
      title: 'Make a Lasting Impact',
      description: 'Your support is crucial in our mission to fight cancer. By sponsoring us, you help empower the next generation of researchers and innovators at IIT Kharagpur to make a real difference.',
      icon: '🤝',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Sponsor Us?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
              className="bg-white rounded-xl p-8 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-6xl mb-4">{reason.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Become a Sponsor
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join us in our mission to revolutionize cancer treatment. Your support can make a difference in advancing medical research and saving lives.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full"
          >
            Contact Us
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Sponsors;