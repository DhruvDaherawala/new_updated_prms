// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const pool = require("../config/db");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("cloudinary").v2;
// require("dotenv").config();
// const path = require("path");

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// // Configure Cloudinary storage for Multer
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "renter_allocations", // Cloudinary folder name
//     allowed_formats: ["jpeg", "jpg", "png", "pdf"],
//   },
// });

// // Configure local storage as a fallback
// const localDiskStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });

// // Use local storage if Cloudinary configuration is missing
// const selectedStorage = process.env.CLOUD_NAME ? storage : localDiskStorage;

// // Helper function to create a placeholder file path if needed
// const getDefaultFilePath = (filename = "placeholder.pdf") => {
//   return `uploads/default/${filename}`;
// };

// // File filter to check file types
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|pdf/;
//   const isValidExt = allowedTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );
//   const isValidMime = allowedTypes.test(file.mimetype);
//   isValidExt && isValidMime
//     ? cb(null, true)
//     : cb(new Error("Only JPEG, JPG, PNG, and PDFs are allowed"));
// };

// const upload = multer({
//   storage: selectedStorage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   fileFilter
// }).fields([
//   { name: "rent_agreement", maxCount: 1 },
//   { name: "other_document", maxCount: 1 },
// ]);

// // GET all allocations
// router.get("/", async (req, res) => {
//   try {
//     const [results] = await pool.query("SELECT * FROM renter_allocation ORDER BY allocation_date DESC");
//     res.json(results);
//   } catch (err) {
//     console.error("Error fetching allocations:", err);
//     res.status(500).json({ error: "Failed to fetch allocations" });
//   }
// });

// // GET allocation by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const allocationId = req.params.id;
//     const [result] = await pool.query(
//       "SELECT * FROM renter_allocation WHERE allocation_id = ? OR id = ?",
//       [allocationId, allocationId]
//     );
//     if (result.length === 0) {
//       return res.status(404).json({ error: "Allocation not found" });
//     }
//     res.json(result[0]);
//   } catch (err) {
//     console.error("Error fetching allocation:", err);
//     res.status(500).json({ error: "Failed to fetch allocation" });
//   }
// });

// // POST create allocation
// router.post("/", (req, res) => {
//   upload(req, res, async (err) => {
//     console.log("Request Body:", req.body);
//     console.log("Uploaded Files:", req.files);

//     if (err) {
//       console.error("Multer error:", err);
//       if (err.code === 'LIMIT_UNEXPECTED_FILE') {
//         return res.status(400).json({
//           error: "Unexpected file upload field. Only 'rent_agreement' and 'other_document' are allowed."
//         });
//       }
//       return res.status(400).json({ error: err.message });
//     }

//     try {
//       // Extract data from req.body
//       const {
//         renter_id,
//         property_id,
//         childproperty_id,
//         allocation_date,
//         rent,
//         remarks,
//         status,
//       } = req.body;

//       // Use default document paths if not uploaded
//       const rentAgreementPath = req.files?.rent_agreement?.[0]?.path || getDefaultFilePath("default_agreement.pdf");
//       const otherDocumentPath = req.files?.other_document?.[0]?.path || getDefaultFilePath("default_document.pdf");

//       // SQL query
//       const insertQuery = `
//         INSERT INTO renter_allocation
//           (renter_id, property_id, childproperty_id, allocation_date, rent, rent_agreement, other_document, remarks, status)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//       `;

//       const values = [
//         renter_id,
//         property_id,
//         childproperty_id || null,
//         allocation_date,
//         parseFloat(rent) || 0,
//         rentAgreementPath,
//         otherDocumentPath,
//         remarks || '',
//         status || 'Active',
//       ];

//       console.log("Insertion values:", values);

//       const [result] = await pool.query(insertQuery, values);
//       res.status(201).json({
//         message: "Allocation created successfully",
//         allocation_id: result.insertId
//       });
//     } catch (error) {
//       console.error("Error inserting allocation:", error);
//       res.status(500).json({ error: "Failed to create allocation: " + error.message });
//     }
//   });
// });

// // PUT update allocation
// router.put("/:id", (req, res) => {
//   upload(req, res, async (err) => {
//     console.log("Update Request Body:", req.body);
//     console.log("Update Uploaded Files:", req.files);

//     if (err) {
//       console.error("Multer error during update:", err);
//       if (err.code === 'LIMIT_UNEXPECTED_FILE') {
//         return res.status(400).json({
//           error: "Unexpected file upload field. Only 'rent_agreement' and 'other_document' are allowed."
//         });
//       }
//       return res.status(400).json({ error: err.message });
//     }

//     try {
//       const allocationId = req.params.id;

