"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "dbeeb30a06089bf15dbac384b5baa25a"; 
const BASE_URL = "https://api.themoviedb.org/3";

const GenrePage = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);

  // Hämta alla genrer
  const fetchGenres = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
        params: { api_key: API_KEY, language: "en-US" },
      });
      setGenres(response.data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  // Hämta filmer baserat på vald genre
  const fetchMoviesByGenre = async (genreId) => {
    try {
      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          with_genres: genreId,
          language: "en-US",
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    fetchMoviesByGenre(genreId);
  };

  return (
    <div className="p-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">Genres</h1>

      {/* Visa alla genrer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className={`p-4 rounded bg-gray-700 hover:bg-gray-500 ${
              selectedGenre === genre.id ? "bg-gray-900" : ""
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Visa filmer för den valda genren */}
      {selectedGenre && (
        <div>
          <h2 className="text-2xl mb-4">
            Movies in {genres.find((g) => g.id === selectedGenre)?.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <div key={movie.id} className="bg-gray-800 p-4 rounded">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover mb-4"
                />
                <h3 className="text-lg">{movie.title}</h3>
                <p>Rating: {movie.vote_average}/10</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenrePage;
