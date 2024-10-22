"use client";
// pages/index.tsx
import { useState } from 'react';
import MovieModal from '../components/MovieModal';

interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
}

const MovieList = ({ movies }: { movies: Movie[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
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
        onRequestClose={closeModal}
        movie={selectedMovie}
      />
    </div>
  );
};

export default MovieList;
