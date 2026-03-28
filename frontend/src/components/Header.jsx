import { Link } from 'react-router-dom';

export const Header = () => (
    <nav className="bg-gradient-to-r from-blue-950 to-blue-800 text-white px-16 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-white no-underline">
            🎓 <span>EventVerse</span>
        </Link>

        <ul className="flex list-none">
            <li><Link to="/" className="text-white ml-6 no-underline hover:opacity-75 transition-opacity">Home</Link></li>
            <li><Link to="/clubs" className="text-white ml-6 no-underline hover:opacity-75 transition-opacity">Clubs</Link></li>
            <li><Link to="/events" className="text-white ml-6 no-underline hover:opacity-75 transition-opacity">Events</Link></li>
        </ul>

        <div className="flex space-x-4">
            <Link to="/login">
                <button className="border border-white px-4 py-2 rounded-full bg-transparent text-white hover:bg-white hover:text-blue-950 transition-colors">
                    Login
                </button>
            </Link>
            <Link to="/register">
                <button className="border border-white px-4 py-2 rounded-full bg-transparent text-white hover:bg-white hover:text-blue-950 transition-colors">
                    Register
                </button>
            </Link>
        </div>
    </nav>
)