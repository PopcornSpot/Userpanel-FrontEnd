import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NavBar from "../Components/ReusableComponents/NavbarComponent";
import Footer from "../Components/ReusableComponents/FooterComponent";
import axios from "axios";
import { toast } from "react-toastify";
import { GiConfirmed } from "react-icons/gi";
import Loader from "../Components/ReusableComponents/LoaderComponent";

const TicketConfirmation = () => {
  const backendURL = "https://popcornspotbackend-production.up.railway.app";
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bookingId = params.get("bookingDetails");
  const movieId = params.get("movieId");
  const [movie, setMovie] = useState({});
  const [theatre, setTheatre] = useState({});
  const [ticketDetails, setTicketDetails] = useState({});

  const getMovie = async () => {
    try {
      const res = await axios.get(
        `https://popcornspotbackend-production.up.railway.app/movie/user/getMovieDetails/?_id=${movieId}`
      );
      setMovie(res.data.movie);
    } catch (error) {
      toast.error(error.response?.data?.Error || "Error fetching movie");
    }
  };

  const getTicketDetails = async () => {
    try {
      const res = await axios.get(
        `https://popcornspotbackend-production.up.railway.app/payment/user/getticketdetails/?_id=${bookingId}`
      );
      setTicketDetails(res.data.ticketDetails);
    } catch (error) {
      toast.error(
        error.response?.data?.Error || "Error fetching ticket details"
      );
    }
  };

  const getTheatreDetails = async () => {
    try {
      const res = await axios.get(
        `https://popcornspotbackend-production.up.railway.app/theatre/user/getonedetails/?_id=${ticketDetails.theatreId}`
      );
      setTheatre(res.data.theatres);
    } catch (error) {
      toast.error(
        error.response?.data?.Error || "Error fetching theatre details"
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getMovie();
    getTicketDetails();
  }, []);

  useEffect(() => {
    if (ticketDetails.theatreId) {
      getTheatreDetails();
    }
  }, [ticketDetails]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full fixed top-0 z-50">
        <NavBar />
      </div>
      {
         theatre && Object.keys(theatre).length > 0 &&
         movie && Object.keys(movie).length > 0 &&
         ticketDetails && Object.keys(ticketDetails).length > 0 
          ?
      <div className="mt-24 p-6 bg-white shadow-lg rounded-lg w-[90%] max-w-3xl">
        <h1 className="text-3xl flex justify-center items-center gap-2 font-bold text-center text-gray-800 mb-6">
          Ticket Confirmed <GiConfirmed className="text-green-500" />
        </h1>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-shrink-0">
            <img
              src={
                `${backendURL}/upload/${movie.fileName}` ||
                "https://via.placeholder.com/150"
              }
              alt={movie.title || "Movie Poster"}
              className="w-48 h-auto rounded-md shadow-md"
            />
          </div>
          <div className="space-y-4 flex-1">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Movie:</span>
              <span className="text-gray-900">{movie.title}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Date:</span>
              <span className="text-gray-900">{ticketDetails.showDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Time:</span>
              <span className="text-gray-900">{ticketDetails.showTime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Seats:</span>
              <span className="text-gray-900">
                {ticketDetails.seatNumbers &&
                Array.isArray(ticketDetails.seatNumbers)
                  ? ticketDetails.seatNumbers.join(", ")
                  : "No seats selected"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Total Cost:</span>
              <span className="text-gray-900">₹ {ticketDetails.totalCost}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Booked By:</span>
              <span className="text-gray-900">{ticketDetails.userName}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Payment Id:</span>
              <span className="text-gray-900">{ticketDetails.paymentId}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <div className="flex flex-col items-center">
            <div className="text-sm w-full flex justify-center items-center text-gray-600 mb-2">
              ----- SCAN QR CODE AT THEATRE -----
            </div>

            <div className="w-full mt-4 flex justify-center items-center gap-20 max-md:gap-4 flex-wrap ">
              <div className="flex flex-col justify-center items-start gap-4">
                <div className="flex justify-center items-start gap-3">
                  <span className="font-semibold text-gray-700 w-16">Screen:</span>
                  <span className="text-gray-900">{theatre.theatreName}</span>
                </div>

                <div className="flex justify-center items-start gap-3">
                  <span className="font-semibold text-gray-700 w-16">Address:</span>
                  <span className="text-gray-900">{theatre.address}</span>
                </div>
              </div>
              <img
                src={
                  ticketDetails.fileName &&
                  `${backendURL}/upload/${ticketDetails.fileName}`
                }
                alt="QR Code"
                className="w-32 h-32 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/"
            className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            Home
          </Link>
          <Link
            to="/mytickets"
            className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            My Tickets
          </Link>
        </div>
      </div>
      :
      <Loader/>
      }
      <div className="mt-6 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default TicketConfirmation;
