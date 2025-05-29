import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCardComp";

const MovieCarousel = ({ movieData }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2); 
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setVisibleCount(5);
      else if (window.innerWidth >= 1024) setVisibleCount(4);
      else if (window.innerWidth >= 768) setVisibleCount(3);
      else setVisibleCount(2); 
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex + visibleCount >= movieData.length
        ? prevIndex 
        : prevIndex + visibleCount
    );
    setSwipeOffset(0); 
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      prevIndex - visibleCount < 0 ? 0 : prevIndex - visibleCount
    );
    setSwipeOffset(0); 
  };

  const swipeHandlers = useSwipeable({
    onSwiping: (event) => {
      setIsSwiping(true);
      setSwipeOffset(event.deltaX);
    },
    onSwipedLeft: () => {
      if (swipeOffset < -50) handleNext(); 
      setIsSwiping(false);
      setSwipeOffset(0);
    },
    onSwipedRight: () => {
      if (swipeOffset > 50) handlePrev();
      setIsSwiping(false);
      setSwipeOffset(0); 
    },
    onSwiped: () => {
      setIsSwiping(false);
      setSwipeOffset(0);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  
  const handleDotClick = (index) => {
    setStartIndex(index * visibleCount); 
    setSwipeOffset(0);
  };

  const visibleCards = movieData.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        {...swipeHandlers}
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(calc(-${startIndex * (100 / visibleCount)}% + ${swipeOffset}px))`,
        }}
      >
        {movieData.map((value, index) => (
          <Link
            key={index}
            className="flex-none px-2"
            style={{ width: `${100 / visibleCount}%` }}
          >
            <MovieCard data={value} />
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: Math.ceil(movieData.length / visibleCount) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full mb-2 transition-all ${
                startIndex === index * visibleCount
                  ? "bg-gray-800 scale-125"
                  : "bg-gray-400"
              }`}
            />
          )
        )}
      </div>
    </div>
  );
};

export default MovieCarousel;
