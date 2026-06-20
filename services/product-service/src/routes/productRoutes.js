const express = require("express");

const router = express.Router();

const {
  getProducts,
  createProduct
} = require("../controllers/productController");

const authMiddleware =
require("../middlewares/authMiddleware");

const roleMiddleware =
require("../middlewares/roleMiddleware");

/*
==================================
Protected Routes
==================================
*/

router.get(
  "/products",
  authMiddleware,
  getProducts
);

/*
==================================
Admin Only
==================================
*/

router.post(
  "/products",
  authMiddleware,
  roleMiddleware("admin"),
  createProduct
);

module.exports = router;