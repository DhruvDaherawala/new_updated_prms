// const pool = require("../config/db");
// async function getAllRenters() {
//   const [rows] = await pool.query("SELECT * FROM renters");
//   return rows;
// }
// async function createRenter(renterData) {
//   const {
//     renterName,
//     fullAddress,
//     age,
//     numberOfStayers,
//     aadhaarCard,
//     panCard,
//     passportPhoto,
//     otherDocument,
//     contact1,
//     contact2,
//     remarks,
//   } = renterData;

//   const query = `
//     INSERT INTO renters (
//       renterName, fullAddress, age, numberOfStayers,
//       aadhaarCard, panCard, passportPhoto, otherDocument,
//       contact1, contact2, remarks
//     )
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   const [result] = await pool.query(query, [
//     renterName,
//     fullAddress,
//     age,
//     numberOfStayers,
//     aadhaarCard,
//     panCard,
//     passportPhoto,
//     otherDocument,
//     contact1,
//     contact2,
//     remarks,
//   ]);

//   return result.insertId;
// }

// async function updateRenter(renterId, renterData) {
//   // Extract all possible fields
//   const {
//     renterName,
//     fullAddress,
//     age,
//     numberOfStayers,
//     contact1,
//     contact2,
//     remarks,

//     aadhaarCard,
//     panCard,
//     passportPhoto,
//     otherDocument,
//   } = renterData;

//   // Build dynamic query - only update fields that were provided
//   let fields = [];
//   let values = [];

//   // Add text fields
//   if (renterName !== undefined) {
//     fields.push("renterName = ?");
//     values.push(renterName);
//   }

//   if (fullAddress !== undefined) {
//     fields.push("fullAddress = ?");
//     values.push(fullAddress);
//   }

//   if (age !== undefined) {
//     fields.push("age = ?");
//     values.push(age);
//   }

//   if (numberOfStayers !== undefined) {
//     fields.push("numberOfStayers = ?");
//     values.push(numberOfStayers);
//   }

//   if (contact1 !== undefined) {
//     fields.push("contact1 = ?");
//     values.push(contact1);
//   }

//   if (contact2 !== undefined) {
//     fields.push("contact2 = ?");
//     values.push(contact2);
//   }

//   if (remarks !== undefined) {
//     fields.push("remarks = ?");
//     values.push(remarks);
//   }

//   // Add file fields if they exist
//   if (aadhaarCard !== undefined) {
//     fields.push("aadhaarCard = ?");
//     values.push(aadhaarCard);
//   }

//   if (panCard !== undefined) {
//     fields.push("panCard = ?");
//     values.push(panCard);
//   }

//   if (passportPhoto !== undefined) {
//     fields.push("passportPhoto = ?");
//     values.push(passportPhoto);
//   }

//   if (otherDocument !== undefined) {
//     fields.push("otherDocument = ?");
//     values.push(otherDocument);
//   }

//   // Add ID as the last value
//   values.push(renterId);

//   // If no fields to update, return
//   if (fields.length === 0) {
//     return 0;
//   }

//   const query = `
//     UPDATE renters
//     SET ${fields.join(", ")}
//     WHERE id = ?
//   `;

//   const [result] = await pool.query(query, values);
//   return result.affectedRows;
// }

// async function deleteRenter(renterId) {
//   const query = "DELETE FROM renters WHERE id = ?";
//   const [result] = await pool.query(query, [renterId]);
//   return result.affectedRows;
// }
// module.exports = {
//   getAllRenters,
//   createRenter,
//   updateRenter,
//   deleteRenter,
// };

// 02-04-25
// renterModel.js
const pool = require("../config/db");

async function getAllRenters() {
  const [rows] = await pool.query(
    "SELECT * FROM renters WHERE status != 'Deleted'"
  );
  return rows;
}

async function createRenter(renterData) {
  const {
    renterName,
    fullAddress,
    age,
    numberOfStayers,
    aadhaarCard,
    panCard,
    passportPhoto,
    otherDocument,
    contact1,
    contact2,
    remarks,
  } = renterData;

  const query = `
    INSERT INTO renters (
      renterName, fullAddress, age, numberOfStayers,
      aadhaarCard, panCard, passportPhoto, otherDocument,
      contact1, contact2, remarks, status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Active')
  `;

  const [result] = await pool.query(query, [
    renterName,
    fullAddress,
    age,
    numberOfStayers,
    aadhaarCard,
    panCard,
    passportPhoto,
    otherDocument,
    contact1,
    contact2,
    remarks,
  ]);

  return result.insertId;
}

async function updateRenter(renterId, renterData) {
  const {
    renterName,
    fullAddress,
    age,
    numberOfStayers,
    contact1,
    contact2,
    remarks,
    aadhaarCard,
    panCard,
    passportPhoto,
    otherDocument,
  } = renterData;

  let fields = [];
  let values = [];

  if (renterName !== undefined) {
    fields.push("renterName = ?");
    values.push(renterName);
  }
  if (fullAddress !== undefined) {
    fields.push("fullAddress = ?");
    values.push(fullAddress);
  }
  if (age !== undefined) {
    fields.push("age = ?");
    values.push(age);
  }
  if (numberOfStayers !== undefined) {
    fields.push("numberOfStayers = ?");
    values.push(numberOfStayers);
  }
  if (contact1 !== undefined) {
    fields.push("contact1 = ?");
    values.push(contact1);
  }
  if (contact2 !== undefined) {
    fields.push("contact2 = ?");
    values.push(contact2);
  }
  if (remarks !== undefined) {
    fields.push("remarks = ?");
    values.push(remarks);
  }
  if (aadhaarCard !== undefined) {
    fields.push("aadhaarCard = ?");
    values.push(aadhaarCard);
  }
  if (panCard !== undefined) {
    fields.push("panCard = ?");
    values.push(panCard);
  }
  if (passportPhoto !== undefined) {
    fields.push("passportPhoto = ?");
    values.push(passportPhoto);
  }
  if (otherDocument !== undefined) {
    fields.push("otherDocument = ?");
    values.push(otherDocument);
  }

  values.push(renterId);

  if (fields.length === 0) {
    return 0;
  }

  const query = `
    UPDATE renters
    SET ${fields.join(", ")}
    WHERE id = ?
  `;

  const [result] = await pool.query(query, values);
  return result.affectedRows;
}

async function deleteRenter(renterId) {
  const query = "UPDATE renters SET status = 'Deleted' WHERE id = ?";
  const [result] = await pool.query(query, [renterId]);
  return result.affectedRows;
}

module.exports = {
  getAllRenters,
  createRenter,
  updateRenter,
  deleteRenter,
};
