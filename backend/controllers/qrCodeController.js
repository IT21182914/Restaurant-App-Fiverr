const QRCode = require("qrcode");

// Generate a QR code for a table
exports.generateQRCode = async (req, res) => {
  const { tableNumber } = req.body;
  const url = `https://your-restaurant.com/menu/${tableNumber}`;

  try {
    const qrCodeDataUrl = await QRCode.toDataURL(url);
    res.json({ tableNumber, qrCode: qrCodeDataUrl });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate QR code" });
  }
};
