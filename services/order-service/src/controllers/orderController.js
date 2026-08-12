const db = require("../config/db");

exports.createOrder = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { total_amount } = req.body;

    const [result] = await db.query(
      `INSERT INTO orders
       (user_id, total_amount)
       VALUES (?, ?)`,
      [user_id, total_amount]
    );

    // Clear user's cart after successful order
    await db.query(
      `DELETE FROM cart_items
       WHERE user_id = ?`,
      [user_id]
    );

    res.status(201).json({
      message: "Order Created",
      order_id: result.insertId,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Database Error",
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const user_id = req.user.id;

    const [rows] = await db.query(
      `SELECT *
       FROM orders
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [user_id]
    );

    res.json(rows);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Database Error",
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;

    const [rows] = await db.query(
      `SELECT *
       FROM orders
       WHERE id = ?
       AND user_id = ?`,
      [id, user_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(rows[0]);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Database Error",
    });
  }
};