import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./ReusableComponents/FooterComponent";
import NavBar from "./ReusableComponents/NavbarComponent";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "../assets/POPFINAL.png";

const RazorpayButton = () => {
  const backendURL = "https://popcornspotbackend-production.up.railway.app";
  const location = useLocation();
  const navigate = useNavigate();
  const [shows, setShows] = useState({});
  const [theatre, setTheatre] = useState({});
  const [movie, setMovie] = useState({});
  const [timeLeft, setTimeLeft] = useState(480);
  const params = new URLSearchParams(location.search);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const decryptTotalCost = (encryptedCost, secretKey) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedCost, secretKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error("Decryption failed:", error);
      return 0;
    }
  };

  const secretKey = "asdfgh,wertyop67890.,[];09ASDFGHJK";
  const movieId = params.get("movieId");
  const showId = params.get("showId");
  const showDate = params.get("selectedDate");
  const showTime = decodeURIComponent(params.get("showTime"));
  const selectedSeats = params.get("selectedSeats")?.split(",") || [];
  const encryptedTotalCost = params.get("encryptedTotalCost");
  const totalCost = decryptTotalCost(encryptedTotalCost, secretKey);
  const gstAmount = Math.round(totalCost * 0.18);
  const finalTotal = totalCost + gstAmount;
  const seatNumbers = selectedSeats.join(", ");

  const fetchShows = async () => {
    try {
      const res = await axios.get(
        `${backendURL}/show/user/getshowfortheatrelayout/?_id=${showId}`
      );
      setShows(res.data.shows);
    } catch (error) {
      toast.error("Error fetching showtimes.");
    }
  };

  const fetchTheatre = async (theatreId) => {
    try {
      const res = await axios.get(
        `${backendURL}/theatre/user/getonedetails/?_id=${theatreId}`
      );
      setTheatre(res.data.theatres);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchMovie = async () => {
    try {
      const res = await axios.get(
        `${backendURL}/movie/user/getMovieDetails/?_id=${movieId}`
      );
      setMovie(res.data.movie);
    } catch (error) {
      console.log(error.message);
    }
  };

  const saveSeats = async (bookingDetails) => {
    try {
      const response = await axios.post(
        `${backendURL}/payment/save`,
        bookingDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.status === "401") {
        navigate("/login");
      }
      if (response.data.Message) {
        toast.success("Show booked successfully!");
        navigate(
          `/confirmation?bookingDetails=${response.data.createdScreen._id}&movieId=${response.data.createdScreen.movieId}`
        );
      } else {
        toast.error("Failed to book seats. Please try again.");
      }
    } catch (error) {
      console.error("Error saving seat details:", error);
      toast.error("An error occurred while booking seats.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchShows();
      if (shows?.theatreId) {
        await fetchTheatre(shows.theatreId);
      }
    };
    fetchData();
    fetchMovie();
  }, [shows?.theatreId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleTimeout = () => {
    toast.error("Your session has expired. Please try again.");
    navigate(`/theatrelayout?movieId=${movieId}&showId=${showId}`);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handlePayment = async () => {
    try {
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
      console.log(razorpayKey);

      const amountInPaisa = finalTotal * 100;
      const response = await axios.post(`${backendURL}/payment/createorder`, {
        amount: amountInPaisa,
      });
      const order = response.data;

      if (!order || !order.orderId) {
        toast.error("Failed to create Razorpay order");
        return;
      }

      const options = {
        key: razorpayKey,
        amount: order.paymentOptions.amount,
        currency: "INR",
        name: "Popcorn Spot",
        description: `Payment for Seats: ${seatNumbers}`,
        image: logo,
        order_id: order.orderId,
        handler: async (response) => {
          const paymentDetails = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          try {
            const verifyResponse = await axios.post(
              `${backendURL}/payment/verifypayment`,
              paymentDetails
            );
            if (verifyResponse.data.success) {
              toast.success("Payment successfully!");
              const bookingDetails = {
                showTime,
                showDate,
                movieId,
                theatreId: shows.theatreId,
                showId,
                seatNumbers: selectedSeats,
                totalCost: finalTotal,
                paymentId: paymentDetails.razorpay_payment_id,
                orderId: paymentDetails.razorpay_order_id,
                paymentMethod: "Razorpay",
              };

              await saveSeats(bookingDetails);
            } else {
              toast.error("Payment verification failed!");
            }
          } catch (error) {
            console.error("Verification error:", error);
            toast.error("Payment verification error");
          }
        },
        prefill: {
          name: "PopcornSpot",
          email: "popcornspot.official@gmail.com",
          contact: "8344024735",
        },
        theme: {
          color: "#F37254",
        },
      };
      if (!window.Razorpay) {
        toast.error("Razorpay script not loaded!");
        return;
      }
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("An error occurred during payment");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="w-full fixed top-0 z-50">
        <NavBar />
      </div>
      <div className="flex flex-col items-center justify-center flex-1 mt-24 px-4">
        <div className="flex mt-10 mb-10 flex-wrap md:flex-nowrap items-stretch justify-center w-full max-w-6xl gap-8">
          <div className="w-full md:w-1/2 flex items-stretch">
            <img
              src={`${backendURL}/upload/${movie.fileName}`}
              alt={movie.title}
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Movie Details
              </h1>
              <p className="text-gray-600 mb-4">
                <strong>Movie Name: </strong>
                {movie.title}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Screen: </strong> {shows.screen}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Show Time: </strong> {showTime}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Show Date: </strong> {showDate}
              </p>
              <hr className="mt-10 mb-5" />
              <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Theatre Details
              </h1>
              <p className="text-gray-600 mb-4">
                <strong>Theatre Name: </strong>
                {theatre.theatreName}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Address: </strong> {theatre.address}
              </p>
              <hr className="mt-10 mb-5" />
              <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Payment Summary
              </h1>
              <p className="text-gray-600 mb-4">
                <strong>Base Cost:</strong> ₹{totalCost}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>GST Amount (18%):</strong> ₹{gstAmount}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Total (Base + GST):</strong> ₹{finalTotal}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Seats:</strong> {seatNumbers}
              </p>
            </div>
            <div className="mt-6">
              <p className="text-red-600 text-lg font-semibold mb-6 text-center">
                Time Remaining: {formatTime(timeLeft)}
              </p>
              <button
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-orange-500 to-gray-900 text-white py-3 rounded-lg shadow-md hover:scale-105 transition transform duration-300"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Footer />
      </div>
    </div>
  );
};

export default RazorpayButton;
