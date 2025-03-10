import { Link } from 'react-router';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex space-x-4 max-w-7xl mx-auto">
        <li>
          <Link to="/" className="text-white hover:text-gray-200 hover:bg-blue-700 p-4 font-bold">
            Управление курсами
          </Link>
        </li>
        <li>
          <Link to="/statistics" className="text-white hover:text-gray-200 hover:bg-blue-700 p-4 font-bold">
            Статистика
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
