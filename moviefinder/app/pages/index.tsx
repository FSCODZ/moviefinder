"use client";
import { useState } from 'react';
import MovieModal from '../components/MovieModal';

// Du behöver också inkludera typerna för Movie och ShowDetails
interface Actor {
  id: number;
  name: string;
  profile_path: string;
}

interface CrewMember {
  id: number;
  name: string;
}

interface Movie {
  id: number; // Lägg till id-fältet här
  title: string;
  poster_path?: string;
  overview?: string;
  release_date?: string;
  genres: { name: string }[];
  cast: Actor[];
  crew: CrewMember[];
}

interface ShowDetails {
  id: number; // Lägg till id-fältet här
  name: string;
  poster_path?: string;
  overview?: string;
  first_air_date?: string; // Används istället för release_date
  genres: { name: string }[];
  cast: Actor[];
  crew: CrewMember[];
}

// Gemensam typ
type MovieOrShowDetails = Movie | ShowDetails;

const MovieList = ({ movies }: { movies: Movie[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieOrShowDetails | null>(null); // Ändrat här

  const openModal = (movie: Movie) => {
    // Mappa om till den gemensamma typen
    const movieDetails: MovieOrShowDetails = {
      id: movie.id,
      title: movie.title,
      overview: movie.overview || "No description available.",
      release_date: movie.release_date || "No release date available.",
      genres: movie.genres,
      cast: movie.cast,
      crew: movie.crew,
      poster_path: movie.poster_path,
    };
    
    setSelectedMovie(movieDetails); // Sätta den gemensamma typen
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id} onClick={() => openModal(movie)}>
          <h3>{movie.title}</h3>
        </div>
      ))}
      <MovieModal
        isOpen={isModalOpen}
        movie={selectedMovie || undefined}
        onRequestClose={closeModal}
      />
    </div>
  );
};

export default MovieList;
