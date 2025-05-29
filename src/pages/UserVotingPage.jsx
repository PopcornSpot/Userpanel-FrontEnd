import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../Components/ReusableComponents/NavbarComponent";
import Footer from "../Components/ReusableComponents/FooterComponent";

const UserVotingPage = () => {
  const [pollData, setPollData] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState("");
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        const response = await axios.get(
          `https://popcornspotbackend-production.up.railway.app/poll/getpoll/?_id=${_id}`
        );
        setPollData(response.data.getpoll);
      } catch (err) {
        toast.error(err.response?.data?.Error || "Failed to load poll data.");
      }
    };

    fetchPollData();
  }, [_id]);

  const handleVote = async () => {
    if (!selectedMovie) {
      alert("Please select a movie to vote for!");
      return;
    }
    const updatedMovies = pollData.movies.map((movie) =>
      movie._id === selectedMovie
        ? { ...movie, votes: (Number(movie.votes) || 0) + 1 } 
        : movie
    );

    try {
      const response = await axios.put(
        `https://popcornspotbackend-production.up.railway.app/poll/update/?_id=${_id}`,
        { movies: updatedMovies }
      );
      toast.success(response.data.Message);
      alert("Your vote has been counted!");
      navigate("/");

    } catch (err) {
      toast.error(err.response?.data?.Error || "Failed to update vote.");
      console.error(err.message);
    }
  };

  if (!pollData) {
    return <div>Loading poll...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full sticky top-0 z-50">
        <NavBar />
      </div>
      <div className="w-full py-32 mt-20 flex flex-col justify-center items-center">
        <div className="p-10 rounded-lg bg-gradient-to-b from-gray-700 via-gray-700 to-gray-600">
          <h1 className="text-2xl text-center text-white font-bold mb-4">
            {pollData.pollName}
          </h1>
          <h3 className="text-lg text-gray-50 mb-4">Vote for your favorite movie:</h3>
          <div className="mb-6">
            {pollData.movies.map((movie) => (
              <div key={movie._id} className="mb-2 text-orange-50">
                <input
                  type="radio"
                  name="movieVote"
                  id={movie._id}
                  value={movie._id}
                  checked={selectedMovie === movie._id}
                  onChange={() => setSelectedMovie(movie._id)}
                  className="mr-2"
                />
                <label htmlFor={movie._id} className="text-lg text-gray-100">
                  {movie.movieName} - <strong>Votes:</strong>{" "}
                  <span className="text-orange-400">{movie.votes || 0}</span>
                </label>
              </div>
            ))}
          </div>

          <div className="w-full flex justify-center items-center">
            <button
              onClick={handleVote}
              className="px-6 py-2 bg-orange-500 text-white font-bold rounded hover:bg-orange-600"
            >
              Vote
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default UserVotingPage;
