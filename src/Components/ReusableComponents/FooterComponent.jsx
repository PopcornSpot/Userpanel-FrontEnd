import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

import Logo from "../../assets/POPFINAL.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex flex-wrap justify-between gap-8 sm:gap-12 lg:gap-20 text-center sm:text-left">
          <div className="flex-1 min-w-[250px]">
            <img
              src={Logo}
              alt="PopcornSpot Logo"
              className="w-36 mx-auto sm:mx-0 mb-4"
            />
            <p className="text-gray-300 leading-relaxed">
              PopcornSpot is a leading platform for booking your favorite
              movies. Stay updated with the latest, upcoming, and trending
              movies.
            </p>
            <Link
              to="/about"
              className="mt-4 inline-block text-orange-400 font-semibold hover:underline transition duration-300"
            >
              Learn more about us
            </Link>
          </div>

          <div className="flex-1 min-w-[150px]">
            <h4 className="text-xl font-bold mb-4 text-orange-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-orange-400 transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-orange-400 transition duration-300"
                >
                  Suggestion Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-orange-400 transition duration-300"
                >
                  Latest Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-orange-400 transition duration-300"
                >
                  Upcoming Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/theatre"
                  className="text-gray-300 hover:text-orange-400 transition duration-300"
                >
                  Theatres
                </Link>
              </li>
              <li>
                <Link
                  to="/mytickets"
                  className="text-gray-300 hover:text-orange-400 transition duration-300"
                >
                  My Tickets
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-orange-400 transition duration-300"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-1 min-w-[150px]">
            <h4 className="text-xl font-bold mb-4 text-orange-400">
              Legal & Policies
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/termsandcondition"
                  className="text-gray-300 hover:text-orange-400 transition duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-orange-400 transition duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/refund"
                  className="text-gray-300 hover:text-orange-400 transition duration-300"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex-1 min-w-[250px] flex flex-col justify-start items-center sm:items-start">
            <h4 className="text-xl font-bold mb-4 text-orange-400">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-orange-400 w-5 h-5" />
                <p className="text-gray-300">
                  <span>+91 9344262658</span> <br />
                  <span>+91 8344024734</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-orange-400 w-5 h-5" />
                <p className="text-gray-300">popcornspotofficial@gmail.com</p>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-orange-400 w-5 h-5" />
                <p className="text-gray-300">Chennai, India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col lg:flex-row justify-between items-center text-center lg:text-left">
          <p className="text-gray-400 mb-4 lg:mb-0">
            © {new Date().getFullYear()} <b className="text-orange-400">PopcornSpot</b>. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              to="#"
              className="text-gray-400 hover:text-orange-400 transition duration-300 text-2xl"
            >
              <FaFacebook />
            </Link>
            <Link
              to="#"
              className="text-gray-400 hover:text-orange-400 transition duration-300 text-2xl"
            >
              <FaInstagram />
            </Link>
            <Link
              to="#"
              className="text-gray-400 hover:text-orange-400 transition duration-300 text-2xl"
            >
              <FaTwitter />
            </Link>
            <Link
              to="#"
              className="text-gray-400 hover:text-orange-400 transition duration-300 text-2xl"
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
