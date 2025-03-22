import React from "react";
import { HeroSectionInfoHomePage } from "../assets/asset.js";

const HomePageHeroSection = () => {
  return (
    <div className="relative bg-white pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 xl:pt-60 xl:pb-48 2xl:pb-56">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          className="object-cover w-full h-full opacity-50 md:opacity-90 scale-105 sm:scale-100"
          src={HeroSectionInfoHomePage.image}
          alt="BioEnGene Hero Background"
        />
      </div>

      {/* Moto at Top Center, Moved Lower */}
      <div className="absolute top-8 left-0 right-0 z-10 flex justify-center">
        <span className="inline-block bg-gradient-to-t from-[var(--color-accent)] to-[var(--color-elevated)] text-sm sm:text-base md:text-lg text-white hover-text-glow font-medium shadow-2xl rounded-3xl px-3 py-1 sm:px-8 sm:py-2">
          {HeroSectionInfoHomePage.moto}
        </span>
      </div>

      {/* Content, All Text Centered */}
      <div className="relative z-10 pt-2 sm:pt-3 md:pt-0">
        <div className="px-4 sm:px-6 md:px-0 lg:px-0 mx-auto md:mx-0 max-w-full mt-10 md:mt-30">
          <div className="w-full sm:w-11/12 md:w-full lg:w-full mx-auto md:mx-0 md:mt-0 text-center md:text-right">
            <h1 className="font-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary leading-tight md:pr-10 ">
              <span className="text-primary">Bio</span>
              <span className="text-accent">EnGene</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-800 font-medium tracking-tight md:pl-[40%] md:pr-10 ">
              {HeroSectionInfoHomePage.descprition}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageHeroSection;
