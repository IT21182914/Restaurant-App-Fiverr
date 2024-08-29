import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUtensils, FaDollarSign } from "react-icons/fa";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <h2 className="text-3xl font-extrabold mb-10 text-center text-indigo-600">
        <FaUtensils className="inline-block mr-2" />
        Orders
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-2xl"
          >
            <h3 className="text-xl font-bold mb-3 text-indigo-700">
              Table: {order.tableNumber}
            </h3>
            <p className="text-gray-500 mb-4 italic">
              {order.specialInstructions ? (
                <>
                  Special Instructions:{" "}
                  <span className="font-medium text-gray-800">
                    {order.specialInstructions}
                  </span>
                </>
              ) : (
                "No special instructions"
              )}
            </p>
            <h4 className="text-lg font-semibold mb-3 text-indigo-600">
              Items:
            </h4>
            <ul className="mb-4 space-y-2">
              {order.items.map((item) => (
                <li
                  key={item.menuItem}
                  className="flex justify-between items-center text-gray-800"
                >
                  <span>
                    {item.quantity}x {item.menuItem.name}
                  </span>
                  <span className="text-gray-500">${item.menuItem.price}</span>
                </li>
              ))}
            </ul>
            <p className="text-2xl font-bold text-green-600 flex items-center">
              <FaDollarSign className="mr-1" />
              {order.totalAmount.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