//       // Get existing allocation to preserve document paths if not updated
//       const [existingAlloc] = await pool.query(
//         "SELECT * FROM renter_allocation WHERE allocation_id = ? OR id = ? LIMIT 1",
//         [allocationId, allocationId]
//       );

//       if (existingAlloc.length === 0) {
//         return res.status(404).json({ error: "Allocation not found" });
//       }

//       const existingAllocation = existingAlloc[0];

//       const {
//         renter_id,
//         property_id,
//         childproperty_id,
//         allocation_date,
//         rent,
//         remarks,
//         status,
//       } = req.body;

//       // Make sure we have the required fields
//       if (!renter_id || !property_id) {
//         return res.status(400).json({
//           error: "Required fields missing (renter_id and property_id are required)",
//         });
//       }

//       // Use the new uploaded file path or keep the existing one
//       const rentAgreementPath = req.files?.rent_agreement?.[0]?.path || existingAllocation.rent_agreement;
//       const otherDocumentPath = req.files?.other_document?.[0]?.path || existingAllocation.other_document;

//       // Only update fields that were provided or use existing values
//       const updateQuery = `
//         UPDATE renter_allocation
//         SET renter_id = ?,
//             property_id = ?,
//             childproperty_id = ?,
//             allocation_date = ?,
//             rent = ?,
//             rent_agreement = ?,
//             other_document = ?,
//             remarks = ?,
//             status = ?,
//             updated_at = CURRENT_TIMESTAMP
//         WHERE allocation_id = ? OR id = ?
//       `;

//       const values = [
//         renter_id,
//         property_id,
//         childproperty_id || null,
//         allocation_date || existingAllocation.allocation_date,
//         parseFloat(rent) || existingAllocation.rent || 0,
//         rentAgreementPath,
//         otherDocumentPath,
//         remarks || existingAllocation.remarks || '',
//         status || existingAllocation.status || 'Active',
//         allocationId,
//         allocationId
//       ];

//       console.log("Update values:", values);

//       const [result] = await pool.query(updateQuery, values);
//       if (result.affectedRows === 0) {
//         return res.status(404).json({ error: "Allocation not found or not updated" });
//       }
//       res.status(200).json({ message: "Allocation updated successfully" });
//     } catch (err) {
//       console.error("Error updating allocation:", err);
//       res.status(500).json({ error: "Failed to update allocation: " + err.message });
//     }
//   });
// });

// // DELETE allocation
// router.delete("/:id", async (req, res) => {
//   try {
//     const allocationId = req.params.id;
//     const deleteQuery = "DELETE FROM renter_allocation WHERE allocation_id = ? OR id = ?";

//     const [result] = await pool.query(deleteQuery, [allocationId, allocationId]);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Allocation not found" });
//     }
//     res.status(200).json({ message: "Allocation deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting allocation:", err);
//     res.status(500).json({ error: "Failed to delete allocation: " + err.message });
//   }
// });

// module.exports = router;

// 02-04-25
const express = require("express");
const router = express.Router();
const multer = require("multer");
const pool = require("../config/db");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "renter_allocations",
    allowed_formats: ["jpeg", "jpg", "png", "pdf"],
  },
});

const localDiskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const selectedStorage = process.env.CLOUD_NAME ? storage : localDiskStorage;

const getDefaultFilePath = (filename = "placeholder.pdf") => {
  return `uploads/default/${filename}`;
};

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const isValidExt = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const isValidMime = allowedTypes.test(file.mimetype);
  isValidExt && isValidMime
    ? cb(null, true)
    : cb(new Error("Only JPEG, JPG, PNG, and PDFs are allowed"));
};

const upload = multer({
  storage: selectedStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
}).fields([
  { name: "rent_agreement", maxCount: 1 },
  { name: "other_document", maxCount: 1 },
]);

// GET all allocations
router.get("/", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT * FROM renter_allocation WHERE status != 'Deleted' ORDER BY allocation_date DESC"
    );
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
      "SELECT * FROM renter_allocation WHERE id = ? AND status != 'Deleted' LIMIT 1", // Changed to 'id'
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

// GET RENTER ALLOCATION DUE DATA
// router.get("/due-renters", async (req, res) => {
//   try {
//     const query = `
//       SELECT ra.*, r.name as renterName
//       FROM renter_allocation ra
//       JOIN renter r ON ra.renter_id = r.id
//       WHERE ra.status = 'Active'
//       AND DATEDIFF(ra.allocation_date, CURDATE()) BETWEEN 0 AND 5
//       ORDER BY ra.allocation_date ASC
//     `;

//     const [rows] = await pool.query(query);
//     res.json({ success: true, data: rows });
//   } catch (error) {
//     console.error("Error fetching due allocations:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// });

