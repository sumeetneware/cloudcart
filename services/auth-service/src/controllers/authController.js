const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

  try {

    const {
      username,
      password,
      role
    } = req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO auth_users
       (username,password,role)
       VALUES (?,?,?)`,
      [
        username,
        hashedPassword,
        role
      ]
    );

    res.status(201).json({
      message: "User Registered"
    });

  } catch(err) {

    console.error(err);

    res.status(500).json({
      message: "Database Error"
    });
  }
};
