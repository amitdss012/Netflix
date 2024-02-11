import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../API/movieAPI";

const Hero = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const trendingMovies = await fetchTrendingMovies();
      if (trendingMovies.length > 0) {
        const randomIndex = Math.floor(Math.random() * trendingMovies.length);
        setMovie(trendingMovies[randomIndex]);
      }
    };

    fetchMovies();
  }, []);

  if (!movie) {
    return (
      <>
        <p>fetching movie.........</p>
      </>
    );
  }

  return (
    <div className="hero h-[80vh] text-white relative">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="object-cover w-full h-full"
      />
      <div className=" bg-opacity-50 flex items-center w-[100%] h-full absolute top-[20%]">
        <div className="px-10 max-w-xl">
          <h2 className="text-3xl  font-bold">{movie.title}</h2>
          <div className="mt-6 mb-3">
            {/* <button className='border-gray-400 capitalize border py-2 px-5 '>play</button>
        <button className='border-gray-400 py-2 px-5 ml-4 capitalize border'>watch later</button> */}
          </div>
          <p>{movie.release_date}</p>
          <p className="mt-4 text-white">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
