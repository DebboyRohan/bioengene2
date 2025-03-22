import React from "react";
import { HeroSectionInfoHomePage } from "../assets/asset.js";
const HomePageHeroSection = () => {
  return (
    <div className="relative pt-48 pb-12 bg-white xl:pt-60 sm:pb-16 lg:pb-32 xl:pb-48 2xl:pb-56">
      <div className="absolute inset-0">
        <img
          className="object-cover w-full h-full opacity-70"
          src={HeroSectionInfoHomePage.image}
          alt=""
        />
      </div>

      <div className="relative">
        <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
          <div className="w-full lg:w-2/3 xl:w-1/2">
            <h1 className="font-primary text-7xl font-bold tracking-tight text-primary ">
              Welcome to Bio<span className="text-asset">EnGene</span>
            </h1>
            <p className="mt-6 tracking-tighter text-gray-700 font-medium">
              {HeroSectionInfoHomePage.descprition}
            </p>
            <div className="mt-3">
              <span className="mt-6 tracking-tighter text-accent font-medium border-primary border-1 rounded-xl px-2 py-1">
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
