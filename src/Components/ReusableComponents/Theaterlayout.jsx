import React, { useEffect, useState } from "react";
import { MdEventSeat } from "react-icons/md";
import NavBar from "./NavbarComponent";
import Footer from "./FooterComponent";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
import Loader from "./LoaderComponent";

const TheaterLayout = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [shows, setShows] = useState({});
  const [ticketCount, setTicketCount] = useState(0);
  const [firstSeatSelected, setFirstSeatSelected] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const movieId = params.get("movieId");
  const showId = params.get("showId");
  const selectedDate = params.get("selectedDate");
  const showTime = decodeURIComponent(params.get("showTime"));
  const secretKey = "asdfgh,wertyop67890.,[];09ASDFGHJK";

  const fetchShows = async () => {
    try {
      const res = await axios.get(
        `https://popcornspotbackend-production.up.railway.app/show/user/getshowfortheatrelayout/?_id=${showId}`
      );
      setShows(res.data.shows);
    } catch (error) {
      toast.error("Error fetching showtimes.");
    }
  };

  const fetchBookedSeats = async () => {
    try {
      const res = await axios.get(
        `https://popcornspotbackend-production.up.railway.app/payment/user/getbookedseats`,
        {
          params: { movieId, showId, selectedDate, showTime },
        }
      );
      if (res.data.Message) {
        setBookedSeats(res.data.bookedSeats || []);
      } else {
        toast.error("No booked seats available.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchShows();
    fetchBookedSeats();
  }, []);

  const rows = [
    {
      label: `First Class (${shows.firstClassPrice})`,
      range: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
    },
    { label: "", range: ["L", "M", "N", "O", "P", "Q", "R", "S", "T", "U"] },
    { label: `Second Class (${shows.secondClassPrice})`, range: ["V", "W"] },
  ];

  const seatsPerRow = 23;
  const seatData = rows.flatMap((section) =>
    section.range.flatMap((row) =>
      Array.from({ length: seatsPerRow }, (_, seatIndex) => {
        const seatId = `${row}-${seatIndex + 1}`;
        return {
          id: seatId,
          row: row,
          section: section.label,
          number: seatIndex + 1,
          status: bookedSeats.includes(seatId) ? "sold" : "available",
        };
      })
    )
  );

  const getSeatPrice = (seatId) => {
    const row = seatId.split("-")[0];
    const firstClassPrice = Number(shows.firstClassPrice);
    const secondClassPrice = Number(shows.secondClassPrice);

    if (["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"].includes(row))
      return firstClassPrice;
    if (["V", "W"].includes(row)) return secondClassPrice;
    return firstClassPrice;
  };

  const calculateTotalCost = () => {
    return selectedSeats.reduce(
      (total, seatId) => total + getSeatPrice(seatId),
      0
    );
  };

  const handleSeatSelection = (seatId) => {
    if (!firstSeatSelected) {
      if (seatData.find((seat) => seat.id === seatId).status === "available") {
        setFirstSeatSelected(true);
        setSelectedSeats([seatId]);

        const firstSelectedSeat = seatId;
        const firstSeatIndex = seatData.findIndex((seat) => seat.id === firstSelectedSeat);
        const selectedRange = seatData.slice(firstSeatIndex, firstSeatIndex + ticketCount);

        setSelectedSeats(selectedRange.map((seat) => seat.id));
      }
    } else {
      const firstSelectedSeat = selectedSeats[0];
      const firstSeatIndex = seatData.findIndex((seat) => seat.id === firstSelectedSeat);
      const seatIndex = seatData.findIndex((seat) => seat.id === seatId);

      if (seatIndex >= firstSeatIndex && seatIndex < firstSeatIndex + ticketCount) {
        setSelectedSeats(
          seatData.slice(firstSeatIndex, firstSeatIndex + ticketCount).map((seat) => seat.id)
        );
      } else {
        setSelectedSeats([seatId]);
        const newSelectedRange = seatData.slice(seatIndex, seatIndex + ticketCount);
        setSelectedSeats(newSelectedRange.map((seat) => seat.id));
      }
    }
  };

  const handleTicketCount = (count) => {
    setTicketCount(count);
  };

  const encryptedTotalCost = CryptoJS.AES.encrypt(
    JSON.stringify(calculateTotalCost()),
    secretKey
  ).toString();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full fixed top-0 z-50">
        <NavBar />
      </div>
      <div className="flex-1 min-h-[300px] mt-24">
        {ticketCount === 0 ? (
          <div className="absolute top-60 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-center mb-4">How many tickets?</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {[...Array(12).keys()].map((i) => (
              <button
                key={i}
                onClick={() => handleTicketCount(i + 1)}
                className="bg-orange-400 text-white py-2 px-4 m-2 rounded-md text-sm hover:bg-orange-500 transition-transform transform hover:scale-105"
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>  
        ) : (
          <>
            <div className="space-y-10 px-4">
              {rows.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className="space-y-6 text-center flex flex-col items-center"
                >
                  <h2 className="text-2xl font-bold text-gray-800 underline decoration-gray-500">
                    {section.label}
                  </h2>
                  <div className="overflow-x-auto w-full">
                    <div className="inline-block">
                      {section.range.map((row) => (
                        <div
                          key={row}
                          className="flex items-center mb-4 relative"
                        >
                          <div className="w-8 text-center font-bold text-gray-900 rounded sticky left-0 bg-orange-500 mr-3 px-3 py-1.5 z-10">
                            {row}
                          </div>
                          <div className="flex flex-nowrap gap-2">
                            {seatData
                              .filter((seat) => seat.row === row)
                              .map((seat) => (
                                <div
                                  key={seat.id}
                                  onClick={() =>
                                    seat.status === "available" &&
                                    handleSeatSelection(seat.id)
                                  }
                                  className={`w-10 h-10 flex items-center justify-center rounded cursor-pointer border 
                                ${
                                  seat.status === "sold"
                                    ? "bg-red-500 text-white cursor-not-allowed"
                                    : selectedSeats.includes(seat.id)
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-300 hover:bg-gray-200"
                                } ${
                                  seat.number === 5
                                    ? "ml-16"
                                    : seat.number === 20
                                    ? "mr-16"
                                    : ""
                                }`}
                                  title={`Row ${seat.row}, Seat ${seat.number}`}
                                >
                                  <MdEventSeat size={20} />
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 w-full flex items-center justify-center h-20">
              <div className="w-[90%] max-w-4xl h-8 bg-gray-800 text-white text-center flex items-center justify-center rounded-md shadow-md">
                Theater Screen
              </div>
            </div>

            <div className="text-center mt-4">
              <p className="text-lg font-medium text-gray-700">
                Selected Seats:{" "}
                <span className="font-bold text-green-600">
                  {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
                </span>
              </p>
              <p className="text-lg font-medium text-gray-700">
                Total Cost:{" "}
                <span className="font-bold text-blue-600">
                  ₹{calculateTotalCost()}
                </span>
              </p>
            </div>

            <div className="flex gap-4 mt-6 justify-center">
              <Link
                to={`/payment?movieId=${movieId}&showId=${showId}&selectedSeats=${encodeURIComponent(
                  selectedSeats.join(",")
                )}&encryptedTotalCost=${encodeURIComponent(
                  encryptedTotalCost
                )}&showTime=${encodeURIComponent(
                  showTime
                )}&selectedDate=${selectedDate}`}
              >
                <button className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105">
                  Continue
                </button>
              </Link>
              <button
                className="bg-orange-400 text-white py-2 px-10 rounded-lg shadow-md hover:bg-orange-500 transition-transform transform hover:scale-105"
                onClick={() => {
                  setFirstSeatSelected(false);
                  setSelectedSeats([]);
                  setTicketCount(0);
                }}
              >
                Reset
              </button>
            </div>
          </>
        )}
      </div>
      <div className="mt-6 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default TheaterLayout;
