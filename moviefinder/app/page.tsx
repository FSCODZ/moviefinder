"use client"; 

import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieModal from "./components/MovieModal"; 

const API_KEY = "dbeeb30a06089bf15dbac384b5baa25a"; // Din API-nyckel
const BASE_URL = "https://api.themoviedb.org/3";

const HomePage = () => {
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [romanticMovies, setRomanticMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(undefined); 

  // Definiera typerna direkt i filen
  interface Actor {
    id: number;
    name: string;
    profile_path: string;
  }

  interface CrewMember {
    id: number;
    name: string;
  }

  interface Movie {
    id: number;
    title: string;
    poster_path?: string;
    overview?: string;
    release_date?: string;
    genres: { name: string }[];
    cast: Actor[];
    crew: CrewMember[];
  }

  // Funktion för att hämta filmer baserat på genre
  const fetchMoviesByGenre = async (genreId: number, setterFunction: React.Dispatch<React.SetStateAction<Movie[]>>) => {
    try {
      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          with_genres: genreId,
          sort_by: "popularity.desc",
          language: "en-US",
        },
      });
      setterFunction(response.data.results as Movie[]);
    } catch (error) {
      console.error(`Error fetching movies for genre ${genreId}:`, error);
    }
  };

  // Funktion för att hämta filmer baserat på sökning
  const fetchMoviesBySearch = async (query: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: query,
          language: "en-US",
        },
      });
      setSearchResults(response.data.results as Movie[]);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Funktion för att hantera sökningen
  const handleSearch = () => {
    if (searchQuery) {
      fetchMoviesBySearch(searchQuery);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(); 
    }
  };

  // Funktion för att öppna modal och visa detaljer om en film
  const openModal = async (movie: Movie) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movie.id}`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          append_to_response: "credits", 
        },
      });

      const movieDetails: Movie = {
        id: response.data.id,
        title: response.data.title,
        overview: response.data.overview || "No description available.",
        release_date: response.data.release_date || "No release date available.",
        genres: response.data.genres,
        cast: response.data.credits.cast.slice(0, 5),
        crew: response.data.credits.crew.slice(0, 5),
        poster_path: response.data.poster_path,
      };
      setSelectedMovie(movieDetails);
      setIsModalOpen(true); 
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(undefined);
  };

  useEffect(() => {
    fetchMoviesByGenre(28, setActionMovies); 
    fetchMoviesByGenre(10749, setRomanticMovies); 
    fetchMoviesByGenre(35, setComedyMovies); 
  }, []);

  return (
    <div className="bg-black text-white p-6">
      {/* Header */}
      <div className="text-center py-10">
        <h1 className="text-5xl font-bold">Moviefinder</h1>
        <p className="text-xl mt-4">Millions of movies and people to discover. Explore now</p>
        <div className="mt-5">
          <input
            className="w-2/3 md:w-1/2 p-3 rounded-l-lg text-black"
            type="text"
            placeholder="Search for a movie, person..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown} 
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
          <h2 className="text-3xl font-bold mb-4">Search Results</h2>
          <div className="flex overflow-x-auto space-x-5 py-4 scrollbar-hide">
            {searchResults.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-2 min-w-[160px] cursor-pointer"
                onClick={() => openModal(movie)} 
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover mb-2 rounded-md"
                />
                <h3 className="font-bold text-sm mt-2">{movie.title}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Movies Section */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-4">Trending Action Movies</h2>
        <div className="flex overflow-x-auto space-x-5 py-4 scrollbar-hide">
          {actionMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-2 min-w-[160px] cursor-pointer"
              onClick={() => openModal(movie)} 
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-72 object-cover mb-2 rounded-md"
              />
              <h3 className="font-bold text-sm mt-2">{movie.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Romantic Movies Section */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-4">What's Popular in Romance</h2>
        <div className="flex overflow-x-auto space-x-5 py-4 scrollbar-hide">
          {romanticMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-2 min-w-[160px] cursor-pointer"
              onClick={() => openModal(movie)} 
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-72 object-cover mb-2 rounded-md"
              />
              <h3 className="font-bold text-sm mt-2">{movie.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Comedy Movies Section */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-4">Top Comedy Movies</h2>
        <div className="flex overflow-x-auto space-x-5 py-4 scrollbar-hide">
          {comedyMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-2 min-w-[160px] cursor-pointer"
              onClick={() => openModal(movie)} 
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-72 object-cover mb-2 rounded-md"
              />
              <h3 className="font-bold text-sm mt-2">{movie.title}</h3>
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
