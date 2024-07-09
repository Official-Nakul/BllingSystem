const express = require("express");
require("dotenv").config();
const app = express();
const db = require("./db.js");
app.use(express.json());

const port = process.env.PORT || 3000;

const customerRoute = require("./Routes/CustomerRoutes.js");
const orderRoute = require("./Routes/OrderRoutes.js");

app.use("/api", customerRoute);
app.use("/api", orderRoute);
app.get("/", (req, res) => {
  res.send("Working");
});
app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
