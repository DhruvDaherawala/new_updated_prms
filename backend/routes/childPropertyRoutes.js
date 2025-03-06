// routes/childPropertyRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // Using default storage since there are no files to upload
const childPropertyController = require("../controllers/childPropertyController");

// GET all child properties
router.get("/", childPropertyController.getAllChildProperties);

// GET a single child property
router.get("/:id", childPropertyController.getChildPropertyById);

// POST create a new child property
router.post("/", upload.none(), childPropertyController.createChildProperty);

// PUT update an existing child property
router.put("/:id", upload.none(), childPropertyController.updateChildProperty);

// DELETE a child property
router.delete("/:id", childPropertyController.deleteChildProperty);

module.exports = router;
