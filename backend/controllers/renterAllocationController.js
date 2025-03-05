// // // const {
// // //     getAllAllocations,
// // //     getAllocationById,
// // //     createAllocation,
// // //     updateAllocation,
// // //     deleteAllocation,
// // //   } = require("../models/renterAllocationModel");
// // //   const multer = require("multer");
// // //   const path = require("path");
  
// // //   // Configure multer for file uploads
// // //   const storage = multer.diskStorage({
// // //     destination: "./uploads/",
// // //     filename: (req, file, cb) => {
// // //       cb(
// // //         null,
// // //         `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
// // //       );
// // //     },
// // //   });
  
// // //   const fileFilter = (req, file, cb) => {
// // //     const allowedTypes = /jpeg|jpg|png|pdf/;
// // //     const isValidExt = allowedTypes.test(
// // //       path.extname(file.originalname).toLowerCase()
// // //     );
// // //     const isValidMime = allowedTypes.test(file.mimetype);
  
// // //     isValidExt && isValidMime
// // //       ? cb(null, true)
// // //       : cb(new Error("Only JPEG, JPG, PNG, and PDFs are allowed"));
// // //   };
  
// // //   const upload = multer({
// // //     storage,
// // //     limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
// // //     fileFilter,
// // //   }).fields([
// // //     { name: "rent_agreement", maxCount: 1 },
// // //     { name: "other_document", maxCount: 1 },
// // //   ]);
  
// // //   // Get all allocations
// // //   exports.getAllAllocationsController = async (req, res) => {
// // //     try {
// // //       const allocations = await getAllAllocations();
// // //       return res.json({ success: true, data: allocations });
// // //     } catch (error) {
// // //       return res.status(500).json({ success: false, message: error.message });
// // //     }
// // //   };
  
// // //   // Get allocation by ID
// // //   exports.getAllocationByIdController = async (req, res) => {
// // //     try {
// // //       const allocation = await getAllocationById(req.params.id);
// // //       if (!allocation) {
// // //         return res
// // //           .status(404)
// // //           .json({ success: false, message: "Allocation not found" });
// // //       }
// // //       return res.json({ success: true, data: allocation });
// // //     } catch (error) {
// // //       return res.status(500).json({ success: false, message: error.message });
// // //     }
// // //   };
  
// // //   // Create allocation
// // //   exports.createAllocationController = async (req, res) => {
// // //     upload(req, res, async (err) => {
// // //       if (err) {
// // //         return res.status(400).json({ success: false, message: err.message });
// // //       }
  
// // //       try {
// // //         const {
// // //           renter_id,
// // //           property_id,
// // //           childproperty_id,
// // //           allocation_date,
// // //           remarks,
// // //         } = req.body;
  
// // //         const allocationData = {
// // //           renter_id,
// // //           property_id,
// // //           childproperty_id,
// // //           allocation_date,
// // //           remarks,
// // //           rent_agreement: req.files?.rent_agreement?.[0]?.filename || null,
// // //           other_document: req.files?.other_document?.[0]?.filename || null,
// // //         };
  
// // //         const allocationId = await createAllocation(allocationData);
// // //         return res.status(201).json({
// // //           success: true,
// // //           message: "Allocation created successfully",
// // //           allocationId,
// // //         });
// // //       } catch (error) {
// // //         return res.status(500).json({ success: false, message: error.message });
// // //       }
// // //     });
// // //   };
  
// // //   // Update allocation
// // //   exports.updateAllocationController = async (req, res) => {
// // //     upload(req, res, async (err) => {
// // //       if (err) {
// // //         return res.status(400).json({ success: false, message: err.message });
// // //       }
  
// // //       try {
// // //         const {
// // //           renter_id,
// // //           property_id,
// // //           childproperty_id,
// // //           allocation_date,
// // //           remarks,
// // //         } = req.body;
  
// // //         const allocationData = {
// // //           renter_id,
// // //           property_id,
// // //           childproperty_id,
// // //           allocation_date,
// // //           remarks,
// // //           rent_agreement: req.files?.rent_agreement?.[0]?.filename || null,
// // //           other_document: req.files?.other_document?.[0]?.filename || null,
// // //         };
  
// // //         const success = await updateAllocation(req.params.id, allocationData);
// // //         if (!success) {
// // //           return res
// // //             .status(404)
// // //             .json({ success: false, message: "Allocation not found" });
// // //         }
  
// // //         return res.json({
// // //           success: true,
// // //           message: "Allocation updated successfully",
// // //         });
// // //       } catch (error) {
// // //         return res.status(500).json({ success: false, message: error.message });
// // //       }
// // //     });
// // //   };
  
// // //   // Delete allocation
// // //   exports.deleteAllocationController = async (req, res) => {
// // //     try {
// // //       const success = await deleteAllocation(req.params.id);
// // //       if (!success) {
// // //         return res
// // //           .status(404)
// // //           .json({ success: false, message: "Allocation not found" });
// // //       }
// // //       return res.json({
// // //         success: true,
// // //         message: "Allocation deleted successfully",
// // //       });
// // //     } catch (error) {
// // //       return res.status(500).json({ success: false, message: error.message });
// // //     }
// // //   };



