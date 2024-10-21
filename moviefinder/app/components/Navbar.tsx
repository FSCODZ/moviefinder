"use client"; // Markera denna komponent som en klientkomponent
import React, { useState } from "react";
import { useRouter } from 'next/navigation'; // Importera för navigation
import axios from "axios";

const API_KEY = "dbeeb30a06089bf15dbac384b5baa25a"; // Din API-nyckel

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Sökfråga
  const router = useRouter(); // För att navigera

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigera till sökresultatsidan med sökfrågan som query-param
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-darkblue p-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <a href="/" className="text-yellow-400 text-xl font-semibold">
            Moviefinder
          </a>
        </div>

        <div className="flex items-center gap-5">
          <a href="/genre" className="text-yellow-400 text-xl font-semibold">
            Genre
          </a>
          <a href="/tv-genre" className="text-yellow-400 text-xl font-semibold">
            TV Shows
          </a>

          {/* Sökruta */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search for a movie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 rounded-l-lg text-black"
            />
            <button
              onClick={handleSearch}
              className="bg-yellow-400 p-2 rounded-r-lg text-black"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
