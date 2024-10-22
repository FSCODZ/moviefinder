import React from "react";
import Modal from "react-modal";

const MovieModal = ({ isOpen, onRequestClose, movie }) => {
  if (!movie) return null; // Om ingen film är vald, returnera inget

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      className="bg-gray-800 text-yellow-400 p-5 rounded-lg w-full h-full md:w-3/4 md:h-auto overflow-y-auto" // Täck hela skärmen på mobil
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
    >
      <button onClick={onRequestClose} className="text-red-500 mb-4">
        Close
      </button>
      <div className="flex flex-col lg:flex-row">
        {/* Filmens bild */}
        {movie.posterPath && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
            alt={movie.title}
            className="border-t-5 border-b-5 border-gray-700 rounded-[5px] inline-block h-[400px] w-[250px] object-cover mb-4" // Justera storlek på bilden
          />
        )}

        {/* Filmens information */}
        <div className="ml-4 flex flex-col text-white">
          <h2 className="text-4xl font-bold text-yellow-400 mb-2">{movie.title}</h2>
          <h3 className="text-2xl text-yellow-400 font-semibold mb-1">Overview</h3>
          <p className="text-lg mb-2">{movie.description}</p>
          <p className="text-lg text-yellow-400">
            <strong>Released:</strong> {movie.releaseDate}
          </p>
          <p className="text-lg text-yellow-400">
            <strong>Genres:</strong> {movie.genres.join(", ")}
          </p>

          <h3 className="mt-4 font-bold text-xl text-yellow-400">Cast:</h3>
          <div className="flex overflow-x-auto space-x-2 py-2">
            {movie.cast.map((actor) => (
              <div key={actor.id} className="flex flex-col items-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                  className="w-20 h-28 object-cover rounded-full mb-1" // Justera storlek på skådespelarbilder
                />
                <p className="text-center text-sm">{actor.name}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-4 font-bold text-xl text-yellow-400">Crew:</h3>
          <p className="text-lg">
            {movie.crew.map((member) => member.name).join(", ")}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default MovieModal;
