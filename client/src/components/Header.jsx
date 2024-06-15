// Header.js
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center py-5 sm:px-24 px-12 border-b border-gray-400 mb-16 bg-green-200">
      <Link to="/" className="text-4xl font-bold">
        Blog
      </Link>
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="bg-white hover:bg-gray-100 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="bg-white hover:bg-gray-100 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Login
        </Link>
      )}
    </nav>
  );
}

export default Header;
