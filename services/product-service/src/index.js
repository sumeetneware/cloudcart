require("dotenv").config();

const express = require("express");
const cors = require("cors");

const productRoutes =
require("./routes/productRoutes");

const app = express();
app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.use(express.json());

app.use("/api", productRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});