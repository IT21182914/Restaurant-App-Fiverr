const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");

// Create a new order
exports.createOrder = async (req, res) => {
  const { items, tableNumber, specialInstructions } = req.body;

  try {
    console.log("Request body:", req.body);

    // Fetch prices for each menuItem
    let totalAmount = 0;
    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem) {
        return res.status(404).json({ message: "MenuItem not found" });
      }
      totalAmount += menuItem.price * item.quantity;
    }

    const newOrder = new Order({
      items,
      totalAmount,
      tableNumber,
      specialInstructions,
    });

    const savedOrder = await newOrder.save();
    console.log("Order saved:", savedOrder);

    // Update sales count for each ordered item
    for (const item of items) {
      await MenuItem.findByIdAndUpdate(item.menuItem, {
        $inc: { salesCount: item.quantity },
      });
    }

    res.json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.menuItem");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
