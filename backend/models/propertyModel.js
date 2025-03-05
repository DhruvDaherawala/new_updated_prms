// // // models/propertyModel.js:'''
// // const db = require("../config/db");

// // // Example function to insert a property record
// // async function createProperty(propertyData, childProperties) {
// //   // propertyData = { propertyName, ownerName, address, documents, ... }
// //   const {
// //     propertyName,
// //     ownerName,
// //     address,
// //     documents
// //   } = propertyData;

// //   // 1. Insert the main property
// //   const [propertyResult] = await db.execute(
// //     `INSERT INTO properties (propertyName, ownerName, address, documents)
// //      VALUES (?, ?, ?, ?)`,
// //     [propertyName, ownerName, address, documents]
// //   );
// //   const propertyId = propertyResult.insertId;

// //   // 2. Insert child properties (floors)
// //   for (const child of childProperties) {
// //     const {
// //       floor,
// //       title,
// //       description,
// //       rooms,
// //       washroom,
// //       gas,
// //       electricity,
// //       deposit,
// //       rent
// //     } = child;

// //     await db.execute(
// //       `INSERT INTO child_properties (
// //         propertyId, floor, title, description,
// //         rooms, washroom, gas, electricity, deposit, rent
// //       )
// //       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
// //       [
// //         propertyId,
// //         floor,
// //         title,
// //         description,
// //         rooms,
// //         washroom,
// //         gas,
// //         electricity,
// //         deposit,
// //         rent
// //       ]
// //     );
// //   }

// //   return propertyId;
// // }

// // module.exports = {
// //   createProperty,
// // };


// const pool = require("../config/db");

// async function createProperty(propertyData, childProperties) {
//   const { propertyName, ownerName, address, documents } = propertyData;

//   // Insert main property
//   const [propertyResult] = await pool.query(
//     `INSERT INTO properties (propertyName, ownerName, address, documents)
//      VALUES (?, ?, ?, ?)`,
//     [propertyName, ownerName, address, documents]
//   );
//   const propertyId = propertyResult.insertId;

//   // Insert child properties
//   if (Array.isArray(childProperties) && childProperties.length > 0) {
//     const insertChildQuery = `
//       INSERT INTO child_properties (
//         property_id, floor, title, description, rooms, washroom,
//         gas, electricity, deposit, rent
//       )
//       VALUES ?
//     `;
//     const childValues = childProperties.map((child) => [
//       propertyId,
//       child.floor,
//       child.title,
//       child.description,
//       child.rooms,
//       child.washroom,
//       child.gas,
//       child.electricity,
//       child.deposit,
//       child.rent,
//     ]);
//     await pool.query(insertChildQuery, [childValues]);
//   }

//   return propertyId;
// }

// module.exports = {
//   createProperty,
// };

const pool = require("../config/db");
async function getAllProperties() {
  const [rows] = await pool.query("SELECT * FROM properties");
  return rows;
}
async function createProperty(propertyData, childProperties = []) {
  const { propertyName, ownerName, address, documents } = propertyData;

  // 1. Insert the main property
  const insertPropertyQuery = `
    INSERT INTO properties (propertyName, ownerName, address, documents)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await pool.query(insertPropertyQuery, [
    propertyName,
    ownerName,
    address,
    documents,
  ]);
  const newPropertyId = result.insertId;

  // 2. Insert child properties, if any
  if (Array.isArray(childProperties) && childProperties.length > 0) {
    const insertChildQuery = `
      INSERT INTO child_properties
        (property_id, floor, title, description, rooms, washroom, gas, electricity, deposit, rent)
      VALUES ?
    `;
    const childValues = childProperties.map((child) => [
      newPropertyId,
      child.floor,
      child.title,
      child.description,
      child.rooms,
      child.washroom,
      child.gas,
      child.electricity,
      child.deposit,
      child.rent,
    ]);
    await pool.query(insertChildQuery, [childValues]);
  }

  return newPropertyId;
}

/**
 * GET a property (by ID) along with its child properties
 */
async function getPropertyWithChildren(propertyId) {
  const query = `
    SELECT
      p.id AS propertyId,
      p.propertyName,
      p.ownerName,
      p.address,
      p.documents,
      cp.id AS childId,
      cp.floor,
      cp.title,
      cp.description,
      cp.rooms,
      cp.washroom,
      cp.gas,
      cp.electricity,
      cp.deposit,
      cp.rent
    FROM properties p
    LEFT JOIN child_properties cp ON p.id = cp.property_id
    WHERE p.id = ?
  `;
  const [rows] = await pool.query(query, [propertyId]);

  // If no rows, property doesn't exist
  if (!rows.length) {
    return null;
  }

  // Build the property object
  const property = {
    id: rows[0].propertyId,
    propertyName: rows[0].propertyName,
    ownerName: rows[0].ownerName,
    address: rows[0].address,
    documents: rows[0].documents,
    childProperties: [],
  };

  // Gather child properties
  rows.forEach((row) => {
    if (row.childId) {
      property.childProperties.push({
        id: row.childId,
        floor: row.floor,
        title: row.title,
        description: row.description,
        rooms: row.rooms,
        washroom: row.washroom,
        gas: row.gas,
        electricity: row.electricity,
        deposit: row.deposit,
        rent: row.rent,
      });
    }
  });

  return property;
}

/**
 * UPDATE an existing property (replace child properties)
 */
async function updateProperty(propertyId, propertyData) {
  const { propertyName, ownerName, address, documents, childProperties } = propertyData;

  // 1. Update the main property
  const updatePropertyQuery = `
    UPDATE properties
    SET propertyName = ?, ownerName = ?, address = ?, documents = ?
    WHERE id = ?
  `;
  await pool.query(updatePropertyQuery, [
    propertyName,
    ownerName,
    address,
    documents,
    propertyId,
  ]);

  // 2. Delete existing child properties for this property
  await pool.query("DELETE FROM child_properties WHERE property_id = ?", [propertyId]);

  // 3. Re-insert child properties if provided
  if (Array.isArray(childProperties) && childProperties.length > 0) {
    const insertChildQuery = `
      INSERT INTO child_properties
        (property_id, floor, title, description, rooms, washroom, gas, electricity, deposit, rent)
      VALUES ?
    `;
    const childValues = childProperties.map((child) => [
      propertyId,
      child.floor,
      child.title,
      child.description,
      child.rooms,
      child.washroom,
      child.gas,
      child.electricity,
      child.deposit,
      child.rent,
    ]);
    await pool.query(insertChildQuery, [childValues]);
  }
}

/**
 * DELETE a property (and its child properties)
 */
async function deleteProperty(propertyId) {
  // First remove the child properties
  await pool.query("DELETE FROM child_properties WHERE property_id = ?", [propertyId]);

  // Then remove the property itself
  const [result] = await pool.query("DELETE FROM properties WHERE id = ?", [propertyId]);
  // If result.affectedRows = 0, property didn't exist
  return result.affectedRows > 0;
}

module.exports = {
  getAllProperties,
  createProperty,
  getPropertyWithChildren,
  updateProperty,
  deleteProperty,
};