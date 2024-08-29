const MenuItem = require("../models/MenuItem");

// Get all menu items
exports.getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new menu item
exports.createMenuItem = async (req, res) => {
  const { name, description, price, imageUrl, topSeller } = req.body;

  try {
    const newItem = new MenuItem({
      name,
      description,
      price,
      imageUrl,
      topSeller,
    });

    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a menu item
exports.updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageUrl, topSeller } = req.body;

  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      id,
      { name, description, price, imageUrl, topSeller },
      { new: true }
    );

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    await MenuItem.findByIdAndDelete(id);
    res.json({ message: "Menu item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Top Sellers
exports.updateTopSellers = async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ salesCount: -1 }).limit(3);

    // Reset all top sellers
    await MenuItem.updateMany({}, { topSeller: false });

    // Set top sellers
    for (const item of items) {
      await MenuItem.findByIdAndUpdate(item._id, { topSeller: true });
    }

    res.json({ message: "Top sellers updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
