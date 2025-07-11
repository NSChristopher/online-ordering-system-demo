const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./db");

// Import routes
const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/orders");
const businessRoutes = require("./routes/business");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/business", businessRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ message: "Online Ordering System Backend is running!" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Online Ordering System running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  db.$disconnect();
  process.exit(0);
});

module.exports = app;
