// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
const multer = require("multer");
const pool = require("./config/db");

const upload = multer(); // This allows handling multipart form data
const router = express.Router();

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

// allocation-due
app.get("/due-renters", async (req, res) => {
  try {
    const query = `
      SELECT 
        ra.*, 
        r.*,
        DATEDIFF(CURDATE(), ra.allocation_date) as days_since_allocation,
        CASE 
          WHEN DATEDIFF(CURDATE(), ra.allocation_date) >= 30 THEN 'overdue'
          WHEN DATEDIFF(CURDATE(), ra.allocation_date) >= 20 THEN 'due_soon'
          WHEN DATEDIFF(CURDATE(), ra.allocation_date) >= -7 THEN 'upcoming'
          ELSE 'normal'
        END as rent_status
      FROM renter_allocation ra
      INNER JOIN renters r ON ra.renter_id = r.id
      WHERE 
        DATEDIFF(CURDATE(), ra.allocation_date) >= 20
        OR DATEDIFF(CURDATE(), ra.allocation_date) >= -7
      ORDER BY ra.allocation_date ASC;
    `;

    const [rows] = await pool.query(query);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching due allocations:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
