require("dotenv").config();

const express =
require("express");

const cors = require("cors");

const cartRoutes =
require("./routes/cartRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.use(express.json());

app.use("/api", cartRoutes);

app.get("/health",
(req, res) => {

  res.status(200).json({
    service: "cart-service",
    status: "UP"
  });

});

const PORT =
process.env.PORT || 3006;

app.listen(PORT, () => {

  console.log(
    `Cart Service running on ${PORT}`
  );

});