// // controllers/childPropertyController.js
// const childPropertyModel = require("../models/childPropertyModel");

// /**
//  * GET all child properties
//  */
// exports.getAllChildProperties = async (req, res) => {
//   try {
//     const childProperties = await childPropertyModel.getAllChildProperties();
//     return res.json(childProperties);
//   } catch (error) {
//     console.error("Error fetching child properties:", error);
//     return res.status(500).json({ error: "Failed to fetch child properties" });
//   }
// };

// /**
//  * GET a single child property by ID
//  */
// exports.getChildPropertyById = async (req, res) => {
//   try {
//     const childProperty = await childPropertyModel.getChildPropertyById(req.params.id);
//     if (!childProperty) {
//       return res.status(404).json({ error: "Child property not found" });
//     }
//     return res.json(childProperty);
//   } catch (error) {
//     console.error("Error fetching child property:", error);
//     return res.status(500).json({ error: "Failed to fetch child property" });
//   }
// };

// /**
//  * POST create a new child property
//  */
// exports.createChildProperty = async (req, res) => {
//   try {
//     // The frontend sends formData with a field 'formData' containing JSON text
//     const data = JSON.parse(req.body.formData);

//     // Optionally, you can add extra backend validation here (e.g. validate that floor <= parent's numberOfFloors)

//     const newId = await childPropertyModel.createChildProperty(data);
//     return res.status(201).json({
//       success: true,
//       message: "Child property created successfully!",
//       id: newId,
//     });
//   } catch (error) {
//     console.error("Error creating child property:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create child property",
//       error: error.message,
//     });
//   }
// };

// /**
//  * PUT update an existing child property
//  */
// exports.updateChildProperty = async (req, res) => {
//   try {
//     const data = JSON.parse(req.body.formData);
//     const affectedRows = await childPropertyModel.updateChildProperty(req.params.id, data);
//     if (affectedRows === 0) {
//       return res.status(404).json({ success: false, message: "Child property not found" });
//     }
//     return res.status(200).json({ success: true, message: "Child property updated successfully!" });
//   } catch (error) {
//     console.error("Error updating child property:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update child property",
//       error: error.message,
//     });
//   }
// };

// /**
//  * DELETE a child property
//  */
// exports.deleteChildProperty = async (req, res) => {
//   try {
//     const affectedRows = await childPropertyModel.deleteChildProperty(req.params.id);
//     if (affectedRows === 0) {
//       return res.status(404).json({ success: false, message: "Child property not found" });
//     }
//     return res.status(200).json({ success: true, message: "Child property deleted successfully!" });
//   } catch (error) {
//     console.error("Error deleting child property:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete child property",
//       error: error.message,
//     });
//   }
// };

// const childPropertyModel = require("../models/childPropertyModel");

// /**
//  * GET all child properties
//  */
// exports.getAllChildProperties = async (req, res) => {
//   try {
//     const childProperties = await childPropertyModel.getAllChildProperties();
//     return res.json(childProperties);
//   } catch (error) {
//     console.error("Error fetching child properties:", error);
//     return res.status(500).json({ error: "Failed to fetch child properties" });
//   }
// };

// /**
//  * GET a single child property by ID
//  */
// exports.getChildPropertyById = async (req, res) => {
//   try {
//     const childProperty = await childPropertyModel.getChildPropertyById(
//       req.params.id
//     );
//     if (!childProperty) {
//       return res.status(404).json({ error: "Child property not found" });
//     }
//     return res.json(childProperty);
//   } catch (error) {
//     console.error("Error fetching child property:", error);
//     return res.status(500).json({ error: "Failed to fetch child property" });
//   }
// };

// /**
//  * POST create a new child property
//  */
// exports.createChildProperty = async (req, res) => {
//   try {
//     // The frontend sends formData with a field 'formData' containing JSON text.
//     // Expect keys: property_id, floor, title, description, rooms, washroom, gas, electricity, deposit, rent
//     const data = JSON.parse(req.body.formData);
//     const newId = await childPropertyModel.createChildProperty(data);
//     return res.status(201).json({
//       success: true,
//       message: "Child property created successfully!",
//       id: newId,
//     });
//   } catch (error) {
//     console.error("Error creating child property:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create child property",
//       error: error.message,
//     });
//   }
// };

// /**
//  * PUT update an existing child property
//  */
// exports.updateChildProperty = async (req, res) => {
//   try {
//     const data = JSON.parse(req.body.formData);
//     const affectedRows = await childPropertyModel.updateChildProperty(
//       req.params.id,
//       data
//     );
//     if (affectedRows === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Child property not found" });
//     }
//     return res
//       .status(200)
//       .json({ success: true, message: "Child property updated successfully!" });
//   } catch (error) {
//     console.error("Error updating child property:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update child property",
//       error: error.message,
//     });
//   }
// };

// /**
//  * DELETE a child property
//  */
// exports.deleteChildProperty = async (req, res) => {
//   try {
//     const affectedRows = await childPropertyModel.deleteChildProperty(
//       req.params.id
//     );
//     if (affectedRows === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Child property not found" });
//     }
//     return res
//       .status(200)
//       .json({ success: true, message: "Child property deleted successfully!" });
//   } catch (error) {
//     console.error("Error deleting child property:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete child property",
//       error: error.message,
//     });
//   }
// };

// 01-04-25
// childPropertyController.js

const childPropertyModel = require("../models/childPropertyModel");

exports.getAllChildProperties = async (req, res) => {
  try {
    const childProperties = await childPropertyModel.getAllChildProperties();
    return res.json(childProperties);
  } catch (error) {
    console.error("Error fetching child properties:", error);
    return res.status(500).json({ error: "Failed to fetch child properties" });
  }
};

exports.getChildPropertyById = async (req, res) => {
  try {
    const childProperty = await childPropertyModel.getChildPropertyById(
      req.params.id
    );
    if (!childProperty) {
      return res.status(404).json({ error: "Child property not found" });
    }
    return res.json(childProperty);
  } catch (error) {
    console.error("Error fetching child property:", error);
    return res.status(500).json({ error: "Failed to fetch child property" });
  }
};

exports.createChildProperty = async (req, res) => {
  try {
    const data = JSON.parse(req.body.formData);
    const newId = await childPropertyModel.createChildProperty(data);
    return res.status(201).json({
      success: true,
      message: "Child property created successfully!",
      id: newId,
    });
  } catch (error) {
    console.error("Error creating child property:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create child property",
      error: error.message,
    });
  }
};

exports.updateChildProperty = async (req, res) => {
  try {
    const data = JSON.parse(req.body.formData);
    const affectedRows = await childPropertyModel.updateChildProperty(
      req.params.id,
      data
    );
    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Child property not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Child property updated successfully!" });
  } catch (error) {
    console.error("Error updating child property:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update child property",
      error: error.message,
    });
  }
};

exports.deleteChildProperty = async (req, res) => {
  try {
    const affectedRows = await childPropertyModel.deleteChildProperty(
      req.params.id
    );
    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Child property not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Child property marked as deleted successfully!",
    });
  } catch (error) {
    console.error("Error marking child property as deleted:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to mark child property as deleted",
      error: error.message,
    });
  }
};
