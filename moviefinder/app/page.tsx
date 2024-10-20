"use client"; // Markera denna komponent som klientkomponent

import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "dbeeb30a06089bf15dbac384b5baa25a"; // Din API-nyckel
const BASE_URL = "https://api.themoviedb.org/3";

const HomePage = () => {
  const [actionMovies, setActionMovies] = useState([]);
  const [romanticMovies, setRomanticMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  const fetchMoviesBySearch = async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: query,
          language: "en-US",
        },
      });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery) {
      fetchMoviesBySearch(searchQuery);
    }
  };

  const handleMovieClick = (movieId) => {
    window.location.href = `/movie/${movieId}`; // Navigera till filmdetaljsidan
  };

  useEffect(() => {
    fetchMoviesByGenre(28, setActionMovies);
    fetchMoviesByGenre(10749, setRomanticMovies);
    fetchMoviesByGenre(35, setComedyMovies);
  }, []);

  return (
    <div className="bg-black text-yellow-400 p-5">
      {/* Header */}
      <div className="text-center py-10">
        <h1 className="text-5xl font-bold">Moviefinder</h1>
        <p className="text-xl mt-4">
          Millions of movies and people to discover. Explore now
        </p>
        <div className="mt-5">
          <input
            className="w-1/2 p-3 rounded-l-lg text-black" // Texten i input-fältet blir svart
            type="text"
            placeholder="Search for a movie, person..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="p-3 bg-yellow-400 rounded-r-lg text-black"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Sökresultat Sektion */}
      {searchResults.length > 0 && (
        <div className="mt-10">
          <h2 className="text-white text-3xl font-bold mb-4">Search Results</h2>
          <div className="flex overflow-x-auto space-x-5 py-4 scrollbar-hide">
            {searchResults.map((movie) => (
              <div
                key={movie.id}
                className="min-w-[160px]"
                onClick={() => handleMovieClick(movie.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-80 object-cover rounded-md"
                />
                <h3 className=" text-white text-lg mt-2 p-5">{movie.title}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Movies Section */}
      <div className="mt-10">
        <h2 className=" text-white text-3xl font-bold mb-4">Trending Action Movies</h2>
        <div className="flex overflow-x-auto space-x-5 py-4 scrollbar-hide">
          {actionMovies.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[160px]"
              onClick={() => handleMovieClick(movie.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-80 object-cover rounded-md"
              />
              <h3 className=" text-white text-lg mt-2 p-5">{movie.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Romantic Movies Section */}
      <div className="mt-10">
        <h2 className="text-white text-3xl font-bold mb-4">What's Popular in Romance</h2>
        <div className="flex overflow-x-auto space-x-5 py-4 scrollbar-hide">
          {romanticMovies.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[160px]"
              onClick={() => handleMovieClick(movie.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-80 object-cover rounded-md"
              />
              <h3 className=" text-white text-lg mt-2 p-5">{movie.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Comedy Movies Section */}
      <div className="mt-10">
        <h2 className="text-white text-3xl font-bold mb-4">Top Comedy Movies</h2>
        <div className="flex overflow-x-auto space-x-5 py-4 scrollbar-hide">
          {comedyMovies.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[160px]"
              onClick={() => handleMovieClick(movie.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-80 object-cover rounded-md"
              />
              <h3 className=" text-white text-lg mt-2 p-5">{movie.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
