import React, { useEffect, useState } from "react";
import FriendListCard from "../Components/ReusableComponents/FriendListCard";
import NavBar from "../Components/ReusableComponents/NavbarComponent";
import Footer from "../Components/ReusableComponents/FooterComponent";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserFriends } from "react-icons/fa";

const FriendListPage = () => {
  const backendURL = "https://popcornspotbackend-production.up.railway.app";
  const navigate = useNavigate();
  const [friendDetails, setFriendDetails] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchFriends = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const res = await axios.get(`${backendURL}/friend/getfriends`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (res.data.Error === "jwt expired") {
        navigate("/login");
        return [];
      }
      return res.data.findAllFriends;
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Request to Login Again");
      } else {
        console.log(err.message);
        
      }
      return [];
    }
  };

  const fetchTotalTickets = async (friendId) => {
    try {
      const response = await axios.get(
        `${backendURL}/payment/getallticketsforUser/?_id=${friendId}`
      );
      return response.data.allTickets || [];
    } catch (error) {
      toast.error(error.response?.data?.Error || error.message);
      return [];
    }
  };

  const fetchMoviesForFriends = async (friends) => {
    const updatedFriends = await Promise.all(
      friends.map(async (friend) => {
        const allTickets = await fetchTotalTickets(friend.friendId);
        const sortedTickets = allTickets
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        const watchedMovies = await Promise.all(
          sortedTickets.map(async (ticket) => {
            try {
              const res = await axios.get(
                `https://popcornspotbackend-production.up.railway.app/movie/user/getMovieDetails/?_id=${ticket.movieId}`
              );
              return res.data.movie.title;
            } catch (error) {
              console.error(`Error fetching movie for ID ${ticket.movieId}:`, error);
              return "Unknown Movie";
            }
          })
        );

        return { ...friend, watchedMovies };
      })
    );

    setFriendDetails(updatedFriends);
    setFilteredFriends(updatedFriends);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const friends = await fetchFriends();
        if (friends.length > 0) {
          await fetchMoviesForFriends(friends);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = friendDetails.filter((friend) =>
      friend.userName.toLowerCase().includes(query)
    );
    setFilteredFriends(filtered);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-100 via-white to-gray-300">
      <div className="w-full fixed top-0 z-50">
        <NavBar />
      </div>
      <div className="min-h-screen mt-16 bg-gradient-to-r from-gray-50 to-gray-100 py-8 px-2 sm:px-8">
        <h1 className="text-3xl px-8 font-bold text-gray-800 mb-2">Friend List</h1>
        <div className=" w-full mb-0 sm:mb-5 px-8 sm:mt-5 flex justify-between gap-10">
          <input
            type="text"
            placeholder="Search friends by name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <Link to={"/addfriend"}>
          <div className="w-10 h-10 sm:w-40 gap-2 rounded-lg flex justify-center items-center py-2 sm:px-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-500">
            <FaUserFriends/>
            <span className="hidden sm:block">Add Friends</span>
          </div>
          </Link>
        </div>
        {filteredFriends.length > 0 ? (
          <FriendListCard friends={filteredFriends} />
        ) : (
          <div className="text-center text-gray-600 mt-10">
            <p className="text-lg font-semibold">No Friends Found.</p>
            <p className="text-sm">Add friends to see them here!</p>
          </div>
        )}
      </div>
      <div className="w-full mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default FriendListPage;
