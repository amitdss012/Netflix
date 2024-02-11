import axios from 'axios';



const key = "918b08a5eb37289a3dba2e0ae4915b8d"
const url = "https://api.themoviedb.org/3"


const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${url}/movie/popular?api_key=${key}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
};

const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${url}/trending/movie/week?api_key=${key}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
  }
};

const fetchUpcomingMovies = async () => {
  try {
    const response = await axios.get(`${url}/movie/upcoming?api_key=${key}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
  }
};

const fetchComedyMovies = async () => {
  try {
    const response = await axios.get(`${url}/discover/movie?api_key=${key}&with_genres=35`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching comedy movies:", error);
  }
};

const fetchTopRatedMovies = async () => {
  try {
    const response = await axios.get(`${url}/movie/top_rated?api_key=${key}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
  }
};

export { fetchPopularMovies, fetchTrendingMovies, fetchUpcomingMovies, fetchComedyMovies, fetchTopRatedMovies };

