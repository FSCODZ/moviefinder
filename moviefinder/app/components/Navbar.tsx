"use client"; // Markera denna komponent som en klientkomponent
import React, { useState } from "react";
import { useRouter } from 'next/navigation'; // Importera för navigation

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Sökfråga
  const router = useRouter(); // För att navigera

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigera till sökresultatsidan med sökfrågan som query-param
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Funktion för att lyssna på tangenttryck i sökrutan
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigga sökningen när "Enter" trycks
    }
  };

  return (
    <nav className="bg-darkblue p-5">
      <div className="flex flex-wrap items-center justify-between">
        {/* Flexbox-rad som är responsiv */}
        <div className="flex items-center gap-5 mb-4 md:mb-0">
          <a href="/" className="text-yellow-400 text-xl font-semibold">
            Moviefinder
          </a>
          {/* Genre och TV Shows knapparna nu bredvid titeln */}
          <a href="/genre" className="text-yellow-400 text-xl font-semibold hidden md:block transition duration-200 hover:text-yellow-500">
            Genre
          </a>
          <a href="/tv-genre" className="text-yellow-400 text-xl font-semibold hidden md:block transition duration-200 hover:text-yellow-500">
            TV Shows
          </a>
        </div>

        <div className="flex items-center w-full md:w-auto">
          {/* Sökruta */}
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="p-2 w-full md:w-auto rounded-l-lg text-black"
          />
          <button
            onClick={handleSearch}
            className="bg-yellow-400 p-2 rounded-r-lg text-black transition duration-200 hover:bg-yellow-500 hover:shadow-lg"
          >
            Search
          </button>
        </div>

        {/* Visar Genre och TV Shows knapparna på mobila enheter */}
        <div className="flex gap-5 items-center mt-4 md:hidden">
          <a href="/genre" className="text-yellow-400 text-xl font-semibold transition duration-200 hover:text-yellow-500">
            Genre
          </a>
          <a href="/tv-genre" className="text-yellow-400 text-xl font-semibold transition duration-200 hover:text-yellow-500">
            TV Shows
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
