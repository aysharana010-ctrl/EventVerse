import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Hide nav links only on the home page
  const hideLinks = location.pathname === '/';

  function handleLogout() {
    logout();
    navigate('/login');
  }

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

          {user ? (
            <>
              <li>
                <Link to="/profile" className="flex items-center gap-1 text-black no-underline hover:opacity-75 transition-opacity">
                  👤 Profile
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
              {user.role === 'club_head' && (
                <li>
                  <Link to="/Admin" className="flex items-center gap-1 text-black no-underline hover:opacity-75 transition-opacity">
                    Admin
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:underline"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="flex items-center gap-1 text-black no-underline hover:opacity-75 transition-opacity">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="flex items-center gap-1 text-black no-underline hover:opacity-75 transition-opacity">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};
