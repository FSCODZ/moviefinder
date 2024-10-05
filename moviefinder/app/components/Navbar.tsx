"use client"; // Markera denna komponent som en klientkomponent
import React from 'react';
import Link from 'next/link';
import axios from 'axios';

const API_KEY = 'dbeeb30a06089bf15dbac384b5baa25a'; // Din TMDb API-nyckel
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Bas-URL för TMDb bilder

const Navbar = () => {
  return (
    <nav className="bg-darkblue p-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          
          <Link href="/" className="text-white text-xl font-semibold">
            Moviefinder
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <Link href="/action-movies" className="text-white text-xl font-semibold">
            Action
          </Link>
          <Link href="/romantic-movies" className="text-white text-xl font-semibold">
            Romance
          </Link>
          <Link href="/comedy-movies" className="text-white text-xl font-semibold">
            Comedy
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
