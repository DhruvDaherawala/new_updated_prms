// models/childPropertyModel.js
const pool = require("../config/db");

async function getAllChildProperties() {
  const [rows] = await pool.query("SELECT * FROM child_properties");
  return rows;
}

async function getChildPropertyById(childPropertyId) {
  const [rows] = await pool.query("SELECT * FROM child_properties WHERE id = ?", [childPropertyId]);
  return rows[0];
}

async function createChildProperty(childData) {
  const { propertyId, unitName, floor, remarks, status } = childData;
  const query = `
    INSERT INTO child_properties (propertyId, unitName, floor, remarks, status)
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await pool.query(query, [propertyId, unitName, floor, remarks, status]);
  return result.insertId;
}

async function updateChildProperty(childPropertyId, childData) {
  const { propertyId, unitName, floor, remarks, status } = childData;
  const query = `
    UPDATE child_properties
    SET propertyId = ?, unitName = ?, floor = ?, remarks = ?, status = ?
    WHERE id = ?
  `;
  const [result] = await pool.query(query, [propertyId, unitName, floor, remarks, status, childPropertyId]);
  return result.affectedRows;
}

async function deleteChildProperty(childPropertyId) {
  const [result] = await pool.query("DELETE FROM child_properties WHERE id = ?", [childPropertyId]);
  return result.affectedRows;
}

module.exports = {
  getAllChildProperties,
  getChildPropertyById,
  createChildProperty,
  updateChildProperty,
  deleteChildProperty,
};
