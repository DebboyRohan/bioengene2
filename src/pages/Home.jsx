import React from "react";
import HomePageHeroSection from "../components/HomePageHeroSection";
import NewsSectionHomePage from "../components/NewsSectionHomePage";
import HomePageInfo from "../components/HomePageInfo";
import Contact from "../components/Contact";
import About from "./About";
const Home = () => {
  return (
    <div>
      <HomePageHeroSection />
      <NewsSectionHomePage />
      <HomePageInfo />
      <About />
      <Contact />
    </div>
  );
};

export default Home;
