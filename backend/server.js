// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
const multer = require("multer");

const upload = multer(); // This allows handling multipart form data

// Routes
const authRoutes = require("./routes/auth.routes");
const propertyRoutes = require("./routes/propertyRoutes");
const renterRoutes = require("./routes/renterRoutes");
const renterAllocationRoutes = require("./routes/renterAllocationRoutes");
const childPropertyRoutes = require("./routes/childPropertyRoutes");
const rentDepositRoutes = require("./routes/rentDepositRoutes");

const app = express();
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());
// app.use(upload.none());
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup – ensure FRONT_URL in .env matches your frontend URL.
app.use(
  cors({
    origin: process.env.FRONT_URL || "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Serve static files from "uploads"
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/renter", renterRoutes);
app.use("/api/allocations", renterAllocationRoutes);
app.use("/api/child_property", childPropertyRoutes);
app.use("/api/rent-deposit", rentDepositRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
