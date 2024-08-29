import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Restaurant Order Management</h1>
        <nav>
          <Link className="mr-6 hover:text-gray-300" to="/">
            Home
          </Link>
          <Link className="hover:text-gray-300" to="/orders">
            Orders
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
