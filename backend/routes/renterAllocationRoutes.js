const express = require("express");
const router = express.Router();
const multer = require("multer");
const pool = require("../config/db");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
// const bodyParser = require("body-parser");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "renter_allocations", // Cloudinary folder name
    allowed_formats: ["jpeg", "jpg", "png", "pdf"],
  },
});

const upload = multer({ storage: storage });

// GET all allocations
router.get("/", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM renter_allocation");
    res.json(results);
  } catch (err) {
    console.error("Error fetching allocations:", err);
    res.status(500).json({ error: "Failed to fetch allocations" });
  }
});

// GET allocation by ID
router.get("/:id", async (req, res) => {
  try {
    const allocationId = req.params.id;
    const [result] = await pool.query(
      "SELECT * FROM renter_allocation WHERE id = ?",
      [allocationId]
    );
    if (result.length === 0) {
      return res.status(404).json({ error: "Allocation not found" });
    }
    res.json(result[0]);
  } catch (err) {
    console.error("Error fetching allocation:", err);
    res.status(500).json({ error: "Failed to fetch allocation" });
  }
});

// POST create allocation
router.post(
  "/",
  upload.fields([
    { name: "agreementDocument", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("THIS ONE ");
      console.log("Request Body:", req.body); // Log request body to verify parsing
      console.log("Uploaded Files:", req.files); // Log files to check upload

      // Extract data from req.body
      const {
        renter_id,
        property_id,
        childproperty_id,
        allocation_date,
        rent_agreement,
        other_document,
        remarks,
        status,
      } = req.body;

      // Extract file paths if uploaded
      const agreementDocument = req.files?.agreementDocument?.[0]?.path || null;
      const idProof = req.files?.idProof?.[0]?.path || null;

      // SQL query
      const insertQuery = `
        INSERT INTO renter_allocation 
          (renter_id, property_id, childproperty_id, allocation_date, rent_agreement, other_document, remarks, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await pool.query(insertQuery, [
        renter_id,
        property_id,
        childproperty_id,
        allocation_date,
        agreementDocument,
        idProof,
        remarks,
        status,
      ]);

      res.status(201).json({ message: "Allocation created successfully" });
    } catch (error) {
      console.error("Error inserting allocation:", error);
      res.status(500).json({ error: "Failed to create allocation" });
    }
  }
);

// PUT update allocation
// router.put("/:id", async (req, res) => {
//   try {
//     const allocationId = req.params.id;
//     // const { renterId, propertyId, rentAmount, startDate, endDate } = req.body;
//     const {
//       renter_id,
//       property_id,
//       childproperty_id,
//       allocation_date,
//       rent_agreement,
//       other_document,
//       remarks,
//       status,
//     } = req.body;

//     const updateQuery = `
//       UPDATE renter_allocation
//       SET renter_id = ?, property_id = ?,childproperty_id=?,allocation_date=?,  rent_agreement=?, other_document=?,remarks=?,status=?
//       WHERE id = ?
//     `;
//     console.log("Request Body", req.body);
//     const [result] = await pool.query(updateQuery, [
//       renter_id,
//       property_id,
//       childproperty_id,
//       allocation_date,
//       rent_agreement,
//       other_document,
//       remarks,
//       status,
//       allocationId,
//     ]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Allocation not found" });
//     }
//     res.status(200).json({ message: "Allocation updated successfully" });
//   } catch (err) {
//     console.error("Error updating allocation:", err);
//     res.status(500).json({ error: "Failed to update allocation" });
//   }
// });
// PUT update allocation
router.put(
  "/:id",
  upload.fields([
    { name: "agreementDocument", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("Request Body:", req.body); // This should now have values

      const allocationId = req.params.id;
      const {
        renter_id,
        property_id,
        childproperty_id,
        allocation_date,
        remarks,
        status,
      } = req.body;

      // Make sure we have the required fields
      if (!renter_id || !property_id) {
        return res.status(400).json({
          error:
            "Required fields missing (renter_id and property_id are required)",
        });
      }

      // Extract file paths if uploaded
      const agreementDocument = req.files?.agreementDocument?.[0]?.path || null;
      const idProof = req.files?.idProof?.[0]?.path || null;

      // Only update fields that were provided or use existing values
      const updateQuery = `
        UPDATE renter_allocation 
        SET renter_id = ?,
            property_id = ?,
            childproperty_id = ?,
            allocation_date = ?,
            rent_agreement = COALESCE(?, rent_agreement),
            other_document = COALESCE(?, other_document),
            remarks = ?,
            status = ?
        WHERE id = ?
      `;

      const [result] = await pool.query(updateQuery, [
        renter_id,
        property_id,
        childproperty_id || null,
        allocation_date || null,
        agreementDocument, // Will use existing value if null
        idProof, // Will use existing value if null
        remarks || null,
        status || "Active",
        allocationId,
      ]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Allocation not found" });
      }
      res.status(200).json({ message: "Allocation updated successfully" });
    } catch (err) {
      console.error("Error updating allocation:", err);
      res.status(500).json({ error: "Failed to update allocation" });
    }
  }
);
// DELETE allocation
router.delete("/:id", async (req, res) => {
  try {
    const allocationId = req.params.id;
    const deleteQuery = "DELETE FROM renter_allocation WHERE id = ?";

    const [result] = await pool.query(deleteQuery, [allocationId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Allocation not found" });
    }
    res.status(200).json({ message: "Allocation deleted successfully" });
  } catch (err) {
    console.error("Error deleting allocation:", err);
    res.status(500).json({ error: "Failed to delete allocation" });
  }
});

module.exports = router;
