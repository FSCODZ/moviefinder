"use client"; // Markera denna komponent som en klientkomponent
import React, { useEffect, useState } from 'react';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null; // Det kan vara null om det inte finns någon bild
}

const RomanticMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // Använd den definierade typen
  const API_KEY = 'dbeeb30a06089bf15dbac384b5baa25a'; // Din API-nyckel

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`); // Genre-ID för romantiska filmer
        if (!response.ok) {
          throw new Error('Något gick fel med fetch-anropet');
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Fel vid hämtning av filmer:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Romantic Movies</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <li key={movie.id} className="border p-4">
            <img 
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/path/to/placeholder-image.jpg'} 
              alt={movie.title} 
              className="mb-2" 
            />
            <h3 className="font-bold">{movie.title}</h3>
            <p>{movie.overview}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RomanticMovies;
