const promisePool = require("../config/db");
exports.getChildProperties = async (req, res) => {
  try {
    const { id } = req.params; // property_id
    const [childProperties] = await promisePool.query(
      "SELECT * FROM child_properties WHERE property_id = ?",
      [id]
    );
    return res.json(childProperties);
  } catch (err) {
    console.error("Error fetching child properties:", err);
    return res.status(500).json({ error: err.message });
  }
};
