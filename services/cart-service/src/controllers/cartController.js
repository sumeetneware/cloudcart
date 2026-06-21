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

    const user_id =
      req.user.id;

    const [rows] =
      await db.query(
        `SELECT * FROM cart_items
         WHERE user_id = ?`,
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