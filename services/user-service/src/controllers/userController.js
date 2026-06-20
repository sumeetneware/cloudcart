const db = require("../config/db");

exports.getUsers = async (req, res) => {
  try {

    const [rows] = await db.query(
      "SELECT * FROM users"
    );

    res.json(rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Database Error"
    });
  }
};

exports.createUser = async (req, res) => {
  try {

    const {
      name,
      email
    } = req.body;

    await db.query(
      `INSERT INTO users
       (name,email)
       VALUES (?,?)`,
      [name,email]
    );

    res.status(201).json({
      message: "User Created"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Database Error"
    });
  }
};