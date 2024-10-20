"use client"; // Markera denna komponent som en klientkomponent
import React, { useEffect, useState } from 'react';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  popularity: number;
}

const MovieList = ({ genreId, title }: { genreId: number; title: string }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
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
              className="mb-2 w-full h-72 object-cover"
            />
            <h3 className="font-bold text-sm">{movie.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
