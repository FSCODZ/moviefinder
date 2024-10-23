"use client"; // Markera denna komponent som klientkomponent

import { useRouter } from 'next/router';  
import { useEffect, useState } from 'react';

// Definiera typer för Movie och Actor
interface Movie {
  poster_path: string;
  title: string;
  release_date: string;
  genres: { name: string }[];
  overview: string;
}

interface Actor {
  cast_id: number;
  profile_path: string;
  name: string;
}

const MovieDetails = () => {
  const router = useRouter();
  const { id } = router.query;  // Hämtar ID från URL 
  
  const [movie, setMovie] = useState<Movie | null>(null);  // Lagrar filmdata med korrekt typ
  const [cast, setCast] = useState<Actor[]>([]);  // Lagrar skådespelarlistan

  useEffect(() => {
    if (id) {
      fetchMovieDetails(id as string);  // Typen 'string' för id
      fetchCastDetails(id as string);  // Typen 'string' för id
    }
  }, [id]);

  // Funktion för att hämta filmens detaljer
  const fetchMovieDetails = async (movieId: string) => {  // Ange typen 'string' för movieId
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=YOUR_API_KEY`);
    const data = await res.json();
    setMovie(data);
  };

  // Funktion för att hämta skådespelarna
  const fetchCastDetails = async (movieId: string) => {  // Ange typen 'string' för movieId
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=YOUR_API_KEY`);
    const data = await res.json();
    setCast(data.cast);
  };

  if (!movie) return <div>Loading...</div>;  

  return (
    <div className="container mx-auto p-4">
      {/* Filmens bild och detaljer */}
      <div className="flex flex-col md:flex-row">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3"
        />
        <div className="md:ml-6">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Genre:</strong> {movie.genres.map((g: { name: string }) => g.name).join(', ')}</p>
          <p><strong>Overview:</strong> {movie.overview}</p>
        </div>
      </div>

      {/* Skådespelarlista */}
      <h2 className="text-2xl mt-8 mb-4">Actors</h2>
      <div className="flex overflow-x-auto space-x-4">
        {cast.map((actor) => (
          <div key={actor.cast_id} className="min-w-[120px]">
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className="w-full rounded-md"
            />
            <p className="text-center">{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
