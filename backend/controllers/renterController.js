// 02-04-25

// renterController.js
const renterModel = require("../models/renterModel");

exports.getAllRenters = async (req, res) => {
  try {
    const renters = await renterModel.getAllRenters();
    return res.json(renters);
  } catch (error) {
    console.error("Error fetching renters:", error);
    return res.status(500).json({ error: "Failed to fetch renters" });
  }
};

exports.createRenter = async (req, res) => {
  try {
    let formData = req.body.formData ? JSON.parse(req.body.formData) : req.body;
    const {
      renterName,
      fullAddress,
      age,
      numberOfStayers,
      contact1,
      contact2,
      remarks,
    } = formData;

    if (!renterName) {
      return res.status(400).json({
        success: false,
        message: "Renter name is required",
      });
    }

    const aadhaarCardFile = req.files?.aadhaarCard?.[0] || null;
    const panCardFile = req.files?.panCard?.[0] || null;
    const passportPhotoFile = req.files?.passportPhoto?.[0] || null;
    const otherDocumentFile = req.files?.otherDocument?.[0] || null;

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

exports.updateRenter = async (req, res) => {
  try {
    const renterId = req.params.id;
    let renterData = req.body.formData
      ? JSON.parse(req.body.formData)
      : req.body;
    const {
      renterName,
      fullAddress,
      age,
      numberOfStayers,
      contact1,
      contact2,
      remarks,
      status,
    } = renterData;

    if (!renterName) {
      return res.status(400).json({
        success: false,
        message: "Renter name is required",
      });
    }

    const updateData = {
      renterName,
      fullAddress,
      age,
      numberOfStayers,
      contact1,
      contact2,
      remarks,
      status,
    };

    if (req.files) {
      if (req.files.aadhaarCard && req.files.aadhaarCard[0])
        updateData.aadhaarCard = req.files.aadhaarCard[0].path;
      if (req.files.panCard && req.files.panCard[0])
        updateData.panCard = req.files.panCard[0].path;
      if (req.files.passportPhoto && req.files.passportPhoto[0])
        updateData.passportPhoto = req.files.passportPhoto[0].path;
      if (req.files.otherDocument && req.files.otherDocument[0])
        updateData.otherDocument = req.files.otherDocument[0].path;
    }

    const affectedRows = await renterModel.updateRenter(renterId, updateData);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Renter not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Renter updated successfully",
    });
  } catch (error) {
    console.error("Error updating renter:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update renter",
      error: error.message,
    });
  }
};

exports.deleteRenter = async (req, res) => {
  try {
    const renterId = req.params.id;
    const affectedRows = await renterModel.deleteRenter(renterId);
    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Renter not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Renter marked as deleted successfully",
    });
  } catch (error) {
    console.error("Error marking renter as deleted:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to mark renter as deleted",
      error: error.message,
    });
  }
};
