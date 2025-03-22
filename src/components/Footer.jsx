import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

function Footer() {
  const handleClick = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50); // Small delay to ensure navigation happens first
  };

  return (
    <footer className="bg-gradient-to-t from-[#004746] to-[#0a5958] text-white py-12">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {/* Contact Section (Left) */}
          <motion.div
            variants={fadeInUp}
            className="flex-1 text-center md:text-left"
          >
            <h3 className="text-xl font-semibold text-accent mb-4 tracking-tight">
              Contact Us
            </h3>
            <p className="text-[#fff]/80 leading-relaxed">
              BioEnGene, Department of Biotechnology <br />
              Indian Institute of Technology <br />
              Kharagpur, India - 721302
            </p>
            <p className="text-[#fff]/90 mt-3">
              Email:{" "}
              <a
                href="mailto:bioengene.iitkgp@gmail.com"
                className="text-accent hover:underline transition-colors duration-300"
              >
                bioengene@iitkgp.ac.in
              </a>
            </p>
          </motion.div>

          {/* Logo (Center) */}
          <motion.div
            variants={fadeInUp}
            className="flex-1 text-center hidden md:block"
          >
            <NavLink
              to="/"
              onClick={handleClick}
              className="text-3xl md:text-4xl font-extrabold 
                bg-gradient-to-r from-[#00bc72] to-[#fff] bg-clip-text text-transparent 
                hover:scale-105 transition-transform duration-300"
            >
              BioEnGene
            </NavLink>
          </motion.div>

          {/* Social Connect (Right) */}
          <motion.div
            variants={fadeInUp}
            className="flex-1 text-center md:text-right"
          >
            <h3 className="text-xl font-semibold text:center md:text-end text-accent mb-4 tracking-tight">
              Social Connect
            </h3>
            <div className="flex justify-center md:justify-end space-x-6">
              <motion.a
                href="https://www.facebook.com/bioengene.iitkgp"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="transition-transform duration-300"
              >
                <img
                  src="https://img.icons8.com/ios-filled/48/000000/facebook.png"
                  className="w-10 h-10"
                  alt="Facebook"
                />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/bioengene.iitkgp/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -10 }}
                className="transition-transform duration-300"
              >
                <img
                  src="https://img.icons8.com/ios-filled/48/000000/instagram-new.png"
                  className="w-10 h-10"
                  alt="Instagram"
                />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/bioengene-iitkgp"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="transition-transform duration-300"
              >
                <img
                  src="https://img.icons8.com/ios-filled/48/000000/linkedin.png"
                  className="w-10 h-10"
                  alt="LinkedIn"
                />
              </motion.a>
              <motion.a
                href="https://www.youtube.com/@bioengene-iitkgp" // Replace with actual YouTube URL
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="transition-transform duration-300"
              >
                <img
                  src="https://img.icons8.com/ios-filled/48/000000/youtube-play.png"
                  className="w-10 h-10"
                  alt="YouTube"
                />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="border-t border-[#00bc72]/30 my-8"
        />

        {/* Copyright */}
        <motion.div
          variants={fadeInUp}
          className="text-center text-[#fff]/70 text-sm"
        >
          <p>© 2025 BioEnGene, IIT Kharagpur | All rights reserved</p>
        </motion.div>
      </div>

      {/* Subtle Transition Element */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent pointer-events-none" />
    </footer>
  );
}

export default Footer;
