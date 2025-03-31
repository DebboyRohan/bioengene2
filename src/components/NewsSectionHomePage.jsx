import { useState, useEffect } from "react";
import { NewsHomePage } from "../assets/asset.js";
import { motion } from "framer-motion";

function NewsSectionHomePage() {
  const [newsItems, setNewsItems] = useState(NewsHomePage);

  useEffect(() => {
    setNewsItems([...NewsHomePage]);
  }, []);

  // Animation variants for the card
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 10px 20px rgba(0, 188, 114, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  // Animation variants for the "Read More" link
  const linkVariants = {
    initial: { x: 0, color: "#00bc72" },
    hover: {
      x: 5,
      color: "#00a060", // Slightly darker shade for hover
      transition: { duration: 0.3, ease: "easeOut" },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary text-center mb-10 sm:mb-12 md:mb-16"
        >
          Latest News
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {newsItems.map((news, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white border border-[#00bc72]/20 rounded-xl p-6 relative overflow-hidden"
            >
              {/* Decorative element */}
              <div className="absolute top-0 left-0 w-2 h-full bg-[#00bc72]/30" />

              {/* News content */}
              <h3 className="text-lg md:text-xl font-semibold text-primary mb-3 line-clamp-2">
                {news.info}
              </h3>

              {/* Date or source */}
              <p className="text-sm text-[#727272] mb-4">
                {news.date || `Source: ${news.source || "BioEnGene"}`}
              </p>

              {/* Read More link */}
              <div className="flex items-center justify-between">
                <motion.a
                  href={news.link || "#"} // Use news.link if available, otherwise "#"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={linkVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-[#00bc72] text-sm font-medium"
                >
                  Read More
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsSectionHomePage;
