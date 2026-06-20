const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/*
==================================
REGISTER
==================================
*/
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

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Database Error"
    });
  }
};

/*
==================================
LOGIN
==================================
*/
exports.login = async (req, res) => {

  try {

    const {
      username,
      password
    } = req.body;

    const [rows] = await db.query(
      `SELECT * FROM auth_users
       WHERE username = ?`,
      [username]
    );

    if (rows.length === 0) {

      return res.status(401).json({
        message: "Invalid Credentials"
      });
    }

    const user = rows[0];

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(401).json({
        message: "Invalid Credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.json({
      token
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server Error"
    });
  }
};