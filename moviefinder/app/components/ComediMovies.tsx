"use client"; // Markera denna komponent som en klientkomponent
import React, { useEffect, useState } from 'react';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null; // Det kan vara null om det inte finns någon bild
  popularity: number; // Lägg till popularity-fältet för sortering
}

const ComediMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // Använd den definierade typen
  const API_KEY = 'dbeeb30a06089bf15dbac384b5baa25a'; // Din API-nyckel
  const [page, setPage] = useState(1); // State för att hålla koll på sidnummer
  const totalPages = 3; // Hur många sidor du vill hämta (justera efter behov)

  useEffect(() => {
    const fetchMovies = async (pageNumber: number) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35&sort_by=popularity.desc&page=${pageNumber}`
        ); // Lägg till sidnummer i API-förfrågan
        if (!response.ok) {
          throw new Error('Något gick fel med fetch-anropet');
        }
        const data = await response.json();
        
        setMovies(prevMovies => [...prevMovies, ...data.results]); // Kombinera tidigare filmer med nya
      } catch (error) {
        console.error('Fel vid hämtning av filmer:', error);
      }
    };

    // Hämta filmer för varje sida upp till totalPages
    for (let i = 1; i <= totalPages; i++) {
      fetchMovies(i);
    }
  }, []);

  return (
    <div>
      <h2>Comedy Movies</h2>
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2"> {/* Justera grid layout */}
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

export default ComediMovies;
