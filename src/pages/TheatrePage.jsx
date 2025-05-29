import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import theatreImage from "../assets/LoginImagebg.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import Footer from "../Components/ReusableComponents/FooterComponent";
import NavBar from "../Components/ReusableComponents/NavbarComponent";
import { Link } from "react-router-dom";
import Loader from "../Components/ReusableComponents/LoaderComponent";

const Card = ({ _id ,image, title, address,screenType }) => {
  const backendURL = "https://popcornspotbackend-production.up.railway.app";

  return (
  <Link to={`/theatrebooking/${_id}`}>
    <div className="bg-gray-900 relative w-full sm:w-[300px] shadow-sm rounded-lg h-auto">
      {image && (
        <img
          src={image ? `${backendURL}/upload/${image}` : theatreImage}
          alt={title}
          className="w-full h-[150px] object-cover rounded-lg"
        />
      )}
      <div className="absolute top-0 w-full h-full bg-gray-900 bg-opacity-75 rounded-lg"></div>
      <div className="absolute top-0 w-full h-full flex flex-col items-start justify-start mt-2 gap-1 p-4">
        <p className="text-lg font-bold text-white">{title} - {screenType}</p>
        <p className="text-gray-200 text-sm">{address}</p>
      </div>
    </div>
   </Link>
  );
};


const TheaterCard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [theaters, setTheatres] = useState([]);

  const fetchTheatres = async () => {
    try {
      const res = await axios.get(`https://popcornspotbackend-production.up.railway.app/theatre/user/getalltheatredetails`);
      toast.success(res.data.Message); 
      setTheatres(res.data.theatres); 
    } catch (error) {
      console.error(error.message);
      toast.error("Error fetching theatre details.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTheatres();
  }, []);


  const filteredTheaters = theaters.filter(
    (theater) =>
      theater.theatreName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theater.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen  flex flex-col items-center">
    <div className="w-full fixed top-0 z-50">
      <NavBar />
    </div>
{
  theaters.length!==0?
    <div className="bg-white p-7 mt-20">
    <div className="flex flex-col sm:flex-row bg-gray-800 items-center justify-between border-1 rounded-sm shadow-md border-gray-950 p-3  mb-6">
      <h1 className="font-semibold text-2xl text-gray-100 mb-4 sm:mb-0">Cinema in Chennai</h1>
      <div className="flex items-center border-2 border-gray-400 rounded-lg w-full sm:w-[350px]">
        <input
          type="text"
          placeholder="Search by cinema or area"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow p-2 focus:outline-none rounded-l-lg"
        />
        <button className="p-2 py-3 bg-orange-500 hover:bg-orange-600 rounded-r-lg text-white">
          <FiSearch />
        </button>
      </div>
    </div>
  
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
      {filteredTheaters.length === 0 ? (
        <p className="text-center text-gray-500 font-semibold mt-4">No theaters found. Try another search.</p>
      ) : (
        filteredTheaters.map((theater) => (
          <Card
            key={theater._id}
            _id={theater._id}
            image={theater.fileName}
            title={theater.theatreName}
            address={theater.address}
            screenType={theater.screenType}
          />
        ))
      )}
    </div>
  </div>
  :
  <Loader/> 
}
      <div className="w-full">
        <Footer />
      </div>
  </div>
  
  );
};

export default TheaterCard;