// POST create allocation
router.post("/", (req, res) => {
  upload(req, res, async (err) => {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    if (err) {
      console.error("Multer error:", err);
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          error:
            "Unexpected file upload field. Only 'rent_agreement' and 'other_document' are allowed.",
        });
      }
      return res.status(400).json({ error: err.message });
    }

    try {
      const {
        renter_id,
        property_id,
        childproperty_id,
        allocation_date,
        remarks,
        status,
      } = req.body;

      const rentAgreementPath =
        req.files?.rent_agreement?.[0]?.path ||
        getDefaultFilePath("default_agreement.pdf");
      const otherDocumentPath =
        req.files?.other_document?.[0]?.path ||
        getDefaultFilePath("default_document.pdf");

      const insertQuery = `
        INSERT INTO renter_allocation 
          (renter_id, property_id, childproperty_id, allocation_date, rent_agreement, other_document, remarks, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        renter_id,
        property_id,
        childproperty_id || null,
        allocation_date,
        rentAgreementPath,
        otherDocumentPath,
        remarks || "",
        status || "Active",
      ];

      console.log("Insertion values:", values);

      const [result] = await pool.query(insertQuery, values);
      res.status(201).json({
        message: "Allocation created successfully",
        id: result.insertId, // Changed to 'id'
      });
    } catch (error) {
      console.error("Error inserting allocation:", error);
      res
        .status(500)
        .json({ error: "Failed to create allocation: " + error.message });
    }
  });
});

// PUT update allocation
router.put("/:id", (req, res) => {
  upload(req, res, async (err) => {
    console.log("Update Request Body:", req.body);
    console.log("Update Uploaded Files:", req.files);

    if (err) {
      console.error("Multer error during update:", err);
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          error:
            "Unexpected file upload field. Only 'rent_agreement' and 'other_document' are allowed.",
        });
      }
      return res.status(400).json({ error: err.message });
    }

    try {
      const allocationId = req.params.id;

      const [existingAlloc] = await pool.query(
        "SELECT * FROM renter_allocation WHERE id = ? AND status != 'Deleted' LIMIT 1", // Changed to 'id'
        [allocationId]
      );

      if (existingAlloc.length === 0) {
        return res.status(404).json({ error: "Allocation not found" });
      }

      const existingAllocation = existingAlloc[0];

      const {
        renter_id,
        property_id,
        childproperty_id,
        allocation_date,
        remarks,
        status,
      } = req.body;

      if (!renter_id || !property_id) {
        return res.status(400).json({
          error:
            "Required fields missing (renter_id and property_id are required)",
        });
      }

      const rentAgreementPath =
        req.files?.rent_agreement?.[0]?.path ||
        existingAllocation.rent_agreement;
      const otherDocumentPath =
        req.files?.other_document?.[0]?.path ||
        existingAllocation.other_document;

      const updateQuery = `
        UPDATE renter_allocation 
        SET renter_id = ?,
            property_id = ?,
            childproperty_id = ?,
            allocation_date = ?,
            rent_agreement = ?,
            other_document = ?,
            remarks = ?,
            status = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`; // Changed to 'id'

      const values = [
        renter_id,
        property_id,
        childproperty_id || null,
        allocation_date || existingAllocation.allocation_date,
        rentAgreementPath,
        otherDocumentPath,
        remarks || existingAllocation.remarks || "",
        status || existingAllocation.status || "Active",
        allocationId,
      ];

      console.log("Update values:", values);

      const [result] = await pool.query(updateQuery, values);
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "Allocation not found or not updated" });
      }
      res.status(200).json({ message: "Allocation updated successfully" });
    } catch (err) {
      console.error("Error updating allocation:", err);
      res
        .status(500)
        .json({ error: "Failed to update allocation: " + err.message });
    }
  });
});

// DELETE allocation (soft delete)
router.delete("/:id", async (req, res) => {
  try {
    const allocationId = req.params.id;
    const [existingAlloc] = await pool.query(
      "SELECT * FROM renter_allocation WHERE id = ? AND status != 'Deleted' LIMIT 1", // Changed to 'id'
      [allocationId]
    );

    if (existingAlloc.length === 0) {
      return res.status(404).json({ error: "Allocation not found" });
    }

    const updateQuery =
      "UPDATE renter_allocation SET status = 'Deleted', updated_at = CURRENT_TIMESTAMP WHERE id = ?"; // Changed to 'id'
    const [result] = await pool.query(updateQuery, [allocationId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Allocation not found" });
    }
    res.status(200).json({ message: "Allocation soft deleted successfully" });
  } catch (err) {
    console.error("Error deleting allocation:", err);
    res
      .status(500)
      .json({ error: "Failed to delete allocation: " + err.message });
  }
});

module.exports = router;
