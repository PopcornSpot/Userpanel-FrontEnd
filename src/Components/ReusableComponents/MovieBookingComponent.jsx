import React, { useEffect, useState } from "react";
import NavBar from "./NavbarComponent";
import Footer from "./FooterComponent";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import Loader from "./LoaderComponent";

const MovieBooking = () => {
  const [movie, setMovie] = useState({});
  const [allShows, setAllShows] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const { _id } = useParams();

  const today = new Date();
  const sevenDaysFromToday = new Date();
  sevenDaysFromToday.setDate(today.getDate() + 7);

  const formatDate = (date) => date.toISOString().split("T")[0];
  const todayStr = formatDate(today);
  const sevenDaysFromTodayStr = formatDate(sevenDaysFromToday);

  const [initialSelectedDate] = useState(todayStr);

  const fetchMovie = async () => {
    try {
      const res = await axios.get(
        `https://popcornspotbackend-production.up.railway.app/movie/user/getMovieDetails/?_id=${_id}`
      );
      setMovie(res.data.movie);
    } catch (error) {
      console.error(error.message);
      toast.error("Error fetching movie details.");
    }
  };

  const fetchTheatres = async () => {
    if (!movie.adminId) return;

    try {
      const res = await axios.get(
        `https://popcornspotbackend-production.up.railway.app/theatre/user/getalltheatredetails`
      );
      setTheatres(res.data.theatres);
    } catch (error) {
      console.error(error.message);
      toast.error("Error fetching theatre details.");
    }
  };

  const fetchShows = async () => {
    if (!movie.adminId) return;

    try {
      const res = await axios.get(
        `https://popcornspotbackend-production.up.railway.app/show/user/getallshows`
      );
      const filteredShows = res.data.shows.filter(
        (show) => show.movie === movie.title
      );
      setAllShows(filteredShows);
    } catch (error) {
      console.error(error.message);
      toast.error("Error fetching showtimes.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      await fetchMovie();
      await fetchTheatres();
      await fetchShows();
      setSelectedDate(initialSelectedDate);
    };
    fetchData();
  }, [_id, movie.adminId, initialSelectedDate]);

  const getNextSevenDays = () => {
    const dates = [];
    for (let i = 0; i <= 6; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push(formatDate(date));
    }
    return dates;
  };

  const nextSevenDays = getNextSevenDays();
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const filteredShows = allShows.filter((show) => {
    const showStartDate = new Date(show.showDate);
    const showEndDate = new Date(show.lastDate);
    const selectedDateObj = new Date(selectedDate);
    return (
      selectedDateObj >= showStartDate && selectedDateObj <= showEndDate
    );
  });

  const groupedShowTimes = theatres
    .map((theatre) => {
      const showsForTheatre = filteredShows.filter(
        (show) =>
          show.theatreId === theatre._id &&
          new Date(show.showDate).toISOString().split("T")[0] <= selectedDate &&
          new Date(show.lastDate).toISOString().split("T")[0] >= selectedDate
      );
      return showsForTheatre.length > 0
        ? { ...theatre, shows: showsForTheatre }
        : null;
    })
    .filter(Boolean);

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen">
      <div className="w-full fixed top-0 z-50 shadow-md bg-white">
        <NavBar />
      </div>
      {movie && Object.keys(movie).length > 0 ? (
        allShows.length !== 0 && theatres.length !== 0 ? (
          <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                  {movie.title} - {movie.language}
                </h1>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 font-medium rounded-full shadow-sm">
                    {movie.genre}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Select a Date
                </h2>
                <div className="flex flex-wrap gap-4">
                  {nextSevenDays.map((date) => (
                    <button
                      key={date}
                      onClick={() => handleDateSelect(date)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                        selectedDate === date
                          ? "bg-orange-500 text-white"
                          : "bg-gray-300 text-gray-700 hover:bg-orange-500 hover:text-white"
                      } transition-all duration-300`}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                {groupedShowTimes.length > 0 ? (
                  groupedShowTimes.map((theatre) => (
                    <div
                      key={theatre._id}
                      className="p-6 bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300"
                    >
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        {theatre.theatreName} - {theatre.city}
                      </h2>

                      <div className="flex flex-wrap gap-4">
                        {theatre.shows.map((show, idx) => (
                          <div key={idx} className="flex flex-wrap gap-2">
                            {show.showTime.map((time, timeIdx) => (
                              <Link
                                to={`/theatrelayout?movieId=${movie._id}&showId=${show._id}&showTime=${encodeURIComponent(
                                  time
                                )}&selectedDate=${selectedDate}`}
                                key={timeIdx}
                              >
                                <button className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300">
                                  {time}
                                </button>
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-xl text-gray-700 font-semibold">
                    No shows available for the selected date.
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto text-center py-64 text-xl text-gray-700 font-semibold">
              No shows available for this movie.
            </div>
          </div>
        )
      ) : (
        <Loader />
      )}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default MovieBooking;
