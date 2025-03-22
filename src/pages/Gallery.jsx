import { motion } from "framer-motion";
import { biotechdept, galleryImages } from "../assets/asset.js"; // Assuming this is your imported image
import { useState } from "react";
// Dummy gallery data (using biotechdept as a placeholder)

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
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: { scale: 1.05, boxShadow: "0 15px 40px rgba(0, 188, 114, 0.25)" },
};

const overlayVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="bg-white text-[#004746] overflow-hidden">
      {/* Unique Hero Section */}
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
            Our Gallery
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
            A visual journey through BioEnGene’s innovative work and vibrant
            moments.
          </motion.p>
          {/* Animated Frame Effect */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 relative flex justify-center"
          >
            <motion.div
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-32 h-32 md:w-40 md:h-40 bg-[#00bc72]/10 rounded-lg border-4 border-[#00bc72]/30 
                transform rotate-45 absolute"
            />
            <motion.img
              src={biotechdept}
              alt="Gallery Preview"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.5 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg z-10"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="py-20 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold text-primary mb-12 tracking-tight text-center"
        >
          Explore Our Moments
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              onClick={() => setSelectedImage(image)}
              className="relative bg-white rounded-xl shadow-md border border-[#004746]/10 
                hover:border-[#00bc72]/30 transition-all duration-300 cursor-pointer overflow-hidden 
                group"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 object-cover transition-transform duration-300 
                  group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#004746]/50 to-transparent 
                opacity-0 group-hover:opacity-70 transition-opacity duration-300"
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-4 text-white 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <p className="text-sm font-medium">{image.caption}</p>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6 }}
                className="absolute bottom-0 left-0 w-full h-1 bg-[#00bc72]/50"
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Image Overlay */}
      {selectedImage && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto 
              p-6 relative border border-[#00bc72]/20"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            style={{ fontFamily: "var(--font-primary)" }}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-[#727272] hover:text-accent 
                transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-64 md:h-80 object-cover rounded-xl mt-4 mb-4"
            />
            <p className="text-[#727272] text-lg text-center mt-2">
              {selectedImage.caption}
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Gallery;
