// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("cloudinary").v2;
// const path = require("path");
// require("dotenv").config();

// const {
//   getAllAllocations,
//   getAllocationById,
//   createAllocation,
//   updateAllocation,
//   deleteAllocation,
// } = require("../models/renterAllocationModel");

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
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// // Use local storage if Cloudinary configuration is missing
// const selectedStorage = process.env.CLOUD_NAME ? storage : localDiskStorage;

// // Optional file filter to double-check file types
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
//   limits: { fileSize: 5 * 1024 * 1024 }, // Increased to 5MB
//   fileFilter,
// }).fields([
//   { name: "rent_agreement", maxCount: 1 },
//   { name: "other_document", maxCount: 1 },
// ]);

// // Helper function to create a placeholder file path if needed
// const getDefaultFilePath = (filename = "placeholder.pdf") => {
//   return `uploads/default/${filename}`;
// };

// // GET all allocations
// exports.getAllAllocationsController = async (req, res) => {
//   try {
//     const allocations = await getAllAllocations();
//     res.json(allocations);
//   } catch (error) {
//     console.error("Error fetching allocations:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // GET allocation by ID
// exports.getAllocationByIdController = async (req, res) => {
//   try {
//     const allocation = await getAllocationById(req.params.id);
//     if (!allocation) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Allocation not found" });
//     }
//     res.json(allocation);
//   } catch (error) {
//     console.error("Error fetching allocation by ID:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // CREATE allocation
// // exports.createAllocationController = (req, res) => {
// //   // First handle the file uploads with Multer
// //   upload(req, res, async (err) => {
// //     console.log("Request Body:", req.body);
// //     console.log("Uploaded Files:", req.files);

// //     if (err) {
// //       console.error("Multer error:", err);
// //       if (err.code === 'LIMIT_UNEXPECTED_FILE') {
// //         return res.status(400).json({
// //           success: false,
// //           message: "Unexpected file upload field. Only 'rent_agreement' and 'other_document' are allowed."
// //         });
// //       }
// //       return res.status(400).json({ success: false, message: err.message });
// //     }

// //     try {
// //       const {
// //         renter_id,
// //         property_id,
// //         childproperty_id,
// //         allocation_date,
// //         rent,
// //         remarks,
// //         status
// //       } = req.body;

// //       // Use default file path if document is not uploaded (handles NOT NULL constraint)
// //       const rentAgreementPath = req.files?.rent_agreement?.[0]?.path || getDefaultFilePath("default_agreement.pdf");
// //       const otherDocumentPath = req.files?.other_document?.[0]?.path || getDefaultFilePath("default_document.pdf");

// //       const allocationData = {
// //         renter_id,
// //         property_id,
// //         childproperty_id,
// //         allocation_date,
// //         rent: parseFloat(rent) || 0,
// //         remarks,
// //         rent_agreement: rentAgreementPath,
// //         other_document: otherDocumentPath,
// //         status: status || "Active",
// //       };

// //       console.log("Allocation data to be inserted:", allocationData);

// //       const allocationId = await createAllocation(allocationData);
// //       res.status(201).json({
// //         success: true,
// //         message: "Allocation created successfully",
// //         allocation_id: allocationId,
// //       });
// //     } catch (error) {
// //       console.error("Error creating allocation:", error);
// //       res.status(500).json({ success: false, message: error.message });
// //     }
// //   });
// // };

// // // UPDATE allocation
// // exports.updateAllocationController = (req, res) => {
// //   upload(req, res, async (err) => {
// //     console.log("Update Request Body:", req.body);
// //     console.log("Update Uploaded Files:", req.files);

// //     if (err) {
// //       console.error("Multer error during update:", err);
// //       if (err.code === 'LIMIT_UNEXPECTED_FILE') {
// //         return res.status(400).json({
// //           success: false,
// //           message: "Unexpected file upload field. Only 'rent_agreement' and 'other_document' are allowed."
// //         });
// //       }
// //       return res.status(400).json({ success: false, message: err.message });
// //     }

// //     try {
// //       // First, get the existing allocation to preserve document paths if not updated
// //       const existingAllocation = await getAllocationById(req.params.id);
// //       if (!existingAllocation) {
// //         return res.status(404).json({ success: false, message: "Allocation not found" });
// //       }