// // // ----------------------------------------------------------------------------------------------------------------------------/



// // const {
// //   getAllAllocations,
// //   getAllocationById,
// //   createAllocation,
// //   updateAllocation,
// //   deleteAllocation,
// // } = require("../models/renterAllocationModel");
// // const multer = require("multer");
// // const path = require("path");

// // // Configure multer for file uploads
// // const storage = multer.diskStorage({
// //   destination: "./uploads/",
// //   filename: (req, file, cb) => {
// //     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
// //   },
// // });

// // const fileFilter = (req, file, cb) => {
// //   const allowedTypes = /jpeg|jpg|png|pdf/;
// //   const isValidExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());
// //   const isValidMime = allowedTypes.test(file.mimetype);
// //   isValidExt && isValidMime
// //     ? cb(null, true)
// //     : cb(new Error("Only JPEG, JPG, PNG, and PDFs are allowed"));
// // };

// // const upload = multer({
// //   storage,
// //   limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
// //   fileFilter,
// // }).fields([
// //   { name: "rent_agreement", maxCount: 1 },
// //   { name: "other_document", maxCount: 1 },
// // ]);

// // // Get all allocations
// // exports.getAllAllocationsController = async (req, res) => {
// //   try {
// //     const allocations = await getAllAllocations();
// //     return res.json({ success: true, data: allocations });
// //   } catch (error) {
// //     return res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Get allocation by ID
// // exports.getAllocationByIdController = async (req, res) => {
// //   try {
// //     const allocation = await getAllocationById(req.params.id);
// //     if (!allocation) {
// //       return res.status(404).json({ success: false, message: "Allocation not found" });
// //     }
// //     return res.json({ success: true, data: allocation });
// //   } catch (error) {
// //     return res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Create allocation
// // exports.createAllocationController = async (req, res) => {
// //   upload(req, res, async (err) => {
// //     if (err) {
// //       return res.status(400).json({ success: false, message: err.message });
// //     }
// //     try {
// //       const { renter_id, property_id, childproperty_id, allocation_date, remarks } = req.body;

// //       const allocationData = {
// //         renter_id,
// //         property_id,
// //         childproperty_id,
// //         allocation_date,
// //         remarks,
// //         rent_agreement: req.files?.rent_agreement?.[0]?.filename || null,
// //         other_document: req.files?.other_document?.[0]?.filename || null,
// //       };

// //       const allocationId = await createAllocation(allocationData);
// //       return res.status(201).json({
// //         success: true,
// //         message: "Allocation created successfully",
// //         allocationId,
// //       });
// //     } catch (error) {
// //       return res.status(500).json({ success: false, message: error.message });
// //     }
// //   });
// // };

// // // Update allocation
// // exports.updateAllocationController = async (req, res) => {
// //   upload(req, res, async (err) => {
// //     if (err) {
// //       return res.status(400).json({ success: false, message: err.message });
// //     }
// //     try {
// //       const { renter_id, property_id, childproperty_id, allocation_date, remarks } = req.body;

// //       const allocationData = {
// //         renter_id,
// //         property_id,
// //         childproperty_id,
// //         allocation_date,
// //         remarks,
// //         rent_agreement: req.files?.rent_agreement?.[0]?.filename || null,
// //         other_document: req.files?.other_document?.[0]?.filename || null,
// //       };

// //       const success = await updateAllocation(req.params.id, allocationData);
// //       if (!success) {
// //         return res.status(404).json({ success: false, message: "Allocation not found" });
// //       }
// //       return res.json({ success: true, message: "Allocation updated successfully" });
// //     } catch (error) {
// //       return res.status(500).json({ success: false, message: error.message });
// //     }
// //   });
// // };

// // // Delete allocation
// // exports.deleteAllocationController = async (req, res) => {
// //   try {
// //     const success = await deleteAllocation(req.params.id);
// //     if (!success) {
// //       return res.status(404).json({ success: false, message: "Allocation not found" });
// //     }
// //     return res.json({ success: true, message: "Allocation deleted successfully" });
// //   } catch (error) {
// //     return res.status(500).json({ success: false, message: error.message });
// //   }
// // };


// // ----------------------------------------------------------------------------------------------------------------------------/


// const multer = require("multer");
// const path = require("path");
// const {
//   getAllAllocations,
//   getAllocationById,
//   createAllocation,
//   updateAllocation,
//   deleteAllocation,
// } = require("../models/renterAllocationModel");

// // Configure Multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|pdf/;
//   const isValidExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const isValidMime = allowedTypes.test(file.mimetype);
//   isValidExt && isValidMime
//     ? cb(null, true)
//     : cb(new Error("Only JPEG, JPG, PNG, and PDFs are allowed"));
// };

