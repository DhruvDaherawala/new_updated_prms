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
//   // Expect childData to contain: property_id, floor, title, description, rooms, washroom, gas, electricity, deposit, rent
//   const { property_id, floor, title, description, rooms, washroom, gas, electricity, deposit, rent } = childData;
//   const query = `
//     INSERT INTO child_properties (property_id, floor, title, description, rooms, washroom, gas, electricity, deposit, rent)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;
//   const [result] = await pool.query(query, [
//     property_id,
//     floor,
//     title,
//     description,
//     rooms,
//     washroom,
//     gas,
//     electricity,
//     deposit,
//     rent,
//   ]);
//   return result.insertId;
// }

// async function updateChildProperty(childPropertyId, childData) {
//   // Expect childData to contain: property_id, floor, title, description, rooms, washroom, gas, electricity, deposit, rent
//   const { property_id, floor, title, description, rooms, washroom, gas, electricity, deposit, rent } = childData;

//   // Check if property_id exists and is not null
//   if (property_id === null || property_id === undefined) {
//     // If property_id is missing or null, first get the current property_id
//     const [rows] = await pool.query(
//       "SELECT property_id FROM child_properties WHERE id = ?",
//       [childPropertyId]
//     );

//     if (rows.length === 0) {
//       throw new Error("Child property not found");
//     }

//     const currentPropertyId = rows[0].property_id;

//     // Now update with all fields except property_id
//     const query = `
//       UPDATE child_properties
//       SET floor = ?, title = ?, description = ?, rooms = ?, washroom = ?, gas = ?, electricity = ?, deposit = ?, rent = ?
//       WHERE id = ?
//     `;

//     const [result] = await pool.query(query, [
//       floor,
//       title,
//       description,
//       rooms,
//       washroom,
//       gas,
//       electricity,
//       deposit,
//       rent,
//       childPropertyId,
//     ]);

//     return result.affectedRows;
//   } else {
//     // If property_id is provided, update all fields including property_id
//     const query = `
//       UPDATE child_properties
//       SET property_id = ?, floor = ?, title = ?, description = ?, rooms = ?, washroom = ?, gas = ?, electricity = ?, deposit = ?, rent = ?
//       WHERE id = ?
//     `;

//     const [result] = await pool.query(query, [
//       property_id,
//       floor,
//       title,
//       description,
//       rooms,
//       washroom,
//       gas,
//       electricity,
//       deposit,
//       rent,
//       childPropertyId,
//     ]);

//     return result.affectedRows;
//   }
// }

// async function deleteChildProperty(childPropertyId) {
//   const [result] = await pool.query("DELETE FROM child_properties WHERE id = ?", [childPropertyId]);
//   return result.affectedRows;
// }

// module.exports = {
//   getAllChildProperties,
//   getChildPropertyById,
//   createChildProperty,
//   updateChildProperty,
//   deleteChildProperty,
// };

// 01-04-25
// childPropertyModel.js
// const pool = require("../config/db");

// async function getAllChildProperties() {
//   const [rows] = await pool.query(
//     "SELECT * FROM child_properties WHERE status != 'Deleted'"
//   );
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
//   const {
//     property_id,
//     floor,
//     title,
//     description,
//     rooms,
//     washroom,
//     gas,
//     electricity,
//     deposit,
//     rent,
//   } = childData;
//   const query = `
//     INSERT INTO child_properties (property_id, floor, title, description, rooms, washroom, gas, electricity, deposit, rent, status)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Active')
//   `;
//   const [result] = await pool.query(query, [
//     property_id,
//     floor,
//     title,
//     description,
//     rooms,
//     washroom,
//     gas,
//     electricity,
//     deposit,
//     rent,
//   ]);
//   return result.insertId;
// }

// async function updateChildProperty(childPropertyId, childData) {
//   const {
//     property_id,
//     floor,
//     title,
//     description,
//     rooms,
//     washroom,
//     gas,
//     electricity,
//     deposit,
//     rent,
//   } = childData;

//   if (property_id === null || property_id === undefined) {
//     const [rows] = await pool.query(
//       "SELECT property_id FROM child_properties WHERE id = ?",
//       [childPropertyId]
//     );

//     if (rows.length === 0) {
//       throw new Error("Child property not found");
//     }

//     const currentPropertyId = rows[0].property_id;

//     const query = `
//       UPDATE child_properties
//       SET floor = ?, title = ?, description = ?, rooms = ?, washroom = ?, gas = ?, electricity = ?, deposit = ?, rent = ?
//       WHERE id = ?
//     `;

//     const [result] = await pool.query(query, [
//       floor,
//       title,
//       description,
//       rooms,
//       washroom,
//       gas,
//       electricity,
//       deposit,
//       rent,
//       childPropertyId,
//     ]);

//     return result.affectedRows;
//   } else {
//     const query = `
//       UPDATE child_properties
//       SET property_id = ?, floor = ?, title = ?, description = ?, rooms = ?, washroom = ?, gas = ?, electricity = ?, deposit = ?, rent = ?
//       WHERE id = ?
//     `;

//     const [result] = await pool.query(query, [
//       property_id,
//       floor,
//       title,
//       description,
//       rooms,
//       washroom,
//       gas,
//       electricity,
//       deposit,
//       rent,
//       childPropertyId,
//     ]);

//     return result.affectedRows;
//   }
// }

// async function deleteChildProperty(childPropertyId) {
//   const [result] = await pool.query(
//     "UPDATE child_properties SET status = 'Deleted' WHERE id = ?",
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

// childPropertyModel.js
const pool = require("../config/db");

async function getAllChildProperties() {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM child_properties WHERE status != 'Deleted' ORDER BY id DESC"
    );
    return rows;
  } catch (error) {
    // Fallback if status column doesn't exist (temporary for debugging)
    if (error.code === "ER_BAD_FIELD_ERROR") {
      console.warn(
        "Status column not found, fetching all child properties without filter"
      );
      const [rows] = await pool.query("SELECT * FROM child_properties ORDER BY id DESC");
      return rows;
    }
    throw error;
  }
}

async function getChildPropertyById(childPropertyId) {
  const [rows] = await pool.query(
    "SELECT * FROM child_properties WHERE id = ?",
    [childPropertyId]
  );
  return rows[0];
}

async function createChildProperty(childData) {
  const {
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
  } = childData;
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
  const {
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
  } = childData;

  if (property_id === null || property_id === undefined) {
    const [rows] = await pool.query(
      "SELECT property_id FROM child_properties WHERE id = ?",
      [childPropertyId]
    );

    if (rows.length === 0) {
      throw new Error("Child property not found");
    }

    const currentPropertyId = rows[0].property_id;

    const query = `
      UPDATE child_properties
      SET floor = ?, title = ?, description = ?, rooms = ?, washroom = ?, gas = ?, electricity = ?, deposit = ?, rent = ?
      WHERE id = ?
    `;

    const [result] = await pool.query(query, [
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
  } else {
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
}

async function deleteChildProperty(childPropertyId) {
  const [result] = await pool.query(
    "UPDATE child_properties SET status = 'Deleted' WHERE id = ?",
    [childPropertyId]
  );
  return result.affectedRows;
}

module.exports = {
  getAllChildProperties,
  getChildPropertyById,
  createChildProperty,
  updateChildProperty,
  deleteChildProperty,
};