// //       const {
// //         renter_id,
// //         property_id,
// //         childproperty_id,
// //         allocation_date,
// //         rent,
// //         remarks,
// //         status
// //       } = req.body;

// //       const allocationData = {
// //         renter_id,
// //         property_id,
// //         childproperty_id,
// //         allocation_date,
// //         rent: parseFloat(rent) || 0,
// //         remarks,
// //         // Use the new uploaded file path or keep the existing one
// //         rent_agreement: req.files?.rent_agreement?.[0]?.path || existingAllocation.rent_agreement,
// //         other_document: req.files?.other_document?.[0]?.path || existingAllocation.other_document,
// //         status: status || "Active",
// //       };

// //       console.log("Allocation data to be updated:", allocationData);

// //       const success = await updateAllocation(req.params.id, allocationData);
// //       if (!success) {
// //         return res
// //           .status(404)
// //           .json({ success: false, message: "Allocation update failed" });
// //       }
// //       res.json({ success: true, message: "Allocation updated successfully" });
// //     } catch (error) {
// //       console.error("Error updating allocation:", error);
// //       res.status(500).json({ success: false, message: error.message });
// //     }
// //   });
// // };

// // // DELETE allocation
// // exports.deleteAllocationController = async (req, res) => {
// //   try {
// //     const success = await deleteAllocation(req.params.id);
// //     if (!success) {
// //       return res
// //         .status(404)
// //         .json({ success: false, message: "Allocation not found" });
// //     }
// //     res.json({ success: true, message: "Allocation deleted successfully" });
// //   } catch (error) {
// //     console.error("Error deleting allocation:", error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };
// exports.createAllocationController = (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       // ... (error handling remains the same)
//     }

//     try {
//       const {
//         renter_id,
//         property_id,
//         childproperty_id,
//         allocation_date,
//         remarks,
//         status,
//       } = req.body;

//       const rentAgreementPath =
//         req.files?.rent_agreement?.[0]?.path ||
//         getDefaultFilePath("default_agreement.pdf");
//       const otherDocumentPath =
//         req.files?.other_document?.[0]?.path ||
//         getDefaultFilePath("default_document.pdf");

//       const allocationData = {
//         renter_id,
//         property_id,
//         childproperty_id,
//         allocation_date,
//         remarks,
//         rent_agreement: rentAgreementPath,
//         other_document: otherDocumentPath,
//         status: status || "Active",
//       };

//       const allocationId = await createAllocation(allocationData);
//       res.status(201).json({
//         success: true,
//         message: "Allocation created successfully",
//         allocation_id: allocationId,
//       });
//     } catch (error) {
//       // ... (error handling remains the same)
//     }
//   });
// };

// // UPDATE allocation (unchanged from previous version)
// exports.updateAllocationController = (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       // ... (error handling remains the same)
//     }

//     try {
//       const existingAllocation = await getAllocationById(req.params.id);
//       if (!existingAllocation) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Allocation not found" });
//       }

//       const {
//         renter_id,
//         property_id,
//         childproperty_id,
//         allocation_date,
//         remarks,
//         status,
//       } = req.body;

//       const allocationData = {
//         renter_id,
//         property_id,
//         childproperty_id,
//         allocation_date,
//         remarks,
//         rent_agreement:
//           req.files?.rent_agreement?.[0]?.path ||
//           existingAllocation.rent_agreement,
//         other_document:
//           req.files?.other_document?.[0]?.path ||
//           existingAllocation.other_document,
//         status: status || "Active",
//       };

//       const success = await updateAllocation(req.params.id, allocationData);
//       if (!success) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Allocation update failed" });
//       }
//       res.json({ success: true, message: "Allocation updated successfully" });
//     } catch (error) {
//       // ... (error handling remains the same)
//     }
//   });
// };

// // DELETE allocation (soft delete using status)
// exports.deleteAllocationController = async (req, res) => {
//   try {
//     const allocation = await getAllocationById(req.params.id);
//     if (!allocation) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Allocation not found" });
//     }

