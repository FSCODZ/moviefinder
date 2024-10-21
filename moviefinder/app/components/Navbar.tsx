"use client"; // Markera denna komponent som en klientkomponent
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import MovieModal from "./MovieModal"; // Importera MovieModal för att öppna modalen från navbaren

const API_KEY = "dbeeb30a06089bf15dbac384b5baa25a"; // Din API-nyckel
const BASE_URL = "https://api.themoviedb.org/3";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Sökfråga
  const [searchResults, setSearchResults] = useState([]); // Sökresultat
  const [isModalOpen, setIsModalOpen] = useState(false); // Modalens tillstånd
  const [selectedMovie, setSelectedMovie] = useState(null); // Vald film

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
        description: response.data.overview || "No description available.",
        releaseDate: response.data.release_date || "No release date available.",
        genres: response.data.genres.map((genre) => genre.name),
        cast: response.data.credits.cast.slice(0, 5),
        crew: response.data.credits.crew.slice(0, 5),
        posterPath: response.data.poster_path,
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

  return (
    <nav className="bg-darkblue p-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <Link href="/" className="text-yellow-400 text-xl font-semibold">
            Moviefinder
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <Link href="/genre" className="text-yellow-400 text-xl font-semibold">
            Genre
          </Link>
          <Link href="/tv-genre" className="text-yellow-400 text-xl font-semibold">
            TV Shows
          </Link>

          {/* Sökruta */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search for a movie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 rounded-l-lg text-black"
            />
            <button
              onClick={handleSearch}
              className="bg-yellow-400 p-2 rounded-r-lg text-black"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Visa sökresultat i dropdown-liknande vy */}
      {searchResults.length > 0 && (
        <div className="bg-darkblue p-5 mt-4 absolute w-full left-0 top-full z-10">
          <h2 className="text-yellow-400 text-lg font-semibold">Search Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {searchResults.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 p-4 rounded cursor-pointer"
                onClick={() => openModal(movie)} // Öppna modal vid klick
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover mb-4 rounded-md"
                />
                <h3 className="text-white text-lg">{movie.title}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal för att visa detaljer om vald film */}
      <MovieModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        movie={selectedMovie}
      />
    </nav>
  );
};

export default Navbar;
