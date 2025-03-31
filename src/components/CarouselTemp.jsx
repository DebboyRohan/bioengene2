"use client";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useEffect } from "react";

// Import gallery images
import gal1 from "../assets/images/gallery/gal1.jpg";
import gal2 from "../assets/images/gallery/gal2.jpg";
import gal3 from "../assets/images/gallery/gal3.jpg";
import { biotechdept } from "../assets/asset";

export function CarouselTemp({
  type,
  autoSlide = false,
  autoSlideInterval = 3000,
}) {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState([]);

  // Define static slides for gallery and achievements
  const gallerySlides = [
    { src: biotechdept, title: "Department of Bioscience and Biotechnology" },
    { src: gal1, title: "IGEM'15 : KGP" },
    { src: gal2, title: "IGEM'15 : Biotech" },
    { src: gal3, title: "IGEM Area" },
  ];

  // Set slides based on the type prop
  useEffect(() => {
    if (type === "gallery") {
      setSlides(gallerySlides);
    } else {
      setSlides([]); // Fallback for invalid type
    }
  }, [type]);

  // Auto-slide functionality
  useEffect(() => {
    if (!autoSlide || slides.length === 0) return;

    const slideInterval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, autoSlideInterval);

    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, slides.length]);

  const handlePreviousClick = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextClick = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handleImageError = (event) => {
    console.log("Image failed to load:", event.currentTarget.src);
    event.currentTarget.src = biotechdept; // Fallback image
  };

  if (slides.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-500">No {type} items available.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[70vh] max-w-screen-xl mx-auto overflow-hidden rounded-4xl">
      {/* Slides Container */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out "
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full relative">
            <img
              src={slide.src} // Fixed: Use slide.src instead of slide.image_url
              alt={slide.title}
              className="w-full h-full object-cover"
              onError={handleImageError}
              onLoad={() => console.log("Image loaded:", slide.src)} // Debug log
            />
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black opacity-30 flex items-end justify-center">
              <h2 className="text-white text-xl md:text-3xl font-semibold p-4">
                {slide.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePreviousClick}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-black p-3 rounded-full transition-opacity duration-300"
        aria-label="Previous slide"
      >
        <IconArrowNarrowLeft size={24} />
      </button>
      <button
        onClick={handleNextClick}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-black p-3 rounded-full transition-opacity duration-300"
        aria-label="Next slide"
      >
        <IconArrowNarrowRight size={24} />
      </button>

      {/* Dots for Navigation (Optional) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-white" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
