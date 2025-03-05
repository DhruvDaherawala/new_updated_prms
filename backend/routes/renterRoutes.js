// // routes/renterRoutes.js
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const renterController = require("../controllers/renterController");

// // Configure Multer
// const upload = multer({ dest: "uploads/" });

// // GET all renters
// router.get("/", renterController.getAllRenters);

// // POST create a new renter (with file uploads)
// router.post(
//   "/",
//   upload.fields([
//     { name: "aadhaarCard", maxCount: 1 },
//     { name: "panCard", maxCount: 1 },
//     { name: "passportPhoto", maxCount: 1 },
//     { name: "otherDocument", maxCount: 1 },
//   ]),
//   renterController.createRenter
// );

// // PUT update a renter
// router.put("/:id", renterController.updateRenter);

// // DELETE a renter
// router.delete("/:id", renterController.deleteRenter);

// module.exports = router;



// ----------------------------------------------------------------------------------







// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const renterController = require("../controllers/renterController");
// // Use memory storage instead of writing to "uploads/"
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// // GET all renters
// router.get("/", renterController.getAllRenters);
// // POST create a new renter (with file uploads in memory)
// router.post(
//   "/",
//   upload.fields([
//     { name: "aadhaarCard", maxCount: 1 },
//     { name: "panCard", maxCount: 1 },
//     { name: "passportPhoto", maxCount: 1 },
//     { name: "otherDocument", maxCount: 1 },
//   ]),
//   renterController.createRenter
// );
// // PUT update a renter
// router.put("/:id", renterController.updateRenter);
// // DELETE a renter
// router.delete("/:id", renterController.deleteRenter);
// module.exports = router;

// ----------------------------------------------------------------------------------

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const renterController = require("../controllers/renterController");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Setup Cloudinary storage for renter documents
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "renters", // Cloudinary folder name for renter documents
    allowed_formats: ["jpeg", "jpg", "png", "pdf"],
  },
});

const upload = multer({ storage: storage });

// GET all renters
router.get("/", renterController.getAllRenters);

// POST create a new renter (with file uploads via Cloudinary)
router.post(
  "/",
  upload.fields([
    { name: "aadhaarCard", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
    { name: "passportPhoto", maxCount: 1 },
    { name: "otherDocument", maxCount: 1 },
  ]),
  renterController.createRenter
);

// PUT update a renter
router.put("/:id", renterController.updateRenter);

// DELETE a renter
router.delete("/:id", renterController.deleteRenter);

module.exports = router;
