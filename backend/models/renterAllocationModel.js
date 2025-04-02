// const db = require("../config/db");

// // Get all allocations
// async function getAllAllocations() {
//   const query = "SELECT * FROM renter_allocation ORDER BY allocation_date DESC";
//   const [rows] = await db.execute(query);
//   return rows;
// }

// // Get a single allocation by ID
// async function getAllocationById(id) {
//   const query = "SELECT * FROM renter_allocation WHERE allocation_id = ? LIMIT 1";
//   const [rows] = await db.execute(query, [id]);
//   return rows[0] || null;
// }

// // Create a new allocation
// async function createAllocation(allocationData) {
//   try {
//     // Check for NULL document paths and replace with defaults
//     const rent_agreement = allocationData.rent_agreement || 'uploads/default/default_agreement.pdf';
//     const other_document = allocationData.other_document || 'uploads/default/default_document.pdf';

//     const query = `
//       INSERT INTO renter_allocation
//         (renter_id, property_id, childproperty_id, allocation_date, rent, rent_agreement, other_document, remarks, status)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     const values = [
//       allocationData.renter_id,
//       allocationData.property_id,
//       allocationData.childproperty_id,
//       allocationData.allocation_date,
//       allocationData.rent,
//       rent_agreement,
//       other_document,
//       allocationData.remarks,
//       allocationData.status,
//     ];

//     console.log('Executing query with values:', values);

//     const [result] = await db.execute(query, values);
//     return result.insertId;
//   } catch (error) {
//     console.error('Error in createAllocation:', error);
//     throw error;
//   }
// }

// // Update an existing allocation
// async function updateAllocation(id, allocationData) {
//   try {
//     // First check if the allocation exists
//     const existing = await getAllocationById(id);
//     if (!existing) {
//       return false;
//     }

//     // Check for NULL document paths and use existing values
//     const rent_agreement = allocationData.rent_agreement || existing.rent_agreement;
//     const other_document = allocationData.other_document || existing.other_document;

//     const query = `
//       UPDATE renter_allocation
//       SET renter_id = ?,
//           property_id = ?,
//           childproperty_id = ?,
//           allocation_date = ?,
//           rent = ?,
//           rent_agreement = ?,
//           other_document = ?,
//           remarks = ?,
//           status = ?,
//           updated_at = CURRENT_TIMESTAMP
//       WHERE allocation_id = ?
//     `;

//     const values = [
//       allocationData.renter_id,
//       allocationData.property_id,
//       allocationData.childproperty_id,
//       allocationData.allocation_date,
//       allocationData.rent,
//       rent_agreement,
//       other_document,
//       allocationData.remarks,
//       allocationData.status,
//       id,
//     ];

//     console.log('Executing update with values:', values);

//     const [result] = await db.execute(query, values);
//     return result.affectedRows > 0;
//   } catch (error) {
//     console.error('Error in updateAllocation:', error);
//     throw error;
//   }
// }

// // Delete an allocation (physical delete)
// async function deleteAllocation(id) {
//   try {
//     const query = "DELETE FROM renter_allocation WHERE allocation_id = ?";
//     const [result] = await db.execute(query, [id]);
//     return result.affectedRows > 0;
//   } catch (error) {
//     console.error('Error in deleteAllocation:', error);
//     throw error;
//   }
// }

// module.exports = {
//   getAllAllocations,
//   getAllocationById,
//   createAllocation,
//   updateAllocation,
//   deleteAllocation,
// };

// 02-04-25
// const db = require("../config/db");

// // Get all allocations (exclude Deleted status)
// async function getAllAllocations() {
//   const query =
//     "SELECT * FROM renter_allocation WHERE status != 'Deleted' ORDER BY allocation_date DESC";
//   const [rows] = await db.execute(query);
//   return rows;
// }

// // Get allocation by ID (exclude Deleted status)
// async function getAllocationById(id) {
//   const query =
//     "SELECT * FROM renter_allocation WHERE allocation_id = ? AND status != 'Deleted' LIMIT 1";
//   const [rows] = await db.execute(query, [id]);
//   return rows[0] || null;
// }

// // Create allocation
// async function createAllocation(allocationData) {
//   try {
//     const rent_agreement =
//       allocationData.rent_agreement || "uploads/default/default_agreement.pdf";
//     const other_document =
//       allocationData.other_document || "uploads/default/default_document.pdf";

