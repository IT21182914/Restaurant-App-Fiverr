import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">
              Table: {order.tableNumber}
            </h3>
            <p className="text-gray-600 mb-2">
              Special Instructions: {order.specialInstructions}
            </p>
            <h4 className="font-semibold mb-2">Items:</h4>
            <ul>
              {order.items.map((item) => (
                <li key={item.menuItem} className="text-gray-700">
                  {item.quantity}x {item.menuItem.name}
                </li>
              ))}
            </ul>
            <p className="text-blue-600 font-bold mt-4">
              Total: ${order.totalAmount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
