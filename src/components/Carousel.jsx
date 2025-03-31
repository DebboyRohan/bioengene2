"use client";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { biotechdept } from "../assets/asset.js";
import { useNavigate } from "react-router-dom";
import gal1 from "../assets/images/gallery/gal1.jpg";
import gal2 from "../assets/images/gallery/gal2.jpg";
import gal3 from "../assets/images/gallery/gal3.jpg";

// // Import achievement images
// import achievement1 from "../assets/achievements/achievement1.jpg";
// import achievement2 from "../assets/achievements/achievement2.jpg";
// import achievement3 from "../assets/achievements/achievement3.jpg";


export function Carousel({
  type,
  autoSlide = false,
  autoSlideInterval = 3000,
}) {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const gallerySlides = [
    { src: gal1, title: "Gallery Image 1" },
    { src: gal2, title: "Gallery Image 2" },
    { src: gal3, title: "Gallery Image 3" },
  ];

  useEffect(() => {
    if (type === "gallery") {
      setSlides(gallerySlides);
    } else {
      setSlides([]); // Fallback for invalid type
    }
  }, [type]);

  // Fetch slides from the backend
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please log in to view this content.");
          navigate("/login");
          return;
        }

        const endpoint =
          type === "gallery" ? "/api/gallery" : "/api/achievement";
        const response = await axios.get(`https://172.16.3.23:5000${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        const formattedSlides = data.map((item) => ({
          src: `https://172.16.3.23:5000${item.image_url}`,
          title: item.title || `Untitled ${type}`,
        }));

        setSlides(formattedSlides);
      } catch (err) {
        if (err.response?.status === 401) {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/login");
        } else {
          setError(
            err.response?.data?.message || `Failed to fetch ${type} data`
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, [type, navigate]);

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
    event.currentTarget.src = biotechdept; // Fallback image
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-500">Loading {type}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-500">No {type} items available.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[70vh] max-w-screen-xl mx-auto overflow-hidden">
      {/* Slides Container */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full relative">
            <img
              src={slide.image_url}
              alt={slide.title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0  flex items-end justify-center">
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
