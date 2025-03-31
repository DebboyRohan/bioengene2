import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
// import RotatingLogo from './RotatingLogo';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* <RotatingLogo size="w-8 h-8" /> */}
              <h3 className="text-xl font-semibold">TRACER</h3>
            </div>
            <p className="text-gray-400">
              Revolutionizing cancer relapse detection and therapy through synthetic biology.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">
              IIT Kharagpur<br />
              West Bengal, India 721302<br />
              Email: bioengene@iitkgp.ac.in
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/company/bioengene/" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="mailto:bioengene@iitkgp.ac.in"
                className="text-gray-400 hover:text-white transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>
          {/* Logos */}
          <div>
            <div className="flex gap-4">
              <img
                src="https://via.placeholder.com/64" // Replace with actual sponsor logo
                alt="Tracer logo 1"
                className="w-16 h-16 object-contain"
              />
              <img
                src="https://via.placeholder.com/64" // Replace with actual sponsor logo
                alt="Igem or Bioengen logo 2"
                className="w-16 h-16 object-contain"
              />
              <img
                src="https://via.placeholder.com/64" // Replace with actual sponsor logo
                alt="IIt kgp logo 3"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} TRACER - iGEM IIT Kharagpur. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 