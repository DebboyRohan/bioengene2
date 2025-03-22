import React from "react";
import HomePageHeroSection from "../components/HomePageHeroSection";
import NewsSectionHomePage from "../components/NewsSectionHomePage";
import HomePageInfo from "../components/HomePageInfo";
import Contact from "../components/Contact";
import Tracer from "../components/Tracer";
const Home = () => {
  return (
    <div>
      <HomePageHeroSection />
      <NewsSectionHomePage />
      <HomePageInfo />
      <Tracer />
      <Contact />
    </div>
  );
};

export default Home;
