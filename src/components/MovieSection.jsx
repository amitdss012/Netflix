

import React, { useEffect, useState, useRef } from "react";
import { UserAuth } from "../context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const MovieSection = ({ MovieSectionName, fetchMovies }) => {
  const [movies, setMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState(new Set()); // Track liked movies by ID

  useEffect(() => {
    const getMovies = async () => {
      try {
        const moviesData = await fetchMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        alert("Failed to load movies. Please try again later.");
      }
    };
    getMovies();
  }, [fetchMovies]); // Include fetchMovies in dependency array if it's expected to change

  const { user } = UserAuth();


  useEffect(() => {
    const likedMoviesFromStorage = localStorage.getItem('likedMovies');
    if (likedMoviesFromStorage) {
      setLikedMovies(new Set(JSON.parse(likedMoviesFromStorage)));
    }
  }, []);

  // Save liked movies to localStorage whenever the likedMovies state changes
  useEffect(() => {
    localStorage.setItem('likedMovies', JSON.stringify(Array.from(likedMovies)));
  }, [likedMovies]);

  const toggleLike = async (movie) => {
    const userEmail = user?.email;
    if (!userEmail) {
      console.log("login first");
      // alert("first login to save movies");
      return;
    } else {
      const updatedLikedMovies = new Set(likedMovies);
      let operation;
      if (likedMovies.has(movie.id)) {
        updatedLikedMovies.delete(movie.id);
        operation = "remove"; // Indicate that we're removing the movie from Firestore
      } else {
        updatedLikedMovies.add(movie.id);
        operation = "add"; // Indicate that we're adding the movie to Firestore
      }
      setLikedMovies(updatedLikedMovies);

      // Update Firestore based on the operation
      const userDoc = doc(db, "users", userEmail);
      if (operation === "add") {
        await updateDoc(userDoc, {
          likedMovies: arrayUnion(movie),
        });
      } else {
        await updateDoc(userDoc, {
          likedMovies: arrayRemove(movie),
        });
      }
    }
  };

  const slider = (offSet) => {
    const slide = document.getElementById(MovieSectionName);
    slide.scrollLeft = slide.scrollLeft + offSet;
  };

  return (
    <>
      <h2 className="text-white mt-2 ml-2 text-xl">{MovieSectionName}</h2>
      <div className="relative flex items-center group">
        <i
          className="fa-solid fa-circle-left absolute left-2 bg-white opacity-80 text-4xl z-50 rounded-[100%] text-black cursor-pointer hidden md:group-hover:block"
          onClick={() => slider(-500)}
        ></i>

        <div
          id={MovieSectionName}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative w-[180px] h-[110px] inline-block rounded-lg bg-cover overflow-hidden cursor-auto m-2"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                className="w-full h-40 block  origin-top"
                alt={movie.title}
              />
              <div className="backDrop absolute top-0 left-0 w-full h-[110px] bg-black/80 opacity-0 hover:opacity-100 cursor-pointer flex justify-center items-center">
                <p className="text-white">{movie.title}</p>
                <button
                  className="absolute top-2 left-2"
                  onClick={() => toggleLike(movie)}
                >
                  {likedMovies.has(movie.id) ? (
                    <i className="fa-solid fa-heart text-white text-3xl"></i>
                  ) : (
                    <i className="fa-regular fa-heart text-white text-3xl"></i>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
        <i
          className="fa-solid fa-circle-right absolute right-2 bg-white opacity-80 text-4xl z-50 rounded-[100%] text-black cursor-pointer hidden md:group-hover:block"
          onClick={() => slider(500)}
        ></i>
      </div>
    </>
  );
};
