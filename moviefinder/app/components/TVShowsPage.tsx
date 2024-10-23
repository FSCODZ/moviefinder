"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieModal from "./MovieModal"; // Importera din MovieModal-komponent

const API_KEY = "dbeeb30a06089bf15dbac384b5baa25a";
const BASE_URL = "https://api.themoviedb.org/3";

interface Genre {
  id: number;
  name: string;
}

interface TVShow {
  id: number;
  name: string;
  poster_path: string;
}

interface ShowDetails {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres: Genre[];
  cast: any[];
  crew: any[];
}

const TVGenrePage = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [tvShows, setTvShows] = useState<TVShow[]>([]);
  const [selectedShow, setSelectedShow] = useState<ShowDetails | null>(null); // För vald TV-show
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
  const fetchTVShowsByGenre = async (genreId: number) => {
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

  const handleGenreClick = (genreId: number) => {
    setSelectedGenre(genreId);
    fetchTVShowsByGenre(genreId);
  };

  const openModal = async (showId: number) => {
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {tvShows.map((show) => (
              <div
                key={show.id}
                className="bg-gray-800 rounded overflow-hidden shadow-lg p-2 cursor-pointer"
                onClick={() => openModal(show.id)} // Öppna modalen på klick
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
                  alt={show.name}
                  className="w-full h-72 object-cover mb-2"
                />
                <h3 className="font-bold text-sm">{show.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal för att visa vald show */}
      <MovieModal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  movie={selectedShow || undefined}  
/>

    </div>
  );
};

export default TVGenrePage;
