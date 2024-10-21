"use client"; // Markera denna komponent som en klientkomponent
import React, { useEffect, useState } from 'react';
import MovieModal from './MovieModal'; // Importera din MovieModal-komponent

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date?: string; // Lägger till release_date för filmens detaljer
  genres?: { id: number; name: string }[]; // Definiera genrer
  cast?: { id: number; name: string; profile_path: string | null }[]; // Definiera skådespelare
  crew?: { id: number; name: string }[]; // Definiera crew
}

const MovieList = ({ genreId, title }: { genreId: number; title: string }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); // Ny state för vald film
  const [isModalOpen, setIsModalOpen] = useState(false); // Tillstånd för modalen
  const API_KEY = 'dbeeb30a06089bf15dbac384b5baa25a';
  const totalPages = 3;

  useEffect(() => {
    const fetchMovies = async (pageNumber: number) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=${pageNumber}`
        );
        if (!response.ok) {
          throw new Error('Något gick fel med fetch-anropet');
        }
        const data = await response.json();
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      } catch (error) {
        console.error('Fel vid hämtning av filmer:', error);
      }
    };

    for (let i = 1; i <= totalPages; i++) {
      fetchMovies(i);
    }
  }, [genreId]);

  // Funktion för att öppna modalen och hämta filmens detaljer
  const openModal = async (movieId: number) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`);
      if (!response.ok) {
        throw new Error('Något gick fel med att hämta filmens detaljer');
      }
      const movieDetails = await response.json();
      
      // Sätt den valda filmen med detaljer som genrer, skådespelare och crew
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
      console.error('Fel vid hämtning av filmens detaljer:', error);
    }
  };

  // Funktion för att stänga modalen
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="p-6 bg-black text-white">
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <li key={movie.id} className="bg-gray-800 rounded overflow-hidden shadow-lg p-2">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : '/path/to/placeholder-image.jpg'
              }
              alt={movie.title}
              className="mb-2 w-full h-72 object-cover cursor-pointer"
              onClick={() => openModal(movie.id)} // Öppna modalen när bilden klickas
            />
            <h3 className="font-bold text-sm">{movie.title}</h3>
          </li>
        ))}
      </ul>

      {/* Modal för att visa filminformation */}
      {selectedMovie && (
        <MovieModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          movie={{
            title: selectedMovie.title,
            description: selectedMovie.overview,
            releaseDate: selectedMovie.release_date || "No release date available.",
            posterPath: selectedMovie.poster_path,
            genres: selectedMovie.genres.map(genre => genre.name), // Omvandla till strängar
            cast: selectedMovie.cast.slice(0, 5), // Visa endast de första 5 skådespelarna
            crew: selectedMovie.crew.slice(0, 5), // Visa endast de första 5 medlemmarna av crew
          }}
        />
      )}
    </div>
  );
};

export default MovieList;