// const upload = multer({
//   storage,
//   limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
//   fileFilter,
// }).fields([
//   { name: "rent_agreement", maxCount: 1 },
//   { name: "other_document", maxCount: 1 },
// ]);

// // GET all allocations
// exports.getAllAllocationsController = async (req, res) => {
//   try {
//     const allocations = await getAllAllocations();
//     res.json({ success: true, data: allocations });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // GET allocation by ID
// exports.getAllocationByIdController = async (req, res) => {
//   try {
//     const allocation = await getAllocationById(req.params.id);
//     if (!allocation) {
//       return res.status(404).json({ success: false, message: "Allocation not found" });
//     }
//     res.json({ success: true, data: allocation });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // CREATE allocation
// exports.createAllocationController = (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ success: false, message: err.message });
//     }
//     try {
//       const { renter_id, property_id, childproperty_id, allocation_date, remarks } = req.body;
//       const allocationData = {
//         renter_id,
//         property_id,
//         childproperty_id,
//         allocation_date,
//         remarks,
//         rent_agreement: req.files?.rent_agreement?.[0]?.filename || null,
//         other_document: req.files?.other_document?.[0]?.filename || null,
//         status: "Active",
//       };
//       const allocationId = await createAllocation(allocationData);
//       res.status(201).json({
//         success: true,
//         message: "Allocation created successfully",
//         allocation_id: allocationId,
//       });
//     } catch (error) {
//       res.status(500).json({ success: false, message: error.message });
//     }
//   });
// };

// // UPDATE allocation
// exports.updateAllocationController = (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ success: false, message: err.message });
//     }
//     try {
//       const { renter_id, property_id, childproperty_id, allocation_date, remarks } = req.body;
//       const allocationData = {
//         renter_id,
//         property_id,
//         childproperty_id,
//         allocation_date,
//         remarks,
//         // If new file is uploaded, update the filename; otherwise, keep the existing file.
//         rent_agreement: req.files?.rent_agreement?.[0]?.filename || null,
//         other_document: req.files?.other_document?.[0]?.filename || null,
//       };
//       const success = await updateAllocation(req.params.id, allocationData);
//       if (!success) {
//         return res.status(404).json({ success: false, message: "Allocation not found" });
//       }
//       res.json({ success: true, message: "Allocation updated successfully" });
//     } catch (error) {
//       res.status(500).json({ success: false, message: error.message });
//     }
//   });
// };

// // DELETE allocation
// exports.deleteAllocationController = async (req, res) => {
//   try {
//     const success = await deleteAllocation(req.params.id);
//     if (!success) {
//       return res.status(404).json({ success: false, message: "Allocation not found" });
//     }
//     res.json({ success: true, message: "Allocation deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// ----------------------------------------------------------------------------------------------------------------------------/


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

// Optional file filter to double-check file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const isValidExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const isValidMime = allowedTypes.test(file.mimetype);
  isValidExt && isValidMime
    ? cb(null, true)
    : cb(new Error("Only JPEG, JPG, PNG, and PDFs are allowed"));
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
  fileFilter,
}).fields([
  { name: "rent_agreement", maxCount: 1 },
  { name: "other_document", maxCount: 1 },
]);

// GET all allocations
exports.getAllAllocationsController = async (req, res) => {
  try {
    const allocations = await getAllAllocations();
    res.json({ success: true, data: allocations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET allocation by ID
exports.getAllocationByIdController = async (req, res) => {
  try {
    const allocation = await getAllocationById(req.params.id);
    if (!allocation) {
      return res.status(404).json({ success: false, message: "Allocation not found" });
    }
    res.json({ success: true, data: allocation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE allocation
exports.createAllocationController = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    try {
      const { renter_id, property_id, childproperty_id, allocation_date, remarks } = req.body;
      const allocationData = {
        renter_id,
        property_id,
        childproperty_id,
        allocation_date,
        remarks,
        // Use Cloudinary URL returned in "path"
        rent_agreement: req.files?.rent_agreement?.[0]?.path || null,
        other_document: req.files?.other_document?.[0]?.path || null,
        status: "Active",
      };
      const allocationId = await createAllocation(allocationData);
      res.status(201).json({
        success: true,
        message: "Allocation created successfully",
        allocation_id: allocationId,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
};

// UPDATE allocation
exports.updateAllocationController = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    try {
      const { renter_id, property_id, childproperty_id, allocation_date, remarks } = req.body;
      const allocationData = {
        renter_id,
        property_id,
        childproperty_id,
        allocation_date,
        remarks,
        rent_agreement: req.files?.rent_agreement?.[0]?.path || null,
        other_document: req.files?.other_document?.[0]?.path || null,
      };
      const success = await updateAllocation(req.params.id, allocationData);
      if (!success) {
        return res.status(404).json({ success: false, message: "Allocation not found" });
      }
      res.json({ success: true, message: "Allocation updated successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
};

// DELETE allocation
exports.deleteAllocationController = async (req, res) => {
  try {
    const success = await deleteAllocation(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: "Allocation not found" });
    }
    res.json({ success: true, message: "Allocation deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
