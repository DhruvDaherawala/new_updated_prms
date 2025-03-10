// // models/childPropertyModel.js
// const pool = require("../config/db");

// async function getAllChildProperties() {
//   const [rows] = await pool.query("SELECT * FROM child_properties");
//   return rows;
// }

// async function getChildPropertyById(childPropertyId) {
//   const [rows] = await pool.query(
//     "SELECT * FROM child_properties WHERE id = ?",
//     [childPropertyId]
//   );
//   return rows[0];
// }

// async function createChildProperty(childData) {
//   const { propertyId, unitName, floor, remarks, status } = childData;
//   const query = `
//     INSERT INTO child_properties (property_id, unitName, floor, remarks, status)
//     VALUES (?, ?, ?, ?, ?)
//   `;
//   const [result] = await pool.query(query, [
//     propertyId,
//     unitName,
//     floor,
//     remarks,
//     status,
//   ]);
//   return result.insertId;
// }

// async function updateChildProperty(childPropertyId, childData) {
//   const { propertyId, unitName, floor, remarks, status } = childData;
//   const query = `
//     UPDATE child_properties
//     SET property_id = ?, unitName = ?, floor = ?, remarks = ?, status = ?
//     WHERE id = ?
//   `;
//   const [result] = await pool.query(query, [
//     propertyId,
//     unitName,
//     floor,
//     remarks,
//     status,
//     childPropertyId,
//   ]);
//   return result.affectedRows;
// }

// async function deleteChildProperty(childPropertyId) {
//   const [result] = await pool.query(
//     "DELETE FROM child_properties WHERE id = ?",
//     [childPropertyId]
//   );
//   return result.affectedRows;
// }

// module.exports = {
//   getAllChildProperties,
//   getChildPropertyById,
//   createChildProperty,
//   updateChildProperty,
//   deleteChildProperty,
// };




const pool = require("../config/db");

async function getAllChildProperties() {
  const [rows] = await pool.query("SELECT * FROM child_properties");
  return rows;
}

async function getChildPropertyById(childPropertyId) {
  const [rows] = await pool.query(
    "SELECT * FROM child_properties WHERE id = ?",
    [childPropertyId]
  );
  return rows[0];
}

async function createChildProperty(childData) {
  // Expect childData to contain: property_id, floor, title, description, rooms, washroom, gas, electricity, deposit, rent
  const { property_id, floor, title, description, rooms, washroom, gas, electricity, deposit, rent } = childData;
  const query = `
    INSERT INTO child_properties (property_id, floor, title, description, rooms, washroom, gas, electricity, deposit, rent)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const [result] = await pool.query(query, [
    property_id,
    floor,
    title,
    description,
    rooms,
    washroom,
    gas,
    electricity,
    deposit,
    rent,
  ]);
  return result.insertId;
}

async function updateChildProperty(childPropertyId, childData) {
  // Expect childData to contain: property_id, floor, title, description, rooms, washroom, gas, electricity, deposit, rent
  const { property_id, floor, title, description, rooms, washroom, gas, electricity, deposit, rent } = childData;
  const query = `
    UPDATE child_properties
    SET property_id = ?, floor = ?, title = ?, description = ?, rooms = ?, washroom = ?, gas = ?, electricity = ?, deposit = ?, rent = ?
    WHERE id = ?
  `;
  const [result] = await pool.query(query, [
    property_id,
    floor,
    title,
    description,
    rooms,
    washroom,
    gas,
    electricity,
    deposit,
    rent,
    childPropertyId,
  ]);
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
