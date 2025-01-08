import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ title, poster_path }) => {
  return (
    <div className="mr-4">
      <div className="w-56">
        <img src={IMG_CDN_URL + poster_path} alt="movie-poster"  className=""/>
      </div>
      <p className="text-white text-center text-md p-2">{title}</p>
    </div>
  );
};

export default MovieCard;
