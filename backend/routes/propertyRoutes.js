// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const propertyController = require("../controllers/propertyController");

// // Configure Multer for file uploads (saved to /uploads folder)
// const upload = multer({ dest: "uploads/" });

// // 1. GET all properties (no child data)
// router.get("/", propertyController.getAllProperties);

// // 2. POST create a new property (with optional child properties)
// router.post("/", upload.single("documents"), propertyController.createProperty);

// // 3. GET a property (by ID) along with its child properties
// router.get("/with-children/:id", propertyController.getPropertyWithChildren);

// // 4. PUT update an existing property (and replace its child properties)
// router.put("/:id", upload.single("documents"), propertyController.updateProperty);

// // 5. DELETE a property (and its child properties)
// router.delete("/:id", propertyController.deleteProperty);

// module.exports = router;


// ----------------------------------------------------------------------------------------------------------------------------



const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const propertyController = require("../controllers/propertyController");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Setup Cloudinary storage for property documents
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "properties", // Cloudinary folder name for property documents
    allowed_formats: ["jpeg", "jpg", "png", "pdf"],
  },
});

const upload = multer({ storage: storage });

// 1. GET all properties (no child data)
router.get("/", propertyController.getAllProperties);

// 2. POST create a new property (with optional child properties)
router.post("/", upload.single("documents"), propertyController.createProperty);

// 3. GET a property (by ID) along with its child properties
router.get("/with-children/:id", propertyController.getPropertyWithChildren);

// 4. PUT update an existing property (and replace its child properties)
router.put("/:id", upload.single("documents"), propertyController.updateProperty);

// 5. DELETE a property (and its child properties)
router.delete("/:id", propertyController.deleteProperty);

module.exports = router;

