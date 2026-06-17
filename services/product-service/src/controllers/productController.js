const db = require("../config/db");

exports.getProducts = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM products"
    );

    res.json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Database Error"
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock
    } = req.body;

    await db.query(
      `INSERT INTO products
       (name, description, price, stock)
       VALUES (?, ?, ?, ?)`,
      [name, description, price, stock]
    );

    res.status(201).json({
      message: "Product Created"
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Database Error"
    });
  }
};