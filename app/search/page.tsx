"use client"; 
import { useSearchParams } from 'next/navigation'; 
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieModal from '../components/MovieModal'; 

const API_KEY = "dbeeb30a06089bf15dbac384b5baa25a"; 

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query'); 
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedMovie, setSelectedMovie] = useState(null); 

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: {
              api_key: API_KEY,
              query: query,
              language: "en-US",
            },
          });
          setSearchResults(response.data.results);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    };

    fetchSearchResults();
  }, [query]); 

  // Funktion för att öppna modal och visa filmens detaljer
  const openModal = async (movie) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          append_to_response: "credits", 
        },
      });

      const movieDetails = {
        id: response.data.id,
        title: response.data.title,
        description: response.data.overview || "No description available.", 
        releaseDate: response.data.release_date || "No release date available.", 
        genres: response.data.genres.map((genre) => genre.name), 
        cast: response.data.credits.cast.slice(0, 5), 
        crew: response.data.credits.crew.slice(0, 5), 
        posterPath: response.data.poster_path 
      };

      setSelectedMovie(movieDetails);
      setIsModalOpen(true); // Öppna modalen
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
      <h2 className="text-3xl font-bold mb-6">Search Results for: {query}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {searchResults.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded overflow-hidden shadow-lg p-2 cursor-pointer"
            onClick={() => openModal(movie)} 
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

      {/* Modal för att visa filminformation */}
      <MovieModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        movie={selectedMovie}
      />
    </div>
  );
};

export default SearchResultsPage;
