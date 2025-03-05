// // // // controllers/renterController.js
// // // const { createRenter } = require("../models/renterModel");

// // // exports.createRenterController = async (req, res) => {
// // //   try {
// // //     // 1) Pull fields directly from req.body (no JSON.parse)
// // //     const {
// // //       renterName,
// // //       fullAddress,
// // //       age,
// // //       numberOfStayers,
// // //       contact1,
// // //       contact2,
// // //       remarks
// // //     } = req.body;

// // //     // 2) Grab uploaded files (if any) from req.files
// // //     const aadhaarCardFile = req.files?.aadhaarCard?.[0] || null;
// // //     const panCardFile = req.files?.panCard?.[0] || null;
// // //     const passportPhotoFile = req.files?.passportPhoto?.[0] || null;
// // //     const otherDocumentFile = req.files?.otherDocument?.[0] || null;

// // //     // 3) Prepare data for DB insertion
// // //     const renterData = {
// // //       renterName,
// // //       fullAddress,
// // //       age,
// // //       numberOfStayers,
// // //       aadhaarCard: aadhaarCardFile ? aadhaarCardFile.filename : null,
// // //       panCard: panCardFile ? panCardFile.filename : null,
// // //       passportPhoto: passportPhotoFile ? passportPhotoFile.filename : null,
// // //       otherDocument: otherDocumentFile ? otherDocumentFile.filename : null,
// // //       contact1,
// // //       contact2,
// // //       remarks
// // //     };

// // //     // 4) Insert into DB (assuming createRenter is correct)
// // //     const renterId = await createRenter(renterData);

// // //     return res.status(201).json({
// // //       success: true,
// // //       message: "Renter data saved successfully!",
// // //       renterId
// // //     });
// // //   } catch (error) {
// // //     console.error("Error in createRenterController:", error);
// // //     return res.status(500).json({
// // //       success: false,
// // //       message: "Internal Server Error",
// // //       error: error.message
// // //     });
// // //   }
// // // };

// // // controllers/renterController.js
// // const { createRenter } = require("../models/renterModel");

// // exports.createRenterController = async (req, res) => {
// //   try {
// //     // Non-file fields from req.body
// //     const {
// //       renterName,
// //       fullAddress,
// //       age,
// //       numberOfStayers,
// //       contact1,
// //       contact2,
// //       remarks
// //     } = req.body;

// //     // Files from req.files
// //     const aadhaarCardFile = req.files?.aadhaarCard?.[0] || null;
// //     const panCardFile = req.files?.panCard?.[0] || null;
// //     const passportPhotoFile = req.files?.passportPhoto?.[0] || null;
// //     const otherDocumentFile = req.files?.otherDocument?.[0] || null;

// //     // Prepare data for DB insertion
// //     const renterData = {
// //       renterName,
// //       fullAddress,
// //       age,
// //       numberOfStayers,
// //       contact1,
// //       contact2,
// //       remarks,
// //       aadhaarCard: aadhaarCardFile ? aadhaarCardFile.filename : null,
// //       panCard: panCardFile ? panCardFile.filename : null,
// //       passportPhoto: passportPhotoFile ? passportPhotoFile.filename : null,
// //       otherDocument: otherDocumentFile ? otherDocumentFile.filename : null
// //     };

// //     // Insert into DB (assuming createRenter is a function in your model)
// //     const renterId = await createRenter(renterData);

// //     return res.status(201).json({
// //       success: true,
// //       message: "Renter data saved successfully!",
// //       renterId
// //     });
// //   } catch (error) {
// //     console.error("Error in createRenterController:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Internal Server Error",
// //       error: error.message
// //     });
// //   }
// // };


// const renterModel = require("../models/renterModel");

// /**
//  * GET all renters
//  */
// exports.getAllRenters = async (req, res) => {
//   try {
//     const renters = await renterModel.getAllRenters();
//     return res.json(renters);
//   } catch (error) {
//     console.error("Error fetching renters:", error);
//     return res.status(500).json({ error: "Failed to fetch renters" });
//   }
// };

// /**
//  * POST create a new renter (with file uploads)
//  */
// exports.createRenter = async (req, res) => {
//   try {
//     // Non-file fields from req.body
//     const {
//       renterName,
//       fullAddress,
//       age,
//       numberOfStayers,
//       contact1,
//       contact2,
//       remarks,
//     } = req.body;

//     // Files from req.files
//     const aadhaarCardFile = req.files?.aadhaarCard?.[0] || null;
//     const panCardFile = req.files?.panCard?.[0] || null;
//     const passportPhotoFile = req.files?.passportPhoto?.[0] || null;
//     const otherDocumentFile = req.files?.otherDocument?.[0] || null;

//     // Prepare data for DB insertion
//     const renterData = {
//       renterName,
//       fullAddress,
//       age,
//       numberOfStayers,
//       contact1,
//       contact2,
//       remarks,
//       aadhaarCard: aadhaarCardFile ? aadhaarCardFile.filename : null,
//       panCard: panCardFile ? panCardFile.filename : null,
//       passportPhoto: passportPhotoFile ? passportPhotoFile.filename : null,
//       otherDocument: otherDocumentFile ? otherDocumentFile.filename : null,
//     };

