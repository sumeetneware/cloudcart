require("dotenv").config();

const express = require("express");

const authRoutes =
require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use("/api", authRoutes);

app.get("/health", (req, res) => {

  res.json({
    service: "auth-service",
    status: "UP"
  });

});

const PORT =
process.env.PORT || 3005;

app.listen(PORT, () => {

  console.log(
    `Auth Service running on ${PORT}`
  );

});