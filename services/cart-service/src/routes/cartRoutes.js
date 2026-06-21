const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middlewares/authMiddleware");

const {
  addToCart,
  getCart,
  removeFromCart
} =
require("../controllers/cartController");

router.post(
  "/cart",
  authMiddleware,
  addToCart
);

router.get(
  "/cart",
  authMiddleware,
  getCart
);

router.delete(
  "/cart/:id",
  authMiddleware,
  removeFromCart
);

module.exports = router;