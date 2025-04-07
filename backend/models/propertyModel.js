// propertyModel.js
const pool = require("../config/db");

async function getAllProperties() {
  // Exclude properties with status 'Deleted'
  const [rows] = await pool.query(
    "SELECT * FROM properties WHERE status != 'Deleted' ORDER BY id DESC"
  );
  return rows;
}

async function createProperty(propertyData, childProperties = []) {
  const {
    propertyName,
    ownerName,
    address,
    documents,
    numberOfFloors,
    status,
  } = propertyData;

  const insertPropertyQuery = `
    INSERT INTO properties (propertyName, ownerName, address, documents, numberOfFloors, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const [result] = await pool.query(insertPropertyQuery, [
    propertyName,
    ownerName,
    address,
    documents,
    numberOfFloors,
    status || "Active",
  ]);
  const newPropertyId = result.insertId;

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

async function getPropertyWithChildren(propertyId) {
  const query = `
    SELECT
      p.id AS propertyId,
      p.propertyName,
      p.ownerName,
      p.address,
      p.documents,
      p.numberOfFloors,
      p.status,
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

  if (!rows.length) {
    return null;
  }

  const property = {
    id: rows[0].propertyId,
    propertyName: rows[0].propertyName,
    ownerName: rows[0].ownerName,
    address: rows[0].address,
    documents: rows[0].documents,
    numberOfFloors: rows[0].numberOfFloors,
    status: rows[0].status || "Active",
    childProperties: [],
  };

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

async function updateProperty(propertyId, propertyData) {
  const {
    propertyName,
    ownerName,
    address,
    documents,
    childProperties,
    numberOfFloors,
    status,
  } = propertyData;

  const updatePropertyQuery = `
    UPDATE properties
    SET propertyName = ?, ownerName = ?, address = ?, documents = ?, numberOfFloors = ?, status = ?
    WHERE id = ?
  `;
  await pool.query(updatePropertyQuery, [
    propertyName,
    ownerName,
    address,
    documents,
    numberOfFloors,
    status || "Active",
    propertyId,
  ]);

  await pool.query("DELETE FROM child_properties WHERE property_id = ?", [
    propertyId,
  ]);

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

async function deleteProperty(propertyId) {
  // Instead of deleting, update the status to 'Deleted'
  const [result] = await pool.query(
    "UPDATE properties SET status = 'Deleted' WHERE id = ?",
    [propertyId]
  );
  // Return true if a row was affected, false otherwise
  return result.affectedRows > 0;
}

module.exports = {
  getAllProperties,
  createProperty,
  getPropertyWithChildren,
  updateProperty,
  deleteProperty,
};
