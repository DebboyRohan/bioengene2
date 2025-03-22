import React from "react";
import { HeroSectionInfoHomePage } from "../assets/asset.js";

const HomePageHeroSection = () => {
  return (
    <div className="relative bg-white pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 xl:pt-60 xl:pb-48 2xl:pb-56">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          className="object-cover w-full h-full opacity-70 scale-105 sm:scale-100"
          src={HeroSectionInfoHomePage.image}
          alt="BioEnGene Hero Background"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 mx-auto max-w-7xl">
          <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto md:mx-0 text-center md:text-left">
            <h1 className="font-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary leading-tight">
              Welcome to Bio<span className="text-asset">EnGene</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-700 font-medium tracking-tight">
              {HeroSectionInfoHomePage.descprition}
            </p>
            <div className="mt-4 sm:mt-6">
              <span className="inline-block text-sm sm:text-base md:text-lg text-accent font-medium border border-primary rounded-xl px-2 py-1 sm:px-3 sm:py-2">
                {HeroSectionInfoHomePage.moto}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageHeroSection;
