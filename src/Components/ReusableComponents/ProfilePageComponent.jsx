import React, { useEffect, useState } from "react";
import image from "../../assets/LoginImagebg.jpg";
import { FaPencilAlt, FaUserFriends } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import NavBar from "./NavbarComponent";
import Footer from "./FooterComponent";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { CgPassword } from "react-icons/cg";

const ProfileCard = ({ title, value }) => (
  <div className="bg-white shadow-lg p-6 rounded-lg text-center hover:shadow-xl transition-shadow duration-300 border border-gray-200">
    <p className="text-lg font-semibold text-gray-600">{title}</p>
    <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
  </div>
);

const ActionButton = ({ icon: Icon, label, colorClass, onClick }) => (
  <button
    onClick={onClick}
    className={`${colorClass} text-white py-3 px-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2`}
  >
    <Icon className="w-5 h-5" />
    {label}
  </button>
);

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [totalTicket, setTotalTicket] = useState([]);
  const [statistics, setStatistics] = useState({
    moneySpent: 0,
    totalTheatres: 0,
    totalMovies: 0,
  });
  const navigate = useNavigate();
  const backendURL = "https://popcornspotbackend-production.up.railway.app";

  const calculateStatistics = (tickets) => {
    const moneySpent = tickets.reduce(
      (total, ticket) => total + parseFloat(ticket.totalCost || "0"),
      0
    );

    const uniqueTheatreIds = new Set(tickets.map((ticket) => ticket.theatreId));
    const uniqueMovieIds = new Set(tickets.map((ticket) => ticket.movieId));

    setStatistics({
      moneySpent,
      totalTheatres: uniqueTheatreIds.size,
      totalMovies: uniqueMovieIds.size,
    });
  };

  const fetchUser = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const res = await axios.get(`${backendURL}/user/getdetails`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (res.data.Error === "jwt expired") {
        navigate("/login");
        return null;
      }

      const fetchedUser = res.data.details;
      setUserDetails(fetchedUser);
      return fetchedUser;
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Request to Login Again");
      } else {
        toast.error(err.response?.data?.Error || "An error occurred");
      }
      return null;
    }
  };

  const fetchTotalTickets = async (userId) => {
    try {
      const response = await axios.get(
        `${backendURL}/payment/getallticketsforUser/?_id=${userId}`
      );
      setTotalTicket(response.data.allTickets);
      calculateStatistics(response.data.allTickets);
    } catch (error) {
      toast.error(error.response?.data?.Error || error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleFriend = () => {
    navigate("/friends");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUser = await fetchUser();
        if (fetchedUser) {
          await fetchTotalTickets(fetchedUser._id);
        } else {
          console.error("User details not fetched.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full fixed top-0 z-50 bg-white shadow-md">
        <NavBar />
      </div>
      <div className="mt-24 mb-6">
        <div className="p-6 text-2xl font-bold text-start ml-5">Profile</div>
      </div>
      <div className="mx-4 md:mx-10 bg-white p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex flex-col items-center lg:items-start gap-8">
            <div className="relative">
              <div className="bg-gradient-to-r from-orange-300 to-orange-500 p-1 rounded-full shadow-lg">
                <img
                  src={
                    userDetails.fileName
                      ? `${backendURL}/upload/${userDetails.fileName}`
                      : image
                  }
                  alt={userDetails.userName || "User"}
                  className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-white"
                />
              </div>
            </div>

            <div className="text-lg text-gray-700 space-y-2">
              <p className="flex">
                <strong className="block w-36">User Name:</strong>
                {userDetails.userName}
              </p>
              <p className="flex">
                <strong className="block w-36">Email:</strong>
                {userDetails.email}
              </p>
              <p className="flex">
                <strong className="block w-36">Mobile Number:</strong>
                {userDetails.mobileNumber}
              </p>
              <p className="flex">
                <strong className="block w-36">Gender:</strong>
                {userDetails.gender}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to={`/editprofile/${userDetails._id}`}>
                <ActionButton
                  icon={FaPencilAlt}
                  label="Edit Profile"
                  colorClass="bg-gradient-to-r from-blue-500 to-blue-600"
                />
              </Link>
              <ActionButton
                icon={FaUserFriends}
                label="Friends"
                colorClass="bg-gradient-to-r from-orange-400 to-orange-500"
                onClick={handleFriend}
              />
              <ActionButton
                icon={CiLogout}
                label="Logout"
                colorClass="bg-gradient-to-r from-red-500 to-red-600"
                onClick={handleLogout}
              />
              <Link to={"/resetpassword"}>
                <ActionButton
                  icon={CgPassword}
                  label="Change Password"
                  colorClass="bg-gradient-to-r from-green-500 to-green-600"
                />
              </Link>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Statistics</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProfileCard
                title="Money Spent"
                value={`\u20B9 ${statistics.moneySpent.toFixed(2)}`}
              />
              <ProfileCard
                title="Total Tickets"
                value={totalTicket.length}
              />
              <ProfileCard
                title="Total Theatres"
                value={statistics.totalTheatres}
              />
              <ProfileCard
                title="Total Movies"
                value={statistics.totalMovies}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-gray-100">
        <Footer />
      </div>
    </div>
  );
};

export default UserProfile;
