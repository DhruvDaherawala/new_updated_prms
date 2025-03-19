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

// CORS setup with improved configuration for Vercel deployment
const allowedOrigins = [
  process.env.FRONT_URL || "http://localhost:3000",
  "https://new-updated-layout.vercel.app", // Add your frontend Vercel URL
  /\.vercel\.app$/ // Allow all vercel.app subdomains
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);
      
      // Check if origin is allowed
      if (allowedOrigins.some(allowedOrigin => {
        if (typeof allowedOrigin === 'string') {
          return allowedOrigin === origin;
        }
        return allowedOrigin.test(origin);
      })) {
        return callback(null, true);
      }
      
      callback(new Error('Not allowed by CORS'));
    },
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    message: "Internal server error", 
    error: process.env.NODE_ENV === 'production' ? null : err.message 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
