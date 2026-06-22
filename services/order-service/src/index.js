require("dotenv").config();

const express = require("express");

const orderRoutes =
require("./routes/orderRoutes");

const app = express();

app.use(express.json());

app.use("/api", orderRoutes);

app.get("/health", (req, res) => {

  res.status(200).json({
    service: "order-service",
    status: "UP"
  });

});

const PORT =
process.env.PORT || 3007;

app.listen(PORT, () => {

  console.log(
    `Order Service running on ${PORT}`
  );

});