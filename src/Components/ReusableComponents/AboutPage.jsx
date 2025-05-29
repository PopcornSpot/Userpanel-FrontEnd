import React from "react";
import NavBar from "./NavbarComponent";
import Footer from "./FooterComponent";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full top-0 z-50 fixed shadow-md bg-white">
        <NavBar />
      </div>
      <div 
        className="max-w-6xl w-full bg-cover bg-center shadow-lg rounded-xl p-8 md:p-12 lg:p-16 mt-24 relative"
        style={{ backgroundImage: "url('https://i.imgur.com/r6g6Xal.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-75 rounded-xl"></div>

        <div className="relative z-10 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">About Us</h1>
          <p className="mt-4 text-xl md:text-2xl text-orange-400 font-semibold">
            Your ultimate movie booking experience!
          </p>
        </div>
      </div>

      <div className="max-w-6xl w-full px-6 md:px-10 lg:px-16 mt-16">
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">Who We Are</h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            At <span className="font-bold text-orange-500">Popcorn Spot</span>, we are passionate about bringing movie lovers closer to their favorite films. 
            With a seamless online booking system, we ensure you never miss a movie you love, whether it’s the latest blockbuster, a timeless classic, or a family favorite.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            Our mission is to deliver a hassle-free and enjoyable movie booking experience. 
            We aim to create memories, one ticket at a time, while offering the best deals, exclusive perks, and a delightful experience for our users.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">Why Choose Us?</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <span className="w-4 h-4 bg-orange-500 rounded-full mr-4"></span>
              <p className="text-gray-700 text-lg md:text-xl">Easy-to-use interface for booking tickets in just a few clicks.</p>
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-orange-500 rounded-full mr-4"></span>
              <p className="text-gray-700 text-lg md:text-xl">Get the best seats with real-time seat selection.</p>
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-orange-500 rounded-full mr-4"></span>
              <p className="text-gray-700 text-lg md:text-xl">Enjoy special offers and discounts for loyal customers.</p>
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-orange-500 rounded-full mr-4"></span>
              <p className="text-gray-700 text-lg md:text-xl">Secure payment gateway for safe transactions.</p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">Our Team</h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            We are a dedicated team of movie buffs, tech enthusiasts, and customer service professionals who work tirelessly to ensure your movie night is perfect. 
            From user-friendly design to unbeatable customer support, we’ve got you covered.
          </p>
        </section>
      </div>

      <div className="bg-orange-100 py-16 mt-16 w-full">
        <div className="max-w-6xl mx-auto text-center flex  flex-col justify-center items-center">
          <p className="text-gray-800 text-xl md:text-2xl mb-4">
            Ready to book your next movie? <span className="font-bold text-orange-500">Join us now!</span>
          </p>
          <Link to={"/"}
           className="bg-orange-500 mt-8 w-36 text-white py-3 rounded-lg shadow-lg hover:bg-orange-600 transition duration-300">
            Explore Movies
          </Link>
        </div>
      </div>

     <div className="w-full">
     <Footer />
     </div>
    </div>
  );
};

export default AboutPage;
