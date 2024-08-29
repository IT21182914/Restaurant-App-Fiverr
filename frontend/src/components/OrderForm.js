import React, { useState } from "react";
import axios from "axios";

const OrderForm = ({ menuItems = [] }) => {
  const [order, setOrder] = useState({
    items: [],
    tableNumber: "",
    specialInstructions: "",
  });

  const handleItemChange = (e, itemId) => {
    const quantity = e.target.value;
    setOrder((prevOrder) => {
      const items = prevOrder.items.filter((item) => item.menuItem !== itemId);
      if (quantity > 0) {
        items.push({ menuItem: itemId, quantity: Number(quantity) });
      }
      return { ...prevOrder, items };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/orders", order)
      .then((response) => alert("Order placed successfully!"))
      .catch((error) => console.error("Error placing order:", error));
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Place an Order</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Table Number</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          value={order.tableNumber}
          onChange={(e) => setOrder({ ...order, tableNumber: e.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Special Instructions</label>
        <textarea
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          value={order.specialInstructions}
          onChange={(e) =>
            setOrder({ ...order, specialInstructions: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Menu Items</h3>
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between mb-2"
            >
              <span>{item.name}</span>
              <input
                type="number"
                min="0"
                className="w-16 px-2 py-1 border rounded-lg focus:outline-none focus:border-blue-500"
                onChange={(e) => handleItemChange(e, item._id)}
              />
            </div>
          ))
        ) : (
          <p>No menu items available.</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Place Order
      </button>
    </form>
  );
};

export default OrderForm;
