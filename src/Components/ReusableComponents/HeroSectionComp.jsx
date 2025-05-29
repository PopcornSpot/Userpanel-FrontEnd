import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Hero = () => {
  const backendURL = "https://popcornspotbackend-production.up.railway.app/upload/";
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchBanner = async () => {
    try {
      const response = await axios.get("https://popcornspotbackend-production.up.railway.app/banner/user/getallbanner");
      const { allBanner, Error } = response.data;

      if (Error) {
        toast.error(Error);
        return;
      }

      const bannerImages = allBanner.map((banner) => `${backendURL}${banner.fileName}`);
      setImages(bannerImages);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Request to Login Again");
      } else {
        toast.error(error.response?.data?.Error || error.message);
      }
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <section className="w-full h-[90vh] bg-gray-100 max-sm:h-[450px] flex justify-center items-center">
      <div className="relative w-full h-full overflow-hidden rounded-b-lg">
        <div
          className="absolute inset-0 w-auto h-auto bg-cover bg-center bg-no-repeat sm:bg-fixed max-sm:bg-top max-sm:bg-cover transition-all duration-500"
          style={{
            backgroundImage: `url(${images[currentIndex] || ""})`,
          }}
        ></div>

        <div className="w-full h-full bg-black absolute top-0 bg-opacity-65 flex flex-col justify-center items-start px-20 max-sm:px-5">
          <h1 className="text-2xl font-extrabold sm:text-5xl text-white">
            The big screen awaits
            <br />
            <strong className="mt-4 font-extrabold text-orange-400 sm:block">
              Grab your tickets now!
            </strong>
          </h1>
          <Link to={"/theatre"}>
            <span className="block w-full rounded bg-orange-500 mt-2 sm:mt-4 px-2 sm:px-3 py-1.5 sm:py-3 font-semibold text-white shadow focus:outline-none focus:ring sm:w-auto hover:bg-orange-600 transition">
              Book Tickets
            </span>
          </Link>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-orange-400" : "bg-white"
              }`}
              onClick={() => setCurrentIndex(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
