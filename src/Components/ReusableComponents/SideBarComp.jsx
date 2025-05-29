import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { BsTicketPerforated } from "react-icons/bs";
import { FaRegHeart, FaXmark } from "react-icons/fa6";
import { GiTheater } from "react-icons/gi";
import { IoSearch } from "react-icons/io5";
import { SiPagespeedinsights } from "react-icons/si";
import { TbLogout2 } from "react-icons/tb";
import { VscActivateBreakpoints } from "react-icons/vsc";
import logo from "../../assets/POPFINAL.png";
import { FaUserCircle } from "react-icons/fa";

const sideBarList = [
  { page: "Home", path: "/", icon: <AiTwotoneHome className="text-xl text-gray-400" /> },
  { page: "Movies", path: "/movies", icon: <BiMoviePlay className="text-xl text-gray-400" /> },
  { page: "Theater", path: "/theatre", icon: <GiTheater className="text-xl text-gray-400" /> },
  { page: "My Tickets", path: "/mytickets", icon: <BsTicketPerforated className="text-xl text-gray-400" /> },
  // { page: "Insights", path: "/insights", icon: <SiPagespeedinsights className="text-xl text-gray-400" /> },
  // { page: "WishList", path: "/wishlist", icon: <FaRegHeart className="text-xl text-gray-400" /> },
  { page: "Profile", path: "/profile", icon: <FaUserCircle className="text-xl text-gray-400" /> },
];

const SideBar = ({ setSearchBarValue, movieOptions, location, setBurgerValue }) => {
  const navigate = useNavigate();
  const [isMoviesDropdownOpen, setIsMoviesDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="w-screen h-screen absolute top-0 bg-[#181921] opacity-80 flex justify-center items-center"></div>
      <div className="w-full sm:w-[250px] h-screen absolute top-0 right-0 bg-gray-900 flex flex-col items-center justify-start">
        <div className="w-full sm:w-[250px] h-20 flex justify-between items-center px-5">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
          <FaXmark onClick={() => setBurgerValue(false)} className="text-3xl text-gray-400 hover:scale-110 hover:duration-100 hover:ease-linear cursor-pointer" />
        </div>
        
        <div className="w-full sm:w-[250px] h-14 flex justify-start items-center">
          <span onClick={() => { setSearchBarValue(true); setBurgerValue(false); }} className="pl-5 flex gap-5 w-[250px] h-14 py-5 font-medium text-white hover:bg-gray-700 hover:duration-100 transition hover:ease-linear hover:border-b-white">
            <IoSearch className="text-xl text-gray-400" />
            Search
          </span>
        </div>

        {sideBarList.map((value, index) => (
          <div key={index} className="w-full">
            {value.page === "Movies" ? (
              <>
                <div className={`w-full h-14 flex items-center pl-5 gap-5 cursor-pointer ${value.path === location.pathname ? "text-orange-400" : "text-white hover:bg-gray-700"}`} onClick={() => setIsMoviesDropdownOpen(!isMoviesDropdownOpen)}>
                  {value.icon}
                  {value.page}
                </div>
                {isMoviesDropdownOpen && (
                  <div className="flex flex-col pl-8 w-full bg-gray-900">
                    {movieOptions.map((movie, idx) => (
                      <Link key={idx} to={movie.path} className="py-2 gap-3 flex items-center text-white hover:text-gray-400 transition">
                        <VscActivateBreakpoints className="text-xl text-gray-400" />
                        {movie.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link key={index} to={value.path}>
                <div className={`w-full h-14 flex items-center pl-5 gap-5 cursor-pointer ${value.path === location.pathname ? "text-orange-400 hover:bg-gray-700" : "text-white hover:bg-gray-700"}`}>
                  {value.icon}
                  {value.page}
                </div>
              </Link>
            )}
          </div>
        ))}

        <div onClick={handleLogout} className="pl-5 flex gap-5 w-full sm:w-[250px] h-14 py-5 justify-start items-center font-medium text-white hover:bg-gray-700 hover:duration-100 transition hover:ease-linear hover:border-b-white">
          <TbLogout2 className="text-xl text-gray-400" />
          Logout
        </div>
      </div>
    </>
  );
};

export default SideBar;
