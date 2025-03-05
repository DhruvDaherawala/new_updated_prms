  // const propertyModel = require("../models/propertyModel");
  // exports.getAllProperties = async (req, res) => {
  //   try {
  //     const properties = await propertyModel.getAllProperties();
  //     return res.json(properties);
  //   } catch (error) {
  //     console.error("Error fetching properties:", error);
  //     return res.status(500).json({ error: "Failed to fetch properties" });
  //   }
  // };
  // exports.createProperty = async (req, res) => {
  //   try {
  //     // formData is sent as JSON string in req.body
  //     const { formData } = req.body;
  //     const parsedData = JSON.parse(formData);
  //     const { propertyName, ownerName, address, childProperties } = parsedData;

  //     // If a file was uploaded, store the filename in documentsPath
  //     let documentsPath = null;
  //     if (req.file) {
  //       documentsPath = req.file.filename;
  //     }

  //     // Create the property (and any child properties)
  //     const newPropertyId = await propertyModel.createProperty(
  //       {
  //         propertyName,
  //         ownerName,
  //         address,
  //         documents: documentsPath,
  //       },
  //       childProperties
  //     );

  //     return res.status(201).json({
  //       message: "Property created successfully",
  //       propertyId: newPropertyId,
  //     });
  //   } catch (error) {
  //     console.error("Error creating property:", error);
  //     return res.status(500).json({ error: "Failed to create property" });
  //   }
  // };
  // exports.getPropertyWithChildren = async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const property = await propertyModel.getPropertyWithChildren(id);

  //     if (!property) {
  //       return res.status(404).json({ error: "Property not found" });
  //     }
  //     return res.json(property);
  //   } catch (error) {
  //     console.error("Error fetching property with children:", error);
  //     return res.status(500).json({ error: "Database error" });
  //   }
  // };
  // exports.updateProperty = async (req, res) => {
  //   try {
  //     const propertyId = req.params.id;
  //     const { formData } = req.body;
  //     const parsedData = JSON.parse(formData);
  //     const { propertyName, ownerName, address, childProperties } = parsedData;

  //     // If a file was uploaded, store the filename
  //     let documentsPath = null;
  //     if (req.file) {
  //       documentsPath = req.file.filename;
  //     }

  //     // Update the property (and re-insert child properties)
  //     await propertyModel.updateProperty(propertyId, {
  //       propertyName,
  //       ownerName,
  //       address,
  //       documents: documentsPath,
  //       childProperties,
  //     });

  //     return res.status(200).json({ message: "Property updated successfully" });
  //   } catch (error) {
  //     console.error("Error updating property:", error);
  //     return res.status(500).json({ error: "Failed to update property" });
  //   }
  // };
  // exports.deleteProperty = async (req, res) => {
  //   try {
  //     const propertyId = req.params.id;
  //     const isDeleted = await propertyModel.deleteProperty(propertyId);

  //     if (!isDeleted) {
  //       return res.status(404).json({ error: "Property not found" });
  //     }
  //     return res.status(200).json({ message: "Property deleted successfully" });
  //   } catch (error) {
  //     console.error("Error deleting property:", error);
  //     return res.status(500).json({ error: "Failed to delete property" });
  //   }
  // };


  // ----------------------------------------------------------------------------------------------------------------------------


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
      // formData is sent as JSON string in req.body
      const { formData } = req.body;
      const parsedData = JSON.parse(formData);
      const { propertyName, ownerName, address, childProperties } = parsedData;
  
      // If a file was uploaded, store the Cloudinary URL in documentsPath
      let documentsPath = null;
      if (req.file) {
        documentsPath = req.file.path; // Cloudinary URL
      }
  
      // Create the property (and any child properties)
      const newPropertyId = await propertyModel.createProperty(
        {
          propertyName,
          ownerName,
          address,
          documents: documentsPath,
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
  
  exports.updateProperty = async (req, res) => {
    try {
      const propertyId = req.params.id;
      const { formData } = req.body;
      const parsedData = JSON.parse(formData);
      const { propertyName, ownerName, address, childProperties } = parsedData;
  
      // If a file was uploaded, store the Cloudinary URL
      let documentsPath = null;
      if (req.file) {
        documentsPath = req.file.path; // Cloudinary URL
      }
  
      // Update the property (and re-insert child properties)
      await propertyModel.updateProperty(propertyId, {
        propertyName,
        ownerName,
        address,
        documents: documentsPath,
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
      return res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
      console.error("Error deleting property:", error);
      return res.status(500).json({ error: "Failed to delete property" });
    }
  };
  