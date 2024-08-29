import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-6">
        <h1 className="text-3xl font-extrabold tracking-wide">
          Restaurant<span className="text-yellow-300">App</span>
        </h1>
        <div className="lg:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <nav className="hidden lg:flex space-x-8">
          <Link
            className="hover:text-yellow-300 transition-colors duration-300 text-lg font-semibold"
            to="/"
          >
            Home
          </Link>
          <Link
            className="hover:text-yellow-300 transition-colors duration-300 text-lg font-semibold"
            to="/orders"
          >
            Orders
          </Link>
          <Link
            className="hover:text-yellow-300 transition-colors duration-300 text-lg font-semibold"
            to="/contact"
          >
            Contact
          </Link>
          <Link
            className="hover:text-yellow-300 transition-colors duration-300 text-lg font-semibold"
            to="/about"
          >
            About Us
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-gradient-to-r from-blue-600 to-purple-600 bg-opacity-95 z-50 flex flex-col items-center justify-center space-y-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:hidden`}
      >
        <button
          className="absolute top-6 right-6 text-white focus:outline-none"
          onClick={() => setIsOpen(false)}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <Link
          className="text-white text-2xl font-bold hover:text-yellow-300 transition-colors duration-300"
          onClick={() => setIsOpen(false)}
          to="/"
        >
          Home
        </Link>
        <Link
          className="text-white text-2xl font-bold hover:text-yellow-300 transition-colors duration-300"
          onClick={() => setIsOpen(false)}
          to="/orders"
        >
          Orders
        </Link>
        <Link
          className="text-white text-2xl font-bold hover:text-yellow-300 transition-colors duration-300"
          onClick={() => setIsOpen(false)}
          to="/contact"
        >
          Contact
        </Link>
        <Link
          className="text-white text-2xl font-bold hover:text-yellow-300 transition-colors duration-300"
          onClick={() => setIsOpen(false)}
          to="/about"
        >
          About Us
        </Link>
      </div>
    </header>
  );
};

export default Header;
