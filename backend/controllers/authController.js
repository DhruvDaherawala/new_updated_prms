// controllers/authController.js
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const query =
    "SELECT * FROM registration WHERE username = ? AND password = ?";

  try {
    const [results] = await db.query(query, [username, password]);
    if (results.length > 0) {
      const user = { id: results[0].id, username: results[0].username };
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "120s",
      });
      console.log("Token generated:", token);
      return res.status(200).json({ message: "Login successful", token });
    } else {
      console.log("Invalid credentials for:", username);
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    console.log("User logged out, token received:", token);
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
