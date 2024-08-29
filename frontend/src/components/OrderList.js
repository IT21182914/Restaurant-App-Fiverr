import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUtensils, FaListAlt } from "react-icons/fa";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const markAsCompleted = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, {
        status: "Completed",
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "Completed" } : order
        )
      );
    } catch (error) {
      console.error("Error marking order as completed:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-6">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-indigo-600 flex justify-center items-center space-x-3">
        <FaUtensils className="w-8 h-8 text-indigo-600" />
        <span>Orders</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className={`bg-white p-6 rounded-xl shadow-xl transform transition-transform duration-300 ease-in-out hover:shadow-2xl ${
              order.status === "Completed"
                ? "border-2 border-green-500"
                : "border-2 border-red-500"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-indigo-700">
                Table: {order.tableNumber}
              </h3>
              {order.status === "Completed" ? (
                <FaUtensils className="text-green-500 w-6 h-6" />
              ) : (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 shadow-lg transition-all transform hover:scale-105"
                  onClick={() => markAsCompleted(order._id)}
                >
                  Mark as Completed
                </button>
              )}
            </div>
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
              {order.items.length > 0 ? (
                order.items.map((item) => (
                  <li
                    key={item.menuItem}
                    className="flex justify-between items-center text-gray-800"
                  >
                    <span>
                      {item.quantity}x {item.menuItem.name}
                    </span>
                    <span className="text-gray-500">
                      ${item.menuItem.price}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No items</li>
              )}
            </ul>
            <p
              className={`text-2xl font-bold flex items-center ${
                order.status === "Completed" ? "text-green-600" : "text-red-600"
              }`}
            >
              {order.status === "Completed" ? "Total: " : "Pending: "}$
              {order.totalAmount.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
