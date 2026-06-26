require("dotenv").config();

const express = require("express");
const cors = require("cors");

const userRoutes =
require("./routes/userRoutes");

const app = express();
app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.use(express.json());

app.use("/api", userRoutes);

app.get("/health", (req, res) => {
  res.json({
    service: "user-service",
    status: "UP"
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `User Service running on ${PORT}`
  );
});