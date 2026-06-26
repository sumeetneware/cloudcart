require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes =
require("./routes/authRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

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