//     // Insert into DB
//     const renterId = await renterModel.createRenter(renterData);

//     return res.status(201).json({
//       success: true,
//       message: "Renter data saved successfully!",
//       renterId,
//     });
//   } catch (error) {
//     console.error("Error creating renter:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to save renter data",
//       error: error.message,
//     });
//   }
// };

// /**
//  * PUT update an existing renter (no file logic here, but you can add it if needed)
//  */
// exports.updateRenter = async (req, res) => {
//   try {
//     const renterId = req.params.id;
//     const {
//       renterName,
//       fullAddress,
//       age,
//       numberOfStayers,
//       contact1,
//       contact2,
//       remarks,
//     } = req.body;

//     // Update DB
//     const affectedRows = await renterModel.updateRenter(renterId, {
//       renterName,
//       fullAddress,
//       age,
//       numberOfStayers,
//       contact1,
//       contact2,
//       remarks,
//     });

//     if (affectedRows === 0) {
//       return res.status(404).json({ success: false, message: "Renter not found" });
//     }

//     return res.status(200).json({ success: true, message: "Renter updated successfully" });
//   } catch (error) {
//     console.error("Error updating renter:", error);
//     return res.status(500).json({ success: false, message: "Failed to update renter" });
//   }
// };

// /**
//  * DELETE a renter
//  */
// exports.deleteRenter = async (req, res) => {
//   try {
//     const renterId = req.params.id;
//     const affectedRows = await renterModel.deleteRenter(renterId);
//     if (affectedRows === 0) {
//       return res.status(404).json({ success: false, message: "Renter not found" });
//     }
//     return res.status(200).json({ success: true, message: "Renter deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting renter:", error);
//     return res.status(500).json({ success: false, message: "Failed to delete renter" });
//   }
// };

// // ----------------------------------------------------------------------------------

const renterModel = require("../models/renterModel");

/**
 * GET all renters
 */
exports.getAllRenters = async (req, res) => {
  try {
    const renters = await renterModel.getAllRenters();
    return res.json(renters);
  } catch (error) {
    console.error("Error fetching renters:", error);
    return res.status(500).json({ error: "Failed to fetch renters" });
  }
};

/**
 * POST create a new renter (with file uploads)
 */
exports.createRenter = async (req, res) => {
  try {
    // Non-file fields from req.body
    const {
      renterName,
      fullAddress,
      age,
      numberOfStayers,
      contact1,
      contact2,
      remarks,
    } = req.body;

    // Files from req.files using Cloudinary's uploaded file's URL
    const aadhaarCardFile = req.files?.aadhaarCard?.[0] || null;
    const panCardFile = req.files?.panCard?.[0] || null;
    const passportPhotoFile = req.files?.passportPhoto?.[0] || null;
    const otherDocumentFile = req.files?.otherDocument?.[0] || null;

    // Prepare data for DB insertion (using Cloudinary URLs)
    const renterData = {
      renterName,
      fullAddress,
      age,
      numberOfStayers,
      contact1,
      contact2,
      remarks,
      aadhaarCard: aadhaarCardFile ? aadhaarCardFile.path : null,
      panCard: panCardFile ? panCardFile.path : null,
      passportPhoto: passportPhotoFile ? passportPhotoFile.path : null,
      otherDocument: otherDocumentFile ? otherDocumentFile.path : null,
    };

    // Insert into DB
    const renterId = await renterModel.createRenter(renterData);

    return res.status(201).json({
      success: true,
      message: "Renter data saved successfully!",
      renterId,
    });
  } catch (error) {
    console.error("Error creating renter:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save renter data",
      error: error.message,
    });
  }
};

/**
 * PUT update an existing renter (no file logic here, but you can add it if needed)
 */
exports.updateRenter = async (req, res) => {
  try {
    const renterId = req.params.id;
    const {
      renterName,
      fullAddress,
      age,
      numberOfStayers,
      contact1,
      contact2,
      remarks,
    } = req.body;

    // Update DB
    const affectedRows = await renterModel.updateRenter(renterId, {
      renterName,
      fullAddress,
      age,
      numberOfStayers,
      contact1,
      contact2,
      remarks,
    });

    if (affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Renter not found" });
    }

    return res.status(200).json({ success: true, message: "Renter updated successfully" });
  } catch (error) {
    console.error("Error updating renter:", error);
    return res.status(500).json({ success: false, message: "Failed to update renter" });
  }
};

/**
 * DELETE a renter
 */
exports.deleteRenter = async (req, res) => { 
  try {
    const renterId = req.params.id;
    const affectedRows = await renterModel.deleteRenter(renterId);
    if (affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Renter not found" });
    }
    return res.status(200).json({ success: true, message: "Renter deleted successfully" });
  } catch (error) {
    console.error("Error deleting renter:", error);
    return res.status(500).json({ success: false, message: "Failed to delete renter" });
  }
};
