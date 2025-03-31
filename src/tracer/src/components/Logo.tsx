import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

interface LogoProps {
  variant?: "default" | "light" | "dark";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  onClick?: () => void;
  scrollY?: number;
}

const Logo: React.FC<LogoProps> = ({
  variant = "default",
  size = "md",
  animated = true,
  onClick,
  scrollY = 0,
}) => {
  const { theme } = useTheme();

  // Responsive size classes for different screen sizes
  const sizeClasses = {
    sm: "w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10",
    md: "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14",
    lg: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20",
  };

  // Determine logo source based on scroll position
  const tracerLogoSrc =
    scrollY <= 0 ? "/assets/images/TracerRed.png" : "/assets/images/Tracer.png";

  // Determine text color based on scroll position and theme
  const getTextColor = () => {
    if (scrollY <= 0) {
      return "text-black"; // Black text at the top for white navbar
    } else {
      return theme === "dark" ? "text-white" : "text-gray-900"; // White in dark theme, gray in light theme when scrolled
    }
  };

  return (
    <div
      className="flex items-center gap-2 sm:gap-3 cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        className={`relative ${sizeClasses[size]}`}
        whileHover={
          animated
            ? {
                rotate: 360,
                transition: { duration: 1.5, ease: "easeInOut" },
              }
            : {}
        }
      >
        <img
          src={tracerLogoSrc}
          alt="TRACER Logo"
          className="w-full h-full object-contain transition-opacity duration-300 ease-in-out"
        />
        <motion.div
          className="absolute inset-0 bg-blue-500/10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
      <div className={`font-bold ${getTextColor()}`}>
        <motion.span
          className="block text-lg sm:text-xl tracking-wide"
          whileHover={animated ? { y: -2 } : {}}
        >
          TRACER
        </motion.span>
      </div>
    </div>
  );
};

export default Logo;
