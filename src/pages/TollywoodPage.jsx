import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ViewAllMovie from "../Components/ReusableComponents/ViewAllMoviesComp";
import NavBar from "../Components/ReusableComponents/NavbarComponent";
import Footer from "../Components/ReusableComponents/FooterComponent";
import Loader from "../Components/ReusableComponents/LoaderComponent";

const Tollywood = () => {
  let [movieData, setMovieData] = useState([]);
  const getAllMovies = async () => {
    try {
      await axios
        .get(`https://popcornspotbackend-production.up.railway.app/movie/user/getallmovie`)
        .then((res) => {
          toast.error(res.data.Error);
          const allMovies = res.data.findAllMovies;
          const filteredMovies = allMovies.filter(
            (movies) => movies.status == "Published"
          );
          const tamilMovies = filteredMovies.filter((movie) =>
            movie.language
              .split(",")
              .map((lang) => lang.trim())
              .includes("Telugu")
          )
          .map((movie) => ({
            ...movie,
            language: "Telugu",
          }));
          setMovieData(tamilMovies);
        })
        .catch((err) => {
          toast.error(err.response.data.Message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllMovies();
  }, []);

  return (
    <>
      {movieData.length !== 0 ? (
        <section className="relative top-24">
          <ViewAllMovie movieData={movieData} />
        </section>
      ) : (
        <Loader />
      )}
      <footer className="mt-44">
        <Footer />
      </footer>
    </>
  );
};

export default Tollywood;
