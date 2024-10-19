"use client"; // Markera denna komponent som en klientkomponent

import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "dbeeb30a06089bf15dbac384b5baa25a"; // Din API-nyckel
const BASE_URL = "https://api.themoviedb.org/3";

const genreMapping = {
  28: "Action",
  10749: "Romance",
  35: "Comedy",
};

const HomePage = () => {
  const [actionMovies, setActionMovies] = useState([]);
  const [romanticMovies, setRomanticMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);

  const MOVIES_PER_PAGE = 5; // Number of movies per page

  const fetchMoviesByGenre = async (genreId, setterFunction) => {
    try {
      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          with_genres: genreId,
          sort_by: "popularity.desc", 
          language: "en-US",
        },
      });
      setterFunction(response.data.results);
    } catch (error) {
      console.error(`Error fetching movies for genre ${genreId}:`, error);
    }
  };

  useEffect(() => {
    fetchMoviesByGenre(28, setActionMovies);
    fetchMoviesByGenre(10749, setRomanticMovies);
    fetchMoviesByGenre(35, setComedyMovies);
  }, []);

  const getGenres = (genreIds) => {
    return genreIds.map((id) => genreMapping[id]).join(", ");
  };

  return (
    <div className="bg-black text-yellow-300 p-5">
      {/* Header */}
      <div className="text-center py-10">
        <h1 className="text-5xl font-bold">Movies change your life</h1>
        <p className="text-xl mt-4">Millions of movies and people to discover. Explore now</p>
        <div className="mt-5">
          <input
            className="w-1/2 p-3 rounded-l-lg"
            type="text"
            placeholder="Search for a movie, person..."
          />
          <button className="p-3 bg-yellow-500 rounded-r-lg">Search</button>
        </div>
      </div>

      {/* Action Movies Section */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-4">Trending Action Movies</h2>
        <div className="flex overflow-x-scroll space-x-5">
          {actionMovies.map((movie) => (
            <div key={movie.id} className="w-64">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-80 object-cover rounded-md"
              />
              <h3 className="text-lg mt-2">{movie.title}</h3>
            
            </div>
          ))}
        </div>
      </div>

      {/* Romantic Movies Section */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-4">What's Popular in Romance</h2>
        <div className="flex overflow-x-scroll space-x-5">
          {romanticMovies.map((movie) => (
            <div key={movie.id} className="w-64">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-80 object-cover rounded-md"
              />
              <h3 className="text-lg mt-2">{movie.title}</h3>
              
            </div>
          ))}
        </div>
      </div>

      {/* Comedy Movies Section */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-4">Top Comedy Movies</h2>
        <div className="flex overflow-x-scroll space-x-5">
          {comedyMovies.map((movie) => (
            <div key={movie.id} className="w-64">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-80 object-cover rounded-md"
              />
              <h3 className="text-lg mt-2">{movie.title}</h3>
             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
