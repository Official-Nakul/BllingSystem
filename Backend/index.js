const express = require("express");
const app = express();
const db = require("./db.js");
app.use(express.json());

const customerRoute = require("./Routes/CustomerRoutes.js");
const orderRoute = require("./Routes/OrderRoutes.js");

app.use("/api", customerRoute);
app.use("/api", orderRoute);
app.get("/", (req, res) => {
  res.send("Working");
});
app.listen(3000, () => {
  console.log("Server Started on port 3000");
});
