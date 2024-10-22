"use client"; 
import React, { useState, useEffect } from "react";
import MovieModal from "./MovieModal"; 
import axios from "axios";

const API_KEY = "dbeeb30a06089bf15dbac384b5baa25a";
const BASE_URL = "https://api.themoviedb.org/3";

const GenreComponent = () => {
  const [genres, setGenres] = useState([]); 
  const [selectedGenre, setSelectedGenre] = useState(null); 
  const [movies, setMovies] = useState([]); 
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  // Hämta genrer från API
  useEffect(() => {
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

    fetchGenres();
  }, []);

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

  // Hantera klick på genre
  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    fetchMoviesByGenre(genreId);
  };

  // Öppna modal för vald film
  const openModal = async (movieId) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`);
      const movieDetails = response.data;
      setSelectedMovie({
        id: movieDetails.id,
        title: movieDetails.title,
        overview: movieDetails.overview,
        poster_path: movieDetails.poster_path,
        release_date: movieDetails.release_date,
        genres: movieDetails.genres,
        cast: movieDetails.credits.cast,
        crew: movieDetails.credits.crew,
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  // Stäng modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="p-6 bg-black text-white">
      <h2 className="text-3xl font-bold mb-6">Choose a Genre</h2>
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
            Movies in {genres.find((g) => g.id === selectedGenre)?.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <div key={movie.id} className="bg-gray-800 rounded overflow-hidden shadow-lg p-2">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="mb-2 w-full h-72 object-cover cursor-pointer"
                  onClick={() => openModal(movie.id)} 
                />
                <h3 className="font-bold text-sm">{movie.title}</h3>
              </div>
            ))}
          </div>

          {/* Modal för filmvisning */}
          {selectedMovie && (
            <MovieModal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              movie={{
                title: selectedMovie.title,
                description: selectedMovie.overview,
                releaseDate: selectedMovie.release_date || "No release date available.",
                posterPath: selectedMovie.poster_path,
                genres: selectedMovie.genres.map((genre) => genre.name),
                cast: selectedMovie.cast.slice(0, 5), 
                crew: selectedMovie.crew.slice(0, 5), 
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default GenreComponent;
