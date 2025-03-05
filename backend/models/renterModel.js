// // models/renterModel.js:'''
// const db = require("../config/db");

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
//     remarks
//   } = renterData;

//   const [renterResult] = await db.execute(
//     `INSERT INTO renters (
//       renterName, fullAddress, age, numberOfStayers,
//       aadhaarCard, panCard, passportPhoto, otherDocument,
//       contact1, contact2, remarks
//     )
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//     [
//       renterName,
//       fullAddress,
//       age,
//       numberOfStayers,
//       aadhaarCard,
//       panCard,
//       passportPhoto,
//       otherDocument,
//       contact1,
//       contact2,
//       remarks
//     ]
//   );

//   return renterResult.insertId;
// }

// module.exports = {
//   createRenter,
// };

const pool = require("../config/db");
async function getAllRenters() {
  const [rows] = await pool.query("SELECT * FROM renters");
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
      contact1, contact2, remarks
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
  } = renterData;

  const query = `
    UPDATE renters
    SET renterName = ?, fullAddress = ?, age = ?, numberOfStayers = ?,
        contact1 = ?, contact2 = ?, remarks = ?
    WHERE id = ?
  `;

  const [result] = await pool.query(query, [
    renterName,
    fullAddress,
    age,
    numberOfStayers,
    contact1,
    contact2,
    remarks,
    renterId,
  ]);

  return result.affectedRows;
}
async function deleteRenter(renterId) {
  const query = "DELETE FROM renters WHERE id = ?";
  const [result] = await pool.query(query, [renterId]);
  return result.affectedRows;
}
module.exports = {
  getAllRenters,
  createRenter,
  updateRenter,
  deleteRenter,
};
