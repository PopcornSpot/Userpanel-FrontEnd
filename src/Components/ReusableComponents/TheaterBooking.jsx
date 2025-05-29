import React, { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import image from "../../assets/LoginImagebg.jpg";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import NavBar from "./NavbarComponent";
import Footer from "./FooterComponent";
import Loader from "./LoaderComponent";

const TheaterBooking = () => {
  const [theatres, setTheatres] = useState({});
  const [shows, setShows] = useState([]);
  const [movies, setMovie] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { _id } = useParams();
  const backendURL = "https://popcornspotbackend-production.up.railway.app";
  const navigate = useNavigate();

  const fetchTheatres = async () => {
    try {
      const res = await axios.get(
        `https://popcornspotbackend-production.up.railway.app/theatre/user/getonedetails/?_id=${_id}`
      );
      toast.success(res.data.Message);
      setTheatres(res.data.theatres);
    } catch (error) {
      toast.error("Error fetching theatre details.");
    }
  };

  const fetchShows = async () => {
    try {
      const res = await axios.get(
        `https://popcornspotbackend-production.up.railway.app/show/user/getshowfortheatre/?_id=${_id}`
      );
      const today = new Date();
      const filteredShows = res.data.shows.filter((show) => {
        const lastDate = new Date(show.lastDate);
        return lastDate >= today;
      });
      setShows(filteredShows);
    } catch (error) {
      toast.error("Error fetching showtimes.");
    }
  };

  const fetchMovies = async (movieName) => {
    try {
      const res = await axios.get(
        `https://popcornspotbackend-production.up.railway.app/movie/user/getMoviebookinglayout/?name=${movieName}`
      );
      setMovie(res.data.movie);
      return res.data.movie;
    } catch (error) {
      toast.error(error.response?.data?.Error || "Error fetching movie");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTheatres();
    fetchShows();
    setSelectedDate(new Date().toISOString().split("T")[0]);
  }, []);

  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        label: date.toLocaleDateString("en-US", { weekday: "short" }),
        date: date.toISOString().split("T")[0],
      });
    }
    return days;
  };

  const next7Days = getNext7Days();

  const filteredShows = shows.filter((show) => {
    if (!selectedDate) return true;
    const selected = new Date(selectedDate);
    const lastDate = new Date(show.lastDate);
    return lastDate >= selected;
  });

  const handleShowtimeClick = async (show, time) => {
    setSelectedMovie(`${show._id}-${time}`);
    try {
      const movieData = await fetchMovies(show.movie);
      let movieId = movieData._id;
      navigate(`/theatrelayout?movieId=${movieId}&showId=${show._id}&showTime=${encodeURIComponent(time)}&selectedDate=${selectedDate}`);
    } catch (error) {
      toast.error("Error fetching movie details.");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      <div className="w-full fixed top-0 z-50">
        <NavBar />
      </div>
      {
        theatres && Object.keys(theatres).length > 0 &&
        shows.length!==0 ?
      <div className="p-6 rounded-md mt-24 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0 w-full sm:w-[30%]">
            <img
              src={theatres.fileName ? `${backendURL}/upload/${theatres.fileName}` : image}
              alt="Small Image"
              className="h-[300px] sm:h-[400px] w-full object-cover rounded-md shadow-md"
            />
          </div>
          <div className="flex-grow w-full sm:w-[70%] bg-cyan-300 rounded-md shadow-md">
            <img
              src={theatres.fileName ? `${backendURL}/upload/${theatres.fileName}` : image}
              alt="Large Image"
              className="w-full h-[400px] object-cover rounded-md"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <IoMdHeartEmpty className="text-xl text-red-500" />
            <p className="font-bold text-lg">
              {theatres.theatreName} - {theatres.screenType}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <IoLocationOutline className="text-xl text-gray-600" />
            <p className="text-gray-700 text-sm">
              {theatres.address} - {theatres.city}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          {next7Days.map((day, index) => (
            <button
              key={index}
              className={`p-2 rounded-lg text-sm font-semibold ${selectedDate === day.date ? "bg-green-500 text-white" : "bg-gray-300 text-gray-800 hover:bg-green-400"}`}
              onClick={() => setSelectedDate(day.date)}
            >
              {day.label} - {day.date.split("-").slice(1).join("/")} {/* MM/DD */}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredShows.map((show, index) => {
            // Sort the showtimes in ascending order
            const sortedShowTimes = [...show.showTime].sort();

            return (
              <div key={show._id} className="p-4 border border-gray-300 rounded-md bg-white space-y-4">
                <div>
                  <p className="font-bold text-lg">{show.movie}</p>
                  <p className="text-sm text-gray-600">Screen: {show.screen}</p>
                  <p className="text-sm text-gray-600">
                    First Class: ₹{show.firstClassPrice} | Second Class: ₹{show.secondClassPrice}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold">Select Show Time</p>
                  <div className="flex gap-3 flex-wrap">
                    {sortedShowTimes.map((time, timeIndex) => (
                      <button
                        key={timeIndex}
                        className={`p-3 w-48 text-sm font-semibold rounded-md border-2 ${selectedMovie === `${show._id}-${time}` ? "bg-green-500 text-white" : "bg-gray-300 text-gray-800 hover:bg-green-400"}`}
                        onClick={() => handleShowtimeClick(show, time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
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

export default TheaterBooking;
