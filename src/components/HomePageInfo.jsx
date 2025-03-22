import React from "react";
import { DetailingHomePage, slideData } from "../assets/asset.js";
import { Carousel } from "./Carousel";

const HomePageInfo = () => {
  return (
    <div className="flex flex-col lg:flex-row md:items-center gap-6 sm:gap-8 md:gap-10 max-w-full mx-auto p-4 sm:p-6 md:p-8 flex-custom">
      {/* Text Section (Takes Remaining Width) */}
      <div className="flex-1 flex flex-col text-center md:text-left px-4 sm:px-6 md:px-8 py-6 sm:py-8 text-custom-center text-custom-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
          {DetailingHomePage.title}
        </h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-primary leading-relaxed font-medium">
          {DetailingHomePage.description}
        </p>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-primary font-normal">
          {DetailingHomePage.subDescription}
        </p>
      </div>

      {/* Carousel Section (Responsive Width) */}
      <div className="w-full sm:w-[350px] lg:w-[800px] flex items-center justify-center rounded-xl mb-5 p-4 sm:p-6  mx-auto md:mx-0 mx-custom-auto mx-custom-0">
        <div className="relative overflow-hidden w-full h-full py-15 sm:py-16 md:py-20">
          <Carousel slides={slideData} />
        </div>
      </div>
    </div>
  );
};

export default HomePageInfo;
