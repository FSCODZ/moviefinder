"use client"; // Markera denna komponent som en klientkomponent

import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "dbeeb30a06089bf15dbac384b5baa25a"; // Din API-nyckel
const BASE_URL = "https://api.themoviedb.org/3";

const genreMapping = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const HomePage = () => {
  const [actionMovies, setActionMovies] = useState([]);
  const [romanticMovies, setRomanticMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  
  const [actionPage, setActionPage] = useState(1); // Page state for Action movies
  const [romanticPage, setRomanticPage] = useState(1); // Page state for Romantic movies
  const [comedyPage, setComedyPage] = useState(1); // Page state for Comedy movies
  
  const MOVIES_PER_PAGE = 5; // Number of movies per page

  // Funktion för att hämta filmer baserat på genre
  const fetchMoviesByGenre = async (genreId, setterFunction) => {
    try {
      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          with_genres: genreId,
          sort_by: "popularity.desc", // Sortera efter popularitet
          language: "en-US",
        },
      });
      setterFunction(response.data.results); // Hämta alla populära filmer för genren
    } catch (error) {
      console.error(`Error fetching movies for genre ${genreId}:`, error);
    }
  };

  // Hämta filmer när komponenten laddas
  useEffect(() => {
    fetchMoviesByGenre(28, setActionMovies); // Action
    fetchMoviesByGenre(10749, setRomanticMovies); // Romance
    fetchMoviesByGenre(35, setComedyMovies); // Comedy
  }, []);

  // Funktion för att visa en specifik sida av filmerna
  const paginateMovies = (movies, page) => {
    const startIndex = (page - 1) * MOVIES_PER_PAGE;
    return movies.slice(startIndex, startIndex + MOVIES_PER_PAGE);
  };

  // Funktion för att hämta genrenamn baserat på genre_ids
  const getGenres = (genreIds) => {
    return genreIds.map((id) => genreMapping[id]).join(", ");
  };

  return (
    <div className="min-h-screen bg-darkblue">
      {/* Landing Page Section */}
      <section className="h-screen bg-cover bg-center flex flex-col justify-center items-center" style={{ backgroundImage: 'url(/path-to-background-image.jpg)' }}>
        <h1 className="text-5xl font-bold text-white mb-4">Welcome to MovieFinder</h1>
        <p className="text-xl text-white">where you can find your new favorite movie</p>
      </section>

      <div className="p-6">
        {/* Action Movies Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Most Popular Action Movies</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {paginateMovies(actionMovies, actionPage).map((movie) => (
              <div key={movie.id} className="bg-white p-4 rounded-md shadow-md">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-700">{movie.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{movie.overview}</p>
                <p className="text-sm text-gray-600"><strong>Rating:</strong> {movie.vote_average}/10</p>
                <p className="text-sm text-gray-600"><strong>Genres:</strong> {getGenres(movie.genre_ids)}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="text-white bg-blue-500 p-2 rounded"
              disabled={actionPage === 1}
              onClick={() => setActionPage(actionPage - 1)}
            >
              Previous
            </button>
            <button
              className="text-white bg-blue-500 p-2 rounded"
              disabled={actionPage * MOVIES_PER_PAGE >= actionMovies.length}
              onClick={() => setActionPage(actionPage + 1)}
            >
              Next
            </button>
          </div>
        </section>

        {/* Romantic Movies Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Most Popular Romantic Movies</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {paginateMovies(romanticMovies, romanticPage).map((movie) => (
              <div key={movie.id} className="bg-white p-4 rounded-md shadow-md">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-700">{movie.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{movie.overview}</p>
                <p className="text-sm text-gray-600"><strong>Rating:</strong> {movie.vote_average}/10</p>
                <p className="text-sm text-gray-600"><strong>Genres:</strong> {getGenres(movie.genre_ids)}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="text-white bg-blue-500 p-2 rounded"
              disabled={romanticPage === 1}
              onClick={() => setRomanticPage(romanticPage - 1)}
            >
              Previous
            </button>
            <button
              className="text-white bg-blue-500 p-2 rounded"
              disabled={romanticPage * MOVIES_PER_PAGE >= romanticMovies.length}
              onClick={() => setRomanticPage(romanticPage + 1)}
            >
              Next
            </button>
          </div>
        </section>

        {/* Comedy Movies Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Most Popular Comedy Movies</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {paginateMovies(comedyMovies, comedyPage).map((movie) => (
              <div key={movie.id} className="bg-white p-4 rounded-md shadow-md">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-700">{movie.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{movie.overview}</p>
                <p className="text-sm text-gray-600"><strong>Rating:</strong> {movie.vote_average}/10</p>
                <p className="text-sm text-gray-600"><strong>Genres:</strong> {getGenres(movie.genre_ids)}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="text-white bg-blue-500 p-2 rounded"
              disabled={comedyPage === 1}
              onClick={() => setComedyPage(comedyPage - 1)}
            >
              Previous
            </button>
            <button
              className="text-white bg-blue-500 p-2 rounded"
              disabled={comedyPage * MOVIES_PER_PAGE >= comedyMovies.length}
              onClick={() => setComedyPage(comedyPage + 1)}
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