//     const success = await updateAllocation(req.params.id, {
//       status: "Deleted",
//     });

//     if (!success) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Allocation deletion failed" });
//     }
//     res.json({
//       success: true,
//       message: "Allocation soft deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error soft deleting allocation:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// 02-04-25

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const path = require("path");
require("dotenv").config();

const {
  getAllAllocations,
  getAllocationById,
  createAllocation,
  updateAllocation,
  deleteAllocation,
} = require("../models/renterAllocationModel");

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

const getDefaultFilePath = (filename = "placeholder.pdf") => {
  return `uploads/default/${filename}`;
};

// GET all allocations
exports.getAllAllocationsController = async (req, res) => {
  try {
    const allocations = await getAllAllocations();
    res.json(allocations);
  } catch (error) {
    console.error("Error fetching allocations:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET allocation by ID
exports.getAllocationByIdController = async (req, res) => {
  try {
    const allocation = await getAllocationById(req.params.id);
    if (!allocation) {
      return res
        .status(404)
        .json({ success: false, message: "Allocation not found" });
    }
    res.json(allocation);
  } catch (error) {
    console.error("Error fetching allocation by ID:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE allocation
exports.createAllocationController = (req, res) => {
  upload(req, res, async (err) => {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    if (err) {
      console.error("Multer error:", err);
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          success: false,
          message:
            "Unexpected file upload field. Only 'rent_agreement' and 'other_document' are allowed.",
        });
      }
      return res.status(400).json({ success: false, message: err.message });
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

      const allocationData = {
        renter_id,
        property_id,
        childproperty_id,
        allocation_date,
        remarks,
        rent_agreement: rentAgreementPath,
        other_document: otherDocumentPath,
        status: status || "Active",
      };

      console.log("Allocation data to be inserted:", allocationData);

      const allocationId = await createAllocation(allocationData);
      res.status(201).json({
        success: true,
        message: "Allocation created successfully",
        id: allocationId, // Changed to 'id'
      });
    } catch (error) {
      console.error("Error creating allocation:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  });
};

// UPDATE allocation
exports.updateAllocationController = (req, res) => {
  upload(req, res, async (err) => {
    console.log("Update Request Body:", req.body);
    console.log("Update Uploaded Files:", req.files);

    if (err) {
      console.error("Multer error during update:", err);
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          success: false,
          message:
            "Unexpected file upload field. Only 'rent_agreement' and 'other_document' are allowed.",
        });
      }
      return res.status(400).json({ success: false, message: err.message });
    }

    try {
      const existingAllocation = await getAllocationById(req.params.id);
      if (!existingAllocation) {
        return res
          .status(404)
          .json({ success: false, message: "Allocation not found" });
      }

      const {
        renter_id,
        property_id,
        childproperty_id,
        allocation_date,
        remarks,
        status,
      } = req.body;

      const allocationData = {
        renter_id,
        property_id,
        childproperty_id,
        allocation_date,
        remarks,
        rent_agreement:
          req.files?.rent_agreement?.[0]?.path ||
          existingAllocation.rent_agreement,
        other_document:
          req.files?.other_document?.[0]?.path ||
          existingAllocation.other_document,
        status: status || "Active",
      };

      console.log("Allocation data to be updated:", allocationData);

      const success = await updateAllocation(req.params.id, allocationData);
      if (!success) {
        return res
          .status(404)
          .json({ success: false, message: "Allocation update failed" });
      }
      res.json({ success: true, message: "Allocation updated successfully" });
    } catch (error) {
      console.error("Error updating allocation:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  });
};

// DELETE allocation (soft delete)
exports.deleteAllocationController = async (req, res) => {
  try {
    const allocation = await getAllocationById(req.params.id);
    if (!allocation) {
      return res
        .status(404)
        .json({ success: false, message: "Allocation not found" });
    }

    const success = await updateAllocation(req.params.id, {
      status: "Deleted",
    });

    if (!success) {
      return res
        .status(404)
        .json({ success: false, message: "Allocation deletion failed" });
    }
    res.json({
      success: true,
      message: "Allocation soft deleted successfully",
    });
  } catch (error) {
    console.error("Error soft deleting allocation:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
