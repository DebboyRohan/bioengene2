import { useState, useEffect, useRef } from "react";
import { NewsHomePage } from "../assets/asset.js";

function NewsSectionHomePage() {
  const tickerRef = useRef(null);
  const [newsItems, setNewsItems] = useState(NewsHomePage);

  useEffect(() => {
    setNewsItems([...NewsHomePage]); // Ensures reactivity

    // Duplicate items for seamless looping if needed
    const ticker = tickerRef.current;
    if (ticker && ticker.scrollWidth <= ticker.clientWidth * 2) {
      setNewsItems([...NewsHomePage, ...NewsHomePage]);
    }
  }, []);

  return (
    <div className="relative overflow-hidden text-primary py-4 sm:py-5 md:py-6">
      {/* Ticker container */}
      <div className="relative w-full">
        <div
          ref={tickerRef}
          className="flex gap-4 sm:gap-6 md:gap-8 animate-scroll whitespace-nowrap"
        >
          {newsItems.map((news, index) => (
            <a
              key={index}
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-base sm:text-lg lg:text-xl font-medium hover:text-accent transition-all duration-500 ease-in-out px-3 py-2 sm:px-3 md:px-4 border rounded-full hover-text-fix hover:bg-[var(--color-elevated)] "
            >
              <span className="inline-block transition-all duration-300 ease-in-out group-hover:text-lg group-hover:md:text-xl group-hover:lg:text-2xl group-hover:scale-102">
                {news.info}
              </span>
            </a>
          ))}
          {newsItems.map((news, index) => (
            <a
              key={index}
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-base sm:text-lg lg:text-xl font-medium hover:text-accent transition-all duration-500 ease-in-out px-3 py-2 sm:px-3 md:px-4 border rounded-full hover-text-fix hover:bg-[var(--color-elevated)]"
            >
              <span className="inline-block transition-all duration-300 ease-in-out group-hover:text-lg group-hover:md:text-xl group-hover:lg:text-2xl group-hover:scale-102">
                {news.info}
              </span>
            </a>
          ))}
        </div>
        {/* Solid covers (20% each side of the screen) */}
        <div className="absolute top-0 left-0 w-[20%] h-full md:bg-white pointer-events-none z-20"></div>
        <div className="absolute top-0 right-0 w-[20%] h-full md:bg-white pointer-events-none z-20"></div>
        {/* Gradient fade effect just inside the covers */}
        <div className="absolute top-0 left-[20%] w-[10%] h-full md:bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-[20%] w-[10%] h-full md:bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  );
}

export default NewsSectionHomePage;
