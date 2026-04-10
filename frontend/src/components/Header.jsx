import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  // Hide these links only on the home page
  const hideLinks = location.pathname === '/';

  return (
    <nav className="bg-white text-black px-16 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 via-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold">
          E
        </div>
        <span className="text-xl font-extrabold text-black">EventVerse</span>
      </Link>

      {/* Navigation Links */}
      {!hideLinks && (
        <ul className="flex list-none ml-auto items-center gap-6">
          <li>
            <Link to="/" className="flex items-center gap-1 text-black no-underline hover:opacity-75 transition-opacity">
              🏠 Home
            </Link>
          </li>
          <li>
            <Link to="/clubs" className="flex items-center gap-1 text-black no-underline hover:opacity-75 transition-opacity">
              👥 Clubs
            </Link>
          </li>
          <li>
            <Link to="/events" className="flex items-center gap-1 text-black no-underline hover:opacity-75 transition-opacity">
              📅 Events
            </Link>
          </li>
          <li>
            <Link to="/profile" className="flex items-center gap-1 text-black no-underline hover:opacity-75 transition-opacity">
              � Profile
            </Link>
          </li>
           <li>
            <Link to="/notifications" className="flex items-center gap-1 text-black no-underline hover:opacity-75 transition-opacity">
              Notifications
            </Link>
          </li>
           <li>
            <Link to="/Certificates" className="flex items-center gap-1 text-black no-underline hover:opacity-75 transition-opacity">
              Certificates
            </Link>
          </li>
          <li>
            <Link to="/Admin" className="flex items-center gap-1 text-black no-underline hover:opacity-75 transition-opacity">
              Admin
            </Link>
          </li>
        </ul>
      )}

      {/* Login/Register Buttons */}
     
    </nav>
  );
};