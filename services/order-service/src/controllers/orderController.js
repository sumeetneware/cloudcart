const db = require("../config/db");

exports.createOrder = async (req, res) => {

  try {

    const { user_id, total_amount } = req.body;

    await db.query(
      `INSERT INTO orders
       (user_id, total_amount)
       VALUES (?, ?)`,
      [user_id, total_amount]
    );

    res.status(201).json({
      message: "Order Created"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Database Error"
    });

  }

};

exports.getOrders = async (req, res) => {

  try {

    const [rows] =
      await db.query(
        "SELECT * FROM orders"
      );

    res.json(rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Database Error"
    });

  }

};

exports.getOrderById = async (req, res) => {

  try {

    const { id } = req.params;

    const [rows] =
      await db.query(
        "SELECT * FROM orders WHERE id=?",
        [id]
      );

    if (rows.length === 0) {

      return res.status(404).json({
        message: "Order not found"
      });

    }

    res.json(rows[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Database Error"
    });

  }

};