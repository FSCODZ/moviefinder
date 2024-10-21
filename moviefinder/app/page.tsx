"use client"; // Markera denna komponent som klientkomponent

import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieModal from "./components/MovieModal";

const API_KEY = "dbeeb30a06089bf15dbac384b5baa25a"; // Din API-nyckel
const BASE_URL = "https://api.themoviedb.org/3";

const HomePage = () => {
  const [actionMovies, setActionMovies] = useState([]);
  const [romanticMovies, setRomanticMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Tillstånd för modalen
  const [selectedMovie, setSelectedMovie] = useState(null); // Vald film

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

  const openModal = async (movie) => {
    try {
      // Hämta detaljer för den valda filmen
      const response = await axios.get(`${BASE_URL}/movie/${movie.id}`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          append_to_response: "credits", // Hämta skådespelare och crew
        },
      });

      const movieDetails = {
        id: response.data.id,
        title: response.data.title,
        description: response.data.overview || "No description available.", // Hämta beskrivning
        releaseDate: response.data.release_date || "No release date available.", // Hämta releasedatum
        genres: response.data.genres.map((genre) => genre.name), // Hämta genrer
        cast: response.data.credits.cast.slice(0, 5), // Hämta de första 5 skådespelarna
        crew: response.data.credits.crew.slice(0, 5), // Hämta de första 5 i crew
        posterPath: response.data.poster_path // Hämta bild för filmen
      };
      setSelectedMovie(movieDetails);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
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
            className="w-1/2 p-3 rounded-l-lg text-black"
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
                onClick={() => openModal(movie)} // Öppna modalen på klick
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-80 object-cover rounded-md"
                />
                <h3 className="text-white text-lg mt-2 p-5">{movie.title}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Movies Section */}
      <div className="mt-10">
        <h2 className="text-white text-3xl font-bold mb-4">Trending Action Movies</h2>
        <div className="flex overflow-x-auto space-x-5 py-4 scrollbar-hide">
          {actionMovies.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[160px]"
              onClick={() => openModal(movie)} // Öppna modalen på klick
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-80 object-cover rounded-md"
              />
              <h3 className="text-white text-lg mt-2 p-5">{movie.title}</h3>
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
              onClick={() => openModal(movie)} // Öppna modalen på klick
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-80 object-cover rounded-md"
              />
              <h3 className="text-white text-lg mt-2 p-5">{movie.title}</h3>
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
              onClick={() => openModal(movie)} // Öppna modalen på klick
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-80 object-cover rounded-md"
              />
              <h3 className="text-white text-lg mt-2 p-5">{movie.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Modal för att visa filminformation */}
      <MovieModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        movie={selectedMovie}
      />
    </div>
  );
};

export default HomePage;
