import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const MovieCard = ({ data }) => {
  const backendURL = "https://popcornspotbackend-production.up.railway.app";
  const { _id, fileName, title, certificate, language } = data;
  const views = "234k";
  const ratings = "8.4/10";

  return (
    <Link to={`/moviedetail/${_id}`}>
      <div
        className={`h-[300px] sm:h-[450px] w-full relative max-sm:h-[300px] shadow-sm shadow-gray-800 rounded-lg hover:-translate-y-1 hover:shadow-md transition hover:shadow-gray-800`}
      >
        <div className="w-full h-full overflow-hidden rounded-lg bg-slate-400 absolute top-0">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={`${backendURL}/upload/${fileName}`}
            alt={title}
          />
        </div>
        <div
          className={`w-full h-[95px] sm:h-[120px] absolute bottom-0 opacity-90 flex items-start justify-evenly px-2 flex-col bg-[#181921] rounded-b-lg`}
        ></div>
        <div
          className={`w-full h-[95px] sm:h-[120px] absolute bottom-0 flex items-start justify-evenly px-2 flex-col rounded-b-lg`}
        >
          <h2 className="font-semibold text-gray-50  text-sm sm:text-lg">{title}</h2>
          <h4 className="font-medium text-gray-200 text-xs sm:text-sm">{certificate}</h4>
          <h4 className="font-medium text-xs sm:text-sm text-gray-200">{language}</h4>
          <div className="w-full flex justify-between items-center text-white">
            <span className="w-full flex justify-start items-center gap-1">
              <FaStar className="text-yellow-500" />
              <span className="font-semibold text-white text-xs sm:text-sm">{ratings}</span>
            </span>
            <span className="w-full flex justify-end gap-1 items-center">
              <span className="font-medium text-gray-200 text-xs sm:text-sm">Views</span>
              <span className="font-semibold text-white text-xs sm:text-sm">{views}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
