const express = require("express");

const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrderById
} = require("../controllers/orderController");

const authMiddleware =
require("../middlewares/authMiddleware");

router.post(
  "/orders",
  authMiddleware,
  createOrder
);

router.get(
  "/orders",
  authMiddleware,
  getOrders
);

router.get(
  "/orders/:id",
  authMiddleware,
  getOrderById
);

module.exports = router;