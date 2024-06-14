import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="flex justify-between items-center py-5 sm:px-24 px-12 border-b border-gray-400 mb-16">
      <Link to="/"
      className="text-4xl font-bold">Blog
      </Link>
      <Link to="/login"
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Login
      </Link>
    </nav>
  );
}

export default Header;
