"use client"; // Markera denna komponent som en klientkomponent
import React from 'react';
import Link from 'next/link';

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
          <Link href="/comedi-movies" className="text-white text-xl font-semibold">
            Comedy
          </Link>
          <Link href="/genre" className="text-white text-xl font-semibold">
            Genre
          </Link>
          <Link href="/tv-genre" className="text-white text-xl font-semibold">
            TV Shows
          </Link> {/* Ny länk för TV-serier */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
