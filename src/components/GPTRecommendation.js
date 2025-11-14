import {useDispatch, useSelector} from "react-redux";
import {OPTIONS} from "../utils/constants";
import {useState} from "react";
import MovieCard from "./MovieCard";
import Shimmer from "./ShimmerUI/Shimmer";
import {changeSearchState} from "../utils/gptSlice";

const GPTRecommendation = () => {
  const movies = useSelector((store) => store.gpt.MoviesRecommendation);
  const searchState = useSelector((store) => store.gpt.searchState);
  const dispatch = useDispatch();
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  if (!movies) return;

  const getMovieData = async () => {
    const fetchMovies = async (movie) => {
      let data;
      try {
        data = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${movie?.name}&include_adult=${movie?.adult}&language=${movie?.primaryLanguage}&primary_release_year=${movie?.year}&page=1`,
          OPTIONS
        );
      } catch {
        console.log("fetch error");
        return;
      }
      return await data.json();
    };
    dispatch(changeSearchState(3));

    const promiseArray = movies.map((movie) => fetchMovies(movie));
    const movieData = await Promise.all(promiseArray);
    setRecommendedMovies(movieData);
  };
  getMovieData();
  
  return (
    <div className="bg-black">
      {searchState === 2 && <Shimmer />}
      {searchState === 3 && (
        <>
          <h1 className="text-white text-3xl mx-10 py-10 text-center md:text-left font-bold">
            Recommendation
          </h1>
          <div className="flex flex-col md:flex-row items-center overflow-x-auto scrollbar-hide mx-10">
            {recommendedMovies && recommendedMovies.map((movie) => (
                <MovieCard
                  key={movie?.results?.[0]?.id}
                  title={movie?.results?.[0]?.original_title}
                  poster_path={movie?.results?.[0]?.poster_path}
                />
              ))}
          </div>
        </>
      )}
      
    </div>
  );
};

export default GPTRecommendation;
