import { useState, useEffect, useRef } from "react";
import { NewsHomePage } from "../assets/asset.js";

function NewsSectionHomePage() {
  const tickerRef = useRef(null);
  const [newsItems, setNewsItems] = useState(NewsHomePage);

  useEffect(() => {
    setNewsItems([...NewsHomePage]); // Ensures reactivity
  }, []);

  return (
    <div className="overflow-hidden text-primary py-5">
      <div className="relative w-full">
        <div
          ref={tickerRef}
          className="flex gap-8 animate-scroll whitespace-nowrap"
        >
          {newsItems.map((news, index) => (
            <a
              key={index}
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-medium hover:text-accent transition-all duration-300 px-4"
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
