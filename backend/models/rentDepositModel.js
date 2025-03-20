const pool = require("../config/db");

/**
 * Get all child properties with their parent property details
 */
async function getAllChildPropertiesWithParent() {
  const query = `
    SELECT 
      cp.id,
      cp.property_id,
      cp.floor,
      cp.title,
      cp.description,
      cp.rooms,
      cp.washroom,
      cp.gas,
      cp.electricity,
      cp.deposit,
      cp.rent,
      p.propertyName as parentPropertyName
    FROM 
      child_properties cp
    JOIN 
      properties p ON cp.property_id = p.id
    ORDER BY 
      p.propertyName, cp.floor
  `;
  
  const [rows] = await pool.query(query);
  return rows;
}

/**
 * Update rent amount for a specific child property
 */
async function updateRent(childPropertyId, rentAmount) {
  const query = `
    UPDATE child_properties
    SET rent = ?
    WHERE id = ?
  `;
  
  const [result] = await pool.query(query, [rentAmount, childPropertyId]);
  return result.affectedRows > 0;
}

/**
 * Update deposit amount for a specific child property
 */
async function updateDeposit(childPropertyId, depositAmount) {
  const query = `
    UPDATE child_properties
    SET deposit = ?
    WHERE id = ?
  `;
  
  const [result] = await pool.query(query, [depositAmount, childPropertyId]);
  return result.affectedRows > 0;
}

/**
 * Get rent history for a specific child property
 * This is for future implementation if you want to track rent changes over time
 */
async function getRentHistory(childPropertyId) {
  // This would require a new table to track rent changes
  // For now, we'll return a placeholder
  return [];
}

/**
 * Get deposit history for a specific child property
 * This is for future implementation if you want to track deposit changes over time
 */
async function getDepositHistory(childPropertyId) {
  // This would require a new table to track deposit changes
  // For now, we'll return a placeholder
  return [];
}

module.exports = {
  getAllChildPropertiesWithParent,
  updateRent,
  updateDeposit,
  getRentHistory,
  getDepositHistory
}; 