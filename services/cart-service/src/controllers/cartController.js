const db = require("../config/db");

exports.addToCart = async (req, res) => {

  try {

    const {
      product_id,
      quantity
    } = req.body;

    const user_id =
      req.user.id;

    await db.query(
      `INSERT INTO cart_items
       (user_id, product_id, quantity)
       VALUES (?, ?, ?)`,
      [
        user_id,
        product_id,
        quantity
      ]
    );

    res.status(201).json({
      message: "Product added to cart"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Database Error"
    });

  }

};

exports.getCart = async (req, res) => {
  try {
    const user_id = req.user.id;

    const [rows] = await db.query(
      `
      SELECT
        c.id,
        c.user_id,
        c.product_id,
        c.quantity,
        c.created_at,
        p.name AS product_name,
        p.price,
        (c.quantity * p.price) AS subtotal
      FROM cart_items c
      JOIN cloudcart.products p
        ON c.product_id = p.id
      WHERE c.user_id = ?
      `,
      [user_id]
    );

    res.json(rows);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Database Error"
    });
  }
};

exports.removeFromCart = async (req, res) => {

  try {

    const { id } =
      req.params;

    await db.query(
      `DELETE FROM cart_items
       WHERE id = ?`,
      [id]
    );

    res.json({
      message:
      "Item removed from cart"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Database Error"
    });

  }

};