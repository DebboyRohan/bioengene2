import React from "react";
import { DetailingHomePage, slideData } from "../assets/asset.js";
import { Carousel } from "./Carousel";
const HomePageInfo = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-[30px] max-w-full mx-auto p-4">
      {/* Text Section (Takes Remaining Width) */}
      <div className="flex-1 flex flex-col text-center md:text-left px-4 md:px-8 py-6 ">
        <h1 className="text-2xl md:text-4xl font-bold text-primary">
          {DetailingHomePage.title}
        </h1>
        <p className="mt-4 text-lg text-primary leading-relaxed font-medium">
          {DetailingHomePage.description}
        </p>
        <p className="font-normal">{DetailingHomePage.subDescription}</p>
      </div>
      {/* Carousel Section (Fixed Width) */}
      <div className="w-[400px] md:w-[600px] flex items-center justify-center rounded-xl p-6 mx-auto md:mx-0">
        <div className="relative overflow-hidden w-full h-full py-20">
          <Carousel slides={slideData} />
        </div>
      </div>
    </div>
  );
};

export default HomePageInfo;
