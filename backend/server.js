const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use("/api/menu", require("./routes/menu"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/users", require("./routes/user"));
app.use("/api/qrcode", require("./routes/qrCode"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`\nServer running on port ${PORT} 🔥`));
