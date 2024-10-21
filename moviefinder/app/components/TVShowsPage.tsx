"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieModal from "./MovieModal"; // Importera din MovieModal-komponent

const API_KEY = "dbeeb30a06089bf15dbac384b5baa25a";
const BASE_URL = "https://api.themoviedb.org/3";

const TVGenrePage = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [tvShows, setTvShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null); // För vald TV-show
  const [isModalOpen, setIsModalOpen] = useState(false); // För modal

  // Hämta alla genrer för TV-serier
  const fetchGenres = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/genre/tv/list`, {
        params: { api_key: API_KEY, language: "en-US" },
      });
      setGenres(response.data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  // Hämta TV-serier baserat på vald genre
  const fetchTVShowsByGenre = async (genreId) => {
    try {
      const response = await axios.get(`${BASE_URL}/discover/tv`, {
        params: {
          api_key: API_KEY,
          with_genres: genreId,
          language: "en-US",
        },
      });
      setTvShows(response.data.results);
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    fetchTVShowsByGenre(genreId);
  };

  const openModal = async (showId) => {
    try {
      const response = await axios.get(`${BASE_URL}/tv/${showId}?api_key=${API_KEY}&append_to_response=credits`);
      const showDetails = response.data;
      setSelectedShow({
        id: showDetails.id,
        name: showDetails.name,
        overview: showDetails.overview,
        poster_path: showDetails.poster_path,
        release_date: showDetails.first_air_date,
        genres: showDetails.genres,
        cast: showDetails.credits.cast,
        crew: showDetails.credits.crew,
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching TV show details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedShow(null);
  };

  return (
    <div className="p-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">TV Show Genres</h1>

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

      {selectedGenre && (
        <div>
          <h2 className="text-2xl mb-4">
            TV Shows in {genres.find((g) => g.id === selectedGenre)?.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tvShows.map((show) => (
              <div key={show.id} className="bg-gray-800 p-4 rounded">
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  className="w-full h-72 object-cover mb-4 cursor-pointer"
                  onClick={() => openModal(show.id)} // Öppna modalen på klick
                />
                <h3 className="text-lg">{show.name}</h3>
                <p>Rating: {show.vote_average}/10</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedShow && (
        <MovieModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          movie={{
            title: selectedShow.name,
            description: selectedShow.overview,
            releaseDate: selectedShow.release_date || "No release date available.",
            posterPath: selectedShow.poster_path,
            genres: selectedShow.genres.map((genre) => genre.name),
            cast: selectedShow.cast.slice(0, 5), // Visa endast de första 5 skådespelarna
            crew: selectedShow.crew.slice(0, 5), // Visa endast de första 5 medlemmarna av crew
          }}
        />
      )}
    </div>
  );
};

export default TVGenrePage;
