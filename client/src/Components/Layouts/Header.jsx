import logo from "/images/logo2.png";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Login from "../../Pages/AuthPages/Login";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
   const [isLoginOpen, setLoginOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const linkClasses = (path) =>
    `relative pb-1  !no-underline text-black font-semibold heading-font 
     ${
       isActive(path)
         ? "md:border-b-3 border-green-600 !text-green-600"
         : "hover:md:border-b-3 hover:border-green-600 hover:!text-green-600"
     }`;

  return (
    <header className="bg-light shadow-sm">
      <div className="relative w-full flex items-center justify-between px-4 py-3 md:!px-24">
        <div className="z-10">
          <Link to="/" className="flex items-center !no-underline">
            <img src={logo} alt="Logo" className="w-48 h-auto" />
          </Link>
        </div>

        <div className="hidden md:flex absolute mt-3 left-1/2 -translate-x-1/2 items-center gap-8">
          <ul className="flex gap-5">
            <li>
              <Link to="/" className={linkClasses("/")}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={linkClasses("/about")}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className={linkClasses("/contact")}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="z-10 flex items-center gap-4">
          <div className="hidden md:block">
           <div>
            <button
              onClick={() => setLoginOpen(true)}
              className="green-button px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Login
            </button>

            {isLoginOpen && <Login onClose={() => setLoginOpen(false)} />}
          </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="!text-2xl text-green-600 focus:outline-none"
            >
              {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col  px-5 pb-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className={linkClasses("/")}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className={linkClasses("/about")}
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className={linkClasses("/contact")}
          >
            Contact
          </Link>
          <div>
            <button
              onClick={() => setLoginOpen(true)}
              className="green-button px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Login
            </button>

            {isLoginOpen && <Login onClose={() => setLoginOpen(false)} />}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
