import React from "react";
import HomePageHeroSection from "../components/HomePageHeroSection";
import NewsSectionHomePage from "../components/NewsSectionHomePage";
import HomePageInfo from "../components/HomePageInfo";
import Contact from "../components/Contact";
import About from "./About";
import { Carousel } from "../components/Carousel"; // Import the Carousel component

const Home = () => {
  return (
    <div>
      <HomePageHeroSection />
      <HomePageInfo />
      {/* Add Gallery Carousel Section */}
      {/* <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center mb-6 text-primary">
          Our Gallery
        </h2>
        <Carousel type="gallery" />
      </section> */}
      {/* <NewsSectionHomePage /> */}
      <About />
      <Contact />
    </div>
  );
};

export default Home;
