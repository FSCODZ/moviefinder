"use client"; 
import React, { useState, useEffect } from "react";
import MovieModal from "./MovieModal"; 
import axios from "axios";

const API_KEY = "dbeeb30a06089bf15dbac384b5baa25a";
const BASE_URL = "https://api.themoviedb.org/3";

// Typdefinitioner
interface Genre {
  id: number;
  name: string;
}

interface Actor {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

interface CrewMember {
  id: number;
  name: string;
  job: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres: Genre[]; // Ändrat till Genre[]
  cast: Actor[];
  crew: CrewMember[];
}

const GenreComponent = () => {
  const [genres, setGenres] = useState<Genre[]>([]); 
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null); 
  const [movies, setMovies] = useState<Movie[]>([]); 
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

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

  const fetchMoviesByGenre = async (genreId: number) => {
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

  const handleGenreClick = (genreId: number) => {
    setSelectedGenre(genreId);
    fetchMoviesByGenre(genreId);
  };

  const openModal = async (movieId: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`);
      const movieDetails = response.data;
      setSelectedMovie({
        id: movieDetails.id,
        title: movieDetails.title,
        overview: movieDetails.overview,
        poster_path: movieDetails.poster_path,
        release_date: movieDetails.release_date,
        genres: movieDetails.genres, // Behåll som Genre[]
        cast: movieDetails.credits.cast.slice(0, 5).map((actor: any) => ({
          id: actor.id,
          name: actor.name,
          character: actor.character,
          profile_path: actor.profile_path || "", 
        })),
        crew: movieDetails.credits.crew.slice(0, 5).map((member: any) => ({
          id: member.id,
          name: member.name,
          job: member.job,
        })), 
      });
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
              <div
                key={movie.id}
                className="bg-gray-800 rounded overflow-hidden shadow-lg p-2 cursor-pointer"
                onClick={() => openModal(movie.id)} 
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover mb-2"
                />
                <h3 className="font-bold text-sm">{movie.title}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedMovie && (
        <MovieModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          movie={selectedMovie} 
        />
      )}
    </div>
  );
};

export default GenreComponent;
