const rentDepositModel = require('../models/rentDepositModel');

/**
 * Get all child properties with parent property information
 */
async function getAllChildPropertiesWithParent(req, res) {
  try {
    const properties = await rentDepositModel.getAllChildPropertiesWithParent();
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties with rent/deposit info:', error);
    res.status(500).json({ error: 'Failed to fetch properties information' });
  }
}

/**
 * Update rent amount for a specific child property
 */
async function updateRent(req, res) {
  const { childPropertyId } = req.params;
  const { rentAmount } = req.body;

  if (!childPropertyId) {
    return res.status(400).json({ error: 'Child property ID is required' });
  }

  if (rentAmount === undefined || rentAmount === null) {
    return res.status(400).json({ error: 'Rent amount is required' });
  }

  try {
    const success = await rentDepositModel.updateRent(childPropertyId, rentAmount);
    
    if (success) {
      res.status(200).json({ message: 'Rent updated successfully' });
    } else {
      res.status(404).json({ error: 'Child property not found or rent not updated' });
    }
  } catch (error) {
    console.error('Error updating rent:', error);
    res.status(500).json({ error: 'Failed to update rent amount' });
  }
}

/**
 * Update deposit amount for a specific child property
 */
async function updateDeposit(req, res) {
  const { childPropertyId } = req.params;
  const { depositAmount } = req.body;

  if (!childPropertyId) {
    return res.status(400).json({ error: 'Child property ID is required' });
  }

  if (depositAmount === undefined || depositAmount === null) {
    return res.status(400).json({ error: 'Deposit amount is required' });
  }

  try {
    const success = await rentDepositModel.updateDeposit(childPropertyId, depositAmount);
    
    if (success) {
      res.status(200).json({ message: 'Deposit updated successfully' });
    } else {
      res.status(404).json({ error: 'Child property not found or deposit not updated' });
    }
  } catch (error) {
    console.error('Error updating deposit:', error);
    res.status(500).json({ error: 'Failed to update deposit amount' });
  }
}

/**
 * Get rent history for a specific child property
 */
async function getRentHistory(req, res) {
  const { childPropertyId } = req.params;

  if (!childPropertyId) {
    return res.status(400).json({ error: 'Child property ID is required' });
  }

  try {
    const history = await rentDepositModel.getRentHistory(childPropertyId);
    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching rent history:', error);
    res.status(500).json({ error: 'Failed to fetch rent history' });
  }
}

/**
 * Get deposit history for a specific child property
 */
async function getDepositHistory(req, res) {
  const { childPropertyId } = req.params;

  if (!childPropertyId) {
    return res.status(400).json({ error: 'Child property ID is required' });
  }

  try {
    const history = await rentDepositModel.getDepositHistory(childPropertyId);
    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching deposit history:', error);
    res.status(500).json({ error: 'Failed to fetch deposit history' });
  }
}

module.exports = {
  getAllChildPropertiesWithParent,
  updateRent,
  updateDeposit,
  getRentHistory,
  getDepositHistory
}; 