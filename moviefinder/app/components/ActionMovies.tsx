"use client"; // Markera denna komponent som en klientkomponent
import React, { useEffect, useState } from 'react';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  popularity: number; // Lägg till för sortering
}

const ActionMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const API_KEY = 'dbeeb30a06089bf15dbac384b5baa25a';
  const totalPages = 3; // Antal sidor att hämta (justera om du vill ha fler/färre filmer)

  useEffect(() => {
    const fetchMovies = async (pageNumber: number) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28&sort_by=popularity.desc&page=${pageNumber}`
        );
        if (!response.ok) {
          throw new Error('Något gick fel med fetch-anropet');
        }
        const data = await response.json();
        
        setMovies(prevMovies => [...prevMovies, ...data.results]); // Lägg till filmer från flera sidor
      } catch (error) {
        console.error('Fel vid hämtning av filmer:', error);
      }
    };

    // Hämta filmer från flera sidor
    for (let i = 1; i <= totalPages; i++) {
      fetchMovies(i);
    }
  }, []);

  return (
    <div>
      <h2>Action Movies</h2>
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {movies.map((movie) => (
          <li key={movie.id} className="border p-2">
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '/path/to/placeholder-image.jpg'}
              alt={movie.title}
              className="mb-2 w-full"
            />
            <h3 className="font-bold text-sm">{movie.title}</h3>
            <p className="text-xs">{movie.overview.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionMovies;
