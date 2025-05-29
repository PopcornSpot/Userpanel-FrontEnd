import React, { useEffect, useState } from "react";
import NavBar from "./NavbarComponent";
import Footer from "./FooterComponent";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "./LoaderComponent";
import maleImage from "../../assets/male.jpeg"
import femaleImage from "../../assets/female.jpeg"

const PersonCard = ({ image, name, role }) => (
  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <img
      src={image}
      alt={`Photo of ${name}, a ${role}`}
      loading="lazy"
      className="w-24 aspect-square rounded-full object-cover mb-3 hover:scale-105 transition-transform duration-300"
    />
    <p className="font-semibold text-sm text-center">{name}</p>
    <p className="text-xs text-gray-500 text-center">{role}</p>
  </div>
);

const MovieDetailComponent = () => {
  const [movie, setMovie] = useState({});
  const { _id } = useParams();
  const backendURL = "https://popcornspotbackend-production.up.railway.app";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchMovieForUpdate = async () => {
    try {
      await axios
        .get(`https://popcornspotbackend-production.up.railway.app/movie/user/getMovieDetails/?_id=${_id}`)
        .then((res) => {
          toast.error(res.data.Error);
          setMovie(res.data.movie);
        })
        .catch((err) => {
          toast.error(err.response.data.Message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const cast = [
    { id: 1, name: movie.hero, role: "Hero", image: maleImage },
    { id: 2, name: movie.heroine, role: "Heroine", image: femaleImage },
    { id: 3, name: movie.music, role: "Music", image: maleImage },
    { id: 4, name: movie.director, role: "Director", image: maleImage },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMovieForUpdate();
  }, [_id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center">
      <div className="w-full sticky top-0 z-50">
        <NavBar />
      </div>

      {movie && Object.keys(movie).length > 0 ? (
        <>
          <div className="container mx-auto px-6 py-8 mt-20">
            <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden h-auto w-full">
              <div className="relative w-full lg:w-1/3 flex items-center justify-center">
                <Link to={movie.trailerUrl} className="relative group">
                  <img
                    src={`${backendURL}/upload/${movie.fileName}`}
                    alt={movie.title}
                    className="w-[400px] h-[500px] object-cover rounded-l-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
                      aria-label={`Watch trailer for ${movie.title}`}
                    >
                      Watch Trailer
                    </button>
                  </div>
                </Link>
              </div>


              <div className="w-full lg:w-2/3 p-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white flex flex-col justify-between gap-8">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight">{movie.title}</h1>
                  <div className="flex items-center gap-3 text-lg mb-4">
                    <span className="text-yellow-400 text-2xl font-bold">★ 7.5/10</span>
                    <span className="text-gray-300">(67 Votes)</span>
                  </div>
                  <p className="text-lg tracking-wide text-gray-300 mb-2">{movie.format} • {movie.language}</p>
                  <p className="text-lg tracking-wide text-gray-300">{movie.duration} • {movie.genre} • {movie.certificate} • {movie.releaseDate}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">About the Movie</h2>
                  <p className="leading-relaxed text-gray-300 text-lg tracking-wide">
                    {movie.synopsis}
                  </p>
                </div>
                <Link to={`/moviebooking/${movie._id}`}>
                  <button
                    className="w-[200px] bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105 self-start cursor-pointer"
                    aria-label="Book tickets for Pushpa 2"
                  >
                    Book Tickets
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-6 py-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {cast.map((person) => (
                <PersonCard key={person.id} image={person.image} name={person.name} role={person.role} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default MovieDetailComponent;
