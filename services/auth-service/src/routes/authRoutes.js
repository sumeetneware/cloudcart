const express = require("express");

const router = express.Router();

const {
  register,
  login
} = require("../controllers/authController");

const authMiddleware =
require("../middleware/authMiddleware");

router.post(
  "/auth/register",
  register
);

router.post(
  "/auth/login",
  login
);

router.get(
  "/auth/profile",
  authMiddleware,
  (req, res) => {

    res.json({
      message:
      "Protected Route",

      user:
      req.user
    });

  }
);

module.exports = router;