import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        The Dojo Blog
      </Link>
      <div className="links">
        <Link to="/">home</Link>
        <Link to="/create">New blog</Link>
      </div>
    </nav>
  );
};

export default Navbar;