//     const query = `
//       INSERT INTO renter_allocation
//         (renter_id, property_id, childproperty_id, allocation_date, rent_agreement, other_document, remarks, status)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     const values = [
//       allocationData.renter_id,
//       allocationData.property_id,
//       allocationData.childproperty_id,
//       allocationData.allocation_date,
//       rent_agreement,
//       other_document,
//       allocationData.remarks,
//       allocationData.status,
//     ];

//     const [result] = await db.execute(query, values);
//     return result.insertId;
//   } catch (error) {
//     console.error("Error in createAllocation:", error);
//     throw error;
//   }
// }

// // Update allocation (modified to work with existing status column)
// async function updateAllocation(id, allocationData) {
//   try {
//     const existing = await getAllocationById(id);
//     if (!existing) {
//       return false;
//     }

//     const rent_agreement =
//       allocationData.rent_agreement || existing.rent_agreement;
//     const other_document =
//       allocationData.other_document || existing.other_document;
//     const status = allocationData.status || existing.status;

//     const query = `
//       UPDATE renter_allocation
//       SET renter_id = ?,
//           property_id = ?,
//           childproperty_id = ?,
//           allocation_date = ?,
//           rent_agreement = ?,
//           other_document = ?,
//           remarks = ?,
//           status = ?,
//           updated_at = CURRENT_TIMESTAMP
//       WHERE allocation_id = ?
//     `;

//     const values = [
//       allocationData.renter_id || existing.renter_id,
//       allocationData.property_id || existing.property_id,
//       allocationData.childproperty_id || existing.childproperty_id,
//       allocationData.allocation_date || existing.allocation_date,
//       rent_agreement,
//       other_document,
//       allocationData.remarks || existing.remarks,
//       status,
//       id,
//     ];

//     const [result] = await db.execute(query, values);
//     return result.affectedRows > 0;
//   } catch (error) {
//     console.error("Error in updateAllocation:", error);
//     throw error;
//   }
// }

// module.exports = {
//   getAllAllocations,
//   getAllocationById,
//   createAllocation,
//   updateAllocation,
// };

// 02-04-25
const db = require("../config/db");

// Get all allocations
async function getAllAllocations() {
  const query =
    "SELECT * FROM renter_allocation WHERE status != 'Deleted' ORDER BY allocation_date DESC";
  const [rows] = await db.execute(query);
  return rows;
}

// Get a single allocation by ID
async function getAllocationById(id) {
  const query =
    "SELECT * FROM renter_allocation WHERE id = ? AND status != 'Deleted' LIMIT 1"; // Changed to 'id'
  const [rows] = await db.execute(query, [id]);
  return rows[0] || null;
}

// Create a new allocation
async function createAllocation(allocationData) {
  try {
    const rent_agreement =
      allocationData.rent_agreement || "uploads/default/default_agreement.pdf";
    const other_document =
      allocationData.other_document || "uploads/default/default_document.pdf";

    const query = `
      INSERT INTO renter_allocation 
        (renter_id, property_id, childproperty_id, allocation_date, rent_agreement, other_document, remarks, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      allocationData.renter_id,
      allocationData.property_id,
      allocationData.childproperty_id,
      allocationData.allocation_date,
      rent_agreement,
      other_document,
      allocationData.remarks,
      allocationData.status,
    ];

    console.log("Executing query with values:", values);

    const [result] = await db.execute(query, values);
    return result.insertId;
  } catch (error) {
    console.error("Error in createAllocation:", error);
    throw error;
  }
}

// Update an existing allocation
async function updateAllocation(id, allocationData) {
  try {
    const existing = await getAllocationById(id);
    if (!existing) {
      return false;
    }

    const rent_agreement =
      allocationData.rent_agreement || existing.rent_agreement;
    const other_document =
      allocationData.other_document || existing.other_document;
    const status = allocationData.status || existing.status;

    const query = `
      UPDATE renter_allocation
      SET renter_id = ?,
          property_id = ?,
          childproperty_id = ?,
          allocation_date = ?,
          rent_agreement = ?,
          other_document = ?,
          remarks = ?,
          status = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`; // Changed to 'id'

    const values = [
      allocationData.renter_id || existing.renter_id,
      allocationData.property_id || existing.property_id,
      allocationData.childproperty_id || existing.childproperty_id,
      allocationData.allocation_date || existing.allocation_date,
      rent_agreement,
      other_document,
      allocationData.remarks || existing.remarks,
      status,
      id,
    ];

    console.log("Executing update with values:", values);

    const [result] = await db.execute(query, values);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error in updateAllocation:", error);
    throw error;
  }
}

module.exports = {
  getAllAllocations,
  getAllocationById,
  createAllocation,
  updateAllocation,
};
