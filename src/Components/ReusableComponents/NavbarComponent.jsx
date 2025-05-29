import React, { useState } from "react";
import { FaCircleUser, FaRegUser } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SideBar from "./SideBarComp";
import SerachBar from "./SearchBoxComp";
import { VscActivateBreakpoints } from "react-icons/vsc";
import Logo from "../../assets/POPFINAL.png";
import { LiaSignInAltSolid } from "react-icons/lia";
import { FiSearch } from "react-icons/fi";

const menuList = [
  { page: "Home", path: "/" },
  { page: "Movies", path: "/movies" },
  { page: "Theatre", path: "/theatre" },
  { page: "My Tickets", path: "/mytickets" },
  // { page: "Insights", path: "/insights" },
];

const movieOptions = [
  { name: "Kollywood", path: "/movies/kollywood" },
  { name: "Tollywood", path: "/movies/tollywood" },
  { name: "Mollywood", path: "/movies/mollywood" },
];

const dropdownOptions = [
  { name: "Profile", path: "/profile", icon: <FaRegUser className="text-gray-400 font-bold" /> },
  { name: "SignIn", path: "/login", icon: <LiaSignInAltSolid className="text-gray-400 font-bold" /> },
];

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchBarValue, setSearchBarValue] = useState(false);
  const [burgerValue, setBurgerValue] = useState(false);
  const [isMoviesDropdownOpen, setIsMoviesDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="fixed z-20">
      <div className="w-screen min-h-20 flex bg-gray-800 items-center justify-between">
        <div className="max-w-[300px] px-6 min-h-20 flex items-center justify-start">
          <img className="h-10 w-auto sm:h-12" src={Logo} alt="" />
        </div>

        <div className="max-w-[60%] min-h-20 max-lg:hidden font-medium flex justify-center items-center gap-6">
          {menuList.map((value, index) =>
            value.page === "Movies" ? (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setIsMoviesDropdownOpen(true)}
                onMouseLeave={() => setIsMoviesDropdownOpen(false)}
              >
                <span
                  className={`px-2 w-full min-h-20 pt-2 pb-7 font-medium ${
                    location.pathname.startsWith("/movies")
                      ? "text-orange-500"
                      : "text-white"
                  } hover:rounded-none hover:text-gray-400 transition hover:duration-500 hover:ease-linear hover:border-b-white`}
                >
                  {value.page}
                </span>
                {isMoviesDropdownOpen && (
                  <div className="absolute -left-10 bg-gray-800 text-white rounded-b shadow-lg mt-5">
                    {movieOptions.map((movie, id) => (
                      <Link
                        key={id}
                        to={movie.path}
                        className="w-[150px] flex items-center gap-3 justify-center px-4 py-2 hover:bg-gray-600"
                      >
                        <VscActivateBreakpoints className="text-xl text-gray-400" />
                        {movie.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={index} to={value.path}>
                <span
                  className={`px-2 w-full min-h-20 pt-2 pb-7 font-medium ${
                    location.pathname === value.path ? "text-orange-400" : "text-white"
                  } hover:rounded-none hover:text-gray-400 transition hover:duration-500 hover:ease-linear hover:border-b-white`}
                >
                  {value.page}
                </span>
              </Link>
            )
          )}
        </div>

        <div className=" h-full mr-8 flex justify-end items-center gap-4 ">
          <Link 
           onClick={() => setSearchBarValue(true)}
          className="flex px-2 py-2 rounded-md max-lg:hidden text-gray-100  justify-center items-center border-gray-700 border-2 hover:bg-gray-700 gap-1 ">
            <FiSearch
              className="text-xl font-bold text-gray-100 hover:-translate-y-0.5 transition "
            />Search
          </Link>
          <div
            className="relative min-h-20 w-20 flex items-center justify-center"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <div className="hover:bg-gray-700 max-lg:hidden border-gray-700 border-2 rounded-md gap-1.5 justify-center items-center text-gray-100 flex py-2 px-2">
            <FaCircleUser className="text-xl text-gray-100  hover:-translate-y-0.5 transition cursor-pointer" />
            Profile
            </div>
            {isDropdownOpen && (
              <div className="absolute -right-6 mt-36 w-32 bg-gray-800 shadow-lg rounded-b-lg">
                {dropdownOptions.map((option, index) => (
                  <Link
                    key={index}
                    to={option.path}
                    className="flex gap-3 items-center px-4 py-2 text-white hover:bg-gray-700 hover:text-orange-400 transition"
                  >
                    {option.icon}
                    {option.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <GiHamburgerMenu
            onClick={() => setBurgerValue(true)}
            className="lg:hidden font-bold text-2xl text-white"
          />
        </div>
      </div>
      {searchBarValue && <SerachBar setSearchBarValue={setSearchBarValue} />}
      {burgerValue && (
        <SideBar
          setBurgerValue={setBurgerValue}
          movieOptions={movieOptions}
          location={location}
          setSearchBarValue={setSearchBarValue}
        />
      )}
    </nav>
  );
};

export default NavBar;
