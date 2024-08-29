import React, { useEffect, useState } from "react";
import axios from "axios";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu")
      .then((response) => setMenuItems(response.data))
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-center mb-8">
        <h2 className="text-4xl font-extrabold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse shadow-lg rounded-lg px-4 py-2">
          Menu
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <p className="text-blue-600 font-bold text-lg">${item.price}</p>
            {item.topSeller && (
              <span className="inline-block mt-4 text-white bg-red-500 px-3 py-1 rounded-full text-sm font-semibold">
                Top Seller
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
