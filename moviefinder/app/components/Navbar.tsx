import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul style={{ display: 'flex', gap: '1rem' }}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/action-movies">Action Movies</Link>
        </li>
        <li>
          <Link href="/romantic-movies">Romantic Movies</Link>
        </li>
        <li>
          <Link href="/comedy-movies">Comedy Movies</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
