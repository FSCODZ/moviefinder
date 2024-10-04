import './globals.css'; // För Tailwind CSS om du använder det
import Navbar from './components/Navbar';
import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode; // Typa children med ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
