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
    <div className="overflow-hidden text-primary py-4 sm:py-5 md:py-6">
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
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium hover:text-accent transition-all duration-300 px-2 sm:px-3 md:px-4"
            >
              {news.info}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsSectionHomePage;
