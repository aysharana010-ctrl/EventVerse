import { Link } from 'react-router-dom';

export const Header = () => (
    <nav className="bg-white text-black px-16 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-black no-underline">
            🎓 <span>EventVerse</span>
        </Link>
        <ul className="flex list-none">
            <li>
  <Link to="/" className="text-black ml-6 no-underline hover:opacity-75 transition-opacity">
    Home
  </Link>
</li>
<li>
  <Link to="/clubs" className="text-black ml-6 no-underline hover:opacity-75 transition-opacity">
    Clubs
  </Link>
</li>
<li>
  <Link to="/events" className="text-black ml-6 no-underline hover:opacity-75 transition-opacity">
    Events
  </Link>
</li>
        </ul>

     
    </nav>
)