// propertyController.js
const propertyModel = require("../models/propertyModel");

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await propertyModel.getAllProperties();
    return res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return res.status(500).json({ error: "Failed to fetch properties" });
  }
};

exports.createProperty = async (req, res) => {
  try {
    const { formData } = req.body;
    const parsedData = JSON.parse(formData);
    const {
      propertyName,
      ownerName,
      address,
      numberOfFloors,
      status,
      childProperties,
    } = parsedData;

    let documentsPath = null;
    if (req.file) {
      documentsPath = req.file.path; // Cloudinary URL
    }

    const newPropertyId = await propertyModel.createProperty(
      {
        propertyName,
        ownerName,
        address,
        documents: documentsPath,
        numberOfFloors,
        status: status || "Active",
      },
      childProperties
    );

    return res.status(201).json({
      message: "Property created successfully",
      propertyId: newPropertyId,
    });
  } catch (error) {
    console.error("Error creating property:", error);
    return res.status(500).json({ error: "Failed to create property" });
  }
};

exports.getPropertyWithChildren = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await propertyModel.getPropertyWithChildren(id);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    return res.json(property);
  } catch (error) {
    console.error("Error fetching property with children:", error);
    return res.status(500).json({ error: "Database error" });
  }
};

// exports.updateProperty = async (req, res) => {
//   try {
//     const propertyId = req.params.id;
//     const { formData } = req.body;
//     const parsedData = JSON.parse(formData);
//     const {
//       propertyName,
//       ownerName,
//       address,
//       numberOfFloors,
//       status,
//       childProperties,
//     } = parsedData;

//     let documentsPath = null;
//     if (req.file) {
//       documentsPath = req.file.path; // Cloudinary URL
//     }

//     await propertyModel.updateProperty(propertyId, {
//       propertyName,
//       ownerName,
//       address,
//       documents: documentsPath,
//       numberOfFloors,
//       status: status || "Active",
//       childProperties,
//     });

//     return res.status(200).json({ message: "Property updated successfully" });
//   } catch (error) {
//     console.error("Error updating property:", error);
//     return res.status(500).json({ error: "Failed to update property" });
//   }
// };

exports.updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const { formData } = req.body;
    const parsedData = JSON.parse(formData);
    const {
      propertyName,
      ownerName,
      address,
      numberOfFloors,
      status,
      childProperties,
    } = parsedData;

    // Fetch the existing property to preserve the current document if no new file is uploaded
    const existingProperty = await propertyModel.getPropertyWithChildren(
      propertyId
    );
    if (!existingProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Use the existing document path unless a new file is uploaded
    let documentsPath = existingProperty.documents; // Default to existing document
    if (req.file) {
      documentsPath = req.file.path; // Use new Cloudinary URL if a file is uploaded
    }

    await propertyModel.updateProperty(propertyId, {
      propertyName,
      ownerName,
      address,
      documents: documentsPath, // Pass the preserved or updated document path
      numberOfFloors,
      status: status || "Active",
      childProperties,
    });

    return res.status(200).json({ message: "Property updated successfully" });
  } catch (error) {
    console.error("Error updating property:", error);
    return res.status(500).json({ error: "Failed to update property" });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const isDeleted = await propertyModel.deleteProperty(propertyId);

    if (!isDeleted) {
      return res.status(404).json({ error: "Property not found" });
    }
    return res
      .status(200)
      .json({ message: "Property marked as deleted successfully" });
  } catch (error) {
    console.error("Error marking property as deleted:", error);
    return res
      .status(500)
      .json({ error: "Failed to mark property as deleted" });
  }
};
