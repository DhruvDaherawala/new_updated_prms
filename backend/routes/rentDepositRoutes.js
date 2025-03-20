const express = require('express');
const router = express.Router();
const rentDepositController = require('../controllers/rentDepositController');

// Get all child properties with parent property information
router.get('/properties-with-details', rentDepositController.getAllChildPropertiesWithParent);

// Update rent for a specific child property
router.put('/rent/:childPropertyId', rentDepositController.updateRent);

// Update deposit for a specific child property
router.put('/deposit/:childPropertyId', rentDepositController.updateDeposit);

// Get rent history for a specific child property (for future implementation)
router.get('/rent-history/:childPropertyId', rentDepositController.getRentHistory);

// Get deposit history for a specific child property (for future implementation)
router.get('/deposit-history/:childPropertyId', rentDepositController.getDepositHistory);

module.exports = router; 